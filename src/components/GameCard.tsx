import { useState } from 'react'
import './GameCard.css'
import { CiCircleInfo } from "react-icons/ci";

type CardView = 'welcome' | 'instructions'

export const GameCard = () => {
  const [view, setView] = useState<CardView>('welcome')

  const toggleInstructions = () => {
    setView((prev) => (prev === 'welcome' ? 'instructions' : 'welcome'))
  }

  return (
    <section className="game-card">
      <button
        className="game-card__info-button"
        onClick={toggleInstructions}
        title="How to play"
        aria-label="How to play"
      >
        <CiCircleInfo />
      </button>

      {view === 'welcome' ? (
        <div className="game-card__content">
          <p className="game-card__eyebrow">Welcome to</p>
          <h1 className="game-card__title">CRAPS</h1>

          <button type="button" className="primary-button">
            PLAY
          </button>
        </div>
      ) : (
        <div className="game-card__content">
          <h2 className="game-card__instructions-title">How to play</h2>

          <div className="game-card__instructions">
            <p>Each game starts with a come-out roll using two dice.</p>

            <p>
              If the total is <strong>7</strong> or <strong>11</strong>, the
              player wins immediately. If the total is <strong>2</strong>,
              <strong>3</strong>, or <strong>12</strong>, the player loses
              immediately.
            </p>

            <p>
              Any other total becomes the <strong>point</strong>. The player
              continues rolling until they either roll the same point again to
              win or roll a <strong>7</strong> to lose.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}