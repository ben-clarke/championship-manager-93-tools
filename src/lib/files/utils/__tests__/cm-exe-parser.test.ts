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

    expect(findIndexes(parser.data, "XYZ", true)).toEqual([]);
    expect(findIndexes(parser.data, "New Trafford", true)).toEqual([]);
    expect(findIndexes(parser.data, "Mortugal", true)).toEqual([]);
    expect(findIndexes(parser.data, "Xave", true)).toEqual([]);
    expect(findIndexes(parser.data, "Lexton", true)).toEqual([]);
    expect(findIndexes(parser.data, "Man Utd", true)).toEqual([
      { end: 396382, start: 396376 },
      { end: 414002, start: 413996 },
    ]);
    expect(findIndexes(parser.data, "Portugal", true)).toEqual([{ end: 316799, start: 316792 }]);

    // Only exact matches should be changed
    expect(findIndexes(parser.data, "Dave", true)).toEqual([
      { end: 339315, start: 339312 },
      { end: 340663, start: 340660 },
    ]);
    expect(findIndexes(parser.data, "Davenport", true)).toEqual([{ end: 358091, start: 358083 }]);

    const { hex, errors } = parser.convertFromHumanReadable();
    expect(hex).not.toEqual("");
    expect(errors).toHaveLength(0);

    resetConverted();
    const parser2 = new CMExeParser({ rawData: Buffer.from(hex, "hex").toString("base64") });

    expect(findIndexes(parser2.data, "XYZ    ", true)).toEqual([
      { end: 396382, start: 396376 },
      { end: 414002, start: 413996 },
    ]);
    expect(findIndexes(parser2.data, "Mortugal", true)).toEqual([{ end: 316799, start: 316792 }]);

    // Only exact matches should be changed
    expect(findIndexes(parser2.data, "Davenport", true)).toEqual([{ end: 358091, start: 358083 }]);

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
