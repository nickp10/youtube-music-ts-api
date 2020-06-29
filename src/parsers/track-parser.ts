import BaseParser from "./base-parser";
import { IAlbumSummary, IArtistSummary, ITrackDetail } from "../interfaces";

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
}
