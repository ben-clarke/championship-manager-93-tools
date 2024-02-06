import TransferStatus from "../transfer-status";

describe("transfer status", () => {
  test("to hex happy", () => {
    const hex = TransferStatus.toHex("not for sale");
    expect(hex).toEqual({ value: "01", errors: [] });
  });

  test("to hex happy mixed case", () => {
    const hex = TransferStatus.toHex("Not for Sale");
    expect(hex).toEqual({ value: "01", errors: [] });
  });
  test("to hex sad", () => {
    const hex = TransferStatus.toHex("under contract");
    expect(hex).toEqual({
      value: undefined,
      errors: [
        "No transfer status found for: under contract, valid values are available, not for sale",
      ],
    });
  });
});
