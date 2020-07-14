import BaseParser from "./base-parser";
import { IInternalPlaylistDetail } from "../interfaces-internal";
import { IPlaylistSummary, ITrackDetail } from "../interfaces-supplementary";
import TrackParser from "./track-parser";

export default class PlaylistParser extends BaseParser {
    private trackParser: TrackParser;

    constructor() {
        super();
        this.trackParser = new TrackParser();
    }

    parsePlaylistsSummaryResponse(response: any): IPlaylistSummary[] {
        const playlists: IPlaylistSummary[] = [];
        const items: any[] = this.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "*", "itemSectionRenderer", "contents", "0", "gridRenderer", "items");
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
        const tracksObj = this.traverse(response, "continuationContents", "musicPlaylistShelfContinuation", "contents");
        const tracks = this.parsePlaylistDetailTracks(tracksObj);
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
        const tracksObj = this.traverse(childPlaylistObj, "contents");
        const tracks = this.parsePlaylistDetailTracks(tracksObj);
        return {
            id: this.traverse(childPlaylistObj, "playlistId"),
            name: this.traverse(playlistHeader, "title", "runs", "0", "text"),
            description: this.traverse(playlistHeader, "description", "runs", "0", "text"),
            privacy: privacy,
            count: count,
            tracks: tracks,
            continuationToken: this.traverse(childPlaylistObj, "continuations", "0", "nextContinuationData", "continuation")
        };
    }

    parsePlaylistDetailTracks(tracksObj: any): ITrackDetail[] {
        const tracks: ITrackDetail[] = [];
        if (Array.isArray(tracksObj)) {
            for (const trackObj of tracksObj) {
                const childTrackObj = this.traverse(trackObj, "musicResponsiveListItemRenderer");
                if (childTrackObj) {
                    const track = this.trackParser.parseTrackDetail(childTrackObj);
                    if (track) {
                        tracks.push(track);
                    }
                }
            }
        }
        return tracks;
    }
}
