import { useState } from "react";
import { useCrapsSession } from "../../game-logic/useCrapsSession";
import { PHASE_POINT, PHASE_GAME_OVER } from "../../game-logic/useCrapsGame";
import { RESULT_WON } from "../../game-logic/constants";
import type { GameStats } from "../../types/types";
import "./PlayView.css";

import dice1Img from "../../assets/DICE1.png";
import dice2Img from "../../assets/DICE2.png";
import dice3Img from "../../assets/DICE3.png";
import dice4Img from "../../assets/DICE4.png";
import dice5Img from "../../assets/DICE5.png";
import dice6Img from "../../assets/DICE6.png";

const DICE_IMAGES = [
  dice1Img,
  dice2Img,
  dice3Img,
  dice4Img,
  dice5Img,
  dice6Img,
];

type PlayViewProps = {
  totalGames: number;
  onFinish: (stats: GameStats) => void;
};

export const PlayView = ({ totalGames, onFinish }: PlayViewProps) => {
  const [isRolling, setIsRolling] = useState(false);

  const {
    die1,
    die2,
    phase,
    point,
    gameRolls,
    lastResult,
    roundsLeft,
    isLastGame,
    roll,
    nextGame,
  } = useCrapsSession({ totalGames, onFinish });

  const handleRoll = () => {
    if (isRolling || phase === PHASE_GAME_OVER) return;
    setIsRolling(true);
    roll();
    setTimeout(() => setIsRolling(false), 350);
  };

  const sum = die1 !== null && die2 !== null ? die1 + die2 : null;

  const dieImage = (value: number | null, fallbackIndex: number) =>
    DICE_IMAGES[(value ?? fallbackIndex + 1) - 1];

  return (
    <div className="play-view">
      <h1 className="play-view__title">CRAPS</h1>

      <p className="play-view__rounds">
        Rounds left{" "}
        <span className="play-view__rounds-count">{roundsLeft}</span>
      </p>

      <div className="play-view__badge-area">
        {phase === PHASE_POINT && (
          <div className="play-view__point-badge">
            Point: <strong>{point}</strong> — roll to match or 7 out
          </div>
        )}
        {phase === PHASE_GAME_OVER && (
          <div className={`play-view__result play-view__result--${lastResult}`}>
            {lastResult === RESULT_WON ? "WIN" : "LOSE"}
          </div>
        )}
      </div>

      <div
        className={`play-view__dice${isRolling ? " play-view__dice--rolling" : ""}`}
      >
        <img
          src={dieImage(die1, 0)}
          alt={die1 !== null ? `Die showing ${die1}` : "Die placeholder"}
          className={`play-view__die${die1 === null ? " play-view__die--idle" : ""}`}
          width={90}
          height={90}
        />
        <img
          src={dieImage(die2, 2)}
          alt={die2 !== null ? `Die showing ${die2}` : "Die placeholder"}
          className={`play-view__die${die2 === null ? " play-view__die--idle" : ""}`}
          width={90}
          height={90}
        />
      </div>

      <p
        className={`play-view__sum${sum === null ? " play-view__sum--hidden" : ""}`}
      >
        Sum <span className="play-view__sum-value">{sum ?? ""}</span>
      </p>

      {phase !== PHASE_GAME_OVER ? (
        <button
          type="button"
          className="primary-button play-view__action-button"
          onClick={handleRoll}
          disabled={isRolling}
        >
          ROLL
        </button>
      ) : (
        <button
          type="button"
          className="primary-button play-view__action-button"
          onClick={nextGame}
        >
          {isLastGame ? "SEE RESULTS" : "NEXT GAME"}
        </button>
      )}

      {gameRolls.length > 0 && (
        <p className="play-view__roll-history">
          Rolls history: {gameRolls.join(", ")}
        </p>
      )}
    </div>
  );
};
