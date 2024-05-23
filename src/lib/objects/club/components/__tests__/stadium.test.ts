import Stadium, { convertCapacity } from "../stadium";

describe("stadium", () => {
  test("to hex happy", () => {
    const hex = Stadium.toHex("40000", "40000");
    expect(hex).toEqual({ capacity: "28", errors: [], seated: "28" });
  });

  test("to hex low", () => {
    const hex = Stadium.toHex("999", "999");
    expect(hex).toEqual({
      capacity: "",
      seated: "",
      errors: [
        "Capacity must be between 1000 and 100000, got: 999",
        "Capacity must be between 1000 and 100000, got: 999",
      ],
    });
  });

  test("to hex high", () => {
    const hex = Stadium.toHex("100001", "100001");
    expect(hex).toEqual({
      capacity: "",
      seated: "",
      errors: [
        "Capacity must be between 1000 and 100000, got: 100001",
        "Capacity must be between 1000 and 100000, got: 100001",
      ],
    });
  });

  test("to hex seated more than capacity", () => {
    const hex = Stadium.toHex("30000", "40000");
    expect(hex).toEqual({
      capacity: "",
      seated: "",
      errors: ["Capacity must be greater than or equal to the seated capacity"],
    });
  });

  test.each([
    [45_000, 45],
    [12_500, 13],
    [10_000, 10],
    [1_000, 1],
    [999, 1],
    [500, 1],
  ])("convertCapacity %s", (value, expected) => {
    expect(convertCapacity(value)).toEqual(expected);
  });
});
