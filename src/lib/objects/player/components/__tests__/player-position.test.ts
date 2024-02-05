import PlayerPosition from "../player-position";

describe("player position", () => {
  test.each([
    ["GK", "", { gk: "01" }],
    ["D", "L", { def: "01", left: "01" }],
    ["DMA", "CLR", { def: "01", mid: "01", att: "01", left: "01", right: "01", centre: "01" }],
  ])("to hex happy", (position, side, expected) => {
    const hex = PlayerPosition.toHex(position, side);
    expect(hex).toEqual({ ...EXPECTED, ...expected });
  });

  // test("to hex gk and outfield", () => {
  //   const hex = PlayerPosition.toHex("GKD", "L");
  //   expect(hex).toEqual({
  //     ...EXPECTED,
  //     gk: "01",
  //     def: "01",
  //     left: "01",
  //     errors: [
  //       "A goalkeeper cannot play in any other positions",
  //       "A goalkeeper cannot have an assigned side",
  //     ],
  //   });
  // });

  // test("to hex outfield no side", () => {
  //   const hex = PlayerPosition.toHex("D", "");
  //   expect(hex).toEqual({
  //     ...EXPECTED,
  //     def: "01",
  //     errors: ["An outfield player must be assigned at least one side"],
  //   });
  // });

  test("to hex no position", () => {
    const hex = PlayerPosition.toHex("", "");
    expect(hex).toEqual({
      ...EXPECTED,
      errors: ["At least one position must be assigned. GK, D, M or A"],
    });
  });
});

const EXPECTED = {
  gk: "00",
  def: "00",
  mid: "00",
  att: "00",
  left: "00",
  right: "00",
  centre: "00",
  errors: [],
};
