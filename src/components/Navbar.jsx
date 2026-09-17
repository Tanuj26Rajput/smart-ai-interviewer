import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Button from './Button'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050814]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles size={18} className="text-[#00F0FF]" />
          <span className="font-heading text-sm font-semibold tracking-wider text-white">
            INTERVUE AI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-secondary md:flex">
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-white">
            How it works
          </a>
        </nav>

        <Button as={Link} to="/interview/setup" variant="primary" data-testid="navbar-start-practicing-button">
          Start Practicing
        </Button>
      </div>
    </header>
  )
}
