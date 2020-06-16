import YouTubeMusicGuest from "./youtube-music-guest";
import YouTubeMusicAuthenticated from "./youtube-music-authenticated";

export default class YouTubeMusic {
    static async guest(): Promise<YouTubeMusicGuest> {
        return new YouTubeMusicGuest();
    }

    static async authenticate(cookiesStr: string): Promise<YouTubeMusicAuthenticated> {
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
}
