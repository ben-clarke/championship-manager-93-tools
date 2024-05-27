import { unparse } from "papaparse";
import CMExeParser from "../../files/cm-exe-parser";
import { resetConverted } from "../../files/utils/cm-exe-builder";
import { getDivisionSwaps } from "./division-calculator";
import { Details, replace, storeExe } from "./process-utils";

export const updateDivisions = (data: CMExeParser, fileDirectory: string, year: number): void => {
  const {
    firstSwap: { club, ground },
    secondSwap: { club: clubSwitch, ground: groundSwitch },
  } = getDivisionSwaps(year);

  performUpdates(data, fileDirectory, club, ground);

  const updatedData = new CMExeParser({ fileDirectory: "/tmp" });
  performUpdates(updatedData, "/tmp", clubSwitch, groundSwitch);
};

const performUpdates = (
  originalData: CMExeParser,
  fileDirectory: string,
  clubUpdates: [string, string][],
  groundUpdates: [string, string][],
): void => {
  let teamCsv = originalData.toHumanReadable() as unknown as Details[];
  teamCsv = replace("Club", teamCsv as Details[], clubUpdates);
  teamCsv = replace("Ground", teamCsv as Details[], groundUpdates);

  resetConverted();
  const updatedClubData = new CMExeParser({ fileDirectory, rawCsv: unparse(teamCsv) });
  const { hex: teamHex, errors: teamErrors } = updatedClubData.convertFromHumanReadable();
  if (teamErrors.length > 0) {
    // eslint-disable-next-line no-console
    console.log(teamErrors);
    throw new Error("Error updating divisions");
  }
  storeExe(teamHex, "/tmp/CMEXE.EXE");
};
