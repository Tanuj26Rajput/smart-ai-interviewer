import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ArrowRight } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import ScoreCard from '../components/ScoreCard'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'

const FALLBACK_RESULTS = {
  overall: 78,
  breakdown: [
    { label: 'Technical Knowledge', score: 82 },
    { label: 'Communication', score: 74 },
    { label: 'Problem Solving', score: 79 },
    { label: 'Confidence', score: 76 },
  ],
  wentWell: ['Clear communication', 'Good technical fundamentals', 'Structured responses'],
  improveNext: [
    'Give more concrete examples',
    'Explain trade-offs more clearly',
    'Slow down when answering unfamiliar questions',
  ],
  recommendation: {
    strongest: 'technical fundamentals',
    improve: 'communication structure',
    nextStep: 'Practice 2 behavioral interviews.',
  },
}

export default function InterviewResults() {
  const navigate = useNavigate()
  const [results, setResults] = useState(null)

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('interviewResults')
      setResults(stored ? JSON.parse(stored) : FALLBACK_RESULTS)
    } catch {
      setResults(FALLBACK_RESULTS)
    }
  }, [])

  if (!results) return null

  return (
    <AppLayout>
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 font-heading text-2xl font-semibold text-white md:text-3xl">
          Interview Complete
        </h1>

        <div className="mb-8">
          <ScoreCard score={results.overall} />
        </div>

        <div className="mb-8 rounded-lg border border-white/10 bg-[#0A101D] p-6">
          <h2 className="mb-5 text-xs tracking-wider text-secondary uppercase">Breakdown</h2>
          <div className="space-y-4">
            {results.breakdown.map((item) => (
              <ProgressBar key={item.label} label={item.label} value={item.score} showLabel />
            ))}
          </div>
        </div>

        <div className="mb-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-[#0A101D] p-6">
            <h2 className="mb-4 text-xs tracking-wider text-secondary uppercase">
              What Went Well
            </h2>
            <ul className="space-y-2.5">
              {results.wentWell.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white">
                  <Check size={15} className="mt-0.5 shrink-0 text-[#00FF66]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-white/10 bg-[#0A101D] p-6">
            <h2 className="mb-4 text-xs tracking-wider text-secondary uppercase">
              Improve Next
            </h2>
            <ul className="space-y-2.5">
              {results.improveNext.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white">
                  <ArrowRight size={15} className="mt-0.5 shrink-0 text-[#FFB800]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-10 rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/5 p-6">
          <h2 className="mb-3 text-xs tracking-wider text-[#00F0FF] uppercase">
            AI Recommendation
          </h2>
          <p className="mb-3 text-sm leading-relaxed text-white">
            Your strongest area is <span className="text-[#00FF66]">{results.recommendation.strongest}</span>.
          </p>
          <p className="mb-3 text-sm leading-relaxed text-white">
            Your biggest improvement opportunity is{' '}
            <span className="text-[#FFB800]">{results.recommendation.improve}</span>.
          </p>
          <p className="text-sm leading-relaxed text-secondary">
            Recommended next step: {results.recommendation.nextStep}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            variant="primary"
            className="flex-1"
            onClick={() => navigate('/interview/setup')}
            data-testid="practice-again-button"
          >
            Practice Again
          </Button>
          <Button
            as={Link}
            to="/dashboard"
            variant="secondary"
            className="flex-1"
            data-testid="back-to-dashboard-button"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
