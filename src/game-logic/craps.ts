import { OUTCOME_NATURAL_WIN, OUTCOME_CRAPS_LOSS, OUTCOME_POINT_SET, OUTCOME_POINT_WIN, OUTCOME_SEVEN_OUT, OUTCOME_CONTINUE } from './constants'
import type { GameStats } from '../types/types'

export const rollDie = (): number => Math.floor(Math.random() * 6) + 1;

export const rollDice = (): [number, number] => [rollDie(), rollDie()];

type NaturalWin = { outcome: "natural-win"; sum: number };
type CrapsLoss = { outcome: "craps-loss"; sum: number };
type PointSet = { outcome: "point-set"; sum: number };
type PointWin = { outcome: "point-win"; sum: number };
type SevenOut = { outcome: "seven-out"; sum: number };
type KeepRolling = { outcome: "continue"; sum: number };

export type ComeOutResult = NaturalWin | CrapsLoss | PointSet;
export type PointRollResult = PointWin | SevenOut | KeepRolling;

export const evaluateComeOut = (sum: number): ComeOutResult => {
  if (sum === 7 || sum === 11) return { outcome: OUTCOME_NATURAL_WIN, sum };
  if (sum === 2 || sum === 3 || sum === 12)
    return { outcome: OUTCOME_CRAPS_LOSS, sum };
  return { outcome: OUTCOME_POINT_SET, sum };
};

export const evaluatePointRoll = (
  sum: number,
  point: number,
): PointRollResult => {
  if (sum === point) return { outcome: OUTCOME_POINT_WIN, sum };
  if (sum === 7) return { outcome: OUTCOME_SEVEN_OUT, sum };
  return { outcome: OUTCOME_CONTINUE, sum };
};

export const calcAvgRolls = (rollsPerGame: number[]): number => {
  if (rollsPerGame.length === 0) return 0;
  const total = rollsPerGame.reduce((acc, n) => acc + n, 0);
  return Math.round((total / rollsPerGame.length) * 10) / 10;
};

export const calcHighestRolls = (rollsPerGame: number[]): number =>
  rollsPerGame.length === 0 ? 0 : Math.max(...rollsPerGame);

export const calcLowestRolls = (rollsPerGame: number[]): number =>
  rollsPerGame.length === 0 ? 0 : Math.min(...rollsPerGame);

export const calcMostCommonRoll = (allRolls: number[]): number => {
  if (allRolls.length === 0) return 0;
  const counts = allRolls.reduce<Record<number, number>>((acc, n) => {
    acc[n] = (acc[n] ?? 0) + 1;
    return acc;
  }, {});
  return Number(Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]);
};

export const calcWinRate = (wins: number, totalGames: number): number => {
  if (totalGames === 0) return 0;
  return Math.round((wins / totalGames) * 100);
};

export const calcSessionStats = (stats: GameStats) => {
  const totalGames = stats.wins + stats.losses
  return {
    wins: stats.wins,
    losses: stats.losses,
    avgRolls: calcAvgRolls(stats.rollsPerGame),
    highestRolls: calcHighestRolls(stats.rollsPerGame),
    lowestRolls: calcLowestRolls(stats.rollsPerGame),
    mostCommonRoll: calcMostCommonRoll(stats.allRolls),
    winRate: calcWinRate(stats.wins, totalGames),
  }
};
