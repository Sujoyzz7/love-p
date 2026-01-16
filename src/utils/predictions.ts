export interface Prediction {
  text: string;
  category: string;
  emoji?: string;
}

const predictions = {
  fortune: [
    "You'll share an unforgettable laugh this week",
    "A surprise romantic gesture is coming your way",
    "Your love story will take an exciting new turn",
    "Destiny has something special planned for you both",
    "The stars align for a memorable moment together",
    "Your connection will grow stronger than ever",
    "Adventure and romance await around the corner",
    "Your hearts will beat as one in perfect harmony",
    "Love will blossom in unexpected places",
    "Your bond will inspire those around you"
  ],
  dateIdeas: [
    "Sunset picnic in the park",
    "Cooking a new recipe together",
    "Stargazing on a clear night",
    "Dancing in the living room",
    "Exploring a hidden café",
    "Building a blanket fort and watching movies",
    "Taking a spontaneous road trip",
    "Visiting an art gallery",
    "Having a game night marathon",
    "Writing letters to your future selves"
  ],
  milestones: [
    "A spontaneous road trip awaits",
    "You'll create a memory that lasts forever",
    "Your next chapter begins soon",
    "A meaningful conversation will change everything",
    "You'll discover something new about each other",
    "Your dreams will start aligning",
    "A special celebration is on the horizon",
    "You'll overcome a challenge together",
    "Your love story will inspire others",
    "The best is yet to come"
  ],
  compliments: [
    "Your partner admires your kindness",
    "They love the way you make them laugh",
    "Your strength inspires them daily",
    "They cherish your unique perspective",
    "Your presence brings them peace",
    "They're grateful for your patience",
    "Your creativity excites them",
    "They admire your determination",
    "Your smile brightens their world",
    "They love how you see the best in them"
  ],
  loveLanguages: [
    "Words of Affirmation - Speak from the heart today",
    "Quality Time - Disconnect to reconnect",
    "Acts of Service - Show love through action",
    "Physical Touch - A simple gesture means everything",
    "Gift Giving - It's the thought that counts",
    "Mixed Languages - Your love speaks in many ways",
    "Receiving Love - Open your heart to accept",
    "Giving Love - Share your abundance freely"
  ]
};

const horoscopePredictions = {
  Aries: [
    "Passion ignites in your relationship today",
    "Take the lead in planning something special",
    "Your boldness attracts love and admiration"
  ],
  Taurus: [
    "Stability brings deeper connection",
    "Sensual pleasures enhance your bond",
    "Patience in love brings sweet rewards"
  ],
  Gemini: [
    "Communication flows effortlessly",
    "Intellectual connection sparks romance",
    "Social energy brings you closer"
  ],
  Cancer: [
    "Emotional intimacy deepens today",
    "Home becomes your love sanctuary",
    "Nurturing gestures strengthen your bond"
  ],
  Leo: [
    "Your confidence is magnetic",
    "Romance takes center stage",
    "Generosity of heart attracts love"
  ],
  Virgo: [
    "Small acts of love mean everything",
    "Attention to detail shows you care",
    "Practical love builds lasting foundation"
  ],
  Libra: [
    "Harmony and balance bless your relationship",
    "Beauty surrounds your love story",
    "Partnership reaches new heights"
  ],
  Scorpio: [
    "Intense emotions deepen your connection",
    "Trust opens new doors of intimacy",
    "Transformation brings you closer"
  ],
  Sagittarius: [
    "Adventure calls you to explore together",
    "Freedom and love find perfect balance",
    "Optimism brightens your relationship"
  ],
  Capricorn: [
    "Commitment strengthens your bond",
    "Building a future together excites you",
    "Traditional values guide your love"
  ],
  Aquarius: [
    "Uniqueness makes your love special",
    "Friendship forms the foundation of romance",
    "Innovation brings fresh excitement"
  ],
  Pisces: [
    "Dreams and reality merge in love",
    "Intuition guides your heart perfectly",
    "Compassion creates deep connection"
  ]
};

export function getRandomPrediction(category: keyof typeof predictions): Prediction {
  const categoryPredictions = predictions[category];
  const randomIndex = Math.floor(Math.random() * categoryPredictions.length);
  
  const emojis = {
    fortune: '✨',
    dateIdeas: '💝',
    milestones: '🌟',
    compliments: '💕',
    loveLanguages: '💖'
  };
  
  return {
    text: categoryPredictions[randomIndex],
    category,
    emoji: emojis[category]
  };
}

export function getDailyHoroscope(sign: string): Prediction {
  const signPredictions = horoscopePredictions[sign as keyof typeof horoscopePredictions];
  if (!signPredictions) {
    return {
      text: "The stars have something special in store for you",
      category: "horoscope",
      emoji: "🌙"
    };
  }
  
  const randomIndex = Math.floor(Math.random() * signPredictions.length);
  
  return {
    text: signPredictions[randomIndex],
    category: "horoscope",
    emoji: "🌙"
  };
}

export function getLuckyDay(): string {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days[Math.floor(Math.random() * days.length)];
}

export function getLoveEmoji(): string {
  const emojis = ['💕', '💖', '💗', '💓', '💝', '💘', '💞', '💟', '❤️', '🧡', '💛', '💚', '💙', '💜', '🤍', '🤎'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}
