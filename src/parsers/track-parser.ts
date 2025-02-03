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
        const allArtists: IArtistSummary[] = [];
        const artistsWithIds: IArtistSummary[] = [];
        const artistsObj = this.traverse(trackObj, "flexColumns", "1", "musicResponsiveListItemFlexColumnRenderer", "text", "runs");
        if (Array.isArray(artistsObj)) {
            for (const artistObj of artistsObj) {
                const artistId = this.traverse(artistObj, "navigationEndpoint", "browseEndpoint", "browseId");
                const artistName = this.traverse(artistObj, "text");
                if (artistName) {
                    if (artistId) {
                        artistsWithIds.push({
                            id: artistId,
                            name: artistName
                        });
                    }
                    allArtists.push({
                        id: artistId,
                        name: artistName
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

        const buttonsObj = (this.traverse(trackObj, "menu", "menuRenderer", "topLevelButtons"));
        let likeStatus: "LIKE"|"DISLIKE"|"INDIFFERENT" = "INDIFFERENT";
        if (Array.isArray(buttonsObj)) {
            for (const buttonObj of buttonsObj) {
                if (buttonObj.likeButtonRenderer) {
                    likeStatus = buttonObj.likeButtonRenderer.likeStatus;
                }
            }
        }

        return {
            id: this.traverse(trackObj, "overlay", "musicItemThumbnailOverlayRenderer", "content", "musicPlayButtonRenderer", "playNavigationEndpoint", "watchEndpoint", "videoId"),
            alternateId: this.traverse(trackObj, "playlistItemData", "playlistSetVideoId"),
            title: this.traverse(trackObj, "flexColumns", "0", "musicResponsiveListItemFlexColumnRenderer", "text", "runs", "0", "text"),
            artists: artistsWithIds.length > 0 ? artistsWithIds : allArtists,
            album: album,
            thumbnails: this.traverse(trackObj, "thumbnail", "musicThumbnailRenderer", "thumbnail", "thumbnails"),
            likeStatus: likeStatus,
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

    parseAlbumTrackDetails(trackObjs: any[], artists: IArtistSummary[], album: IAlbumSummary): ITrackDetail[] {
        const tracks: ITrackDetail[] = [];
        for (const trackObj of trackObjs) {
            tracks.push({
                id: this.traverse(trackObj, "videoId"),
                title: this.traverse(trackObj, "title"),
                artists: artists,
                album: album,
                durationMillis: parseInt(this.traverse(trackObj, "lengthMs")),
                trackNumber: parseInt(this.traverse(trackObj, "albumTrackIndex"))
            });
        }
        return tracks;
    }

    parseTrackContinuationToken(trackObjs: any): string {
        if (Array.isArray(trackObjs)) {
            for (const trackObj of trackObjs) {
                const continuationObj = this.traverse(trackObj, "continuationItemRenderer");
                if (continuationObj) {
                    return this.traverse(continuationObj, "continuationEndpoint", "continuationCommand", "token");
                }
            }
        }
        return undefined;
    }
}
