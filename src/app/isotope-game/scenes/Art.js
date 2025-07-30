"use client";
import { useState, useEffect } from 'react';

const carbon14HalfLife = 5730; // years - scientifically accurate
const carbon14DecayConstant = Math.log(2) / carbon14HalfLife;

// Generate realistic decay data with proper scientific accuracy
const generateDecayCurve = (initialAmount, age, isAuthentic = true) => {
  const data = [];
  const maxTime = 50000; // 50,000 years
  const timeStep = 1000; // 1,000 year intervals
  
  for (let time = 0; time <= maxTime; time += timeStep) {
    let expectedAmount;
    if (isAuthentic) {
      // Authentic: follows natural exponential decay
      // Total time = current time + artifact age
      const totalTime = time + age;
      expectedAmount = initialAmount * Math.exp(-carbon14DecayConstant * totalTime);
    } else {
      // Fake: manipulated decay curve with random anomalies
      const totalTime = time + age;
      const baseDecay = initialAmount * Math.exp(-carbon14DecayConstant * totalTime);
      const manipulation = Math.random() > 0.5 ? 1.3 : 0.6; // Random manipulation factor
      expectedAmount = baseDecay * manipulation;
      
      // Add occasional spikes or dips for fakes
      if (Math.random() > 0.8) {
        expectedAmount *= Math.random() > 0.5 ? 1.2 : 0.8;
      }
    }
    
    data.push({
      time: time / 1000, // Convert to thousands of years
      amount: expectedAmount,
      percentage: (expectedAmount / initialAmount) * 100
    });
  }
  
  return data;
};

// Calculate expected C-14 percentage for a given age
const calculateExpectedC14 = (age) => {
  return Math.exp(-carbon14DecayConstant * age) * 100;
};

const artifacts = [
  { 
    id: 'scroll', 
    name: 'Ancient Scroll', 
    icon: '📜', 
    age: 2000, 
    description: 'A papyrus scroll from ancient Egypt',
    authentic: true,
    explanation: 'Natural decay pattern consistent with 2,000-year-old organic material'
  },
  { 
    id: 'wood', 
    name: 'Ancient Wood', 
    icon: '🪵', 
    age: 2500, 
    description: 'Wooden artifact from classical Greece',
    authentic: true,
    explanation: 'Exponential decay curve matches expected C-14 half-life of 5,730 years'
  },
  { 
    id: 'canvas', 
    name: 'Renaissance Canvas', 
    icon: '🎨', 
    age: 500, 
    description: 'Canvas from the Renaissance period',
    authentic: true,
    explanation: 'Smooth decay pattern indicates authentic 500-year-old organic material'
  },
  { 
    id: 'fake_scroll', 
    name: 'Ancient Scroll', 
    icon: '📜', 
    age: 2000, 
    description: 'A papyrus scroll with questionable dating',
    authentic: false,
    explanation: 'Irregular decay pattern suggests artificial aging or contamination'
  },
  { 
    id: 'fake_wood', 
    name: 'Ancient Wood', 
    icon: '🪵', 
    age: 2500, 
    description: 'Wooden artifact from ancient Greece',
    authentic: false,
    explanation: 'Anomalous decay curve indicates modern wood with fake aging'
  },
  { 
    id: 'fake_canvas', 
    name: 'Ancient Canvas', 
    icon: '🎨', 
    age: 500, 
    description: 'Canvas from the Renaissance',
    authentic: false,
    explanation: 'Inconsistent decay pattern reveals modern canvas with artificial aging'
  },
];

export default function Art() {
  const [score, setScore] = useState(0);
  const [currentArtifact, setCurrentArtifact] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [decayData, setDecayData] = useState([]);
  const [lastResult, setLastResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setAnalyzedCount(0);
    setCorrectCount(0);
    setLastResult(null);
    generateNewArtifact();
  };

  const generateNewArtifact = () => {
    const artifact = artifacts[Math.floor(Math.random() * artifacts.length)];
    setCurrentArtifact(artifact);
    
    // Generate decay curve data
    const data = generateDecayCurve(100, artifact.age, artifact.authentic);
    setDecayData(data);
  };

  const handleAnalysis = (isAuthentic) => {
    if (!currentArtifact) return;

    const correct = (isAuthentic === currentArtifact.authentic);
    setAnalyzedCount(prev => prev + 1);
    
    // Set result for feedback
    setLastResult({
      correct,
      artifact: currentArtifact,
      userChoice: isAuthentic
    });
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + 20);
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }

    // Show modal
    setShowModal(true);

    // Check if game is complete (6 artifacts)
    if (analyzedCount + 1 >= 6) {
      setTimeout(() => {
        setShowModal(false);
        setGameActive(false);
        setCompleted(true);
      }, 3000);
    } else {
      // Generate next artifact after showing modal
      setTimeout(() => {
        setShowModal(false);
        setLastResult(null);
        generateNewArtifact();
      }, 3000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setAnalyzedCount(0);
    setCorrectCount(0);
    setCurrentArtifact(null);
    setDecayData([]);
    setLastResult(null);
    setShowModal(false);
    setCompleted(false);
    setGameActive(false);
    setShowInstructions(false);
  };

  if (showInstructions) {
    return (
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
          Art Authentication: Carbon-14 Dating
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">How Carbon-14 Dating Works</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Carbon-14 dating measures the decay of radioactive carbon-14 in organic materials to determine their age.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Carbon-14 has a half-life of 5,730 years 
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Living organisms maintain a constant C-14 ratio with atmosphere
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                After death, C-14 decays exponentially: N(t) = N₀ × e^(-λt)
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-purple-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Analyze the carbon-14 decay curves to identify authentic artifacts from fakes. Look for natural exponential decay patterns versus manipulated data with anomalies.
            </p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowInstructions(false)} 
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Authentication
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="text-center">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-8">
          🎉 Authentication Complete!
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <p className="text-xl text-gray-300 mb-4">Excellent work! You&apos;ve completed the carbon-14 dating analysis.</p>
            <p className="text-2xl mb-4">Final Score: <strong className="text-green-400">{score}</strong> points</p>
            <p className="text-lg text-gray-400">Accuracy: <strong className="text-blue-400">{Math.round((correctCount / analyzedCount) * 100)}%</strong> ({correctCount}/{analyzedCount} correct)</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">What you learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-600 rounded-xl p-4">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold text-white">Exponential Decay</div>
                <div className="text-gray-300 text-sm">N(t) = N₀ × e^(-λt) where λ = ln(2)/5730</div>
              </div>
              <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-600 rounded-xl p-4">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-semibold text-white">Anomaly Detection</div>
                <div className="text-gray-300 text-sm">Irregular patterns indicate manipulation</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-600 rounded-xl p-4">
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-semibold text-white">Half-Life</div>
                <div className="text-gray-300 text-sm">5,730 years for carbon-14 decay</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-600 rounded-xl p-4">
                <div className="text-2xl mb-2">🎨</div>
                <div className="font-semibold text-white">Scientific Dating</div>
                <div className="text-gray-300 text-sm">Prevents art fraud with mathematical precision</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={resetGame} 
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
        Art Authentication: Carbon-14 Dating
      </h2>
      
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl">
        <div className="text-green-400 font-bold text-xl">Score: {score}</div>
        <div className="text-blue-400 font-bold text-xl">Analyzed: {analyzedCount}/6</div>
        <div className="text-purple-400 font-bold text-xl">Correct: {correctCount}</div>
      </div>

      {/* Result Modal */}
      {showModal && lastResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`max-w-lg w-full bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-md border-2 rounded-3xl p-8 shadow-2xl transform transition-all duration-500 ${
            lastResult.correct ? 'border-green-500/50 shadow-green-500/25' : 'border-red-500/50 shadow-red-500/25'
          }`}>
            <div className="text-center">
              {/* Animated Icon
              <div className={`text-6xl mb-6 animate-bounce ${
                lastResult.correct ? 'text-green-400' : 'text-red-400'
              }`}>
                {lastResult.correct ? '🎉' : '💥'}
              </div> */}
              
              {/* Result Title */}
              <h3 className={`text-3xl font-bold mb-4 ${
                lastResult.correct ? 'text-green-400' : 'text-red-400'
              }`}>
                {lastResult.correct ? 'Excellent Analysis!' : 'Analysis Error!'}
              </h3>
              
              {/* Artifact Info */}
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <div className="text-4xl mb-2">{lastResult.artifact.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{lastResult.artifact.name}</h4>
                <p className="text-gray-300 text-sm">{lastResult.artifact.description}</p>
              </div>
              
              {/* Analysis Results */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Your Analysis</div>
                  <div className={`font-bold ${
                    lastResult.userChoice ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {lastResult.userChoice ? '✓ Authentic' : '✗ Fake'}
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Actual Status</div>
                  <div className={`font-bold ${
                    lastResult.artifact.authentic ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {lastResult.artifact.authentic ? '✓ Authentic' : '✗ Fake'}
                  </div>
                </div>
              </div>
              
              {/* Scientific Explanation */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-4">
                <div className="text-sm font-bold text-blue-400 mb-2">🔬 Scientific Explanation</div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {lastResult.artifact.explanation}
                </p>
              </div>
              
              {/* Score Update */}
              <div className={`mt-6 text-lg font-bold ${
                lastResult.correct ? 'text-green-400' : 'text-red-400'
              }`}>
                {lastResult.correct ? '+20 points' : '-5 points'}
              </div>
            </div>
          </div>
        </div>
      )}

      {!gameActive ? (
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <p className="text-gray-300 text-xl mb-6">Ready to authenticate artifacts?</p>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Analysis
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Artifact Info */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Artifact Analysis</h3>
            {currentArtifact && (
              <div className="text-center">
                <div className="text-6xl mb-4">{currentArtifact.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{currentArtifact.name}</h4>
                <p className="text-gray-300 mb-4">{currentArtifact.description}</p>
                <div className="text-sm text-gray-400 mb-4">
                  Claimed Age: {currentArtifact.age} years
                </div>
                <div className="text-xs text-gray-500">
                  Expected C-14: {calculateExpectedC14(currentArtifact.age).toFixed(2)}% of original
                </div>
              </div>
            )}
          </div>

          {/* Decay Curve */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Carbon-14 Decay Curve</h3>
            <div className="h-64 bg-gray-900/50 rounded-lg p-4 mb-4">
              <div className="text-xs text-gray-400 mb-2">Time (thousands of years) vs C-14 (%)</div>
              <div className="h-48 bg-gray-800/30 rounded border border-gray-600 p-2 overflow-y-auto">
                {decayData.slice(0, 25).map((point, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <div className="w-12 text-xs text-gray-400">{point.time.toFixed(1)}k</div>
                    <div className="flex-1 bg-gray-700 rounded h-3 mx-2 relative">
                      <div 
                        className={`h-3 rounded transition-all duration-300 ${
                          point.percentage > 50 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                          point.percentage > 20 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                          'bg-gradient-to-r from-red-500 to-pink-500'
                        }`}
                        style={{ width: `${Math.min(point.percentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-xs text-gray-400">{point.percentage.toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Analysis Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => handleAnalysis(true)}
                disabled={showModal}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                ✓ Authentic
              </button>
              <button
                onClick={() => handleAnalysis(false)}
                disabled={showModal}
                className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                ✗ Fake
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Educational Info */}
      <div className="mt-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-xl">
        <h4 className="text-lg font-bold text-white mb-2">Analysis Tips:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Natural decay follows exponential curve: N(t) = N₀ × e^(-λt)</li>
          <li>• Look for smooth, consistent patterns without sudden changes</li>
          <li>• Anomalies or spikes suggest artificial manipulation</li>
          <li>• Compare to expected half-life of 5,730 years</li>
          <li>• Green bars = high C-14, Red bars = low C-14</li>
        </ul>
      </div>
    </div>
  );
} 