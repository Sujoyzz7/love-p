import React, { useState } from 'react';
import { calculateCompatibility, type CompatibilityResult } from '../utils/loveAlgorithms';

interface CompatibilityCalculatorProps {
  onResult?: (result: CompatibilityResult) => void;
}

export const CompatibilityCalculator: React.FC<CompatibilityCalculatorProps> = ({ onResult }) => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [birthdate1, setBirthdate1] = useState('');
  const [birthdate2, setBirthdate2] = useState('');
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (!name1.trim() || !name2.trim()) {
      alert('Please enter both names');
      return;
    }

    setIsCalculating(true);
    
    setTimeout(() => {
      const compatibilityResult = calculateCompatibility(
        name1, 
        name2, 
        birthdate1 || undefined, 
        birthdate2 || undefined
      );
      
      setResult(compatibilityResult);
      setIsCalculating(false);
      onResult?.(compatibilityResult);
    }, 2000);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setBirthdate1('');
    setBirthdate2('');
    setResult(null);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-yellow-400';
    if (score >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Soulmates! 💑';
    if (score >= 80) return 'Perfect Match! 💕';
    if (score >= 70) return 'Great Connection! 💖';
    return 'Growing Love! 🌱';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 glass-morphism rounded-3xl animate-slide-up">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-script animate-float">
          Love Compatibility Calculator
        </h2>
        <div className="sparkle inline-block">
          <p className="text-white/80 text-lg">
            Discover the magical connection between two hearts
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center">
              <span className="mr-2">💕</span> First Name
            </label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300"
              placeholder="Enter first name"
            />
          </div>
          
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center">
              <span className="mr-2">🎂</span> Birth Date (Optional)
            </label>
            <input
              type="date"
              value={birthdate1}
              onChange={(e) => setBirthdate1(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300"
            />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center">
              <span className="mr-2">💕</span> Second Name
            </label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300"
              placeholder="Enter second name"
            />
          </div>
          
          <div className="transform transition-all duration-300 hover:scale-105">
            <label className="block text-white text-sm font-semibold mb-3 flex items-center">
              <span className="mr-2">🎂</span> Birth Date (Optional)
            </label>
            <input
              type="date"
              value={birthdate2}
              onChange={(e) => setBirthdate2(e.target.value)}
              className="w-full px-4 py-4 rounded-xl bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center mb-8">
        <button
          onClick={handleCalculate}
          disabled={isCalculating}
          className="button-primary px-10 py-4 text-white font-bold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl transform hover:scale-105 text-lg"
        >
          {isCalculating ? (
            <div className="flex items-center space-x-3">
              <div className="loading-spinner"></div>
              <span>Calculating Magic...</span>
            </div>
          ) : (
            <span className="flex items-center">
              <span className="mr-2">✨</span>
              Calculate Compatibility
            </span>
          )}
        </button>
        
        {result && (
          <button
            onClick={handleReset}
            className="px-10 py-4 bg-white/20 backdrop-blur text-white font-bold rounded-xl hover:bg-white/30 transition-all duration-300 border border-white/30 shadow-xl transform hover:scale-105 text-lg"
          >
            <span className="flex items-center">
              <span className="mr-2">🔄</span>
              Reset
            </span>
          </button>
        )}
      </div>
      
      {result && (
        <div className="mt-12 p-8 bg-white/10 backdrop-blur rounded-2xl border border-white/20 animate-bounce-in">
          <div className="text-center mb-8">
            <div className={`text-7xl font-bold mb-3 ${getScoreColor(result.score)} animate-glow`}>
              {result.score}%
            </div>
            <div className="text-2xl text-white font-semibold mb-2">
              {getScoreMessage(result.score)}
            </div>
            <div className="text-white/80">
              Compatibility Score
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="card-hover p-6 bg-white/10 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">👤</span> {name1}'s Personality
              </h4>
              <p className="text-white/90 leading-relaxed">
                {result.personality1}
              </p>
            </div>
            
            <div className="card-hover p-6 bg-white/10 rounded-xl">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">👤</span> {name2}'s Personality
              </h4>
              <p className="text-white/90 leading-relaxed">
                {result.personality2}
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">💪</span> Strengths as a Couple
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {result.strengths.map((strength, index) => (
                <div key={index} className="flex items-start p-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-lg border border-pink-400/30">
                  <span className="text-pink-300 mr-3 text-xl">•</span>
                  <span className="text-white/90">{strength}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
              <span className="mr-3">🌱</span> Growth Areas
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {result.growthAreas.map((area, index) => (
                <div key={index} className="flex items-start p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-400/30">
                  <span className="text-purple-300 mr-3 text-xl">•</span>
                  <span className="text-white/90">{area}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Our Love Compatibility',
                    text: `${name1} ❤️ ${name2} - ${result.score}% Compatible! ${getScoreMessage(result.score)}`,
                  });
                } else {
                  navigator.clipboard.writeText(`${name1} ❤️ ${name2} - ${result.score}% Compatible!`);
                  alert('Compatibility result copied to clipboard!');
                }
              }}
              className="button-primary px-8 py-3 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <span className="flex items-center">
                <span className="mr-2">📤</span>
                Share Result
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
