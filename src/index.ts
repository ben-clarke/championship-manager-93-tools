import * as fs from "fs";
import minimist from "minimist";
import { unparse } from "papaparse";
import { resolve } from "path";
import CMExeParser from "./files/cm-exe-parser";
import Foreign from "./files/foreign";
import League from "./files/league";
import Team from "./files/team";

const argv = minimist(process.argv.slice(2), {
  alias: { d: "dir", t: "action" },
});

export const main = (action: string, directory: string): void => {
  const data = new CMExeParser();

  const foreign = new Foreign(directory, data);
  const team = new Team(directory, data);
  const league = new League(directory, data);

  // console.log(foreign.toHumanReadable());
  // console.log(league.toHumanReadable());
  // console.log(t.toHumanReadable());

  createHumanReadableFile("/Users/benclarke/Downloads", "FOREIGN.DAT", foreign.toHumanReadable());
  createHumanReadableFile("/Users/benclarke/Downloads", "TEAM.DAT", team.toHumanReadable());
  createHumanReadableFile("/Users/benclarke/Downloads", "LEAGUE.DAT", league.toHumanReadable());
};

const createHumanReadableFile = (
  directory: string,
  filename: string,
  data: Record<string, string>[],
): void => {
  fs.writeFileSync(resolve(directory, `${filename}.csv`), unparse(data));
};

// main(argv.action, argv.dir);
