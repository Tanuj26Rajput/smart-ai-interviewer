import { getQuestions, getMockFeedback } from '../data/interviewQuestions'

const DELAY = 900

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Later: POST /api/interview/start
export async function startInterview(config) {
  await wait(300)
  const questions = getQuestions(config.interviewType, config.durationMinutes >= 20 ? 8 : 5)
  return {
    id: `interview_${Date.now()}`,
    config,
    questions,
  }
}

// Later: POST /api/interview/evaluate
export async function evaluateAnswer(answer, questionIndex) {
  await wait(DELAY)
  const feedback = getMockFeedback(questionIndex)
  return {
    clarity: feedback.clarity,
    technical: feedback.technical,
    confidence: feedback.confidence,
    notes: feedback.notes,
  }
}

// Later: GET /api/interview/results/:id
export async function getInterviewResults(sessionAnswers) {
  await wait(600)
  const count = Math.max(sessionAnswers.length, 1)
  const avg = (key) =>
    Math.round(sessionAnswers.reduce((sum, a) => sum + (a.feedback?.[key] || 0), 0) / count)

  const technical = avg('technical') || 79
  const communication = avg('clarity') || 74
  const confidence = avg('confidence') || 76
  const problemSolving = Math.round((technical + communication) / 2) || 79
  const overall = Math.round((technical + communication + confidence + problemSolving) / 4)

  return {
    overall,
    breakdown: [
      { label: 'Technical Knowledge', score: technical },
      { label: 'Communication', score: communication },
      { label: 'Problem Solving', score: problemSolving },
      { label: 'Confidence', score: confidence },
    ],
    wentWell: [
      'Clear communication',
      'Good technical fundamentals',
      'Structured responses',
    ],
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
}
