export default class ClubAttraction {
  attractiveness: Attractiveness;

  constructor(value: string) {
    this.attractiveness = MAPPING[value];
  }

  toString(): string {
    return this.attractiveness;
  }
}

export type Attractiveness = "super" | "high" | "medium" | "low" | "none";

const MAPPING: Record<string, Attractiveness> = {
  11: "super",
  10: "high",
  "0f": "medium",
  "0e": "low",
  "0d": "none",
};
