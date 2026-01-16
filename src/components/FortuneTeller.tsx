import React, { useState } from 'react';
import { getRandomPrediction, type Prediction } from '../utils/predictions';

export const FortuneTeller: React.FC = () => {
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('fortune');

  const categories = [
    { id: 'fortune', label: "What's next for us?", icon: '✨' },
    { id: 'dateIdeas', label: 'Date night idea', icon: '💝' },
    { id: 'loveLanguages', label: 'Our love language today', icon: '💖' },
    { id: 'milestones', label: 'Adventure prediction', icon: '🌟' },
    { id: 'compliments', label: 'Love message', icon: '💕' }
  ];

  const handleReveal = () => {
    setIsRevealing(true);
    setPrediction(null);
    
    setTimeout(() => {
      const newPrediction = getRandomPrediction(selectedCategory as 'fortune' | 'dateIdeas' | 'milestones' | 'compliments' | 'loveLanguages');
      setPrediction(newPrediction);
      setIsRevealing(false);
    }, 2000);
  };

  const handleReset = () => {
    setPrediction(null);
    setIsRevealing(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 glass-morphism rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 font-script text-white">
        Mystical Fortune Teller
      </h2>
      
      <div className="mb-8">
        <p className="text-white/80 text-center mb-6">
          Choose your question and reveal what the universe has in store for your love story
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                handleReset();
              }}
              className={`p-3 rounded-lg border transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-white/20 border-white/60 text-white'
                  : 'bg-white/10 border-white/30 text-white/70 hover:bg-white/15 hover:text-white'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-xs font-medium">{category.label}</div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mb-8">
        <button
          onClick={handleReveal}
          disabled={isRevealing}
          className="relative px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl transform hover:scale-105"
        >
          {isRevealing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Consulting the stars...</span>
            </div>
          ) : (
            <span className="text-lg">Reveal Your Fortune</span>
          )}
        </button>
      </div>
      
      {isRevealing && (
        <div className="text-center py-12">
          <div className="inline-block animate-pulse-slow">
            <div className="text-6xl mb-4">🔮</div>
            <div className="text-white/60 animate-sparkle">The universe is speaking...</div>
          </div>
        </div>
      )}
      
      {prediction && !isRevealing && (
        <div className="animate-fade-in">
          <div className="text-center p-8 bg-white/10 backdrop-blur rounded-xl border border-white/20">
            <div className="text-4xl mb-4">{prediction.emoji}</div>
            <p className="text-xl text-white font-medium mb-4 leading-relaxed">
              {prediction.text}
            </p>
            
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleReveal}
                className="px-6 py-2 bg-white/20 backdrop-blur text-white font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Another Fortune
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
                className="px-6 py-2 bg-white/20 backdrop-blur text-white font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          ✨ Remember: The universe guides, but your hearts decide ✨
        </p>
      </div>
    </div>
  );
};
