import type { GameStats } from "../../types/types";
import { calcSessionStats } from "../../game-logic/utils";
import "./ResultsView.css";

type ResultsViewProps = {
  stats: GameStats;
  onPlayAgain: () => void;
};

const WINS = "wins";
const LOSSES = "losses";
type ScoreVariant = typeof WINS | typeof LOSSES;

type ScoreTileProps = {
  label: string;
  value: number;
  variant: ScoreVariant;
};

type StatTileProps = {
  label: string;
  value: number | string;
};

const ScoreTile = ({ label, value, variant }: ScoreTileProps) => (
  <div
    className={`results-view__score-tile results-view__score-tile--${variant}`}
  >
    <span className="results-view__score-label">{label}</span>
    <span className="results-view__score-value">{value}</span>
  </div>
);

const StatTile = ({ label, value }: StatTileProps) => (
  <div className="results-view__stat-tile">
    <span className="results-view__stat-label">{label}</span>
    <span className="results-view__stat-value">{value}</span>
  </div>
);

export const ResultsView = ({ stats, onPlayAgain }: ResultsViewProps) => {
  const display = calcSessionStats(stats);
  return (
    <div className="results-view">
      <h1 className="results-view__title">CRAPS</h1>

      <div className="results-view__score-row">
        <ScoreTile label="No. of wins" value={display.wins} variant={WINS} />
        <ScoreTile
          label="No. of losses"
          value={display.losses}
          variant={LOSSES}
        />
      </div>

      <div className="results-view__stats-grid">
        <StatTile label="Avg. rolls" value={display.avgRolls} />
        <StatTile label="Highest rolls" value={display.highestRolls} />
        <StatTile label="Lowest rolls" value={display.lowestRolls} />
        <StatTile label="Most common roll" value={display.mostCommonRoll} />
        <StatTile label="Win rate" value={`${display.winRate}%`} />
      </div>

      <button
        type="button"
        className="primary-button results-view__play-again"
        onClick={onPlayAgain}
      >
        PLAY AGAIN
      </button>
    </div>
  );
};
