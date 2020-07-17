import { IAlbumDetail, IAlbumSummary, IArtistSummary, IPlaylistDetail, IPlaylistSummary, ITrackDetail } from "./interfaces-supplementary";

/**
 * Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
 * authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.
 */
export interface IYouTubeMusic {
    /**
     * Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.
     * 
     * @param cookiesStr The cookie string of a valid logged in user. The minimum required cookie values needed are the HSID, SSID,
     * APISID, SAPISID, and __Secure-3PSID. To obtain this cookie value, log into https://music.youtube.com as a user and use your
     * browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored.
     * @returns A promise that will yield authenticated access to the YouTube Music API.
     */
    authenticate(cookiesStr: string): Promise<IYouTubeMusicAuthenticated>;

    /**
     * Provides guest access to the YouTube Music API. Only non-restrictive APIs (such as public playlists) are available to guests.
     * 
     * @returns A promise that will yield guest access to the YouTube Music API.
     */
    guest(): Promise<IYouTubeMusicGuest>;
}

/**
 * Defines the YouTube Music APIs available to an authenticated user. An authenticated user also naturally includes the APIs available to a guest.
 */
export interface IYouTubeMusicAuthenticated extends IYouTubeMusicGuest {
    /**
     * Gets all the albums in the user's library.
     * 
     * @returns A promise that will yield an array of all the albums in the user's library.
     */
    getLibraryAlbums(): Promise<IAlbumSummary[]>;

    /**
     * Gets all the artists in the user's library.
     * 
     * @returns A promise that will yield an array of all the artists in the user's library.
     */
    getLibraryArtists(): Promise<IArtistSummary[]>;

    /**
     * Gets all the playlists in the user's library.
     * 
     * @returns A promise that will yield an array of all the playlists in the user's library.
     */
    getLibraryPlaylists(): Promise<IPlaylistSummary[]>;

    /**
     * Gets all the tracks in the user's library.
     * 
     * @returns A promise that will yield an array of all the tracks in the user's library.
     */
    getLibraryTracks(): Promise<ITrackDetail[]>;
}

/**
 * Defines the YouTube Music APIs available to a guest.
 */
export interface IYouTubeMusicGuest {
    /**
     * Gets detailed information for a specific album.
     * 
     * @param id The ID of the album to get the detailed information for.
     * @returns A promise that will yield the detailed information for a specific album.
     */
    getAlbum(id: string): Promise<IAlbumDetail>;

    /**
     * Gets detailed information for a specific playlist.
     * 
     * @param id The ID of the playlist to get the detailed information for.
     * @param maxRetries An optional maximum number of retries to obtain the tracks. YouTube Music is
     * incredibly buggy in that not all tracks will be returned in a single request. If the request is
     * retried, you may get a different set of tracks in the response. If you retry enough times, you 
     * will eventually get all the tracks (a union operation is done internally between all the tracks
     * returned from each individual request).
     * @returns A promise that will yield the detailed information for a specific playlist.
     */
    getPlaylist(id: string, maxRetries?: number): Promise<IPlaylistDetail>;
}
