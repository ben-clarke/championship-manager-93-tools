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
      .map(({ hex, value }) => (!hex ? `No character found for: ${value}` : ""))
      .filter((e) => e);

    return {
      text: textHex,
      background: backgroundHex,
      errors,
    };
  }
}

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
