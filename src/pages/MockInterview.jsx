import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import InterviewMessage from '../components/InterviewMessage'
import InterviewFeedback from '../components/InterviewFeedback'
import InterviewTimer from '../components/InterviewTimer'
import QuestionProgress from '../components/QuestionProgress'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import { startInterview, evaluateAnswer, getInterviewResults } from '../services/interviewService'

const DEFAULT_CONFIG = {
  role: 'Software Engineer',
  interviewType: 'Technical',
  difficulty: 'Medium',
  durationMinutes: 20,
}

const STAGES = {
  LOADING: 'loading',
  ASKING: 'asking',
  ANALYZING: 'analyzing',
  FEEDBACK: 'feedback',
}

export default function MockInterview() {
  const navigate = useNavigate()
  const [config] = useState(() => {
    try {
      const stored = sessionStorage.getItem('interviewConfig')
      return stored ? JSON.parse(stored) : DEFAULT_CONFIG
    } catch {
      return DEFAULT_CONFIG
    }
  })

  const [session, setSession] = useState(null)
  const [stage, setStage] = useState(STAGES.LOADING)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submittedAnswer, setSubmittedAnswer] = useState('')
  const [currentFeedback, setCurrentFeedback] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showEndConfirm, setShowEndConfirm] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    let cancelled = false
    startInterview(config).then((result) => {
      if (!cancelled) {
        setSession(result)
        setStage(STAGES.ASKING)
      }
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [stage, questionIndex])

  if (stage === STAGES.LOADING || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="text-center">
          <Sparkles className="mx-auto mb-4 animate-pulse text-[#00F0FF]" size={28} />
          <p className="text-sm text-secondary">Preparing your interview...</p>
        </div>
      </div>
    )
  }

  const totalQuestions = session.questions.length
  const currentQuestion = session.questions[questionIndex]
  const progressPercent = Math.round(((questionIndex + (stage === STAGES.ASKING ? 0 : 1)) / totalQuestions) * 100)

  async function handleSubmit() {
    if (!answer.trim()) return
    setSubmittedAnswer(answer)
    setStage(STAGES.ANALYZING)
    const feedback = await evaluateAnswer(answer, questionIndex)
    setCurrentFeedback(feedback)
    setAnswers((prev) => [...prev, { question: currentQuestion, answer, feedback }])
    setStage(STAGES.FEEDBACK)
  }

  async function handleNext() {
    if (questionIndex + 1 >= totalQuestions) {
      await finishInterview(answers)
      return
    }
    setQuestionIndex((i) => i + 1)
    setAnswer('')
    setSubmittedAnswer('')
    setCurrentFeedback(null)
    setStage(STAGES.ASKING)
  }

  async function finishInterview(finalAnswers) {
    const results = await getInterviewResults(finalAnswers)
    sessionStorage.setItem('interviewResults', JSON.stringify(results))
    navigate('/interview/results')
  }

  async function handleEndInterview() {
    setShowEndConfirm(false)
    await finishInterview(answers)
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:px-8">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#00F0FF]" />
          <span className="font-heading text-xs font-semibold tracking-wider text-white">
            INTERVUE AI
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="hidden text-xs text-secondary sm:block" data-testid="question-counter">
            Question {questionIndex + 1}/{totalQuestions}
          </span>
          <InterviewTimer durationSeconds={config.durationMinutes * 60} running />
          <Button
            variant="secondary"
            className="px-4 py-2 text-xs"
            onClick={() => setShowEndConfirm(true)}
            data-testid="end-interview-button"
          >
            End Interview
          </Button>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <aside className="border-b border-white/10 p-5 md:w-72 md:border-r md:border-b-0 md:p-7">
          <h2 className="mb-4 text-xs tracking-wider text-secondary uppercase">
            Interview Info
          </h2>
          <div className="mb-6 space-y-1.5">
            <div className="text-sm font-medium text-white">{config.role}</div>
            <div className="text-sm text-secondary">{config.interviewType}</div>
            <div className="text-sm text-secondary">{config.difficulty}</div>
          </div>

          <div className="mb-2 text-xs tracking-wider text-secondary uppercase">Progress</div>
          <ProgressBar value={progressPercent} color="accent" height={8} />
          <div className="mt-2 font-mono text-xs text-secondary">{progressPercent}%</div>
        </aside>

        <main className="flex flex-1 flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 md:p-8">
            <div className="mb-6">
              <QuestionProgress current={questionIndex + 1} total={totalQuestions} />
            </div>

            <InterviewMessage speaker="ai">{currentQuestion}</InterviewMessage>

            {submittedAnswer && <InterviewMessage speaker="user">{submittedAnswer}</InterviewMessage>}

            <AnimatePresence mode="wait">
              {stage === STAGES.ANALYZING && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-3 py-2 text-sm text-secondary"
                  data-testid="analyzing-indicator"
                >
                  <span className="flex gap-1">
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.span
                      className="h-1.5 w-1.5 rounded-full bg-[#00F0FF]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                    />
                  </span>
                  Analyzing response...
                </motion.div>
              )}

              {stage === STAGES.FEEDBACK && currentFeedback && (
                <motion.div
                  key="feedback"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-2"
                >
                  <InterviewFeedback feedback={currentFeedback} />
                  <div className="mt-5 flex justify-end">
                    <Button variant="primary" onClick={handleNext} data-testid="next-question-button">
                      {questionIndex + 1 >= totalQuestions ? 'Finish Interview' : 'Next Question'}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {stage === STAGES.ASKING && (
            <div className="border-t border-white/10 p-5 md:p-8">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer..."
                rows={4}
                data-testid="answer-input"
                className="w-full rounded-md border border-white/20 bg-bg px-4 py-3 text-sm text-white placeholder-secondary focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] focus:outline-none"
              />
              <div className="mt-4 flex justify-end">
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!answer.trim()}
                  className={!answer.trim() ? 'cursor-not-allowed opacity-40' : ''}
                  data-testid="submit-answer-button"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm rounded-lg border border-white/10 bg-[#0A101D] p-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-base font-semibold text-white">
                  End Interview?
                </h3>
                <button onClick={() => setShowEndConfirm(false)} className="text-secondary hover:text-white">
                  <X size={16} />
                </button>
              </div>
              <p className="mb-6 text-sm text-secondary">
                Your progress will be evaluated and you'll be taken to your results. This
                can't be undone.
              </p>
              <div className="flex justify-end gap-3">
                <Button variant="secondary" onClick={() => setShowEndConfirm(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleEndInterview}
                  data-testid="confirm-end-interview-button"
                >
                  End Interview
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
