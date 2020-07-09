import * as http from "http";
import * as https from "https";
import { IIncomingMessage } from "../interfaces-internal";
import { IYouTubeMusicGuest } from "../interfaces-primary";
import YouTubeMusicContext from "../context";

export default class YouTubeMusicGuest implements IYouTubeMusicGuest {
    hostname: string = "music.youtube.com";
    basePath: string = "/youtubei/v1/";
    queryString: string = "?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
    origin: string = "https://music.youtube.com";

    protected generateHeaders(): http.OutgoingHttpHeaders {
        return {
            "X-Origin": this.origin
        };
    }

    protected async sendRequest(path: string, data?: any): Promise<any> {
        let dataStr: string = undefined;
        if (data) {
            data = {
                ...YouTubeMusicContext,
                ...data
            };
            dataStr = JSON.stringify(data);
        }
        const response = await this.sendHttpsRequest({
            hostname: this.hostname,
            path: `${this.basePath}${path}${this.queryString}`,
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
