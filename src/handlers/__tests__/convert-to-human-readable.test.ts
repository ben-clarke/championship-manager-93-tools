import { EDIT_FILE_DIRECTORY } from "../../constants/file";
import { convertToHumanReadable } from "../convert-to-human-readable";

describe("convertToHumanReadable", () => {
  test("convertToHumanReadable", () => {
    convertToHumanReadable(EDIT_FILE_DIRECTORY);
  });
});
