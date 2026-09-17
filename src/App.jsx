import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import InterviewSetup from './pages/InterviewSetup'
import MockInterview from './pages/MockInterview'
import InterviewResults from './pages/InterviewResults'
import ResumeAnalyzer from './pages/ResumeAnalyzer'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview/setup" element={<InterviewSetup />} />
        <Route path="/interview" element={<MockInterview />} />
        <Route path="/interview/results" element={<InterviewResults />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
      </Routes>
    </BrowserRouter>
  )
}
