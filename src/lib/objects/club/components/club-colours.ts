import { HumanReadableColours } from "../../../types/validation";
import { invertObj } from "../../../utils/conversion";

export default class ClubColours {
  text: string;

  background: string;

  constructor(text: string, background: string) {
    this.text = MAPPING[text];
    this.background = MAPPING[background];
  }

  toString(): string {
    return [this.text, this.background].join(",");
  }

  toHumanReadable(prefix: string): Record<string, string> {
    return {
      [`${prefix} text`]: this.text,
      [`${prefix} background`]: this.background,
    };
  }

  static toHex(text: string, background: string): HumanReadableColours {
    const textHex = invertObj(MAPPING)[text.toLowerCase()];
    const backgroundHex = invertObj(MAPPING)[background.toLowerCase()];

    const errors = [
      { hex: textHex, value: text },
      { hex: backgroundHex, value: background },
    ]
      .map(({ hex, value }) => (!hex ? `No colour found for: ${value}` : ""))
      .filter((e) => e);

    return {
      text: textHex,
      background: backgroundHex,
      errors,
    };
  }

  static fromNewDataHome(
    text: number,
    background: number,
  ): { "Home text": string; "Home background": string } {
    return {
      "Home text": COLOURS[text.toString()] || "grey",
      "Home background": COLOURS[background.toString()] || "turquoise",
    };
  }

  static fromNewDataAway(
    text: number,
    background: number,
  ): { "Away text": string; "Away background": string } {
    return {
      "Away text": COLOURS[text.toString()] || "grey",
      "Away background": COLOURS[background.toString()] || "turquoise",
    };
  }
}

const COLOURS: Record<string, string> = {
  0: "black",
  1: "white",
  2: "grey",
  3: "grey",
  4: "red",
  5: "red",
  6: "purple",
  7: "orange",
  8: "orange",
  9: "yellow",
  10: "yellow",
  11: "dark green",
  12: "green",
  13: "blue",
  14: "blue",
  15: "blue",
  16: "blue",
  17: "light blue",
  18: "purple",
  19: "purple",
  20: "purple",
  21: "orange",
  22: "orange",
  23: "pink",
  24: "orange",
  25: "light grey",
  26: "purple",
  27: "green",
  28: "green",
  29: "orange",
  30: "bright blue",
  31: "bright blue",
  32: "red",
  33: "green",
};

const MAPPING: Record<string, string> = {
  "00": "black",
  "01": "white",
  "02": "red",
  "03": "green",
  "04": "blue",
  "05": "bright blue",
  "06": "yellow",
  "07": "pink",
  "08": "light grey",
  "09": "orange",
  "0a": "dark blue",
  "0b": "purple",
  "0c": "light blue",
  "0d": "turquoise",
  "0e": "grey",
  "0f": "dark green",
};
