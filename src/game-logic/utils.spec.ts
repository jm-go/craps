import { describe, it, expect } from "vitest";
import {
  rollDie,
  rollDice,
  evaluateComeOut,
  evaluatePointRoll,
  calcAvgRolls,
  calcHighestRolls,
  calcLowestRolls,
  calcMostCommonRoll,
  calcWinRate,
  calcSessionStats,
} from "./utils";
import {
  OUTCOME_NATURAL_WIN,
  OUTCOME_CRAPS_LOSS,
  OUTCOME_POINT_SET,
  OUTCOME_POINT_WIN,
  OUTCOME_SEVEN_OUT,
  OUTCOME_CONTINUE,
} from "./constants";
import type { GameStats } from "../types/types";

describe("test utils.ts", () => {
  const sessionStats: GameStats = {
    wins: 3,
    losses: 2,
    rollsPerGame: [2, 4, 1, 3, 5],
    allRolls: [7, 11, 7, 4, 6, 7, 3, 2, 5, 8, 9],
  };

  it("rollDie returns an integer between 1 and 6 inclusive", () => {
    for (let i = 0; i < 100; i++) {
      const result = rollDie();
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    }
  });

  it("rollDice returns two values each between 1 and 6", () => {
    const [d1, d2] = rollDice();
    expect(d1).toBeGreaterThanOrEqual(1);
    expect(d1).toBeLessThanOrEqual(6);
    expect(d2).toBeGreaterThanOrEqual(1);
    expect(d2).toBeLessThanOrEqual(6);
  });

  it("evaluateComeOut returns the correct outcome for natural-win, craps-loss, and point-set sums", () => {
    expect(evaluateComeOut(7)).toEqual({
      outcome: OUTCOME_NATURAL_WIN,
      sum: 7,
    });
    expect(evaluateComeOut(11)).toEqual({
      outcome: OUTCOME_NATURAL_WIN,
      sum: 11,
    });
    expect(evaluateComeOut(2)).toEqual({ outcome: OUTCOME_CRAPS_LOSS, sum: 2 });
    expect(evaluateComeOut(12)).toEqual({
      outcome: OUTCOME_CRAPS_LOSS,
      sum: 12,
    });
    expect(evaluateComeOut(6)).toEqual({ outcome: OUTCOME_POINT_SET, sum: 6 });
  });

  it("evaluatePointRoll returns point-win when sum matches the point, and seven-out when sum is 7", () => {
    expect(evaluatePointRoll(6, 6)).toEqual({
      outcome: OUTCOME_POINT_WIN,
      sum: 6,
    });
    expect(evaluatePointRoll(7, 6)).toEqual({
      outcome: OUTCOME_SEVEN_OUT,
      sum: 7,
    });
  });

  it("evaluatePointRoll returns continue for any other sum", () => {
    expect(evaluatePointRoll(5, 8)).toEqual({
      outcome: OUTCOME_CONTINUE,
      sum: 5,
    });
  });

  it("calcAvgRolls returns the average rounded to 1 decimal place", () => {
    expect(calcAvgRolls([2, 4, 6])).toBe(4.0);
    expect(calcAvgRolls([3, 3, 4])).toBe(3.3);
  });

  it("calcAvgRolls handles a single-element array", () => {
    expect(calcAvgRolls([5])).toBe(5.0);
  });

  it("calcHighestRolls returns the maximum value", () => {
    expect(calcHighestRolls([1, 5, 3, 7, 2])).toBe(7);
    expect(calcHighestRolls([4])).toBe(4);
  });

  it("calcLowestRolls returns the minimum value", () => {
    expect(calcLowestRolls([1, 5, 3, 7, 2])).toBe(1);
    expect(calcLowestRolls([4])).toBe(4);
  });

  it("calcMostCommonRoll returns the most frequently occurring value", () => {
    expect(calcMostCommonRoll([7, 7, 4, 6, 7])).toBe(7);
    expect(calcMostCommonRoll([5, 5, 9, 9, 9])).toBe(9);
  });

  it("calcMostCommonRoll returns the first encountered value when all counts are equal", () => {
    expect(calcMostCommonRoll([3, 6, 3, 6])).toBe(3);
  });

  it("calcWinRate returns win percentage rounded to nearest whole number", () => {
    expect(calcWinRate(3, 10)).toBe(30);
    expect(calcWinRate(1, 3)).toBe(33);
    expect(calcWinRate(5, 5)).toBe(100);
  });

  it("calcWinRate handles 0 wins", () => {
    expect(calcWinRate(0, 5)).toBe(0);
  });

  it("calcSessionStats returns correct wins, losses, and winRate", () => {
    const result = calcSessionStats(sessionStats);
    expect(result.wins).toBe(3);
    expect(result.losses).toBe(2);
    expect(result.winRate).toBe(60);
  });

  it("calcSessionStats returns correct roll stats", () => {
    const result = calcSessionStats(sessionStats);
    expect(result.avgRolls).toBe(3.0);
    expect(result.highestRolls).toBe(5);
    expect(result.lowestRolls).toBe(1);
    expect(result.mostCommonRoll).toBe(7);
  });
});
