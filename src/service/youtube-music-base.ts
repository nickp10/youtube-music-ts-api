import * as http from "http";
import * as https from "https";
import { IIncomingMessage } from "../interfaces-internal";
import AlbumParser from "../parsers/album-parser";
import ArtistParser from "../parsers/artist-parser";
import PlaylistParser from "../parsers/playlist-parser";
import TrackParser from "../parsers/track-parser";
import YouTubeMusicContext from "../context";

export default class YouTubeMusicBase {
    hostname: string = "music.youtube.com";
    basePath: string = "/youtubei/v1/";
    queryString: string = "?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
    origin: string = "https://music.youtube.com";
    albumParser: AlbumParser;
    artistParser: ArtistParser;
    playlistParser: PlaylistParser;
    trackParser: TrackParser;

    constructor() {
        this.albumParser = new AlbumParser();
        this.artistParser = new ArtistParser();
        this.playlistParser = new PlaylistParser();
        this.trackParser = new TrackParser();
    }

    protected generateHeaders(): http.OutgoingHttpHeaders {
        return {
            "X-Origin": this.origin
        };
    }

    protected async sendRequest(path: string, data?: any, additionalQueryString?: string): Promise<any> {
        let dataStr: string = undefined;
        if (data) {
            data = {
                ...YouTubeMusicContext,
                ...data
            };
            dataStr = JSON.stringify(data);
        }
        const queryString = additionalQueryString ? `${this.queryString}&${additionalQueryString}` : this.queryString;
        const response = await this.sendHttpsRequest({
            hostname: this.hostname,
            path: `${this.basePath}${path}${queryString}`,
            method: "POST",
            headers: this.generateHeaders()
        }, dataStr);
        if (response.statusCode === 200 && response.body) {
            const body = JSON.parse(response.body);
            if (body) {
                return body;
            }
        }
        throw new Error(`Could not send the specified request to ${path}. Status code: ${response.statusCode}`);
    }

    protected async sendHttpsRequest(request: https.RequestOptions, data?: string): Promise<IIncomingMessage> {
        return new Promise<IIncomingMessage>((resolve, reject) => {
            const headers = request.headers || { };
            request.headers = headers;
            request.timeout = 60000; // 60 seconds
            if (data) {
                headers["Content-Type"] = "application/json";
                headers["Content-Length"] = data.length;
            }
            const req = https.request(request, (resp: IIncomingMessage) => {
                let body = "";
                resp.on("data", (data) => {
                    body += data;
                });
                resp.on("end", () => {
                    resp.body = body;
                    resolve(resp);
                });
            }).on("error", (error) => {
                reject(error);
            });
            if (data) {
                req.write(data);
            }
            req.end();
        });
    }
}
