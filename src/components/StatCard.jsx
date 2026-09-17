import { motion } from 'framer-motion'

export default function StatCard({ label, value, suffix = '', icon: Icon }) {
  return (
    <motion.div
      className="rounded-lg border border-white/10 bg-[#0A101D] p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs tracking-wider text-secondary uppercase">{label}</span>
        {Icon && <Icon size={16} className="text-[#00F0FF]" />}
      </div>
      <div className="font-heading text-3xl font-semibold text-white">
        {value}
        <span className="text-lg text-secondary">{suffix}</span>
      </div>
    </motion.div>
  )
}
