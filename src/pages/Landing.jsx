import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import { Target, MessageSquareText, BarChart3 } from 'lucide-react'

const FEATURES = [
  {
    icon: MessageSquareText,
    title: 'Realistic Mock Interviews',
    description:
      'Practice technical and behavioral interviews with an AI interviewer that adapts to your role.',
  },
  {
    icon: BarChart3,
    title: 'Instant Feedback',
    description:
      'Get scored on clarity, technical depth, and confidence right after every answer you give.',
  },
  {
    icon: Target,
    title: 'Resume Readiness',
    description:
      'Upload your resume for a quick ATS score and see exactly what to improve before you apply.',
  },
]

const STEPS = [
  { step: '01', title: 'Choose your interview', description: 'Pick a role, type, and difficulty.' },
  { step: '02', title: 'Practice live', description: 'Answer realistic questions in real time.' },
  { step: '03', title: 'Get feedback', description: 'See instant AI analysis after every answer.' },
  { step: '04', title: 'Improve', description: 'Track your readiness and focus areas over time.' },
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/17483871/pexels-photo-17483871.png"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050814]/60 via-[#050814]/85 to-[#050814]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 py-28 text-center md:py-36">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/5 px-4 py-1.5 text-xs tracking-widest text-[#00F0FF] uppercase"
          >
            AI-Powered Interview Preparation
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl leading-tight font-bold text-white uppercase sm:text-5xl md:text-6xl"
          >
            Practice like
            <br />
            the interview
            <br />
            starts tomorrow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base text-secondary"
          >
            Practice realistic interviews, get instant AI feedback, and understand exactly
            what you need to improve.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              as={Link}
              to="/interview/setup"
              variant="primary"
              className="w-full sm:w-auto"
              data-testid="start-mock-interview-button"
            >
              Start Mock Interview
            </Button>
            <Button
              as={Link}
              to="/dashboard"
              variant="secondary"
              className="w-full sm:w-auto"
              data-testid="view-dashboard-button"
            >
              View Dashboard
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="mb-2 font-heading text-xs tracking-widest text-secondary uppercase">
          Features
        </h2>
        <h3 className="mb-12 font-heading text-2xl font-semibold text-white md:text-3xl">
          Everything you need to walk in prepared
        </h3>

        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              className="rounded-lg border border-white/10 bg-[#0A101D] p-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <Icon size={20} className="mb-4 text-[#00F0FF]" />
              <h4 className="mb-2 font-heading text-base font-semibold text-white">{title}</h4>
              <p className="text-sm leading-relaxed text-secondary">{description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="border-t border-white/10 bg-[#0A101D]/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="mb-2 font-heading text-xs tracking-widest text-secondary uppercase">
            How it works
          </h2>
          <h3 className="mb-12 font-heading text-2xl font-semibold text-white md:text-3xl">
            Choose interview → Practice → Get feedback → Improve
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {STEPS.map(({ step, title, description }) => (
              <div key={step}>
                <div className="mb-3 font-mono text-sm text-[#00F0FF]">{step}</div>
                <h4 className="mb-1.5 font-heading text-sm font-semibold text-white">{title}</h4>
                <p className="text-sm text-secondary">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h3 className="mb-6 font-heading text-2xl font-semibold text-white md:text-3xl">
          Ready to practice?
        </h3>
        <Button as={Link} to="/interview/setup" variant="primary" data-testid="cta-start-practicing-button">
          Start Practicing
        </Button>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-secondary">
        IntervueAI — Prepare. Practice. Improve.
      </footer>
    </div>
  )
}
