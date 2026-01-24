import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import NewsCard from '../components/NewsCard'
import { getImpactLevel } from '../utils/helpers'
import { categorizeArticle } from '../utils/categorize'
import { useAuth } from '../context/AuthContext'
import { api } from '../utils/api'

export default function Home() {
  const navigate = useNavigate()
  const { userProfile } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)
  const scrollContainerRef = useRef(null)
  const [allNews, setAllNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch real news from backend with personalized headlines
  useEffect(() => {
    async function fetchNews() {
      // Check if profile has the required fields
      if (!userProfile?.age || !userProfile?.goals || !userProfile?.interests) {
        console.log('Missing profile data:', { 
          age: userProfile?.age, 
          goals: userProfile?.goals, 
          interests: userProfile?.interests 
        })
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        // Convert goals array to string if needed
        const goalsString = Array.isArray(userProfile.goals) 
          ? userProfile.goals.join(', ') 
          : userProfile.goals
        
        // Use interests or create default ones based on profession
        const interests = userProfile.interests || ['technology', 'business', 'finance']
        
        console.log('Fetching personalized news with AI-generated headlines...')
        
        const data = await api.getPersonalizedNews({
          age: userProfile.age,
          goals: goalsString,
          interests: interests,
          k: 3
        })
        
        // Transform backend news to match our format
        // Headlines are already personalized by the backend!
        const transformedNews = []
        let id = 1
        
        for (const [interest, articles] of Object.entries(data.news_by_interest)) {
          articles.forEach(article => {
            const category = categorizeArticle(article, interest)
            transformedNews.push({
              id: `news-${id++}`,
              headline: article.title, // Already personalized!
              summary: article.content || article.snippet || 'No summary available',
              content: article.content,
              category: category,
              impactScore: Math.floor(Math.random() * 3) + 6,
              impactLevel: getImpactLevel(Math.floor(Math.random() * 3) + 6),
              impactSummary: `Relevant to your ${category.toLowerCase()} interests`,
              source: article.source,
              timestamp: article.date || 'Recently',
              impactSource: category,
              image: article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
              link: article.link,
              personalized: true // All headlines are personalized by default
            })
          })
        }
        
        setAllNews(transformedNews)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [userProfile])

  // Auto-slide effect
  useEffect(() => {
    if (allNews.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.min(allNews.length, 5))
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [allNews.length])

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

  const handleViewImpact = (newsItem) => {
    // Pass the full news object to AskAI page
    navigate('/ask-ai', { 
      state: { 
        newsId: newsItem.id,
        newsData: newsItem
      } 
    })
  }

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-secondary">Loading personalized news with AI-generated headlines...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-600 font-semibold mb-2">Failed to load news</p>
          <p className="text-sm text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Show message if no news
  if (allNews.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <p className="text-blue-600 font-semibold mb-2">Complete your profile to see personalized news</p>
          <button 
            onClick={() => navigate('/survey')} 
            className="mt-3 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-light"
          >
            Complete Profile
          </button>
        </div>
      </div>
    )
  }

  // Split news into sections
  const highImpactNews = allNews.slice(0, 5)
  const trendingNews = allNews.slice(5, 8)
  const recommendedNews = allNews.slice(8, 10)

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
        <p className="text-sm text-secondary">
          Personalized headlines showing how news impacts YOU
        </p>
      </div>

      {/* Sliding News Cards - REAL NEWS */}
      <div className="relative mb-8">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-hidden scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {highImpactNews.map((newsItem, index) => (
            <div 
              key={newsItem.id} 
              className="min-w-full snap-start"
            >
              <NewsCard news={newsItem} onViewImpact={() => handleViewImpact(newsItem)} />
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {highImpactNews.map((_, index) => (
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

      {/* Trending News Section - REAL NEWS */}
      {trendingNews.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-primary rounded-full"></div>
            <h3 className="text-2xl font-bold text-primary">Trending Now</h3>
            <span className="text-xs font-bold text-white bg-negative px-2 py-1 rounded-full uppercase tracking-wide">Live</span>
          </div>

          <div className="space-y-3">
            {trendingNews.map((newsItem, index) => (
              <div 
                key={newsItem.id}
                className={`bg-white border-l-4 ${
                  index === 0 ? 'border-primary' : 
                  index === 1 ? 'border-warning' : 'border-positive'
                } rounded-lg p-4 shadow-sm hover:shadow-md transition-smooth cursor-pointer`}
                onClick={() => handleViewImpact(newsItem)}
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <img 
                      src={newsItem.image}
                      alt={newsItem.headline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold ${
                        index === 0 ? 'text-negative' : 
                        index === 1 ? 'text-warning' : 'text-positive'
                      }`}>
                        {index === 0 ? '🔥' : index === 1 ? '📈' : '💼'} TRENDING #{index + 1}
                      </span>
                      <span className="text-xs text-secondary">• {newsItem.timestamp}</span>
                    </div>
                    <h4 className="text-sm font-bold text-primary mb-1 line-clamp-2">
                      {newsItem.headline}
                    </h4>
                    <p className="text-xs text-secondary line-clamp-1">
                      {newsItem.summary.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended For You Section - REAL NEWS */}
      {recommendedNews.length > 0 && (
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

          <div className="space-y-4">
            {recommendedNews.map((newsItem) => (
              <div 
                key={newsItem.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover"
              >
                <div className="relative h-40 overflow-hidden">
                  <img 
                    src={newsItem.image}
                    alt={newsItem.headline}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-bold text-primary uppercase tracking-wide">{newsItem.category}</p>
                    <p className="text-xs text-secondary">{newsItem.timestamp}</p>
                  </div>

                  <h4 className="headline-font text-lg text-primary mb-3 leading-snug">
                    {newsItem.headline}
                  </h4>

                  <p className="text-sm text-secondary mb-4 leading-relaxed line-clamp-2">
                    {newsItem.summary}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        newsItem.impactLevel === 'High' ? 'text-negative' :
                        newsItem.impactLevel === 'Medium' ? 'text-warning' : 'text-positive'
                      }`}>
                        {newsItem.impactLevel} Impact
                      </span>
                    </div>
                    <button 
                      onClick={() => handleViewImpact(newsItem)}
                      className="text-sm font-semibold text-primary hover:underline"
                    >
                      Read Full Story
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
