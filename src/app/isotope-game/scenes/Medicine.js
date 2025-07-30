"use client";
import { useState, useEffect } from 'react';

const isotopes = [
  { id: 'f18', name: 'Fluorine-18', symbol: 'F', halfLife: '109.8 min', use: 'Brain scans', color: 'from-green-500 to-emerald-600' },
  { id: 'c11', name: 'Carbon-11', symbol: 'C', halfLife: '20.4 min', use: 'Heart imaging', color: 'from-blue-500 to-cyan-600' },
  { id: 'o15', name: 'Oxygen-15', symbol: 'O', halfLife: '2.04 min', use: 'Blood flow', color: 'from-orange-500 to-red-600' },
  { id: 'n13', name: 'Nitrogen-13', symbol: 'N', halfLife: '9.97 min', use: 'Lung function', color: 'from-purple-500 to-pink-600' },
  { id: 'ga68', name: 'Gallium-68', symbol: 'Ga', halfLife: '67.7 min', use: 'Tumor detection', color: 'from-yellow-500 to-orange-600' },
  { id: 'cu64', name: 'Copper-64', symbol: 'Cu', halfLife: '12.7 hours', use: 'Cancer therapy', color: 'from-red-500 to-pink-600' },
  { id: 'i124', name: 'Iodine-124', symbol: 'I', halfLife: '4.18 days', use: 'Thyroid imaging', color: 'from-indigo-500 to-purple-600' },
  { id: 'rb82', name: 'Rubidium-82', symbol: 'Rb', halfLife: '1.27 min', use: 'Heart perfusion', color: 'from-teal-500 to-cyan-600' },
];

const organs = [
  { id: 'brain', name: 'Brain', targets: ['f18'], icon: '🧠', description: 'Detects tumors and Alzheimer\'s disease by tracking glucose metabolism in brain cells using FDG (Fluorine-18 deoxyglucose)' },
  { id: 'heart', name: 'Heart', targets: ['c11'], icon: '❤️', description: 'Shows blood flow and damage by monitoring cardiac muscle activity and oxygen consumption with Carbon-11 acetate' },
  { id: 'lungs', name: 'Lungs', targets: ['n13'], icon: '🫁', description: 'Measures oxygen uptake and lung ventilation patterns for respiratory disease diagnosis using Nitrogen-13 ammonia' },
  { id: 'blood', name: 'Blood Vessels', targets: ['o15'], icon: '🩸', description: 'Tracks circulation patterns and blood flow dynamics throughout the body using Oxygen-15 water' },
  { id: 'tumor', name: 'Tumor Sites', targets: ['ga68'], icon: '🔬', description: 'Detects cancer cells and monitors tumor growth with high precision imaging using Gallium-68 DOTATATE' },
  { id: 'thyroid', name: 'Thyroid', targets: ['i124'], icon: '🦋', description: 'Images thyroid function and detects thyroid cancer with radioactive iodine uptake using Iodine-124' },
  { id: 'liver', name: 'Liver', targets: ['cu64'], icon: '🫘', description: 'Monitors liver function and targets cancer cells for radiation therapy treatment using Copper-64 chloride' },
  { id: 'heart_perf', name: 'Heart Perfusion', targets: ['rb82'], icon: '💓', description: 'Assesses blood flow to heart muscle and detects coronary artery disease using Rubidium-82 chloride' },
];

export default function Medicine() {
  const [draggedIsotope, setDraggedIsotope] = useState(null);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [showDescriptions, setShowDescriptions] = useState({});

  const handleDragStart = (e, isotope) => {
    setDraggedIsotope(isotope);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, organ) => {
    e.preventDefault();
    if (draggedIsotope && organ.targets.includes(draggedIsotope.id)) {
      // Correct match
      setMatches(prev => {
        const currentMatches = prev[organ.id] || [];
        if (!currentMatches.includes(draggedIsotope.id)) {
          const newMatches = [...currentMatches, draggedIsotope.id];
          return { ...prev, [organ.id]: newMatches };
        }
        return prev;
      });
      setShowDescriptions(prev => ({ ...prev, [organ.id]: true }));
      setScore(prev => prev + 10);
      
      // Check if all organs are complete
      const allComplete = organs.every(organ => {
        const organMatches = matches[organ.id] || [];
        return organMatches.length === organ.targets.length;
      });
      if (allComplete) {
        setCompleted(true);
      }
    } else if (draggedIsotope) {
      // Wrong match
      setWrongCount(prev => prev + 1);
      setScore(prev => Math.max(0, prev - 2));
    }
    setDraggedIsotope(null);
  };

  const resetGame = () => {
    setMatches({});
    setScore(0);
    setWrongCount(0);
    setCompleted(false);
    setShowDescriptions({});
    setShowInstructions(false);
  };

  const getTotalMatches = () => {
    return Object.values(matches).reduce((total, organMatches) => total + organMatches.length, 0);
  };

  const getTotalTargets = () => {
    return organs.reduce((total, organ) => total + organ.targets.length, 0);
  };

  if (showInstructions) {
    return (
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-8">
          Medicine: PET Scan Assembly
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">How PET Scans Work</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Positron Emission Tomography (PET) scans use radioactive isotopes to create detailed images of your body's functions.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Different isotopes target specific organs
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                They emit positrons that create gamma rays
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Detectors capture these signals to create images
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-md border border-blue-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Match the correct radioactive isotopes to each organ to assemble a working PET scan! Some organs may need multiple isotopes. Learn about how each isotope works after making the correct match.
            </p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowInstructions(false)} 
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Assembly
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
          🎉 PET Scan Complete!
        </h2>
        <div className="text-left max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <p className="text-xl text-gray-300 mb-4">Excellent work! You've successfully assembled a complete PET scan system.</p>
            <p className="text-2xl mb-4">Final Score: <strong className="text-green-400">{score}</strong> points</p>
            <p className="text-lg text-gray-400">Wrong attempts: <strong className="text-red-400">{wrongCount}</strong></p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">What you learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {organs.map(organ => {
                const organMatches = matches[organ.id] || [];
                return (
                  <div key={organ.id} className="bg-gradient-to-br from-gray-800/30 to-gray-700/30 border border-gray-600 rounded-xl p-4">
                    <div className="text-2xl mb-2">{organ.icon}</div>
                    <div className="font-semibold text-white text-sm">{organ.name}</div>
                    <div className="text-gray-300 text-xs mt-1">
                      {organMatches.map(isotopeId => {
                        const isotope = isotopes.find(i => i.id === isotopeId);
                        return (
                          <span key={isotopeId} className={`inline-block px-2 py-1 rounded mr-1 mb-1 text-xs bg-gradient-to-r ${isotope.color} text-white`}>
                            {isotope.name}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
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
        Medicine: PET Scan Assembly
      </h2>
      
      <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl">
        <div className="text-green-400 font-bold text-xl">Score: {score}</div>
        <div className="text-blue-400 font-bold text-xl">Matches: {getTotalMatches()}/{getTotalTargets()}</div>
        <div className="text-red-400 font-bold text-xl">Wrong: {wrongCount}</div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="isotopes-container">
          <h3 className="text-2xl font-bold text-white mb-6">Available Isotopes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isotopes.map(isotope => (
              <div
                key={isotope.id}
                className={`bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-md border-2 border-gray-600 rounded-2xl p-6 cursor-grab transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                  draggedIsotope?.id === isotope.id ? 'opacity-50 scale-95' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, isotope)}
              >
                <div className={`text-4xl font-bold mb-3 bg-gradient-to-r ${isotope.color} bg-clip-text text-transparent font-mono`}>
                  {isotope.symbol}
                </div>
                <div className="font-bold text-white mb-3 text-lg">{isotope.name}</div>
                <div className="text-gray-300 space-y-2 text-sm">
                  <div>Half-life: {isotope.halfLife}</div>
                  <div>Use: {isotope.use}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="organs-container">
          <h3 className="text-2xl font-bold text-white mb-6">Target Organs</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {organs.map(organ => {
              const organMatches = matches[organ.id] || [];
              const isComplete = organMatches.length === organ.targets.length;
              const isPartiallyComplete = organMatches.length > 0;
              
              return (
                <div
                  key={organ.id}
                  className={`bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border-2 border-dashed border-gray-600 rounded-2xl p-6 min-h-[160px] flex flex-col items-center justify-center transition-all duration-300 hover:border-blue-500 hover:bg-blue-900/20 ${
                    isComplete ? 'border-green-500 bg-green-900/20' : 
                    isPartiallyComplete ? 'border-yellow-500 bg-yellow-900/20' : ''
                  }`}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, organ)}
                >
                  <div className="text-5xl mb-3">{organ.icon}</div>
                  <div className="font-bold text-white mb-2 text-lg">{organ.name}</div>
                  
                  {/* Show matched isotopes */}
                  {organMatches.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-1 mb-2">
                      {organMatches.map(isotopeId => {
                        const isotope = isotopes.find(i => i.id === isotopeId);
                        return (
                          <span key={isotopeId} className="text-sm font-bold text-white">
                            {isotope.symbol}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Progress indicator */}
                  <div className="text-xs text-gray-400 mb-2">
                    {organMatches.length}/{organ.targets.length} isotopes
                  </div>
                  
                  {isComplete && showDescriptions[organ.id] && (
                    <div className="text-gray-300 text-center leading-relaxed text-sm mt-2 p-3 bg-gray-900/50 rounded-lg">
                      {organ.description}
                    </div>
                  )}
                  
                  {isComplete && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      ✓ Complete
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}