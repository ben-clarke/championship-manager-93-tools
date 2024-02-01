import minimist from "minimist";
import { convertToHumanReadable } from "./handlers/convert-to-human-readable";

const argv = minimist(process.argv.slice(2), {
  alias: { d: "dir", t: "action" },
});

export const main = (action: string, directory: string): void => {
  switch (action) {
    case "human":
      return convertToHumanReadable(directory);
    default:
      throw new Error("Invalid or missing action provided");
  }
};

main(argv.action, argv.dir);
