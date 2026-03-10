import { OUTCOME_NATURAL_WIN, OUTCOME_CRAPS_LOSS, OUTCOME_POINT_SET, OUTCOME_POINT_WIN, OUTCOME_SEVEN_OUT, OUTCOME_CONTINUE } from './constants'

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
