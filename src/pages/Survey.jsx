import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { saveUserProfile } from '../firebase/firestore'

export default function Survey() {
  const navigate = useNavigate()
  const { currentUser, setUserProfile } = useAuth()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    age: 25,
    profession: '',
    income: '',
    goals: [],
    commitments: []
  })

  const professions = ['Student', 'Engineer', 'Doctor', 'Business Owner', 'Freelancer', 'Other']
  const incomeRanges = ['< ₹5L', '₹5-10L', '₹10-20L', '₹20-50L', '> ₹50L']
  const goalOptions = ['Buy Home', 'Retirement', 'Education', 'Investment', 'Travel']
  const commitmentOptions = ['Home Loan', 'Car Loan', 'Rent', 'Education Loan', 'None']

  const toggleSelection = (array, item) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item)
    }
    return [...array, item]
  }

  const handleNext = async () => {
    if (step < 5) {
      setStep(step + 1)
    } else {
      // Save profile to Firestore
      if (currentUser) {
        setLoading(true)
        const result = await saveUserProfile(currentUser.uid, profile)
        
        if (result.success) {
          // Update the userProfile in context
          setUserProfile({ ...profile, profileComplete: true })
          navigate('/home')
        } else {
          alert('Failed to save profile. Please try again.')
        }
        setLoading(false)
      } else {
        navigate('/home')
      }
    }
  }

  const handleSkip = async () => {
    // Mark profile as complete even if skipped
    if (currentUser) {
      setLoading(true)
      await saveUserProfile(currentUser.uid, { profileComplete: true })
      setUserProfile({ profileComplete: true })
      setLoading(false)
    }
    navigate('/home')
  }

  const progress = (step / 5) * 100

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header with Progress */}
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-primary tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.1em' }}>
              ImpactFlow
            </h1>
            <button onClick={handleSkip} className="text-sm font-semibold text-secondary hover:text-primary">
              Skip
            </button>
          </div>
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      {/* Survey Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Step 1: Age */}
          {step === 1 && (
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-primary mb-2">How old are you?</h2>
              <p className="text-secondary mb-8">This helps us personalize your news impact</p>
              
              <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                <div className="text-center mb-6">
                  <span className="text-6xl font-bold text-primary">{profile.age}</span>
                  <span className="text-2xl text-secondary ml-2">years</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="65"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-secondary mt-2">
                  <span>18</span>
                  <span>65</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profession */}
          {step === 2 && (
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-primary mb-2">What do you do?</h2>
              <p className="text-secondary mb-8">Select your profession</p>
              
              <div className="grid grid-cols-2 gap-3">
                {professions.map(prof => (
                  <button
                    key={prof}
                    onClick={() => setProfile({ ...profile, profession: prof })}
                    className={`p-4 rounded-lg border-2 font-semibold transition-smooth ${
                      profile.profession === prof
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 text-secondary hover:border-gray-400'
                    }`}
                  >
                    {prof}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Income */}
          {step === 3 && (
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-primary mb-2">Annual Income</h2>
              <p className="text-secondary mb-8">This stays private and helps personalize impact</p>
              
              <div className="space-y-3">
                {incomeRanges.map(range => (
                  <button
                    key={range}
                    onClick={() => setProfile({ ...profile, income: range })}
                    className={`w-full p-4 rounded-lg border-2 font-semibold text-left transition-smooth ${
                      profile.income === range
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 text-secondary hover:border-gray-400'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goals */}
          {step === 4 && (
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-primary mb-2">Financial Goals</h2>
              <p className="text-secondary mb-8">Select all that apply</p>
              
              <div className="grid grid-cols-2 gap-3">
                {goalOptions.map(goal => (
                  <button
                    key={goal}
                    onClick={() => setProfile({ ...profile, goals: toggleSelection(profile.goals, goal) })}
                    className={`p-4 rounded-lg border-2 font-semibold transition-smooth ${
                      profile.goals.includes(goal)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 text-secondary hover:border-gray-400'
                    }`}
                  >
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Commitments */}
          {step === 5 && (
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-primary mb-2">Current Commitments</h2>
              <p className="text-secondary mb-8">Select all that apply</p>
              
              <div className="grid grid-cols-2 gap-3">
                {commitmentOptions.map(commitment => (
                  <button
                    key={commitment}
                    onClick={() => setProfile({ ...profile, commitments: toggleSelection(profile.commitments, commitment) })}
                    className={`p-4 rounded-lg border-2 font-semibold transition-smooth ${
                      profile.commitments.includes(commitment)
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-gray-300 text-secondary hover:border-gray-400'
                    }`}
                  >
                    {commitment}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full mt-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-light transition-smooth btn-press shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : (step === 5 ? 'Complete' : 'Continue')}
            <ChevronRight size={24} />
          </button>
        </div>
      </main>
    </div>
  )
}
