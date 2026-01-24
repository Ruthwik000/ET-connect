/**
 * API Client for News Backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  /**
   * Get personalized news based on user profile
   */
  async getPersonalizedNews(userProfile) {
    const response = await fetch(`${API_BASE_URL}/personalized-news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: userProfile.age,
        goals: userProfile.goals,
        interests: userProfile.interests,
        k: userProfile.k || 3
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    return response.json();
  },

  /**
   * Get recommended interests only
   */
  async getRecommendedInterests(userProfile) {
    const response = await fetch(`${API_BASE_URL}/recommend-interests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: userProfile.age,
        goals: userProfile.goals,
        interests: userProfile.interests,
        k: userProfile.k || 3
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to get recommendations');
    }
    
    return response.json();
  },

  /**
   * Chat with AI about news
   */
  async chatWithNews(message, newsContext = [], userProfile = null) {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        news_context: newsContext,
        user_profile: userProfile
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to send chat message');
    }
    
    return response.json();
  },

  /**
   * Reset chat conversation
   */
  async resetChat() {
    const response = await fetch(`${API_BASE_URL}/chat/reset`, {
      method: 'POST',
    });
    
    if (!response.ok) {
      throw new Error('Failed to reset chat');
    }
    
    return response.json();
  },

  /**
   * Health check
   */
  async healthCheck() {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error('Backend is not healthy');
    }
    
    return response.json();
  },

  /**
   * Generate personalized notifications
   */
  async generateNotifications(userProfile) {
    const response = await fetch(`${API_BASE_URL}/generate-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: userProfile.age,
        goals: userProfile.goals,
        interests: userProfile.interests,
        k: userProfile.k || 3
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to generate notifications');
    }
    
    return response.json();
  },

  /**
   * Personalize a single headline
   */
  async personalizeHeadline(article, userProfile) {
    const response = await fetch(`${API_BASE_URL}/personalize-headline`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: {
          title: article.title || article.headline,
          content: article.content || article.summary,
          category: article.category
        },
        user_profile: {
          age: userProfile.age,
          goals: userProfile.goals
        }
      })
    });
    
    if (!response.ok) {
      throw new Error('Failed to personalize headline');
    }
    
    return response.json();
  }
};

export default api;
