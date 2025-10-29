import React, { useState } from 'react';
import { Check, X, Trophy, RefreshCw } from 'lucide-react';

const MathTriviaGame = () => {
  const [gameState, setGameState] = useState('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const questions = [
    {
      question: "What is the derivative of f(x) = 3x² + 5x - 2?",
      options: ["6x + 5", "3x + 5", "6x² + 5x", "6x - 5"],
      correct: 0,
      difficulty: "Medium",
      points: 20,
      explanation: "Using the power rule: d/dx(3x²) = 6x and d/dx(5x) = 5, so f'(x) = 6x + 5"
    },
    {
      question: "In a right triangle, if one leg is 3 and the hypotenuse is 5, what is the length of the other leg?",
      options: ["2", "4", "6", "8"],
      correct: 1,
      difficulty: "Easy",
      points: 10,
      explanation: "Using the Pythagorean theorem: a² + b² = c², so 3² + b² = 5², which gives b² = 16, therefore b = 4"
    },
    {
      question: "What is the solution set for the inequality |2x - 3| < 5?",
      options: ["x < 4", "-1 < x < 4", "x > -1", "-4 < x < 1"],
      correct: 1,
      difficulty: "Medium",
      points: 20,
      explanation: "|2x - 3| < 5 means -5 < 2x - 3 < 5, which simplifies to -2 < 2x < 8, so -1 < x < 4"
    },
    {
      question: "The sum of an infinite geometric series with first term a = 2 and common ratio r = 1/3 is:",
      options: ["3", "6", "2", "Divergent"],
      correct: 0,
      difficulty: "Hard",
      points: 30,
      explanation: "For |r| < 1, the sum is S = a/(1-r) = 2/(1-1/3) = 2/(2/3) = 3"
    },
    {
      question: "Which transformation represents a reflection over the y-axis?",
      options: ["(x, y) → (-x, y)", "(x, y) → (x, -y)", "(x, y) → (y, x)", "(x, y) → (-x, -y)"],
      correct: 0,
      difficulty: "Easy",
      points: 10,
      explanation: "Reflecting over the y-axis negates the x-coordinate while keeping y the same"
    },
    {
      question: "What is the period of the function f(x) = 3sin(2x)?",
      options: ["2π", "π", "π/2", "4π"],
      correct: 1,
      difficulty: "Medium",
      points: 20,
      explanation: "For sin(bx), the period is 2π/b. Here b = 2, so period = 2π/2 = π"
    },
    {
      question: "If log₂(x) = 5, what is the value of x?",
      options: ["10", "25", "32", "64"],
      correct: 2,
      difficulty: "Easy",
      points: 10,
      explanation: "log₂(x) = 5 means 2⁵ = x, so x = 32"
    },
    {
      question: "The limit as x approaches 0 of (sin x)/x equals:",
      options: ["0", "1", "∞", "Does not exist"],
      correct: 1,
      difficulty: "Hard",
      points: 30,
      explanation: "This is a fundamental limit in calculus"
    },
    {
      question: "What is the determinant of the matrix [[3, 1], [2, 4]]?",
      options: ["10", "12", "14", "8"],
      correct: 0,
      difficulty: "Medium",
      points: 20,
      explanation: "For a 2x2 matrix, det = ad - bc = (3)(4) - (1)(2) = 12 - 2 = 10"
    },
    {
      question: "A standard deck has 52 cards. What is the probability of drawing a heart or a face card?",
      options: ["11/26", "22/52", "23/52", "25/52"],
      correct: 2,
      difficulty: "Hard",
      points: 30,
      explanation: "P(heart or face) = P(heart) + P(face) - P(heart and face) = 13/52 + 12/52 - 3/52 = 22/52"
    }
  ];

  const startGame = () => {
    setGameState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setAnsweredQuestions([]);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowAnimation(false);
  };

  const handleAnswer = (index) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    
    setTimeout(() => {
      setShowAnimation(true);
      setShowFeedback(true);
    }, 300);
    
    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + questions[currentQuestion].points);
    }
    
    setAnsweredQuestions([...answeredQuestions, {
      question: currentQuestion,
      correct: isCorrect
    }]);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setShowAnimation(false);
    } else {
      setGameState('end');
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return 'from-green-400 to-emerald-500';
      case 'Medium': return 'from-yellow-400 to-orange-500';
      case 'Hard': return 'from-red-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const QBot = ({ size = 120, className = "" }) => (
    <svg viewBox="0 0 200 240" className={className} style={{ width: size, height: size * 1.2 }}>
      <circle cx="100" cy="20" r="8" fill="none" stroke="#00D9FF" strokeWidth="3" />
      <line x1="100" y1="28" x2="100" y2="50" stroke="#00D9FF" strokeWidth="3" />
      <rect x="50" y="50" width="100" height="80" rx="20" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <circle cx="75" cy="80" r="12" fill="none" stroke="#00D9FF" strokeWidth="3" />
      <circle cx="75" cy="80" r="6" fill="#00D9FF" />
      <circle cx="125" cy="80" r="12" fill="none" stroke="#00D9FF" strokeWidth="3" />
      <circle cx="125" cy="80" r="6" fill="#00D9FF" />
      <polygon points="100,95 110,110 90,110" fill="none" stroke="#00D9FF" strokeWidth="3" />
      <rect x="80" y="115" width="10" height="8" fill="#00D9FF" />
      <rect x="95" y="115" width="10" height="8" fill="#00D9FF" />
      <rect x="110" y="115" width="10" height="8" fill="#00D9FF" />
      <rect x="25" y="70" width="20" height="30" rx="10" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <rect x="155" y="70" width="20" height="30" rx="10" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <rect x="60" y="135" width="80" height="70" rx="15" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <circle cx="100" cy="170" r="25" fill="none" stroke="#00D9FF" strokeWidth="4" />
      <text x="100" y="185" textAnchor="middle" fill="#00D9FF" fontSize="36" fontWeight="bold" fontFamily="Arial">Q</text>
      <rect x="35" y="145" width="20" height="50" rx="10" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <rect x="145" y="145" width="20" height="50" rx="10" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <rect x="70" y="210" width="20" height="25" rx="5" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
      <rect x="110" y="210" width="20" height="25" rx="5" fill="#0A1628" stroke="#00D9FF" strokeWidth="3" />
    </svg>
  );

  if (gameState === 'start') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 to-blue-950 border-2 border-cyan-400 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 w-full text-center" style={{ boxShadow: '0 0 40px rgba(0, 217, 255, 0.3)' }}>
            <QBot size={100} className="mx-auto mb-4 sm:mb-6 sm:w-[140px]" />
            
            <div className="mb-4 sm:mb-6">
              <h1 className="text-3xl sm:text-5xl font-bold text-cyan-400 mb-2" style={{ textShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}>
                QUANTEGY AI
              </h1>
              <h2 className="text-xl sm:text-3xl font-bold text-cyan-300 mb-1 sm:mb-2">TExES Math 7-12</h2>
              <h3 className="text-lg sm:text-2xl text-cyan-200">Trivia Challenge</h3>
            </div>
            
            <p className="text-cyan-100 text-sm sm:text-lg mb-4 sm:mb-8 px-2">
              Join Q-Bot to master the Texas certification exam!
            </p>
            
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-8">
              <div className="bg-gradient-to-br from-green-900 to-emerald-950 border border-green-400 p-2 sm:p-4 rounded-lg sm:rounded-xl" style={{ boxShadow: '0 0 15px rgba(74, 222, 128, 0.2)' }}>
                <div className="text-green-400 font-bold text-sm sm:text-lg">Easy</div>
                <div className="text-xl sm:text-3xl text-green-300">10 pts</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-900 to-orange-950 border border-yellow-400 p-2 sm:p-4 rounded-lg sm:rounded-xl" style={{ boxShadow: '0 0 15px rgba(251, 191, 36, 0.2)' }}>
                <div className="text-yellow-400 font-bold text-sm sm:text-lg">Medium</div>
                <div className="text-xl sm:text-3xl text-yellow-300">20 pts</div>
              </div>
              <div className="bg-gradient-to-br from-red-900 to-rose-950 border border-red-400 p-2 sm:p-4 rounded-lg sm:rounded-xl" style={{ boxShadow: '0 0 15px rgba(248, 113, 113, 0.2)' }}>
                <div className="text-red-400 font-bold text-sm sm:text-lg">Hard</div>
                <div className="text-xl sm:text-3xl text-red-300">30 pts</div>
              </div>
            </div>
            
            <button
              onClick={startGame}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:shadow-lg active:scale-95 transform hover:scale-105 transition-all border-2 border-cyan-300"
              style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
            >
              Start Challenge! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'playing') {
    const q = questions[currentQuestion];
    const isCorrect = selectedAnswer === q.correct;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black p-2 sm:p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900 to-blue-950 border-2 border-cyan-400 rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-6 mb-3 sm:mb-6" style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
              <div className="flex items-center gap-3 sm:gap-6">
                <QBot size={50} className="sm:w-[60px]" />
                <div>
                  <div className="text-2xl sm:text-4xl font-bold text-cyan-400 mb-1 sm:mb-2" style={{ textShadow: '0 0 15px rgba(0, 217, 255, 0.5)' }}>
                    Score: {score}
                  </div>
                  <div className={`bg-gradient-to-r ${getDifficultyColor(q.difficulty)} text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm inline-block border border-white/30`}>
                    {q.difficulty} - {q.points} pts
                  </div>
                </div>
              </div>
              <div className="text-cyan-300 font-semibold text-sm sm:text-lg">
                Question {currentQuestion + 1}/{questions.length}
              </div>
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-gray-900 to-blue-950 border-2 border-cyan-400 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 mb-3 sm:mb-6" style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.3)' }}>
            <h2 className="text-lg sm:text-2xl font-bold text-cyan-100 mb-4 sm:mb-6">
              {q.question}
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              {q.options.map((option, index) => {
                let buttonClass = "w-full p-3 sm:p-4 rounded-lg sm:rounded-xl text-left text-sm sm:text-base font-semibold transition-all transform border-2 ";
                
                if (showFeedback) {
                  if (index === q.correct) {
                    buttonClass += "bg-gradient-to-r from-green-900 to-emerald-900 border-green-400 text-green-100 shadow-lg animate-pulse";
                  } else if (index === selectedAnswer) {
                    buttonClass += "bg-gradient-to-r from-red-900 to-rose-900 border-red-400 text-red-100 shadow-lg animate-pulse";
                  } else {
                    buttonClass += "bg-gray-800/50 border-gray-600 text-gray-500";
                  }
                } else {
                  buttonClass += selectedAnswer === index 
                    ? "bg-gradient-to-r from-cyan-800/60 to-blue-800/60 border-cyan-400 text-cyan-100 scale-95"
                    : "bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-500/50 hover:border-cyan-400 text-cyan-100 hover:shadow-lg hover:from-cyan-800/40 hover:to-blue-800/40 active:scale-95";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={showFeedback}
                    className={buttonClass}
                    style={!showFeedback ? { boxShadow: '0 0 10px rgba(0, 217, 255, 0.2)' } : index === q.correct || index === selectedAnswer ? { boxShadow: '0 0 30px rgba(0, 217, 255, 0.5)' } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showFeedback && index === q.correct && (
                        <div className="relative">
                          <Check className="w-5 h-5 sm:w-7 sm:h-7 animate-bounce" />
                          {showAnimation && (
                            <div className="absolute inset-0 animate-ping">
                              <Check className="w-5 h-5 sm:w-7 sm:h-7 opacity-75" />
                            </div>
                          )}
                        </div>
                      )}
                      {showFeedback && index === selectedAnswer && index !== q.correct && (
                        <X className="w-5 h-5 sm:w-7 sm:h-7 animate-pulse" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl border-2 ${isCorrect ? 'bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-green-400' : 'bg-gradient-to-r from-red-900/50 to-rose-900/50 border-red-400'}`}>
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className={`${showAnimation ? 'animate-bounce' : ''} hidden sm:block`}>
                    <QBot size={80} />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="relative bg-gray-900/80 border-2 border-cyan-400 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3" style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)' }}>
                      <div className="hidden sm:block absolute left-0 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-cyan-400 -ml-2"></div>
                      <div className="hidden sm:block absolute left-0 top-8 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-gray-900 -ml-1"></div>
                      
                      <div className="flex items-center gap-2 sm:gap-3 mb-2">
                        {isCorrect ? (
                          <>
                            <div className="relative">
                              <Check className={`w-6 h-6 sm:w-8 sm:h-8 text-green-400 ${showAnimation ? 'animate-bounce' : ''}`} />
                              {showAnimation && (
                                <>
                                  <div className="absolute inset-0 animate-ping">
                                    <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 opacity-75" />
                                  </div>
                                  <div className="absolute -inset-4 animate-pulse">
                                    <div className="w-16 h-16 bg-green-400/30 rounded-full blur-xl"></div>
                                  </div>
                                </>
                              )}
                            </div>
                            <span className={`text-lg sm:text-2xl font-bold text-green-400 ${showAnimation ? 'animate-bounce' : ''}`} style={{ textShadow: '0 0 20px rgba(74, 222, 128, 0.6)' }}>
                              Correct! +{q.points} points 🎉
                            </span>
                          </>
                        ) : (
                          <>
                            <div className="relative">
                              <X className={`w-6 h-6 sm:w-8 sm:h-8 text-red-400 ${showAnimation ? 'animate-pulse' : ''}`} />
                              {showAnimation && (
                                <div className="absolute -inset-4 animate-pulse">
                                  <div className="w-16 h-16 bg-red-400/30 rounded-full blur-xl"></div>
                                </div>
                              )}
                            </div>
                            <span className={`text-lg sm:text-2xl font-bold text-red-400 ${showAnimation ? 'animate-pulse' : ''}`} style={{ textShadow: '0 0 20px rgba(248, 113, 113, 0.6)' }}>
                              Not quite! 💪
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-cyan-100 text-sm sm:text-lg leading-relaxed">{q.explanation}</p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-bold hover:shadow-lg active:scale-95 transform hover:scale-105 transition-all border-2 border-cyan-300"
                  style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)' }}
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'end') {
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const percentage = Math.round((score / maxScore) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center p-3 sm:p-4">
        <div className="relative w-full max-w-2xl">
          <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
          
          <div className="relative bg-gradient-to-br from-gray-900 to-blue-950 border-2 border-cyan-400 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 w-full text-center" style={{ boxShadow: '0 0 40px rgba(0, 217, 255, 0.3)' }}>
            <QBot size={100} className="mx-auto mb-4 sm:mb-6 sm:w-[120px]" />
            
            <h1 className="text-3xl sm:text-5xl font-bold text-cyan-400 mb-4 sm:mb-6" style={{ textShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}>
              Mission Complete!
            </h1>
            
            <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-4 sm:mb-6" style={{ boxShadow: '0 0 20px rgba(0, 217, 255, 0.2)' }}>
              <div className="text-5xl sm:text-7xl font-bold text-cyan-400 mb-2" style={{ textShadow: '0 0 30px rgba(0, 217, 255, 0.6)' }}>{score}</div>
              <div className="text-lg sm:text-2xl text-cyan-300 mb-2 sm:mb-4">out of {maxScore} points</div>
              <div className="text-3xl sm:text-5xl font-bold text-cyan-400" style={{ textShadow: '0 0 20px rgba(0, 217, 255, 0.5)' }}>
                {percentage}% Correct
              </div>
            </div>

            <div className="text-left mb-4 sm:mb-6 bg-gray-900/50 border border-cyan-500/30 rounded-xl p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-cyan-400 mb-3 sm:mb-4">Performance Summary:</h3>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <div className="text-center bg-green-900/30 border border-green-500 rounded-lg p-2 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-bold text-green-400">
                    {answeredQuestions.filter(a => a.correct).length}
                  </div>
                  <div className="text-xs sm:text-sm text-green-300">Correct</div>
                </div>
                <div className="text-center bg-red-900/30 border border-red-500 rounded-lg p-2 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-bold text-red-400">
                    {answeredQuestions.filter(a => !a.correct).length}
                  </div>
                  <div className="text-xs sm:text-sm text-red-300">Incorrect</div>
                </div>
                <div className="text-center bg-cyan-900/30 border border-cyan-500 rounded-lg p-2 sm:p-4">
                  <div className="text-2xl sm:text-4xl font-bold text-cyan-400">{questions.length}</div>
                  <div className="text-xs sm:text-sm text-cyan-300">Total</div>
                </div>
              </div>
            </div>

            <button
              onClick={startGame}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:shadow-lg active:scale-95 transform hover:scale-105 transition-all flex items-center gap-2 mx-auto border-2 border-cyan-300"
              style={{ boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)' }}
            >
              <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default MathTriviaGame;
