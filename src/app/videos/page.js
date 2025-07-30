"use client";
import { useState } from "react";
import Link from "next/link";

export default function VideosPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const videoCategories = [
    { id: 'all', name: 'All Videos', icon: '📺', color: 'from-yellow-500 to-orange-600' },
    { id: 'nuclear', name: 'Nuclear Physics', icon: '⚛️', color: 'from-blue-500 to-purple-600' },
    { id: 'roi', name: 'ROI Calculations', icon: '💰', color: 'from-green-500 to-emerald-600' },
    { id: 'applications', name: 'Real Applications', icon: '🌍', color: 'from-orange-500 to-red-600' },
    { id: 'tutorials', name: 'Tutorials', icon: '📚', color: 'from-purple-500 to-pink-600' }
  ];

  const videos = [
    {
      id: 1,
      title: "Introduction to Nuclear Physics",
      category: "nuclear",
      duration: "8:30",
      thumbnail: "🎬",
      description: "Learn the fundamentals of nuclear physics, atomic structure, and radioactive decay.",
      url: "/videos/nuclear-physics"
    },
    {
      id: 2,
      title: "ROI Calculation Methods",
      category: "roi",
      duration: "12:45",
      thumbnail: "💰",
      description: "Master different ROI calculation techniques for investment analysis.",
      url: "/videos/roi-calculations"
    },
    {
      id: 3,
      title: "Nuclear Medicine Applications",
      category: "applications",
      duration: "15:20",
      thumbnail: "🏥",
      description: "Explore how nuclear technology is used in modern medicine.",
      url: "/videos/applications"
    },
    {
      id: 4,
      title: "Half-Life Calculations Tutorial",
      category: "tutorials",
      duration: "10:15",
      thumbnail: "📚",
      description: "Step-by-step guide to calculating half-life and decay rates.",
      url: "/videos/tutorials"
    },
    {
      id: 5,
      title: "Isotope Dating Techniques",
      category: "nuclear",
      duration: "14:30",
      thumbnail: "⏰",
      description: "Understanding carbon dating and other isotope dating methods.",
      url: "/videos/nuclear-physics"
    },
    {
      id: 6,
      title: "Investment Portfolio Analysis",
      category: "roi",
      duration: "18:45",
      thumbnail: "📊",
      description: "Advanced techniques for analyzing investment portfolios and returns.",
      url: "/videos/roi-calculations"
    }
  ];

  const filteredVideos = selectedCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-yellow-900 via-orange-900 to-black opacity-30 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-red-800 via-orange-900 to-black opacity-20 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
      </div>

      {/* Header */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-gray-800 mt-8 z-10">
        <div className="px-8 py-6 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-white/80 to-gray-400/30 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-black/80">◎</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Educational Videos
              </h1>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mt-8 z-10">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-3">
            {videoCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="group cursor-pointer hover-lift"
              onClick={() => window.location.href = video.url}
            >
              <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 hover:border-orange-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{video.thumbnail}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-orange-400 font-semibold">{video.duration}</span>
                    <span className="text-gray-500 text-sm">HD Quality</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Featured Video</h2>
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-700/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-600 overflow-hidden mb-6">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-6xl">▶️</span>
                  </div>
                  <p className="text-gray-400 text-xl">Nuclear Physics Explained</p>
                  <p className="text-gray-500 text-sm">Landscape format, HD quality</p>
                </div>
              </div>
            </div>
            
            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
                <span className="text-xl">🔊</span>
              </button>
              <div className="flex-1 max-w-md">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full w-1/3"></div>
                </div>
              </div>
              <span className="text-gray-400 text-sm">2:45 / 8:30</span>
            </div>
            
            <div className="text-center">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-700 transition-all text-lg hover-lift animate-pulse-glow">
                Watch Full Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 