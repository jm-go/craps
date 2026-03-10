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
  if (sum === 7 || sum === 11) return { outcome: "natural-win", sum };
  if (sum === 2 || sum === 3 || sum === 12)
    return { outcome: "craps-loss", sum };
  return { outcome: "point-set", sum };
};

export const evaluatePointRoll = (
  sum: number,
  point: number,
): PointRollResult => {
  if (sum === point) return { outcome: "point-win", sum };
  if (sum === 7) return { outcome: "seven-out", sum };
  return { outcome: "continue", sum };
};
