import * as assert from "assert";
import * as fs from "fs";
import TrackParser from "./track-parser";

describe("TrackParser", () => {
    describe("#parseTrackDetail()", () => {
        it("should parse the track detail", () => {
            // Arrange
            const target = new TrackParser();
            const responseStr = fs.readFileSync("src-spec-data/trackDetail.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const trackDetail = target.parseTrackDetail(response);

            // Assert
            assert.strictEqual(trackDetail.id, "hoK3H43zfNU");
            assert.strictEqual(trackDetail.alternateId, "56B44F6D10557CC6");
            assert.strictEqual(trackDetail.title, "Clockin' w's");
            assert.strictEqual(trackDetail.album.id, "MPREb_1g3L3rlCg6e");
            assert.strictEqual(trackDetail.album.name, "Clockin' w's");
            assert.strictEqual(trackDetail.artists.length, 1);
            assert.strictEqual(trackDetail.artists[0].id, "UC-hq652s5fGz-iJc-NuBJ4Q");
            assert.strictEqual(trackDetail.artists[0].name, "Twiztid & Young Wicked");
            assert.strictEqual(trackDetail.duration, "2:59");
        });
    });

    describe("#parseTracksDetailResponse()", () => {
        it("should parse the tracks detail response", () => {
            // Arrange
            const target = new TrackParser();
            const responseStr = fs.readFileSync("src-spec-data/tracksDetailResponse.json", "utf-8");
            const response = JSON.parse(responseStr);

            // Act
            const actual = target.parseTracksDetailResponse(response);

            // Assert
            assert.strictEqual(actual.continuationToken, "4qmFsgKpAhIURkVtdXNpY19saWtlZF92aWRlb3MakAI2Z1BEQVVOdk9FSkRiVkZMUWtGblFVVkJSV2xOTURGV1ZUQnNSRmd3ZUVwUmJFcENWV3hzWmxVd2FFWlVSVnBtVVRBNVQxWkZiRTlXVlVaVlUxVTVUMWd4VWxCVE1GWlBXREZhUWxSRmJFVlJWbEpRVld3NVNsSkVTVzVSTUVweVZWVmtVMkl3ZEVSUlZWWlNVVmRvZGxFeGNGaE9SMlJDVlRCc1RWRXdNWGhQV0d4UldqQmFSbFJGT1hsalZWWlNSMEZCY1VkdGVIQlpia3BvWTI1c1ptTXlPWFZhTTA1bVpESnNNR0ZHT1hwaU0wb3dZVmMxYmsxTkxYZHpaWEZWTTBsaFgzSlJSUSUzRCUzRA%3D%3D");
            assert.strictEqual(actual.tracks.length, 25);
            const actualFirst = actual.tracks[0];
            assert.strictEqual(actualFirst.id, "2h-taP8UeLI");
            assert.strictEqual(actualFirst.title, "Scars");
            assert.strictEqual(actualFirst.album.id, "MPREb_urfjOxFWV2p");
            assert.strictEqual(actualFirst.album.name, "Spirits");
            assert.strictEqual(actualFirst.artists.length, 2);
            assert.strictEqual(actualFirst.artists[0].id, "UC61JVc2eSO2xHrLwF-GUHWg");
            assert.strictEqual(actualFirst.artists[0].name, "Hard Target");
            assert.strictEqual(actualFirst.artists[1].id, "UCrtQ8ewZTCl7IHC7sx1Dl_Q");
            assert.strictEqual(actualFirst.artists[1].name, "Wess Nyle");
            assert.strictEqual(actualFirst.duration, "5:29");
        });
    });
});
