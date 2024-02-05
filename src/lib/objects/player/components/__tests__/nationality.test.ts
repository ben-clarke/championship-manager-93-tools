import Nationality from "../nationality";

describe("nationality", () => {
  test("to hex happy", () => {
    const hex = Nationality.toHex("England", { "00": "England" });
    expect(hex).toEqual({ value: "00", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = Nationality.toHex("ENGland", { "00": "England" });
    expect(hex).toEqual({ value: "00", errors: [] });
  });
  test("to hex sad", () => {
    const hex = Nationality.toHex("Scotland", { "00": "England" });
    expect(hex).toEqual({
      value: undefined,
      errors: ["No nationality found for: Scotland"],
    });
  });
});
