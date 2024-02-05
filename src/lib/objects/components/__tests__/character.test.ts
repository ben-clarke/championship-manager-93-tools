import Character from "../character";

describe("character", () => {
  test("to hex happy", () => {
    const hex = Character.toHex("withdrawn");
    expect(hex).toEqual({ value: "00", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = Character.toHex("Withdrawn");
    expect(hex).toEqual({ value: "00", errors: [] });
  });
  test("to hex sad", () => {
    const hex = Character.toHex("raging");
    expect(hex).toEqual({
      value: undefined,
      errors: ["No character found for: raging"],
    });
  });
});
