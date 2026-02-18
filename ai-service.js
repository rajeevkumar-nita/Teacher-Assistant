// AI Service - Gemini API Integration

class AIService {
  constructor() {
    this.apiKey = CONFIG.API.GEMINI_API_KEY;
    this.endpoint = CONFIG.API.GEMINI_ENDPOINT;
    this.requestQueue = [];
    this.isProcessing = false;
  }

  /**
   * Generate a response from Gemini API
   * @param {string} query - Teacher's question
   * @param {object} context - Classroom context (grade, subject, etc.)
   * @param {string} language - Response language
   * @returns {Promise<object>} - AI response with text and metadata
   */
  async generateResponse(query, context = {}, language = 'en') {
    try {
      // Check if API key is configured
      if (!this.apiKey || this.apiKey === 'AIzaSyDixdeq_tAs37GVEC5t58I_GEnKsSb7UHI') {
        throw new Error('API_KEY_NOT_CONFIGURED');
      }

      // Select appropriate prompt template
      const prompt = selectTemplate(query, context);

      // Add language instruction if not English
      const languageInstruction = language !== 'en' 
        ? `\n\nIMPORTANT: Respond in ${CONFIG.LANGUAGES[language].name} language.`
        : '';

      const fullPrompt = prompt + languageInstruction;

      // Prepare request payload
      const requestBody = {
        contents: [{
          parts: [{
            text: fullPrompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      // Make API request
      const startTime = Date.now();
      const response = await this.makeRequest(requestBody);
      const responseTime = Date.now() - startTime;

      // Extract response text
      const responseText = this.extractResponseText(response);

      // Track analytics
      if (CONFIG.FEATURES.ANALYTICS) {
        this.trackAnalytics({
          event: CONFIG.ANALYTICS.RESPONSE_RECEIVED,
          query: query,
          context: context,
          language: language,
          responseTime: responseTime,
          timestamp: new Date().toISOString()
        });
      }

      return {
        success: true,
        text: responseText,
        responseTime: responseTime,
        timestamp: new Date().toISOString(),
        context: context,
        language: language
      };

    } catch (error) {
      console.error('AI Service Error:', error);
      return this.handleError(error, query, context);
    }
  }

  /**
   * Make HTTP request to Gemini API
   */
  async makeRequest(requestBody, retryCount = 0) {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': this.apiKey
        },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(CONFIG.API.TIMEOUT)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }

      return await response.json();

    } catch (error) {
      // Retry logic
      if (retryCount < CONFIG.API.MAX_RETRIES) {
        console.log(`Retrying request (attempt ${retryCount + 1}/${CONFIG.API.MAX_RETRIES})...`);
        await this.delay(1000 * (retryCount + 1)); // Exponential backoff
        return this.makeRequest(requestBody, retryCount + 1);
      }
      throw error;
    }
  }

  /**
   * Extract text from Gemini API response
   */
  extractResponseText(response) {
    try {
      if (response.candidates && response.candidates.length > 0) {
        const candidate = response.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          return candidate.content.parts[0].text;
        }
      }
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error extracting response:', error);
      return 'Sorry, I encountered an error processing the response. Please try again.';
    }
  }

  /**
   * Handle errors with user-friendly messages
   */
  handleError(error, query, context) {
    let errorMessage = 'Sorry, I encountered an error. Please try again.';
    let errorType = 'UNKNOWN_ERROR';

    if (error.message === 'API_KEY_NOT_CONFIGURED') {
      errorMessage = 'Please configure your Gemini API key in config.js to use this feature.';
      errorType = 'CONFIG_ERROR';
    } else if (error.name === 'AbortError' || error.message.includes('timeout')) {
      errorMessage = 'Request timed out. Please check your internet connection and try again.';
      errorType = 'TIMEOUT_ERROR';
    } else if (error.message.includes('API Error: 429')) {
      errorMessage = 'Too many requests. Please wait a moment and try again.';
      errorType = 'RATE_LIMIT_ERROR';
    } else if (error.message.includes('API Error: 401') || error.message.includes('API Error: 403')) {
      errorMessage = 'Invalid API key. Please check your configuration.';
      errorType = 'AUTH_ERROR';
    } else if (!navigator.onLine) {
      errorMessage = 'No internet connection. Your query has been saved and will be sent when you\'re back online.';
      errorType = 'OFFLINE_ERROR';
    }

    return {
      success: false,
      error: errorMessage,
      errorType: errorType,
      query: query,
      context: context,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Track analytics events
   */
  trackAnalytics(event) {
    try {
      // Store in localStorage for now (can be sent to analytics service later)
      const analytics = JSON.parse(localStorage.getItem('teacherCoachingAnalytics') || '[]');
      analytics.push(event);
      
      // Keep only last 100 events
      if (analytics.length > 100) {
        analytics.shift();
      }
      
      localStorage.setItem('teacherCoachingAnalytics', JSON.stringify(analytics));
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  /**
   * Utility: Delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get analytics summary
   */
  getAnalyticsSummary() {
    try {
      const analytics = JSON.parse(localStorage.getItem('teacherCoachingAnalytics') || '[]');
      
      const summary = {
        totalQueries: analytics.filter(e => e.event === CONFIG.ANALYTICS.QUERY_SUBMITTED).length,
        totalResponses: analytics.filter(e => e.event === CONFIG.ANALYTICS.RESPONSE_RECEIVED).length,
        voiceUsage: analytics.filter(e => e.event === CONFIG.ANALYTICS.VOICE_USED).length,
        offlineQueries: analytics.filter(e => e.event === CONFIG.ANALYTICS.OFFLINE_QUERY).length,
        averageResponseTime: this.calculateAverageResponseTime(analytics),
        languageDistribution: this.getLanguageDistribution(analytics),
        topIssueTypes: this.getTopIssueTypes(analytics)
      };

      return summary;
    } catch (error) {
      console.error('Error generating analytics summary:', error);
      return null;
    }
  }

  calculateAverageResponseTime(analytics) {
    const responses = analytics.filter(e => e.event === CONFIG.ANALYTICS.RESPONSE_RECEIVED && e.responseTime);
    if (responses.length === 0) return 0;
    const total = responses.reduce((sum, e) => sum + e.responseTime, 0);
    return Math.round(total / responses.length);
  }

  getLanguageDistribution(analytics) {
    const distribution = {};
    analytics.forEach(e => {
      if (e.language) {
        distribution[e.language] = (distribution[e.language] || 0) + 1;
      }
    });
    return distribution;
  }

  getTopIssueTypes(analytics) {
    const issueTypes = {};
    analytics.forEach(e => {
      if (e.context && e.context.issueType) {
        issueTypes[e.context.issueType] = (issueTypes[e.context.issueType] || 0) + 1;
      }
    });
    return Object.entries(issueTypes)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type, count]) => ({ type, count }));
  }
}

// Create singleton instance
const aiService = new AIService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIService;
}
