import PersonName from "../person-name";

describe("person name", () => {
  test("to hex happy", () => {
    const hex = PersonName.toHex("Alex", { "0001": "Alex" });
    expect(hex).toEqual({ value1: "00", value2: "01", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = PersonName.toHex("ALEX", { "0001": "Alex" });
    expect(hex).toEqual({ value1: "00", value2: "01", errors: [] });
  });

  test("to hex sad", () => {
    const hex = PersonName.toHex("Ron", { "0001": "Alex" });
    expect(hex).toEqual({ value1: "", value2: "", errors: ["No person name found for: Ron"] });
  });
});
