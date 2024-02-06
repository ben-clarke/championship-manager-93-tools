import ManagerReputation from "../manager-reputation";

describe("manager reputation", () => {
  test("to hex happy", () => {
    const hex = ManagerReputation.toHex("180");
    expect(hex).toEqual({ value: "b4", errors: [] });
  });

  test("to hex random", () => {
    const hex = ManagerReputation.toHex("255");
    expect(hex).toEqual({ value: "ff", errors: [] });
  });

  test("to hex old", () => {
    const hex = ManagerReputation.toHex("201");
    expect(hex).toEqual({
      value: "",
      errors: ["Manager reputation must be between 1 and 200, got: 201"],
    });
  });

  test("to hex young", () => {
    const hex = ManagerReputation.toHex("-1");
    expect(hex).toEqual({
      value: "",
      errors: ["Manager reputation must be between 1 and 200, got: -1"],
    });
  });

  test("to hex not a number", () => {
    const hex = ManagerReputation.toHex("A");
    expect(hex).toEqual({ value: "", errors: ["Manager reputation must be a decimal number"] });
  });
});
