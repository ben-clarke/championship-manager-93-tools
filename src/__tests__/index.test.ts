import { EDIT_FILE_DIRECTORY } from "src/constants/file";
import { main } from "../index";

describe("hex", () => {
  test("hex", () => {
    main("action", EDIT_FILE_DIRECTORY);
  });
});
