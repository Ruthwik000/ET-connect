import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Send, ChevronDown, ChevronUp, MessageCircle, ArrowLeft } from 'lucide-react'
import ImpactScore from '../components/ImpactScore'
import { getImpactLevel } from '../utils/helpers'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'

export default function AskAI() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userProfile } = useAuth()
  const { newsData } = location.state || {}
  const [input, setInput] = useState('')
  const [isContextExpanded, setIsContextExpanded] = useState(true)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // If no news data, show error
  if (!newsData) {
    return (
      <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <MessageCircle size={64} className="text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-primary mb-2">No News Selected</h2>
          <p className="text-secondary mb-6">Please select a news article to chat about it.</p>
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Transform newsData to match backend NewsArticle model
      const newsContext = [{
        title: newsData.headline,
        link: newsData.link || '',
        source: newsData.source,
        snippet: newsData.summary?.substring(0, 200),
        date: newsData.timestamp,
        content: newsData.content || newsData.summary,
        image: newsData.image
      }]

      console.log('Sending to backend:', {
        message: input,
        userProfile: userProfile,
        newsContext: newsContext
      })

      // Send to backend chatbot API with news context and user profile
      const response = await api.chatWithNews(input, newsContext, userProfile)
      
      const aiResponse = {
        role: 'assistant',
        content: response.response
      }
      setMessages(prev => [...prev, aiResponse])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        error: true
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
    // Auto-send the question
    setTimeout(() => {
      const event = new KeyboardEvent('keypress', { key: 'Enter' })
      document.querySelector('input')?.dispatchEvent(event)
    }, 100)
  }

  const suggestedQuestions = [
    'How does this affect me personally?',
    'What should I do about this?',
    'Explain this in simple terms',
    'What are the long-term implications?'
  ]

  return (
    <div className="max-w-3xl mx-auto h-full flex flex-col">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
        >
          <ArrowLeft size={20} className="text-primary" />
        </button>
        <h1 className="text-lg font-bold text-primary">Ask AI</h1>
      </div>

      {/* News Context Card */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-gray-200 shadow-sm">
        <div className="p-4 sm:p-6">
          <button
            onClick={() => setIsContextExpanded(!isContextExpanded)}
            className="w-full flex items-center justify-between text-left hover:opacity-80 transition-smooth"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-positive rounded-full animate-pulse"></div>
              <span className="text-sm font-bold text-primary">News Context Loaded</span>
            </div>
            {isContextExpanded ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-primary" />}
          </button>

          {isContextExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200 fade-in">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-primary flex-1 pr-3">
                  {newsData.headline}
                </h3>
                <ImpactScore score={newsData.impactScore} level={newsData.impactLevel} size="sm" />
              </div>

              <p className="text-sm text-secondary mb-4 leading-relaxed line-clamp-3">
                {newsData.summary}
              </p>

              <div className="bg-white rounded-xl p-4 mb-3 shadow-sm">
                <p className="text-xs font-bold text-secondary uppercase tracking-wide mb-2">Article Details</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-secondary">Source:</span>
                    <span className="font-semibold text-primary">{newsData.source}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary">Category:</span>
                    <span className="font-semibold text-primary">{newsData.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary">Published:</span>
                    <span className="font-semibold text-primary">{newsData.timestamp}</span>
                  </div>
                </div>
              </div>

              {newsData.link && (
                <a
                  href={newsData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  Read full article →
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 pb-24">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center fade-in px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <MessageCircle size={32} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-primary mb-2 text-center">Ask About This News</h2>
            <p className="text-sm text-secondary text-center mb-8 max-w-md">
              Get personalized insights and actionable recommendations powered by AI
            </p>
            <div className="w-full max-w-md space-y-3">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(q)}
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
                      : msg.error
                      ? 'bg-red-50 border border-red-200 text-red-600 rounded-bl-sm'
                      : 'bg-white border border-gray-200 text-primary rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start fade-in">
                <div className="max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl shadow-sm bg-white border border-gray-200 text-primary rounded-bl-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 sm:p-6 shadow-lg fixed bottom-16 left-0 right-0">
        <div className="max-w-2xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question about this news..."
            disabled={isLoading}
            className="flex-1 px-5 py-4 border-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:border-primary transition-smooth disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-4 bg-primary text-white rounded-xl hover:bg-primary-light transition-smooth disabled:opacity-30 disabled:cursor-not-allowed btn-press shadow-md hover:shadow-lg"
          >
            <Send size={22} />
          </button>
        </div>
      </div>
    </div>
  )
}
