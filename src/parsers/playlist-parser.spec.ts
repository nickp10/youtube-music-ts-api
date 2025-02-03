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
            assert.strictEqual(actualRecents?.id, "VLPLr9RRFMeuGBR-nYuU6hsV_QKTvOuq_dPx");
            assert.strictEqual(actualRecents?.name, "Recents");
            assert.strictEqual(actualRecents?.count, 38);
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
            assert.strictEqual(actual.id, "RDCLAK5uy_nnk58Y3rT4Y62vuYUvGpWGjxL9wsb10uI");
            assert.strictEqual(actual.name, "Presenting Eminem");
            assert.strictEqual(actual.count, 40);
            assert.strictEqual(actual.privacy, "PUBLIC");
            assert.strictEqual(actual.continuationToken, undefined);
            assert.strictEqual(actual.description, "The most played hits and essential tracks. #eminem #lyrics #essentials");
            assert.strictEqual(actual.tracks?.length, 40);
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
            assert.strictEqual(actual.count, 194);
            assert.strictEqual(actual.privacy, "PRIVATE");
            assert.strictEqual(actual.continuationToken, "4qmFsgKeAhIkVkxQTHI5UlJGTWV1R0JSLW5ZdVU2aHNWX1FLVHZPdXFfZFB4GtABZW80QlVGUTZRMGRSYVVWRWJFZFBWR3MxVWxWUmQwMHdUVE5PYTA1RlRWUlJiMEZWYVhsdWIwZDZlSEZwVEVFeFFVSlhhMVZwVVRKc1MxVldVa2xUVkZaV1lrVndTRlpHWkZkTlZrbDNVMnhPVFZaNlZtRmFSbHBXVFcxR1NWUnNaRmxOVlZwTlZtdG9ZVlZIVWxsU2JWcGhVbXRKTUZKWFpETlRWRXAyVmpCYU1sVldiRkpOUlhNelVtMDVibFJUU1pJQkF3aTZCQSUzRCUzRJoCIlBMcjlSUkZNZXVHQlItbll1VTZoc1ZfUUtUdk91cV9kUHg%3D");
            assert.strictEqual(actual.description, "Test Description");
            assert.strictEqual(actual.tracks?.length, 100);
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
            assert.strictEqual(playlist.continuationToken, "4qmFsgKeAhIkVkxQTHI5UlJGTWV1R0JRanJwWDI5U01MQmtKaHB3dDhGVTJVGtABZW80QlVGUTZRMDFuUWtsb1FUQk9NRlpEVFhwamVGRlVSWGxTUlZVeFRrUk9SRXRCUmtsNVltRmpORFp4TUdsblRsRkJWbkJGU1d0T2NGTnNSbFZUUldzeFZsZDRTMUl4VWxoV2FrWlRUVVZ3VTFsWE5VdGtNV1JGVTFSV1ZrMUVSazVWVnpFd1V6SkdTVkZxVG10U1IyaElWbXhTUzFaclZtNWpNR3gyWTFjeFUyUllaRnBWV0VaS1V6SktVMUZUU1pJQkF3aTZCQSUzRCUzRJoCIlBMcjlSUkZNZXVHQlFqcnBYMjlTTUxCa0pocHd0OEZVMlU%3D");
            assert.strictEqual(playlist.tracks?.length, 98);
        });
    });
});
