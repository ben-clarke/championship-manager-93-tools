import { DataType } from "../../types/executable";
import { Version } from "../../types/version";
import { hexToUtf8, utf8ToHex } from "../../utils/conversion";

let CONVERTED: string[] = [];

export const resetConverted = (): void => {
  CONVERTED = [];
};

export const printExecutableCodes = (
  parsed: string[],
  requiredDataType: DataType,
  version: Version,
): void => {
  const { matches } = buildData(parsed, requiredDataType, version);

  // Print the stat
  const readme = Object.values(matches).map(({ code, value }) => `| ${code} | ${value} |`);
  readme.forEach((r) => {
    // eslint-disable-next-line no-console
    console.log(r);
  });
};

export const buildData = (
  parsed: string[],
  requiredDataType: DataType,
  version: Version,
): { matches: Record<string, MatchedData>; startIndex: number; endIndex: number } => {
  const startIndex = findStartIndex(parsed, requiredDataType, version);
  if (!startIndex) throw new Error(`No start index found for ${requiredDataType}`);

  const { padding = 2 } = getDataFirstIndex(version)[requiredDataType];

  let item: string[] = [];
  let stopProcessing = false;
  let endIndex = 0;

  const initial: Record<string, MatchedData> = {};
  const matches = parsed.reduce((acc, hex, index) => {
    if (index < startIndex || stopProcessing) return acc;
    if (
      (item.length === 0 &&
        (parseInt(hex, 16) < parseInt(HEX_CHAR_START_THRESHOLD, 16) ||
          parseInt(hex, 16) > parseInt(HEX_CHAR_END_THRESHOLD, 16))) ||
      RESTRICTED_CHARS.includes(hex)
    ) {
      // We have hit the end of list, so can just stop adding to the list now.
      stopProcessing = true;
      endIndex = index;
      return acc;
    }

    if (hex !== LIST_SEPARATOR) {
      // Carry on adding to the item the next character
      item.push(hexToUtf8(hex));
      return acc;
    }

    // We have hit the list separator, meaning that the item has no more characters in it.
    const value = item.join("");

    // Add all these details to the object and then clear the item for the next one.
    const valueIndex = Object.keys(acc).length;
    acc[valueIndex.toString()] = {
      code: valueIndex.toString(16).padStart(padding, "0"),
      value,
    };

    item = [];
    return acc;
  }, initial);

  return { matches, startIndex, endIndex };
};

export const replaceData = (
  data: string[],
  required: string,
  replacement: string,
  exactMatch: boolean,
  startIndex: number,
  endIndex: number,
): string[] => {
  if (required === replacement) return data;

  let newReplacement = replacement;
  if (replacement.length > required.length) {
    newReplacement = replacement.split("").splice(0, required.length).join("");
  }
  if (replacement.length < required.length) {
    newReplacement = replacement.padEnd(required.length, " ");
  }

  let indexes = findIndexes(data, required, exactMatch);

  indexes = (indexes || []).filter(({ start }) => start >= startIndex && start <= endIndex);

  (indexes || []).forEach(({ start, end }) => {
    const shift = end - start + 1;
    data.splice(start, shift, ...newReplacement.split("").map((r) => utf8ToHex(r)));
  });

  return data;
};

export const findIndexes = (
  parsed: string[],
  required: string,
  exactMatch: boolean,
): FoundIndex[] | null => {
  const found: FoundIndex[] = [];

  let sequence: string[] = [];

  const hasBeenConverted = CONVERTED.length > 0;
  const converted: string[] = [];

  for (let i = 0; i < parsed.length; i += 1) {
    const hex = hasBeenConverted ? CONVERTED[i] : parsed[i];
    const requiredIndex = sequence.length;

    const char = hasBeenConverted ? hex : hexToUtf8(hex);
    converted.push(char);

    if (char === required[requiredIndex]) sequence.push(char);
    else if (char === required[0]) sequence = [char];
    else sequence = [];

    if (sequence.join("") === required && (!exactMatch || parsed[i + 1] === "00")) {
      const start = i - required.length + 1;
      const end = i;
      found.push({ start, end });
      sequence = [];
    }
  }

  CONVERTED = converted;

  return found;
};

export const findStartIndex = (
  parsed: string[],
  requiredDataType: DataType,
  version: Version,
): number | null => {
  const dataFirstIndex = getDataFirstIndex(version);
  const { required, occurrence = 1 } = dataFirstIndex[requiredDataType];

  const exactMatch = false;
  const indexes = findIndexes(parsed, required, exactMatch);
  if (!indexes || indexes.length === 0) return null;

  return indexes[occurrence - 1].start;
};

export const getDataFirstIndex = (version: Version): Record<DataType, DataTypeData> => {
  if (version === "Italia") return ITA_DATA_FIRST_INDEX;
  if (version === "Italia95") return ITA_95_DATA_FIRST_INDEX;
  return DATA_FIRST_INDEX;
};

const DATA_FIRST_INDEX: Record<DataType, DataTypeData> = {
  nationality: { required: "England" },
  club: { required: "Aston Villa", occurrence: 2 },
  ground: { required: "Villa Park" },
  "first-name": { required: "Ron", padding: 4 },
  "first-name-foreign": { required: "Ron", padding: 4 },
  surname: { required: "Atkinson", padding: 4 },
  "non-domestic-club": { required: "Porto", padding: 4 },
  version: { required: "Championship Manager" },
  character: { required: "Withdrawn" },
  "injury-type": { required: "severe" },
  wages: { required: "wants higher" },
  "style-of-play": { required: "Long ball" },
  formation: { required: "4-4-2" },
  year: { required: "199", occurrence: 2 },
};

const ITA_DATA_FIRST_INDEX: Record<DataType, DataTypeData> = {
  ...DATA_FIRST_INDEX,
  nationality: { required: "Italy" },
  club: { required: "Atalanta" },
  ground: { required: "Stadio Communale" },
  "first-name": { required: "Francesco", padding: 4 },
  "first-name-foreign": { required: "Francesco", padding: 4 },
  surname: { required: "Guidolin", padding: 4 },
};

const ITA_95_DATA_FIRST_INDEX: Record<DataType, DataTypeData> = {
  ...ITA_DATA_FIRST_INDEX,
  club: { required: "Padova", occurrence: 2 },
  ground: { required: "Euganeo" },
  "first-name": { required: "Mauro", padding: 4 },
  "first-name-foreign": { required: "Mauro", padding: 4 },
  surname: { required: "Sandreani", padding: 4 },
};

interface DataTypeData {
  required: string;
  padding?: number;
  occurrence?: number;
}

export interface MatchedData {
  code: string;
  value: string;
}

export interface FoundIndex {
  start: number;
  end: number;
}

const LIST_SEPARATOR = "00";

const HEX_CHAR_START_THRESHOLD = "20"; // This is a space and is allowed
const HEX_CHAR_END_THRESHOLD = "7e"; // This is a `~` character
const RESTRICTED_CHARS = ["25", "06"]; // %
