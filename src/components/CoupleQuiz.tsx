import React, { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  scores: number[];
}

interface QuizResult {
  title: string;
  description: string;
  emoji: string;
  score: number;
}

const quizzes: { [key: string]: { title: string; questions: QuizQuestion[] } } = {
  'know-each-other': {
    title: 'How Well Do You Know Each Other?',
    questions: [
      {
        id: 1,
        question: "What's your partner's favorite way to relax?",
        options: ['Reading a book', 'Watching movies', 'Listening to music', 'Outdoor activities'],
        scores: [3, 2, 4, 1]
      },
      {
        id: 2,
        question: "What's your partner's dream vacation destination?",
        options: ['Tropical beach', 'European city', 'Mountain retreat', 'Adventure safari'],
        scores: [4, 2, 3, 1]
      },
      {
        id: 3,
        question: "What quality do they admire most in you?",
        options: ['Kindness', 'Intelligence', 'Humor', 'Ambition'],
        scores: [4, 3, 2, 1]
      },
      {
        id: 4,
        question: "How do they prefer to celebrate special occasions?",
        options: ['Intimate dinner', 'Big party with friends', 'Quiet weekend getaway', 'Thoughtful gifts'],
        scores: [3, 1, 4, 2]
      },
      {
        id: 5,
        question: "What's their love language?",
        options: ['Words of affirmation', 'Quality time', 'Physical touch', 'Acts of service'],
        scores: [2, 4, 3, 1]
      }
    ]
  },
  'couple-personality': {
    title: 'What\'s Your Couple Personality?',
    questions: [
      {
        id: 1,
        question: "How do you spend your weekends together?",
        options: ['Adventurous outings', 'Cozy nights in', 'Social events', 'Productive projects'],
        scores: [4, 2, 3, 1]
      },
      {
        id: 2,
        question: "How do you handle disagreements?",
        options: ['Talk it through immediately', 'Take space then discuss', 'Use humor', 'Write it out'],
        scores: [3, 2, 4, 1]
      },
      {
        id: 3,
        question: "What's your ideal date night?",
        options: ['Trying new restaurants', 'Movie marathon', 'Dancing the night away', 'Quiet conversation'],
        scores: [2, 3, 4, 1]
      },
      {
        id: 4,
        question: "How do you show affection?",
        options: ['Constant physical touch', 'Thoughtful surprises', 'Deep conversations', 'Shared experiences'],
        scores: [4, 2, 3, 1]
      },
      {
        id: 5,
        question: "What describes your relationship goals?",
        options: ['Build an empire together', 'Create a peaceful home', 'Explore the world', 'Grow individually and together'],
        scores: [1, 2, 4, 3]
      }
    ]
  }
};

const results: { [key: string]: QuizResult[] } = {
  'know-each-other': [
    {
      title: 'Soulmates!',
      description: 'You know each other inside and out. Your connection is deep and intuitive.',
      emoji: '💑',
      score: 15
    },
    {
      title: 'Perfect Match!',
      description: 'You understand each other remarkably well. Keep nurturing this beautiful connection.',
      emoji: '💕',
      score: 12
    },
    {
      title: 'Growing Together!',
      description: 'You have a good foundation and there\'s always more to discover about each other.',
      emoji: '🌱',
      score: 8
    },
    {
      title: 'Room to Grow!',
      description: 'Every relationship is a journey. Keep learning and exploring together!',
      emoji: '🌟',
      score: 0
    }
  ],
  'couple-personality': [
    {
      title: 'The Power Couple',
      description: 'Ambitious, driven, and unstoppable together. You\'re building an empire of love.',
      emoji: '👑',
      score: 15
    },
    {
      title: 'The Adventurers',
      description: 'Spontaneous, fun-loving, and always seeking new experiences together.',
      emoji: '🗺️',
      score: 12
    },
    {
      title: 'The Comfort Zone',
      description: 'Cozy, nurturing, and creating a beautiful sanctuary of love.',
      emoji: '🏠',
      score: 8
    },
    {
      title: 'The Free Spirits',
      description: 'Independent yet connected, giving each other space to grow while staying close.',
      emoji: '🦋',
      score: 0
    }
  ]
};

export const CoupleQuiz: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [totalScore, setTotalScore] = useState<number>(0);

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId);
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setTotalScore(0);
  };

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizzes[selectedQuiz].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const finalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      setTotalScore(finalScore);
      setShowResult(true);
    }
  };

  const getResult = (): QuizResult => {
    const quizResults = results[selectedQuiz];
    
    if (totalScore >= 15) return quizResults[0];
    if (totalScore >= 12) return quizResults[1];
    if (totalScore >= 8) return quizResults[2];
    return quizResults[3];
  };

  const resetQuiz = () => {
    setSelectedQuiz('');
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setTotalScore(0);
  };

  if (!selectedQuiz) {
    return (
      <div className="max-w-2xl mx-auto p-6 glass-morphism rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-8 font-script text-white">
          Couple Quizzes
        </h2>
        
        <div className="space-y-4">
          {Object.entries(quizzes).map(([key, quiz]) => (
            <button
              key={key}
              onClick={() => handleQuizSelect(key)}
              className="w-full p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 text-left"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                {quiz.title}
              </h3>
              <p className="text-white/70 text-sm">
                {quiz.questions.length} questions • 5 minutes
              </p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    const result = getResult();
    
    return (
      <div className="max-w-2xl mx-auto p-6 glass-morphism rounded-2xl">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-float">{result.emoji}</div>
          <h2 className="text-3xl font-bold text-white mb-4 font-script">
            {result.title}
          </h2>
          <p className="text-xl text-white/90 mb-6">
            {result.description}
          </p>
          
          <div className="bg-white/10 rounded-lg p-4 mb-6">
            <p className="text-white/70 text-sm mb-2">Your Score</p>
            <p className="text-3xl font-bold text-white">
              {totalScore} / {quizzes[selectedQuiz].questions.length * 4}
            </p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={resetQuiz}
              className="px-6 py-3 bg-white/20 backdrop-blur text-white font-medium rounded-lg hover:bg-white/30 transition-all duration-300 border border-white/30"
            >
              Try Another Quiz
            </button>
            
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Our Couple Quiz Result',
                    text: `${result.emoji} ${result.title} - ${result.description}`,
                  });
                } else {
                  navigator.clipboard.writeText(`${result.emoji} ${result.title} - ${result.description}`);
                  alert('Result copied to clipboard!');
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Share Result
            </button>
          </div>
        </div>
      </div>
    );
  }

  const quiz = quizzes[selectedQuiz];
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto p-6 glass-morphism rounded-2xl">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-white font-script">
            {quiz.title}
          </h2>
          <span className="text-white/70 text-sm">
            {currentQuestion + 1} / {quiz.questions.length}
          </span>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-6">
          {question.question}
        </h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(question.scores[index])}
              className="w-full p-4 bg-white/10 backdrop-blur rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300 text-left text-white hover:border-white/40"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={resetQuiz}
        className="text-white/60 hover:text-white text-sm underline"
      >
        Exit Quiz
      </button>
    </div>
  );
};
