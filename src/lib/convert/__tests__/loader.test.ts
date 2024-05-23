import { processAllFiles } from "../process-all-files";

describe("convert", () => {
  test("index", async () => {
    await processAllFiles();
  });
});
