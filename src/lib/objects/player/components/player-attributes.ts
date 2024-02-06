import { HumanReadableAttributes } from "src/lib/types/validation";

export default class PlayerAttributes {
  passing: number;

  tackling: number;

  pace: number;

  heading: number;

  flair: number;

  creativity: number;

  goalscoring: number;

  agility: number;

  aggression: number;

  influence: number;

  temperament: number;

  consistency: number;

  stamina: number;

  constructor(
    passing: string,
    tackling: string,
    pace: string,
    heading: string,
    flair: string,
    creativity: string,
    goalscoring: string,
    agility: string,
    aggression: string,
    influence: string,
    temperament: string,
    consistency: string,
    stamina: string,
  ) {
    this.passing = parseInt(passing, 16);
    this.tackling = parseInt(tackling, 16);
    this.pace = parseInt(pace, 16);
    this.heading = parseInt(heading, 16);
    this.flair = parseInt(flair, 16);
    this.creativity = parseInt(creativity, 16);
    this.goalscoring = parseInt(goalscoring, 16);
    this.agility = parseInt(agility, 16);
    this.aggression = parseInt(aggression, 16);
    this.influence = parseInt(influence, 16);
    this.temperament = parseInt(temperament, 16);
    this.consistency = parseInt(consistency, 16);
    this.stamina = parseInt(stamina, 16);
  }

  toString(): string {
    return [
      this.passing,
      this.tackling,
      this.pace,
      this.heading,
      this.flair,
      this.creativity,
      this.goalscoring,
      this.agility,
      this.aggression,
      this.influence,
      this.temperament,
      this.consistency,
      this.stamina,
    ].join(",");
  }

  toHumanReadable(): Record<string, string> {
    return {
      Passing: this.passing.toString(),
      Tackling: this.tackling.toString(),
      Pace: this.pace.toString(),
      Heading: this.heading.toString(),
      Flair: this.flair.toString(),
      Creativity: this.creativity.toString(),
      Goalscoring: this.goalscoring.toString(),
      Agility: this.agility.toString(),
      Aggression: this.aggression.toString(),
      Influence: this.influence.toString(),
      Temperament: this.temperament.toString(),
      Consistency: this.consistency.toString(),
      Stamina: this.stamina.toString(),
    };
  }

  static toHex(
    pass: string,
    tack: string,
    pc: string,
    head: string,
    fla: string,
    create: string,
    goals: string,
    ag: string,
    agg: string,
    inf: string,
    temp: string,
    consist: string,
    stam: string,
  ): HumanReadableAttributes {
    const passing = parseInt(pass, 10);
    const tackling = parseInt(tack, 10);
    const pace = parseInt(pc, 10);
    const heading = parseInt(head, 10);
    const flair = parseInt(fla, 10);
    const creativity = parseInt(create, 10);
    const goalscoring = parseInt(goals, 10);
    const agility = parseInt(ag, 10);
    const aggression = parseInt(agg, 10);
    const influence = parseInt(inf, 10);
    const temperament = parseInt(temp, 10);
    const consistency = parseInt(consist, 10);
    const stamina = parseInt(stam, 10);

    const errors = [
      passing,
      tackling,
      pace,
      heading,
      flair,
      creativity,
      goalscoring,
      agility,
      aggression,
      influence,
      temperament,
      consistency,
      stamina,
    ]
      .map((a) => {
        if (Number.isNaN(a)) return "Attribute must be a decimal number";
        if (a !== RANDOM && (LOWER_RANGE > a || a > UPPER_RANGE)) {
          return `Attribute must be between ${LOWER_RANGE} and ${UPPER_RANGE}, got: ${a}`;
        }
        return "";
      })
      .filter((a) => a);

    return {
      passing: passing.toString(16).padStart(2, "0"),
      tackling: tackling.toString(16).padStart(2, "0"),
      pace: pace.toString(16).padStart(2, "0"),
      heading: heading.toString(16).padStart(2, "0"),
      flair: flair.toString(16).padStart(2, "0"),
      creativity: creativity.toString(16).padStart(2, "0"),
      goalscoring: goalscoring.toString(16).padStart(2, "0"),
      agility: agility.toString(16).padStart(2, "0"),
      aggression: aggression.toString(16).padStart(2, "0"),
      influence: influence.toString(16).padStart(2, "0"),
      temperament: temperament.toString(16).padStart(2, "0"),
      consistency: consistency.toString(16).padStart(2, "0"),
      stamina: stamina.toString(16).padStart(2, "0"),
      errors: errors.filter((x, i) => i === errors.indexOf(x)),
    };
  }
}

const LOWER_RANGE = 0;
const UPPER_RANGE = 20;

const RANDOM = 255;
