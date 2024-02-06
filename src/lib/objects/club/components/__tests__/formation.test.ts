import Formation from "../club-formation";

describe("formation", () => {
  test("to hex happy", () => {
    const hex = Formation.toHex("sweeper");
    expect(hex).toEqual({ value: "02", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = Formation.toHex("Sweeper");
    expect(hex).toEqual({ value: "02", errors: [] });
  });
  test("to hex sad", () => {
    const hex = Formation.toHex("cleaner");
    expect(hex).toEqual({
      value: undefined,
      errors: [
        "No formation found for: cleaner, valid values are four-four-two, four-two-four, Sweeper, five-three-two, four-three-three, five-two-three, four-five-one, anchor man, support man, random",
      ],
    });
  });
});
