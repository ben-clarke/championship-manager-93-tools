import { Version } from "../../../../types/version";
import PlayerClub from "../player-club";

describe("player club", () => {
  test("to hex happy", () => {
    const hex = PlayerClub.toHex("Man Utd", { "01": "Man Utd" }, { "02": "Spain" }, "94");
    expect(hex).toEqual({ value: "01", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = PlayerClub.toHex("Man UTD", { "01": "Man Utd" }, { "02": "Spain" }, "94");
    expect(hex).toEqual({ value: "01", errors: [] });
  });

  test("to hex happy foreign", () => {
    const hex = PlayerClub.toHex("Spain", { "01": "Man Utd" }, { "02": "Spain" }, "94");
    expect(hex).toEqual({ value: "8e", errors: [] });
  });

  test("to hex sad", () => {
    const hex = PlayerClub.toHex("Man Utd", { "00": "Aston Villa" }, { "02": "Spain" }, "94");
    expect(hex).toEqual({ value: "", errors: ["No player club found for: Man Utd"] });
  });

  test("to hex not italia serie c1b", () => {
    const hex = PlayerClub.toHex("Serie C1B", { "00": "Aston Villa" }, { "02": "Spain" }, "94");
    expect(hex).toEqual({ value: "", errors: ["No player club found for: Serie C1B"] });
  });

  test.each([["Italia", "Italia95"]])("to hex is italia serie c1b", (version) => {
    const hex = PlayerClub.toHex(
      "Serie C1B",
      { "00": "Aston Villa" },
      { "02": "Spain" },
      version as Version,
    );
    expect(hex).toEqual({ value: "d5", errors: [] });
  });
});
