import * as fs from "fs";
import { unparse } from "papaparse";
import { getNewTeamName } from "./division-calculator";
import { TeamDetails } from "./fix-team-data";
import { PlayerDetails } from "./generate-random";

export const writeLeagueData = (players: PlayerDetails[], year: number, filepath: string): void => {
  const csv = unparse(players.map((p) => ({ ...p, Club: getNewTeamName(p.Club, year) })));
  fs.writeFileSync(`${filepath}/LEAGUE.DAT.csv`, csv);
};

export const writeTeamData = (
  teams: Record<string, TeamDetails>,
  year: number,
  filepath: string,
): void => {
  const csv = unparse(
    Object.values(teams).map((t) => ({ ...t, Club: getNewTeamName(t.Club, year) })),
  );
  fs.writeFileSync(`${filepath}/TEAM.DAT.csv`, csv);
};
