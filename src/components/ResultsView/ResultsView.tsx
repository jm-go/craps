import type { GameStats } from '../../types/types'
import './ResultsView.css'

type ResultsViewProps = {
  stats: GameStats
  onPlayAgain: () => void
}

// TODO: Replace all hardcoded values below with values derived from `stats`
const DISPLAY = {
  wins: 3,
  losses: 2,
  avgRolls: 4.2,
  highestRolls: 8,
  lowestRolls: 1,
  mostCommonRoll: 7,
  avgWinPct: 60,
}

export const ResultsView = ({ onPlayAgain }: ResultsViewProps) => {
  return (
    <div className="results-view">
      <h1 className="results-view__title">CRAPS</h1>

      <div className="results-view__score-row">
        <div className="results-view__score-tile results-view__score-tile--wins">
          <span className="results-view__score-label">No. of wins</span>
          <span className="results-view__score-value">{DISPLAY.wins}</span>
        </div>
        <div className="results-view__score-tile results-view__score-tile--losses">
          <span className="results-view__score-label">No. of losses</span>
          <span className="results-view__score-value">{DISPLAY.losses}</span>
        </div>
      </div>

      <div className="results-view__stats-grid">
        <div className="results-view__stat-tile">
          <span className="results-view__stat-label">Avg. rolls</span>
          <span className="results-view__stat-value">{DISPLAY.avgRolls}</span>
        </div>
        <div className="results-view__stat-tile">
          <span className="results-view__stat-label">Highest rolls</span>
          <span className="results-view__stat-value">{DISPLAY.highestRolls}</span>
        </div>
        <div className="results-view__stat-tile">
          <span className="results-view__stat-label">Lowest rolls</span>
          <span className="results-view__stat-value">{DISPLAY.lowestRolls}</span>
        </div>
        <div className="results-view__stat-tile">
          <span className="results-view__stat-label">Most common roll</span>
          <span className="results-view__stat-value">{DISPLAY.mostCommonRoll}</span>
        </div>
        <div className="results-view__stat-tile">
          <span className="results-view__stat-label">Win rate</span>
          <span className="results-view__stat-value">{DISPLAY.avgWinPct}%</span>
        </div>
      </div>

      <button
        type="button"
        className="primary-button results-view__play-again"
        onClick={onPlayAgain}
      >
        PLAY AGAIN
      </button>
    </div>
  )
}
