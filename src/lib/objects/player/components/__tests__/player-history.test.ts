import PlayerHistory from "../player-history";

describe("player history", () => {
  test("no history", () => {
    expect(
      PlayerHistory.toHex("", { "00": "Man Utd" }, { "0000": "Porto" }, { "02": "Spain" }),
    ).toEqual({ errors: [], values: [] });
  });

  test("single history", () => {
    expect(
      PlayerHistory.toHex(
        "1991|Man Utd|2|0",
        { "00": "Man Utd" },
        { "0000": "Porto" },
        { "02": "Spain" },
      ),
    ).toEqual({ errors: [], values: ["5b", "00", "02", "00"] });
  });

  test("multiple history", () => {
    expect(
      PlayerHistory.toHex(
        "1991|Man Utd|2|0,1992|Spain|20|10",
        { "00": "Man Utd" },
        { "0000": "Porto" },
        { "02": "Spain" },
      ),
    ).toEqual({ errors: [], values: ["5b", "00", "02", "00", "5c", "8e", "14", "0a"] });
  });

  test("bad parse", () => {
    expect(
      PlayerHistory.toHex(
        "1991|Man Utd|2",
        { "00": "Man Utd" },
        { "0000": "Porto" },
        { "02": "Spain" },
      ),
    ).toEqual({
      errors: ["Missing a history year, club, games or goals for history number 1"],
      values: [],
    });
  });

  test("good and bad parse", () => {
    expect(
      PlayerHistory.toHex(
        "1991|Man Utd|2|0,1992|20|10",
        { "00": "Man Utd" },
        { "0000": "Porto" },
        { "02": "Spain" },
      ),
    ).toEqual({
      errors: ["Missing a history year, club, games or goals for history number 2"],
      values: ["5b", "00", "02", "00"],
    });
  });

  test("invalid values in history", () => {
    expect(
      PlayerHistory.toHex(
        "1891|Man Utd|256|256",
        { "00": "Man Utd" },
        { "0000": "Porto" },
        { "02": "Spain" },
      ),
    ).toEqual({
      errors: [
        "Value must be between 1900 and 2100 for history number 1",
        "Value must be between 0 and 255 for history number 1",
        "Value must be between 0 and 255 for history number 1",
      ],
      values: ["-9", "00", "100", "100"],
    });
  });
});
