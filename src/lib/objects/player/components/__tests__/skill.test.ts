import Skill from "../skill";

describe("skill", () => {
  test("to hex happy", () => {
    const hex = Skill.toHex("190");
    expect(hex).toEqual({ value: "be", errors: [] });
  });

  test("to hex random", () => {
    const hex = Skill.toHex("255");
    expect(hex).toEqual({ value: "ff", errors: [] });
  });

  test("to hex high", () => {
    const hex = Skill.toHex("201");
    expect(hex).toEqual({ value: "", errors: ["Skill must be between 1 and 200"] });
  });

  test("to hex low", () => {
    const hex = Skill.toHex("0");
    expect(hex).toEqual({ value: "", errors: ["Skill must be between 1 and 200"] });
  });

  test("to hex not a number", () => {
    const hex = Skill.toHex("A");
    expect(hex).toEqual({ value: "", errors: ["Skill must be a decimal number"] });
  });
});
