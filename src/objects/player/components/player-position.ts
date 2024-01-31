export default class PlayerPosition {
  isGk: boolean;

  position: string;

  side: string;

  constructor(
    gk: string,
    def: string,
    mid: string,
    att: string,
    rightSided: string,
    leftSided: string,
    central: string,
  ) {
    this.isGk = !!this.getAttribute(gk, "GK");

    this.position = [
      this.getAttribute(gk, "GK"),
      this.getAttribute(def, "D"),
      this.getAttribute(mid, "M"),
      this.getAttribute(att, "A"),
    ].join("");
    this.side = [
      this.getAttribute(leftSided, "L"),
      this.getAttribute(rightSided, "R"),
      this.getAttribute(central, "C"),
    ].join("");
  }

  getAttribute(value: string, position: string): string {
    if (value === "00") return "";
    return position;
  }

  toString(): string {
    if (this.isGk) return this.position;
    return [this.position, this.side].toString();
  }

  toHumanReadable(): Record<string, string> {
    return {
      Position: this.position,
      Side: this.side,
    };
  }
}
