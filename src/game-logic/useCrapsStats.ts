import { calcAvgRolls, calcHighestRolls, calcLowestRolls, calcMostCommonRoll, calcWinRate } from './craps'
import type { GameStats } from '../types/types'

export const useCrapsStats = (stats: GameStats) => {
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
}
