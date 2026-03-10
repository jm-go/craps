import { useState } from 'react'
import './SetupView.css'

type SetupViewProps = {
  onStart: (gameCount: number) => void
}

const GAME_TITLE = 'CRAPS'
const SETUP_SUBTITLE = 'Choose no. of rounds'
const START_BUTTON = 'START'
const MIN_GAMES = 1
const MAX_GAMES = 15
const DEFAULT_GAME_COUNT = 5

export const SetupView = ({ onStart }: SetupViewProps) => {
  const [count, setCount] = useState(DEFAULT_GAME_COUNT)

  const decrement = () => setCount(prev => Math.max(MIN_GAMES, prev - 1))
  const increment = () => setCount(prev => Math.min(MAX_GAMES, prev + 1))

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    onStart(count)
  }

  return (
    <form className="setup-view" onSubmit={handleSubmit}>
      <h1 className="setup-view__title">{GAME_TITLE}</h1>

      <p className="setup-view__subtitle">{SETUP_SUBTITLE}</p>

      <div className="setup-view__stepper">
        <button
          type="button"
          className="setup-view__step-btn"
          onClick={decrement}
          disabled={count <= MIN_GAMES}
          aria-label="Decrease rounds"
        >
          −
        </button>

        <span className="setup-view__count">{count}</span>

        <button
          type="button"
          className="setup-view__step-btn"
          onClick={increment}
          disabled={count >= MAX_GAMES}
          aria-label="Increase rounds"
        >
          +
        </button>
      </div>

      <button type="submit" className="primary-button setup-view__continue">
        {START_BUTTON}
      </button>
    </form>
  )
}
