export interface CompatibilityResult {
  score: number;
  personality1: string;
  personality2: string;
  strengths: string[];
  growthAreas: string[];
}

export interface ZodiacSign {
  name: string;
  element: string;
  dates: string[];
}

const zodiacSigns: ZodiacSign[] = [
  { name: 'Aries', element: 'Fire', dates: ['03-21', '04-19'] },
  { name: 'Taurus', element: 'Earth', dates: ['04-20', '05-20'] },
  { name: 'Gemini', element: 'Air', dates: ['05-21', '06-20'] },
  { name: 'Cancer', element: 'Water', dates: ['06-21', '07-22'] },
  { name: 'Leo', element: 'Fire', dates: ['07-23', '08-22'] },
  { name: 'Virgo', element: 'Earth', dates: ['08-23', '09-22'] },
  { name: 'Libra', element: 'Air', dates: ['09-23', '10-22'] },
  { name: 'Scorpio', element: 'Water', dates: ['10-23', '11-21'] },
  { name: 'Sagittarius', element: 'Fire', dates: ['11-22', '12-21'] },
  { name: 'Capricorn', element: 'Earth', dates: ['12-22', '01-19'] },
  { name: 'Aquarius', element: 'Air', dates: ['01-20', '02-18'] },
  { name: 'Pisces', element: 'Water', dates: ['02-19', '03-20'] }
];

const zodiacCompatibility: { [key: string]: number } = {
  'Fire-Fire': 95,
  'Fire-Earth': 65,
  'Fire-Air': 85,
  'Fire-Water': 55,
  'Earth-Earth': 90,
  'Earth-Air': 70,
  'Earth-Water': 80,
  'Air-Air': 88,
  'Air-Water': 60,
  'Water-Water': 92
};

const personalityTraits = {
  Fire: ['Passionate', 'Energetic', 'Bold', 'Adventurous'],
  Earth: ['Grounded', 'Practical', 'Loyal', 'Patient'],
  Air: ['Intellectual', 'Social', 'Communicative', 'Curious'],
  Water: ['Emotional', 'Intuitive', 'Caring', 'Deep']
};

const coupleStrengths = {
  'Fire-Fire': ['Unmatched passion', 'Shared adventures', 'Mutual motivation'],
  'Earth-Earth': ['Stability and security', 'Shared values', 'Long-term commitment'],
  'Air-Air': ['Intellectual connection', 'Great communication', 'Social harmony'],
  'Water-Water': ['Deep emotional bond', 'Intuitive understanding', 'Mutual support'],
  'Fire-Earth': ['Balance of passion and stability', 'Complementary strengths'],
  'Fire-Air': ['Exciting social life', 'Inspiring conversations', 'Dynamic energy'],
  'Fire-Water': ['Intense emotional connection', 'Passionate depth'],
  'Earth-Air': ['Practical dreams', 'Stable communication', 'Balanced approach'],
  'Earth-Water': ['Emotional security', 'Nurturing support', 'Deep commitment'],
  'Air-Water': ['Emotional intelligence', 'Deep conversations', 'Creative partnership']
};

const growthAreas = {
  'Fire-Fire': ['Learning to compromise', 'Patience with each other', 'Emotional regulation'],
  'Earth-Earth': ['Spontaneity and adventure', 'Emotional expression', 'Trying new things'],
  'Air-Air': ['Emotional depth', 'Making decisions', 'Following through'],
  'Water-Water': ['Setting boundaries', 'Practical planning', 'Independence'],
  'Fire-Earth': ['Understanding different paces', 'Balancing spontaneity with planning'],
  'Fire-Air': ['Emotional vulnerability', 'Consistency in actions'],
  'Fire-Water': ['Balancing intensity with calm', 'Practical decision making'],
  'Earth-Air': ['Emotional expression', 'Spontaneous actions'],
  'Earth-Water': ['Emotional boundaries', 'Flexibility in plans'],
  'Air-Water': ['Practical application of ideas', 'Emotional consistency']
};

export function getZodiacSign(birthdate: string): ZodiacSign | null {
  const date = new Date(birthdate);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const monthDay = `${month}-${day}`;
  
  for (const sign of zodiacSigns) {
    if (monthDay >= sign.dates[0] && monthDay <= sign.dates[1]) {
      return sign;
    }
  }
  
  // Handle Capricorn year wrap-around
  if (monthDay >= '12-22' || monthDay <= '01-19') {
    return zodiacSigns.find(s => s.name === 'Capricorn') || null;
  }
  
  return null;
}

export function calculateNameCompatibility(name1: string, name2: string): number {
  const cleanName1 = name1.toLowerCase().replace(/[^a-z]/g, '');
  const cleanName2 = name2.toLowerCase().replace(/[^a-z]/g, '');
  
  // Letter numerology
  const getNameValue = (name: string) => {
    return name.split('').reduce((sum, letter) => {
      return sum + (letter.charCodeAt(0) - 96);
    }, 0);
  };
  
  const value1 = getNameValue(cleanName1);
  const value2 = getNameValue(cleanName2);
  
  // Common letters bonus
  const commonLetters = new Set(cleanName1).intersection(new Set(cleanName2));
  const commonBonus = commonLetters.size * 2;
  
  // Length compatibility
  const lengthDiff = Math.abs(cleanName1.length - cleanName2.length);
  const lengthPenalty = lengthDiff * 3;
  
  // Calculate base score
  let score = 50;
  score += Math.min((value1 + value2) % 50, 25);
  score += commonBonus;
  score -= lengthPenalty;
  
  return Math.max(60, Math.min(99, score));
}

export function calculateZodiacCompatibility(sign1: ZodiacSign, sign2: ZodiacSign): number {
  const key1 = `${sign1.element}-${sign2.element}`;
  const key2 = `${sign2.element}-${sign1.element}`;
  
  return zodiacCompatibility[key1] || zodiacCompatibility[key2] || 75;
}

export function calculateCompatibility(
  name1: string, 
  name2: string, 
  birthdate1?: string, 
  birthdate2?: string
): CompatibilityResult {
  const nameScore = calculateNameCompatibility(name1, name2);
  
  let zodiacScore = 0;
  let sign1: ZodiacSign | null = null;
  let sign2: ZodiacSign | null = null;
  
  if (birthdate1 && birthdate2) {
    sign1 = getZodiacSign(birthdate1);
    sign2 = getZodiacSign(birthdate2);
    
    if (sign1 && sign2) {
      zodiacScore = calculateZodiacCompatibility(sign1, sign2);
    }
  }
  
  // Calculate final score
  const finalScore = zodiacScore > 0 
    ? Math.round((nameScore * 0.6) + (zodiacScore * 0.4))
    : nameScore;
  
  // Get personality traits
  const personality1 = sign1 
    ? personalityTraits[sign1.element as keyof typeof personalityTraits].join(', ')
    : 'Creative, Unique, Special';
  
  const personality2 = sign2 
    ? personalityTraits[sign2.element as keyof typeof personalityTraits].join(', ')
    : 'Creative, Unique, Special';
  
  // Get strengths and growth areas
  const elementKey = sign1 && sign2 
    ? `${sign1.element}-${sign2.element}` as keyof typeof coupleStrengths
    : null;
  
  const strengths = elementKey && coupleStrengths[elementKey] 
    ? coupleStrengths[elementKey]
    : ['Mutual understanding', 'Shared laughter', 'Growing together'];
  
  const growth = elementKey && growthAreas[elementKey]
    ? growthAreas[elementKey]
    : ['Communication', 'Patience', 'Understanding'];
  
  return {
    score: finalScore,
    personality1,
    personality2,
    strengths,
    growthAreas: growth
  };
}
