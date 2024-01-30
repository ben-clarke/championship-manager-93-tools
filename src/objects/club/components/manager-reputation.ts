export default class ManagerReputation {
  reputation: Reputation;

  constructor(value: string) {
    this.reputation = ManagerReputation.getReputation(value);
  }

  private static getReputation(value: string): Reputation {
    const val = parseInt(value, 16);

    if (val === 255) return "random";
    if (val >= 170) return "superb";
    if (val >= 150) return "v.good";
    if (val >= 120) return "good";
    if (val >= 100) return "fair";
    return "unknown";
  }

  toString(): string {
    return this.reputation;
  }
}

type Reputation = "superb" | "v.good" | "good" | "fair" | "unknown" | "random";
