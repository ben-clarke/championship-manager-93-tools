import * as fs from "fs";
import { resolve } from "path";
import League from "src/lib/files/league";
import CMExeParser from "../files/cm-exe-parser";
import Foreign from "../files/foreign";
import Team from "../files/team";
import { createBackups } from "./utils.ts/file-backup";

export const convertToHex = (
  inputDirectory: string,
  outputDirectory: string,
): {
  convertedForeign: string[][];
  convertedLeague: string[][][];
  convertedTeam: string[][];
} => {
  const data = new CMExeParser(inputDirectory);

  const foreign = new Foreign(outputDirectory, data);
  const { converted: convertedForeign, hex: foreignHex } = foreign.convertFromHumanReadable();
  createHexDataFile(outputDirectory, "FOREIGN.DAT", foreignHex);

  const league = new League(outputDirectory, data);
  const { converted: convertedLeague, hex: leagueHex } = league.convertFromHumanReadable();
  createHexDataFile(outputDirectory, "LEAGUE.DAT", leagueHex);

  const team = new Team(outputDirectory, data);
  const { converted: convertedTeam, hex: teamHex } = team.convertFromHumanReadable();
  createHexDataFile(outputDirectory, "TEAM.DAT", teamHex);

  return {
    convertedForeign,
    convertedLeague,
    convertedTeam,
  };
};

export const createHexDataFile = (directory: string, filename: string, data: string): void => {
  const filepath = resolve(directory, filename);
  if (fs.existsSync(filepath)) createBackups(directory, filepath, filename);

  fs.writeFileSync(filepath, data, "hex");
};
