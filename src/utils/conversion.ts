import crypto from "crypto";
import { reduce } from "ramda";

const convert =
  (from: BufferEncoding, to: BufferEncoding) =>
  (str: string): string =>
    Buffer.from(str, from).toString(to);

export const hexToUtf8 = convert("hex", "utf8");

export const utf8ToHex = convert("utf8", "hex");

export const invertObj = (obj: Record<string, string>): Record<string, string> => {
  const initial: Record<string, string> = {};
  const seen: string[] = [];

  const hash = crypto.createHash("sha256").update(JSON.stringify(obj)).digest("base64");
  const cached = INVERTED_OBJ_CACHE[hash];
  if (cached) return cached;

  const mapping: Record<string, string> = reduce(
    (acc, [k, v]) => {
      const newKey = v.toLowerCase();

      // Don't add if it already exists.
      if (seen.includes(newKey)) return acc;

      seen.push(newKey);
      acc[newKey] = k;
      return acc;
    },
    initial,
    Object.entries(obj),
  );

  INVERTED_OBJ_CACHE[hash] = mapping;

  return mapping;
};

const INVERTED_OBJ_CACHE: Record<string, Record<string, string>> = {};
