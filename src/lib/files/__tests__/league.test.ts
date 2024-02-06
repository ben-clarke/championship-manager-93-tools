import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../cm-exe-parser";
import League from "../league";
import { LEAGUE_DATA } from "./data/league-data";

describe("league", () => {
  test("happy", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex.split("").splice(0, 284).join("")).toEqual(
      [
        "00480000000000000001000001190600a00806130e0f0c1207ff0c0e07080a0d5607010057070800580711085907220a5a03260a5c000e015d001c0bff",
        "0049008a0000000100000100011a0500a5070d110e04050206ff0a080b090a0f550900005609010056440c00570902005815120059152c005a152e025b151d025b152e035c151d025c000d005d002a01ff",
      ].join(""),
    );
    expect(errors).toEqual([]);
  });

  test("squads are always in order", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    // New club
    leagueData[1][0] = "Man Utd";

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex.split("").splice(0, 288).join("")).toEqual(
      [
        "0049008a0000000100000100011a0500a5070d110e04050206ff0a080b090a0f550900005609010056440c00570902005815120059152c005a152e025b151d025b152e035c151d025c000d005d002a01ff",
        "004a008b00000000010100000115010b9104080a0a06050c06ff07080a0a0a0a5c0002005d000700ff003d008c00000100000000000015061f960000000000",
      ].join(""),
    );
    expect(errors).toEqual([]);
  });

  test("squads cannot be too large", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    // New club
    leagueData[2][0] = "Man Utd";
    leagueData[3][0] = "Man Utd";

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex).toEqual("");
    expect(errors).toEqual(["Squad size must be between 13 and 26, got: 27 for Man Utd"]);
  });

  test("squads cannot be too small", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    // New club
    leagueData[2][0] = "Man Utd";
    leagueData[3][0] = "Norwich";
    leagueData[4][0] = "Sheff Wed";
    leagueData[5][0] = "Everton";
    leagueData[6][0] = "Liverpool";
    leagueData[7][0] = "Man City";
    leagueData[8][0] = "Tottenham";
    leagueData[9][0] = "Oxford";
    leagueData[10][0] = "Ipswich";
    leagueData[11][0] = "Coventry";
    leagueData[12][0] = "Q.P.R.";

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex).toEqual("");
    expect(errors).toEqual(["Squad size must be between 13 and 26, got: 12 for Aston Villa"]);
  });

  test("must be 80 squads", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    for (let i = 1; i < 24; i += 1) {
      leagueData[i][0] = "Man Utd";
    }

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex).toEqual("");
    expect(errors).toEqual([
      "Invalid number of squads provided, must be 80, got: 79",
      "Squad size must be between 13 and 26, got: 48 for Man Utd",
    ]);
  });

  test("sqaud names must be known", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    for (let i = 1; i < 24; i += 1) {
      leagueData[i][0] = "Melchester Rovers";
    }

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex).toEqual("");
    expect(errors).toEqual([
      "Player 1: No player club found for: Melchester Rovers",
      "Player 2: No player club found for: Melchester Rovers",
      "Player 3: No player club found for: Melchester Rovers",
      "Player 4: No player club found for: Melchester Rovers",
      "Player 5: No player club found for: Melchester Rovers",
      "Player 6: No player club found for: Melchester Rovers",
      "Player 7: No player club found for: Melchester Rovers",
      "Player 8: No player club found for: Melchester Rovers",
      "Player 9: No player club found for: Melchester Rovers",
      "Player 10: No player club found for: Melchester Rovers",
      "Player 11: No player club found for: Melchester Rovers",
      "Player 12: No player club found for: Melchester Rovers",
      "Player 13: No player club found for: Melchester Rovers",
      "Player 14: No player club found for: Melchester Rovers",
      "Player 15: No player club found for: Melchester Rovers",
      "Player 16: No player club found for: Melchester Rovers",
      "Player 17: No player club found for: Melchester Rovers",
      "Player 18: No player club found for: Melchester Rovers",
      "Player 19: No player club found for: Melchester Rovers",
      "Player 20: No player club found for: Melchester Rovers",
      "Player 21: No player club found for: Melchester Rovers",
      "Player 22: No player club found for: Melchester Rovers",
      "Player 23: No player club found for: Melchester Rovers",
    ]);
  });

  test("sad", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA));

    // Add unknown name
    leagueData[1][1] = "Aquamarine";

    // Add injury status
    leagueData[2][4] = "unknown";

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex).toEqual("");
    expect(errors).toEqual([
      "Player 1: No person name found for: Aquamarine",
      "Player 2: No injury status found for: unknown, valid values are fit, injured",
    ]);
  });
});
