import BaseParser from "./base-parser";
import { IInternalTracksDetail } from "../interfaces-internal";
import { IAlbumSummary, IArtistSummary, ITrackDetail } from "../interfaces-supplementary";

export default class TrackParser extends BaseParser {
    parseTrackDetails(trackObjs: any): ITrackDetail[] {
        const tracks: ITrackDetail[] = [];
        if (Array.isArray(trackObjs)) {
            for (const trackObj of trackObjs) {
                const childTrackObj = this.traverse(trackObj, "musicResponsiveListItemRenderer");
                if (childTrackObj) {
                    const track = this.parseTrackDetail(childTrackObj);
                    if (track && track.id) {
                        tracks.push(track);
                    }
                }
            }
        }
        return tracks;
    }

    parseTrackDetail(trackObj: any): ITrackDetail {
        const artists: IArtistSummary[] = [];
        const artistsObj = this.traverse(trackObj, "flexColumns", "1", "musicResponsiveListItemFlexColumnRenderer", "text", "runs");
        if (Array.isArray(artistsObj)) {
            for (const artistObj of artistsObj) {
                const artistId = this.traverse(artistObj, "navigationEndpoint", "browseEndpoint", "browseId");
                if (artistId) {
                    artists.push({
                        id: artistId,
                        name: this.traverse(artistObj, "text")
                    });
                }
            }
        }
        let album: IAlbumSummary = undefined;
        const albumObj = this.traverse(trackObj, "flexColumns", "2", "musicResponsiveListItemFlexColumnRenderer", "text", "runs", "0");
        if (albumObj) {
            album = {
                id: this.traverse(albumObj, "navigationEndpoint", "browseEndpoint", "browseId"),
                name: this.traverse(albumObj, "text")
            }
        }
        const duration =
            this.traverse(trackObj, "fixedColumns", "0", "musicResponsiveListItemFixedColumnRenderer", "text", "simpleText") ||
            this.traverse(trackObj, "fixedColumns", "0", "musicResponsiveListItemFixedColumnRenderer", "text", "runs", "0", "text");
        return {
            id: this.traverse(trackObj, "overlay", "musicItemThumbnailOverlayRenderer", "content", "musicPlayButtonRenderer", "playNavigationEndpoint", "watchEndpoint", "videoId"),
            title: this.traverse(trackObj, "flexColumns", "0", "musicResponsiveListItemFlexColumnRenderer", "text", "runs", "0", "text"),
            artists: artists,
            album: album,
            duration: duration
        };
    }

    /**
     * Checks whether or not the track is missing data or if it contains all the appropriate data.
     * 
     * The YouTube Music API will fail sometimes and return "Song is private" instead of the actual track data.
     * This function checks for the existence of that problematic symptom.
     * 
     * @param track The track to determine if the data is missing.
     * @returns True if the track is missing data, or false if the track contains all the appropriate data.
     */
    isTrackDataMissing(track: ITrackDetail): boolean {
        return track.title == "Song is private";
    }

    parseTracksDetailResponse(response: any): IInternalTracksDetail {
        const childObj = this.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "*", "itemSectionRenderer", "contents", "0", "musicShelfRenderer");
        const trackObjs = this.traverse(childObj, "contents");
        return {
            continuationToken: this.traverse(childObj, "continuations", "0", "nextContinuationData", "continuation"),
            tracks: this.parseTrackDetails(trackObjs)
        }
    }

    parseTracksDetailContinuation(tracksDetail: IInternalTracksDetail, response: any): void {
        const trackObjs = this.traverse(response, "continuationContents", "musicShelfContinuation", "contents");
        const tracks = this.parseTrackDetails(trackObjs);
        if (Array.isArray(tracksDetail.tracks)) {
            tracksDetail.tracks.push.apply(tracksDetail.tracks, tracks);
        }
        tracksDetail.continuationToken = this.traverse(response, "continuationContents", "musicShelfContinuation", "continuations", "0", "nextContinuationData", "continuation");
    }
}
