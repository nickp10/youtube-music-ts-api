import { IAlbumDetail, IAlbumSummary, IArtistSummary, IPlaylistDetail, IPlaylistSummary, ITrackDetail } from "./interfaces-supplementary";

/**
 * Defines the main YouTube Music API object. Using this object, you can either choose to make calls as a guest or an
 * authenticated user. Not all APIs are available as a guest, so it is preferred to authenticate the user if possible.
 */
export interface IYouTubeMusic {
    /**
     * Authenticates the user with the YouTube Music API. This function overload requies the cookie string of a valid logged in user.
     *
     * @param cookiesStr The cookie string of a valid logged in user. To obtain this cookie value, log into https://music.youtube.com as a user
     * and use your browser's developer tools to obtain the "cookie" value sent as a request header. Extra values in the cookie will be ignored.
     * @param authUser X-Goog-AuthUser header value
     * @returns A promise that will yield authenticated access to the YouTube Music API.
     */
    authenticate(cookiesStr: string, authUser: number): Promise<IYouTubeMusicAuthenticated>;

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
     * Adds the tracks to the specified playlist.
     *
     * @param playlistId The ID of the playlist to add the tracks to.
     * @param tracks The array of tracks to add to the playlist.
     * @returns A promise that will yield whether or not the operation was successful.
     */
    addTracksToPlaylist(playlistId: string, ...tracks: ITrackDetail[]): Promise<boolean>;

    /**
     * Creates a playlist in the user's library.
     *
     * @param name The name of the playlist to create.
     * @param description An optional description for the playlist.
     * @param privacy An optional privacy level for the playlist (either PUBLIC, PRIVATE, or UNLISTED).
     * @param sourcePlaylistId An optional playlist ID to copy the initial set of tracks from.
     * @returns A promise that will yield the playlist with its ID.
     */
    createPlaylist(name: string, description?: string, privacy?: string, sourcePlaylistId?: string): Promise<IPlaylistSummary>;

    /**
     * Deletes a playlist from the user's library.
     *
     * @param playlistId The ID of the playlist to delete.
     * @returns A promise that will yield whether or not the operation was successful.
     */
    deletePlaylist(playlistId: string): Promise<boolean>;

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

    /**
     * Gets recently played tracks, in reverse chronological order, from the user's library
     *
     * @returns A promise that will yield a playlist with detailed information on a recently played tracks.
     */
    getLibraryHistory(): Promise<IPlaylistDetail>

    /**
     * Moves the specified track within the playlist.
     *
     * @param playlistId The ID of the playlist to move the track within.
     * @param trackToMove The track that should be moved.
     * @param trackToMoveBefore An optional track to move the track before. If unspecified, the track will be moved to the end of the playlist.
     * @returns A promise that will yield whether or not the operation was successful.
     */
    moveTrackWithinPlaylist(playlistId: string, trackToMove: ITrackDetail, trackToMoveBefore?: ITrackDetail): Promise<boolean>;

    /**
     * Removes the tracks from the specified playlist.
     *
     * @param playlistId The ID of the playlist to remove the tracks from.
     * @param tracks The array of tracks to remove from the playlist.
     * @returns A promise that will yield whether or not the operation was successful.
     */
    removeTracksFromPlaylist(playlistId: string, ...tracks: ITrackDetail[]): Promise<boolean>;

    /**
     * Rates a track ("thumbs up"/"thumbs down" interaction).
     *
     * @param trackId The ID of the track to rate.
     * @param rating One of 'LIKE', 'DISLIKE', or 'INDIFFERENT'. 'INDIFFERENT' removes the previous rating and assigns no rating.
     * @returns A promise that will yield whether or not the operation was successful.
     */
    rateTrack(trackId: string, rating: "LIKE"|"DISLIKE"|"INDIFFERENT"): Promise<boolean>;
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
