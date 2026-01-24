import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, AlertCircle, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getUserNotifications, markNotificationAsRead, markAllNotificationsAsRead, saveNotification } from '../firebase/firestore'
import { api } from '../utils/api'

export default function Notifications() {
  const navigate = useNavigate()
  const { currentUser, userProfile } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  // Load notifications on mount
  useEffect(() => {
    loadNotifications()
  }, [currentUser])

  const loadNotifications = async () => {
    if (!currentUser) {
      setLoading(false)
      return
    }
    
    const result = await getUserNotifications(currentUser.uid)
    if (result.success) {
      setNotifications(result.data)
    }
    setLoading(false)
  }

  // Generate daily notifications automatically
  useEffect(() => {
    const generateDailyNotifications = async () => {
      // Wait for loading to complete first
      if (loading || !currentUser || !userProfile) return
      
      // Check if profile has required fields
      if (!userProfile.age || !userProfile.goals || !userProfile.interests) {
        console.log('Missing profile data, skipping notification generation')
        return
      }
      
      // Check if we already generated notifications today
      const today = new Date().toDateString()
      const lastGenerated = localStorage.getItem(`lastNotificationGen_${currentUser.uid}`)
      
      // If already generated today, don't generate again
      if (lastGenerated === today) return
      
      // Check if there are any notifications from today
      const todayNotifs = notifications.filter(n => 
        new Date(n.createdAt).toDateString() === today
      )
      
      // If we have notifications from today, don't generate
      if (todayNotifs.length > 0) return
      
      try {
        setGenerating(true)
        
        // Convert goals array to string if needed
        const goalsString = Array.isArray(userProfile.goals) 
          ? userProfile.goals.join(', ') 
          : userProfile.goals
        
        const interests = userProfile.interests || ['technology', 'business', 'finance']
        
        console.log('Generating notifications for user:', currentUser.uid)
        
        const data = await api.generateNotifications({
          age: userProfile.age,
          goals: goalsString,
          interests: interests,
          k: 3
        })
        
        console.log('Generated notifications:', data.notifications.length)
        
        // Save notifications to Firestore
        for (const notification of data.notifications) {
          await saveNotification(currentUser.uid, notification)
        }
        
        // Mark as generated today
        localStorage.setItem(`lastNotificationGen_${currentUser.uid}`, today)
        
        // Reload notifications
        await loadNotifications()
      } catch (error) {
        console.error('Error generating notifications:', error)
        // Check if it's a network error
        if (error.message.includes('fetch') || error.message.includes('Failed')) {
          console.error('Backend might not be running. Please start the backend server.')
        }
      } finally {
        setGenerating(false)
      }
    }
    
    // Only run after initial load is complete
    if (!loading) {
      generateDailyNotifications()
    }
  }, [loading, currentUser, userProfile, notifications])

  const handleNotificationClick = async (notification) => {
    // Mark as read
    if (!notification.read) {
      await markNotificationAsRead(notification.id)
      setNotifications(notifications.map(n => 
        n.id === notification.id ? { ...n, read: true } : n
      ))
    }
    
    // Navigate to ask-ai with the notification data
    navigate('/ask-ai', { 
      state: { 
        newsData: {
          id: notification.id,
          headline: notification.headline,
          summary: notification.summary,
          source: notification.source,
          image: notification.image,
          category: notification.interest,
          impactScore: notification.impact_score,
          impactLevel: notification.impact_level
        }
      } 
    })
  }

  const handleMarkAllRead = async () => {
    await markAllNotificationsAsRead(currentUser.uid)
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const getIcon = (impactLevel) => {
    if (impactLevel === 'High') return AlertCircle
    if (impactLevel === 'Medium') return TrendingUp
    return Info
  }

  const getIconColor = (impactLevel) => {
    if (impactLevel === 'High') return 'text-negative'
    if (impactLevel === 'Medium') return 'text-warning'
    return 'text-primary'
  }

  const getBgColor = (impactLevel) => {
    if (impactLevel === 'High') return 'bg-negative/10'
    if (impactLevel === 'Medium') return 'bg-warning/10'
    return 'bg-primary/10'
  }

  const formatTime = (timestamp) => {
    const now = new Date()
    const created = new Date(timestamp)
    const diffMs = now - created
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins} minutes ago`
    if (diffHours < 24) return `${diffHours} hours ago`
    if (diffDays === 1) return '1 day ago'
    return `${diffDays} days ago`
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Separate today and earlier notifications
  const today = new Date().toDateString()
  const todayNotifications = notifications.filter(n => 
    new Date(n.createdAt).toDateString() === today
  )
  const earlierNotifications = notifications.filter(n => 
    new Date(n.createdAt).toDateString() !== today
  )

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">
            {generating ? 'Generating personalized notifications...' : 'Loading notifications...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-primary">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-xs text-secondary">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllRead}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Today Section */}
        {todayNotifications.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wide mb-3">Today</h2>
            <div className="space-y-3">
              {todayNotifications.map((notification) => {
                const Icon = getIcon(notification.impact_level)
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={`bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-smooth ${
                      !notification.read ? 'border-l-4 border-l-primary' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 ${getBgColor(notification.impact_level)} rounded-full flex items-center justify-center`}>
                        <Icon size={20} className={getIconColor(notification.impact_level)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-sm font-bold text-primary pr-2">{notification.impact_level} Impact Alert</h3>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-negative rounded-full flex-shrink-0"></div>
                          )}
                        </div>
                        <p className="text-sm text-primary font-semibold mb-2 leading-relaxed">
                          {notification.headline}
                        </p>
                        <p className="text-xs text-secondary mb-2">
                          {notification.source} • {notification.interest}
                        </p>
                        <p className="text-xs text-secondary">{formatTime(notification.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Earlier Section */}
        {earlierNotifications.length > 0 && (
          <div>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-wide mb-3">Earlier</h2>
            <div className="space-y-3">
              {earlierNotifications.map((notification) => {
                const Icon = getIcon(notification.impact_level)
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-smooth"
                  >
                    <div className="flex gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 ${getBgColor(notification.impact_level)} rounded-full flex items-center justify-center`}>
                        <Icon size={20} className={getIconColor(notification.impact_level)} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-primary mb-1">{notification.impact_level} Impact Alert</h3>
                        <p className="text-sm text-primary font-semibold mb-2 leading-relaxed">
                          {notification.headline}
                        </p>
                        <p className="text-xs text-secondary mb-2">
                          {notification.source} • {notification.interest}
                        </p>
                        <p className="text-xs text-secondary">{formatTime(notification.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Empty State (if no notifications) */}
        {!generating && notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info size={32} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">No notifications yet</h3>
            <p className="text-sm text-secondary mb-4">
              Notifications are generated automatically once per day
            </p>
            <p className="text-xs text-secondary">
              Make sure the backend server is running at {import.meta.env.VITE_API_URL || 'http://localhost:8000'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
