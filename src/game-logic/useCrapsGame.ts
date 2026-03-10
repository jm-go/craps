import { useState } from "react";
import { rollDice, evaluateComeOut, evaluatePointRoll } from "./utils";
import {
  OUTCOME_NATURAL_WIN,
  OUTCOME_CRAPS_LOSS,
  OUTCOME_POINT_WIN,
  OUTCOME_SEVEN_OUT,
  RESULT_WON,
  RESULT_LOST,
} from "./constants";
import type { ComeOutResult, PointRollResult } from "./utils";

export const PHASE_READY = "ready";
export const PHASE_POINT = "point";
export const PHASE_GAME_OVER = "game-over";

export type PlayPhase =
  | typeof PHASE_READY
  | typeof PHASE_POINT
  | typeof PHASE_GAME_OVER;

export type GameRollResult = {
  d1: number;
  d2: number;
  sum: number;
  rollCount: number;
  outcome: ComeOutResult["outcome"] | PointRollResult["outcome"];
};

export const useCrapsGame = () => {
  const [die1, setDie1] = useState<number | null>(null);
  const [die2, setDie2] = useState<number | null>(null);
  const [phase, setPhase] = useState<PlayPhase>(PHASE_READY);
  const [point, setPoint] = useState<number | null>(null);
  const [rollCount, setRollCount] = useState(0);
  const [gameRolls, setGameRolls] = useState<number[]>([]);
  const [lastResult, setLastResult] = useState<
    typeof RESULT_WON | typeof RESULT_LOST | null
  >(null);

  const handleComeOut = (
    d1: number,
    d2: number,
    sum: number,
    newRollCount: number,
  ): GameRollResult => {
    const result = evaluateComeOut(sum);
    if (result.outcome === OUTCOME_NATURAL_WIN) {
      setLastResult(RESULT_WON);
      setPhase(PHASE_GAME_OVER);
    } else if (result.outcome === OUTCOME_CRAPS_LOSS) {
      setLastResult(RESULT_LOST);
      setPhase(PHASE_GAME_OVER);
    } else {
      setPoint(sum);
      setPhase(PHASE_POINT);
    }
    return { d1, d2, sum, rollCount: newRollCount, outcome: result.outcome };
  };

  const handlePointRoll = (
    d1: number,
    d2: number,
    sum: number,
    newRollCount: number,
  ): GameRollResult => {
    const result = evaluatePointRoll(sum, point!);
    if (result.outcome === OUTCOME_POINT_WIN) {
      setLastResult(RESULT_WON);
      setPhase(PHASE_GAME_OVER);
    } else if (result.outcome === OUTCOME_SEVEN_OUT) {
      setLastResult(RESULT_LOST);
      setPhase(PHASE_GAME_OVER);
    }
    return { d1, d2, sum, rollCount: newRollCount, outcome: result.outcome };
  };

  const roll = (): GameRollResult => {
    const [d1, d2] = rollDice();
    const sum = d1 + d2;
    const newRollCount = rollCount + 1;

    setDie1(d1);
    setDie2(d2);
    setRollCount(newRollCount);
    setGameRolls((prev) => [...prev, sum]);

    return phase === PHASE_READY
      ? handleComeOut(d1, d2, sum, newRollCount)
      : handlePointRoll(d1, d2, sum, newRollCount);
  };

  const reset = () => {
    setDie1(null);
    setDie2(null);
    setPhase(PHASE_READY);
    setPoint(null);
    setRollCount(0);
    setGameRolls([]);
    setLastResult(null);
  };

  return {
    die1,
    die2,
    phase,
    point,
    rollCount,
    gameRolls,
    lastResult,
    roll,
    reset,
  };
};
