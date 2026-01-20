import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bookmark } from 'lucide-react'

export default function SavedNews() {
  const navigate = useNavigate()

  // Mock saved news data
  const savedNews = [
    {
      id: '1',
      headline: 'Indian Markets Reach Record High Amid Global Rally',
      category: 'Finance',
      impactScore: 8.5,
      impactLevel: 'High',
      source: 'Economic Times',
      timestamp: '2h ago',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      savedAt: '2 hours ago'
    },
    {
      id: '3',
      headline: 'Tech Hiring Slowdown Expected in Q2',
      category: 'Career',
      impactScore: 7,
      impactLevel: 'High',
      source: 'Mint',
      timestamp: '1d ago',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      savedAt: '1 day ago'
    }
  ]

  const handleViewNews = (newsId) => {
    navigate('/ask-ai', { state: { newsId } })
  }

  const getImpactColor = (level) => {
    switch (level) {
      case 'Low': return 'text-positive'
      case 'Medium': return 'text-warning'
      case 'High': return 'text-negative'
      default: return 'text-primary'
    }
  }

  const getImpactBg = (level) => {
    switch (level) {
      case 'Low': return 'bg-positive/10'
      case 'Medium': return 'bg-warning/10'
      case 'High': return 'bg-negative/10'
      default: return 'bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition-smooth">
            <ArrowLeft size={24} className="text-primary" />
          </button>
          <h1 className="text-xl font-bold text-primary">Saved News</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {savedNews.length > 0 ? (
          <>
            <p className="text-sm text-secondary mb-6">{savedNews.length} saved articles</p>
            <div className="space-y-4">
              {savedNews.map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm card-hover cursor-pointer"
                  onClick={() => handleViewNews(news.id)}
                >
                  {/* News Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.headline}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                        <Bookmark size={20} className="text-primary" fill="currentColor" />
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-xs font-semibold text-secondary bg-gray-100 px-3 py-1.5 rounded-full">
                        {news.category}
                      </span>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getImpactBg(news.impactLevel)}`}>
                        <span className={`text-xl font-bold ${getImpactColor(news.impactLevel)}`}>
                          {news.impactScore}
                        </span>
                        <span className={`text-xs font-semibold ${getImpactColor(news.impactLevel)}`}>
                          {news.impactLevel}
                        </span>
                      </div>
                    </div>

                    <h3 className="headline-font text-lg text-primary mb-3 leading-snug">
                      {news.headline}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-secondary">
                      <span>{news.source} • {news.timestamp}</span>
                      <span>Saved {news.savedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bookmark size={32} className="text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-primary mb-2">No saved news yet</h3>
            <p className="text-sm text-secondary mb-6">
              Bookmark articles to read them later
            </p>
            <button
              onClick={() => navigate('/explore')}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-smooth btn-press"
            >
              Explore News
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
