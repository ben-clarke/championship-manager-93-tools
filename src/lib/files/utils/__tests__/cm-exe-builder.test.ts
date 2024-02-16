import { resolve } from "path";
import { hexToUtf8 } from "../../../utils/conversion";
import CMExeParser from "../../cm-exe-parser";
import {
  FoundIndex,
  findIndexes,
  findStartIndex,
  replaceAllData,
  replaceData,
  resetConverted,
} from "../cm-exe-builder";
import { getSortedList } from "../sorted";

describe("cm exe builder", () => {
  const INPUT_DIRECTORY = resolve(__dirname, "../../../../../", "game-edits", "cm93-94");
  const PARSER = new CMExeParser({ fileDirectory: INPUT_DIRECTORY });

  beforeEach(() => {
    resetConverted();
  });

  afterEach(() => {
    resetConverted();
  });

  describe("findStartIndex", () => {
    test("club", () => {
      expect(findStartIndex(PARSER.data, "club", "94")).toEqual(413984);
    });

    test("nationality", () => {
      expect(findStartIndex(PARSER.data, "nationality", "94")).toEqual(316784);
    });
  });

  describe("findIndexes", () => {
    test("club", () => {
      const indexes = findIndexes(PARSER.data, "Aston Villa") as FoundIndex[];
      expect(indexes).toEqual([
        { start: 396384, end: 396394 },
        { start: 413984, end: 413994 },
      ]);

      const parsed = PARSER.data.map((d) => hexToUtf8(d));

      const { start } = indexes[0];
      const shift = indexes[0].end - indexes[0].start + 1;

      const spliced1 = parsed.splice(start, shift);
      expect(spliced1.join("")).toEqual("Aston Villa");

      parsed.splice(start, shift, ..."Aston Pills".split(""));

      const spliced2 = parsed.splice(start, shift);
      expect(spliced2.join("")).toEqual("Aston Pills");
    });

    test("nationality", () => {
      expect(findIndexes(PARSER.data, "England")).toEqual([
        { start: 316784, end: 316790 },
        { start: 369260, end: 369266 },
        { start: 369301, end: 369307 },
        { start: 382515, end: 382521 },
      ]);
    });
  });

  describe("replaceAllData", () => {
    test("replace club data", () => {
      const clubs = PARSER.get("club");

      // console.log(
      //   [...PARSER.data].reduce((acc, d, i) => {
      //     if (d !== "0c" || PARSER.data[i + 1] !== "08") return acc;

      //     // if (PARSER.data[i + 2] !== "14") return acc;

      //     const blah = [
      //       d,
      //       PARSER.data[i + 1],
      //       PARSER.data[i + 2],
      //       PARSER.data[i + 3],
      //       PARSER.data[i + 4],
      //     ];
      //     acc.push(blah.join(" "));
      //     return acc;
      //   }, []),
      // );

      const sortedClubs = getSortedList(clubs);
      const [av, mu, no, sw, ...rest] = sortedClubs;
      const newClubs = [av, mu, sw, no, ...rest];

      // 0, 12, 20, 28
      // Aston Villa Man Utd Norwich  Sheff Wed
      // Aston Villa  Man United  Norwich  Sheff Wed

      replaceAllData([...PARSER.data], newClubs, "club", "94");

      // fs.writeFileSync("/Users/benclarke/CMEXE.EXE", newData.join(""), "hex");

      // const blah = new CMExeParser({ fileDirectory: "/Users/benclarke/" });
    });
  });

  describe("replaceData", () => {
    test("replace with same length", () => {
      const newData = replaceData([...PARSER.data], "Aston Villa", "Aston Pills");

      resetConverted();
      const indexes = findIndexes(newData, "Aston Pills") as FoundIndex[];

      expect(indexes).toEqual([
        { start: 396384, end: 396394 },
        { start: 413984, end: 413994 },
      ]);
      expect(PARSER.data.length).toEqual(756816);
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

    test("replace with shorter length", () => {
      const newData = replaceData([...PARSER.data], "Aston Villa", "Aston City");

      resetConverted();
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
    });
  });

  describe("version", () => {
    test.each([
      ["cm93", "Championship Manager '93"],
      ["cm93-94", "Championship Manager '93/4"],
      ["cm94-apw", "Championship Manager '94"],
      ["cm94-apw-2", "Championship Manager '94"],
      ["cm-italia", "Championship Manager Italia"],
      ["cm-italia-95", "Championship Manager Italia"],
    ])("version %s %s", (input, expected) => {
      const fileDirectory = resolve(__dirname, "../../../../../", "game-edits", input);
      const data = new CMExeParser({ fileDirectory });
      expect(data.get("version")["00"]).toEqual(expected);
    });
  });

  describe("year", () => {
    test.each([
      ["cm93", "1993 Players|Generated Players|"],
      ["cm93-94", "1993/4 Players|Generated Players|"],
      ["cm94-apw", "1994 Players|Generated Players|"],
      ["cm94-apw-2", "1994 Players|Generated Players|"],
      ["cm-italia", "1993/94 Players|Fictional Players|"],
      ["cm-italia-95", "1994/95 Players|Fictional Players|"],
    ])("year %s %s", (input, expected) => {
      const fileDirectory = resolve(__dirname, "../../../../../", "game-edits", input);
      const data = new CMExeParser({ fileDirectory });
      expect(data.get("year")["00"]).toEqual(expected);
    });
  });
});
