import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Send, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react'
import ImpactScore from '../components/ImpactScore'
import { getImpactLevel } from '../utils/helpers'

export default function AskAI() {
  const location = useLocation()
  const newsId = location.state?.newsId
  const [input, setInput] = useState('')
  const [isContextExpanded, setIsContextExpanded] = useState(true)
  const [messages, setMessages] = useState([])

  const contextNews = {
    headline: 'RBI Increases Repo Rate by 0.5%',
    summary: 'The Reserve Bank of India has announced a 50 basis point increase in the repo rate, taking it to 6.75%. This move aims to control inflation but will impact borrowing costs across the economy.',
    impactScore: 8,
    impactLevel: getImpactLevel(8),
    impactReport: {
      keyNumbers: ['EMI increase: ₹2,500/month', 'Loan interest: +0.5%', 'Savings rate: +0.3%'],
      riskLevel: 'Medium-High'
    }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages([...messages, userMessage])

    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `Based on the repo rate increase:\n\n• Your home loan EMI will likely increase by approximately ₹2,500/month\n• This assumes a ₹50 lakh loan at current rates\n• The increase will take effect from your next billing cycle\n\nRecommended actions:\n• Review your monthly budget\n• Consider prepaying part of your loan if possible\n• Check if refinancing options are available`
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)

    setInput('')
  }

  const suggestedQuestions = [
    'How does this affect me?',
    'What should I do now?',
    'Is this risky long-term?'
  ]

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      {newsId && (
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-200 shadow-sm">
          <div className="p-4 sm:p-6">
            <button
              onClick={() => setIsContextExpanded(!isContextExpanded)}
              className="w-full flex items-center justify-between text-left hover:opacity-80 transition-smooth"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-positive rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-primary">Context Loaded</span>
              </div>
              {isContextExpanded ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-primary" />}
            </button>

            {isContextExpanded && (
              <div className="mt-4 pt-4 border-t border-gray-200 fade-in">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-primary flex-1 pr-3">
                    {contextNews.headline}
                  </h3>
                  <ImpactScore score={contextNews.impactScore} level={contextNews.impactLevel} size="sm" />
                </div>

                <p className="text-sm text-secondary mb-4 leading-relaxed">{contextNews.summary}</p>

                <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-3">Key Numbers</p>
                  <div className="space-y-2">
                    {contextNews.impactReport.keyNumbers.map((num, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <p className="text-sm font-medium text-primary">{num}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-warning/10 px-3 py-2 rounded-lg">
                  <span className="text-xs font-semibold text-secondary">Risk Level:</span>
                  <span className="text-sm font-bold text-warning">{contextNews.impactReport.riskLevel}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 pb-24">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center fade-in px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2 text-center">Ask About This News</h2>
            <p className="text-sm text-secondary text-center mb-8 max-w-md">
              Get personalized insights and actionable recommendations
            </p>
            <div className="w-full max-w-md space-y-3">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setInput(q)}
                  className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-xl text-sm font-medium text-primary hover:bg-gray-50 hover:border-primary transition-smooth btn-press shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white border border-gray-200 text-primary rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-white border-t border-gray-200 p-4 sm:p-6 shadow-lg fixed bottom-16 left-0 right-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary transition-smooth"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-4 bg-primary text-white rounded-xl hover:bg-primary-light transition-smooth disabled:opacity-30 disabled:cursor-not-allowed btn-press shadow-md hover:shadow-lg"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
