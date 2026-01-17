import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronDown, Bookmark } from 'lucide-react'
import { getImpactLevel } from '../utils/helpers'

export default function Explore() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState('next')
  const [savedNews, setSavedNews] = useState([])

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
    }
  ]

  const currentNews = allNews[currentIndex]

  const handleNext = () => {
    if (isAnimating || currentIndex >= allNews.length - 1) return
    setIsAnimating(true)
    setDirection('next')
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
      setIsAnimating(false)
    }, 300)
  }

  const handleCardClick = (e) => {
    // Don't trigger if clicking on buttons
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
    <div className="fixed inset-0 bg-background overflow-hidden" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div className="h-full w-full relative">
        <div
          key={currentNews.id}
          className={`absolute inset-0 ${isAnimating && direction === 'next' ? 'card-exit' : 'card-enter'}`}
          onClick={handleCardClick}
        >
          {/* News Image with Gradient Overlay */}
          <div className="relative h-[45%] w-full overflow-hidden">
            <img
              src={currentNews.image}
              alt={currentNews.headline}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
            
            {/* Category Tags */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide">
                {currentNews.category}
              </span>
              <span className="bg-gray-900/80 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                TOP STORY
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="h-[55%] bg-white overflow-y-auto">
            <div className="p-6 max-w-3xl mx-auto">
              {/* Impact Score & Source Info with Save Button */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Impact Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-5xl font-bold ${getImpactColor(currentNews.impactLevel)}`}>
                      {currentNews.impactScore}
                    </span>
                    <span className="text-lg text-secondary">/ 10</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-primary">{currentNews.source}</p>
                    <p className="text-xs text-secondary">{currentNews.timestamp} • {currentNews.location}</p>
                  </div>
                  <button
                    onClick={handleSave}
                    className={`p-2.5 rounded-lg transition-smooth btn-press ${
                      isSaved 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-secondary hover:bg-gray-200'
                    }`}
                  >
                    <Bookmark size={20} fill={isSaved ? 'white' : 'none'} />
                  </button>
                </div>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3 leading-tight">
                {currentNews.headline}
              </h1>

              {/* Summary - Expanded */}
              <p className="text-base text-secondary mb-5 leading-relaxed">
                {currentNews.summary}
              </p>

              {/* Impact Buttons - Compact */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  onClick={handlePersonalImpact}
                  className="bg-white border-2 border-primary rounded-xl py-3 px-4 text-center hover:bg-primary/5 transition-smooth btn-press"
                >
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">Personal Impact</p>
                </button>
                <button
                  onClick={handleFutureImpact}
                  className="bg-white border-2 border-gray-300 rounded-xl py-3 px-4 text-center hover:bg-gray-50 transition-smooth btn-press"
                >
                  <p className="text-xs font-bold text-primary uppercase tracking-wide">Future Impact</p>
                </button>
              </div>

              {/* Know More Button */}
              <button
                onClick={handleKnowMore}
                className="w-full bg-primary text-white py-4 rounded-xl font-bold text-base hover:bg-primary-light transition-smooth btn-press shadow-md"
              >
                Know More
              </button>

              {/* Hint Text */}
              {currentIndex < allNews.length - 1 && (
                <div className="flex items-center justify-center gap-2 mt-6 text-secondary animate-bounce">
                  <ChevronDown size={20} />
                  <p className="text-sm font-medium">Tap for next news</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 px-4 pointer-events-none">
          {allNews.map((_, idx) => (
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
