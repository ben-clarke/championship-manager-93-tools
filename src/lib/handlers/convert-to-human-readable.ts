import * as fs from "fs";
import { unparse } from "papaparse";
import { resolve } from "path";
import { DAT_FOREIGN, DAT_LEAGUE, DAT_TEAM } from "src/constants/files";
import CMExeParser from "../files/cm-exe-parser";
import Foreign from "../files/foreign";
import League from "../files/league";
import Team from "../files/team";
import { createBackups } from "./utils.ts/file-backup";

export const convertToHumanReadable = (inputDirectory: string): void => {
  const data = new CMExeParser({ fileDirectory: inputDirectory });

  const foreign = new Foreign({ fileDirectory: inputDirectory, data });
  const league = new League({ fileDirectory: inputDirectory, data });
  const team = new Team({ fileDirectory: inputDirectory, data });

  createHumanReadableFile(inputDirectory, DAT_FOREIGN, foreign.toHumanReadable());
  createHumanReadableFile(inputDirectory, DAT_LEAGUE, league.toHumanReadable());
  createHumanReadableFile(inputDirectory, DAT_TEAM, team.toHumanReadable());
};

export const convertToHumanReadableBlob = (
  foreignData: string,
  leagueData: string,
  teamData: string,
  exe: string,
): ConvertToHumanReadable => {
  const data = new CMExeParser({ rawData: exe });

  const foreign = new Foreign({ rawData: foreignData, data });
  const team = new Team({ rawData: teamData, data });
  const league = new League({ rawData: leagueData, data });

  return {
    data: {
      foreign: unparse(foreign.toHumanReadable()),
      team: unparse(team.toHumanReadable()),
      league: unparse(league.toHumanReadable()),
    },
  };
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

interface ConvertToHumanReadable {
  data: {
    foreign: string;
    league: string;
    team: string;
  };
}
