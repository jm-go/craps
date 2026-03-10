import { useState } from "react";
import { useCrapsGame } from "./useCrapsGame";
import type { GameStats } from "../types/types";
import {
  OUTCOME_NATURAL_WIN,
  OUTCOME_POINT_WIN,
  OUTCOME_CRAPS_LOSS,
  OUTCOME_SEVEN_OUT,
} from "./constants";

type UseCrapsSessionProps = {
  totalGames: number;
  onFinish: (stats: GameStats) => void;
};

const addWin = (
  prev: GameStats,
  rollCount: number,
  sum: number,
): GameStats => ({
  wins: prev.wins + 1,
  losses: prev.losses,
  rollsPerGame: [...prev.rollsPerGame, rollCount],
  allRolls: [...prev.allRolls, sum],
});

const addLoss = (
  prev: GameStats,
  rollCount: number,
  sum: number,
): GameStats => ({
  wins: prev.wins,
  losses: prev.losses + 1,
  rollsPerGame: [...prev.rollsPerGame, rollCount],
  allRolls: [...prev.allRolls, sum],
});

const addRoll = (prev: GameStats, sum: number): GameStats => ({
  ...prev,
  allRolls: [...prev.allRolls, sum],
});

export const useCrapsSession = ({
  totalGames,
  onFinish,
}: UseCrapsSessionProps) => {
  const [currentGame, setCurrentGame] = useState(1);
  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    rollsPerGame: [],
    allRolls: [],
  });

  const game = useCrapsGame();

  const roll = () => {
    const result = game.roll();

    if (
      result.outcome === OUTCOME_NATURAL_WIN ||
      result.outcome === OUTCOME_POINT_WIN
    ) {
      setStats((prev) => addWin(prev, result.rollCount, result.sum));
    } else if (
      result.outcome === OUTCOME_CRAPS_LOSS ||
      result.outcome === OUTCOME_SEVEN_OUT
    ) {
      setStats((prev) => addLoss(prev, result.rollCount, result.sum));
    } else {
      setStats((prev) => addRoll(prev, result.sum));
    }
  };

  const nextGame = () => {
    if (currentGame >= totalGames) {
      onFinish(stats);
      return;
    }
    setCurrentGame((prev) => prev + 1);
    game.reset();
  };

  return {
    die1: game.die1,
    die2: game.die2,
    phase: game.phase,
    point: game.point,
    gameRolls: game.gameRolls,
    lastResult: game.lastResult,
    gamesLeft: totalGames - currentGame + 1,
    isLastGame: currentGame >= totalGames,
    roll,
    nextGame,
  };
};
