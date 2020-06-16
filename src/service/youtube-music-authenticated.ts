import * as http from "http";
import sha1 = require("sha1");
import YouTubeMusicGuest from "./youtube-music-guest";

export default class YouTubeMusicAuthenticated extends YouTubeMusicGuest {
    private hsid: string;
    private ssid: string;
    private apisid: string;
    private sapisid: string;
    private secure3psid: string;

    constructor(hsid: string, ssid: string, apisid: string, sapisid: string, secure3psid: string) {
        super();
        this.hsid = hsid;
        this.ssid = ssid;
        this.apisid = apisid;
        this.sapisid = sapisid;
        this.secure3psid = secure3psid;
    }

    generateHeaders(): http.OutgoingHttpHeaders {
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

    async browse(): Promise<string> {
        const response = await this.sendRequest("browse", JSON.stringify({
            "browseId": "FEmusic_liked_playlists",
            "context": {
                "capabilities": {},
                "client": {
                  "clientName": "WEB_REMIX",
                  "clientVersion": "0.1",
                  "experimentIds": [],
                  "experimentsToken": "",
                  "gl": "DE",
                  "hl": "en",
                  "locationInfo": {
                    "locationPermissionAuthorizationStatus": "LOCATION_PERMISSION_AUTHORIZATION_STATUS_UNSUPPORTED"
                  },
                  "musicAppInfo": {
                    "musicActivityMasterSwitch": "MUSIC_ACTIVITY_MASTER_SWITCH_INDETERMINATE",
                    "musicLocationMasterSwitch": "MUSIC_LOCATION_MASTER_SWITCH_INDETERMINATE",
                    "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_UNKNOWN"
                  },
                  "utcOffsetMinutes": 60
                },
                "request": {
                  "internalExperimentFlags": [
                    {
                      "key": "force_music_enable_outertube_tastebuilder_browse",
                      "value": "true"
                    },
                    {
                      "key": "force_music_enable_outertube_playlist_detail_browse",
                      "value": "true"
                    },
                    {
                      "key": "force_music_enable_outertube_search_suggestions",
                      "value": "true"
                    }
                  ],
                  "sessionIndex": {}
                },
                "user": {
                  "enableSafetyMode": false
                }
              }
        }));
        return response.body;
    }
}
