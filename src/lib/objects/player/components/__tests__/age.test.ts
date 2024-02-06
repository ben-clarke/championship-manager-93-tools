import Age from "../age";

describe("age", () => {
  test("to hex happy", () => {
    const hex = Age.toHex("23");
    expect(hex).toEqual({ value: "17", errors: [] });
  });

  test("to hex old", () => {
    const hex = Age.toHex("46");
    expect(hex).toEqual({ value: "", errors: ["Age must be between 16 and 45, got: 46"] });
  });

  test("to hex young", () => {
    const hex = Age.toHex("15");
    expect(hex).toEqual({ value: "", errors: ["Age must be between 16 and 45, got: 15"] });
  });

  test("to hex not a number", () => {
    const hex = Age.toHex("A");
    expect(hex).toEqual({ value: "", errors: ["Age must be a decimal number"] });
  });
});
