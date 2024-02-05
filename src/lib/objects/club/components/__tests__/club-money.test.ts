import ClubMoney from "../club-money";

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
});
