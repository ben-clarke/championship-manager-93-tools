import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../cm-exe-parser";
import Team from "../team";
import { resetConverted } from "../utils/cm-exe-builder";

describe("team", () => {
  beforeEach(() => {
    resetConverted();
  });

  afterEach(() => {
    resetConverted();
  });

  test("happy", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const teamData = [...TEAM_DATA];

    const team = new Team({ rawData: unparse(teamData), data });
    const { hex, errors } = team.convertFromHumanReadable();

    expect(hex.length).toEqual(46 * 2); // Characters per team * number of teams
    expect(hex).toEqual(
      [
        "2e1b050b0001100f0bb85a000000000100aa0700010001",
        "2d2a01020f0611102ee05a000200020300be0700030003",
      ].join(""),
    );
    expect(errors).toEqual([]);
  });

  test("sad", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const teamData = [...TEAM_DATA];

    // Add bad club status
    teamData[1][6] = "woah";

    // Add bad board confidence
    teamData[2][10] = "200";

    const team = new Team({ rawData: unparse(TEAM_DATA), data });
    const { hex, errors } = team.convertFromHumanReadable();

    expect(hex).toEqual("");
    expect(errors).toEqual([
      "Player 1: No club status found for: woah, valid values are world class, elite, super, high, medium, low, none",
      "Player 2: Board confidence must be between 1 and 100, got: 200",
    ]);
  });

  test("cm-apw-2", () => {
    const fileDirectory = resolve(__dirname, "../../../../", "game-edits", "cm94-apw-2");
    const data = new CMExeParser({ fileDirectory });

    const team = new Team({ fileDirectory, data });
    team.toHumanReadable();
  });
});

const TEAM_DATA = [
  [
    "Capacity",
    "Seated capacity",
    "Home text",
    "Home background",
    "Away text",
    "Away background",
    "Club status",
    "Unknown 8",
    "Money",
    "Unknown 10",
    "Board confidence",
    "Manager first name",
    "Manager surname",
    "Style of play",
    "Formation",
    "Manager reputation",
    "Manager character",
    "Assistant first name",
    "Assistant surname",
  ],
  [
    "46000",
    "27000",
    "bright blue",
    "purple",
    "black",
    "white",
    "high",
    "0f",
    "3000000",
    "b8",
    "90",
    "Ron",
    "Atkinson",
    "pass to feet",
    "four-four-two",
    "170",
    "confident",
    "Dave",
    "Sexton",
  ],
  [
    "45000",
    "42000",
    "white",
    "red",
    "dark green",
    "yellow",
    "super",
    "10",
    "11750000",
    "e0",
    "90",
    "Alex",
    "Ferguson",
    "continental",
    "four-four-two",
    "190",
    "confident",
    "Bryan",
    "Robson",
  ],
];
