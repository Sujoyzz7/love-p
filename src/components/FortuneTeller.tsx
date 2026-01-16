import React, { useState, useEffect } from 'react';
import { getRandomPrediction, type Prediction } from '../utils/predictions';

export const FortuneTeller: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('fortune');
  const [crystalGlow, setCrystalGlow] = useState(false);
  const [mysticalParticles, setMysticalParticles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const categories = [
    { id: 'fortune', label: "What's next for us?", icon: '✨', color: 'from-pink-500 to-purple-600' },
    { id: 'dateIdeas', label: 'Date night idea', icon: '💝', color: 'from-rose-500 to-pink-600' },
    { id: 'loveLanguages', label: 'Our love language today', icon: '💖', color: 'from-purple-500 to-indigo-600' },
    { id: 'milestones', label: 'Adventure prediction', icon: '🌟', color: 'from-blue-500 to-cyan-600' },
    { id: 'compliments', label: 'Love message', icon: '💕', color: 'from-green-500 to-teal-600' }
  ];

  useEffect(() => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100
    }));
    setMysticalParticles(particles);
  }, []);

  const handleReveal = () => {
    setIsRevealing(true);
    setPrediction(null);
    setCrystalGlow(true);
    
    setTimeout(() => {
      const newPrediction = getRandomPrediction(selectedCategory as keyof typeof categories);
      setPrediction(newPrediction);
      setIsRevealing(false);
      setCrystalGlow(false);
    }, 3000);
  };

  const handleReset = () => {
    setPrediction(null);
    setIsRevealing(false);
    setCrystalGlow(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    handleReset();
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Mystical Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-indigo-900 opacity-50"></div>
      
      {/* Floating Mystical Particles */}
      {mysticalParticles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-pulse opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `float ${8 + particle.id * 0.5}s ease-in-out infinite`,
            animationDelay: `${particle.id * 0.3}s`
          }}
        ></div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 font-script animate-float">
            🔮 Mystical Fortune Teller 🔮
          </h2>
          <div className="sparkle inline-block">
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Choose your question and reveal what the universe has in store for your love story
            </p>
          </div>
        </div>
        
        {/* Category Selection */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`p-6 rounded-2xl border-2 transition-all duration-500 transform hover:scale-105 hover:rotate-3 ${
                  selectedCategory === category.id
                    ? 'bg-white/20 border-white/60 text-white shadow-2xl'
                    : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/15 hover:border-white/40'
                }`}
              >
                <div className="text-4xl mb-3 animate-bounce-in">{category.icon}</div>
                <div className="text-sm font-semibold leading-tight">{category.label}</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Crystal Ball */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            {/* Crystal Ball */}
            <div 
              className={`w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl transition-all duration-1000 ${
                crystalGlow ? 'animate-glow' : ''
              }`}
              style={{
                boxShadow: crystalGlow 
                  ? '0 0 60px rgba(147, 51, 234, 0.8), 0 0 100px rgba(255, 182, 193, 0.6), inset 0 0 40px rgba(255, 255, 255, 0.2)'
                  : '0 20px 60px rgba(0, 0, 0, 0.5)'
              }}
            >
              {/* Inner Crystal */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-full border border-white/20"></div>
                
                {/* Mystical Swirl */}
                {!isRevealing && !prediction && (
                  <div className="absolute inset-8 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-spin-slow">
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-300/30 to-pink-300/30"></div>
                  </div>
                )}
                
                {/* Revealing Effect */}
                {isRevealing && (
                  <div className="absolute inset-0 rounded-full animate-pulse">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-60 animate-spin"></div>
                  </div>
                )}
                
                {/* Prediction Result */}
                {prediction && !isRevealing && (
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-3xl md:text-4xl mb-2">{prediction.emoji}</div>
                      <p className="text-white text-sm md:text-base font-medium leading-relaxed">
                        {prediction.text}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Crystal Base */}
            <div className="w-32 h-8 md:w-40 md:h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full mx-auto -mt-4 shadow-xl"></div>
          </div>
        </div>
        
        {/* Reveal Button */}
        <div className="flex justify-center mb-12">
          <button
            onClick={handleReveal}
            disabled={isRevealing}
            className={`relative px-16 py-6 text-white font-bold rounded-full text-xl shadow-2xl transform transition-all duration-500 ${
              isRevealing 
                ? 'bg-gray-600 cursor-not-allowed scale-95' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 hover:scale-110 animate-glow'
            }`}
          >
            {isRevealing ? (
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 border-2 border-white/30 border-t-transparent rounded-full animate-spin"></div>
                <span>Consulting the stars...</span>
              </div>
            ) : (
              <span className="flex items-center">
                <span className="mr-3">✨</span>
                Reveal Your Fortune
              </span>
            )}
          </button>
        </div>
        
        {/* Mystical Fog Effect */}
        {isRevealing && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            <div className="absolute top-2/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-3/4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{ animationDelay: '1s' }}></div>
          </div>
        )}
        
        {/* Prediction Display */}
        {prediction && !isRevealing && (
          <div className="animate-bounce-in">
            <div className="max-w-3xl mx-auto p-10 glass-morphism rounded-3xl backdrop-blur-xl border border-white/30 shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-6 animate-float">{prediction.emoji}</div>
                <p className="text-2xl md:text-3xl text-white font-medium mb-8 leading-relaxed">
                  {prediction.text}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleReveal}
                    className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">🔄</span>
                      Another Fortune
                    </span>
                  </button>
                  
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'My Love Fortune',
                          text: `${prediction.emoji} ${prediction.text}`,
                        });
                      } else {
                        navigator.clipboard.writeText(`${prediction.emoji} ${prediction.text}`);
                        alert('Fortune copied to clipboard!');
                      }
                    }}
                    className="px-8 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-lg"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">📤</span>
                      Share
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <p className="text-white/60 text-sm animate-shimmer">
            ✨ Remember: The universe guides, but your hearts decide ✨
          </p>
        </div>
      </div>
    </div>
  );
};
