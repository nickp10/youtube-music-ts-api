import * as assert from "assert";
import * as fs from "fs";
import TrackParser from "./track-parser";

describe("TrackParser", () => {
    describe("#parseTrackDetailResponse()", () => {
        it("should parse the track detail", () => {
            // Arrange
            const target = new TrackParser();
            const responseStr = fs.readFileSync("src-spec-data/trackDetail.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const trackDetail = target.parseTrackDetail(response);

            // Assert
            assert.strictEqual(trackDetail.id, "hoK3H43zfNU");
            assert.strictEqual(trackDetail.title, "Clockin' w's");
            assert.strictEqual(trackDetail.album.id, "MPREb_1g3L3rlCg6e");
            assert.strictEqual(trackDetail.album.name, "Clockin' w's");
            assert.strictEqual(trackDetail.artists.length, 1);
            assert.strictEqual(trackDetail.artists[0].id, "UC-hq652s5fGz-iJc-NuBJ4Q");
            assert.strictEqual(trackDetail.artists[0].name, "Twiztid & Young Wicked");
            assert.strictEqual(trackDetail.duration, "2:59");
        });
    });
});
