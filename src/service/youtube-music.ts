import { IYouTubeMusic, IYouTubeMusicAuthenticated, IYouTubeMusicGuest } from "../interfaces-primary";
import YouTubeMusicAuthenticated from "./youtube-music-authenticated";
import YouTubeMusicGuest from "./youtube-music-guest";

/**
 * Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
 * authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.
 */
export default class YouTubeMusic implements IYouTubeMusic {
    /**
     * Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.
     * 
     * @param cookiesStr The cookie string of a valid logged in user. To obtain this cookie value, log into https://music.youtube.com as a user
     * and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored.
     * @param authUser X-Goog-AuthUser header value
     * @returns A promise that will yield authenticated access to the YouTube Music API.
     */
    async authenticate(cookiesStr: string, authUser: number = 0): Promise<IYouTubeMusicAuthenticated> {
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
            cookies,
            authUser
        );
    }

    /**
     * Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.
     * 
     * @returns A promise that will yield guest access to the YouTube Music API.
     */
    async guest(): Promise<IYouTubeMusicGuest> {
        return new YouTubeMusicGuest();
    }
}
