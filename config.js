// Configuration for Teacher Coaching Tool
const CONFIG = {
  // API Configuration
  API: {
    GEMINI_ENDPOINT: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
    // User needs to add their API key here
    // Get free API key from: https://makersuite.google.com/app/apikey
    GEMINI_API_KEY: 'AIzaSyDixdeq_tAs37GVEC5t58I_GEnKsSb7UHI',
    TIMEOUT: 30000, // 30 seconds
    MAX_RETRIES: 3
  },

  // Supported Languages
  LANGUAGES: {
    en: { name: 'English', code: 'en-US' },
    hi: { name: 'हिंदी', code: 'hi-IN' },
    bn: { name: 'বাংলা', code: 'bn-IN' },
    te: { name: 'తెలుగు', code: 'te-IN' },
    mr: { name: 'मराठी', code: 'mr-IN' },
    ta: { name: 'தமிழ்', code: 'ta-IN' },
    gu: { name: 'ગુજરાતી', code: 'gu-IN' },
    kn: { name: 'ಕನ್ನಡ', code: 'kn-IN' },
    or: { name: 'ଓଡ଼ିଆ', code: 'or-IN' }
  },

  // Cache Settings
  CACHE: {
    ENABLED: true,
    MAX_ITEMS: 100,
    EXPIRY_DAYS: 7,
    DB_NAME: 'TeacherCoachingDB',
    DB_VERSION: 1,
    STORE_NAME: 'responses'
  },

  // Feature Flags
  FEATURES: {
    VOICE_INPUT: true,
    OFFLINE_MODE: true,
    MICRO_LEARNING: true,
    ANALYTICS: true,
    DARK_MODE: true
  },

  // UI Settings
  UI: {
    MAX_QUERY_LENGTH: 500,
    RESPONSE_ANIMATION_DURATION: 300,
    TOAST_DURATION: 3000,
    AUTO_SCROLL: true
  },

  // Classroom Context Options
  CONTEXT: {
    GRADES: ['Pre-Primary', 'Class 1-2', 'Class 3-5', 'Class 6-8', 'Class 9-10', 'Class 11-12'],
    SUBJECTS: ['Mathematics', 'Science', 'English', 'Hindi', 'Social Studies', 'Languages', 'General'],
    CLASSROOM_TYPES: ['Single Grade', 'Multi-Grade', 'Mixed Ability', 'Large Class (40+)', 'Small Class (<20)'],
    ISSUE_TYPES: ['Classroom Management', 'Concept Explanation', 'Student Engagement', 'Assessment', 'Differentiation', 'Resource Constraints']
  },

  // Analytics Events
  ANALYTICS: {
    QUERY_SUBMITTED: 'query_submitted',
    RESPONSE_RECEIVED: 'response_received',
    VOICE_USED: 'voice_input_used',
    OFFLINE_QUERY: 'offline_query_queued',
    FEEDBACK_GIVEN: 'feedback_submitted',
    MICRO_LEARNING_ACCESSED: 'micro_learning_viewed'
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
