import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function ForYou() {
  const navigate = useNavigate()

  const handleViewImpact = (id) => {
    navigate('/ask-ai', { state: { newsId: id } })
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <h1 className="text-xl font-bold text-primary">Recommended For You</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <p className="text-sm text-secondary mb-6">Personalized news based on your interests and profile</p>

        <div className="space-y-4">
          {/* Global Markets Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover">
            <div className="bg-black p-6 relative overflow-hidden">
              <div className="text-center">
                <p className="text-red-500 text-sm font-bold mb-2 tracking-widest">GLOBAL</p>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-red-500 text-5xl font-bold">88:</span>
                  <span className="text-green-400 text-5xl font-bold">23:84</span>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">Global Markets</p>
                <p className="text-xs text-secondary">4 mins ago</p>
              </div>

              <h4 className="text-lg font-bold text-primary mb-3 leading-snug">
                Fed Signals Potential Rate Hike Amid Inflation Concerns
              </h4>

              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Central banks are bracing for a shift in monetary policy as inflation remains sticky across major economies...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-warning">Medium Impact</span>
                </div>
                <button 
                  onClick={() => handleViewImpact('global-1')}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>

          {/* Tech Sector Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover">
            <div className="relative h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
                alt="Tech sector"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">Technology</p>
                <p className="text-xs text-secondary">1 hour ago</p>
              </div>

              <h4 className="text-lg font-bold text-primary mb-3 leading-snug">
                AI Startups Raise Record $12B in Q1 Funding
              </h4>

              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Venture capital firms are doubling down on artificial intelligence companies as the sector shows unprecedented growth...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-positive">Low Impact</span>
                </div>
                <button 
                  onClick={() => handleViewImpact('tech-1')}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>

          {/* Real Estate Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover">
            <div className="relative h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Real estate"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">Real Estate</p>
                <p className="text-xs text-secondary">3 hours ago</p>
              </div>

              <h4 className="text-lg font-bold text-primary mb-3 leading-snug">
                Property Prices in Metro Cities Rise 8% YoY
              </h4>

              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Residential real estate in major Indian cities continues its upward trajectory driven by strong demand and limited supply...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-negative">High Impact</span>
                </div>
                <button 
                  onClick={() => handleViewImpact('realestate-1')}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>

          {/* Crypto Markets Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover">
            <div className="relative h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&q=80"
                alt="Cryptocurrency"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">Cryptocurrency</p>
                <p className="text-xs text-secondary">5 hours ago</p>
              </div>

              <h4 className="text-lg font-bold text-primary mb-3 leading-snug">
                Bitcoin Surges Past $65K on ETF Approval News
              </h4>

              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Major cryptocurrency exchanges report record trading volumes as institutional investors show renewed interest in digital assets...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-warning">Medium Impact</span>
                </div>
                <button 
                  onClick={() => handleViewImpact('crypto-1')}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>

          {/* Healthcare Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover">
            <div className="relative h-40 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80"
                alt="Healthcare"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-primary uppercase tracking-wide">Healthcare</p>
                <p className="text-xs text-secondary">6 hours ago</p>
              </div>

              <h4 className="text-lg font-bold text-primary mb-3 leading-snug">
                New Health Insurance Regulations Announced
              </h4>

              <p className="text-sm text-secondary mb-4 leading-relaxed">
                Government mandates increased coverage limits and reduced waiting periods for pre-existing conditions across all health insurance plans...
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-positive">Low Impact</span>
                </div>
                <button 
                  onClick={() => handleViewImpact('health-1')}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read Full Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
