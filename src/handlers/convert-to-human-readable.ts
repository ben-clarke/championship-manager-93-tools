import * as fs from "fs";
import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "../files/cm-exe-parser";
import Foreign from "../files/foreign";
import League from "../files/league";
import Team from "../files/team";
import { createBackups } from "./utils.ts/file-backup";

export const convertToHumanReadable = (inputDirectory: string): void => {
  const data = new CMExeParser();

  const foreign = new Foreign(inputDirectory, data);
  const team = new Team(inputDirectory, data);
  const league = new League(inputDirectory, data);

  createHumanReadableFile("/Users/benclarke/Downloads", "FOREIGN.DAT", foreign.toHumanReadable());
  createHumanReadableFile("/Users/benclarke/Downloads", "TEAM.DAT", team.toHumanReadable());
  createHumanReadableFile("/Users/benclarke/Downloads", "LEAGUE.DAT", league.toHumanReadable());
};

export const createHumanReadableFile = (
  directory: string,
  filename: string,
  data: Record<string, string>[],
): void => {
  const csvFilename = `${filename}.csv`;
  const filepath = resolve(directory, csvFilename);

  if (fs.existsSync(filepath)) createBackups(directory, filepath, csvFilename);
  fs.writeFileSync(filepath, unparse(data));
};
