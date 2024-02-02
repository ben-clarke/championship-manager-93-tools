/* eslint-disable no-bitwise */
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

  const hash = createHash(JSON.stringify(obj));
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

// A simple hashing algorithm as we cannot use crypto.createHash in the browser
const createHash = (str: string, seed = 0): number => {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i += 1) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

const INVERTED_OBJ_CACHE: Record<string, Record<string, string>> = {};
