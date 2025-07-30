"use client";
import { useState } from 'react';
import Medicine from './scenes/Medicine';
import Agriculture from './scenes/Agriculture';

const scenes = [
  { key: 'medicine', label: 'Medicine', component: Medicine },
  { key: 'agriculture', label: 'Agriculture', component: Agriculture },
  // Placeholders for other scenes
  { key: 'art', label: 'Art Authentication', component: () => <div>Coming soon: Art Authentication</div> },
  { key: 'industry', label: 'Industry', component: () => <div>Coming soon: Industry</div> },
  { key: 'research', label: 'Research', component: () => <div>Coming soon: Research</div> },
];

export default function Game() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const SceneComponent = scenes[sceneIdx].component;

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-30 rounded-full blur-3xl animate-bounce top-[-20%] left-[-20%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-20 rounded-full blur-2xl animate-pulse bottom-[-15%] right-[-10%]" />
      </div>
      
      {/* Header */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-gray-800 mt-8 z-10">
        <div className="px-8 py-6 border-b border-gray-800">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg text-center">
            Nuclear Isotopes: Beyond Energy
          </h1>
          <p className="text-center text-gray-400 mt-2 text-lg">Interactive Learning Game</p>
        </div>
        
        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-2 p-6 bg-gray-900/70">
          {scenes.map((scene, idx) => (
            <button
              key={scene.key}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                sceneIdx === idx 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-700'
              }`}
              onClick={() => setSceneIdx(idx)}
            >
              {scene.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Main Content */}
      <main className="w-full max-w-6xl mt-8">
        <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl shadow-2xl p-8 min-h-[600px]">
          <SceneComponent />
        </div>
      </main>
    </div>
  );
}