import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../cm-exe-parser";
import Foreign from "../foreign";

describe("foreign", () => {
  test("happy", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const foreign = new Foreign({ rawData: unparse(FOREIGN_DATA), data });
    const { hex, errors } = foreign.convertFromHumanReadable();
    expect(hex).toEqual(
      "01550504008e000000010000000116020278ffffffffffffffffb4ffffffffffff5b8e04005c8e1900ff01560505008e00000001000100001aff0273ffffffffffffffffffffffffffffff5c8e0400ff0bb8",
    );
    expect(errors).toEqual([]);
  });

  test("sad", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const foreignData = [...FOREIGN_DATA];

    // Add unknown name
    foreignData[1][1] = "Aquamarine";

    // Add bad injury status
    foreignData[2][4] = "unknown";

    const foreign = new Foreign({ rawData: unparse(foreignData), data });
    const { hex, errors } = foreign.convertFromHumanReadable();
    expect(hex).toEqual("");
    expect(errors).toEqual([
      "Player 1: No person name found for: Aquamarine",
      "Player 2: No injury status found for: unknown, valid values are fit, injured",
    ]);
  });

  test("happy from hex - italia", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm-italia");
    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const foreign = new Foreign({ fileDirectory: inputDirectory, data });
    foreign.convertFromHex();
    expect(foreign.players[175].club?.value).toEqual("Serie C1B");
    expect(foreign.players[273].club?.value).toEqual("Serie C1A");
  });
});

const FOREIGN_DATA = [
  [
    "Club",
    "First name",
    "Surname",
    "Transfer status",
    "Injury status",
    "Position",
    "Side",
    "Age",
    "Character",
    "Nationality",
    "Current skill",
    "Potential skill",
    "Injury proneness",
    "Passing",
    "Tackling",
    "Pace",
    "Heading",
    "Flair",
    "Creativity",
    "Goalscoring",
    "Agility",
    "Aggression",
    "Influence",
    "Temperament",
    "Consistency",
    "Stamina",
    "History",
  ],
  [
    "Spain",
    "Josep",
    "Guardiola",
    "available",
    "fit",
    "M",
    "C",
    "22",
    "selfish",
    "Spain",
    "120",
    "180",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "1991|Spain|4|0,1992|Spain|25|0",
  ],
  [
    "Spain",
    "Jose-Javier",
    "Belloso",
    "available",
    "fit",
    "M",
    "R",
    "26",
    "random",
    "Spain",
    "115",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "255",
    "1992|Spain|4|0",
  ],
];
