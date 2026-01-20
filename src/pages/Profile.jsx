import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, ChevronRight, Settings, Bell, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { saveUserProfile } from '../firebase/firestore'
import { logOut } from '../firebase/auth'

export default function Profile() {
  const navigate = useNavigate()
  const { currentUser, userProfile, setUserProfile } = useAuth()
  const [profile, setProfile] = useState({
    age: 25,
    profession: '',
    income: '',
    goals: [],
    commitments: []
  })
  const [loading, setLoading] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load profile data from context
  useEffect(() => {
    if (userProfile) {
      setProfile({
        age: userProfile.age || 25,
        profession: userProfile.profession || '',
        income: userProfile.income || '',
        goals: userProfile.goals || [],
        commitments: userProfile.commitments || []
      })
    }
  }, [userProfile])

  const professions = ['Student', 'Engineer', 'Doctor', 'Business Owner', 'Freelancer', 'Other']
  const incomeRanges = ['< ₹5L', '₹5-10L', '₹10-20L', '₹20-50L', '> ₹50L']
  const goalOptions = ['Buy Home', 'Retirement', 'Education', 'Investment', 'Travel']
  const commitmentOptions = ['Home Loan', 'Car Loan', 'Rent', 'Education Loan', 'None']

  const toggleItem = (array, item) => {
    return array.includes(item) ? array.filter(i => i !== item) : [...array, item]
  }

  const handleSaveProfile = async () => {
    if (!currentUser) return

    setLoading(true)
    setSaveSuccess(false)

    const result = await saveUserProfile(currentUser.uid, profile)

    if (result.success) {
      setUserProfile({ ...profile, profileComplete: true })
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } else {
      alert('Failed to save profile. Please try again.')
    }

    setLoading(false)
  }

  const handleLogout = async () => {
    const result = await logOut()
    if (result.success) {
      navigate('/')
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-8 fade-in">
        <h2 className="text-3xl font-bold text-primary mb-2">Your Profile</h2>
        <p className="text-base text-secondary">Personalize your news impact experience</p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-200 mb-6 shadow-sm overflow-hidden">
        <button
          onClick={() => navigate('/saved-news')}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-smooth border-b border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bookmark size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-primary">Saved News</p>
              <p className="text-xs text-secondary">View your bookmarked articles</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>

        <button
          onClick={() => navigate('/notifications')}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-smooth border-b border-gray-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell size={20} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-primary">Notifications</p>
              <p className="text-xs text-secondary">Manage your alerts</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>

        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-smooth"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-negative/10 rounded-full flex items-center justify-center">
              <LogOut size={20} className="text-negative" />
            </div>
            <div className="text-left">
              <p className="text-base font-bold text-negative">Logout</p>
              <p className="text-xs text-secondary">Sign out of your account</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-5 mb-6">
          <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-1">Logged in as</p>
          <p className="text-base font-bold text-primary">{currentUser.email}</p>
          {currentUser.displayName && (
            <p className="text-sm text-secondary mt-1">{currentUser.displayName}</p>
          )}
        </div>
      )}

      {/* Profile Information */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-primary mb-4">Profile Information</h3>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm card-hover">
        <label className="block text-sm font-bold text-primary mb-4 uppercase tracking-wide">Age</label>
        <input
          type="range"
          min="18"
          max="65"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-sm text-secondary mt-3">
          <span>18</span>
          <span className="font-bold text-lg text-primary">{profile.age} years</span>
          <span>65</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm card-hover">
        <label className="block text-sm font-bold text-primary mb-4 uppercase tracking-wide">Profession</label>
        <div className="flex flex-wrap gap-3">
          {professions.map(prof => (
            <button
              key={prof}
              onClick={() => setProfile({ ...profile, profession: prof })}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-smooth btn-press ${
                profile.profession === prof
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
            >
              {prof}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm card-hover">
        <label className="block text-sm font-bold text-primary mb-4 uppercase tracking-wide">Annual Income</label>
        <div className="flex flex-wrap gap-3">
          {incomeRanges.map(range => (
            <button
              key={range}
              onClick={() => setProfile({ ...profile, income: range })}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-smooth btn-press ${
                profile.income === range
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm card-hover">
        <label className="block text-sm font-bold text-primary mb-4 uppercase tracking-wide">Financial Goals</label>
        <div className="flex flex-wrap gap-3">
          {goalOptions.map(goal => (
            <button
              key={goal}
              onClick={() => setProfile({ ...profile, goals: toggleItem(profile.goals, goal) })}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-smooth btn-press ${
                profile.goals.includes(goal)
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm card-hover">
        <label className="block text-sm font-bold text-primary mb-4 uppercase tracking-wide">Current Commitments</label>
        <div className="flex flex-wrap gap-3">
          {commitmentOptions.map(commitment => (
            <button
              key={commitment}
              onClick={() => setProfile({ ...profile, commitments: toggleItem(profile.commitments, commitment) })}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-smooth btn-press ${
                profile.commitments.includes(commitment)
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-gray-100 text-secondary hover:bg-gray-200'
              }`}
            >
              {commitment}
            </button>
          ))}
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-5">
          <p className="text-sm font-semibold text-green-700">✓ Profile saved successfully!</p>
        </div>
      )}

      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl border border-primary/20 p-5 mb-6">
        <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">🔒 Privacy Notice</p>
        <p className="text-sm text-primary leading-relaxed">Your data is securely stored and only used to personalize your news experience.</p>
      </div>

      <button 
        onClick={handleSaveProfile}
        disabled={loading}
        className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-primary-light transition-smooth btn-press shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Profile'}
      </button>
    </div>
  )
}
