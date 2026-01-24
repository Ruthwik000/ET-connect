import { useNavigate } from 'react-router-dom'
import { ArrowLeft, TrendingUp, AlertCircle, Info } from 'lucide-react'

export default function Notifications() {
  const navigate = useNavigate()

  const notifications = [
    {
      id: '1',
      type: 'high-impact',
      icon: AlertCircle,
      iconColor: 'text-negative',
      bgColor: 'bg-negative/10',
      title: 'High Impact Alert',
      message: 'RBI increases repo rate by 0.5% - Your EMI may increase by ₹2,500/month',
      time: '2 hours ago',
      read: false
    },
    {
      id: '2',
      type: 'recommendation',
      icon: TrendingUp,
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'New Recommendation',
      message: 'Based on recent policy changes, consider reviewing your investment portfolio',
      time: '5 hours ago',
      read: false
    },
    {
      id: '3',
      type: 'info',
      icon: Info,
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Market Update',
      message: 'Tech sector shows strong growth - 3 new opportunities match your profile',
      time: '1 day ago',
      read: true
    },
    {
      id: '4',
      type: 'high-impact',
      icon: AlertCircle,
      iconColor: 'text-warning',
      bgColor: 'bg-warning/10',
      title: 'Medium Impact Alert',
      message: 'New tax deduction rules announced - You could save ₹15,000 this year',
      time: '1 day ago',
      read: true
    },
    {
      id: '5',
      type: 'info',
      icon: Info,
      iconColor: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Profile Update',
      message: 'Complete your financial goals to get better personalized recommendations',
      time: '2 days ago',
      read: true
    }
  ]

  const unreadCount = notifications.filter(n => !n.read).length

  const handleNotificationClick = (notification) => {
    // Navigate to relevant page based on notification type
    if (notification.type === 'high-impact') {
      navigate('/personal-impact')
    } else if (notification.type === 'recommendation') {
      navigate('/for-you')
    }
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
          <button className="text-sm font-semibold text-primary hover:underline">
            Mark all read
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Today Section */}
        <div className="mb-6">
          <h2 className="text-sm font-bold text-secondary uppercase tracking-wide mb-3">Today</h2>
          <div className="space-y-3">
            {notifications.slice(0, 2).map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className={`bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-smooth ${
                    !notification.read ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon size={20} className={notification.iconColor} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="text-sm font-bold text-primary">{notification.title}</h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-negative rounded-full"></div>
                        )}
                      </div>
                      <p className="text-sm text-secondary mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-secondary">{notification.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Earlier Section */}
        <div>
          <h2 className="text-sm font-bold text-secondary uppercase tracking-wide mb-3">Earlier</h2>
          <div className="space-y-3">
            {notifications.slice(2).map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="bg-white rounded-xl border border-gray-200 p-4 cursor-pointer hover:bg-gray-50 transition-smooth"
                >
                  <div className="flex gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 ${notification.bgColor} rounded-full flex items-center justify-center`}>
                      <Icon size={20} className={notification.iconColor} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-primary mb-1">{notification.title}</h3>
                      <p className="text-sm text-secondary mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <p className="text-xs text-secondary">{notification.time}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info size={32} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">No notifications yet</h3>
            <p className="text-sm text-secondary">
              We'll notify you when there's important news that affects you
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
