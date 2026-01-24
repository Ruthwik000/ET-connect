import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Share2, Zap, TrendingUp, Shield, RefreshCw, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'

export default function PersonalImpact() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userProfile } = useAuth()
  const { newsData } = location.state || {}
  
  const [impactReport, setImpactReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function generateReport() {
      if (!newsData || !userProfile) {
        console.log('Missing data:', { newsData: !!newsData, userProfile: !!userProfile });
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        console.log('Generating impact report for:', newsData.headline)
        console.log('User profile:', {
          age: userProfile.age,
          profession: userProfile.profession,
          goals: userProfile.goals
        })
        
        const report = await api.generateImpactReport(newsData, userProfile)
        console.log('Report received:', report)
        setImpactReport(report)
      } catch (err) {
        console.error('Error generating impact report:', err)
        setError(err.message || 'Failed to generate impact report')
      } finally {
        setLoading(false)
      }
    }

    generateReport()
  }, [newsData, userProfile])

  if (!newsData) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center p-6">
          <AlertCircle size={48} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">No News Selected</h2>
          <p className="text-secondary mb-4">Please select a news article to view its impact report.</p>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-smooth"
          >
            Go to Home
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Generating your personalized impact report...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center p-6">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">Failed to Generate Report</h2>
          <p className="text-secondary mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-light transition-smooth"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const getImpactColor = (level) => {
    if (level === 'High') return 'text-negative'
    if (level === 'Medium') return 'text-warning'
    return 'text-positive'
  }

  const getImpactBg = (level) => {
    if (level === 'High') return 'bg-negative/20 text-negative'
    if (level === 'Medium') return 'bg-warning/20 text-warning'
    return 'bg-positive/20 text-positive'
  }

  const getImpactTypeColor = (type) => {
    if (type?.includes('INCREASE') && type?.includes('EXPENSE')) return 'text-negative'
    if (type?.includes('DECREASE') && type?.includes('EXPENSE')) return 'text-positive'
    if (type?.includes('INCREASE') && type?.includes('INCOME')) return 'text-positive'
    if (type?.includes('DECREASE') && type?.includes('INCOME')) return 'text-negative'
    return 'text-secondary'
  }

  const getImpactTypeIcon = (type) => {
    if (type?.includes('INCREASE')) return '↗'
    if (type?.includes('DECREASE')) return '↘'
    return '→'
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <h1 className="text-lg font-bold text-primary">Impact Report</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <Share2 size={22} className="text-primary" />
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* News Title */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Analyzing</p>
          <h2 className="text-lg font-bold text-primary mb-3">{newsData.headline}</h2>
          <div className="flex items-center gap-3 text-xs text-secondary">
            <span>{newsData.source}</span>
            <span>•</span>
            <span>{newsData.category}</span>
            <span>•</span>
            <span>{newsData.timestamp}</span>
          </div>
        </div>

        {/* AI Confidence Badge */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm font-bold text-blue-900">{impactReport.confidence.toFixed(0)}% AI CONFIDENCE</p>
          </div>
          <p className="text-xs text-blue-700 mb-2">
            Analysis based on your profile: {userProfile?.age} years old, {userProfile?.profession}
          </p>
          <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-800">
            METHODOLOGY →
          </button>
        </div>

        {/* Relevance Score */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">Relevance</p>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-primary">{impactReport.relevance_score.toFixed(1)}</span>
                <span className="text-xl text-secondary">/10</span>
              </div>
              <span className={`${getImpactBg(impactReport.impact_level)} text-xs font-bold px-3 py-1 rounded-full`}>
                {impactReport.impact_level.toUpperCase()} IMPACT
              </span>
            </div>
            <div className="relative w-24 h-24">
              <svg className="transform -rotate-90" width="96" height="96">
                <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="40" 
                  stroke="#0891b2" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${(impactReport.relevance_score/10) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Financial Impact Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-5">Financial Impact Summary</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Monthly Cash Flow</p>
              <p className={`text-2xl font-bold mb-1 ${getImpactTypeColor(impactReport.financial_impact.monthly_impact_type)}`}>
                {impactReport.financial_impact.monthly_cash_flow}
              </p>
              <p className={`text-xs ${getImpactTypeColor(impactReport.financial_impact.monthly_impact_type)}`}>
                {getImpactTypeIcon(impactReport.financial_impact.monthly_impact_type)} {impactReport.financial_impact.monthly_impact_type}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Risk Sensitivity</p>
              <p className="text-2xl font-bold text-primary mb-1">{impactReport.financial_impact.risk_sensitivity}</p>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  impactReport.financial_impact.risk_sensitivity === 'Low' ? 'bg-positive' :
                  impactReport.financial_impact.risk_sensitivity === 'Medium' ? 'bg-warning' : 'bg-negative'
                }`}></div>
                <p className={`text-xs font-semibold ${
                  impactReport.financial_impact.risk_sensitivity === 'Low' ? 'text-positive' :
                  impactReport.financial_impact.risk_sensitivity === 'Medium' ? 'text-warning' : 'text-negative'
                }`}>
                  {impactReport.financial_impact.risk_status}
                </p>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-r rounded-xl p-4 border-l-4 ${
            impactReport.financial_impact.ten_year_change.startsWith('+') 
              ? 'from-positive/5 to-positive/10 border-positive' 
              : 'from-negative/5 to-negative/10 border-negative'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide">10-Year Wealth Outlook</p>
              <span className={`text-sm font-bold ${
                impactReport.financial_impact.ten_year_change.startsWith('+') ? 'text-positive' : 'text-negative'
              }`}>
                {impactReport.financial_impact.ten_year_change}
              </span>
            </div>
            <p className="text-3xl font-bold text-primary mb-3">{impactReport.financial_impact.ten_year_outlook}</p>
            <div className="flex gap-2 h-2">
              <div className="flex-1 bg-gray-200 rounded-full"></div>
              <div className={`flex-[2] rounded-full ${
                impactReport.financial_impact.ten_year_change.startsWith('+') ? 'bg-positive' : 'bg-negative'
              }`}></div>
            </div>
          </div>
        </div>

        {/* Apply Recommendations Button */}
        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base mb-6 hover:bg-primary-light transition-smooth btn-press shadow-md flex items-center justify-center gap-2">
          <Zap size={20} fill="white" />
          Apply Recommendations
        </button>

        {/* What You Should Do Now */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-5">What You Should Do Now</h2>
          
          <div className="space-y-4">
            {impactReport.recommendations
              .sort((a, b) => a.priority - b.priority)
              .map((rec, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-smooth cursor-pointer">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    {rec.priority}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-primary">{rec.title}</h3>
                      {rec.benefit && (
                        <span className="text-xs font-bold text-positive bg-positive/10 px-2 py-1 rounded">
                          {rec.benefit}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-secondary">{rec.description}</p>
                  </div>
                  {index === 0 ? <TrendingUp size={20} className="text-positive" /> :
                   index === 1 ? <Shield size={20} className="text-primary" /> :
                   <RefreshCw size={20} className="text-primary" />}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
