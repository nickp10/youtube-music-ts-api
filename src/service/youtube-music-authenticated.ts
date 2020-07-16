import * as http from "http";
import sha1 from "sha1";
import AlbumParser from "../parsers/album-parser";
import PlaylistParser from "../parsers/playlist-parser";
import TrackParser from "../parsers/track-parser";
import YouTubeMusicGuest from "./youtube-music-guest";
import { IPlaylistDetail, IPlaylistSummary, IAlbumSummary, IAlbumDetail } from "../interfaces-supplementary";
import { IYouTubeMusicAuthenticated} from "../interfaces-primary";

export default class YouTubeMusicAuthenticated extends YouTubeMusicGuest implements IYouTubeMusicAuthenticated {
    private hsid: string;
    private ssid: string;
    private apisid: string;
    private sapisid: string;
    private secure3psid: string;
    private albumParser: AlbumParser;
    private playlistParser: PlaylistParser;
    private trackParser: TrackParser;

    constructor(hsid: string, ssid: string, apisid: string, sapisid: string, secure3psid: string) {
        super();
        this.hsid = hsid;
        this.ssid = ssid;
        this.apisid = apisid;
        this.sapisid = sapisid;
        this.secure3psid = secure3psid;
        this.albumParser = new AlbumParser();
        this.playlistParser = new PlaylistParser();
        this.trackParser = new TrackParser();
    }

    protected generateHeaders(): http.OutgoingHttpHeaders {
        return {
            ...super.generateHeaders(),
            "Authorization": this.generateAuthorization(),
            "Cookie": this.generateCookie()
        };
    }

    private generateAuthorization(): string {
        let time = new Date().getTime();
        const input = `${time} ${this.sapisid} ${this.origin}`;
        const digest = sha1(input);
        return `SAPISIDHASH ${time}_${digest}`;
    }

    private generateCookie(): string {
        return `HSID=${this.hsid}; SSID=${this.ssid}; APISID=${this.apisid}; SAPISID=${this.sapisid}; __Secure-3PSID=${this.secure3psid}`;
    }

    async getLibraryAlbums(): Promise<IAlbumSummary[]> {
        const response = await this.sendRequest("browse", {
            browseId: "FEmusic_liked_albums",
        });
        return this.albumParser.parseAlbumsSummaryResponse(response);
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

    async getLibraryPlaylists(): Promise<IPlaylistSummary[]> {
        const response = await this.sendRequest("browse", {
            browseId: "FEmusic_liked_playlists",
        });
        return this.playlistParser.parsePlaylistsSummaryResponse(response);
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
