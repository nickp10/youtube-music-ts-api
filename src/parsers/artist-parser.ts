import BaseParser from "./base-parser";
import { IArtistSummary } from "../interfaces-supplementary";

export default class ArtistParser extends BaseParser {
    constructor() {
        super();
    }

    parseArtistsSummaryResponse(response: any): IArtistSummary[] {
        const artists: IArtistSummary[] = [];
        const items: any[] = this.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "*", "itemSectionRenderer", "contents", "0", "musicShelfRenderer", "contents");
        if (Array.isArray(items)) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const artist = this.parseArtistSummary(item);
                if (artist) {
                    artists.push(artist);
                }
            }
        }
        return artists;
    }

    parseArtistSummary(artistObj: any): IArtistSummary {
        return {
            id: this.traverse(artistObj, "musicResponsiveListItemRenderer", "navigationEndpoint", "browseEndpoint", "browseId"),
            name: this.traverse(artistObj, "musicResponsiveListItemRenderer", "flexColumns", "0", "musicResponsiveListItemFlexColumnRenderer", "text", "runs", "0", "text")
        };
    }
}
