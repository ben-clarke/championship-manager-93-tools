import StyleOfPlay from "../club-style-of-play";

describe("style of play", () => {
  test("to hex happy", () => {
    const hex = StyleOfPlay.toHex("continental");
    expect(hex).toEqual({ value: "03", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = StyleOfPlay.toHex("Continental");
    expect(hex).toEqual({ value: "03", errors: [] });
  });
  test("to hex sad", () => {
    const hex = StyleOfPlay.toHex("tiki-taka");
    expect(hex).toEqual({
      value: undefined,
      errors: [
        "No style of play found for: tiki-taka, valid values are long ball, pass to feet, counter-attack, continental, direct ball",
      ],
    });
  });
});
