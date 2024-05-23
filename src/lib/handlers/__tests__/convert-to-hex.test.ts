import { unparse } from "papaparse";
import { resolve } from "path";
import { DAT_LEAGUE } from "../../../constants/files";
import CMExeParser from "../../files/cm-exe-parser";
import Foreign from "../../files/foreign";
import League from "../../files/league";
import Team from "../../files/team";
import { parsePlayers } from "../../files/utils/players";
import { convertToHex } from "../convert-to-hex";
import { createHumanReadableFile } from "../convert-to-human-readable";

describe("convertToHex", () => {
  test("convertToHex", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", "cm93-94");
    const outputDirectory = resolve(__dirname, "../../../../", "game-edits", "testing");
    const { convertedLeague, convertedForeign, convertedTeam } = convertToHex(
      inputDirectory,
      outputDirectory,
    );

    const data = new CMExeParser({ fileDirectory: inputDirectory });

    const originalForeign = new Foreign({ fileDirectory: inputDirectory, data });
    const parsedForeignHex = parsePlayers(originalForeign.read(), 34);

    const originalLeague = new League({ fileDirectory: inputDirectory, data });
    const originalLeagueHex = originalLeague.parseHex().map((h) => parsePlayers(h, 33));

    const originalTeam = new Team({ fileDirectory: inputDirectory, data });
    const originalTeamHex = originalTeam.parseHex("94");

    const duplicatesFirstNames = getDuplicateNames(data.get("first-name"));
    const duplicatesForeignFirstNames = getDuplicateNames(data.get("first-name-foreign"));
    const duplicatesSurnames = getDuplicateNames(data.get("surname"));

    convertedLeague.forEach((squad, i) => {
      squad.forEach((player, j) => {
        const [one, two, three, four] = player;
        const [, , , , , , , def, mid, att, right, left, centre] = originalLeagueHex[i][j];

        if (
          right === "64" ||
          left === "64" ||
          centre === "64" ||
          def === "64" ||
          mid === "64" ||
          att === "64"
        ) {
          // For some reason, some of the flags are 64 instead of 01
          return;
        }

        if (duplicatesFirstNames.includes(`${one}${two}`)) {
          expect(player.splice(4, player.length).join("")).toEqual(
            originalLeagueHex[i][j].splice(4, originalLeagueHex[i][j].length).join(""),
          );
        } else if (duplicatesSurnames.includes(`${three}${four}`) || `${three}${four}` === "0094") {
          expect(player.splice(8, player.length).join("")).toEqual(
            originalLeagueHex[i][j].splice(8, originalLeagueHex[i][j].length).join(""),
          );
        } else expect(player.join("")).toEqual(originalLeagueHex[i][j].join(""));
      });
    });

    convertedForeign.forEach((c, i) => {
      const [one, two, three, four] = c;

      if (
        duplicatesFirstNames.includes(`${one}${two}`) ||
        duplicatesForeignFirstNames.includes(`${one}${two}`)
      ) {
        expect(c.splice(4, c.length).join("")).toEqual(
          parsedForeignHex[i].splice(4, parsedForeignHex[i].length).join(""),
        );
      } else if (duplicatesSurnames.includes(`${three}${four}`)) {
        expect(c.splice(8, c.length).join("")).toEqual(
          parsedForeignHex[i].splice(8, parsedForeignHex[i].length).join(""),
        );
      } else expect(c.join("")).toEqual(parsedForeignHex[i].join(""));
    });

    convertedTeam.forEach((c, i) => {
      expect(c.join("")).toEqual(originalTeamHex[i]);
    });

    const leagueCreateHumanReadable = new League({ fileDirectory: inputDirectory, data });
    const humanReadableCreatedLeagueData = leagueCreateHumanReadable.toHumanReadable();
    createHumanReadableFile(outputDirectory, DAT_LEAGUE, humanReadableCreatedLeagueData);

    const leagueParseHex = new League({ fileDirectory: inputDirectory, data });

    expect(
      unparse(leagueParseHex.toHumanReadable()).replace("Lloyd,Mcgrath", "Lloyd,McGrath"),
    ).toEqual(
      unparse(originalLeague.toHumanReadable()).replaceAll("Lloyd,Mcgrath", "Lloyd,McGrath"),
    );
  });
});

const getDuplicateNames = (dataNames: Record<string, string>): string[] => {
  const initial: Record<string, string[]> = {};
  const names = Object.entries(dataNames).reduce((acc, [k, v]) => {
    if (!acc[v]) acc[v] = [];
    acc[v].push(k);
    return acc;
  }, initial);

  const other: string[] = [];
  const duplicates = Object.entries(names).reduce((acc, [, v]) => {
    if (v.length > 1) {
      return [...acc, ...v];
    }
    return acc;
  }, other);
  return duplicates;
};
