import CMExeParser from "../files/cm-exe-parser";
import { printExecutableCodes } from "../files/utils/cm-exe-builder";

const main = (inputDirectory: string): void => {
  const executable = new CMExeParser({ fileDirectory: inputDirectory });
  printExecutableCodes(executable.data, "nationality");
  printExecutableCodes(executable.data, "character");
  printExecutableCodes(executable.data, "injury-type");
  printExecutableCodes(executable.data, "club");
  printExecutableCodes(executable.data, "non-domestic-club");
  printExecutableCodes(executable.data, "ground");
  printExecutableCodes(executable.data, "first-name");
  printExecutableCodes(executable.data, "surname");
  printExecutableCodes(executable.data, "wages");
  printExecutableCodes(executable.data, "version");
  printExecutableCodes(executable.data, "style-of-play");
  printExecutableCodes(executable.data, "formation");
};

main("");
