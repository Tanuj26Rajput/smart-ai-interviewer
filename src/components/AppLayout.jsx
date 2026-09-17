import Sidebar from './Sidebar'
import PageTransition from './PageTransition'

export default function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg md:flex-row flex-col">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden">
        <PageTransition>
          <div className="mx-auto max-w-6xl px-5 py-8 md:px-10 md:py-10">{children}</div>
        </PageTransition>
      </main>
    </div>
  )
}
