import ProgressBar from './ProgressBar'

export default function QuestionProgress({ current, total }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div data-testid="question-progress">
      <div className="mb-2 text-xs tracking-wider text-secondary uppercase">
        Question {current} of {total}
      </div>
      <ProgressBar value={percent} color="accent" height={6} />
    </div>
  )
}
