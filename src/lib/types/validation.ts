export interface HumanReadable {
  value: string;
  errors: string[];
}

export interface HumanReadableHistory {
  values: string[];
  errors: string[];
}

export interface HumanReadablePersonName {
  value1: string;
  value2: string;
  errors: string[];
}

export interface HumanReadablePosition {
  gk: string;
  def: string;
  mid: string;
  att: string;
  left: string;
  right: string;
  centre: string;
  errors: string[];
}

export interface HumanReadableAttributes {
  passing: string;
  tackling: string;
  pace: string;
  heading: string;
  flair: string;
  creativity: string;
  goalscoring: string;
  agility: string;
  aggression: string;
  influence: string;
  temperament: string;
  consistency: string;
  stamina: string;
  errors: string[];
}

export interface HumanReadableStadium {
  capacity: string;
  seated: string;
  errors: string[];
}

export interface HumanReadableColours {
  text: string;
  background: string;
  errors: string[];
}

// Entities
export interface HumanReadablePlayer {
  values: string[];
  errors: string[];
}
export interface HumanReadableClub {
  values: string[];
  errors: string[];
}

// Files
export interface HumanReadableForeign {
  converted: string[][];
  hex: string;
  errors: string[];
}

export interface HumanReadableLeague {
  converted: string[][][];
  hex: string;
  errors: string[];
}

export interface HumanReadableTeam {
  converted: string[][];
  hex: string;
  errors: string[];
}

export interface HumanReadableExe {
  converted: string[];
  hex: string;
  errors: string[];
}
