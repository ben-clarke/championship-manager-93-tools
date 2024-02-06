import InjuryStatus from "../injury-status";

describe("injury status", () => {
  test("to hex happy", () => {
    const hex = InjuryStatus.toHex("fit");
    expect(hex).toEqual({ value: "00", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = InjuryStatus.toHex("FIT");
    expect(hex).toEqual({ value: "00", errors: [] });
  });
  test("to hex sad", () => {
    const hex = InjuryStatus.toHex("knackered");
    expect(hex).toEqual({
      value: undefined,
      errors: ["No injury status found for: knackered, valid values are fit, injured"],
    });
  });
});
