import ClubColours from "../club-colours";

describe("club colours", () => {
  test("to hex happy", () => {
    const hex = ClubColours.toHex("red", "white");
    expect(hex).toEqual({
      background: "01",
      errors: [],
      text: "02",
    });
  });
  test("to hex sad", () => {
    const hex = ClubColours.toHex("magenta", "aquamarine");
    expect(hex).toEqual({
      errors: ["No colour found for: magenta", "No colour found for: aquamarine"],
    });
  });
});
