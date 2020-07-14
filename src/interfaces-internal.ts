import * as http from "http";
import { IPlaylistDetail } from "./interfaces-supplementary";

export interface IIncomingMessage extends http.IncomingMessage {
    body?: string;
}

export interface IInternalPlaylistDetail extends IPlaylistDetail {
    continuationToken?: string;
}
