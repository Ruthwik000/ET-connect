import { NavLink } from 'react-router-dom'
import { Home, Compass, MessageCircle, User } from 'lucide-react'

export default function BottomNav() {
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/explore', icon: Compass, label: 'Explore' },
    { path: '/ask-ai', icon: MessageCircle, label: 'Ask AI' },
    { path: '/profile', icon: User, label: 'Profile' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div className="max-w-3xl mx-auto px-2 h-16 flex items-center justify-around">
        {navItems.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center flex-1 h-full transition-smooth ${
                isActive ? 'text-primary' : 'text-secondary'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-medium'}`}>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
