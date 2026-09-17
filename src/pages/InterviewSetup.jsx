import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Button from '../components/Button'

const ROLES = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'ML Engineer',
  'Data Scientist',
]

const INTERVIEW_TYPES = ['Technical', 'Behavioral', 'Mixed']
const DIFFICULTIES = ['Easy', 'Medium', 'Hard', 'Adaptive']
const DURATIONS = [
  { label: '10 min', minutes: 10 },
  { label: '20 min', minutes: 20 },
  { label: '30 min', minutes: 30 },
]

function OptionGroup({ label, options, value, onChange, testIdPrefix }) {
  return (
    <div className="mb-7">
      <label className="mb-3 block text-xs tracking-wider text-secondary uppercase">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = option === value
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              data-testid={`${testIdPrefix}-${option.toLowerCase().replace(/\s+/g, '-')}-option`}
              className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF]'
                  : 'border-white/15 text-secondary hover:border-white/30 hover:text-white'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function InterviewSetup() {
  const navigate = useNavigate()
  const [role, setRole] = useState(ROLES[0])
  const [interviewType, setInterviewType] = useState(INTERVIEW_TYPES[0])
  const [difficulty, setDifficulty] = useState(DIFFICULTIES[1])
  const [duration, setDuration] = useState(DURATIONS[1].minutes)

  function handleStart() {
    const config = { role, interviewType, difficulty, durationMinutes: duration }
    sessionStorage.setItem('interviewConfig', JSON.stringify(config))
    navigate('/interview')
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-xl">
        <h1 className="mb-8 font-heading text-2xl font-semibold text-white md:text-3xl">
          Set Up Your Interview
        </h1>

        <div className="rounded-lg border border-white/10 bg-[#0A101D] p-6 md:p-8">
          <div className="mb-7">
            <label className="mb-3 block text-xs tracking-wider text-secondary uppercase">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              data-testid="interview-role-select"
              className="w-full rounded-md border border-white/20 bg-bg px-4 py-3 text-sm text-white focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] focus:outline-none"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <OptionGroup
            label="Interview Type"
            options={INTERVIEW_TYPES}
            value={interviewType}
            onChange={setInterviewType}
            testIdPrefix="interview-type"
          />

          <OptionGroup
            label="Difficulty"
            options={DIFFICULTIES}
            value={difficulty}
            onChange={setDifficulty}
            testIdPrefix="interview-difficulty"
          />

          <div className="mb-2">
            <label className="mb-3 block text-xs tracking-wider text-secondary uppercase">
              Duration
            </label>
            <div className="flex flex-wrap gap-2">
              {DURATIONS.map(({ label, minutes }) => {
                const isActive = minutes === duration
                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => setDuration(minutes)}
                    data-testid={`interview-duration-${minutes}-option`}
                    className={`rounded-md border px-4 py-2 text-sm transition-colors ${
                      isActive
                        ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF]'
                        : 'border-white/15 text-secondary hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          className="mt-8 w-full"
          onClick={handleStart}
          data-testid="setup-start-interview-button"
        >
          Start Interview
        </Button>
      </div>
    </AppLayout>
  )
}
