import ClubMoney, { convertFromMoney } from "../club-money";

describe("money", () => {
  test("to hex happy", () => {
    const hex = ClubMoney.toHex("5000000");
    expect(hex).toEqual({ value: "13", errors: [] });
  });

  test("to hex high", () => {
    const hex = ClubMoney.toHex("1000000000");
    expect(hex).toEqual({
      value: "",
      errors: ["Money must be between 0 and 255, got: 1000000000"],
    });
  });

  test("to hex low", () => {
    const hex = ClubMoney.toHex("-1");
    expect(hex).toEqual({ value: "", errors: ["Money must be between 0 and 255, got: -1"] });
  });

  test("to hex not a number", () => {
    const hex = ClubMoney.toHex("A");
    expect(hex).toEqual({ value: "", errors: ["Money must be a decimal number"] });
  });

  describe("convertFromMoney", () => {
    test.each([
      [10_000_000, 39],
      [1_000_000, 3],
      [450_000, 1],
      [350_000, 0],
      [250_000, 0],
    ])("convert %s", (value, expected) => {
      expect(convertFromMoney(value)).toBe(expected);
    });
  });
});
