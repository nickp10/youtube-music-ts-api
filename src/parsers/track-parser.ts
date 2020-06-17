import BaseParser from "./base-parser";
import { ITrackDetail } from "../interfaces";

export default class TrackParser extends BaseParser {
    parseTrackDetail(trackObj: any): ITrackDetail {
        return {
            id: this.traverse(trackObj, "overlay", "musicItemThumbnailOverlayRenderer", "content", "musicPlayButtonRenderer", "playNavigationEndpoint", "watchEndpoint", "videoId"),
            title: this.traverse(trackObj, "flexColumns", "0", "musicResponsiveListItemFlexColumnRenderer", "text", "runs", "0", "text")
        };
    }
}
