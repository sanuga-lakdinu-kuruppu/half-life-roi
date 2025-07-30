"use client";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function QuizStudios() {
  const searchParams = useSearchParams();
  const domain = searchParams.get('domain');

  const domainInfo = {
    space: { name: "Space Technology", emoji: "🚀", color: "from-blue-500 to-purple-600" },
    agriculture: { name: "Agriculture", emoji: "🌾", color: "from-green-500 to-emerald-600" },
    medical: { name: "Medical", emoji: "🏥", color: "from-red-500 to-pink-600" },
    technology: { name: "Technology", emoji: "💻", color: "from-purple-500 to-indigo-600" },
    finance: { name: "Finance", emoji: "💰", color: "from-yellow-500 to-orange-600" },
    environment: { name: "Environment", emoji: "🌍", color: "from-teal-500 to-cyan-600" }
  };

  const currentDomain = domainInfo[domain] || { name: "Unknown Domain", emoji: "❓", color: "from-gray-500 to-gray-600" };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute w-[60vw] h-[60vw] bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-30 rounded-full blur-3xl animate-bg-move1 top-[-20%] left-[-20%]" />
        <div className="absolute w-[40vw] h-[40vw] bg-gradient-to-tr from-fuchsia-800 via-indigo-900 to-black opacity-20 rounded-full blur-2xl animate-bg-move2 bottom-[-15%] right-[-10%]" />
      </div>

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-20">
        <Link href="/#quiz" className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-full text-white hover:bg-gray-800 transition-colors">
          <span>←</span>
          <span>Back to Quiz</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="text-center z-10">
        <div className="mb-8">
          <div className={`w-24 h-24 bg-gradient-to-br ${currentDomain.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
            <span className="text-4xl">{currentDomain.emoji}</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg mb-4">
            Quiz Studios
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            {currentDomain.name}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Welcome to the interactive quiz studio for {currentDomain.name.toLowerCase()}. 
            Get ready to test your knowledge and challenge yourself!
          </p>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Coming Soon
        </div>
      </div>
    </div>
  );
} 