export const QUESTION_BANK = {
  Technical: [
    'Explain the difference between processes and threads.',
    'How would you design a URL shortener?',
    'What happens when you enter a URL in your browser?',
    'Explain indexing in databases.',
    'What is the difference between horizontal and vertical scaling?',
    'How does garbage collection work in most modern languages?',
    'Explain the concept of an API rate limiter and how you would build one.',
    'What are the trade-offs between SQL and NoSQL databases?',
  ],
  Behavioral: [
    'Tell me about yourself.',
    'Tell me about a challenging project you worked on.',
    'Tell me about a time you made a mistake.',
    'Why should we hire you?',
    'Tell me about a time you disagreed with a teammate.',
    'Describe a time you had to learn something quickly under pressure.',
    'How do you prioritize tasks when everything feels urgent?',
    'Tell me about a time you received difficult feedback.',
  ],
}

QUESTION_BANK.Mixed = [
  QUESTION_BANK.Behavioral[0],
  QUESTION_BANK.Technical[0],
  QUESTION_BANK.Behavioral[1],
  QUESTION_BANK.Technical[1],
  QUESTION_BANK.Behavioral[3],
  QUESTION_BANK.Technical[3],
  QUESTION_BANK.Behavioral[5],
  QUESTION_BANK.Technical[4],
]

export function getQuestions(interviewType, count = 8) {
  const pool = QUESTION_BANK[interviewType] || QUESTION_BANK.Technical
  return pool.slice(0, count)
}

const FEEDBACK_TEMPLATES = [
  {
    clarity: 82,
    technical: 74,
    confidence: 88,
    notes:
      'Good structure and clear explanation. Your technical explanation could include a concrete example.',
  },
  {
    clarity: 76,
    technical: 85,
    confidence: 70,
    notes:
      'Strong technical depth. Try slowing down and framing your answer with a brief summary up front.',
  },
  {
    clarity: 90,
    technical: 68,
    confidence: 80,
    notes:
      'Very clear and confident delivery. Add more specific detail to strengthen the technical substance.',
  },
  {
    clarity: 71,
    technical: 79,
    confidence: 75,
    notes:
      'Solid answer overall. Consider organizing your response with a clear beginning, middle, and end.',
  },
]

export function getMockFeedback(index) {
  return FEEDBACK_TEMPLATES[index % FEEDBACK_TEMPLATES.length]
}
