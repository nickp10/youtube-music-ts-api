import * as http from "http";
import * as https from "https";
import { IIncomingMessage } from "../interfaces";

export default class YouTubeMusicGuest {
    hostname: string = "music.youtube.com";
    basePath: string = "/youtubei/v1/";
    queryString: string = "?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30";
    origin: string = "https://music.youtube.com";

    generateHeaders(): http.OutgoingHttpHeaders {
        return {
            "X-Origin": this.origin
        };
    }

    async sendRequest(path: string, data?: string): Promise<IIncomingMessage> {
        return await this.sendHttpsRequest({
            hostname: this.hostname,
            path: `${this.basePath}${path}${this.queryString}`,
            method: "POST",
            headers: this.generateHeaders()
        }, data);
    }

    async sendHttpsRequest(request: https.RequestOptions, data?: string): Promise<IIncomingMessage> {
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
