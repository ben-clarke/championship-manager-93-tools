import CMExeParser from "../files/cm-exe-parser";
import { printExecutableCodes } from "../files/utils/cm-exe-builder";
import { Version } from "../types/version";

const main = (inputDirectory: string, version: Version): void => {
  const executable = new CMExeParser({ fileDirectory: inputDirectory });
  printExecutableCodes(executable.data, "nationality", version);
  printExecutableCodes(executable.data, "character", version);
  printExecutableCodes(executable.data, "injury-type", version);
  printExecutableCodes(executable.data, "club", version);
  printExecutableCodes(executable.data, "non-domestic-club", version);
  printExecutableCodes(executable.data, "ground", version);
  printExecutableCodes(executable.data, "first-name", version);
  printExecutableCodes(executable.data, "surname", version);
  printExecutableCodes(executable.data, "wages", version);
  printExecutableCodes(executable.data, "version", version);
  printExecutableCodes(executable.data, "style-of-play", version);
  printExecutableCodes(executable.data, "formation", version);
};

main("", "94");
