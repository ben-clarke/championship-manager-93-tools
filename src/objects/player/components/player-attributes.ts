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
}
