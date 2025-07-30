"use client";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 relative overflow-hidden" style={{ scrollBehavior: 'smooth' }}>
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-30 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-20 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
      </div>
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-gray-800 mt-8 z-10">
        {/* Navigation Bar */}
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
              <a href="#home" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">home</a>
            </li>
            <li>
              <a href="#mindmap" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">mindmap</a>
            </li>
            <li>
              <a href="#quiz" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">quiz</a>
            </li>
            <li>
              <a href="#calculator" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">calculator</a>
            </li>
            <li>
              <a href="#aboutus" className="px-4 py-1 rounded-full transition-colors duration-200 hover:bg-white/10 hover:text-white cursor-pointer block">about us</a>
            </li>
          </ul>
          {/* Create Account */}
          <button className="ml-4 px-5 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition text-sm hidden md:block">Create Account</button>
        </nav>
      </div>
      {/* Home Section */}
      <section id="home" className="w-full max-w-6xl min-h-[60vh] flex flex-col items-center justify-center mt-8 scroll-mt-32">
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
      <section id="mindmap" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">Mindmap Section (placeholder)</div>
      </section>
      {/* Quiz Section */}
      <section id="quiz" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">Quiz Section (placeholder)</div>
      </section>
      {/* Calculator Section */}
      <section id="calculator" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">Calculator Section (placeholder)</div>
      </section>
      {/* About Us Section */}
      <section id="aboutus" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">About Us Section (placeholder)</div>
      </section>
    </div>
  );
}

// Tailwind CSS for background animation
// Add to your globals.css:
// @keyframes bg-move1 { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(40px) scale(1.05); } 100% { transform: translateY(0) scale(1); } }
// @keyframes bg-move2 { 0% { transform: translateY(0) scale(1); } 50% { transform: translateY(-40px) scale(1.08); } 100% { transform: translateY(0) scale(1); } }
// .animate-bg-move1 { animation: bg-move1 12s ease-in-out infinite; }
// .animate-bg-move2 { animation: bg-move2 16s ease-in-out infinite; }
