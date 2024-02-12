import ClubAttraction from "../club-attraction";

describe("club attraction", () => {
  test("to hex happy", () => {
    const hex = ClubAttraction.toHex("super");
    expect(hex).toEqual({ value: "11", errors: [] });
  });

  test("to hex case", () => {
    const hex = ClubAttraction.toHex("SUPER");
    expect(hex).toEqual({ value: "11", errors: [] });
  });

  test("to hex sad", () => {
    const hex = ClubAttraction.toHex("doopa");
    expect(hex).toEqual({
      errors: [
        "No club status found for: doopa, valid values are world class, elite, super, high, medium, low, none",
      ],
    });
  });
});
