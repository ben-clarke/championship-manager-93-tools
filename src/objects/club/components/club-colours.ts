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

  static toHex(text: string, background: string): { text: string; background: string } {
    return {
      text: invertObj(MAPPING)[text.toLowerCase()] || "XXXX",
      background: invertObj(MAPPING)[background.toLowerCase()] || "XXXX",
    };
  }
}

const MAPPING: Record<string, string> = {
  "00": "black",
  "01": "white",
  "02": "red",
  "03": "green",
  "04": "blue",
  "05": "blue2",
  "06": "yellow",
  "07": "pink",
  "08": "grey",
  "09": "orange",
  "0a": "dark blue",
  "0b": "purple",
  "0c": "light blue",
  "0d": "turquoise",
  "0e": "pale grey",
  "0f": "light green",
};
