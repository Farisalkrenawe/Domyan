// Configuration constants for Domyan Luxury Architecture
export const CONFIG = {
  // Company Information
  COMPANY: {
    NAME: 'Domyan',
    FULL_NAME: 'Domyan Luxury Architecture',
    PHONE: '052-446-0770',
    EMAIL: 'ma89936@gmail.com',
    LOCATION: 'Rahat, Israel',
    FOUNDED: '2012',
    PROJECTS_COMPLETED: '50+',
    YEARS_EXPERIENCE: '12',
    EXCELLENCE_RANK: 'A+',
    CLIENT_SATISFACTION: '100%'
  },

  // Social Media Links
  SOCIAL: {
    WHATSAPP: 'https://wa.me/972524460770?text=Hello%20Domyan,%20I\'m%20interested%20in%20discussing%20a%20luxury%20architecture%20project',
    FACEBOOK: '#',
    INSTAGRAM: '#',
    TWITTER: '#',
    TIKTOK: '#'
  },

  // Performance Settings
  PERFORMANCE: {
    CAROUSEL_INTERVAL: 10000, // 10 seconds
    PROGRESS_UPDATE_INTERVAL: 100, // 100ms for smooth progress
    CURSOR_THROTTLE_DELAY: 16, // ~60fps
    ANIMATION_DURATION: {
      DEFAULT: 0.8,
      MOBILE: 0.3,
      LOW_END: 0.2
    }
  },

  // Image Settings
  IMAGES: {
    PLACEHOLDER: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
    FALLBACK: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    LAZY_LOAD_MARGIN: '50px',
    LAZY_LOAD_THRESHOLD: 0.1
  },

  // Form Validation
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MIN_NAME_LENGTH: 2,
    MIN_MESSAGE_LENGTH: 10
  },

  // Accessibility
  ACCESSIBILITY: {
    SKIP_NAV_ID: 'main-content',
    FOCUS_INDICATOR_WIDTH: '2px',
    HIGH_CONTRAST_FOCUS_WIDTH: '3px'
  },

  // Languages
  LANGUAGES: {
    ENGLISH: 'en',
    HEBREW: 'he',
    ARABIC: 'ar'
  },

  // Breakpoints
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280
  }
} as const;

// Export individual constants for easier imports
export const COMPANY_NAME = CONFIG.COMPANY.NAME;
export const COMPANY_PHONE = CONFIG.COMPANY.PHONE;
export const COMPANY_EMAIL = CONFIG.COMPANY.EMAIL;
export const COMPANY_LOCATION = CONFIG.COMPANY.LOCATION;
export const WHATSAPP_LINK = CONFIG.SOCIAL.WHATSAPP;
export const CAROUSEL_INTERVAL = CONFIG.PERFORMANCE.CAROUSEL_INTERVAL;
export const EMAIL_REGEX = CONFIG.VALIDATION.EMAIL_REGEX;
export const MOBILE_BREAKPOINT = CONFIG.BREAKPOINTS.MOBILE;
