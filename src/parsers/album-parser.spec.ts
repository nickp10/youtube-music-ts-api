import * as assert from "assert";
import * as fs from "fs";
import AlbumParser from "./album-parser";

describe("AlbumParser", () => {
    describe("#parseAlbumsSummaryResponse()", () => {
        it("should parse the playlists summary response", () => {
            // Arrange
            const target = new AlbumParser();
            const responseStr = fs.readFileSync("src-spec-data/albumsSummaryResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parseAlbumsSummaryResponse(response);

            // Assert
            assert.strictEqual(actual.length, 2);
            const actualFirst = actual[0];
            assert.strictEqual(actualFirst.id, "MPREb_NDXVvJ4Gt60");
            assert.strictEqual(actualFirst.name, "Generation Nightmare");
            assert.strictEqual(actualFirst.artist.id, "UC-hq652s5fGz-iJc-NuBJ4Q");
            assert.strictEqual(actualFirst.artist.name, "Twiztid");
            assert.strictEqual(actualFirst.year, "2019");
            const actualSecond = actual[1];
            assert.strictEqual(actualSecond.id, "MPREb_bhlAYwJsEUF");
            assert.strictEqual(actualSecond.name, "Mad Season");
            assert.strictEqual(actualSecond.artist.id, "UC-hq652s5fGz-iJc-NuBJ4Q");
            assert.strictEqual(actualSecond.artist.name, "Twiztid");
            assert.strictEqual(actualSecond.year, "2020");
        });

        describe("#parseAlbumDetailResponse()", () => {
            it("should parse the album detail response", () => {
                // Arrange
            const target = new AlbumParser();
                const responseStr = fs.readFileSync("src-spec-data/albumDetailResponse.json", "utf-8");
                const response = JSON.parse(responseStr);

                // Act
                const actual = target.parseAlbumDetailResponse(response);

                // Assert
                assert.strictEqual(actual.id, "MPREb_NDXVvJ4Gt60");
                assert.strictEqual(actual.name, "Generation Nightmare");
                assert.strictEqual(actual.artists.length, 1);
                assert.strictEqual(actual.artists[0].id, "UC-hq652s5fGz-iJc-NuBJ4Q");
                assert.strictEqual(actual.artists[0].name, "Twiztid");
                assert.strictEqual(actual.count, 20);
                assert.strictEqual(actual.durationMillis, 3431483);
                assert.strictEqual(actual.releaseDay, 26);
                assert.strictEqual(actual.releaseMonth, 4);
                assert.strictEqual(actual.releaseYear, 2019);
                assert.strictEqual(actual.description, "Generation Nightmare is the twelfth studio album by American hip hop duo Twiztid. It was released on April 26, 2019 through Majik Ninja Entertainment with distribution via INgrooves. Recording sessions took place at the Dojo in Michigan. Production was handled by A Danger Within, Michael \"Seven\" Summers, YYBeats, Godsynth, Young Wicked, Fritz the Cat and Lunar⋆Vision. The album is noted for its nu metal-influenced sound, a concept that Twiztid first explored on the album Mutant, although metal here gets much more emphasis than the duo's characteristic hip-hop.\nIt features guest appearances from Alla Xul Elu, Young Wicked and Tuckas Budghras.");
                assert.strictEqual(actual.tracks.length, 20);
                assert.strictEqual(actual.tracks[0].id, "iMlfePUwotU");
                assert.strictEqual(actual.tracks[0].title, "live forever");
                assert.strictEqual(actual.tracks[0].album.name, "Generation Nightmare");
                assert.strictEqual(actual.tracks[0].artists[0].name, "Twiztid");
                assert.strictEqual(actual.tracks[0].durationMillis, 151753);
                assert.strictEqual(actual.tracks[0].trackNumber, 1);
            });
        });
    });
});
