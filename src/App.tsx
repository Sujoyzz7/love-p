import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CompatibilityCalculator } from './components/CompatibilityCalculator';
import { FortuneTeller } from './components/FortuneTeller';
import { LoveHoroscope } from './components/LoveHoroscope';
import { CoupleQuiz } from './components/CoupleQuiz';
import { ParticleBackground } from './components/ParticleBackground';

function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'compatibility':
        return <CompatibilityCalculator />;
      case 'fortune':
        return <FortuneTeller />;
      case 'horoscope':
        return <LoveHoroscope />;
      case 'quiz':
        return <CoupleQuiz />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="pb-16">
          {renderPage()}
        </main>
        
        <footer className="glass-morphism mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center text-white/80">
              <p className="mb-2 flex items-center justify-center">
                <span className="text-2xl mr-2">💖</span>
                Made with love for couples everywhere
                <span className="text-2xl ml-2">💖</span>
              </p>
              <p className="text-sm">
                © 2024 Love Predictions. Discover your destiny together.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
