import BaseParser from "./base-parser";
import { IAlbumSummary, IArtistSummary, ITrackDetail } from "../interfaces-supplementary";

export default class TrackParser extends BaseParser {
    parseTrackDetail(trackObj: any): ITrackDetail {
        const artists: IArtistSummary[] = [];
        const artistsObj = this.traverse(trackObj, "flexColumns", "1", "musicResponsiveListItemFlexColumnRenderer", "text", "runs");
        if (Array.isArray(artistsObj)) {
            for (const artistObj of artistsObj) {
                artists.push({
                    id: this.traverse(artistObj, "navigationEndpoint", "browseEndpoint", "browseId"),
                    name: this.traverse(artistObj, "text")
                });
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
}
