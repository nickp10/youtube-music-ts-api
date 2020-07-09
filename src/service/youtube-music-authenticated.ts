import * as http from "http";
import sha1 = require("sha1");
import YouTubeMusicGuest from "./youtube-music-guest";
import PlaylistParser from "../parsers/playlist-parser";
import { IPlaylistDetail, IPlaylistSummary } from "../interfaces-supplementary";
import { IYouTubeMusicAuthenticated} from "../interfaces-primary";

export default class YouTubeMusicAuthenticated extends YouTubeMusicGuest implements IYouTubeMusicAuthenticated {
    private hsid: string;
    private ssid: string;
    private apisid: string;
    private sapisid: string;
    private secure3psid: string;
    private playlistParser: PlaylistParser;

    constructor(hsid: string, ssid: string, apisid: string, sapisid: string, secure3psid: string) {
        super();
        this.hsid = hsid;
        this.ssid = ssid;
        this.apisid = apisid;
        this.sapisid = sapisid;
        this.secure3psid = secure3psid;
        this.playlistParser = new PlaylistParser();
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

    async getLibraryPlaylists(): Promise<IPlaylistSummary[]> {
        const response = await this.sendRequest("browse", {
            browseId: "FEmusic_liked_playlists",
        });
        return this.playlistParser.parsePlaylistsSummaryResponse(response);
    }

    async getPlaylist(id: string): Promise<IPlaylistDetail> {
        const response = await this.sendRequest("browse", {
            browseId: id,
            browseEndpointContextSupportedConfigs: {
                browseEndpointContextMusicConfig: {
                    pageType: "MUSIC_PAGE_TYPE_PLAYLIST"
                }
            }
        });
        return this.playlistParser.parsePlaylistDetailResponse(response);
    }
}
