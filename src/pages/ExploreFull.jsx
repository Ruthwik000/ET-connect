import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Bookmark, ChevronDown } from 'lucide-react'
import { getImpactLevel } from '../utils/helpers'

export default function ExploreFull() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('next')
  const [savedNews, setSavedNews] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Economy')

  const categories = ['Economy', 'Markets', 'Tech', 'Politics', 'Opinion', 'World', 'India']

  const allNews = [
    {
      id: '1',
      headline: 'Indian Markets Reach Record High Amid Global Rally',
      summary: 'The Nifty 50 and Sensex touched new peaks today, driven by strong inflows from foreign institutional investors and positive sentiment in the tech sector. Analysts suggest this trend might continue for the next quarter as domestic manufacturing indices show resilience. Market experts attribute the rally to improved corporate earnings, favorable monetary policy, and increased retail participation in equity markets.',
      category: 'Finance',
      impactScore: 8.5,
      impactLevel: getImpactLevel(8.5),
      source: 'Economic Times',
      timestamp: '2h ago',
      location: 'Mumbai',
      impactSource: 'Finance',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    },
    {
      id: '2',
      headline: 'New Tax Deduction Rules for Salaried Employees',
      summary: 'The government has revised Section 80C deduction limits, allowing higher tax savings for investments in specified instruments. The new limit is ₹2 lakh per year, up from ₹1.5 lakh. This change is expected to benefit middle-class taxpayers significantly and encourage long-term savings. Financial advisors recommend reviewing your investment portfolio to maximize these benefits before the fiscal year ends.',
      category: 'Policy',
      impactScore: 6,
      impactLevel: getImpactLevel(6),
      source: 'Business Standard',
      timestamp: '5h ago',
      location: 'New Delhi',
      impactSource: 'Finance',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80'
    },
    {
      id: '3',
      headline: 'Tech Hiring Slowdown Expected in Q2',
      summary: 'Major IT companies including TCS, Infosys, and Wipro have announced a hiring freeze for the next quarter amid global economic uncertainty and reduced client spending. Industry experts predict this could impact freshers and mid-level professionals the most. However, specialized roles in AI, cloud computing, and cybersecurity continue to see demand. Career counselors advise upskilling and diversifying skill sets during this period.',
      category: 'Career',
      impactScore: 7,
      impactLevel: getImpactLevel(7),
      source: 'Mint',
      timestamp: '1d ago',
      location: 'Bangalore',
      impactSource: 'Career',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
    },
    {
      id: '4',
      headline: 'AI Revolution Transforms Indian Tech Landscape',
      summary: 'Indian technology companies are rapidly adopting artificial intelligence and machine learning solutions across various sectors. From healthcare to finance, AI is reshaping how businesses operate and deliver services.',
      category: 'Technology',
      impactScore: 7.5,
      impactLevel: getImpactLevel(7.5),
      source: 'Tech Crunch',
      timestamp: '3h ago',
      location: 'Bangalore',
      impactSource: 'Technology',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
    },
    {
      id: '5',
      headline: 'Stock Market Volatility Continues Amid Global Uncertainty',
      summary: 'Indian stock markets experienced significant volatility as global economic concerns and geopolitical tensions impact investor sentiment. Experts advise caution and diversification.',
      category: 'Markets',
      impactScore: 6.5,
      impactLevel: getImpactLevel(6.5),
      source: 'Bloomberg',
      timestamp: '4h ago',
      location: 'Mumbai',
      impactSource: 'Markets',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
    }
  ]

  // Filter news based on selected category
  const filteredNews = selectedCategory === 'Economy' 
    ? allNews 
    : allNews.filter(news => {
        const categoryMap = {
          'Markets': ['Finance', 'Markets'],
          'Tech': ['Technology', 'Career'],
          'Politics': ['Policy'],
          'Opinion': ['Opinion'],
          'World': ['Finance', 'Markets'],
          'India': ['Policy', 'Career']
        }
        return categoryMap[selectedCategory]?.includes(news.category) || false
      })

  const currentNews = filteredNews[currentIndex]

  const handleNext = () => {
    if (isAnimating || currentIndex >= filteredNews.length - 1) return
    setIsAnimating(true)
    setDirection('next')
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
      setIsAnimating(false)
    }, 300)
  }

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return
    handleNext()
  }

  const handleKnowMore = (e) => {
    e.stopPropagation()
    navigate('/ask-ai', { state: { newsId: currentNews.id } })
  }

  const handlePersonalImpact = (e) => {
    e.stopPropagation()
    navigate('/personal-impact', { state: { newsId: currentNews.id } })
  }

  const handleFutureImpact = (e) => {
    e.stopPropagation()
    navigate('/future-scenarios', { state: { newsId: currentNews.id } })
  }

  const handleSave = (e) => {
    e.stopPropagation()
    if (savedNews.includes(currentNews.id)) {
      setSavedNews(savedNews.filter(id => id !== currentNews.id))
    } else {
      setSavedNews([...savedNews, currentNews.id])
    }
  }

  const isSaved = savedNews.includes(currentNews.id)

  const getImpactColor = (level) => {
    switch (level) {
      case 'Low': return 'text-positive'
      case 'Medium': return 'text-warning'
      case 'High': return 'text-negative'
      default: return 'text-primary'
    }
  }

  return (
    <div className="fixed inset-0 bg-background overflow-hidden">
      {/* Custom Header - Back, Search Bar, Search Icon */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 lg:px-6 h-12 sm:h-14 max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/home')}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-smooth btn-press flex-shrink-0"
          >
            <ArrowLeft size={20} className="text-primary sm:w-6 sm:h-6" />
          </button>
          
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search news..."
              className="w-full px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:border-primary focus:bg-white transition-smooth"
            />
          </div>

          <button
            onClick={() => setSearchQuery('')}
            className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg transition-smooth btn-press flex-shrink-0"
          >
            <Search size={20} className="text-primary sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Category Filter */}
        <div className="overflow-x-auto scrollbar-hide border-t border-gray-100">
          <div className="flex gap-4 sm:gap-6 lg:gap-8 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 min-w-max max-w-7xl mx-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category)
                  setCurrentIndex(0)
                }}
                className={`text-xs sm:text-sm font-semibold uppercase tracking-wide whitespace-nowrap transition-smooth relative pb-1 ${
                  selectedCategory === category
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="absolute top-[96px] bottom-0 left-0 right-0 overflow-hidden">
        <div
          key={currentNews.id}
          className={`h-full w-full ${isAnimating && direction === 'next' ? 'card-exit' : 'card-enter'}`}
          onClick={handleCardClick}
        >
          {/* News Image with Gradient Overlay */}
          <div className="relative h-[45%] w-full overflow-hidden">
            <img
              src={currentNews.image}
              alt={currentNews.headline}
              className="w-full h-full object-cover"
            />
            {/* Stronger gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />
            
            {/* Top Section - Source Info and Save Button - HIGHLY VISIBLE */}
            <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-start justify-between z-20">
              {/* Newspaper Name, Time, Location - Left Side - Transparent */}
              <div className="px-1 py-1">
                <p className="text-white text-sm sm:text-base font-bold mb-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{currentNews.source}</p>
                <p className="text-white text-xs sm:text-sm drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{currentNews.timestamp} • {currentNews.location}</p>
              </div>
              
              {/* Save Button - Right Side */}
              <button
                onClick={handleSave}
                className={`p-2.5 sm:p-3 rounded-full transition-smooth btn-press shadow-xl border-2 ${
                  isSaved 
                    ? 'bg-primary border-primary text-white' 
                    : 'bg-white border-white text-primary hover:bg-gray-100'
                }`}
              >
                <Bookmark size={20} className="sm:w-6 sm:h-6" fill={isSaved ? 'white' : 'none'} />
              </button>
            </div>

            {/* Bottom Section - Impact Score - Transparent */}
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 z-20 px-1 py-1">
              <p className="text-white text-xs font-semibold uppercase tracking-wide mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Impact Score</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl sm:text-5xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ${
                  currentNews.impactLevel === 'High' ? 'text-red-400' : 
                  currentNews.impactLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {currentNews.impactScore}
                </span>
                <span className="text-xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">/ 10</span>
              </div>
            </div>
          </div>

          {/* Card Content */}
          <div className="h-[55%] bg-white overflow-y-auto">
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
              {/* Personal Impact and Future Impact Side by Side */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
                {/* Personal Impact - Compact */}
                <div className="bg-gray-50 rounded-lg p-2 sm:p-2.5 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <h3 className="text-[9px] sm:text-[10px] font-bold text-primary uppercase tracking-wide">Personal Impact</h3>
                    </div>
                    <div className="flex items-center gap-1 bg-positive/10 px-1 py-0.5 rounded-full">
                      <svg className="w-2 h-2 text-positive" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-[9px] font-semibold text-positive">High</span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-primary leading-tight mb-1">
                    EMI may increase by <span className="font-bold text-negative">₹2,500/month</span>
                  </p>
                  <button
                    onClick={handlePersonalImpact}
                    className="text-[9px] sm:text-[10px] font-bold text-primary hover:underline"
                  >
                    View Details →
                  </button>
                </div>

                {/* Future Impact - Compact */}
                <div className="bg-blue-50 rounded-lg p-2 sm:p-2.5 border border-blue-200">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <h4 className="text-[9px] sm:text-[10px] font-bold text-blue-900 uppercase tracking-wide">Future Impact</h4>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-200/30 px-1 py-0.5 rounded-full">
                      <span className="text-[9px] font-semibold text-blue-900">20 Years</span>
                    </div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-blue-900 leading-tight mb-1">
                    Potential gain <span className="font-bold text-blue-600">+₹4.2L</span>
                  </p>
                  <button
                    onClick={handleFutureImpact}
                    className="text-[9px] sm:text-[10px] font-bold text-blue-600 hover:underline"
                    style={{ marginTop: '6px' }}
                  >
                    View Details →
                  </button>
                </div>
              </div>

              {/* Headline */}
              <h1 className="headline-font text-xl sm:text-2xl lg:text-3xl text-primary mb-2 sm:mb-3 leading-tight">
                {currentNews.headline}
              </h1>

              {/* Summary - Expanded */}
              <p className="text-sm sm:text-base text-secondary mb-4 sm:mb-5 leading-relaxed">
                {currentNews.summary}
              </p>

              {/* Know More Button */}
              <button
                onClick={handleKnowMore}
                className="w-full bg-primary text-white py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base hover:bg-primary-light transition-smooth btn-press shadow-md"
              >
                Know More
              </button>

              {/* Hint Text */}
              {currentIndex < filteredNews.length - 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 text-secondary animate-bounce">
                  <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                  <p className="text-xs sm:text-sm font-medium">Tap for next news</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 pointer-events-none">
          {filteredNews.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-primary' : 'w-1 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
