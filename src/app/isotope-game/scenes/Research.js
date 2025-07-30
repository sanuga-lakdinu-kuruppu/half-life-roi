"use client";
import { useState, useEffect } from 'react';

// Scientifically accurate research isotopes
const researchIsotopes = [
  { 
    id: 'c14', 
    name: 'Carbon-14', 
    symbol: 'C', 
    halfLife: '5730 years',
    energy: '0.156 MeV (max)',
    color: 'from-green-500 to-emerald-600',
    description: 'Beta emitter for organic tracer studies',
    applications: ['Metabolic studies', 'Carbon dating', 'Biochemical pathways']
  },
  { 
    id: 'p32', 
    name: 'Phosphorus-32', 
    symbol: 'P', 
    halfLife: '14.3 days',
    energy: '1.71 MeV (max)',
    color: 'from-blue-500 to-cyan-600',
    description: 'High-energy beta emitter for nucleic acid research',
    applications: ['DNA sequencing', 'Phosphorylation studies', 'Nucleic acid labeling']
  },
  { 
    id: 's35', 
    name: 'Sulfur-35', 
    symbol: 'S', 
    halfLife: '87.5 days',
    energy: '0.167 MeV (max)',
    color: 'from-yellow-500 to-orange-600',
    description: 'Soft beta emitter for protein research',
    applications: ['Protein labeling', 'Amino acid studies', 'Sulfate metabolism']
  },
  { 
    id: 'h3', 
    name: 'Tritium (³H)', 
    symbol: 'H', 
    halfLife: '12.3 years',
    energy: '0.0186 MeV (max)',
    color: 'from-purple-500 to-pink-600',
    description: 'Low-energy beta emitter for sensitive studies',
    applications: ['Receptor binding', 'Drug metabolism', 'Cell proliferation']
  },
  { 
    id: 'i125', 
    name: 'Iodine-125', 
    symbol: 'I', 
    halfLife: '59.4 days',
    energy: '35 keV (gamma)',
    color: 'from-red-500 to-pink-600',
    description: 'Gamma emitter for immunoassays and imaging',
    applications: ['Immunoassays', 'Molecular imaging', 'Protein binding']
  },
];

// Research experiments with scientifically accurate requirements
const experiments = [
  { 
    id: 'dna_sequencing', 
    name: 'DNA Sequencing', 
    icon: '🧬', 
    description: 'Determine the order of nucleotides in DNA',
    requiredIsotopes: ['p32'],
    explanation: 'Phosphorus-32 is incorporated into DNA during synthesis via dNTPs, allowing autoradiographic detection of newly synthesized DNA strands'
  },
  { 
    id: 'protein_synthesis', 
    name: 'Protein Synthesis', 
    icon: '🧪', 
    description: 'Study protein production in cells',
    requiredIsotopes: ['s35'],
    explanation: 'Sulfur-35 is incorporated into methionine and cysteine amino acids during protein synthesis, enabling tracking of newly synthesized proteins'
  },
  { 
    id: 'metabolic_pathway', 
    name: 'Metabolic Pathway', 
    icon: '🔄', 
    description: 'Track biochemical reactions in cells',
    requiredIsotopes: ['c14'],
    explanation: 'Carbon-14 is incorporated into metabolic intermediates and substrates, following biochemical pathways through autoradiography'
  },
  { 
    id: 'receptor_binding', 
    name: 'Receptor Binding', 
    icon: '🎯', 
    description: 'Study drug-receptor interactions',
    requiredIsotopes: ['h3'],
    explanation: 'Tritium-labeled drugs or ligands bind to receptors, measuring binding affinity and kinetics through liquid scintillation counting'
  },
  { 
    id: 'immunoassay', 
    name: 'Immunoassay', 
    icon: '🔬', 
    description: 'Detect specific proteins or antibodies',
    requiredIsotopes: ['i125'],
    explanation: 'Iodine-125 labels antibodies or antigens via tyrosine residues, enabling sensitive detection in radioimmunoassays'
  },
  { 
    id: 'cell_proliferation', 
    name: 'Cell Proliferation', 
    icon: '📈', 
    description: 'Measure cell growth and division',
    requiredIsotopes: ['h3'],
    explanation: 'Tritium-thymidine is incorporated into DNA during S-phase, measuring cell proliferation rates through autoradiography or liquid scintillation'
  },
];

export default function Research() {
  const [score, setScore] = useState(0);
  const [currentExperiment, setCurrentExperiment] = useState(null);
  const [selectedIsotopes, setSelectedIsotopes] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameActive, setGameActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [analyzedCount, setAnalyzedCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setAnalyzedCount(0);
    setCorrectCount(0);
    setSelectedIsotopes([]);
    setLastResult(null);
    generateNewExperiment();
  };

  const generateNewExperiment = () => {
    const experiment = experiments[Math.floor(Math.random() * experiments.length)];
    setCurrentExperiment(experiment);
    setSelectedIsotopes([]);
    setLastResult(null);
  };

  const handleIsotopeSelection = (isotope) => {
    setSelectedIsotopes(prev => {
      if (prev.find(i => i.id === isotope.id)) {
        return prev.filter(i => i.id !== isotope.id);
      } else {
        return [...prev, isotope];
      }
    });
  };

  const handleAnalysis = () => {
    if (!currentExperiment || selectedIsotopes.length === 0) return;

    // Check if selected isotopes match required isotopes
    const selectedIds = selectedIsotopes.map(i => i.id).sort();
    const requiredIds = currentExperiment.requiredIsotopes.sort();
    const correct = JSON.stringify(selectedIds) === JSON.stringify(requiredIds);
    
    setAnalyzedCount(prev => prev + 1);
    
    // Set result for feedback
    setLastResult({
      correct,
      experiment: currentExperiment,
      selectedIsotopes,
      requiredIsotopes: currentExperiment.requiredIsotopes
    });
    
    if (correct) {
      setCorrectCount(prev => prev + 1);
      setScore(prev => prev + 20);
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }

    // Show modal
    setShowModal(true);

    // Check if game is complete (6 experiments)
    if (analyzedCount + 1 >= 6) {
      setTimeout(() => {
        setShowModal(false);
        setGameActive(false);
        setCompleted(true);
      }, 3000);
    } else {
      setTimeout(() => {
        setShowModal(false);
        generateNewExperiment();
        setSelectedIsotopes([]);
        setLastResult(null);
      }, 3000);
    }
  };

  const resetGame = () => {
    setScore(0);
    setAnalyzedCount(0);
    setCorrectCount(0);
    setCurrentExperiment(null);
    setSelectedIsotopes([]);
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
          Research: Tracer Experiment Design
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">How Research Tracers Work</h3>
            <p className="text-gray-300 mb-6 text-lg leading-relaxed">
              Radioactive isotopes are used as tracers in research to track biological processes, chemical reactions, and molecular interactions.
            </p>
            <ul className="space-y-3 text-gray-300 text-lg">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                Isotopes are incorporated into molecules during synthesis
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                Radioactive decay allows detection and quantification
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                Different isotopes are suitable for different research applications
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-md border border-purple-600 rounded-2xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">Your Mission</h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              Design tracer experiments by selecting the appropriate radioactive isotopes for each research application. Consider the isotope properties and research requirements.
            </p>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setShowInstructions(false)} 
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Research
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
          🎉 Research Complete!
        </h2>
        <div className="text-left max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 backdrop-blur-md border border-green-600 rounded-2xl p-8 mb-8">
            <p className="text-xl text-gray-300 mb-4">Excellent work! You&apos;ve completed the tracer experiment design.</p>
            <p className="text-2xl mb-4">Final Score: <strong className="text-green-400">{score}</strong> points</p>
            <p className="text-lg text-gray-400">Accuracy: <strong className="text-blue-400">{Math.round((correctCount / analyzedCount) * 100)}%</strong> ({correctCount}/{analyzedCount} correct)</p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold text-white mb-6">What you learned:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-600 rounded-xl p-4">
                <div className="text-2xl mb-2">C</div>
                <div className="font-semibold text-white">Carbon-14</div>
                <div className="text-gray-300 text-sm">Organic tracer, 5730 years</div>
              </div>
              <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-600 rounded-xl p-4">
                <div className="text-2xl mb-2">P</div>
                <div className="font-semibold text-white">Phosphorus-32</div>
                <div className="text-gray-300 text-sm">DNA research, 14.3 days</div>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-600 rounded-xl p-4">
                <div className="text-2xl mb-2">S</div>
                <div className="font-semibold text-white">Sulfur-35</div>
                <div className="text-gray-300 text-sm">Protein research, 87.5 days</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-600 rounded-xl p-4">
                <div className="text-2xl mb-2">H</div>
                <div className="font-semibold text-white">Tritium</div>
                <div className="text-gray-300 text-sm">Sensitive studies, 12.3 years</div>
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
        Research: Tracer Experiment Design
      </h2>
      
      {/* Game Stats */}
      <div className="flex justify-between items-center mb-8 p-6 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl">
        <div className="text-green-400 font-bold text-xl">Score: {score}</div>
        <div className="text-blue-400 font-bold text-xl">Experiments: {analyzedCount}/6</div>
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
                {lastResult.correct ? 'Perfect Experiment!' : 'Experiment Error!'}
              </h3>
              
              {/* Experiment Info */}
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <div className="text-4xl mb-2">{lastResult.experiment.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{lastResult.experiment.name}</h4>
                <p className="text-gray-300 text-sm">{lastResult.experiment.description}</p>
              </div>
              
              {/* Isotope Comparison */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Your Selection</div>
                  <div className="text-xs text-gray-300">
                    {lastResult.selectedIsotopes.map(i => i.name).join(', ') || 'None selected'}
                  </div>
                </div>
                <div className="bg-gray-800/30 rounded-lg p-3">
                  <div className="text-sm text-gray-400 mb-1">Required Isotopes</div>
                  <div className="text-xs text-gray-300">
                    {lastResult.requiredIsotopes.map(id => 
                      researchIsotopes.find(i => i.id === id)?.name
                    ).join(', ')}
                  </div>
                </div>
              </div>
              
              {/* Scientific Explanation */}
              <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-xl p-4">
                <div className="text-sm font-bold text-blue-400 mb-2">🔬 Scientific Explanation</div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {lastResult.experiment.explanation}
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
            <p className="text-gray-300 text-xl mb-6">Ready to design tracer experiments?</p>
            <button 
              onClick={startGame}
              className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25"
            >
              Start Research
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experiment Info */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Research Experiment</h3>
            {currentExperiment && (
              <div className="text-center">
                <div className="text-6xl mb-4">{currentExperiment.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{currentExperiment.name}</h4>
                <p className="text-gray-300 mb-4">{currentExperiment.description}</p>
                <div className="text-xs text-gray-500 mt-4 p-3 bg-gray-900/50 rounded-lg">
                  <strong>Required Isotopes:</strong> {currentExperiment.requiredIsotopes.length} isotope(s)
                </div>
              </div>
            )}
          </div>

          {/* Isotope Selection */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-2xl p-6">
            <h3 className="text-2xl font-bold text-white mb-6">Select Isotopes</h3>
            <div className="space-y-3 mb-6">
              {researchIsotopes.map(isotope => (
                <button
                  key={isotope.id}
                  onClick={() => handleIsotopeSelection(isotope)}
                  className={`w-full p-4 rounded-xl transition-all duration-300 ${
                    selectedIsotopes.find(i => i.id === isotope.id)
                      ? `bg-gradient-to-r ${isotope.color} text-white shadow-lg`
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <div className="font-bold">{isotope.name}</div>
                      <div className="text-sm opacity-80">{isotope.symbol}</div>
                      <div className="text-xs opacity-60">Energy: {isotope.energy}</div>
                      <div className="text-xs opacity-60">Half-life: {isotope.halfLife}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs opacity-60">{isotope.description}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Analysis Button */}
            {selectedIsotopes.length > 0 && (
              <button
                onClick={handleAnalysis}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
              >
                Analyze Experiment Design
              </button>
            )}
          </div>
        </div>
      )}

      {/* Educational Info */}
      <div className="mt-8 p-4 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-md border border-gray-600 rounded-xl">
        <h4 className="text-lg font-bold text-white mb-2">Research Principles:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Different isotopes are incorporated into specific molecules during synthesis</li>
          <li>• Radioactive decay allows detection and quantification of biological processes</li>
          <li>• Energy and half-life determine suitability for specific research applications</li>
          <li>• Multiple isotopes may be required for complex experimental designs</li>
          <li>• Tracer experiments enable non-invasive study of biological systems</li>
        </ul>
      </div>
    </div>
  );
} 