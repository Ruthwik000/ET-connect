import { getImpactColor, getImpactBgColor } from '../utils/helpers'

export default function NewsCard({ news, onViewImpact }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 card-hover shadow-sm overflow-hidden">
      {/* News Image */}
      {news.image && (
        <div className="relative -mx-5 -mt-5 mb-4 h-48 overflow-hidden">
          <img 
            src={news.image} 
            alt={news.headline}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </div>
      )}

      <div className="flex items-start justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-secondary bg-gray-100 px-3 py-1.5 rounded-full">
          {news.category}
        </span>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${getImpactBgColor(news.impactLevel)}`}>
          <span className={`text-2xl font-bold ${getImpactColor(news.impactLevel)}`}>
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

      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-3 mb-4 border-l-4 border-primary">
        <p className="text-sm font-medium text-primary">
          {news.impactSummary}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onViewImpact(news.id)}
          className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold text-sm hover:bg-primary-light transition-smooth btn-press shadow-sm hover:shadow-md"
        >
          View Impact Report
        </button>
        <button
          onClick={() => onViewImpact(news.id)}
          className="px-5 bg-gray-100 text-primary py-3 rounded-lg font-semibold text-sm hover:bg-gray-200 transition-smooth btn-press"
        >
          Know More
        </button>
      </div>
    </div>
  )
}
