import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Explore from './pages/Explore'
import AskAI from './pages/AskAI'
import Profile from './pages/Profile'
import PersonalImpact from './pages/PersonalImpact'
import FutureScenarios from './pages/FutureScenarios'
import ForYou from './pages/ForYou'
import Notifications from './pages/Notifications'
import SavedNews from './pages/SavedNews'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="explore" element={<Explore />} />
          <Route path="ask-ai" element={<AskAI />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/personal-impact" element={<PersonalImpact />} />
        <Route path="/future-scenarios" element={<FutureScenarios />} />
        <Route path="/for-you" element={<ForYou />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/saved-news" element={<SavedNews />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
