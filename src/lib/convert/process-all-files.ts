import * as fs from "fs";
import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../files/cm-exe-parser";
import Foreign from "../files/foreign";
import { processForeignPlayers } from "./process-foreign-file";
import { processSquads } from "./process-league-file";
import { processTeams } from "./process-team-file";
import { getMatchedExeDetails } from "./utils/name-calculators";

export const processAllFiles = async (): Promise<void> => {
  const filepath = "/Users/benclarke/cm-test";
  const inputDirectory = resolve(__dirname, "../../../", "game-edits", "cm93-94");
  const data = new CMExeParser({ fileDirectory: inputDirectory });

  const foreign = new Foreign({ fileDirectory: inputDirectory, data });
  foreign.convertFromHex();
  const numberOfForeignPlayersRequired = foreign.players.length;

  const players = await processSquads(YEAR_88, filepath, data, true);
  const foreignPlayers = await processForeignPlayers(
    YEAR_88,
    filepath,
    numberOfForeignPlayersRequired,
    true,
  );
  const { leagueSquads: teams } = await processTeams(YEAR_88, filepath, data);

  const { matchedFirstNames, matchedSurnames, matchedNationalities } = getMatchedExeDetails(
    data,
    players,
    foreignPlayers,
    teams,
  );

  let csv = data.toHumanReadable() as unknown as Details[];
  csv = replace("First name", csv as Details[], matchedFirstNames);
  csv = replace("Surname", csv as Details[], matchedSurnames);
  csv = replace("Nationality", csv as Details[], matchedNationalities);

  const updatedData = new CMExeParser({
    fileDirectory: inputDirectory,
    rawCsv: unparse(csv),
  });

  // REMOVE THIS LINE TO WRITE THE FILES
  if (matchedFirstNames.length) return;

  const { hex, errors } = updatedData.convertFromHumanReadable();
  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.log(errors);
    return;
  }

  const byteArray = new Uint8Array(hex.length / 2);
  for (let i = 0; i < byteArray.length; i += 1) {
    byteArray[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  fs.writeFileSync(`${filepath}/CMEXE.EXE`, byteArray);
  fs.writeFileSync(`${filepath}/CMEXE.EXE.csv`, unparse(csv));
};

const replace = (key: string, details: Details[], nameTuples: NameTuple[]): Details[] =>
  details.map((d) => {
    const [updated] = nameTuples.find(([, current]) => d[key as keyof Details] === current) || [
      "",
      "",
    ];

    if (updated) {
      return { ...d, [key]: updated };
    }
    return d;
  });

interface Details {
  Club: string;
  Ground: string;
  Nationality: string;
  "First name": string;
  Surname: string;
  "Non domestic club": string;
}

type NameTuple = [string, string];

const YEAR_88 = 88;
