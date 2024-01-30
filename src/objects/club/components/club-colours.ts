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
}

const MAPPING: Record<string, string> = {
  "00": "black",
  "01": "white",
  "02": "red",
  "03": "green",
  "04": "blue",
  "05": "blue2",
  "06": "yellow",
  "07": "UNKNOWN 7",
  "08": "UNKNOWN 8",
  "09": "orange",
  "0a": "dark blue",
  "0b": "purple",
  "0c": "light blue",
  "0d": "UNKNOWN D", // TODO - BC | Burnley away??
  "0e": "UNKNOWN E",
  "0f": "light green",
};
