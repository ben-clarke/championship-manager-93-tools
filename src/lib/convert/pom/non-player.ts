import { Buffer } from "buffer";

export class NonPlayer {
  ID: number;

  CurrentAbility: number;

  PotentialAbility: number;

  HomeReputation: number;

  CurrentReputation: number;

  WorldReputation: number;

  Attacking: number;

  Business: number;

  Coaching: number;

  CoachingGks: number;

  CoachingTechnique: number;

  Directness: number;

  Discipline: number;

  FreeRoles: number;

  Interference: number;

  Judgement: number;

  JudgingPotential: number;

  ManHandling: number;

  Marking: number;

  Motivating: number;

  Offside: number;

  Patience: number;

  Physiotherapy: number;

  Pressing: number;

  Resources: number;

  Tactics: number;

  Youngsters: number;

  Goalkeeper: number;

  Sweeper: number;

  Defender: number;

  DefensiveMidfielder: number;

  Midfielder: number;

  AttackingMidfielder: number;

  Attacker: number;

  WingBack: number;

  Formation: number;

  constructor(buffer: Buffer) {
    this.ID = buffer.readInt32LE(0);
    this.CurrentAbility = buffer.readUInt16LE(4);
    this.PotentialAbility = buffer.readUInt16LE(6);
    this.HomeReputation = buffer.readUInt16LE(8);
    this.CurrentReputation = buffer.readUInt16LE(10);
    this.WorldReputation = buffer.readUInt16LE(12);
    this.Attacking = buffer.readInt8(14);
    this.Business = buffer.readInt8(15);
    this.Coaching = buffer.readInt8(16);
    this.CoachingGks = buffer.readInt8(17);
    this.CoachingTechnique = buffer.readInt8(18);
    this.Directness = buffer.readInt8(19);
    this.Discipline = buffer.readInt8(20);
    this.FreeRoles = buffer.readInt8(21);
    this.Interference = buffer.readInt8(22);
    this.Judgement = buffer.readInt8(23);
    this.JudgingPotential = buffer.readInt8(24);
    this.ManHandling = buffer.readInt8(25);
    this.Marking = buffer.readInt8(26);
    this.Motivating = buffer.readInt8(27);
    this.Offside = buffer.readInt8(28);
    this.Patience = buffer.readInt8(29);
    this.Physiotherapy = buffer.readInt8(30);
    this.Pressing = buffer.readInt8(31);
    this.Resources = buffer.readInt8(32);
    this.Tactics = buffer.readInt8(33);
    this.Youngsters = buffer.readInt8(34);
    this.Goalkeeper = buffer.readInt32LE(35);
    this.Sweeper = buffer.readInt32LE(39);
    this.Defender = buffer.readInt32LE(43);
    this.DefensiveMidfielder = buffer.readInt32LE(47);
    this.Midfielder = buffer.readInt32LE(51);
    this.AttackingMidfielder = buffer.readInt32LE(55);
    this.Attacker = buffer.readInt32LE(59);
    this.WingBack = buffer.readInt32LE(63);
    this.Formation = buffer.readInt8(67);
  }

  static fromBuffer(buffer: Buffer): NonPlayer {
    return new NonPlayer(buffer);
  }

  static getSize(): number {
    return 68;
  }
}
