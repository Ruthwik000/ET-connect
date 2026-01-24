import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import { getImpactLevel } from '../utils/helpers'

export default function Home() {
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef(null)

  const mockNews = [
    {
      id: '1',
      headline: 'RBI Increases Repo Rate by 0.5%',
      summary: 'Reserve Bank of India announces monetary policy changes affecting lending rates.',
      category: 'Finance',
      impactScore: 8,
      impactLevel: getImpactLevel(8),
      impactSummary: 'Your EMI may increase by ₹2,500/month',
      source: 'Economic Times',
      timestamp: '2 hours ago',
      impactSource: 'Finance',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80'
    },
    {
      id: '2',
      headline: 'New Tax Deduction Rules for Salaried Employees',
      summary: 'Government announces changes to Section 80C deductions.',
      category: 'Policy',
      impactScore: 6,
      impactLevel: getImpactLevel(6),
      impactSummary: 'You could save ₹15,000 in taxes this year',
      source: 'Business Standard',
      timestamp: '5 hours ago',
      impactSource: 'Finance',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80'
    },
    {
      id: '3',
      headline: 'Tech Hiring Slowdown Expected in Q2',
      summary: 'Major IT companies announce hiring freeze amid global uncertainty.',
      category: 'Career',
      impactScore: 7,
      impactLevel: getImpactLevel(7),
      impactSummary: 'Job market may tighten in your sector',
      source: 'Mint',
      timestamp: '1 day ago',
      impactSource: 'Career',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80'
    }
  ]

  const handleViewImpact = (id) => {
    navigate('/ask-ai', { state: { newsId: id } })
  }

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % mockNews.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [mockNews.length])

  // Scroll to current slide
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = container.offsetWidth
      container.scrollTo({
        left: currentSlide * cardWidth,
        behavior: 'smooth'
      })
    }
  }, [currentSlide])

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
      <div className="mb-6 fade-in text-center">
        <p className="text-base sm:text-lg text-secondary italic mb-1" style={{ fontFamily: 'Georgia, serif' }}>
          "News you understand, not just consume."
        </p>
        <p className="text-sm sm:text-base font-light tracking-wide mb-3" style={{ color: '#9CA3AF' }}>
          From headlines to personal impact.
        </p>
        <div className="w-32 h-px bg-gray-300 mx-auto"></div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-primary mb-1">High Impact News</h3>
        <p className="text-sm text-secondary">Sorted by relevance to your profile</p>
      </div>

      {/* Sliding News Cards */}
      <div className="relative mb-8">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {mockNews.map((news, index) => (
            <div 
              key={news.id} 
              className="min-w-full snap-start"
            >
              <NewsCard news={news} onViewImpact={handleViewImpact} />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {mockNews.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trending News Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-primary rounded-full"></div>
          <h3 className="text-2xl font-bold text-primary">Trending Now</h3>
          <span className="text-xs font-bold text-white bg-negative px-2 py-1 rounded-full uppercase tracking-wide">Live</span>
        </div>

        <div className="space-y-3">
          {/* Trending Article 1 */}
          <div className="bg-white border-l-4 border-primary rounded-lg p-4 shadow-sm hover:shadow-md transition-smooth cursor-pointer" onClick={() => navigate('/ask-ai', { state: { newsId: 'trend-1' } })}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=400&q=80"
                  alt="Trending"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-negative">🔥 TRENDING #1</span>
                  <span className="text-xs text-secondary">• 15 mins ago</span>
                </div>
                <h4 className="text-sm font-bold text-primary mb-1 line-clamp-2">
                  Rupee Hits All-Time Low Against Dollar: What It Means for Your Wallet
                </h4>
                <p className="text-xs text-secondary line-clamp-1">
                  Currency depreciation impacts imports, travel, and inflation...
                </p>
              </div>
            </div>
          </div>

          {/* Trending Article 2 */}
          <div className="bg-white border-l-4 border-warning rounded-lg p-4 shadow-sm hover:shadow-md transition-smooth cursor-pointer" onClick={() => navigate('/ask-ai', { state: { newsId: 'trend-2' } })}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80"
                  alt="Trending"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-warning">📈 TRENDING #2</span>
                  <span className="text-xs text-secondary">• 1 hour ago</span>
                </div>
                <h4 className="text-sm font-bold text-primary mb-1 line-clamp-2">
                  Stock Market Volatility: Expert Tips to Protect Your Portfolio
                </h4>
                <p className="text-xs text-secondary line-clamp-1">
                  Market experts share strategies for uncertain times...
                </p>
              </div>
            </div>
          </div>

          {/* Trending Article 3 */}
          <div className="bg-white border-l-4 border-positive rounded-lg p-4 shadow-sm hover:shadow-md transition-smooth cursor-pointer" onClick={() => navigate('/ask-ai', { state: { newsId: 'trend-3' } })}>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80"
                  alt="Trending"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-positive">💼 TRENDING #3</span>
                  <span className="text-xs text-secondary">• 2 hours ago</span>
                </div>
                <h4 className="text-sm font-bold text-primary mb-1 line-clamp-2">
                  New Tax Benefits for First-Time Home Buyers Announced
                </h4>
                <p className="text-xs text-secondary line-clamp-1">
                  Government unveils incentives to boost real estate sector...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended For You Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-primary">Recommended For You</h3>
          <button 
            onClick={() => navigate('/for-you')}
            className="text-sm font-semibold text-primary hover:underline"
          >
            View All
          </button>
        </div>

        {/* For You News Cards - Show only first 2 */}
        <div className="space-y-4">
          {/* Global Markets Card */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover">
            {/* Market Ticker Display */}
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

              <h4 className="headline-font text-lg text-primary mb-3 leading-snug">
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

              <h4 className="headline-font text-lg text-primary mb-3 leading-snug">
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
        </div>
      </div>
    </div>
  )
}
