import type { ChangeEvent } from 'react'
import { useState } from 'react'
import './SetupView.css'

type SetupViewProps = {
  onStart: (gameCount: number) => void
}

const SETUP_TITLE = 'How many games would you like to play?'
const HELPER_TEXT = 'Enter a number between 1 and 15.'
const START_BUTTON_TEXT = 'START'
const MIN_GAMES = 1
const MAX_GAMES = 15
const DEFAULT_GAME_COUNT = '5'

export const SetupView = ({ onStart }: SetupViewProps) => {
  const [gameCount, setGameCount] = useState(DEFAULT_GAME_COUNT)

  const numericValue = Number(gameCount)
  const isValidGameCount =
    Number.isInteger(numericValue) &&
    numericValue >= MIN_GAMES &&
    numericValue <= MAX_GAMES

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGameCount(event.target.value)
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isValidGameCount) {
      return
    }

    onStart(numericValue)
  }

  return (
    <form className="setup-view" onSubmit={handleSubmit}>
      <h2 className="setup-view__title">{SETUP_TITLE}</h2>

      <p className="setup-view__helper">{HELPER_TEXT}</p>

      <input
        id="game-count"
        name="game-count"
        type="number"
        min={MIN_GAMES}
        max={MAX_GAMES}
        step="1"
        inputMode="numeric"
        className="setup-view__input"
        value={gameCount}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="primary-button"
        disabled={!isValidGameCount}
      >
        {START_BUTTON_TEXT}
      </button>
    </form>
  )
}