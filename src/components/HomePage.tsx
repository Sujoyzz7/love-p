import React, { useState } from 'react';
import { calculateCompatibility, type CompatibilityResult } from '../utils/loveAlgorithms';
import { getRandomPrediction } from '../utils/predictions';

export const HomePage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [quickName1, setQuickName1] = useState('');
  const [quickName2, setQuickName2] = useState('');
  const [quickResult, setQuickResult] = useState<number | null>(null);
  const [dailyPrediction, setDailyPrediction] = useState<string>('');

  React.useEffect(() => {
    const prediction = getRandomPrediction('fortune');
    setDailyPrediction(prediction.text);
  }, []);

  const handleQuickCheck = () => {
    if (quickName1.trim() && quickName2.trim()) {
      const result = calculateCompatibility(quickName1, quickName2);
      setQuickResult(result.score);
    }
  };

  const features = [
    {
      id: 'compatibility',
      title: 'Compatibility Calculator',
      description: 'Discover your love compatibility with detailed personality analysis',
      icon: '💕',
      color: 'from-pink-500 to-rose-600'
    },
    {
      id: 'fortune',
      title: 'Fortune Teller',
      description: 'Get mystical insights about your romantic future',
      icon: '🔮',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'horoscope',
      title: 'Love Horoscope',
      description: 'Daily astrological guidance for your relationship',
      icon: '🌙',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'quiz',
      title: 'Couple Quiz',
      description: 'Fun quizzes to understand your relationship better',
      icon: '📝',
      color: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 romantic-gradient opacity-90"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-script animate-float">
            Discover Your Love Story
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Unlock the mysteries of your relationship with our mystical love predictions and compatibility insights
          </p>
          
          {/* Quick Compatibility Checker */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="glass-morphism rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-6 font-script">
                Quick Compatibility Check
              </h3>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                  type="text"
                  placeholder="First name"
                  value={quickName1}
                  onChange={(e) => setQuickName1(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white/60"
                />
                <input
                  type="text"
                  placeholder="Second name"
                  value={quickName2}
                  onChange={(e) => setQuickName2(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white/60"
                />
              </div>
              
              <button
                onClick={handleQuickCheck}
                className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Check Compatibility
              </button>
              
              {quickResult && (
                <div className="mt-6 text-center animate-fade-in">
                  <div className="text-4xl font-bold text-white mb-2">
                    {quickResult}% Compatible!
                  </div>
                  <button
                    onClick={() => onNavigate('compatibility')}
                    className="text-white/80 hover:text-white underline text-sm"
                  >
                    Get detailed analysis →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Daily Prediction */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-semibold text-white mb-4 font-script">
              ✨ Today's Love Prediction ✨
            </h3>
            <p className="text-xl text-white/90 italic">
              "{dailyPrediction}"
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12 font-script">
            Explore Your Love Journey
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className="group glass-morphism rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 text-left"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-white/70 text-sm">
                  {feature.description}
                </p>
                <div className="mt-4 text-white/60 text-sm flex items-center group-hover:text-white transition-colors">
                  Explore →
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-morphism rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4 font-script">
              Ready to Discover Your Love Destiny?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Join thousands of couples who've found deeper meaning in their relationships
            </p>
            <button
              onClick={() => onNavigate('compatibility')}
              className="px-12 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-xl transform hover:scale-105"
            >
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
