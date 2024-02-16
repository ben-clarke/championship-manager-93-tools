import { unparse } from "papaparse";
import { resolve } from "path";
import { sum } from "ramda";
import CMExeParser from "../../cm-exe-parser";
import { findIndexes, resetConverted } from "../cm-exe-builder";
import { getSortedList } from "../sorted";
import { DATA } from "./data/parser-data";

describe("cm exe parser", () => {
  beforeEach(() => {
    resetConverted();
  });

  afterEach(() => {
    resetConverted();
  });

  test("to human readable", () => {
    const inputDirectory = resolve(__dirname, "../../../../../", "game-edits", "cm93-94");
    const parser = new CMExeParser({ fileDirectory: inputDirectory });

    const data = parser.toHumanReadable();
    expect(data).toEqual(DATA);
  });

  test("from human readable", () => {
    const inputDirectory = resolve(__dirname, "../../../../../", "game-edits", "cm93-94");

    const newData = [...DATA];
    newData[1].Club = "XYZ";
    newData[1].Ground = "New Trafford";
    newData[1].Nationality = "Mortugal";
    newData[1]["First name"] = "Xave";
    newData[1].Surname = "Lexton";

    const parser = new CMExeParser({ fileDirectory: inputDirectory, rawCsv: unparse(newData) });

    expect(findIndexes(parser.data, "XYZ")).toEqual([]);
    expect(findIndexes(parser.data, "New Trafford")).toEqual([]);
    expect(findIndexes(parser.data, "Mortugal")).toEqual([]);
    expect(findIndexes(parser.data, "Xave")).toEqual([]);
    expect(findIndexes(parser.data, "Lexton")).toEqual([]);
    expect(findIndexes(parser.data, "Man Utd")).toEqual([
      { end: 396382, start: 396376 },
      { end: 401999, start: 401993 },
      { end: 414002, start: 413996 },
    ]);
    expect(findIndexes(parser.data, "Portugal")).toEqual([{ end: 316799, start: 316792 }]);

    const { hex } = parser.convertFromHumanReadable();

    resetConverted();
    const parser2 = new CMExeParser({ rawData: Buffer.from(hex, "hex").toString("base64") });

    expect(findIndexes(parser2.data, "XYZ    ")).toEqual([
      { end: 396382, start: 396376 },
      { end: 401999, start: 401993 },
      { end: 414002, start: 413996 },
    ]);
    expect(findIndexes(parser2.data, "Mortugal")).toEqual([{ end: 316799, start: 316792 }]);

    const club1 = getSortedList(parser.get("club"));
    const clubNum1 = Object.keys(club1).length;
    const clubChars1 = sum(Object.values(club1).map((c) => c.length));

    const club2 = getSortedList(parser2.get("club"));
    const clubNum2 = Object.keys(club2).length;
    const clubChars2 = sum(Object.values(club2).map((c) => c.length));

    expect(clubNum1).toEqual(clubNum2);
    expect(clubChars1).toEqual(clubChars2);
  });
});
