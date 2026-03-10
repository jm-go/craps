import { useState } from 'react'
import { CiCircleInfo } from 'react-icons/ci'
import { SetupView } from '../SetupView'
import { PlayView } from '../PlayView'
import { ResultsView } from '../ResultsView'
import { InstructionsView } from '../InstructionsView'
import type { GameStats } from '../../types/types'
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
          <InstructionsView />
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