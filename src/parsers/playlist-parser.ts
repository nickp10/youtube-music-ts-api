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
        const countRegex = /(\d+)\s+\w+/;
        if (Array.isArray(subtitles)) {
            for (let i = 0; i < subtitles.length; i++) {
                const subtitle = subtitles[i];
                const text: string = subtitle.text;
                const match = text ? text.match(countRegex) : undefined;
                if (match && match.length > 1) {
                    count = parseInt(match[1]);
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
        const playlistObj = this.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "0", "musicPlaylistShelfRenderer");
        if (playlistObj) {
            return this.parsePlaylistDetail(response, playlistObj);
        }
        return undefined;
    }

    parsePlaylistDetailContinuation(playlist: IInternalPlaylistDetail, response: any): void {
        const trackObjs = this.traverse(response, "continuationContents", "musicPlaylistShelfContinuation", "contents");
        const tracks = this.trackParser.parseTrackDetails(trackObjs);
        if (Array.isArray(playlist.tracks)) {
            playlist.tracks.push.apply(playlist.tracks, tracks);
        }
        playlist.continuationToken = this.traverse(response, "continuationContents", "musicPlaylistShelfContinuation", "continuations", "0", "nextContinuationData", "continuation");
    }

    parsePlaylistDetail(rootPlaylistObj: any, childPlaylistObj: any): IInternalPlaylistDetail {
        const isPublic = typeof this.traverse(rootPlaylistObj, "header", "musicEditablePlaylistDetailHeaderRenderer") === "undefined";
        const privacyHeader = isPublic ?
            rootPlaylistObj :
            this.traverse(rootPlaylistObj, "header", "musicEditablePlaylistDetailHeaderRenderer");
        const privacy = isPublic ?
            "PUBLIC" :
            this.traverse(privacyHeader, "editHeader", "musicPlaylistEditHeaderRenderer", "privacy");
        const playlistHeader = this.traverse(privacyHeader, "header", "musicDetailHeaderRenderer");
        let count = 0;
        const countStr = this.traverse(playlistHeader, "secondSubtitle", "runs", "0", "text");
        if (countStr) {
            const countParts = countStr.split(" ");
            if (countParts && countParts.length > 0) {
                count = parseInt(countParts[0]);
            }
        }
        const trackObjs = this.traverse(childPlaylistObj, "contents");
        return {
            id: this.traverse(childPlaylistObj, "playlistId"),
            name: this.traverse(playlistHeader, "title", "runs", "0", "text"),
            description: this.traverse(playlistHeader, "description", "runs", "0", "text"),
            privacy: privacy,
            count: count,
            tracks: this.trackParser.parseTrackDetails(trackObjs),
            continuationToken: this.traverse(childPlaylistObj, "continuations", "0", "nextContinuationData", "continuation")
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
