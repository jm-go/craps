import { useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci'
import { SetupView } from './SetupView'
import { PlayView } from './PlayView'
import type { GameStats } from '../types/types'
import './GameCard.css'

type ScreenView = 'setup' | 'play'
type OverlayView = 'closed' | 'instructions'

const INFO_LABEL = 'How to play'

export const GameCard = () => {
  const [screenView, setScreenView] = useState<ScreenView>('setup')
  const [overlayView, setOverlayView] = useState<OverlayView>('closed')
  const [gameCount, setGameCount] = useState(5)

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

  const handleFinish = (_stats: GameStats) => {
    // TODO: navigate to ResultsView with _stats
    console.log('Simulation complete:', _stats)
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
            <h2 className="game-card__instructions-title">{INFO_LABEL}</h2>

            <div className="game-card__instructions">
              <p>Each game starts with a come-out roll using two dice.</p>

              <p>
                If the total is <strong>7</strong> or <strong>11</strong>, the
                player wins immediately. If the total is <strong>2</strong>,{' '}
                <strong>3</strong>, or <strong>12</strong>, the player loses
                immediately.
              </p>

              <p>
                Any other total becomes the <strong>point</strong>. The player
                continues rolling until they either roll the same point again to
                win or roll a <strong>7</strong> to lose.
              </p>
            </div>
          </>
        ) : (
          <>
            {screenView === 'setup' && <SetupView onStart={handleStart} />}
            {screenView === 'play' && <PlayView totalGames={gameCount} onFinish={handleFinish} />}
          </>
        )}
      </div>
    </section>
  )
}