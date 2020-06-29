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
            const playlistsSummary = target.parsePlaylistsSummaryResponse(response);

            // Assert
            assert.strictEqual(playlistsSummary.length, 1);
            for (var i = 0; i < playlistsSummary.length; i++) {
                const playlistSummary = playlistsSummary[i];
                assert.strictEqual(playlistSummary.id, "VLPLr9RRFMeuGBSLnDCSxaNNhnQEtxnoiaxj");
                assert.strictEqual(playlistSummary.name, "Recents");
                assert.strictEqual(playlistSummary.count, 3);
            }
        });
    });

    describe("#parsePlaylistDetailResponse()", () => {
        it("should parse the playlist detail response", () => {
            // Arrange
            const target = new PlaylistParser();
            const responseStr = fs.readFileSync("src-spec-data/playlistDetailResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const playlistDetail = target.parsePlaylistDetailResponse(response);

            // Assert
            assert.strictEqual(playlistDetail.id, "PLr9RRFMeuGBSLnDCSxaNNhnQEtxnoiaxj");
            assert.strictEqual(playlistDetail.name, "Recents");
            assert.strictEqual(playlistDetail.count, 3);
            assert.strictEqual(playlistDetail.privacy, "PRIVATE");
            assert.strictEqual(playlistDetail.description, "Test Description");
            assert.strictEqual(playlistDetail.tracks.length, 3);
        });
    });
});
