import { resolve } from "path";
import { EDIT_FILE_DIRECTORY } from "../../constants/file";
import { convertToHumanReadable } from "../convert-to-human-readable";

describe("convertToHumanReadable", () => {
  test("convertToHumanReadable", () => {
    const inputDirectory = resolve(__dirname, "../../../../", "game-edits", EDIT_FILE_DIRECTORY);
    convertToHumanReadable(resolve(inputDirectory));
  });
});
