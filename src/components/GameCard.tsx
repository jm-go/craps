import { useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci'
import { SetupView } from './SetupView'
import { PlayView } from './PlayView'
import { ResultsView } from './ResultsView'
import type { GameStats } from '../types/types'
import './GameCard.css'

const SCREEN_VIEW = {
  SETUP: 'setup',
  PLAY: 'play',
  RESULTS: 'results',
} as const

const OVERLAY_VIEW = {
  CLOSED: 'closed',
  INSTRUCTIONS: 'instructions',
} as const

type OverlayView = typeof OVERLAY_VIEW[keyof typeof OVERLAY_VIEW]
type ScreenView = typeof SCREEN_VIEW[keyof typeof SCREEN_VIEW]

const INFO_LABEL = 'How to play'

export const GameCard = () => {
  const [screenView, setScreenView] = useState<ScreenView>(SCREEN_VIEW.SETUP)
  const [overlayView, setOverlayView] = useState<OverlayView>(OVERLAY_VIEW.CLOSED)
  const [gameCount, setGameCount] = useState(5)
  const [finalStats, setFinalStats] = useState<GameStats | null>(null)

  const toggleInstructions = () => {
    setOverlayView((prevView) =>
      prevView === OVERLAY_VIEW.CLOSED ? OVERLAY_VIEW.INSTRUCTIONS : OVERLAY_VIEW.CLOSED
    )
  }

  const handleStart = (count: number) => {
    setGameCount(count)
    setOverlayView(OVERLAY_VIEW.CLOSED)
    setScreenView(SCREEN_VIEW.PLAY)
  }

  const handleFinish = (stats: GameStats) => {
    setFinalStats(stats)
    setScreenView(SCREEN_VIEW.RESULTS)
  }

  const handlePlayAgain = () => {
    setFinalStats(null)
    setScreenView(SCREEN_VIEW.SETUP)
  }

  const isInstructionsOpen = overlayView === OVERLAY_VIEW.INSTRUCTIONS

  return (
    <section className="game-card">
      <button
        type="button"
        className="game-card__info-button"
        onClick={toggleInstructions}
        title={INFO_LABEL}
        aria-label={INFO_LABEL}
      >
        <CiCircleInfo />
      </button>

      <div className="game-card__content">
        {isInstructionsOpen ? (
          <>
            <h1 className="game-card__instructions-title">CRAPS</h1>
            <p className="game-card__instructions-subtitle">How to play</p>

            <div className="game-card__instructions">
              <div className="game-card__rule-tile">
                <span className="game-card__rule-step">Come-out roll</span>
                <p className="game-card__rule-text">
                  Roll two dice to start each game.
                </p>
              </div>

              <div className="game-card__rule-tile">
                <span className="game-card__rule-step">Instant result</span>
                <p className="game-card__rule-text">
                  Roll <strong>7</strong> or <strong>11</strong> →{' '}
                  <span className="game-card__chip game-card__chip--win">WIN</span>
                  {',  '}roll <strong>2</strong>, <strong>3</strong> or <strong>12</strong> →{' '}
                  <span className="game-card__chip game-card__chip--lose">LOSE</span>
                </p>
              </div>

              <div className="game-card__rule-tile">
                <span className="game-card__rule-step">Point phase</span>
                <p className="game-card__rule-text">
                  Any other number sets the <strong>point</strong>. Keep rolling — match it to{' '}
                  <span className="game-card__chip game-card__chip--win">WIN</span>
                  , roll a <strong>7</strong> to{' '}
                  <span className="game-card__chip game-card__chip--lose">LOSE</span>.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {screenView === SCREEN_VIEW.SETUP && <SetupView onStart={handleStart} />}
            {screenView === SCREEN_VIEW.PLAY && <PlayView totalGames={gameCount} onFinish={handleFinish} />}
            {screenView === SCREEN_VIEW.RESULTS && finalStats && <ResultsView stats={finalStats} onPlayAgain={handlePlayAgain} />}
          </>
        )}
      </div>
    </section>
  )
}