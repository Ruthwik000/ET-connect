import { useNavigate } from 'react-router-dom'
import { TrendingUp, Shield, Zap } from 'lucide-react'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-4 border-b border-gray-200" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h1 className="text-2xl font-bold text-primary tracking-widest uppercase" style={{ fontFamily: 'Georgia, serif', letterSpacing: '0.15em' }}>
          ImpactFlow
        </h1>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
            News you understand,<br />not just consume.
          </h2>
          
          <p className="text-lg text-secondary mb-8 max-w-xl mx-auto">
            Transform headlines into personal impact. Make informed decisions with AI-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary-light transition-smooth btn-press shadow-lg"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-lg font-semibold text-lg hover:bg-gray-50 transition-smooth btn-press"
            >
              Sign In
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <TrendingUp size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Personal Impact</h3>
              <p className="text-sm text-secondary">See how news affects your finances and life decisions</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Zap size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">AI Insights</h3>
              <p className="text-sm text-secondary">Get personalized recommendations and analysis</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} className="text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">Trust First</h3>
              <p className="text-sm text-secondary">Transparent, data-driven impact scores</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-4 border-t border-gray-200 text-center">
        <p className="text-sm text-secondary">© 2024 ImpactFlow. All rights reserved.</p>
      </footer>
    </div>
  )
}
