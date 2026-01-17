import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, TrendingUp, BarChart3 } from 'lucide-react'

export default function FutureScenarios() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('projections')

  const tabs = [
    { id: 'projections', label: 'Projections' },
    { id: 'risk', label: 'Risk Analysis' },
    { id: 'variables', label: 'Variables' }
  ]

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <h1 className="text-lg font-bold text-primary">Future Scenarios</h1>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <BarChart3 size={22} className="text-primary" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 font-semibold text-sm transition-smooth relative ${
                activeTab === tab.id ? 'text-primary' : 'text-secondary'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Compare Path Strategies */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-primary mb-2">Compare Path Strategies</h2>
          <p className="text-sm text-secondary">
            Simulated 10-year wealth outcomes based on your current portfolio and AI market forecasting.
          </p>
        </div>

        {/* Optimised Strategy Card */}
        <div className="bg-white rounded-2xl border-2 border-primary p-6 mb-4 shadow-lg relative">
          <div className="absolute -top-3 left-6">
            <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full">
              AI RECOMMENDED
            </span>
          </div>

          <div className="mt-2 mb-4">
            <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">Optimised</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-primary">₹1.82 Cr</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp size={16} className="text-positive" />
              <span className="text-sm font-semibold text-positive">+52% vs current</span>
            </div>
          </div>

          <div className="mb-5">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">10-Year Trajectory</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                <div>
                  <p className="text-sm font-bold text-primary">Year 3: Debt Exit</p>
                  <p className="text-xs text-secondary">Elimination of high-interest loans</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary/50 rounded-full mt-1.5"></div>
                <div>
                  <p className="text-sm font-bold text-primary">Year 7: Peak Equity</p>
                  <p className="text-xs text-secondary">Compounding growth at 14% CAGR</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                <div>
                  <p className="text-sm font-bold text-primary">Year 10: Wealth Target</p>
                  <p className="text-xs text-secondary">Target reached with 85% confidence</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Risk Level</p>
              <p className="text-sm font-bold text-primary">Moderate</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Confidence</p>
              <p className="text-sm font-bold text-positive">High (85%)</p>
            </div>
          </div>
        </div>

        {/* Conservative Strategy Card */}
        <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6 shadow-sm">
          <div className="mb-4">
            <p className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">Conservative</p>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-4xl font-bold text-primary">₹1.24 Cr</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-secondary">+8% vs current</span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-2">10-Year Trajectory</p>
            <p className="text-sm text-secondary">
              Balanced debt-equity mix with lower volatility but reduced growth potential.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Risk Level</p>
              <p className="text-sm font-bold text-positive">Low</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Confidence</p>
              <p className="text-sm font-bold text-positive">Very High (92%)</p>
            </div>
          </div>
        </div>

        {/* Why Optimised Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-primary">Why 'Optimised'?</h3>
            <button className="text-xs font-semibold text-primary bg-white px-3 py-1.5 rounded-lg border border-gray-200">
              Analysis Deep-dive
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base mb-3 hover:bg-primary-light transition-smooth btn-press shadow-md">
          Select Optimised Strategy
        </button>
        <button className="w-full bg-white text-primary py-4 rounded-xl font-semibold text-base border-2 border-gray-300 hover:bg-gray-50 transition-smooth btn-press">
          Keep Current Portfolio
        </button>
      </div>
    </div>
  )
}
