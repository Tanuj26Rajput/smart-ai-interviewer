import { motion } from 'framer-motion'
import ProgressBar from './ProgressBar'

export default function InterviewFeedback({ feedback }) {
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-[#0A101D] p-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-testid="response-analysis-panel"
    >
      <div className="mb-4 text-xs tracking-wider text-secondary uppercase">
        Response Analysis
      </div>

      <div className="space-y-3">
        <ProgressBar label="Clarity" value={feedback.clarity} showLabel />
        <ProgressBar label="Technical" value={feedback.technical} showLabel />
        <ProgressBar label="Confidence" value={feedback.confidence} showLabel />
      </div>

      <div className="mt-4 border-t border-white/10 pt-4">
        <div className="mb-1 text-xs tracking-wider text-secondary uppercase">
          Quick feedback
        </div>
        <p className="text-sm leading-relaxed text-white">{feedback.notes}</p>
      </div>
    </motion.div>
  )
}
