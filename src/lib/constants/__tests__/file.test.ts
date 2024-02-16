import { getGameVersion } from "../file";

describe("file", () => {
  describe("getGameVersion", () => {
    test("cm93", () => {
      expect(
        getGameVersion({ "00": "Championship Manager '93" }, { "00": "1993 Players" }),
      ).toEqual("93");
    });

    test("cm9394", () => {
      expect(
        getGameVersion({ "00": "Championship Manager '93/94" }, { "00": "1993/4 Players" }),
      ).toEqual("94");
    });

    test("cm94", () => {
      expect(
        getGameVersion({ "00": "Championship Manager '94" }, { "00": "1994 Players" }),
      ).toEqual("94");
    });

    test("Italia", () => {
      expect(
        getGameVersion({ "00": "Championship Manager Italia" }, { "00": "1994 Players" }),
      ).toEqual("Italia");
    });

    test("Italia95", () => {
      expect(
        getGameVersion({ "00": "Championship Manager Italia" }, { "00": "1994/95 Players" }),
      ).toEqual("Italia95");
    });
  });
});
