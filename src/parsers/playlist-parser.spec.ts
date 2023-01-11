import * as assert from "assert";
import * as fs from "fs";
import PlaylistParser from "./playlist-parser";

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
        it("should parse the playlist detail response", () => {
            // Arrange
            const target = new PlaylistParser();
            const responseStr = fs.readFileSync("src-spec-data/playlistDetailResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parsePlaylistDetailResponse(response);

            // Assert
            assert.strictEqual(actual.id, "PLr9RRFMeuGBSLnDCSxaNNhnQEtxnoiaxj");
            assert.strictEqual(actual.name, "Recents");
            assert.strictEqual(actual.count, 3);
            assert.strictEqual(actual.privacy, "PRIVATE");
            assert.strictEqual(actual.description, "Test Description");
            assert.strictEqual(actual.tracks.length, 3);
        });
    });
});
