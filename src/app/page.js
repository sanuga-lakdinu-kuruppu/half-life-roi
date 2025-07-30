// To use the MindMap below, run: npm install reactflow
"use client";
import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const nodeDetails = {
  root: {
    title: "Half Life ROI",
    description: "The central hub for all features: Quiz, Calculator, About Us, and Mindmap."
  },
  quiz: {
    title: "Quiz",
    description: "Test your knowledge with interactive quizzes including MCQ and True/False."
  },
  calculator: {
    title: "Calculator",
    description: "Calculate ROI and half-life values with our advanced calculators."
  },
  aboutus: {
    title: "About Us",
    description: "Learn more about the team and the mission behind Half Life ROI."
  },
  mindmap: {
    title: "Mindmap",
    description: "Visualize the structure and features of the platform in an interactive way."
  },
  "quiz-mcq": {
    title: "MCQ Quiz",
    description: "Multiple choice questions to challenge your understanding."
  },
  "quiz-tf": {
    title: "True/False Quiz",
    description: "Quick true/false questions for rapid learning."
  },
  "calc-roi": {
    title: "ROI Calculator",
    description: "Compute your Return on Investment easily."
  },
  "calc-half": {
    title: "Half-life Calculator",
    description: "Calculate half-life for various scenarios."
  },
  "about-team": {
    title: "Team",
    description: "Meet the creative minds behind this project."
  },
  "mindmap-overview": {
    title: "Mindmap Overview",
    description: "A high-level overview of the mindmap structure."
  },
};

const nodes = [
  {
    id: "root",
    type: "input",
    data: { label: "Half Life ROI" },
    position: { x: 0, y: 150 },
    style: {
      background: "linear-gradient(135deg, #23272f 60%, #3b82f6 100%)",
      color: "#fff",
      border: "2px solid #6366f1",
      borderRadius: 16,
      fontWeight: 700,
      fontSize: 22,
      padding: 24,
      minWidth: 180,
      textAlign: "center",
    },
  },
  {
    id: "quiz",
    data: { label: "Quiz" },
    position: { x: 300, y: 0 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #6366f1 100%)",
      color: "#fff",
      border: "2px solid #6366f1",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 18,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(59,130,246,0.25)",
    },
  },
  {
    id: "calculator",
    data: { label: "Calculator" },
    position: { x: 300, y: 120 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #6366f1 100%)",
      color: "#fff",
      border: "2px solid #6366f1",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 18,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(59,130,246,0.25)",
    },
  },
  {
    id: "aboutus",
    data: { label: "About Us" },
    position: { x: 300, y: 240 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #6366f1 100%)",
      color: "#fff",
      border: "2px solid #6366f1",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 18,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(59,130,246,0.25)",
    },
  },
  {
    id: "mindmap",
    data: { label: "Mindmap" },
    position: { x: 300, y: 360 },
    style: {
      background: "linear-gradient(135deg, #1e293b 60%, #6366f1 100%)",
      color: "#fff",
      border: "2px solid #6366f1",
      borderRadius: 12,
      fontWeight: 600,
      fontSize: 18,
      minWidth: 120,
      textAlign: "center",
      boxShadow: "0 4px 24px 0 rgba(59,130,246,0.25)",
    },
  },
  // Second level nodes for Quiz
  {
    id: "quiz-mcq",
    data: { label: "MCQ" },
    position: { x: 600, y: -30 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #6366f1",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 15,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(99,102,241,0.18)",
    },
  },
  {
    id: "quiz-tf",
    data: { label: "True/False" },
    position: { x: 600, y: 30 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #6366f1",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 15,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(99,102,241,0.18)",
    },
  },
  // Second level nodes for Calculator
  {
    id: "calc-roi",
    data: { label: "ROI Calc" },
    position: { x: 600, y: 90 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #6366f1",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 15,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(99,102,241,0.18)",
    },
  },
  {
    id: "calc-half",
    data: { label: "Half-life Calc" },
    position: { x: 600, y: 150 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #6366f1",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 15,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(99,102,241,0.18)",
    },
  },
  // Second level nodes for About Us
  {
    id: "about-team",
    data: { label: "Team" },
    position: { x: 600, y: 270 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #6366f1",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 15,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(99,102,241,0.18)",
    },
  },
  // Second level nodes for Mindmap
  {
    id: "mindmap-overview",
    data: { label: "Overview" },
    position: { x: 600, y: 390 },
    style: {
      background: "#23272f",
      color: "#fff",
      border: "1.5px solid #6366f1",
      borderRadius: 10,
      fontWeight: 500,
      fontSize: 15,
      minWidth: 80,
      textAlign: "center",
      boxShadow: "0 2px 12px 0 rgba(99,102,241,0.18)",
    },
  },
];

const edges = [
  { id: "e-root-quiz", source: "root", target: "quiz", animated: true, style: { stroke: "#6366f1" }, markerEnd: { type: "arrowclosed", color: "#6366f1" } },
  { id: "e-root-calculator", source: "root", target: "calculator", animated: true, style: { stroke: "#6366f1" }, markerEnd: { type: "arrowclosed", color: "#6366f1" } },
  { id: "e-root-aboutus", source: "root", target: "aboutus", animated: true, style: { stroke: "#6366f1" }, markerEnd: { type: "arrowclosed", color: "#6366f1" } },
  { id: "e-root-mindmap", source: "root", target: "mindmap", animated: true, style: { stroke: "#6366f1" }, markerEnd: { type: "arrowclosed", color: "#6366f1" } },
  { id: "e-quiz-mcq", source: "quiz", target: "quiz-mcq", animated: true, style: { stroke: "#818cf8" }, markerEnd: { type: "arrowclosed", color: "#818cf8" } },
  { id: "e-quiz-tf", source: "quiz", target: "quiz-tf", animated: true, style: { stroke: "#818cf8" }, markerEnd: { type: "arrowclosed", color: "#818cf8" } },
  { id: "e-calc-roi", source: "calculator", target: "calc-roi", animated: true, style: { stroke: "#818cf8" }, markerEnd: { type: "arrowclosed", color: "#818cf8" } },
  { id: "e-calc-half", source: "calculator", target: "calc-half", animated: true, style: { stroke: "#818cf8" }, markerEnd: { type: "arrowclosed", color: "#818cf8" } },
  { id: "e-about-team", source: "aboutus", target: "about-team", animated: true, style: { stroke: "#818cf8" }, markerEnd: { type: "arrowclosed", color: "#818cf8" } },
  { id: "e-mindmap-overview", source: "mindmap", target: "mindmap-overview", animated: true, style: { stroke: "#818cf8" }, markerEnd: { type: "arrowclosed", color: "#818cf8" } },
];

function MindMapFlow() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: "100%", height: 500 }} className="rounded-2xl bg-black/60 shadow-xl border border-gray-800 relative">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
          minZoom: 0.5,
          maxZoom: 1.5
        }}
        panOnDrag
        zoomOnScroll
        defaultEdgeOptions={{ animated: true }}
        style={{ background: "transparent" }}
        onNodeClick={(_, node) => setSelected(node.id)}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
      >
        <MiniMap nodeColor={() => "#6366f1"} maskColor="#18181b" />
        <Controls showInteractive={false} />
        <Background color="#23272f" gap={32} />
      </ReactFlow>
      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-700/90 border border-gray-700 rounded-2xl shadow-2xl p-8 min-w-[320px] max-w-[90vw] max-h-[80vh] flex flex-col items-center justify-center animate-pop-up">
            <button
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800/70 hover:bg-gray-700 text-gray-300 hover:text-white transition"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <h2 className="text-2xl font-bold text-white mb-2 text-center drop-shadow-lg">{nodeDetails[selected]?.title}</h2>
            <p className="text-gray-300 text-center text-lg mb-2">{nodeDetails[selected]?.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 relative overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-30 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-20 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
      </div>
      
      {/* Navigation Bar - Fixed at top */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-gray-800 mt-8 z-10 fixed top-8 left-1/2 transform -translate-x-1/2">
        <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-white/80 to-gray-400/30 rounded-full flex items-center justify-center">
              {/* Placeholder for logo */}
              <span className="text-2xl font-bold text-black/80">◎</span>
            </div>
          </div>
          {/* Menu */}
          <ul className="hidden md:flex gap-2 bg-gray-900/70 rounded-full px-4 py-2 text-sm font-medium text-gray-200">
            <li>
              <a href="#home" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">Home</a>
            </li>
            <li>
              <a href="#mindmap" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">Mindmap</a>
            </li>
            <li>
              <a href="#quiz" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">Quiz</a>
            </li>
            <li>
              <a href="#calculator" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">Calculator</a>
            </li>
            <li>
              <a href="#aboutus" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">About Us</a>
            </li>
          </ul>
          {/* Create Account */}
          <button className="ml-4 px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition text-sm hidden md:block">Create Account</button>
        </nav>
      </div>
      
      {/* Content Sections */}
      <div className="w-full max-w-6xl mt-32">
        {/* Home Section */}
        <section id="home" className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32">
          <div className="flex flex-col items-center justify-center w-full py-20">
            <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-br from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg text-center animate-pulse">
              Half Life ROI
            </h1>
            <span className="mt-6 text-2xl md:text-3xl font-mono text-gray-400 tracking-widest uppercase letter-spacing-wider bg-gray-900/60 px-6 py-2 rounded-full shadow-lg animate-fade-in">
              by Code Wizard
            </span>
          </div>
        </section>
        
        {/* Mindmap Section */}
        <section id="mindmap" className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Visual Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the interconnected world of Half Life ROI through our interactive mind map
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Interactive
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Dynamic
              </span>
              <span className="bg-gradient-to-r from-pink-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Connected
              </span>
            </div>
          </div>
          <MindMapFlow />
        </section>
        
        {/* Quiz Section */}
        <section id="quiz" className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              Knowledge Quest
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Test your expertise with our comprehensive quiz system designed to challenge and educate
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                MCQ
              </span>
              <span className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                True/False
              </span>
              <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Interactive
              </span>
            </div>
          </div>
          
          {/* Domain Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
            {/* Space Technology */}
            <div className="group cursor-pointer" onClick={() => window.location.href = '/quiz-studios?domain=space'}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Space Technology</h3>
                  <p className="text-gray-400 text-sm">Explore the cosmos through interactive quizzes</p>
                </div>
              </div>
            </div>

            {/* Agriculture */}
            <div className="group cursor-pointer" onClick={() => window.location.href = '/quiz-studios?domain=agriculture'}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Agriculture</h3>
                  <p className="text-gray-400 text-sm">Test your knowledge of farming and crops</p>
                </div>
              </div>
            </div>

            {/* Medical */}
            <div className="group cursor-pointer" onClick={() => window.location.href = '/quiz-studios?domain=medical'}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-red-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🏥</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Medical</h3>
                  <p className="text-gray-400 text-sm">Challenge yourself with healthcare knowledge</p>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="group cursor-pointer" onClick={() => window.location.href = '/quiz-studios?domain=technology'}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Technology</h3>
                  <p className="text-gray-400 text-sm">Dive into the world of tech and innovation</p>
                </div>
              </div>
            </div>

            {/* Finance */}
            <div className="group cursor-pointer" onClick={() => window.location.href = '/quiz-studios?domain=finance'}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">💰</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Finance</h3>
                  <p className="text-gray-400 text-sm">Master the art of money and investments</p>
                </div>
              </div>
            </div>

            {/* Environment */}
            <div className="group cursor-pointer" onClick={() => window.location.href = '/quiz-studios?domain=environment'}>
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-teal-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/20">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Environment</h3>
                  <p className="text-gray-400 text-sm">Learn about our planet and sustainability</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Calculator Section */}
        <section id="calculator" className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Precision Tools
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced calculators for ROI analysis and half-life calculations with real-time results
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                ROI Calc
              </span>
              <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Half-life
              </span>
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Real-time
              </span>
            </div>
          </div>
          <div className="text-4xl text-gray-200 font-bold">Calculator Section (placeholder)</div>
        </section>
        
        {/* About Us Section */}
        <section id="aboutus" className="w-full min-h-screen flex flex-col items-center justify-center scroll-mt-32">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-violet-500 bg-clip-text text-transparent mb-4">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover the passionate minds behind Half Life ROI and our mission to revolutionize financial technology
            </p>
            <div className="flex justify-center mt-4">
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Innovators
              </span>
              <span className="bg-gradient-to-r from-purple-500 to-violet-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Experts
              </span>
              <span className="bg-gradient-to-r from-violet-500 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium ml-2">
                Visionaries
              </span>
            </div>
          </div>
          <div className="text-4xl text-gray-200 font-bold">About Us Section (placeholder)</div>
        </section>
      </div>
    </div>
  );
}
