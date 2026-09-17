import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import ResumeUpload from '../components/ResumeUpload'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import { analyzeResume } from '../services/resumeService'

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState(null)

  async function handleAnalyze() {
    if (!file) return
    setIsAnalyzing(true)
    setAnalysis(null)
    const result = await analyzeResume(file)
    setAnalysis(result)
    setIsAnalyzing(false)
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-2 font-heading text-2xl font-semibold text-white md:text-3xl">
          Resume Analyzer
        </h1>
        <p className="mb-8 text-sm text-secondary">
          Upload your resume and get a quick AI-powered interview readiness analysis.
        </p>

        <ResumeUpload onFileSelected={(f) => { setFile(f); setAnalysis(null) }} selectedFile={file} />

        <Button
          variant="primary"
          className="mt-6 w-full"
          onClick={handleAnalyze}
          disabled={!file || isAnalyzing}
          data-testid="analyze-resume-button"
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
        </Button>

        <AnimatePresence mode="wait">
          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 flex items-center gap-3 text-sm text-secondary"
              data-testid="resume-analyzing-indicator"
            >
              <Sparkles size={16} className="animate-pulse text-[#00F0FF]" />
              Analyzing resume...
            </motion.div>
          )}

          {analysis && !isAnalyzing && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-6"
              data-testid="resume-analysis-results"
            >
              <div className="rounded-lg border border-white/10 bg-[#0A101D] p-6 text-center">
                <div className="mb-1 text-xs tracking-wider text-secondary uppercase">
                  ATS Score
                </div>
                <div className="font-heading text-4xl font-bold text-[#00F0FF]">
                  {analysis.atsScore} <span className="text-lg text-secondary">/ 100</span>
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0A101D] p-6">
                <h2 className="mb-4 text-xs tracking-wider text-secondary uppercase">
                  Skills Detected
                </h2>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#0A101D] p-6">
                <h2 className="mb-4 text-xs tracking-wider text-secondary uppercase">
                  Interview Strength
                </h2>
                <div className="space-y-4">
                  {analysis.strength.map((item) => (
                    <ProgressBar key={item.label} label={item.label} value={item.score} showLabel />
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#00F0FF]/20 bg-[#00F0FF]/5 p-6">
                <h2 className="mb-3 text-xs tracking-wider text-[#00F0FF] uppercase">
                  Recommendations
                </h2>
                <ul className="space-y-2 text-sm text-white">
                  {analysis.recommendations.map((rec) => (
                    <li key={rec}>• {rec}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  )
}
