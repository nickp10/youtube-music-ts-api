import * as http from "http";
import sha1 from "sha1";
import YouTubeMusicGuest from "./youtube-music-guest";
import {
    IAlbumSummary,
    IArtistSummary,
    IPlaylistDetail,
    IPlaylistSummary,
    ITrackDetail
} from "../interfaces-supplementary";
import { IYouTubeMusicAuthenticated} from "../interfaces-primary";

export default class YouTubeMusicAuthenticated extends YouTubeMusicGuest implements IYouTubeMusicAuthenticated {
    private hsid: string;
    private ssid: string;
    private apisid: string;
    private sapisid: string;
    private secure3psid: string;
    private secure3papisid: string;
    private authUser: number;

    constructor(hsid: string, ssid: string, apisid: string, sapisid: string, secure3psid: string, secure3papisid: string, authUser: number) {
        super();
        this.hsid = hsid;
        this.ssid = ssid;
        this.apisid = apisid;
        this.sapisid = sapisid;
        this.secure3psid = secure3psid;
        this.secure3papisid = secure3papisid;
        this.authUser = authUser;
    }

    protected generateHeaders(): http.OutgoingHttpHeaders {
        return {
            ...super.generateHeaders(),
            "Authorization": this.generateAuthorization(),
            "Cookie": this.generateCookie(),
            "X-Goog-AuthUser": this.authUser
        };
    }

    private generateAuthorization(): string {
        let time = new Date().getTime();
        const input = `${time} ${this.secure3papisid} ${this.origin}`;
        const digest = sha1(input);
        return `SAPISIDHASH ${time}_${digest}`;
    }

    private generateCookie(): string {
        return `HSID=${this.hsid}; SSID=${this.ssid}; APISID=${this.apisid}; SAPISID=${this.sapisid}; __Secure-3PSID=${this.secure3psid}; __Secure-3PAPISID=${this.secure3papisid}`;
    }

    async getLibraryAlbums(): Promise<IAlbumSummary[]> {
        const response = await this.sendRequest("browse", {
            browseId: "FEmusic_liked_albums",
        });
        return this.albumParser.parseAlbumsSummaryResponse(response);
    }

    async getLibraryArtists(): Promise<IArtistSummary[]> {
        const response = await this.sendRequest("browse", {
            browseId: "FEmusic_library_corpus_track_artists",
        });
        return this.artistParser.parseArtistsSummaryResponse(response);
    }

    async getLibraryPlaylists(): Promise<IPlaylistSummary[]> {
        const response = await this.sendRequest("browse", {
            browseId: "FEmusic_liked_playlists",
        });

        return this.playlistParser.parsePlaylistsSummaryResponse(response);
    }

    async getLibraryTracks(): Promise<ITrackDetail[]> {
        return this.getLibraryTracksInternal();
    }

    private async getLibraryTracksInternal(): Promise<ITrackDetail[]> {
        const data = {
            browseId: "FEmusic_liked_videos",
        };
        const response = await this.sendRequest("browse", data);
        const tracksDetailResponse = this.trackParser.parseTracksDetailResponse(response);
        while (tracksDetailResponse.continuationToken) {
            const continuation = await this.sendRequest("browse", data, `ctoken=${tracksDetailResponse.continuationToken}&continuation=${tracksDetailResponse.continuationToken}`);
            this.trackParser.parseTracksDetailContinuation(tracksDetailResponse, continuation);
        }
        return tracksDetailResponse.tracks;
    }

    async getLibraryHistory(): Promise<IPlaylistDetail> {
        const data = {
            browseId: "FEmusic_history",
        };
        const response = await this.sendRequest("browse", data);

        // cannot use parsePlaylistDetailResponse because last slice is different IE musicPlaylistShelfRenderer !== musicShelfRenderer
        const recentPlays = this.playlistParser.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "0", "musicShelfRenderer");

        return {
            id: 'FEmusic_history', // no real id for this playlist
            name: 'History',
            description: 'Recently played music in reverse chronological order',
            privacy: 'PRIVATE',
            count: recentPlays.contents.length,
            tracks: this.trackParser.parseTrackDetails(recentPlays.contents)
        }
    }

    async createPlaylist(name: string, description?: string, privacy?: string, sourcePlaylistId?: string): Promise<IPlaylistSummary> {
        const response = await this.sendRequest("playlist/create", {
            title: name,
            description: description,
            privacyStatus: privacy || 'PRIVATE',
            sourcePlaylistId: this.playlistIdTrim(sourcePlaylistId)
        });
        if (!response || !response.playlistId) {
            return undefined;
        }
        return {
            id: response.playlistId,
            name: name,
            count: 0
        };
    }

    async deletePlaylist(playlistId: string): Promise<boolean> {
        const response = await this.sendRequest("playlist/delete", {
            playlistId: this.playlistIdTrim(playlistId)
        });
        return response.status === "STATUS_SUCCEEDED";
    }

    async addTracksToPlaylist(playlistId: string, ...tracks: ITrackDetail[]): Promise<boolean> {
        const response = await this.sendRequest("browse/edit_playlist", {
            playlistId: this.playlistIdTrim(playlistId),
            actions: tracks.map(track => {
                return {
                    action: "ACTION_ADD_VIDEO",
                    addedVideoId: track.id
                };
            })
        });
        return response.status === "STATUS_SUCCEEDED";
    }

    async removeTracksFromPlaylist(playlistId: string, ...tracks: ITrackDetail[]): Promise<boolean> {
        const actions: any[] = [];
        for (const track of tracks) {
            if (!track.id) {
                throw new Error("Track ID is missing. Ensure you have both the ID and the Alternate ID.");
            } else if (!track.alternateId) {
                throw new Error("Track Alternate ID is missing. Ensure you have both the ID and the Alternate ID.")
            } else {
                actions.push({
                    action: "ACTION_REMOVE_VIDEO",
                    removedVideoId: track.id,
                    setVideoId: track.alternateId
                });
            }
        }
        const response = await this.sendRequest("browse/edit_playlist", {
            playlistId: this.playlistIdTrim(playlistId),
            actions: actions
        });
        return response.status === "STATUS_SUCCEEDED";
    }

    async moveTrackWithinPlaylist(playlistId: string, trackToMove: ITrackDetail, trackToMoveBefore?: ITrackDetail): Promise<boolean> {
        const actions: any[] = [];
        if (!trackToMove || !trackToMove.alternateId) {
            throw new Error("The track being moved is missing. Ensure you have specified a track to move.");
        } else {
            actions.push({
                action: "ACTION_MOVE_VIDEO_BEFORE",
                movedSetVideoIdSuccessor: trackToMoveBefore ? trackToMoveBefore.alternateId : undefined,
                setVideoId: trackToMove.alternateId
            });
        }
        const response = await this.sendRequest("browse/edit_playlist", {
            playlistId: this.playlistIdTrim(playlistId),
            actions: actions
        });
        return response.status === "STATUS_SUCCEEDED";
    }

    /**
     * Rates a song ("thumbs up"/"thumbs down" interactions on YouTube Music)
     *
     * @param videoId Video ID
     * @param rating One of 'LIKE', 'DISLIKE', 'INDIFFERENT'
     *   'INDIFFERENT' removes the previous rating and assigns no rating
     * @returns
     */
    async rateTrack(videoId: string, rating: "LIKE"|"DISLIKE"|"INDIFFERENT"): Promise<boolean> {
        let endpoint: string;

        if (rating === "LIKE") {
            endpoint = "like/like";
        } else if (rating === "DISLIKE") {
            endpoint = "like/dislike";
        } else {
            endpoint = "like/removelike";
        }

        const response = await this.sendRequest(endpoint, {
            target: {
                videoId: videoId,
            }
        });

        return response.status === "STATUS_SUCCEEDED";
    }
}
