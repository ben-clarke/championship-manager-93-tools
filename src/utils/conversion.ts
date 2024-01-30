const convert =
  (from: BufferEncoding, to: BufferEncoding) =>
  (str: string): string =>
    Buffer.from(str, from).toString(to);

export const hexToUtf8 = convert("hex", "utf8");

export const utf8ToHex = convert("utf8", "hex");
