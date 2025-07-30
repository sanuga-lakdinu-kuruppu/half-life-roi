"use client";
import { useState, useEffect } from 'react';

// Scientifically accurate beta particle properties
const betaParticles = [
  { 
    id: 'sr90', 
    name: 'Strontium-90', 
    symbol: 'Sr', 
    energy: 0.546, // MeV - scientifically accurate
    maxRange: 2.1, // mm in aluminum - scientifically accurate
    halfLife: '28.8 years',
    color: 'from-red-500 to-pink-600',
    description: 'High-energy beta emitter for thick material measurement'
  },
  { 
    id: 'pm147', 
    name: 'Promethium-147', 
    symbol: 'Pm', 
    energy: 0.225, // MeV - scientifically accurate
    maxRange: 0.8, // mm in aluminum - scientifically accurate
    halfLife: '2.62 years',
    color: 'from-blue-500 to-cyan-600',
    description: 'Medium-energy beta emitter for intermediate thickness'
  },
  { 
    id: 'tritium', 
    name: 'Tritium (³H)', 
    symbol: 'H', 
    energy: 0.0186, // MeV - scientifically accurate
    maxRange: 0.06, // mm in aluminum - scientifically accurate
    halfLife: '12.3 years',
    color: 'from-green-500 to-emerald-600',
    description: 'Low-energy beta emitter for thin material measurement'
  },
];

// Material properties with scientifically accurate thickness ranges
const materials = [
  { 
    id: 'paper', 
    name: 'Paper', 
    icon: '📄', 
    thickness: 0.1, // mm
    density: 0.8, // g/cm³
    description: 'Thin paper sheets for packaging',
    suitableBeta: ['tritium']
  },
  { 
    id: 'plastic', 
    name: 'Plastic Film', 
    icon: '🥤', 
    thickness: 0.2, // mm
    density: 0.9, // g/cm³
    description: 'Thin plastic film for food packaging',
    suitableBeta: ['tritium', 'pm147']
  },
  { 
    id: 'aluminum', 
    name: 'Aluminum Foil', 
    icon: '🥡', 
    thickness: 0.02, // mm
    density: 2.7, // g/cm³
    description: 'Ultra-thin aluminum foil',
    suitableBeta: ['tritium']
  },
  { 
    id: 'steel', 
    name: 'Steel Sheet', 
    icon: '🔧', 
    thickness: 1.0, // mm
    density: 7.8, // g/cm³
    description: 'Thin steel sheet for construction',
    suitableBeta: ['pm147', 'sr90']
  },
  { 
    id: 'glass', 
    name: 'Glass Panel', 
    icon: '🪟', 
    thickness: 3.0, // mm
    density: 2.5, // g/cm³
    description: 'Standard glass panel',
    suitableBeta: ['sr90']
  },
  { 
    id: 'concrete', 
    name: 'Concrete Slab', 
    icon: '🧱', 
    thickness: 5.0, // mm
    density: 2.4, // g/cm³
    description: 'Thin concrete slab',
    suitableBeta: ['sr90']
  },
];

// Calculate beta particle transmission through material
const calculateTransmission = (betaEnergy, materialThickness, materialDensity) => {
  // Scientifically accurate beta particle range calculation
  // Range in mg/cm² = 412 × E^(1.265-0.0954×ln(E)) where E is in MeV
  const rangeMgCm2 = 412 * Math.pow(betaEnergy, 1.265 - 0.0954 * Math.log(betaEnergy));
  
  // Convert to mm in the specific material
  const rangeMm = rangeMgCm2 / (materialDensity * 10);
  
  // Transmission follows exponential attenuation: I = I₀ × e^(-μx)
  // where μ is the linear attenuation coefficient
  const mu = 1 / rangeMm; // Approximate linear attenuation coefficient
  const transmission = Math.exp(-mu * materialThickness);
  
  return Math.max(0, transmission * 100); // Return as percentage
};

export default function Industry() {
  const [score, setScore] = useState(0);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [selectedBeta, setSelectedBeta] = useState(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [transmissionResult, setTransmissionResult] = useState(null);
  const [lastResult, setLastResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setAnalyzedCount(0);
    setCorrectCount(0);
    setSelectedBeta(null);
    setTransmissionResult(null);
    setLastResult(null);
    generateNewMaterial();
  };

  const generateNewMaterial = () => {
    const material = materials[Math.floor(Math.random() * materials.length)];
    setCurrentMaterial(material);
    setSelectedBeta(null);
    setTransmissionResult(null);
    setLastResult(null);
  };

  const handleBetaSelection = (beta) => {
    setSelectedBeta(beta);
    
    // Calculate transmission
    const transmission = calculateTransmission(beta.energy, currentMaterial.thickness, currentMaterial.density);
    setTransmissionResult(transmission);
  };

  const handleAnalysis = () => {
    if (!selectedBeta || !currentMaterial) return;

    // Check if the beta particle is suitable for this material
    const isSuitable = currentMaterial.suitableBeta.includes(selectedBeta.id);
    const correct = isSuitable;
    
    setAnalyzedCount(prev => prev + 1);
    
    // Set result for feedback
    setLastResult({
      correct,
      material: currentMaterial,
      beta: selectedBeta,
      transmission: transmissionResult,
      isSuitable
    });
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + 20);
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }

    // Show modal
    setShowModal(true);

    // Check if game is complete (6 materials)
    if (analyzedCount + 1 >= 6) {
      setTimeout(() => {
        setShowModal(false);
        setGameActive(false);
        setCompleted(true);
      }, 3000);
    } else {
      setTimeout(() => {
        setShowModal(false);
        generateNewMaterial();
        setSelectedBeta(null);
        setTransmissionResult(null);
        setLastResult(null);
      }, 3000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setAnalyzedCount(0);
    setCorrectCount(0);
    setCurrentMaterial(null);
    setSelectedBeta(null);
    setTransmissionResult(null);
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
          Industry: Beta Particle Thickness Gauge
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">How Beta Particle Thickness Gauges Work</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Beta particles are used to measure material thickness through transmission. Different beta energies are suitable for different material thicknesses.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Beta particles follow exponential attenuation: I = I₀ × e^(-μx)
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Higher energy beta particles penetrate thicker materials
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Range depends on energy and material density
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-900/50 to-red-900/50 backdrop-blur-md border border-orange-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Select the appropriate beta particle source for measuring each material&apos;s thickness. Consider the particle energy and material properties.
            </p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowInstructions(false)} 
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Measurement
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
          🎉 Thickness Measurement Complete!
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <p className="text-xl text-gray-300 mb-4">Excellent work! You&apos;ve completed the beta particle thickness measurements.</p>
            <p className="text-2xl mb-4">Final Score: <strong className="text-green-400">{score}</strong> points</p>
            <p className="text-lg text-gray-400">Accuracy: <strong className="text-blue-400">{Math.round((correctCount / analyzedCount) * 100)}%</strong> ({correctCount}/{analyzedCount} correct)</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">What you learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-red-900/30 to-pink-900/30 border border-red-600 rounded-xl p-4">
                <div className="text-2xl mb-2">Sr</div>
                <div className="font-semibold text-white">Strontium-90</div>
                <div className="text-gray-300 text-sm">0.546 MeV, 2.1mm range</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-600 rounded-xl p-4">
                <div className="text-2xl mb-2">Pm</div>
                <div className="font-semibold text-white">Promethium-147</div>
                <div className="text-gray-300 text-sm">0.225 MeV, 0.8mm range</div>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-600 rounded-xl p-4">
                <div className="text-2xl mb-2">H</div>
                <div className="font-semibold text-white">Tritium</div>
                <div className="text-gray-300 text-sm">0.0186 MeV, 0.06mm range</div>
              </div>
              <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-600 rounded-xl p-4">
                <div className="text-2xl mb-2">📊</div>
                <div className="font-semibold text-white">Transmission</div>
                <div className="text-gray-300 text-sm">I = I₀ × e^(-μx)</div>
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
        Industry: Beta Particle Thickness Gauge
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

              {/* Result Title */}
              <h3 className={`text-3xl font-bold mb-4 ${
                lastResult.correct ? 'text-green-400' : 'text-red-400'
              }`}>
                {lastResult.correct ? 'Perfect Measurement!' : 'Measurement Error!'}
              </h3>
              
              {/* Material and Beta Info */}
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-3xl mb-2">{lastResult.material.icon}</div>
                    <h4 className="text-lg font-bold text-white mb-1">{lastResult.material.name}</h4>
                    <p className="text-gray-300 text-sm">{lastResult.material.thickness}mm thickness</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">{lastResult.beta.symbol}</div>
                    <h4 className="text-lg font-bold text-white mb-1">{lastResult.beta.name}</h4>
                    <p className="text-gray-300 text-sm">{lastResult.beta.energy} MeV</p>
                  </div>
                </div>
              </div>
              
              {/* Transmission Results */}
              <div className="bg-gray-800/30 rounded-lg p-4 mb-6">
                <div className="text-sm text-gray-400 mb-2">Transmission Result</div>
                <div className={`text-2xl font-bold ${
                  lastResult.transmission > 50 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {lastResult.transmission.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {lastResult.transmission > 50 ? 'Adequate penetration' : 'Insufficient penetration'}
                </div>
              </div>
              
              {/* Scientific Explanation */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-4">
                <div className="text-sm font-bold text-blue-400 mb-2">🔬 Scientific Explanation</div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {lastResult.correct 
                    ? `${lastResult.beta.name} with ${lastResult.beta.energy} MeV energy is suitable for ${lastResult.material.name} (${lastResult.material.thickness}mm). The ${lastResult.transmission.toFixed(1)}% transmission indicates adequate penetration for accurate thickness measurement.`
                    : `${lastResult.beta.name} with ${lastResult.beta.energy} MeV energy is not suitable for ${lastResult.material.name} (${lastResult.material.thickness}mm). The ${lastResult.transmission.toFixed(1)}% transmission is too ${lastResult.transmission > 50 ? 'high' : 'low'} for accurate measurement.`
                  }
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
            <p className="text-gray-300 text-xl mb-6">Ready to measure material thickness?</p>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Measurement
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Material Info */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Material Analysis</h3>
            {currentMaterial && (
              <div className="text-center">
                <div className="text-6xl mb-4">{currentMaterial.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{currentMaterial.name}</h4>
                <p className="text-gray-300 mb-4">{currentMaterial.description}</p>
                <div className="text-sm text-gray-400 mb-2">
                  Thickness: {currentMaterial.thickness} mm
                </div>
                <div className="text-sm text-gray-400 mb-2">
                  Density: {currentMaterial.density} g/cm³
                </div>
                {/* <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <strong>Suitable Beta Sources:</strong> {currentMaterial.suitableBeta.map(beta => 
                    betaParticles.find(b => b.id === beta)?.name
                  ).join(', ')}
                </div> */}
              </div>
            )}
          </div>

          {/* Beta Selection */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Select Beta Source</h3>
            <div className="space-y-4 mb-6">
              {betaParticles.map(beta => (
                <button
                  key={beta.id}
                  onClick={() => handleBetaSelection(beta)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 ${
                    selectedBeta?.id === beta.id
                      ? `bg-gradient-to-r ${beta.color} text-white shadow-lg`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-bold">{beta.name}</div>
                      <div className="text-sm opacity-80">{beta.symbol}</div>
                      <div className="text-xs opacity-60">Energy: {beta.energy} MeV</div>
                      <div className="text-xs opacity-60">Range: {beta.maxRange} mm</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-60">{beta.halfLife}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Transmission Result */}
            {transmissionResult !== null && (
              <div className="mb-6 p-4 bg-gray-900/50 rounded-lg">
                <h4 className="text-lg font-bold text-white mb-2">Transmission Result</h4>
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {transmissionResult.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-400">
                  Beta particles transmitted through material
                </div>
              </div>
            )}
            
            {/* Analysis Button */}
            {selectedBeta && (
              <button
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Analyze Suitability
              </button>
            )}
          </div>
        </div>
      )}

      {/* Educational Info */}
      <div className="mt-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-xl">
        <h4 className="text-lg font-bold text-white mb-2">Measurement Principles:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Beta particles follow exponential attenuation: I = I₀ × e^(-μx)</li>
          <li>• Higher energy beta particles penetrate thicker materials</li>
          <li>• Range depends on energy and material density</li>
          <li>• Choose beta source with appropriate energy for material thickness</li>
          <li>• Transmission percentage indicates measurement suitability</li>
        </ul>
      </div>
    </div>
  );
} 