"use client";
import { useState, useEffect } from 'react';

const pests = [
  { id: 'aphids', name: 'Aphids', icon: '🦗', health: 1, points: 10, vulnerableTo: ['gamma', 'beta'], description: 'Sap-sucking insects that damage crops' },
  { id: 'weevils', name: 'Weevils', icon: '🐛', health: 2, points: 15, vulnerableTo: ['gamma'], description: 'Beetles that destroy stored grains' },
  { id: 'moths', name: 'Moths', icon: '🦋', health: 1, points: 10, vulnerableTo: ['beta', 'xray'], description: 'Larvae that eat through leaves' },
  { id: 'fungus', name: 'Fungus', icon: '🍄', health: 3, points: 20, vulnerableTo: ['gamma'], description: 'Fungal infections that spread quickly' },
  { id: 'bacteria', name: 'Bacteria', icon: '🦠', health: 2, points: 15, vulnerableTo: ['beta'], description: 'Disease-causing microorganisms' },
];

const radiationTypes = [
  { id: 'gamma', name: 'Gamma Rays', symbol: 'γ', power: 2, color: 'from-purple-500 to-pink-600', description: 'High-energy electromagnetic radiation that penetrates deep - effective against hard-shelled pests and fungi' },
  { id: 'beta', name: 'Beta Rays', symbol: 'β', power: 1, color: 'from-blue-500 to-cyan-600', description: 'Fast-moving electrons that damage surface tissues - effective against soft-bodied insects and bacteria' },
  { id: 'xray', name: 'X-Rays', symbol: 'X', power: 1, color: 'from-green-500 to-emerald-600', description: 'Short-wavelength radiation for precise targeting - effective against small insects and larvae' },
];

export default function Agriculture() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameActive, setGameActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedRadiation, setSelectedRadiation] = useState(null);
  const [activePests, setActivePests] = useState([]);
  const [missedShots, setMissedShots] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Generate random pests
  const generatePest = () => {
    const pest = pests[Math.floor(Math.random() * pests.length)];
    return {
      ...pest,
      id: `${pest.id}_${Date.now()}`,
      x: Math.random() * 80 + 10, // 10-90% of screen width
      y: Math.random() * 60 + 20, // 20-80% of screen height
      currentHealth: pest.health,
      vulnerableTo: pest.vulnerableTo, // Ensure this property is copied
    };
  };

  // Start the game
  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setMissedShots(0);
    setActivePests([]);
    setSelectedRadiation(radiationTypes[0]);
  };

  // Handle pest click
  const handlePestClick = (pest) => {
    if (!selectedRadiation) return;

    // Safety check for vulnerableTo property
    if (!pest.vulnerableTo || !Array.isArray(pest.vulnerableTo)) {
      console.error('Pest missing vulnerableTo property:', pest);
      return;
    }

    // Check if the radiation type is effective against this pest
    if (!pest.vulnerableTo.includes(selectedRadiation.id)) {
      // Ineffective radiation - no damage but still counts as missed shot
      setMissedShots(prev => prev + 1);
      return;
    }

    const damage = selectedRadiation.power;
    const newPests = activePests.map(p => {
      if (p.id === pest.id) {
        const newHealth = p.currentHealth - damage;
        if (newHealth <= 0) {
          setScore(prev => prev + pest.points);
          return null; // Remove pest
        }
        return { ...p, currentHealth: newHealth };
      }
      return p;
    }).filter(Boolean);

    setActivePests(newPests);
  };

  // Handle missed shots
  const handleMissedShot = () => {
    setMissedShots(prev => prev + 1);
  };

  // Handle game area click
  const handleGameAreaClick = (e) => {
    // Only count as missed shot if clicking on the background, not on pests
    if (e.target.className.includes('game-area-background')) {
      handleMissedShot();
    }
  };

  // Spawn pests periodically
  useEffect(() => {
    if (!gameActive) return;

    const spawnInterval = setInterval(() => {
      if (activePests.length < 3 + level) {
        setActivePests(prev => [...prev, generatePest()]);
      }
    }, 2000 - level * 200); // Faster spawning at higher levels

    return () => clearInterval(spawnInterval);
  }, [gameActive, activePests.length, level]);

  // Level progression
  useEffect(() => {
    if (score >= level * 100) {
      setLevel(prev => prev + 1);
    }
  }, [score, level]);

  // Game completion
  useEffect(() => {
    if (level >= 5) {
      setGameActive(false);
      setCompleted(true);
    }
  }, [level]);

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setGameActive(false);
    setMissedShots(0);
    setActivePests([]);
    setSelectedRadiation(radiationTypes[0]);
    setCompleted(false);
    setShowInstructions(false);
  };

  if (showInstructions) {
    return (
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
          Agriculture: Gamma Ray Pest Control
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">How Radiation Helps Agriculture</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Radiation technology in agriculture helps control pests, sterilize insects, and preserve food without harmful chemicals.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Gamma rays sterilize insects to prevent reproduction
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Beta radiation preserves food by killing bacteria
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                X-rays detect pests in stored products
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Select the right radiation type and zap pests to protect the crops! Different pests need different radiation types to eliminate.
            </p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowInstructions(false)} 
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Pest Control
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
          🎉 Pest Control Complete!
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <p className="text-xl text-gray-300 mb-4">Excellent work! You've successfully protected the crops using radiation technology.</p>
            <p className="text-2xl mb-4">Final Score: <strong className="text-green-400">{score}</strong> points</p>
            <p className="text-lg text-gray-400">Missed shots: <strong className="text-red-400">{missedShots}</strong></p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">What you learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-600 rounded-xl p-4">
                <div className="text-2xl mb-2">γ</div>
                <div className="font-semibold text-white">Gamma Rays</div>
                <div className="text-gray-300 text-sm">High-energy radiation for deep penetration</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-600 rounded-xl p-4">
                <div className="text-2xl mb-2">β</div>
                <div className="font-semibold text-white">Beta Rays</div>
                <div className="text-gray-300 text-sm">Fast electrons for surface damage</div>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-600 rounded-xl p-4">
                <div className="text-2xl mb-2">X</div>
                <div className="font-semibold text-white">X-Rays</div>
                <div className="text-gray-300 text-sm">Precise targeting for detection</div>
              </div>
              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-600 rounded-xl p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-white">Pest Control</div>
                <div className="text-gray-300 text-sm">Safe, chemical-free crop protection</div>
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
        Agriculture: Gamma Ray Pest Control
      </h2>
      
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl">
        <div className="text-green-400 font-bold text-xl">Score: {score}</div>
        <div className="text-blue-400 font-bold text-xl">Level: {level}</div>
        <div className="text-red-400 font-bold text-xl">Missed: {missedShots}</div>
      </div>

      {/* Radiation Selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4">Select Radiation Type</h3>
        <div className="flex justify-center gap-4">
          {radiationTypes.map(radiation => (
            <button
              key={radiation.id}
              onClick={() => setSelectedRadiation(radiation)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                selectedRadiation?.id === radiation.id
                  ? `bg-gradient-to-r ${radiation.color} text-white shadow-lg`
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{radiation.symbol}</div>
              <div className="text-sm">{radiation.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 min-h-[400px] game-area-background" onClick={handleGameAreaClick}>
        {!gameActive ? (
          <div className="flex flex-col items-center justify-center h-80">
            <p className="text-gray-300 text-xl mb-6">Ready to protect the crops?</p>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Game
            </button>
          </div>
        ) : (
          <div className="relative h-80">
            {/* Pests */}
            {activePests.map(pest => (
              <div
                key={pest.id}
                onClick={() => handlePestClick(pest)}
                className="absolute cursor-pointer transition-all duration-300 hover:scale-110"
                style={{ left: `${pest.x}%`, top: `${pest.y}%` }}
              >
                <div className="text-4xl">{pest.icon}</div>
                <div className="text-xs text-white bg-black/50 rounded px-1 text-center">
                  {pest.currentHealth}/{pest.health}
                </div>
              </div>
            ))}
            
            {/* Click area for missed shots */}
            {/* This div is no longer needed as the full area click handler handles missed shots */}
          </div>
        )}
      </div>

      {/* Selected Radiation Info */}
      {selectedRadiation && (
        <div className="mt-6 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-xl">
          <h4 className="text-lg font-bold text-white mb-2">Selected: {selectedRadiation.name}</h4>
          <p className="text-gray-300 text-sm">{selectedRadiation.description}</p>
        </div>
      )}
    </div>
  );
} 