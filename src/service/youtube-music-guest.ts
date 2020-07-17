import YouTubeMusicBase from "./youtube-music-base";
import { IAlbumDetail, IPlaylistDetail } from "../interfaces-supplementary";
import { IYouTubeMusicGuest } from "../interfaces-primary";

export default class YouTubeMusicGuest extends YouTubeMusicBase implements IYouTubeMusicGuest {
    constructor() {
        super();
    }

    async getAlbum(id: string): Promise<IAlbumDetail> {
        const data = {
            browseId: id,
            browseEndpointContextSupportedConfigs: {
                browseEndpointContextMusicConfig: {
                    pageType: "MUSIC_PAGE_TYPE_ALBUM"
                }
            }
        };
        const response = await this.sendRequest("browse", data);
        return this.albumParser.parseAlbumDetailResponse(response);
    }

    async getPlaylist(id: string, maxRetries: number = 0): Promise<IPlaylistDetail> {
        const playlist = await this.getPlaylistInternal(id);

        // YouTube Music is buggy. Some songs fail to return. But if we try again, it may work.
        while (maxRetries > 0) {
            const missingSongs = playlist.tracks.length !== playlist.count;
            const missingData = !!playlist.tracks.find(t => this.trackParser.isTrackDataMissing(t));
            if (missingSongs || missingData) {
                const retry = await this.getPlaylistInternal(id);
                const mergedTracks = this.playlistParser.mergeValidPlaylistTracks(playlist, retry);
                playlist.tracks = mergedTracks;
                maxRetries--;
            } else {
                break;
            }
        }
        return playlist;
    }

    private async getPlaylistInternal(id: string): Promise<IPlaylistDetail> {
        const data = {
            browseId: id,
            browseEndpointContextSupportedConfigs: {
                browseEndpointContextMusicConfig: {
                    pageType: "MUSIC_PAGE_TYPE_PLAYLIST"
                }
            }
        };
        const response = await this.sendRequest("browse", data);
        const playlist = this.playlistParser.parsePlaylistDetailResponse(response);
        while (playlist.continuationToken) {
            const continuation = await this.sendRequest("browse", data, `ctoken=${playlist.continuationToken}&continuation=${playlist.continuationToken}`);
            this.playlistParser.parsePlaylistDetailContinuation(playlist, continuation);
        }
        return playlist;
    }
}
