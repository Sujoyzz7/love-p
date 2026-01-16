import React from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'compatibility', label: 'Compatibility', icon: '💕' },
    { id: 'fortune', label: 'Fortune Teller', icon: '🔮' },
    { id: 'horoscope', label: 'Horoscope', icon: '🌙' },
    { id: 'quiz', label: 'Quiz', icon: '📝' }
  ];

  return (
    <nav className="glass-morphism sticky top-0 z-50 backdrop-blur-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">💖</span>
            <span className="text-xl font-bold text-white font-script">Love Predictions</span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                  currentPage === item.id
                    ? 'bg-white/20 text-white border border-white/40'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          <div className="md:hidden">
            <select
              value={currentPage}
              onChange={(e) => onPageChange(e.target.value)}
              className="bg-white/20 backdrop-blur text-white border border-white/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-white/60"
            >
              {navItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.icon} {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};
