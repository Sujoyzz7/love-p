import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { CompatibilityCalculator } from './components/CompatibilityCalculator';
import { FortuneTeller } from './components/FortuneTeller';
import { LoveHoroscope } from './components/LoveHoroscope';
import { CoupleQuiz } from './components/CoupleQuiz';

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
    <div className="min-h-screen romantic-gradient">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="pb-16">
        {renderPage()}
      </main>
      
      <footer className="glass-morphism mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center text-white/80">
            <p className="mb-2">💖 Made with love for couples everywhere 💖</p>
            <p className="text-sm">© 2024 Love Predictions. Discover your destiny together.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
