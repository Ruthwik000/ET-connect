import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Share2, Zap, TrendingUp, Shield, RefreshCw } from 'lucide-react'

export default function PersonalImpact() {
  const navigate = useNavigate()
  const location = useLocation()
  const newsId = location.state?.newsId

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
        {/* AI Confidence Badge */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mb-6 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <p className="text-sm font-bold text-blue-900">98% AI CONFIDENCE</p>
          </div>
          <p className="text-xs text-blue-700 mb-2">
            Verified against current Indian Tax Laws (FY 2024-25) and RBI market mandates
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
                <span className="text-5xl font-bold text-primary">7.4</span>
                <span className="text-xl text-secondary">/10</span>
              </div>
              <span className="bg-warning/20 text-warning text-xs font-bold px-3 py-1 rounded-full">
                MEDIUM IMPACT
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
                  strokeDasharray={`${(7.4/10) * 251.2} 251.2`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-primary">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Impact Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary mb-5">Financial Impact Summary</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Monthly Cash Flow</p>
              <p className="text-2xl font-bold text-negative mb-1">+₹2,400</p>
              <p className="text-xs text-negative">↗ EXPENSE INCREASE</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">Risk Sensitivity</p>
              <p className="text-2xl font-bold text-primary mb-1">Low</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-positive rounded-full"></div>
                <p className="text-xs font-semibold text-positive">STABLE PORTFOLIO</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-positive/5 to-positive/10 rounded-xl p-4 border-l-4 border-positive">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide">10-Year Wealth Outlook</p>
              <span className="text-sm font-bold text-positive">+12%</span>
            </div>
            <p className="text-3xl font-bold text-primary mb-3">₹8.5 Lakhs</p>
            <div className="flex gap-2 h-2">
              <div className="flex-1 bg-gray-200 rounded-full"></div>
              <div className="flex-[2] bg-primary rounded-full"></div>
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
            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-smooth cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-primary">Switch to Direct Mutual Funds</h3>
                  <span className="text-xs font-bold text-positive bg-positive/10 px-2 py-1 rounded">+₹1.2L BENEFIT</span>
                </div>
                <p className="text-sm text-secondary">Save on expense ratios immediately</p>
              </div>
              <TrendingUp size={20} className="text-positive" />
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-smooth cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-1">Rebalance Debt Portfolio</h3>
                <p className="text-sm text-secondary">Mitigate impact of new LTCG rules</p>
              </div>
              <Shield size={20} className="text-primary" />
            </div>

            <div className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-smooth cursor-pointer">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-primary mb-1">Update SIP Mandate</h3>
                <p className="text-sm text-secondary">Align with your new monthly budget</p>
              </div>
              <RefreshCw size={20} className="text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
