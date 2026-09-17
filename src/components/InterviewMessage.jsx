import { motion } from 'framer-motion'
import { Bot, User } from 'lucide-react'

export default function InterviewMessage({ speaker, children }) {
  const isAI = speaker === 'ai'

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mb-2 flex items-center gap-2">
        {isAI ? (
          <Bot size={14} className="text-[#00F0FF]" />
        ) : (
          <User size={14} className="text-[#00FF66]" />
        )}
        <span className="text-xs tracking-wider text-secondary uppercase">
          {isAI ? 'AI Interviewer' : 'You'}
        </span>
      </div>
      <div
        className={`rounded-lg border p-4 text-sm leading-relaxed ${
          isAI
            ? 'border-[#00F0FF]/20 bg-[#00F0FF]/5 text-white'
            : 'border-white/10 bg-white/5 text-white'
        }`}
      >
        {children}
      </div>
    </motion.div>
  )
}
