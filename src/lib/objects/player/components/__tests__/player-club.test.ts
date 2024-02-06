import PlayerClub from "../player-club";

describe("player club", () => {
  test("to hex happy", () => {
    const hex = PlayerClub.toHex("Man Utd", { "01": "Man Utd" }, { "02": "Spain" });
    expect(hex).toEqual({ value: "01", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = PlayerClub.toHex("Man UTD", { "01": "Man Utd" }, { "02": "Spain" });
    expect(hex).toEqual({ value: "01", errors: [] });
  });

  test("to hex happy foreign", () => {
    const hex = PlayerClub.toHex("Spain", { "01": "Man Utd" }, { "02": "Spain" });
    expect(hex).toEqual({ value: "8e", errors: [] });
  });

  test("to hex sad", () => {
    const hex = PlayerClub.toHex("Man Utd", { "00": "Aston Villa" }, { "02": "Spain" });
    expect(hex).toEqual({ value: "", errors: ["No player club found for: Man Utd"] });
  });
});
