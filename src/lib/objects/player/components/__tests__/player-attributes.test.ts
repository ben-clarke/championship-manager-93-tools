import PlayerAttributes from "../player-attributes";

describe("player attributes", () => {
  test("to hex happy", () => {
    const hex = PlayerAttributes.toHex(
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
    );
    expect(hex).toEqual({
      passing: "01",
      tackling: "02",
      pace: "03",
      heading: "04",
      flair: "05",
      creativity: "06",
      goalscoring: "07",
      agility: "08",
      aggression: "09",
      influence: "0a",
      temperament: "0b",
      consistency: "0c",
      stamina: "0d",
      errors: [],
    });
  });

  test("to hex high", () => {
    const hex = PlayerAttributes.toHex(
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
      "21",
    );
    expect(hex).toEqual({
      passing: "15",
      tackling: "15",
      pace: "15",
      heading: "15",
      flair: "15",
      creativity: "15",
      goalscoring: "15",
      agility: "15",
      aggression: "15",
      influence: "15",
      temperament: "15",
      consistency: "15",
      stamina: "15",
      errors: ["Attribute must be between 0 and 20, got: 21"],
    });
  });

  test("to hex low", () => {
    const hex = PlayerAttributes.toHex(
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
      "-1",
    );
    expect(hex).toEqual({
      passing: "-1",
      tackling: "-1",
      pace: "-1",
      heading: "-1",
      flair: "-1",
      creativity: "-1",
      goalscoring: "-1",
      agility: "-1",
      aggression: "-1",
      influence: "-1",
      temperament: "-1",
      consistency: "-1",
      stamina: "-1",
      errors: ["Attribute must be between 0 and 20, got: -1"],
    });
  });

  test("to hex randomised", () => {
    const hex = PlayerAttributes.toHex(
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
      "255",
    );
    expect(hex).toEqual({
      passing: "ff",
      tackling: "ff",
      pace: "ff",
      heading: "ff",
      flair: "ff",
      creativity: "ff",
      goalscoring: "ff",
      agility: "ff",
      aggression: "ff",
      influence: "ff",
      temperament: "ff",
      consistency: "ff",
      stamina: "ff",
      errors: [],
    });
  });

  test("to hex not a number", () => {
    const hex = PlayerAttributes.toHex(
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
      "A",
    );
    expect(hex).toEqual({
      passing: "NaN",
      tackling: "NaN",
      pace: "NaN",
      heading: "NaN",
      flair: "NaN",
      creativity: "NaN",
      goalscoring: "NaN",
      agility: "NaN",
      aggression: "NaN",
      influence: "NaN",
      temperament: "NaN",
      consistency: "NaN",
      stamina: "NaN",
      errors: ["Attribute must be a decimal number"],
    });
  });
});
