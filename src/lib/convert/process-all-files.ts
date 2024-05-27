import * as fs from "fs";
import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../files/cm-exe-parser";
import Foreign from "../files/foreign";
import { resetConverted } from "../files/utils/cm-exe-builder";
import { processForeignPlayers } from "./process-foreign-file";
import { processSquads } from "./process-league-file";
import { processTeams } from "./process-team-file";
import { getMatchedExeDetails } from "./utils/name-calculators";
import { Details, replace, storeExe } from "./utils/process-utils";
import { updateDivisions } from "./utils/update-divisions";
import { writeLeagueData, writeTeamData } from "./utils/write-files";

export const processAllFiles = async (): Promise<void> => {
  const filepath = "/Users/benclarke/cm-test";
  const inputDirectory = resolve(__dirname, "../../../", "game-edits", "cm93-94");
  const data = new CMExeParser({ fileDirectory: inputDirectory });

  const foreign = new Foreign({ fileDirectory: inputDirectory, data });
  foreign.convertFromHex();
  const numberOfForeignPlayersRequired = foreign.players.length;

  const players = await processSquads(YEAR, filepath, data, true);
  const foreignPlayers = await processForeignPlayers(
    YEAR,
    filepath,
    numberOfForeignPlayersRequired,
    true,
  );
  const { leagueSquads: teams } = await processTeams(YEAR, filepath, data);

  // getMatchedDivision(data, divisions);

  const { matchedFirstNames, matchedSurnames, matchedNationalities } = getMatchedExeDetails(
    data,
    players,
    foreignPlayers,
    teams,
  );

  updateDivisions(data, inputDirectory, YEAR);

  resetConverted();
  const updateData = new CMExeParser({ fileDirectory: "/tmp" });
  let csv = updateData.toHumanReadable() as unknown as Details[];
  csv = replace("First name", csv as Details[], matchedFirstNames);
  csv = replace("Surname", csv as Details[], matchedSurnames);
  csv = replace("Nationality", csv as Details[], matchedNationalities);

  resetConverted();
  const finaliseData = new CMExeParser({ fileDirectory: "/tmp", rawCsv: unparse(csv) });
  const { hex, errors } = finaliseData.convertFromHumanReadable();
  if (errors.length > 0) {
    // eslint-disable-next-line no-console
    console.log(errors);
    return;
  }

  writeLeagueData(players, YEAR, filepath);
  writeTeamData(teams, YEAR, filepath);

  storeExe(hex, `${filepath}/CMEXE.EXE`);
  fs.writeFileSync(`${filepath}/CMEXE.EXE.csv`, unparse(csv));
};

const YEAR = 82;
