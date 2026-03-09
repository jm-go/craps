import './WelcomeView.css'

type WelcomeViewProps = {
  onPlay: () => void
}

const WELCOME_TEXT = 'Welcome to'
const GAME_TITLE = 'CRAPS'
const PLAY_BUTTON_TEXT = 'PLAY'

export const WelcomeView = ({ onPlay }: WelcomeViewProps) => {
  return (
    <>
      <p className="welcome-view__eyebrow">{WELCOME_TEXT}</p>

      <h1 className="welcome-view__title">{GAME_TITLE}</h1>

      <button type="button" className="primary-button" onClick={onPlay}>
        {PLAY_BUTTON_TEXT}
      </button>
    </>
  )
}