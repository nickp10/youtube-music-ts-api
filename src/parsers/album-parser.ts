import BaseParser from "./base-parser";
import TrackParser from "./track-parser";
import { IAlbumDetail, IAlbumSummary, IArtistSummary } from "../interfaces-supplementary";

export default class AlbumParser extends BaseParser {
    private trackParser: TrackParser;

    constructor() {
        super();
        this.trackParser = new TrackParser();
    }

    parseAlbumsSummaryResponse(response: any): IAlbumSummary[] {
        const albums: IAlbumSummary[] = [];
        const items: any[] = this.traverse(response, "contents", "singleColumnBrowseResultsRenderer", "tabs", "0", "tabRenderer", "content", "sectionListRenderer", "contents", "*", "itemSectionRenderer", "contents", "0", "gridRenderer", "items");
        if (Array.isArray(items)) {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const album = this.parseAlbumSummary(item);
                if (album) {
                    albums.push(album);
                }
            }
        }
        return albums;
    }

    parseAlbumSummary(albumObj: any): IAlbumSummary {
        let artist: IArtistSummary = undefined;
        let year: string = undefined;
        const subtitles = this.traverse(albumObj, "musicTwoRowItemRenderer", "subtitle", "runs");
        if (Array.isArray(subtitles)) {
            const artistId = this.traverse(subtitles, "2", "navigationEndpoint", "browseEndpoint", "browseId");
            if (artistId) {
                artist = {
                    id: artistId,
                    name: this.traverse(subtitles, "2", "text")
                };
            }
            year = this.traverse(subtitles, "4", "text");
        }
        return {
            id: this.traverse(albumObj, "musicTwoRowItemRenderer", "title", "runs", "0", "navigationEndpoint", "browseEndpoint", "browseId"),
            name: this.traverse(albumObj, "musicTwoRowItemRenderer", "title", "runs", "0", "text"),
            artist: artist,
            year: year
        };
    }

    parseAlbumDetailResponse(response: any): IAlbumDetail {
        const mutations = this.traverse(response, "frameworkUpdates", "entityBatchUpdate", "mutations");
        if (Array.isArray(mutations)) {
            let albumObj = undefined;
            let albumDetailObj = undefined;
            let artistObjs = [];
            let trackObjs = [];
            for (const mutation of mutations) {
                if (!albumObj) {
                    const tempAlbumObj = this.traverse(mutation, "payload", "musicAlbumRelease");
                    if (tempAlbumObj) {
                        albumObj = tempAlbumObj;
                    }
                }
                if (!albumDetailObj) {
                    const tempAlbumDetailObj = this.traverse(mutation, "payload", "musicAlbumReleaseDetail");
                    if (tempAlbumDetailObj) {
                        albumDetailObj = tempAlbumDetailObj;
                    }
                }
                const tempArtistObj = this.traverse(mutation, "payload", "musicArtist");
                if (tempArtistObj) {
                    artistObjs.push(tempArtistObj);
                }
                const tempTrackObj = this.traverse(mutation, "payload", "musicTrack");
                if (tempTrackObj) {
                    trackObjs.push(tempTrackObj);
                }
            }
            const albumSummary: IAlbumSummary = {
                id: this.traverse(response, "responseContext", "serviceTrackingParams", "0", "params", "1", "value"),
                name: this.traverse(albumObj, "title")
            };
            const artists = this.parseAlbumDetailArtists(artistObjs);
            const tracks = this.trackParser.parseAlbumTrackDetails(trackObjs, artists, albumSummary);
            return {
                id: albumSummary.id,
                name: albumSummary.name,
                description: this.traverse(albumDetailObj, "description"),
                durationMillis: parseInt(this.traverse(albumObj, "durationMs")),
                count: parseInt(this.traverse(albumObj, "trackCount")),
                releaseDay: this.traverse(albumObj, "releaseDate", "day"),
                releaseMonth: this.traverse(albumObj, "releaseDate", "month"),
                releaseYear: this.traverse(albumObj, "releaseDate", "year"),
                artists: artists,
                tracks: tracks
            };
        }
        return undefined;
    }

    parseAlbumDetailArtists(artistObjs: any[]): IArtistSummary[] {
        const artists: IArtistSummary[] = [];
        for (const artistObj of artistObjs) {
            artists.push({
                id: this.traverse(artistObj, "externalChannelId"),
                name: this.traverse(artistObj, "name")
            });
        }
        return artists;
    }
}
