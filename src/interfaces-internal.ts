import * as http from "http";

export interface IIncomingMessage extends http.IncomingMessage {
    body?: string;
}
