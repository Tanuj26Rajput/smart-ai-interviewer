import { MOCK_RESUME_ANALYSIS } from '../data/resumeData'

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Later: POST /api/resume/analyze (multipart file upload)
export async function analyzeResume(file) {
  await wait(1400)
  return {
    fileName: file?.name || 'resume.pdf',
    ...MOCK_RESUME_ANALYSIS,
  }
}
