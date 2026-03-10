import { useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci'
import { SetupView } from './SetupView'
import { PlayView } from './PlayView'
import { ResultsView } from './ResultsView'
import type { GameStats } from '../types/types'
import './GameCard.css'

type ScreenView = 'setup' | 'play' | 'results'
type OverlayView = 'closed' | 'instructions'

const INFO_LABEL = 'How to play'

export const GameCard = () => {
  const [screenView, setScreenView] = useState<ScreenView>('setup')
  const [overlayView, setOverlayView] = useState<OverlayView>('closed')
  const [gameCount, setGameCount] = useState(5)
  const [finalStats, setFinalStats] = useState<GameStats | null>(null)

  const toggleInstructions = () => {
    setOverlayView((prevView) =>
      prevView === 'closed' ? 'instructions' : 'closed'
    )
  }

  const handleStart = (count: number) => {
    setGameCount(count)
    setOverlayView('closed')
    setScreenView('play')
  }

  const handleFinish = (stats: GameStats) => {
    setFinalStats(stats)
    setScreenView('results')
  }

  const handlePlayAgain = () => {
    setFinalStats(null)
    setScreenView('setup')
  }

  const isInstructionsOpen = overlayView === 'instructions'

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
                  {'  '}Roll <strong>2</strong>, <strong>3</strong> or <strong>12</strong> →{' '}
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
            {screenView === 'setup' && <SetupView onStart={handleStart} />}
            {screenView === 'play' && <PlayView totalGames={gameCount} onFinish={handleFinish} />}
            {screenView === 'results' && finalStats && <ResultsView stats={finalStats} onPlayAgain={handlePlayAgain} />}
          </>
        )}
      </div>
    </section>
  )
}