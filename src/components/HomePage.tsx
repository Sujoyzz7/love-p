import React, { useState, useEffect } from 'react';
import { calculateCompatibility, type CompatibilityResult } from '../utils/loveAlgorithms';
import { getRandomPrediction } from '../utils/predictions';
import { ParticleBackground } from './ParticleBackground';

export const HomePage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [quickName1, setQuickName1] = useState('');
  const [quickName2, setQuickName2] = useState('');
  const [quickResult, setQuickResult] = useState<number | null>(null);
  const [dailyPrediction, setDailyPrediction] = useState<string>('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const prediction = getRandomPrediction('fortune');
    setDailyPrediction(prediction.text);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
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
      color: 'from-pink-500 to-rose-600',
      gradient: 'hover:from-pink-400 hover:to-rose-500'
    },
    {
      id: 'fortune',
      title: 'Fortune Teller',
      description: 'Get mystical insights about your romantic future',
      icon: '🔮',
      color: 'from-purple-500 to-indigo-600',
      gradient: 'hover:from-purple-400 hover:to-indigo-500'
    },
    {
      id: 'horoscope',
      title: 'Love Horoscope',
      description: 'Daily astrological guidance for your relationship',
      icon: '🌙',
      color: 'from-blue-500 to-cyan-600',
      gradient: 'hover:from-blue-400 hover:to-cyan-500'
    },
    {
      id: 'quiz',
      title: 'Couple Quiz',
      description: 'Fun quizzes to understand your relationship better',
      icon: '📝',
      color: 'from-green-500 to-teal-600',
      gradient: 'hover:from-green-400 hover:to-teal-500'
    }
  ];

  const floatingHearts = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${15 + Math.random() * 10}s`
  }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 overflow-hidden">
        <div className="mystical-bg min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"></div>
          
          {/* Floating Hearts */}
          {floatingHearts.map((heart) => (
            <div
              key={heart.id}
              className="absolute text-4xl animate-pulse-slow pointer-events-none"
              style={{
                left: heart.left,
                top: '-50px',
                animation: `float ${heart.animationDuration} ease-in-out infinite`,
                animationDelay: heart.animationDelay
              }}
            >
              💖
            </div>
          ))}

          <div className="relative z-20 max-w-6xl mx-auto px-4 py-20 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 font-script animate-float">
              <span className="text-gradient">Discover Your Love Story</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-16 max-w-4xl mx-auto leading-relaxed animate-slide-up">
              Unlock the mysteries of your relationship with our mystical love predictions and compatibility insights
            </p>
            
            {/* Quick Compatibility Checker */}
            <div className="max-w-3xl mx-auto mb-16 animate-bounce-in">
              <div className="glass-morphism rounded-3xl p-8 backdrop-blur-xl border border-white/30 shadow-2xl hover-lift">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 font-script sparkle">
                  ✨ Quick Compatibility Check ✨
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <input
                      type="text"
                      placeholder="First name"
                      value={quickName1}
                      onChange={(e) => setQuickName1(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 text-lg"
                    />
                  </div>
                  
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <input
                      type="text"
                      placeholder="Second name"
                      value={quickName2}
                      onChange={(e) => setQuickName2(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-400/30 transition-all duration-300 text-lg"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleQuickCheck}
                  className="w-full md:w-auto button-primary px-12 py-4 text-white font-bold rounded-2xl text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="flex items-center justify-center">
                    <span className="mr-3">💕</span>
                    Check Compatibility
                  </span>
                </button>
                
                {quickResult && (
                  <div className="mt-6 text-center animate-fade-in">
                    <div className="text-4xl md:text-5xl font-bold text-white mb-2 animate-glow">
                      {quickResult}% Compatible!
                    </div>
                    <button
                      onClick={() => onNavigate('compatibility')}
                      className="text-white/80 hover:text-white underline text-lg transition-colors duration-300"
                    >
                      Get detailed analysis →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Prediction */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-3xl p-10 text-center backdrop-blur-xl border border-white/30 shadow-2xl animate-slide-up">
            <div className="sparkle inline-block mb-6">
              <h3 className="text-3xl md:text-4xl font-bold text-white font-script">
                ✨ Today's Love Prediction ✨
              </h3>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl animate-shimmer"></div>
              <p className="relative text-2xl md:text-3xl text-white/95 italic leading-relaxed px-6 py-8">
                "{dailyPrediction}"
              </p>
            </div>
            
            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={() => onNavigate('fortune')}
                className="button-primary px-8 py-3 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <span className="flex items-center">
                  <span className="mr-2">🔮</span>
                  More Predictions
                </span>
              </button>
              
              <button
                onClick={() => onNavigate('horoscope')}
                className="px-8 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg transform hover:scale-105"
              >
                <span className="flex items-center">
                  <span className="mr-2">🌙</span>
                  Daily Horoscope
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16 font-script animate-float">
            Explore Your Love Journey
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className="group glass-morphism rounded-3xl p-8 text-left backdrop-blur-xl border border-white/20 hover-lift transition-all duration-500 transform hover:scale-105"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gradient transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>
                
                <div className="flex items-center text-white/60 group-hover:text-white transition-colors duration-300">
                  <span className="text-lg font-medium">Explore</span>
                  <span className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative z-10 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-3xl p-12 text-center backdrop-blur-xl border border-white/30 shadow-2xl animate-bounce-in">
            <div className="sparkle inline-block mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white font-script">
                Ready to Discover Your Love Destiny?
              </h2>
            </div>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 leading-relaxed">
              Join thousands of couples who've found deeper meaning in their relationships
            </p>
            
            <button
              onClick={() => onNavigate('compatibility')}
              className="button-primary px-16 py-6 text-white font-bold rounded-full text-xl md:text-2xl shadow-2xl transform hover:scale-110 transition-all duration-300 animate-glow"
            >
              <span className="flex items-center">
                <span className="mr-3">💖</span>
                Start Your Journey
              </span>
            </button>
            
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/70">Happy Couples</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">50K+</div>
                <div className="text-white/70">Predictions Made</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">98%</div>
                <div className="text-white/70">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
