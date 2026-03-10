import {
  OUTCOME_NATURAL_WIN,
  OUTCOME_CRAPS_LOSS,
  OUTCOME_POINT_SET,
  OUTCOME_POINT_WIN,
  OUTCOME_SEVEN_OUT,
  OUTCOME_CONTINUE,
} from "./constants";
import type { GameStats } from "../types/types";

// Returns a random number between 1 and 6
export const rollDie = (): number => Math.floor(Math.random() * 6) + 1;

// Rolls two dice and returns both values
export const rollDice = (): [number, number] => [rollDie(), rollDie()];

type NaturalWin = { outcome: "natural-win"; sum: number };
type CrapsLoss = { outcome: "craps-loss"; sum: number };
type PointSet = { outcome: "point-set"; sum: number };
type PointWin = { outcome: "point-win"; sum: number };
type SevenOut = { outcome: "seven-out"; sum: number };
type KeepRolling = { outcome: "continue"; sum: number };

export type ComeOutResult = NaturalWin | CrapsLoss | PointSet;
export type PointRollResult = PointWin | SevenOut | KeepRolling;

// Evaluates the come-out roll (first roll of a game)
export const evaluateComeOut = (sum: number): ComeOutResult => {
  if (sum === 7 || sum === 11) return { outcome: OUTCOME_NATURAL_WIN, sum };
  if (sum === 2 || sum === 3 || sum === 12)
    return { outcome: OUTCOME_CRAPS_LOSS, sum };
  return { outcome: OUTCOME_POINT_SET, sum };
};

// Evaluates a roll during the point phase
export const evaluatePointRoll = (
  sum: number,
  point: number,
): PointRollResult => {
  if (sum === point) return { outcome: OUTCOME_POINT_WIN, sum };
  if (sum === 7) return { outcome: OUTCOME_SEVEN_OUT, sum };
  return { outcome: OUTCOME_CONTINUE, sum };
};

// Average number of rolls per game, rounded to 1 decimal place
export const calcAvgRolls = (rollsPerGame: number[]): number => {
  const total = rollsPerGame.reduce((acc, n) => acc + n, 0);
  return Math.round((total / rollsPerGame.length) * 10) / 10;
};

// Highest roll count across all games
export const calcHighestRolls = (rollsPerGame: number[]): number =>
  Math.max(...rollsPerGame);

// Lowest roll count across all games
export const calcLowestRolls = (rollsPerGame: number[]): number =>
  Math.min(...rollsPerGame);

// Most frequently rolled dice sum across all rolls
export const calcMostCommonRoll = (allRolls: number[]): number => {
  const counts: { [roll: number]: number } = {};

  for (const roll of allRolls) {
    counts[roll] = (counts[roll] ?? 0) + 1;
  }

  let mostCommon = allRolls[0];
  for (const roll of allRolls) {
    if (counts[roll] > counts[mostCommon]) {
      mostCommon = roll;
    }
  }

  return mostCommon;
};

// Win rate as a percentage, rounded to the nearest whole number
export const calcWinRate = (wins: number, totalGames: number): number =>
  Math.round((wins / totalGames) * 100);

// Calculates final session stats from the raw session stats
export const calcSessionStats = (stats: GameStats) => {
  const totalGames = stats.wins + stats.losses;
  return {
    wins: stats.wins,
    losses: stats.losses,
    avgRolls: calcAvgRolls(stats.rollsPerGame),
    highestRolls: calcHighestRolls(stats.rollsPerGame),
    lowestRolls: calcLowestRolls(stats.rollsPerGame),
    mostCommonRoll: calcMostCommonRoll(stats.allRolls),
    winRate: calcWinRate(stats.wins, totalGames),
  };
};
