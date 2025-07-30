export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4" style={{ scrollBehavior: 'smooth' }}>
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl bg-black/80 backdrop-blur-md border border-gray-800 mt-8">
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
      {/* Sections */}
      <section id="mindmap" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center border-b border-gray-800 mt-8 scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">Mindmap Section (placeholder)</div>
      </section>
      <section id="quiz" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center border-b border-gray-800 scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">Quiz Section (placeholder)</div>
      </section>
      <section id="calculator" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center border-b border-gray-800 scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">Calculator Section (placeholder)</div>
      </section>
      <section id="aboutus" className="w-full max-w-6xl min-h-[60vh] flex items-center justify-center scroll-mt-32">
        <div className="text-4xl text-gray-200 font-bold">About Us Section (placeholder)</div>
      </section>
    </div>
  );
}
