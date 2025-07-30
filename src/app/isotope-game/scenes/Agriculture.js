"use client";
import { useState, useEffect } from 'react';

const pests = [
  { id: 'aphids', name: 'Aphids', icon: '🦗', health: 1, points: 10, vulnerableTo: ['gamma'], description: 'Sap-sucking insects that damage crops' },
  { id: 'weevils', name: 'Weevils', icon: '🐛', health: 2, points: 15, vulnerableTo: ['gamma'], description: 'Beetles that destroy stored grains' },
  { id: 'moths', name: 'Moths', icon: '🦋', health: 1, points: 10, vulnerableTo: ['gamma'], description: 'Larvae that eat through leaves' },
  { id: 'fungus', name: 'Fungus', icon: '🍄', health: 3, points: 20, vulnerableTo: ['gamma'], description: 'Fungal infections that spread quickly' },
  { id: 'bacteria', name: 'Bacteria', icon: '🦠', health: 2, points: 15, vulnerableTo: ['gamma'], description: 'Disease-causing microorganisms' },
];

const radiationTypes = [
  { id: 'gamma', name: 'Gamma Rays', symbol: 'γ', power: 1, color: 'from-purple-500 to-pink-600', description: 'High-energy electromagnetic radiation that penetrates deep - effective against all pests and microorganisms through DNA damage and sterilization' },
];

export default function Agriculture() {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameActive, setGameActive] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedRadiation, setSelectedRadiation] = useState(null);
  const [activePests, setActivePests] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [particleEffects, setParticleEffects] = useState([]);

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
    setGameTime(0);
    setActivePests([]);
    setSelectedRadiation(radiationTypes[0]);
  };

  // Handle pest click
  const handlePestClick = (pest, e) => {
    if (!selectedRadiation) return;

    // Safety check for vulnerableTo property
    if (!pest.vulnerableTo || !Array.isArray(pest.vulnerableTo)) {
      console.error('Pest missing vulnerableTo property:', pest);
      return;
    }

    // All pests are vulnerable to gamma radiation
    // No need to check effectiveness since we only use gamma

    const damage = selectedRadiation.power;
    const newPests = activePests.map(p => {
      if (p.id === pest.id) {
        const newHealth = p.currentHealth - damage;
        if (newHealth <= 0) {
          setScore(prev => prev + pest.points);
          
          // Create success particle effect
          const pestElement = e.currentTarget;
          const containerRect = pestElement.closest('.text-center').getBoundingClientRect();
          const pestRect = pestElement.getBoundingClientRect();
          const centerX = pestRect.left - containerRect.left + pestRect.width / 2;
          const centerY = pestRect.top - containerRect.top + pestRect.height / 2;
          createParticleEffect(centerX, centerY, 'success');
          return null; // Remove pest
        }
        return { ...p, currentHealth: newHealth };
      }
      return p;
    }).filter(Boolean);

    setActivePests(newPests);
  };

  const createParticleEffect = (x, y, type) => {
    const particles = [];
    const colors = type === 'success' 
      ? ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'] 
      : ['#ef4444', '#f87171', '#fca5a5', '#fecaca'];
    
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const velocity = 1.5 + Math.random() * 2.5;
      const particle = {
        id: Date.now() + i,
        x: x,
        y: y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
        life: 1,
        decay: 0.025 + Math.random() * 0.035,
        type
      };
      particles.push(particle);
    }
    
    setParticleEffects(prev => [...prev, ...particles]);
    
    // Clean up particles after animation
    setTimeout(() => {
      setParticleEffects(prev => prev.filter(p => !particles.includes(p)));
    }, 800);
  };

  // Handle game area click (no longer needed since all hits are successful)
  const handleGameAreaClick = (e) => {
    // No action needed since all pests are vulnerable to gamma
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

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticleEffects(prev => 
        prev.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - particle.decay,
          size: particle.size * 0.98
        })).filter(particle => particle.life > 0)
      );
    };

    const interval = setInterval(animateParticles, 16); // 60fps
    return () => clearInterval(interval);
  }, []);

  // Game timer
  useEffect(() => {
    let timer;
    if (gameActive) {
      timer = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameActive]);

  const resetGame = () => {
    setScore(0);
    setLevel(1);
    setGameActive(false);
    setGameTime(0);
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
              Gamma radiation technology in agriculture provides safe, chemical-free pest control through sterilization and DNA damage.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Gamma rays penetrate deep to sterilize all types of pests and microorganisms
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                DNA damage prevents reproduction and eliminates pest populations
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                No harmful chemicals - environmentally friendly crop protection
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Use gamma radiation to zap pests and protect the crops! Complete levels as fast as possible to achieve the highest score.
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
            <p className="text-xl text-gray-300 mb-4">Excellent work! You&apos;ve successfully protected the crops using radiation technology.</p>
            <p className="text-2xl mb-4">Final Score: <strong className="text-green-400">{score}</strong> points</p>
            <p className="text-lg text-gray-400">Completion Time: <strong className="text-yellow-400">{Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</strong></p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">What you learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-600 rounded-xl p-4">
                <div className="text-2xl mb-2">γ</div>
                <div className="font-semibold text-white">Gamma Rays</div>
                <div className="text-gray-300 text-sm">High-energy radiation for deep penetration</div>
              </div>
              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-600 rounded-xl p-4">
                <div className="text-2xl mb-2">🎯</div>
                <div className="font-semibold text-white">Pest Control</div>
                <div className="text-gray-300 text-sm">Safe, chemical-free crop protection</div>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-600 rounded-xl p-4">
                <div className="text-2xl mb-2">⚡</div>
                <div className="font-semibold text-white">Speed Challenge</div>
                <div className="text-gray-300 text-sm">Complete levels as fast as possible</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-600 rounded-xl p-4">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-white">High Score</div>
                <div className="text-gray-300 text-sm">Maximize points and minimize time</div>
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
    <div className="text-center relative">
      {/* Particle Effects */}
      {particleEffects.map(particle => (
        <div
          key={particle.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            borderRadius: '50%',
            opacity: particle.life,
            transform: `translate(-50%, -50%)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
      
      <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
        Agriculture: Gamma Ray Pest Control
      </h2>
      
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl">
        <div className="text-green-400 font-bold text-xl">Score: {score}</div>
        <div className="text-blue-400 font-bold text-xl">Level: {level}</div>
        <div className="text-yellow-400 font-bold text-xl">Time: {Math.floor(gameTime / 60)}:{(gameTime % 60).toString().padStart(2, '0')}</div>
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
                onClick={(e) => handlePestClick(pest, e)}
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
          <h4 className="text-lg font-bold text-white mb-2">{selectedRadiation.name}</h4>
          <p className="text-gray-300 text-sm">{selectedRadiation.description}</p>
        </div>
      )}
    </div>
  );
} 