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
   * Generate impact report for a news article
   */
  async generateImpactReport(article, userProfile) {
    try {
      console.log('Sending impact report request:', {
        article: {
          title: article.headline || article.title,
          source: article.source,
        },
        userProfile: {
          age: userProfile.age,
          profession: userProfile.profession
        }
      });

      const response = await fetch(`${API_BASE_URL}/generate-impact-report`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article: {
            title: article.headline || article.title,
            link: article.link || '',
            source: article.source,
            snippet: article.summary?.substring(0, 200),
            date: article.timestamp || article.date,
            content: article.content || article.summary,
            image: article.image
          },
          user_profile: userProfile
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend error:', errorData);
        throw new Error(errorData.detail || `HTTP ${response.status}: Failed to generate impact report`);
      }
      
      const data = await response.json();
      console.log('Impact report generated successfully:', data);
      return data;
    } catch (error) {
      console.error('Error in generateImpactReport:', error);
      throw error;
    }
  }
};

export default api;
