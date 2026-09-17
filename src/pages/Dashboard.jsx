import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gauge, ListChecks, TrendingUp, ArrowRight } from 'lucide-react'
import AppLayout from '../components/AppLayout'
import StatCard from '../components/StatCard'
import ProgressBar from '../components/ProgressBar'
import Button from '../components/Button'
import { STATS, RECENT_INTERVIEWS, FOCUS_AREAS } from '../data/dashboardData'

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="mb-1 font-heading text-2xl font-semibold text-white md:text-3xl">
          Welcome back
        </h1>
        <p className="text-secondary">Ready for your next interview?</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Interview Readiness" value={STATS.readiness} suffix="%" icon={Gauge} />
        <StatCard label="Mock Interviews" value={STATS.interviewsCompleted} icon={ListChecks} />
        <StatCard label="Avg Score" value={STATS.avgScore} suffix="%" icon={TrendingUp} />
      </div>

      <motion.div
        className="mb-8 rounded-lg border border-white/10 bg-[#0A101D] p-6 md:p-8"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="mb-2 font-heading text-lg font-semibold text-white">
              AI Mock Interview
            </h2>
            <p className="max-w-md text-sm text-secondary">
              Practice a realistic interview based on your target role.
            </p>
          </div>
          <Button as={Link} to="/interview/setup" variant="primary" data-testid="start-interview-button">
            Start Interview
          </Button>
        </div>
      </motion.div>

      <div className="mb-8">
        <h2 className="mb-4 font-heading text-sm font-semibold tracking-wider text-white uppercase">
          Recent Interview
        </h2>
        <div className="space-y-3">
          {RECENT_INTERVIEWS.map((interview) => (
            <div
              key={interview.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0A101D] p-4"
            >
              <div>
                <div className="text-sm font-medium text-white">{interview.role}</div>
                <div className="text-xs text-secondary">{interview.type}</div>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-sm text-[#00F0FF]">{interview.score}%</span>
                <span className="hidden text-xs text-secondary sm:block">{interview.when}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-sm font-semibold tracking-wider text-white uppercase">
            Your Focus
          </h2>
          <Link
            to="/interview/setup"
            className="flex items-center gap-1 text-xs text-secondary hover:text-[#00F0FF]"
          >
            Practice now <ArrowRight size={12} />
          </Link>
        </div>
        <div className="space-y-4 rounded-lg border border-white/10 bg-[#0A101D] p-6">
          {FOCUS_AREAS.map((area) => (
            <ProgressBar key={area.label} label={area.label} value={area.score} showLabel />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
