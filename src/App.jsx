import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Survey from './pages/Survey'
import Home from './pages/Home'
import ExploreFull from './pages/ExploreFull'
import AskAI from './pages/AskAI'
import Profile from './pages/Profile'
import PersonalImpact from './pages/PersonalImpact'
import FutureScenarios from './pages/FutureScenarios'
import ForYou from './pages/ForYou'
import Notifications from './pages/Notifications'
import SavedNews from './pages/SavedNews'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing & Auth Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          {/* Survey Route - Protected */}
          <Route path="/survey" element={
            <ProtectedRoute>
              <Survey />
            </ProtectedRoute>
          } />
          
          {/* Main App Routes with Layout - Protected */}
          <Route element={
            <ProtectedRoute requireProfile={true}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/home" element={<Home />} />
            <Route path="/ask-ai" element={<AskAI />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          
          {/* Full Screen Routes (no layout) - Protected */}
          <Route path="/explore" element={
            <ProtectedRoute requireProfile={true}>
              <ExploreFull />
            </ProtectedRoute>
          } />
          <Route path="/personal-impact" element={
            <ProtectedRoute requireProfile={true}>
              <PersonalImpact />
            </ProtectedRoute>
          } />
          <Route path="/future-scenarios" element={
            <ProtectedRoute requireProfile={true}>
              <FutureScenarios />
            </ProtectedRoute>
          } />
          <Route path="/for-you" element={
            <ProtectedRoute requireProfile={true}>
              <ForYou />
            </ProtectedRoute>
          } />
          <Route path="/notifications" element={
            <ProtectedRoute requireProfile={true}>
              <Notifications />
            </ProtectedRoute>
          } />
          <Route path="/saved-news" element={
            <ProtectedRoute requireProfile={true}>
              <SavedNews />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
