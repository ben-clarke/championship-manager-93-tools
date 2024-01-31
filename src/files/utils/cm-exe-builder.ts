import SequenceFound from "../../domain/found-error";
import { DataType } from "../../types/executable";
import { hexToUtf8 } from "../../utils/conversion";

export const printExecutableCodes = (parsed: string[], requiredDataType: DataType): void => {
  const matches = buildData(parsed, requiredDataType);

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
): Record<string, MatchedData> => {
  const startIndex = findStartIndex(parsed, requiredDataType);
  if (!startIndex) throw new Error(`No start index found for ${requiredDataType}`);

  const { padding = 2 } = DATA_FIRST_INDEX[requiredDataType];

  let item: string[] = [];
  let stopProcessing = false;

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
      return acc;
    }

    if (hex !== LIST_SEPARATOR) {
      // Carry on adding to the item the next character
      item.push(hexToUtf8(hex));
      return acc;
    }

    // We have hit the list separator, meaning that the item has no more characters in it.
    // Add all these details to the object and then clear the item for the next one.
    const valueIndex = Object.keys(acc).length;
    acc[valueIndex.toString()] = {
      code: valueIndex.toString(16).padStart(padding, "0"),
      value: item.join(""),
    };

    item = [];
    return acc;
  }, initial);

  return matches;
};

const findStartIndex = (parsed: string[], requiredDataType: DataType): number | null => {
  let sequence: string[] = [];

  const { required, occurrence = 1 } = DATA_FIRST_INDEX[requiredDataType];

  // There are some instance in the binary where the required string we are looking for it referenced
  // multiple times. If that is the case we can keep going until we hit the occurrence we are
  // interested in.
  let foundCount = 0;

  try {
    parsed.forEach((hex, index) => {
      const requiredIndex = sequence.length;

      const char = hexToUtf8(hex);
      if (char === required[requiredIndex]) sequence.push(char);
      else if (char === required[0]) sequence = [char];
      else sequence = [];

      if (sequence.join("") === required) {
        foundCount += 1;
        if (foundCount === occurrence)
          throw new SequenceFound("found", index - required.length + 1);
      }
    });
    return null;
  } catch (e) {
    return (e as SequenceFound).start;
  }
};

const DATA_FIRST_INDEX: Record<DataType, DataTypeData> = {
  nationality: { required: "England" },
  character: { required: "Withdrawn" },
  club: { required: "Aston Villa", occurrence: 2 },
  ground: { required: "Villa Park" },
  "non-domestic-club": { required: "Porto", padding: 4 },
  "first-name": { required: "Ron", padding: 4 },
  surname: { required: "Atkinson", padding: 4 },
  "injury-type": { required: "severe" },
  morale: { required: "feels he should" },
  wages: { required: "wants higher" },
  "style-of-play": { required: "Long ball" },
  formation: { required: "4-4-2" },
  version: { required: "Championship Manager" },
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

const LIST_SEPARATOR = "00";

const HEX_CHAR_START_THRESHOLD = "20"; // This is a space and is allowed
const HEX_CHAR_END_THRESHOLD = "7e"; // This is a `~` character
const RESTRICTED_CHARS = ["25", "06"]; // %
