import { motion } from 'framer-motion'

const COLOR_MAP = {
  accent: '#00F0FF',
  green: '#00FF66',
  warning: '#FFB800',
  error: '#FF0055',
}

function colorForScore(score) {
  if (score >= 75) return COLOR_MAP.green
  if (score >= 50) return COLOR_MAP.accent
  return COLOR_MAP.warning
}

export default function ProgressBar({ value, color, height = 8, showLabel = false, label }) {
  const barColor = color ? COLOR_MAP[color] || color : colorForScore(value)

  return (
    <div className="w-full">
      {(label || showLabel) && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-secondary">{label}</span>
          <span className="font-mono text-white">{value}%</span>
        </div>
      )}
      <div
        className="w-full overflow-hidden rounded-full bg-white/10"
        style={{ height }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: barColor }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
