import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireProfile = false }) {
  const { currentUser, userProfile } = useAuth()
  const location = useLocation()

  // Not authenticated - redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  // Authenticated but profile not complete - redirect to survey
  // (except if already on survey page or if profile not required)
  if (currentUser && userProfile && !userProfile.profileComplete && location.pathname !== '/survey' && requireProfile) {
    return <Navigate to="/survey" replace />
  }

  return children
}
