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
    }, 1500);
  };

  const handleReset = () => {
    setName1('');
    setName2('');
    setBirthdate1('');
    setBirthdate2('');
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 glass-morphism rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 font-script text-white">
        Love Compatibility Calculator
      </h2>
      
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white/60"
                placeholder="Enter first name"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Birth Date (Optional)
              </label>
              <input
                type="date"
                value={birthdate1}
                onChange={(e) => setBirthdate1(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white/60"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Second Name
              </label>
              <input
                type="text"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/70 border border-white/30 focus:outline-none focus:border-white/60"
                placeholder="Enter second name"
              />
            </div>
            
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Birth Date (Optional)
              </label>
              <input
                type="date"
                value={birthdate2}
                onChange={(e) => setBirthdate2(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white border border-white/30 focus:outline-none focus:border-white/60"
              />
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {isCalculating ? 'Calculating...' : 'Calculate Compatibility'}
          </button>
          
          {result && (
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-white/20 backdrop-blur text-white font-semibold rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      {result && (
        <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20 animate-fade-in">
          <div className="text-center mb-6">
            <div className="text-6xl font-bold text-white mb-2">
              {result.score}%
            </div>
            <div className="text-xl text-white/90">
              Compatibility Score
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-white font-semibold mb-2">
                {name1}'s Personality
              </h4>
              <p className="text-white/80 text-sm">
                {result.personality1}
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-2">
                {name2}'s Personality
              </h4>
              <p className="text-white/80 text-sm">
                {result.personality2}
              </p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3">
              💪 Strengths as a Couple
            </h4>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="text-white/80 text-sm flex items-start">
                  <span className="text-pink-300 mr-2">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-3">
              🌱 Growth Areas
            </h4>
            <ul className="space-y-2">
              {result.growthAreas.map((area, index) => (
                <li key={index} className="text-white/80 text-sm flex items-start">
                  <span className="text-purple-300 mr-2">•</span>
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
