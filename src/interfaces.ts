import * as http from "http";

export interface IIncomingMessage extends http.IncomingMessage {
    body?: string;
}

export interface IAlbumSummary {
    id?: string;
    name?: string;
}

export interface IArtistSummary {
    id?: string;
    name?: string;
}

export interface IPlaylistDetail {
    id?: string;
    name?: string;
    description?: string;
    count?: number;
    privacy?: string;
    tracks?: ITrackDetail[];
}

export interface IPlaylistSummary {
    id?: string;
    name?: string;
    count?: number;
}

export interface ITrackDetail {
    id?: string;
    title?: string;
    artists?: IArtistSummary[];
    album?: IAlbumSummary;
    duration?: string;
}
