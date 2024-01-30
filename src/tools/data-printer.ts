import CMExeParser from "../files/cm-exe-parser";
import { printExecutableCodes } from "../files/utils/cm-exe-builder";

const main = (): void => {
  const executable = new CMExeParser();
  printExecutableCodes(executable.data, "nationality");
  printExecutableCodes(executable.data, "character");
  printExecutableCodes(executable.data, "injury-type");
  printExecutableCodes(executable.data, "club");
  printExecutableCodes(executable.data, "non-domestic-club");
  printExecutableCodes(executable.data, "ground");
  printExecutableCodes(executable.data, "first-name");
  printExecutableCodes(executable.data, "surname");
  printExecutableCodes(executable.data, "morale"); // TODO - BC Missing last bit because of % in message
  printExecutableCodes(executable.data, "wages");
};

main();
