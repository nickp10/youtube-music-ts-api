/**
 * Defines the details for an album.
 */
export interface IAlbumDetail {
    /**
     * The ID of the album.
     */
    id?: string;

    /**
     * The name of the album.
     */
    name?: string;

    /**
     * The description of the album.
     */
    description?: string;

    /**
     * The count of tracks within the album.
     */
    count?: number;

    /**
     * The duration of the album in milliseconds.
     */
    durationMillis?: number;

    /**
     * The artist(s) that composed the album.
     */
    artists?: IArtistSummary[];

    /**
     * The day the album was released.
     */
    releaseDay?: number;

    /**
     * The month the album was released.
     */
    releaseMonth?: number;

    /**
     * The year the album was released.
     */
    releaseYear?: number;

    /**
     * The array of tracks within the album.
     */
    tracks: ITrackDetail[];
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

    /**
     * The artist that composed the album.
     */
    artist?: IArtistSummary;

    /**
     * The year the album was released.
     */
    year?: string;
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
     * The privacy level of the playlist. This value will be PUBLIC, PRIVATE, or UNLISTED.
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

    /**
     * The thumbnails for the playlist (ordered from smallest to largest).
     */
    thumbnails?: IThumbnail[];
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
     * An alternate ID of the track. YouTube internally refers to this value as the setVideoId. This ID
     * is used in combination with the standard ID in order to remove tracks from playlists.
     */
    alternateId?: string;

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

    /**
     * The duration of the track in milliseconds.
     */
    durationMillis?: number;

    /**
     * The track number within an album.
     */
    trackNumber?: number;

    /**
     * The thumbnails for the track (ordered from smallest to largest).
     */
    thumbnails?: IThumbnail[];

    /**
     * The rating for the track (LIKE, DISLIKE, or INDIFFERENT).
     */
    likeStatus?: "LIKE"|"DISLIKE"|"INDIFFERENT";
}

/**
 * Defines the details for a thumbnail.
 */
export interface IThumbnail {
    /**
     * The URL for the thumbnail.
     */
    url?: string,

    /**
     * The width of the thumbnail.
     */
    width?: number,

    /**
     * The height of the thumbnail.
     */
    height?: number,
}
