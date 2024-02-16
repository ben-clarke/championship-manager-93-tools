import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../cm-exe-parser";
import League from "../league";
import { resetConverted } from "../utils/cm-exe-builder";
import { LEAGUE_DATA } from "./data/league-data";

describe("league", () => {
  beforeEach(() => {
    resetConverted();
  });

  afterEach(() => {
    resetConverted();
  });

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

  test("with no history", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const leagueData = JSON.parse(JSON.stringify(LEAGUE_DATA)).map((d: string[]) =>
      d.splice(0, d.length - 1),
    );

    const league = new League({ rawData: unparse(leagueData), data });
    const { hex, errors } = league.convertFromHumanReadable();
    expect(hex.split("").splice(0, 132).join("")).toEqual(
      [
        "00480000000000000001000001190600a00806130e0f0c1207ff0c0e07080a0dff",
        "0049008a0000000100000100011a0500a5070d110e04050206ff0a080b090a0fff",
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

  test("squad names must be known", () => {
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

  test("happy from hex - italia", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm-italia");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const league = new League({ fileDirectory: inputDirectory, data });
    league.convertFromHex();
    expect(league.squads[0].players[1].history.map((h) => h.toString())).toEqual([
      "1982|Non league|26|1",
      "1983|Non league|26|0",
      "1984|Non league|29|2",
      "1985|Non league|4|0",
      "1986|Non league|28|4",
      "1987|Foggia|31|0",
      "1988|Foggia|22|0",
      "1989|Foggia|24|1",
      "1990|Foggia|36|2",
      "1991|Foggia|35|1",
      "1992|Foggia|34|2",
      "1993|Foggia|0|0",
      "1993|Atalanta|18|0",
    ]);
  });

  test("happy from hex - italia 95", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm-italia-95");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const league = new League({ fileDirectory: inputDirectory, data });
    league.convertFromHex();

    // Player with random apps in history, followed by 0 goals.
    expect(league.squads[5].players[0].history.map((h) => h.toString())).toEqual([
      "1990|Reggiana|3|0",
      "1991|Reggiana|6|0",
      "1992|Reggiana|36|1",
      "1993|Brescia|255|0",
      "1994|Inter Milan|16|0",
    ]);

    // Player with non-league team in history
    expect(league.squads[0].players[0].history.map((h) => h.toString())).toEqual([
      "1985|Non league|14|1",
      "1986|Non league|29|1",
      "1987|Non league|34|2",
      "1988|Padova|37|2",
      "1989|Padova|23|1",
      "1990|Pescara|36|0",
      "1991|Padova|34|4",
      "1992|Padova|33|4",
      "1993|Padova|37|2",
      "1994|Atalanta|37|6",
    ]);

    // Player with random club in history.
    expect(league.squads[13].players[18].history.map((h) => h.toString())).toEqual([
      "1986|Non league|22|5",
      "1987|Non league|2|0",
      "1987|Cosenza|21|2",
      "1988|Cosenza|21|7",
      "1989|Cosenza|30|5",
      "1990|Cosenza|31|8",
      "1991|Non league|30|11",
      "1992|Napoli|27|7",
      "1994|255|255|255",
    ]);
  });
});
