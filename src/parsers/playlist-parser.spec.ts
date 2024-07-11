import * as assert from "assert";
import * as fs from "fs";
import PlaylistParser from "./playlist-parser";
import { IInternalPlaylistDetail } from "../interfaces-internal";

describe("PlaylistParser", () => {
    describe("#parsePlaylistsSummaryResponse()", () => {
        it("should parse the playlists summary response", () => {
            // Arrange
            const target = new PlaylistParser();
            const responseStr = fs.readFileSync("src-spec-data/playlistsSummaryResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parsePlaylistsSummaryResponse(response);

            // Assert
            assert.strictEqual(actual.length, 11);
            const actualRecents = actual.find(a => a.name === "Recents");
            assert.strictEqual(actualRecents.id, "VLPLr9RRFMeuGBR-nYuU6hsV_QKTvOuq_dPx");
            assert.strictEqual(actualRecents.name, "Recents");
            assert.strictEqual(actualRecents.count, 38);
        });
    });

    describe("#parsePlaylistDetailResponse()", () => {
        it("should parse a public playlist detail response", () => {
            // Arrange
            const target = new PlaylistParser();
            const responseStr = fs.readFileSync("src-spec-data/playlistPublicDetailResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parsePlaylistDetailResponse(response);

            // Assert
            assert.strictEqual(actual.id, "PL1y4EAbxquZ-a_PCOHdXXwdiAEeaS9VmR");
            assert.strictEqual(actual.name, "EMINEM PLAYLIST");
            assert.strictEqual(actual.count, 61);
            assert.strictEqual(actual.privacy, "PUBLIC");
            assert.strictEqual(actual.continuationToken, undefined);
            assert.strictEqual(actual.description, "This playlist was created by https://www.tunemymusic.com that lets you transfer your playlist to YouTubeMusic from any music platform such as Spotify, YouTube, Apple Music, Deezer etc");
            assert.strictEqual(actual.tracks.length, 61);
        });
        it("should parse a private playlist detail response", () => {
            // Arrange
            const target = new PlaylistParser();
            const responseStr = fs.readFileSync("src-spec-data/playlistPrivateDetailResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parsePlaylistDetailResponse(response);

            // Assert
            assert.strictEqual(actual.id, "PLr9RRFMeuGBR-nYuU6hsV_QKTvOuq_dPx");
            assert.strictEqual(actual.name, "Recents");
            assert.strictEqual(actual.count, 170);
            assert.strictEqual(actual.privacy, "PRIVATE");
            assert.strictEqual(actual.continuationToken, "4qmFsgL5ARIkVkxQTHI5UlJGTWV1R0JSLW5ZdVU2aHNWX1FLVHZPdXFfZFB4GtABZW80QlVGUTZRMGRSYVVWRWJFSk9NRlV3VFZSR1JFNUVZek5PUkVrMVQxVkpiMEZWYW05cVMwUnVOMW90U0VFeFFVSlhhMVZwVVRKc1MxVldVa2xUVkZaV1lrVndTRlpHWkZkTlZrbDNVMnhPVFZaNlZtRmFSbHBXVFcxR1NWUnNaRmxOVlZwTlZtdG9ZVlZIVWxsU2JWcGhVbXRKTUZKWFpETlRXRnBhWW10S01GRldiRkprTURGd1ltcEtNMU5UU1pJQkF3aTZCQSUzRCUzRA%3D%3D");
            assert.strictEqual(actual.description, "Test Description");
            assert.strictEqual(actual.tracks.length, 100);
        });
    });

    describe("#parsePlaylistDetailContinuation()", () => {
        it("should parse the playlists continuation response", () => {
            // Arrange
            const target = new PlaylistParser();
            const responseStr = fs.readFileSync("src-spec-data/playlistContinuationDetailResponse.json", "utf-8");
            const response = JSON.parse(responseStr);
            const playlist: IInternalPlaylistDetail = { tracks: [] };

            // Act
            const actual = target.parsePlaylistDetailContinuation(playlist, response);

            // Assert
            assert.strictEqual(playlist.continuationToken, "4qmFsgL3ARIkVkxQTHI5UlJGTWV1R0JRWU10b1Z0bmwyOGczd0czbTdOM3RpGs4BZW84QlVGUTZRMDFuUWtsb1FUTlBSVkV4VDFSck5FOUVWVEpPTUVVMVVsVlpla3RCUmtsdWNYRjBiRWxtYldoblRsRkJWbkJHU1d0T2NGTnNSbFZUUldzeFZsZDRTMUl4VWxoV2FrWlRUVVZ3VTFZeFZYaE5SMGw0VjJwQ2FXSllaRFZVTUdScVpXMVJkMWt6Y0dsV1IxSlFWRlJPVTJORlZtNWtNR3g2WkZST1NXTXpaRnBWV0U1TFV6SmtNRkZWVldtU0FRTUl1Z1ElM0Q%3D");
            assert.strictEqual(playlist.tracks.length, 100);
        });
    });
});
