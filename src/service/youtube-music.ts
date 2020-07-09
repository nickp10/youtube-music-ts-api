import { IYouTubeMusic, IYouTubeMusicAuthenticated, IYouTubeMusicGuest } from "../interfaces-primary";
import YouTubeMusicAuthenticated from "./youtube-music-authenticated";
import YouTubeMusicGuest from "./youtube-music-guest";

export default class YouTubeMusic implements IYouTubeMusic {
    async authenticate(cookiesStr: string): Promise<IYouTubeMusicAuthenticated> {
        if (!cookiesStr) {
            throw new Error("The specific cookie string is missing");
        }
        const cookiesStrParts = cookiesStr.split(";");
        if (!cookiesStrParts || cookiesStrParts.length === 0) {
            throw new Error("An invalid cookie string was specified");
        }
        const cookies = new Map<string, string>();
        for (const cookieStr of cookiesStrParts) {
            const cookieParts = cookieStr.split("=");
            if (cookieParts && cookieParts.length === 2) {
                cookies.set(cookieParts[0].trim(), cookieParts[1].trim());
            }
        }
        return new YouTubeMusicAuthenticated(
            cookies.get("HSID"),
            cookies.get("SSID"),
            cookies.get("APISID"),
            cookies.get("SAPISID"),
            cookies.get("__Secure-3PSID")
        );
    }

    async guest(): Promise<IYouTubeMusicGuest> {
        return new YouTubeMusicGuest();
    }
}
