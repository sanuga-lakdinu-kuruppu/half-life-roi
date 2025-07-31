"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";

// Enhanced Confetti SVG component with more engaging effects
function ConfettiEffect() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {Array.from({ length: 80 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        >
          <div
            className="w-full h-full rounded-full animate-sparkle"
            style={{
              backgroundColor: `hsl(${Math.random() * 360}, 80%, 60%)`,
              animation: `spin ${Math.random() * 2 + 1}s linear infinite, sparkle ${Math.random() * 1 + 0.5}s ease-in-out infinite`,
            }}
          />
        </div>
      ))}
      
      {/* Celebration sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="celebration-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

// Simplified animated background with subtle movement
function MovingBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Simple particle system */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
            opacity: Math.random() * 0.2 + 0.05,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}
      
      <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <defs>
          <linearGradient id="bgwave2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.06" />
          </linearGradient>
        </defs>
        
        {/* Simple floating ellipses */}
        <ellipse cx="50%" cy="60%" rx="600" ry="120" fill="url(#bgwave2)" opacity="0.3">
          <animate attributeName="rx" values="600;650;600" dur="20s" repeatCount="indefinite" />
          <animate attributeName="ry" values="120;100;120" dur="18s" repeatCount="indefinite" />
        </ellipse>
        
        <ellipse cx="30%" cy="30%" rx="200" ry="60" fill="#818cf8" opacity="0.1">
          <animate attributeName="cx" values="30%;40%;30%" dur="30s" repeatCount="indefinite" />
        </ellipse>
        
        <ellipse cx="70%" cy="20%" rx="180" ry="50" fill="#f472b6" opacity="0.08">
          <animate attributeName="cy" values="20%;25%;20%" dur="25s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}

export default function QuizStudios() {
  const { domain } = useParams();
  const [userName, setUserName] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [fails, setFails] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiQuestions, setApiQuestions] = useState([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [apiResults, setApiResults] = useState(null);
  
  // Check for existing user authentication on component mount
  useEffect(() => {
    const accessToken = localStorage.getItem('quizAccessToken');
    const userId = localStorage.getItem('quizUserId');
    const userName = localStorage.getItem('quizUserName');
    
    if (accessToken && userId && userName) {
      setUserData({
        accessToken,
        userId,
        name: userName
      });
      setIsAuthenticated(true);
      setQuizStarted(true);
      // Fetch questions for existing user
      fetchQuestions(accessToken);
    }
  }, []);
  
  // Function to fetch questions from API
  const fetchQuestions = async (token) => {
    setIsLoadingQuestions(true);
    try {
      const response = await fetch('https://cru4fa4esf.execute-api.ap-southeast-1.amazonaws.com/dev/quiz', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.success && result.data.questions) {
        setApiQuestions(result.data.questions);
      } else {
        console.error('Failed to fetch questions:', result.message);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  // Function to fetch quiz results from API
  const fetchQuizResults = async (token) => {
    try {
      const response = await fetch('https://cru4fa4esf.execute-api.ap-southeast-1.amazonaws.com/dev/quiz/results', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const result = await response.json();
      
      if (result.success && result.data) {
        return result.data;
      } else {
        console.error('Failed to fetch quiz results:', result.message);
        return null;
      }
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      return null;
    }
  };
  
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alex Johnson", score: 95, domain: "Space Technology" },
    { name: "Sarah Chen", score: 88, domain: "Space Technology" },
    { name: "Mike Davis", score: 82, domain: "Space Technology" },
    { name: "Emma Wilson", score: 78, domain: "Space Technology" },
    { name: "David Brown", score: 75, domain: "Space Technology" },
  ]);

  const domainInfo = {
    space: {
      name: "Space Technology",
      emoji: "🚀",
      color: "from-blue-500 to-purple-600",
      questions: [
        {
          question: "What is the largest planet in our solar system?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          correct: 2,
        },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correct: 1,
        },
        {
          question: "What is the name of our galaxy?",
          options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
          correct: 1,
        },
        {
          question: "How many moons does Earth have?",
          options: ["0", "1", "2", "3"],
          correct: 1,
        },
        {
          question: "What is the closest star to Earth?",
          options: ["Proxima Centauri", "Alpha Centauri", "The Sun", "Sirius"],
          correct: 2,
        },
      ],
    },
    agriculture: {
      name: "Agriculture",
      emoji: "🌾",
      color: "from-green-500 to-emerald-600",
      questions: [
        {
          question: "What is the most widely grown crop in the world?",
          options: ["Wheat", "Rice", "Corn", "Soybeans"],
          correct: 1,
        },
        {
          question: "Which farming method uses no synthetic chemicals?",
          options: ["Conventional", "Organic", "Hydroponic", "Aquaponic"],
          correct: 1,
        },
        {
          question: "What is the process of growing plants without soil called?",
          options: ["Aquaculture", "Hydroponics", "Aeroponics", "Aquaponics"],
          correct: 1,
        },
        {
          question: "Which nutrient is most important for plant growth?",
          options: ["Nitrogen", "Phosphorus", "Potassium", "All of the above"],
          correct: 3,
        },
        {
          question: "What is crop rotation used for?",
          options: ["Pest control", "Soil fertility", "Water conservation", "All of the above"],
          correct: 3,
        },
      ],
    },
    medical: {
      name: "Medical",
      emoji: "🏥",
      color: "from-red-500 to-pink-600",
      questions: [
        {
          question: "What is the largest organ in the human body?",
          options: ["Heart", "Brain", "Liver", "Skin"],
          correct: 3,
        },
        {
          question: "How many bones are in the adult human body?",
          options: ["206", "212", "198", "220"],
          correct: 0,
        },
        {
          question: "What is the main function of red blood cells?",
          options: ["Fight infection", "Carry oxygen", "Clot blood", "Produce antibodies"],
          correct: 1,
        },
        {
          question: "Which vitamin is essential for blood clotting?",
          options: ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin K"],
          correct: 3,
        },
        {
          question: "What is the normal body temperature in Celsius?",
          options: ["36.5°C", "37°C", "37.5°C", "38°C"],
          correct: 1,
        },
      ],
    },
    technology: {
      name: "Technology",
      emoji: "💻",
      color: "from-purple-500 to-indigo-600",
      questions: [
        {
          question: "What does CPU stand for?",
          options: ["Central Processing Unit", "Computer Personal Unit", "Central Personal Unit", "Computer Processing Unit"],
          correct: 0,
        },
        {
          question: "Which programming language was created by Guido van Rossum?",
          options: ["Java", "Python", "C++", "JavaScript"],
          correct: 1,
        },
        {
          question: "What does HTML stand for?",
          options: ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
          correct: 0,
        },
        {
          question: "Which company created the iPhone?",
          options: ["Samsung", "Apple", "Google", "Microsoft"],
          correct: 1,
        },
        {
          question: "What is the main function of RAM?",
          options: ["Long-term storage", "Temporary memory", "Processing power", "Graphics rendering"],
          correct: 1,
        },
      ],
    },
    finance: {
      name: "Finance",
      emoji: "💰",
      color: "from-yellow-500 to-orange-600",
      questions: [
        {
          question: "What does ROI stand for?",
          options: ["Return on Investment", "Rate of Interest", "Return of Income", "Rate of Inflation"],
          correct: 0,
        },
        {
          question: "What is compound interest?",
          options: ["Interest on principal only", "Interest on principal plus accumulated interest", "Fixed interest rate", "Variable interest rate"],
          correct: 1,
        },
        {
          question: "What is a bull market?",
          options: ["Falling market", "Rising market", "Stable market", "Volatile market"],
          correct: 1,
        },
        {
          question: "What does IPO stand for?",
          options: ["Initial Public Offering", "International Private Organization", "Investment Portfolio Option", "Individual Private Ownership"],
          correct: 0,
        },
        {
          question: "What is diversification in investing?",
          options: ["Putting all money in one stock", "Spreading investments across different assets", "High-risk investing", "Short-term trading"],
          correct: 1,
        },
      ],
    },
    environment: {
      name: "Environment",
      emoji: "🌍",
      color: "from-teal-500 to-cyan-600",
      questions: [
        {
          question: "What is the main cause of climate change?",
          options: ["Greenhouse gases", "Solar flares", "Volcanic eruptions", "Ocean currents"],
          correct: 0,
        },
        {
          question: "What percentage of Earth's surface is covered by water?",
          options: ["50%", "60%", "70%", "80%"],
          correct: 2,
        },
        {
          question: "What is the largest rainforest in the world?",
          options: ["Congo Rainforest", "Amazon Rainforest", "Borneo Rainforest", "Daintree Rainforest"],
          correct: 1,
        },
        {
          question: "What is renewable energy?",
          options: ["Energy that never runs out", "Energy from fossil fuels", "Energy from nuclear power", "Energy that can be replenished"],
          correct: 3,
        },
        {
          question: "What is the ozone layer responsible for?",
          options: ["Producing oxygen", "Blocking UV radiation", "Regulating temperature", "Creating rain"],
          correct: 1,
        },
      ],
    },
  };

  const currentDomain = domainInfo[domain] || {
    name: "Unknown Domain",
    emoji: "❓",
    color: "from-gray-500 to-gray-600",
    questions: [],
  };

  const handleStartQuiz = async () => {
    if (!userName.trim()) return;
    
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch('https://cru4fa4esf.execute-api.ap-southeast-1.amazonaws.com/dev/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userName.trim()
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        setUserData(result.data);
        // Store access token in localStorage
        localStorage.setItem('quizAccessToken', result.data.accessToken);
        localStorage.setItem('quizUserId', result.data.userId);
        localStorage.setItem('quizUserName', result.data.name);
        setIsAuthenticated(true);
        setQuizStarted(true);
        // Fetch questions after user creation
        await fetchQuestions(result.data.accessToken);
      } else {
        setError(result.message || 'Failed to create user');
      }
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async () => {
    if (selectedAnswer === null) return;

    const questions = apiQuestions.length > 0 ? apiQuestions : currentDomain.questions;
    const currentQuestion = questions[currentQuestionIndex];
    
    // For API questions, we need to determine correct answer based on the question structure
    // Since API questions don't have a 'correct' field, we'll need to handle this differently
    let isCorrect = false;
    
    if (apiQuestions.length > 0) {
      // For API questions, we'll need to send the answer to backend for validation
      // For now, we'll assume all answers are correct (you can modify this logic)
      isCorrect = true; // This should be determined by backend response
    } else {
      // For hardcoded questions, use the correct field
      isCorrect = selectedAnswer === currentQuestion.correct;
    }
    
    if (isCorrect) {
      setScore(score + 1);
    } else {
      setFails(fails + 1);
    }

    // Send answer to backend with access token
    if (userData?.accessToken) {
      try {
        const response = await fetch('https://cru4fa4esf.execute-api.ap-southeast-1.amazonaws.com/dev/quiz/answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`
          },
          body: JSON.stringify({
            questionIndex: currentQuestionIndex,
            answer: currentQuestion.options[selectedAnswer]
          })
        });
        
        const result = await response.json();
        if (result.success) {
          console.log('Answer submitted successfully');
        } else {
          console.error('Failed to submit answer:', result.message);
        }
      } catch (error) {
        console.error('Error submitting answer:', error);
        // Continue with quiz even if API call fails
      }
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Quiz completed - fetch results from API
      if (userData?.accessToken) {
        try {
          const results = await fetchQuizResults(userData.accessToken);
          if (results) {
            // Store API results
            setApiResults(results);
            setScore(results.totalScore || 0);
            setFails((results.totalQuestions || 0) - (results.totalScore || 0));
          }
        } catch (error) {
          console.error('Error fetching quiz results:', error);
        }
      }
      
      setQuizCompleted(true);
      // Add to leaderboard
      const newScore = isCorrect ? score + 1 : score;
      const newEntry = { name: userData?.name || userName, score: newScore, domain: currentDomain.name };
      setLeaderboard([...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 5));
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setFails(0);
    setQuizCompleted(false);
    setUserName("");
    setUserData(null);
    setError("");
    setIsLoading(false);
    setIsAuthenticated(false);
    setApiQuestions([]);
    setIsLoadingQuestions(false);
    setApiResults(null);
    // Clear localStorage
    localStorage.removeItem('quizAccessToken');
    localStorage.removeItem('quizUserId');
    localStorage.removeItem('quizUserName');
  };

  // Landing Page
  if (!quizStarted && !quizCompleted) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <MovingBackground />
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-20 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
          <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-15 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
        </div>

        {/* Back Button */}
        <div className="absolute top-8 left-8 z-20">
          <Link
            href="/#quiz"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-full text-white hover:bg-gray-800 transition-colors hover-lift"
          >
            <span>←</span>
            <span>Back to Quiz</span>
          </Link>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 w-full max-w-6xl">
          <div className="mb-8 animate-zoom-in">
            <div
              className={`w-24 h-24 bg-gradient-to-br ${currentDomain.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow`}
            >
              <span className="text-4xl animate-float">{currentDomain.emoji}</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg mb-4 animate-shimmer">
              Quiz Studios
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 animate-slide-in-left">
              {currentDomain.name}
            </h2>
          </div>

          {/* Name Input */}
          <div className="mb-8 animate-slide-in-right">
            <div className="max-w-md mx-auto">
              <label className="block text-white text-lg font-semibold mb-3 animate-glow">Enter Your Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name here..."
                className="w-full px-4 py-3 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors hover-lift"
              />
              {error && (
                <div className="mt-3 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}
              <button
                onClick={handleStartQuiz}
                disabled={!userName.trim() || isLoading}
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover-lift animate-pulse-glow relative"
              >
                {isLoading ? (
                  <>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="opacity-0">Creating User...</span>
                  </>
                ) : (
                  "Start Quiz"
                )}
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="max-w-2xl mx-auto animate-zoom-in">
            <h3 className="text-2xl font-bold text-white mb-4 animate-glow">🏆 Leaderboard</h3>
            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-lg p-6 hover-lift">
              {leaderboard.map((entry, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500 text-black' : 
                      index === 1 ? 'bg-gray-400 text-black' : 
                      index === 2 ? 'bg-orange-500 text-black' : 
                      'bg-gray-700 text-white'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="text-white font-medium">{entry.name}</span>
                  </div>
                  <span className="text-green-400 font-bold">{entry.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Interface
  if (quizStarted && !quizCompleted) {
    // Use API questions if available, otherwise fall back to hardcoded questions
    const questions = apiQuestions.length > 0 ? apiQuestions : currentDomain.questions;
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <MovingBackground />
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-20 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
          <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-15 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
        </div>

        {/* Header */}
        <div className="absolute top-8 left-8 z-20 flex gap-4">
          <Link
            href="/#quiz"
            className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-full text-white hover:bg-gray-800 transition-colors hover-lift"
          >
            <span>←</span>
            <span>Back to Quiz</span>
          </Link>
          {userData && (
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-900/80 backdrop-blur-md border border-blue-700 rounded-full text-blue-300">
              <span>👤</span>
              <span>{userData.name}</span>
            </div>
          )}
        </div>

        {/* Score Display */}
        <div className="absolute top-8 right-8 z-20 flex gap-4">
          <div className="px-4 py-2 bg-green-900/80 backdrop-blur-md border border-green-700 rounded-full text-green-400 font-semibold animate-pulse-glow">
            ✅ {score}
          </div>
          <div className="px-4 py-2 bg-red-900/80 backdrop-blur-md border border-red-700 rounded-full text-red-400 font-semibold animate-pulse-glow">
            ❌ {fails}
          </div>
          <button
            onClick={resetQuiz}
            className="px-4 py-2 bg-red-900/80 backdrop-blur-md border border-red-700 rounded-full text-red-400 hover:bg-red-800 transition-colors hover-lift"
            title="Logout"
          >
            🚪
          </button>
        </div>

        {/* Main Content */}
        <div className="text-center z-10 w-full max-w-4xl">
          {isLoadingQuestions ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-white text-lg">Loading questions...</p>
            </div>
          ) : (
            <>
              {/* Progress Bar */}
              <div className="mb-8 animate-slide-in-left">
                <div className="flex justify-between text-white mb-2">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300 animate-shimmer" style={{ width: `${progress}%` }}></div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 mb-8 hover-lift animate-zoom-in">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 animate-glow">
                  {currentQuestion.question}
                </h2>

                {/* Answer Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedAnswer(index)}
                      className={`p-4 text-left rounded-lg border-2 transition-all hover-lift ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-900/50 text-white animate-pulse-glow'
                          : 'border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
                      }`}
                    >
                      <span className="font-semibold mr-3 animate-float">{String.fromCharCode(65 + index)}.</span>
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg hover-lift animate-pulse-glow"
              >
                Submit Answer
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // Results Page
  if (quizCompleted) {
    const questions = apiQuestions.length > 0 ? apiQuestions : currentDomain.questions;
    const finalScore = apiResults ? 
      Math.round((apiResults.totalScore / apiResults.totalQuestions) * 100) : 
      Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
        <MovingBackground />
        {/* Animated Background */}
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-20 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
          <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-15 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
        </div>
        <ConfettiEffect />
        {/* Main Content */}
        <div className="text-center z-10 w-full max-w-2xl">
          <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 mb-8 hover-lift animate-zoom-in">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-shimmer">🎉 Quiz Complete!</h1>
            
            <div className="mb-8">
              <div className="text-6xl font-bold mb-4 animate-bounce">
                {finalScore >= 80 ? (
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent animate-rotate-3d">🏆</span>
                ) : finalScore >= 60 ? (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent animate-float">🥈</span>
                ) : (
                  <span className="bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent animate-bounce">💪</span>
                )}
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-2 animate-glow">{userData?.name || userName}</h2>
              <p className="text-xl text-gray-300 mb-6 animate-slide-in-left">Your Score: {finalScore}%</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-green-900/50 border border-green-700 rounded-lg p-4 hover-lift animate-slide-in-left">
                  <div className="text-2xl font-bold text-green-400 animate-pulse-glow">
                    {apiResults ? apiResults.totalScore : score}
                  </div>
                  <div className="text-green-300">Correct</div>
                </div>
                <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 hover-lift animate-slide-in-right">
                  <div className="text-2xl font-bold text-red-400 animate-pulse-glow">
                    {apiResults ? (apiResults.totalQuestions - apiResults.totalScore) : fails}
                  </div>
                  <div className="text-red-300">Incorrect</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all hover-lift animate-pulse-glow"
              >
                Try Again
              </button>
              <Link
                href="/#quiz"
                className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 transition-all hover-lift"
              >
                Back to Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
