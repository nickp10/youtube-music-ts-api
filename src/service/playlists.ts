import { IPlaylistDetail, IPlaylistSummary } from "../interfaces";
import YouTubeMusicAuthenticated from "./youtube-music-authenticated";

const getLibraryPlaylists = async(ytm: YouTubeMusicAuthenticated): Promise<IPlaylistSummary[]> => {
    const playlists: IPlaylistSummary[] = [];
    const body = await ytm.sendRequest("browse", {
        browseId: "FEmusic_liked_playlists",
    });
    const items: any[] = ytm.traverse(body, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "0", "itemSectionRenderer", "contents", "0", "gridRenderer", "items");
    if (Array.isArray(items)) {
        // Skip playlist at index 0 since that's the "New Playlist" playlist
        for (let i = 1; i < items.length; i++) {
            const item = items[i];
            const countStr = ytm.traverse(item, "musicTwoRowItemRenderer", "subtitle", "runs", "2", "text");
            let count = 0;
            if (countStr) {
                const countParts = countStr.split(" ");
                if (countParts && countParts.length > 0) {
                    count = parseInt(countParts[0]);
                }
            }
            playlists.push({
                id: ytm.traverse(item, "musicTwoRowItemRenderer", "title", "runs", "0", "navigationEndpoint", "browseEndpoint", "browseId"),
                name: ytm.traverse(item, "musicTwoRowItemRenderer", "title", "runs", "0", "text"),
                count: count
            });
        }
    }
    return playlists;
};

const getPlaylist = async(ytm: YouTubeMusicAuthenticated, id: string): Promise<IPlaylistDetail> => {
    const body = await ytm.sendRequest("browse", {
        browseId: id,
        browseEndpointContextSupportedConfigs: {
            browseEndpointContextMusicConfig: {
                pageType: "MUSIC_PAGE_TYPE_PLAYLIST"
            }
        }
    });
    return undefined;
};

export { getLibraryPlaylists, getPlaylist }
