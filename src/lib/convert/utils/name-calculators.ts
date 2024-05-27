/* eslint-disable no-console */
import CMExeParser from "src/lib/files/cm-exe-parser";
import { TeamDetails } from "./fix-team-data";
import { PlayerDetails } from "./generate-random";

export const getMatchedExeDetails = (
  data: CMExeParser,
  players: PlayerDetails[],
  foreignPlayers: PlayerDetails[],
  teams: Record<string, TeamDetails>,
): MatchedDetails => {
  const firstNames = [
    ...Array.from(new Set([...players, ...foreignPlayers].map((p) => p["First name"]))),
    ...Array.from(new Set(Object.values(teams).map((p) => p["Manager first name"]))),
    ...Array.from(new Set(Object.values(teams).map((p) => p["Assistant first name"]))),
  ].filter((name) => name !== "random");

  const surnames = [
    ...Array.from(new Set([...players, ...foreignPlayers].map((p) => p.Surname))),
    ...Array.from(new Set(Object.values(teams).map((p) => p["Manager surname"]))),
    ...Array.from(new Set(Object.values(teams).map((p) => p["Assistant surname"]))),
  ].filter((name) => name !== "random");

  const nationalities = [
    ...Array.from(new Set([...players, ...foreignPlayers].map((p) => p.Nationality))),
    ...Array.from(new Set(foreignPlayers.map((p) => p.Club))),
  ];

  const exeNames = Array.from(
    new Set(Object.values(data.get("first-name")).filter((name) => !["Ron"].includes(name))),
  );
  const exeSurnames = Array.from(
    new Set(
      Object.values(data.get("surname")).filter(
        (name) => !["Atkinson", "Ireland", "England"].includes(name),
      ),
    ),
  );

  const exeNationalities = Array.from(new Set(Object.values(data.get("nationality"))));

  const unusedNames = getUnusedNames(firstNames, exeNames);
  const requiredFirstNames = getUnusedNames(exeNames, firstNames);
  const {
    matched: matchedFirstNames,
    unmatchedRequired,
    unmatchedUnused,
  } = matchNamesByLength(requiredFirstNames, unusedNames);
  if (unmatchedRequired.length > 0) console.log("First names", unmatchedRequired, unmatchedUnused);

  const unusedSurnames = getUnusedNames(surnames, exeSurnames);
  const requiredSurnames = getUnusedNames(exeSurnames, surnames);
  const {
    matched: matchedSurnames,
    unmatchedRequired: unmatchedSurnamesRequired,
    unmatchedUnused: unmatchedSurnamesUnused,
  } = matchNamesByLength(requiredSurnames, unusedSurnames);
  if (unmatchedSurnamesRequired.length > 0)
    console.log(
      "Surnames",
      unmatchedSurnamesRequired,
      unmatchedSurnamesUnused.sort((a, b) => b.length - a.length),
    );

  const unusedNationalities = getUnusedNames(nationalities, exeNationalities);
  const requiredNationalities = getUnusedNames(exeNationalities, nationalities);
  const {
    matched: matchedNationalities,
    unmatchedRequired: unmatchedNationalitiesRequired,
    unmatchedUnused: unmatchedNationalitiesUnused,
  } = matchNamesByLength(requiredNationalities, unusedNationalities);
  if (unmatchedNationalitiesRequired.length > 0)
    console.log("Nations", unmatchedNationalitiesRequired, unmatchedNationalitiesUnused);

  return { matchedFirstNames, matchedSurnames, matchedNationalities };
};

const getUnusedNames = (names1: string[], names2: string[]): string[] =>
  (
    names2.map((name) => (!names1.includes(name) ? name : null)).filter((name) => name) as string[]
  ).sort((a, b) => a.length - b.length);

const matchNamesByLength = (required: string[], list2: string[]): MatchResult => {
  const matched: [string, string][] = [];
  const unmatchedRequired: string[] = [];
  const unmatchedUnused: string[] = [...list2]; // Clone list2 to keep track of unmatched names

  // eslint-disable-next-line no-restricted-syntax
  for (const name1 of required) {
    const index = unmatchedUnused.findIndex((name2) => name2.length === name1.length);
    if (index !== -1) {
      matched.push([name1, unmatchedUnused[index]]);
      unmatchedUnused.splice(index, 1); // Remove the matched name from list2
    } else {
      unmatchedRequired.push(name1);
    }
  }

  return {
    matched,
    unmatchedRequired,
    unmatchedUnused,
  };
};

interface MatchResult {
  matched: [string, string][];
  unmatchedRequired: string[];
  unmatchedUnused: string[];
}

interface MatchedDetails {
  matchedFirstNames: [string, string][];
  matchedSurnames: [string, string][];
  matchedNationalities: [string, string][];
}
