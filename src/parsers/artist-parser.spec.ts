import * as assert from "assert";
import * as fs from "fs";
import ArtistParser from "./artist-parser";

describe("ArtistParser", () => {
    describe("#parseArtistsSummaryResponse()", () => {
        it("should parse the artists summary response", () => {
            // Arrange
            const target = new ArtistParser();
            const responseStr = fs.readFileSync("src-spec-data/artistsSummaryResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parseArtistsSummaryResponse(response);

            // Assert
            assert.strictEqual(actual.length, 5);
            const actualFirst = actual[0];
            assert.strictEqual(actualFirst.id, "UCrtQ8ewZTCl7IHC7sx1Dl_Q");
            assert.strictEqual(actualFirst.name, "Wess Nyle");
            const actualLast = actual[4];
            assert.strictEqual(actualLast.id, "UC-hq652s5fGz-iJc-NuBJ4Q");
            assert.strictEqual(actualLast.name, "Twiztid");
        });
    });
});
