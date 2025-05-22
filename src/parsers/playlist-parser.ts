import BaseParser from "./base-parser";
import TrackParser from "./track-parser";
import { IInternalPlaylistDetail } from "../interfaces-internal";
import { IPlaylistSummary, ITrackDetail } from "../interfaces-supplementary";

export default class PlaylistParser extends BaseParser {
    private trackParser: TrackParser;

    constructor() {
        super();
        this.trackParser = new TrackParser();
    }

    parsePlaylistsSummaryResponse(response: any): IPlaylistSummary[] {
        const playlists: IPlaylistSummary[] = [];
        const items: any[] = this.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "0", "gridRenderer", "items");
        if (Array.isArray(items)) {
            // Skip playlist at index 0 since that's the "New Playlist" playlist
            for (let i = 1; i < items.length; i++) {
                const item = items[i];
                const playlist = this.parsePlaylistSummary(item);
                if (playlist) {
                    playlists.push(playlist);
                }
            }
        }
        return playlists;
    }

    parsePlaylistSummary(playlistObj: any): IPlaylistSummary {
        let count = 0;
        const subtitles = this.traverse(playlistObj, "musicTwoRowItemRenderer", "subtitle", "runs");
        const countRegex = /([\d,]+)\s+\w+/;
        if (Array.isArray(subtitles)) {
            for (let i = 0; i < subtitles.length; i++) {
                const subtitle = subtitles[i];
                const text: string = subtitle.text;
                const match = text ? text.match(countRegex) : undefined;
                if (match && match.length > 1) {
                    count = parseInt(match[1].replace(/,/g, ""));
                    break;
                }
            }
        }
        return {
            id: this.traverse(playlistObj, "musicTwoRowItemRenderer", "title", "runs", "0", "navigationEndpoint", "browseEndpoint", "browseId"),
            name: this.traverse(playlistObj, "musicTwoRowItemRenderer", "title", "runs", "0", "text"),
            thumbnails: this.traverse(playlistObj, "musicTwoRowItemRenderer", "thumbnailRenderer", "musicThumbnailRenderer", "thumbnail", "thumbnails"),
            count: count
        };
    }

    parsePlaylistDetailResponse(response: any): IInternalPlaylistDetail {
        const playlistObj = this.traverse(response, "contents", "twoColumnBrowseResultsRenderer", "secondaryContents", "sectionListRenderer", "contents", "0", "musicPlaylistShelfRenderer");
        if (playlistObj) {
            return this.parsePlaylistDetail(response, playlistObj);
        }
        return undefined;
    }

    parsePlaylistDetailContinuation(playlist: IInternalPlaylistDetail, response: any): void {
        const trackObjs = this.traverse(response, "onResponseReceivedActions", "0", "appendContinuationItemsAction", "continuationItems");
        const tracks = this.trackParser.parseTrackDetails(trackObjs);
        if (Array.isArray(playlist.tracks)) {
            playlist.tracks.push.apply(playlist.tracks, tracks);
        }
        playlist.continuationToken = this.trackParser.parseTrackContinuationToken(trackObjs);
    }

    parsePlaylistDetail(rootPlaylistObj: any, childPlaylistObj: any): IInternalPlaylistDetail {
        const privateHeader = this.traverse(rootPlaylistObj, "contents", "twoColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "0", "musicEditablePlaylistDetailHeaderRenderer");
        const isPublic = typeof privateHeader === "undefined";
        const playlistHeader = isPublic ?
            this.traverse(rootPlaylistObj, "contents", "twoColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "0", "musicResponsiveHeaderRenderer") :
            this.traverse(privateHeader, "header", "musicResponsiveHeaderRenderer");
        const privacy = isPublic ?
            "PUBLIC" :
            this.traverse(privateHeader, "editHeader", "musicPlaylistEditHeaderRenderer", "privacy");
        let count = 0;
        const countRuns = this.traverse(playlistHeader, "secondSubtitle", "runs");
        if (Array.isArray(countRuns)) {
            for (const countRun of countRuns) {
                const countStr = this.traverse(countRun, "text");
                if (countStr && (countStr.includes("track") || countStr.includes("song"))) {
                    const countParts = countStr.split(" ");
                    if (countParts && countParts.length > 0) {
                        count = parseInt(countParts[0].replace(/,/g, ""));
                        break;
                    }
                }
            }
        }
        let description = "";
        const descriptionRuns = this.traverse(playlistHeader, "description", "musicDescriptionShelfRenderer", "description", "runs");
        if (Array.isArray(descriptionRuns)) {
            for (const descriptionRun of descriptionRuns) {
                const descriptionStr = this.traverse(descriptionRun, "text");
                if (descriptionStr) {
                    description += descriptionStr;
                }
            }
        }
        const trackObjs = this.traverse(childPlaylistObj, "contents");
        return {
            id: this.traverse(childPlaylistObj, "playlistId"),
            name: this.traverse(playlistHeader, "title", "runs", "0", "text"),
            description: description,
            privacy: privacy,
            count: count,
            tracks: this.trackParser.parseTrackDetails(trackObjs),
            continuationToken: this.trackParser.parseTrackContinuationToken(trackObjs)
        };
    }

    mergeValidPlaylistTracks(...playlists: IInternalPlaylistDetail[]): ITrackDetail[] {
        const tracks: ITrackDetail[] = [];
        for (const playlist of playlists) {
            for (const track of playlist.tracks) {
                if (!this.trackParser.isTrackDataMissing(track) && !tracks.find(t => t.id === track.id)) {
                    tracks.push(track);
                }
            }
        }
        return tracks;
    }
}
