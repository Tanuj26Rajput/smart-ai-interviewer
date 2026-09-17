import { useEffect, useRef, useState } from 'react'

function formatTime(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export default function InterviewTimer({ durationSeconds, running = true, onExpire }) {
  const [remaining, setRemaining] = useState(durationSeconds)
  const expiredRef = useRef(false)

  useEffect(() => {
    setRemaining(durationSeconds)
    expiredRef.current = false
  }, [durationSeconds])

  useEffect(() => {
    if (!running) return undefined
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          if (!expiredRef.current) {
            expiredRef.current = true
            onExpire?.()
          }
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [running, onExpire])

  const isLow = remaining <= 60

  return (
    <span
      className={`font-mono text-sm tabular-nums ${isLow ? 'text-[#FF0055]' : 'text-secondary'}`}
      data-testid="interview-timer"
    >
      {formatTime(remaining)}
    </span>
  )
}
