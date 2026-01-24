/**
 * Categorize news articles based on their content
 */

/**
 * Determine the category of a news article based on its title and content
 * @param {Object} article - The article object with title, content, and snippet
 * @param {string} fallbackInterest - The user's interest to use as fallback
 * @returns {string} The determined category
 */
export function categorizeArticle(article, fallbackInterest = 'General') {
  const title = (article.title || '').toLowerCase()
  const content = (article.content || article.snippet || '').toLowerCase()
  const combined = title + ' ' + content
  
  // Finance & Markets
  if (combined.match(/\b(stock|market|trading|invest|finance|economy|bank|crypto|bitcoin|ethereum|forex|bond|equity|mutual fund|portfolio|dividend|share|sensex|nifty)\b/i)) {
    return 'Finance'
  }
  
  // Business & Startups
  if (combined.match(/\b(startup|entrepreneur|business|company|ceo|cfo|revenue|profit|merger|acquisition|ipo|venture capital|funding|unicorn)\b/i)) {
    return 'Business'
  }
  
  // Technology
  if (combined.match(/\b(ai|artificial intelligence|machine learning|tech|software|app|digital|cyber|cloud|data|algorithm|programming|developer|code|api|saas)\b/i)) {
    return 'Technology'
  }
  
  // Career & Employment
  if (combined.match(/\b(job|career|hiring|employment|salary|work|professional|resume|interview|promotion|workplace|employee|hr|recruitment)\b/i)) {
    return 'Career'
  }
  
  // Health & Wellness
  if (combined.match(/\b(health|fitness|wellness|medical|doctor|disease|nutrition|diet|exercise|mental health|therapy|hospital|medicine|vaccine)\b/i)) {
    return 'Health'
  }
  
  // Policy & Government
  if (combined.match(/\b(government|policy|law|regulation|minister|parliament|election|politics|legislation|tax|budget|reform|bill)\b/i)) {
    return 'Policy'
  }
  
  // Sports
  if (combined.match(/\b(sport|game|player|team|match|championship|tournament|cricket|football|tennis|olympics|athlete|coach)\b/i)) {
    return 'Sports'
  }
  
  // Environment & Climate
  if (combined.match(/\b(climate|environment|energy|renewable|pollution|carbon|emission|sustainability|green|solar|wind|conservation)\b/i)) {
    return 'Environment'
  }
  
  // Education
  if (combined.match(/\b(education|school|university|student|learning|course|degree|exam|teacher|college|academic|scholarship)\b/i)) {
    return 'Education'
  }
  
  // Real Estate
  if (combined.match(/\b(property|real estate|housing|apartment|rent|mortgage|builder|construction|realty)\b/i)) {
    return 'Real Estate'
  }
  
  // Entertainment
  if (combined.match(/\b(movie|film|music|entertainment|celebrity|actor|actress|concert|album|streaming|netflix|spotify)\b/i)) {
    return 'Entertainment'
  }
  
  // Fallback to interest with proper capitalization
  return fallbackInterest.charAt(0).toUpperCase() + fallbackInterest.slice(1)
}

/**
 * Batch categorize multiple articles
 * @param {Array} articles - Array of article objects
 * @param {string} fallbackInterest - The user's interest to use as fallback
 * @returns {Array} Articles with category field added
 */
export function categorizeArticles(articles, fallbackInterest = 'General') {
  return articles.map(article => ({
    ...article,
    category: categorizeArticle(article, fallbackInterest)
  }))
}
