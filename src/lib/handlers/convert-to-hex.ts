import * as fs from "fs";
import { resolve } from "path";
import { flatten } from "ramda";
import { DAT_FOREIGN, DAT_LEAGUE, DAT_TEAM } from "../../constants/files";
import CMExeParser from "../files/cm-exe-parser";
import Foreign from "../files/foreign";
import League from "../files/league";
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
  const data = new CMExeParser({ fileDirectory: inputDirectory });

  const foreign = new Foreign({ fileDirectory: outputDirectory, data });
  const { converted: convertedForeign, hex: foreignHex } = foreign.convertFromHumanReadable();
  createHexDataFile(outputDirectory, DAT_FOREIGN, foreignHex);

  const league = new League({ fileDirectory: outputDirectory, data });
  const { converted: convertedLeague, hex: leagueHex } = league.convertFromHumanReadable();
  createHexDataFile(outputDirectory, DAT_LEAGUE, leagueHex);

  const team = new Team({ fileDirectory: outputDirectory, data });
  const { converted: convertedTeam, hex: teamHex } = team.convertFromHumanReadable();
  createHexDataFile(outputDirectory, DAT_TEAM, teamHex);

  return {
    convertedForeign,
    convertedLeague,
    convertedTeam,
  };
};

const getClass = (
  fileType: FileType,
  data: CMExeParser,
  rawData: string,
): Foreign | Team | League => {
  if (fileType === "FOREIGN.DAT") return new Foreign({ rawData, data });
  if (fileType === "LEAGUE.DAT") return new League({ rawData, data });
  return new Team({ rawData, data });
};

export const convertToSingleDataBlob = (
  content: string,
  fileType: FileType,
  exe: string,
): ConvertToSingleData => {
  const data = new CMExeParser({ rawData: exe });

  const item = getClass(fileType, data, content);

  const { hex, errors } = item.convertFromHumanReadable();

  const remaining = errors.length - ERRORS_TO_SHOW;
  const errorsToShow =
    errors.length <= ERRORS_TO_SHOW
      ? errors
      : [...errors.splice(0, ERRORS_TO_SHOW), `plus ${remaining} more`];

  return {
    hex,
    errors: errorsToShow,
  };
};

export const convertToDataBlob = (
  foreignData: string,
  leagueData: string,
  teamData: string,
  exe: string,
): ConvertToData => {
  const data = new CMExeParser({ rawData: exe });

  const foreign = new Foreign({ rawData: foreignData, data });
  const league = new League({ rawData: leagueData, data });
  const team = new Team({ rawData: teamData, data });

  const { hex: foreignHex, errors: foreignErrors } = foreign.convertFromHumanReadable();
  const { hex: leagueHex, errors: leagueErrors } = league.convertFromHumanReadable();
  const { hex: teamHex, errors: teamErrors } = team.convertFromHumanReadable();

  const errors = [
    { errs: foreignErrors, type: "Foreign" },
    { errs: leagueErrors, type: "League" },
    { errs: teamErrors, type: "Team" },
  ].map(({ errs, type }) => errs.map((err) => `${type}: ${err}`));

  const flattened = flatten(errors);

  const remaining = flattened.length - ERRORS_TO_SHOW;
  const errorsToShow =
    flattened.length <= ERRORS_TO_SHOW
      ? flattened
      : [...flattened.splice(0, ERRORS_TO_SHOW), `plus ${remaining} more`];

  return {
    data: {
      foreign: foreignHex,
      team: teamHex,
      league: leagueHex,
    },
    errors: errorsToShow,
  };
};

export const convertToExeBlob = (exe: string, exeCsv: string): ConvertToExe => {
  const data = new CMExeParser({ rawData: exe, rawCsv: exeCsv });

  const { hex, errors } = data.convertFromHumanReadable();

  const remaining = errors.length - ERRORS_TO_SHOW;
  const errorsToShow =
    errors.length <= ERRORS_TO_SHOW
      ? errors
      : [...errors.splice(0, ERRORS_TO_SHOW), `plus ${remaining} more`];

  return {
    data: hex,
    errors: errorsToShow,
  };
};

const createHexDataFile = (directory: string, filename: string, data: string): void => {
  const filepath = resolve(directory, filename);
  if (fs.existsSync(filepath)) createBackups(directory, filepath, filename);

  fs.writeFileSync(filepath, data, "hex");
};

interface ConvertToData {
  data: {
    foreign: string;
    league: string;
    team: string;
  };
  errors: string[];
}

interface ConvertToSingleData {
  hex: string;
  errors: string[];
}

interface ConvertToExe {
  data: string;
  errors: string[];
}

export type FileType = "FOREIGN.DAT" | "LEAGUE.DAT" | "TEAM.DAT";

const ERRORS_TO_SHOW = 10;
