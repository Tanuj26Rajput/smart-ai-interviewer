import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScoreCard({ score, label = 'OVERALL SCORE' }) {
  const [displayScore, setDisplayScore] = useState(0)

  useEffect(() => {
    const duration = 1000
    const start = performance.now()

    function tick(now) {
      const progress = Math.min(1, (now - start) / duration)
      setDisplayScore(Math.round(progress * score))
      if (progress < 1) requestAnimationFrame(tick)
    }

    const raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [score])

  return (
    <motion.div
      className="flex flex-col items-center justify-center rounded-lg border border-white/10 bg-[#0A101D] px-10 py-10 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="font-heading text-6xl font-bold text-[#00F0FF]">
        {displayScore}%
      </div>
      <div className="mt-2 text-xs tracking-widest text-secondary uppercase">
        {label}
      </div>
    </motion.div>
  )
}
