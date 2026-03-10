import './InstructionsView.css'

export const InstructionsView = () => {
  return (
    <>
      <h1 className="instructions-view__title">CRAPS</h1>
      <p className="instructions-view__subtitle">How to play</p>

      <div className="instructions-view__rules">
        <div className="instructions-view__rule-tile">
          <span className="instructions-view__rule-step">Come-out roll</span>
          <p className="instructions-view__rule-text">
            Roll two dice to start each game.
          </p>
        </div>

        <div className="instructions-view__rule-tile">
          <span className="instructions-view__rule-step">Instant result</span>
          <p className="instructions-view__rule-text">
            Roll <strong>7</strong> or <strong>11</strong> →{' '}
            <span className="instructions-view__chip instructions-view__chip--win">WIN</span>
            {',  '}roll <strong>2</strong>, <strong>3</strong> or <strong>12</strong> →{' '}
            <span className="instructions-view__chip instructions-view__chip--lose">LOSE</span>
          </p>
        </div>

        <div className="instructions-view__rule-tile">
          <span className="instructions-view__rule-step">Point phase</span>
          <p className="instructions-view__rule-text">
            Any other number sets the <strong>point</strong>. Keep rolling — match it to{' '}
            <span className="instructions-view__chip instructions-view__chip--win">WIN</span>
            , roll a <strong>7</strong> to{' '}
            <span className="instructions-view__chip instructions-view__chip--lose">LOSE</span>.
          </p>
        </div>
      </div>
    </>
  )
}
