import React, { useState, useEffect } from 'react';
import { getZodiacSign } from '../utils/loveAlgorithms';
import { getDailyHoroscope, getLuckyDay, getLoveEmoji, type Prediction } from '../utils/predictions';

export const LoveHoroscope: React.FC = () => {
  const [selectedSign, setSelectedSign] = useState<string>('');
  const [partnerSign, setPartnerSign] = useState<string>('');
  const [birthdate1, setBirthdate1] = useState('');
  const [birthdate2, setBirthdate2] = useState('');
  const [horoscope, setHoroscope] = useState<Prediction | null>(null);
  const [partnerHoroscope, setPartnerHoroscope] = useState<Prediction | null>(null);
  const [luckyDay, setLuckyDay] = useState<string>('');
  const [loveEmoji, setLoveEmoji] = useState<string>('');

  const zodiacSigns = [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ];

  const zodiacDates: { [key: string]: string } = {
    'Aries': 'Mar 21 - Apr 19',
    'Taurus': 'Apr 20 - May 20',
    'Gemini': 'May 21 - Jun 20',
    'Cancer': 'Jun 21 - Jul 22',
    'Leo': 'Jul 23 - Aug 22',
    'Virgo': 'Aug 23 - Sep 22',
    'Libra': 'Sep 23 - Oct 22',
    'Scorpio': 'Oct 23 - Nov 21',
    'Sagittarius': 'Nov 22 - Dec 21',
    'Capricorn': 'Dec 22 - Jan 19',
    'Aquarius': 'Jan 20 - Feb 18',
    'Pisces': 'Feb 19 - Mar 20'
  };

  const zodiacEmojis: { [key: string]: string } = {
    'Aries': '♈',
    'Taurus': '♉',
    'Gemini': '♊',
    'Cancer': '♋',
    'Leo': '♌',
    'Virgo': '♍',
    'Libra': '♎',
    'Scorpio': '♏',
    'Sagittarius': '♐',
    'Capricorn': '♑',
    'Aquarius': '♒',
    'Pisces': '♓'
  };

  useEffect(() => {
    setLuckyDay(getLuckyDay());
    setLoveEmoji(getLoveEmoji());
  }, []);

  const handleBirthdateChange = (date: string, person: 1 | 2) => {
    if (person === 1) {
      setBirthdate1(date);
      const sign = getZodiacSign(date);
      if (sign) {
        setSelectedSign(sign.name);
      }
    } else {
      setBirthdate2(date);
      const sign = getZodiacSign(date);
      if (sign) {
        setPartnerSign(sign.name);
      }
    }
  };

  const getHoroscope = () => {
    if (selectedSign) {
      setHoroscope(getDailyHoroscope(selectedSign));
    }
    if (partnerSign) {
      setPartnerHoroscope(getDailyHoroscope(partnerSign));
    }
  };

  const getRecommendedActivity = (sign: string): string => {
    const activities: { [key: string]: string } = {
      'Aries': 'Try something adventurous together',
      'Taurus': 'Cook a romantic meal at home',
      'Gemini': 'Have deep conversations over coffee',
      'Cancer': 'Create a cozy movie night',
      'Leo': 'Go out and be the center of attention',
      'Virgo': 'Plan a detailed date together',
      'Libra': 'Visit an art gallery or concert',
      'Scorpio': 'Have an intimate, deep conversation',
      'Sagittarius': 'Plan a spontaneous trip',
      'Capricorn': 'Work on a shared goal',
      'Aquarius': 'Try something unique and unconventional',
      'Pisces': 'Get creative with art or music'
    };
    return activities[sign] || 'Spend quality time together';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 glass-morphism rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 font-script text-white">
        Daily Love Horoscope
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Your Sign</h3>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Enter your birth date
            </label>
            <input
              type="date"
              value={birthdate1}
              onChange={(e) => handleBirthdateChange(e.target.value, 1)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white/60"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Or select your sign
            </label>
            <select
              value={selectedSign}
              onChange={(e) => setSelectedSign(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white/60"
            >
              <option value="">Select your sign</option>
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>
                  {zodiacEmojis[sign]} {sign} ({zodiacDates[sign]})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Partner's Sign</h3>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Enter partner's birth date
            </label>
            <input
              type="date"
              value={birthdate2}
              onChange={(e) => handleBirthdateChange(e.target.value, 2)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white/60"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Or select partner's sign
            </label>
            <select
              value={partnerSign}
              onChange={(e) => setPartnerSign(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white/60"
            >
              <option value="">Select partner's sign</option>
              {zodiacSigns.map(sign => (
                <option key={sign} value={sign}>
                  {zodiacEmojis[sign]} {sign} ({zodiacDates[sign]})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <button
          onClick={getHoroscope}
          disabled={!selectedSign}
          className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          Get Daily Horoscope
        </button>
      </div>
      
      {(horoscope || partnerHoroscope) && (
        <div className="space-y-6 animate-fade-in">
          {horoscope && (
            <div className="p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{zodiacEmojis[selectedSign]}</span>
                <div>
                  <h4 className="text-xl font-semibold text-white">{selectedSign}</h4>
                  <p className="text-white/70 text-sm">Your Love Horoscope</p>
                </div>
              </div>
              <p className="text-white/90 mb-4">{horoscope.text}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 mb-1">Lucky Day</p>
                  <p className="text-white font-semibold">{luckyDay}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 mb-1">Recommended Activity</p>
                  <p className="text-white font-semibold">{getRecommendedActivity(selectedSign)}</p>
                </div>
              </div>
            </div>
          )}
          
          {partnerHoroscope && (
            <div className="p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{zodiacEmojis[partnerSign]}</span>
                <div>
                  <h4 className="text-xl font-semibold text-white">{partnerSign}</h4>
                  <p className="text-white/70 text-sm">Partner's Love Horoscope</p>
                </div>
              </div>
              <p className="text-white/90 mb-4">{partnerHoroscope.text}</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 mb-1">Lucky Day</p>
                  <p className="text-white font-semibold">{luckyDay}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/70 mb-1">Recommended Activity</p>
                  <p className="text-white font-semibold">{getRecommendedActivity(partnerSign)}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-white/20">
            <p className="text-white/80 text-sm mb-2">Today's Love Energy</p>
            <div className="text-4xl">{loveEmoji}</div>
          </div>
        </div>
      )}
    </div>
  );
};
