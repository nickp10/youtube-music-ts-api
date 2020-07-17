import * as http from "http";
import { IPlaylistDetail, ITrackDetail } from "./interfaces-supplementary";

export interface IIncomingMessage extends http.IncomingMessage {
    body?: string;
}

export interface IInternalPlaylistDetail extends IPlaylistDetail {
    continuationToken?: string;
}

export interface IInternalTracksDetail {
    continuationToken?: string;
    tracks?: ITrackDetail[];
}
