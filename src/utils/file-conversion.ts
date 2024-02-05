import { saveAs } from "file-saver";
import { DAT_FOREIGN, DAT_LEAGUE, DAT_TEAM } from "src/constants/files";
import { convertToDataBlob } from "src/lib/handlers/convert-to-hex";
import { convertToHumanReadableBlob } from "src/lib/handlers/convert-to-human-readable";

export const createHumanReadableFiles = (
  foreign: string,
  league: string,
  team: string,
  exe: string,
): void => {
  const {
    data: { foreign: foreignCsv, league: leagueCsv, team: teamCsv },
  } = convertToHumanReadableBlob(foreign, league, team, exe);

  const items = [
    { filename: "FOREIGN.DAT.csv", data: foreignCsv },
    { filename: "LEAGUE.DAT.csv", data: leagueCsv },
    { filename: "TEAM.DAT.csv", data: teamCsv },
  ];

  items.forEach(({ filename, data }) => {
    const file = new Blob([data], { type: "application/csv" });
    saveAs(file, filename);
  });
};

export const createDataFiles = (
  foreign: string,
  league: string,
  team: string,
  exe: string,
): string[] => {
  const {
    data: { foreign: foreignData, league: leagueData, team: teamData },
    errors,
  } = convertToDataBlob(foreign, league, team, exe);

  if (errors.length > 0) return errors;

  const items = [
    { filename: DAT_FOREIGN, data: foreignData },
    { filename: DAT_LEAGUE, data: leagueData },
    { filename: DAT_TEAM, data: teamData },
  ];

  items.forEach(({ filename, data }) => {
    convertAndStoreData(filename, data);
  });

  return [];
};

const convertAndStoreData = (filename: string, data: string): void => {
  const byteArray = new Uint8Array(data.length / 2);
  for (let i = 0; i < byteArray.length; i += 1) {
    byteArray[i] = parseInt(data.substr(i * 2, 2), 16);
  }

  const blob = new Blob([byteArray], { type: "application/octet-stream" });
  saveAs(blob, filename);
};
