import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  LayoutDashboard,
  MessageSquareText,
  FileSearch,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import { useState } from 'react'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Mock Interview', to: '/interview/setup', icon: MessageSquareText },
  { label: 'Resume Analyzer', to: '/resume', icon: FileSearch },
]

function SidebarContent({ pathname, onNavigate }) {
  return (
    <div className="flex h-full flex-col p-5">
      <Link to="/" className="mb-8 flex items-center gap-2" onClick={onNavigate}>
        <Sparkles size={18} className="text-[#00F0FF]" />
        <span className="font-heading text-sm font-semibold tracking-wider text-white">
          INTERVUE AI
        </span>
      </Link>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
          const isActive = pathname === to || (to === '/interview/setup' && pathname.startsWith('/interview'))
          return (
            <Link
              key={to}
              to={to}
              onClick={onNavigate}
              data-testid={`${label.toLowerCase().replace(/\s+/g, '-')}-navigation-link`}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'bg-[#00F0FF]/10 text-[#00F0FF]'
                  : 'text-secondary hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm text-secondary hover:bg-white/5 hover:text-white"
          data-testid="settings-link"
        >
          <Settings size={16} />
          Settings
        </button>
      </div>
    </div>
  )
}

export default function Sidebar() {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0A101D] md:block">
        <SidebarContent pathname={pathname} />
      </div>

      <div className="flex items-center justify-between border-b border-white/10 bg-[#0A101D] px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[#00F0FF]" />
          <span className="font-heading text-xs font-semibold tracking-wider text-white">
            INTERVUE AI
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          data-testid="mobile-sidebar-toggle"
          className="text-white"
        >
          <Menu size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-64 bg-[#0A101D]"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="flex justify-end p-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="text-secondary hover:text-white"
                  data-testid="mobile-sidebar-close"
                >
                  <X size={18} />
                </button>
              </div>
              <SidebarContent pathname={pathname} onNavigate={() => setIsOpen(false)} />
            </motion.div>
            <div className="flex-1 bg-black/60" onClick={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
