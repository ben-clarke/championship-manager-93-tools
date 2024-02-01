import { Version } from "../types/version";

export const EDIT_FILE_DIRECTORY = "cm93-94";

export const VERSION_93 = "Championship Manager '93";
export const VERSION_93_94 = "Championship Manager '93/4";
export const VERSION_94 = "Championship Manager '94";

export const getGameVersion = (versions: Record<string, string>): Version => {
  const version = versions["00"];
  if (version === VERSION_93) return "93";
  return "94";
};
