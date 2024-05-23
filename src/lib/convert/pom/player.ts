import { Buffer } from "buffer";

export class Player {
  ID: number;

  SquadNumber: number;

  CurrentAbility: number;

  PotentialAbility: number;

  HomeReputation: number;

  CurrentReputation: number;

  WorldReputation: number;

  Goalkeeper: number;

  Sweeper: number;

  Defender: number;

  DefensiveMidfielder: number;

  Midfielder: number;

  AttackingMidfielder: number;

  Attacker: number;

  WingBack: number;

  RightSide: number;

  LeftSide: number;

  Central: number;

  FreeRole: number;

  Acceleration: number;

  Aggression: number;

  Agility: number;

  Anticipation: number;

  Balance: number;

  Bravery: number;

  Consistency: number;

  Corners: number;

  Crossing: number;

  Decisions: number;

  Dirtiness: number;

  Dribbling: number;

  Finishing: number;

  Flair: number;

  FreeKicks: number;

  Handling: number;

  Heading: number;

  ImportantMatches: number;

  InjuryProneness: number;

  Jumping: number;

  Leadership: number;

  LeftFoot: number;

  LongShots: number;

  Marking: number;

  Movement: number;

  NaturalFitness: number;

  OneOnOnes: number;

  PlayerPace: number;

  Passing: number;

  Penalties: number;

  Positioning: number;

  Reflexes: number;

  RightFoot: number;

  Stamina: number;

  Strength: number;

  Tackling: number;

  Teamwork: number;

  Technique: number;

  ThrowIns: number;

  Versatility: number;

  Vision: number;

  WorkRate: number;

  PlayerMorale: number;

  constructor(buffer: Buffer) {
    this.ID = buffer.readInt32LE(0);
    this.SquadNumber = buffer.readUInt8(4);
    this.CurrentAbility = buffer.readUInt16LE(5);
    this.PotentialAbility = buffer.readInt16LE(7);
    this.HomeReputation = buffer.readUInt16LE(9);
    this.CurrentReputation = buffer.readUInt16LE(11);
    this.WorldReputation = buffer.readUInt16LE(13);
    this.Goalkeeper = buffer.readInt8(15);
    this.Sweeper = buffer.readInt8(16);
    this.Defender = buffer.readInt8(17);
    this.DefensiveMidfielder = buffer.readInt8(18);
    this.Midfielder = buffer.readInt8(19);
    this.AttackingMidfielder = buffer.readInt8(20);
    this.Attacker = buffer.readInt8(21);
    this.WingBack = buffer.readInt8(22);
    this.RightSide = buffer.readInt8(23);
    this.LeftSide = buffer.readInt8(24);
    this.Central = buffer.readInt8(25);
    this.FreeRole = buffer.readInt8(26);
    this.Acceleration = buffer.readInt8(27);
    this.Aggression = buffer.readInt8(28);
    this.Agility = buffer.readInt8(29);
    this.Anticipation = buffer.readInt8(30);
    this.Balance = buffer.readInt8(31);
    this.Bravery = buffer.readInt8(32);
    this.Consistency = buffer.readInt8(33);
    this.Corners = buffer.readInt8(34);
    this.Crossing = buffer.readInt8(35);
    this.Decisions = buffer.readInt8(36);
    this.Dirtiness = buffer.readInt8(37);
    this.Dribbling = buffer.readInt8(38);
    this.Finishing = buffer.readInt8(39);
    this.Flair = buffer.readInt8(40);
    this.FreeKicks = buffer.readInt8(41);
    this.Handling = buffer.readInt8(42);
    this.Heading = buffer.readInt8(43);
    this.ImportantMatches = buffer.readInt8(44);
    this.InjuryProneness = buffer.readInt8(45);
    this.Jumping = buffer.readInt8(46);
    this.Leadership = buffer.readInt8(47);
    this.LeftFoot = buffer.readInt8(48);
    this.LongShots = buffer.readInt8(49);
    this.Marking = buffer.readInt8(50);
    this.Movement = buffer.readInt8(51);
    this.NaturalFitness = buffer.readInt8(52);
    this.OneOnOnes = buffer.readInt8(53);
    this.PlayerPace = buffer.readInt8(54);
    this.Passing = buffer.readInt8(55);
    this.Penalties = buffer.readInt8(56);
    this.Positioning = buffer.readInt8(57);
    this.Reflexes = buffer.readInt8(58);
    this.RightFoot = buffer.readInt8(59);
    this.Stamina = buffer.readInt8(60);
    this.Strength = buffer.readInt8(61);
    this.Tackling = buffer.readInt8(62);
    this.Teamwork = buffer.readInt8(63);
    this.Technique = buffer.readInt8(64);
    this.ThrowIns = buffer.readInt8(65);
    this.Versatility = buffer.readInt8(66);
    this.Vision = buffer.readInt8(67);
    this.WorkRate = buffer.readInt8(68);
    this.PlayerMorale = buffer.readUInt8(69);
  }

  static fromBuffer(buffer: Buffer): Player {
    return new Player(buffer);
  }

  static getSize(): number {
    return 70;
  }
}
