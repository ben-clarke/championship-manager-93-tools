import * as fs from "fs";
import { resolve } from "path";
import { hexToUtf8 } from "../../../utils/conversion";
import CMExeParser from "../../cm-exe-parser";
import { FoundIndex, findIndexes, findStartIndex, replaceData } from "../cm-exe-builder";

describe("cm exe builder", () => {
  const inputDirectory = resolve(__dirname, "../../../../../", "game-edits", "cm93-94");
  const parser = new CMExeParser({ fileDirectory: inputDirectory });

  describe("findStartIndex", () => {
    test("club", () => {
      expect(findStartIndex(parser.data, "club")).toEqual(413984);
    });

    test("nationality", () => {
      expect(findStartIndex(parser.data, "nationality")).toEqual(316784);
    });
  });

  describe("findIndexes", () => {
    test("club", () => {
      const indexes = findIndexes(parser.data, "Aston Villa") as FoundIndex[];
      expect(indexes).toEqual([
        { start: 396384, end: 396394 },
        { start: 413984, end: 413994 },
      ]);

      const parsed = parser.data.map((d) => hexToUtf8(d));

      const { start } = indexes[0];
      const shift = indexes[0].end - indexes[0].start + 1;

      const spliced1 = parsed.splice(start, shift);
      expect(spliced1.join("")).toEqual("Aston Villa");

      parsed.splice(start, shift, ..."Aston Pills".split(""));

      const spliced2 = parsed.splice(start, shift);
      expect(spliced2.join("")).toEqual("Aston Pills");
    });

    test("nationality", () => {
      expect(findIndexes(parser.data, "England")).toEqual([
        { start: 316784, end: 316790 },
        { start: 369260, end: 369266 },
        { start: 369301, end: 369307 },
        { start: 382515, end: 382521 },
      ]);
    });
  });

  describe("replaceData", () => {
    test("replace with same length", () => {
      const newData = replaceData(parser.data, "Aston Villa", "Aston Pills");
      const indexes = findIndexes(newData, "Aston Pills") as FoundIndex[];
      expect(indexes).toEqual([
        { start: 396384, end: 396394 },
        { start: 413984, end: 413994 },
      ]);
      expect(parser.data.length).toEqual(756816);
      expect(newData.length).toEqual(756816);

      const { start } = indexes[0];
      const shift = indexes[0].end - indexes[0].start + 1;

      const addedExtras = 10; // Liverpool
      expect(
        [...newData]
          .splice(start, shift + addedExtras)
          .map((x) => hexToUtf8(x))
          .join(""),
      ).toEqual(["Aston Pills", hexToUtf8("00"), "Liverpool"].join(""));

      const { start: start2 } = indexes[1];
      const shift2 = indexes[1].end - indexes[1].start + 1;

      const addedExtras2 = 8; // Man Utd
      expect(
        [...newData]
          .splice(start2, shift2 + addedExtras2)
          .map((x) => hexToUtf8(x))
          .join(""),
      ).toEqual(["Aston Pills", hexToUtf8("00"), "Man Utd"].join(""));
    });

    test("replace with longer length", () => {
      const newData = replaceData(parser.data, "Aston Villa", "Aston Pillains");
      const indexes = findIndexes(newData, "Aston Pilla") as FoundIndex[];
      expect(indexes).toEqual([
        { start: 396384, end: 396394 },
        { start: 413984, end: 413994 },
      ]);
      expect(newData.length).toEqual(756816);

      const { start } = indexes[0];
      const shift = indexes[0].end - indexes[0].start + 1;

      const addedExtras = 10; // Liverpool
      expect(
        [...newData]
          .splice(start, shift + addedExtras)
          .map((x) => hexToUtf8(x))
          .join(""),
      ).toEqual(["Aston Pilla", hexToUtf8("00"), "Liverpool"].join(""));

      const { start: start2 } = indexes[1];
      const shift2 = indexes[1].end - indexes[1].start + 1;

      const addedExtras2 = 8; // Man Utd
      expect(
        [...newData]
          .splice(start2, shift2 + addedExtras2)
          .map((x) => hexToUtf8(x))
          .join(""),
      ).toEqual(["Aston Pilla", hexToUtf8("00"), "Man Utd"].join(""));
    });

    test("replace with shorter length", () => {
      const newData = replaceData(parser.data, "Aston Villa", "Aston City");
      const newerData = replaceData(newData, "Man Utd", "Pan Utd");
      const indexes = findIndexes(newData, "Aston City ") as FoundIndex[];
      expect(indexes).toEqual([
        { start: 396384, end: 396394 },
        { start: 413984, end: 413994 },
      ]);
      expect(newData.length).toEqual(756816);

      const { start } = indexes[0];
      const shift = indexes[0].end - indexes[0].start + 1;

      const addedExtras = 10; // Liverpool
      expect(
        [...newData]
          .splice(start, shift + addedExtras)
          .map((x) => hexToUtf8(x))
          .join(""),
      ).toEqual(["Aston City ", hexToUtf8("00"), "Liverpool"].join(""));

      const { start: start2 } = indexes[1];
      const shift2 = indexes[1].end - indexes[1].start + 1;

      const addedExtras2 = 8; // Man Utd
      expect(
        [...newData]
          .splice(start2, shift2 + addedExtras2)
          .map((x) => hexToUtf8(x))
          .join(""),
      ).toEqual(["Aston City ", hexToUtf8("00"), "Man Utd"].join(""));

      fs.writeFileSync("/Users/benclarke/TEST.DAT", newerData.join(""), "hex");
    });
  });
});
