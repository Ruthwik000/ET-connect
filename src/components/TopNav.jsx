import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopNav() {
  const navigate = useNavigate()
  const hasHighImpactNews = true

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">ET Connect</h1>
        <button 
          onClick={() => navigate('/notifications')}
          className="relative p-2 hover:bg-gray-100 rounded-xl transition-smooth btn-press"
        >
          <Bell size={24} className="text-primary" />
          {hasHighImpactNews && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-negative rounded-full animate-pulse" />
          )}
        </button>
      </div>
    </nav>
  )
}
