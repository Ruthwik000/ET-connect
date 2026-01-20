import { Bell, Menu, Settings, Bookmark, LogOut, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function TopNav() {
  const navigate = useNavigate()
  const hasHighImpactNews = true
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleMenuClick = (path) => {
    navigate(path)
    setIsSidebarOpen(false)
  }

  const handleLogout = () => {
    // Add logout logic here
    setIsSidebarOpen(false)
    navigate('/home')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
          {/* Left - Menu Button */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-smooth btn-press z-10"
          >
            <Menu size={24} className="text-primary" />
          </button>

          {/* Center - ImpactFlow */}
          <h1 className="text-xl sm:text-2xl font-bold text-primary absolute left-1/2 transform -translate-x-1/2 tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}>
            ImpactFlow
          </h1>

          {/* Right - Notification Bell */}
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-xl transition-smooth btn-press z-10"
          >
            <Bell size={24} className="text-primary" />
            {hasHighImpactNews && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-negative rounded-full animate-pulse" />
            )}
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-smooth btn-press"
          >
            <X size={24} className="text-primary" />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="py-4">
          {/* Settings */}
          <button
            onClick={() => handleMenuClick('/profile')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-smooth text-left"
          >
            <Settings size={22} className="text-primary" />
            <span className="text-base font-semibold text-primary">Settings</span>
          </button>

          {/* Saved News */}
          <button
            onClick={() => handleMenuClick('/saved-news')}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-smooth text-left"
          >
            <Bookmark size={22} className="text-primary" />
            <span className="text-base font-semibold text-primary">Saved News</span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-smooth text-left mt-4 border-t border-gray-200"
          >
            <LogOut size={22} className="text-negative" />
            <span className="text-base font-semibold text-negative">Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}
