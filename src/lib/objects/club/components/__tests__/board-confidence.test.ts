import BoardConfidence from "../board-confidence";

describe("board confidence", () => {
  test("to hex happy", () => {
    const hex = BoardConfidence.toHex("23");
    expect(hex).toEqual({ value: "17", errors: [] });
  });

  test("to hex high", () => {
    const hex = BoardConfidence.toHex("101");
    expect(hex).toEqual({
      value: "",
      errors: ["Board confidence must be between 1 and 100, got: 101"],
    });
  });

  test("to hex low", () => {
    const hex = BoardConfidence.toHex("0");
    expect(hex).toEqual({
      value: "",
      errors: ["Board confidence must be between 1 and 100, got: 0"],
    });
  });

  test("to hex not a number", () => {
    const hex = BoardConfidence.toHex("A");
    expect(hex).toEqual({ value: "", errors: ["Board confidence must be a decimal number"] });
  });
});
