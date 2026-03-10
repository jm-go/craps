import { useState } from 'react'
import { rollDice, evaluateComeOut, evaluatePointRoll } from '../game-logic/craps'
import type { GameStats } from '../types/types'
import './PlayView.css'

import dice1Img from '../assets/DICE1.png'
import dice2Img from '../assets/DICE2.png'
import dice3Img from '../assets/DICE3.png'
import dice4Img from '../assets/DICE4.png'
import dice5Img from '../assets/DICE5.png'
import dice6Img from '../assets/DICE6.png'

const DICE_IMAGES = [dice1Img, dice2Img, dice3Img, dice4Img, dice5Img, dice6Img]

type PlayPhase = 'ready' | 'point' | 'game-over'

type PlayViewProps = {
  totalGames: number
  onFinish: (stats: GameStats) => void
}

export const PlayView = ({ totalGames, onFinish }: PlayViewProps) => {
  const [currentGame, setCurrentGame] = useState(1)
  const [die1, setDie1] = useState<number | null>(null)
  const [die2, setDie2] = useState<number | null>(null)
  const [phase, setPhase] = useState<PlayPhase>('ready')
  const [point, setPoint] = useState<number | null>(null)
  const [rollCount, setRollCount] = useState(0)
  const [lastResult, setLastResult] = useState<'won' | 'lost' | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [gameRolls, setGameRolls] = useState<number[]>([])
  const [stats, setStats] = useState<GameStats>({
    wins: 0,
    losses: 0,
    rollsPerGame: [],
    allRolls: [],
  })

  const handleRoll = () => {
    if (isRolling || phase === 'game-over') return

    setIsRolling(true)

    const [d1, d2] = rollDice()
    const sum = d1 + d2
    const newRollCount = rollCount + 1

    setDie1(d1)
    setDie2(d2)
    setRollCount(newRollCount)
    setGameRolls(prev => [...prev, sum])

    if (phase === 'ready') {
      const result = evaluateComeOut(sum)
      if (result.outcome === 'natural-win') {
        setLastResult('won')
        setPhase('game-over')
        setStats(prev => ({
          wins: prev.wins + 1,
          losses: prev.losses,
          rollsPerGame: [...prev.rollsPerGame, newRollCount],
          allRolls: [...prev.allRolls, sum],
        }))
      } else if (result.outcome === 'craps-loss') {
        setLastResult('lost')
        setPhase('game-over')
        setStats(prev => ({
          wins: prev.wins,
          losses: prev.losses + 1,
          rollsPerGame: [...prev.rollsPerGame, newRollCount],
          allRolls: [...prev.allRolls, sum],
        }))
      } else {
        setPoint(sum)
        setPhase('point')
        setStats(prev => ({ ...prev, allRolls: [...prev.allRolls, sum] }))
      }
    } else if (phase === 'point' && point !== null) {
      const result = evaluatePointRoll(sum, point)
      if (result.outcome === 'point-win') {
        setLastResult('won')
        setPhase('game-over')
        setStats(prev => ({
          wins: prev.wins + 1,
          losses: prev.losses,
          rollsPerGame: [...prev.rollsPerGame, newRollCount],
          allRolls: [...prev.allRolls, sum],
        }))
      } else if (result.outcome === 'seven-out') {
        setLastResult('lost')
        setPhase('game-over')
        setStats(prev => ({
          wins: prev.wins,
          losses: prev.losses + 1,
          rollsPerGame: [...prev.rollsPerGame, newRollCount],
          allRolls: [...prev.allRolls, sum],
        }))
      } else {
        setStats(prev => ({ ...prev, allRolls: [...prev.allRolls, sum] }))
      }
    }

    setTimeout(() => setIsRolling(false), 350)
  }

  const handleNext = () => {
    if (isLastGame) {
      onFinish(stats)
      return
    }
    setCurrentGame(prev => prev + 1)
    setDie1(null)
    setDie2(null)
    setPhase('ready')
    setPoint(null)
    setRollCount(0)
    setLastResult(null)
    setGameRolls([])
  }

  const isLastGame = currentGame >= totalGames
  const roundsLeft = totalGames - currentGame + 1
  const sum = die1 !== null && die2 !== null ? die1 + die2 : null

  const dieImage = (value: number | null, fallbackIndex: number) =>
    DICE_IMAGES[(value ?? fallbackIndex + 1) - 1]

  return (
    <div className="play-view">
      <h1 className="play-view__title">CRAPS</h1>

      <p className="play-view__rounds">
        Rounds left{' '}
        <span className="play-view__rounds-count">{roundsLeft}</span>
      </p>

      <div className="play-view__badge-area">
        {phase === 'point' && (
          <div className="play-view__point-badge">
            Point: <strong>{point}</strong> — roll to match or 7 out
          </div>
        )}
        {phase === 'game-over' && (
          <div className={`play-view__result play-view__result--${lastResult}`}>
            {lastResult === 'won' ? 'WIN' : 'LOSE'}
          </div>
        )}
      </div>

      <div className={`play-view__dice${isRolling ? ' play-view__dice--rolling' : ''}`}>
        <img
          src={dieImage(die1, 0)}
          alt={die1 !== null ? `Die showing ${die1}` : 'Die placeholder'}
          className={`play-view__die${die1 === null ? ' play-view__die--idle' : ''}`}
          width={90}
          height={90}
        />
        <img
          src={dieImage(die2, 2)}
          alt={die2 !== null ? `Die showing ${die2}` : 'Die placeholder'}
          className={`play-view__die${die2 === null ? ' play-view__die--idle' : ''}`}
          width={90}
          height={90}
        />
      </div>

      <p className={`play-view__sum${sum === null ? ' play-view__sum--hidden' : ''}`}>
        Sum <span className="play-view__sum-value">{sum ?? ''}</span>
      </p>

      {phase !== 'game-over' ? (
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
          onClick={handleNext}
        >
          {isLastGame ? 'SEE RESULTS' : 'NEXT GAME'}
        </button>
      )}

      {gameRolls.length > 0 && (
        <p className="play-view__roll-history">
          Rolls history: {gameRolls.join(', ')}
        </p>
      )}

    </div>
  )
}
