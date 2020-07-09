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
     * Gets all the playlists in the user's library.
     * 
     * @returns A promise that will yield an array of all the playlists in the user's library.
     */
    getLibraryPlaylists(): Promise<IPlaylistSummary[]>;

    /**
     * Gets detailed information for a specific playlist.
     * 
     * @param id The ID of the playlist to get the detailed information for.
     * @returns A promise that will yield the detailed information for a specific playlist.
     */
    getPlaylist(id: string): Promise<IPlaylistDetail>;
}

/**
 * Defines the YouTube Music APIs available to a guest.
 */
export interface IYouTubeMusicGuest {
}

/**
 * Defines an album summary.
 */
export interface IAlbumSummary {
    /**
     * The ID of the album.
     */
    id?: string;

    /**
     * The name of the album.
     */
    name?: string;
}

/**
 * Defines an artist summary.
 */
export interface IArtistSummary {
    /**
     * The ID of the artist.
     */
    id?: string;

    /**
     * The name of the artist.
     */
    name?: string;
}

/**
 * Defines the details for a playlist.
 */
export interface IPlaylistDetail {
    /**
     * The ID of the playlist.
     */
    id?: string;

    /**
     * The name of the playlist.
     */
    name?: string;

    /**
     * The description of the playlist.
     */
    description?: string;

    /**
     * The count of tracks within the playlist.
     */
    count?: number;

    /**
     * The privacy level of the playlist.
     */
    privacy?: string;

    /**
     * The array of tracks within the playlist.
     */
    tracks?: ITrackDetail[];
}

/**
 * Defines a playlist summary.
 */
export interface IPlaylistSummary {
    /**
     * The ID of the playlist.
     */
    id?: string;

    /**
     * The name of the playlist.
     */
    name?: string;

    /**
     * The count of tracks within the playlist.
     */
    count?: number;
}

/**
 * Defines the details for a track.
 */
export interface ITrackDetail {
    /**
     * The ID of the track.
     */
    id?: string;

    /**
     * The title of the track.
     */
    title?: string;

    /**
     * The artist(s) that compose the track.
     */
    artists?: IArtistSummary[];

    /**
     * The album the track is from.
     */
    album?: IAlbumSummary;

    /**
     * The duration of the track as a readable string.
     */
    duration?: string;
}
