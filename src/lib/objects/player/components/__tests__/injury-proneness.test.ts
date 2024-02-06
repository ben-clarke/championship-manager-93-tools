import InjuryProneness from "../injury-proneness";

describe("injury proneness", () => {
  test("to hex happy", () => {
    const hex = InjuryProneness.toHex("5");
    expect(hex).toEqual({ value: "05", errors: [] });
  });

  test("to hex random", () => {
    const hex = InjuryProneness.toHex("255");
    expect(hex).toEqual({ value: "ff", errors: [] });
  });

  test("to hex high", () => {
    const hex = InjuryProneness.toHex("11");
    expect(hex).toEqual({ value: "", errors: ["Injury proneness must be between 1 and 10"] });
  });

  test("to hex low", () => {
    const hex = InjuryProneness.toHex("0");
    expect(hex).toEqual({ value: "", errors: ["Injury proneness must be between 1 and 10"] });
  });

  test("to hex not a number", () => {
    const hex = InjuryProneness.toHex("A");
    expect(hex).toEqual({ value: "", errors: ["Injury proneness must be a decimal number"] });
  });
});
