import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PublicRoute({ children }) {
  const { currentUser, userProfile } = useAuth()

  // If user is authenticated, redirect to appropriate page
  if (currentUser) {
    // If profile is complete, go to home
    if (userProfile && userProfile.profileComplete) {
      return <Navigate to="/home" replace />
    }
    // If profile is not complete, go to survey
    return <Navigate to="/survey" replace />
  }

  // Not authenticated, show the public page
  return children
}
