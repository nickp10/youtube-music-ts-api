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
