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
    this.isGk = !!this.getAttribute(gk, GOAL);

    this.position = [
      this.getAttribute(gk, GOAL),
      this.getAttribute(def, DEF),
      this.getAttribute(mid, MID),
      this.getAttribute(att, ATT),
    ].join("");
    this.side = [
      this.getAttribute(leftSided, LEFT),
      this.getAttribute(rightSided, RIGHT),
      this.getAttribute(central, CENTRE),
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

  static toHex(position: string, side: string): HexParts {
    return {
      gk: PlayerPosition.getHex(position, GOAL),
      def: PlayerPosition.getHex(position, DEF),
      mid: PlayerPosition.getHex(position, MID),
      att: PlayerPosition.getHex(position, ATT),

      left: PlayerPosition.getHex(side, LEFT),
      right: PlayerPosition.getHex(side, RIGHT),
      centre: PlayerPosition.getHex(side, CENTRE),
    };
  }

  static getHex(value: string, required: string): string {
    if (value.toLowerCase().includes(required.toLowerCase())) return "01";
    return "00";
  }
}

const GOAL = "GK";
const DEF = "D";
const MID = "M";
const ATT = "A";

const LEFT = "L";
const RIGHT = "R";
const CENTRE = "C";

interface HexParts {
  gk: string;
  def: string;
  mid: string;
  att: string;
  left: string;
  right: string;
  centre: string;
}
