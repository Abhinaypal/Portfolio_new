import React, { useRef, useState, useEffect, useMemo } from "react";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 640 : false);

  const text = "Hello there! I'm Abhinay, a passionate Graphic Designer/Web Developer/UI-UX Enthusiast, breathing life into ideas through the magic of design and technology.";
  const words = useMemo(() => text.split(" "), [text]);

  // Navigation functions
  const goToHome = () => setCurrentSlide(0);
  const goToWebDev = () => setCurrentSlide(1);
  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, 1));

  // Random generator for animation
  const getRandomValues = (mobile) => ({
    x: mobile ? Math.random() * 30 - 15 : Math.random() * 80 - 40,
    y: mobile ? Math.random() * 60 + 30 : Math.random() * 150 + 50,
    rotate: Math.random() * 30 - 15,
    delay: Math.random() * 0.4,
  });

  // Stable random values
  const randomValues = useRef(words.map(() => getRandomValues(isMobile)));

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      randomValues.current = words.map(() => getRandomValues(mobile));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [words]);

  return (
    <div className="bg-[#2f2f2f] text-white min-h-screen overflow-x-hidden">
      {/* ✅ NAVBAR */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-6 md:px-24 py-8 z-50">
        <div className="w-1/2">
          <h1 onClick={goToHome} className="text-[24px] md:text-[30px] font-bold text-white cursor-pointer">
            Abhinay Pal.
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-1/2 justify-end">
          <ul className="flex gap-8 lg:gap-16 text-[18px] lg:text-[22px] font-bold text-white">
            <li onClick={goToHome} className="cursor-pointer hover:opacity-70">Home</li>
            <li onClick={goToWebDev} className="cursor-pointer hover:opacity-70">Portfolio</li>
            <li className="cursor-pointer hover:opacity-70">Resume</li>
            <li className="cursor-pointer hover:opacity-70">About Me</li>
          </ul>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
            <div className="space-y-1">
              <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block w-6 h-[2px] bg-white ${menuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block w-6 h-[2px] bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#2f2f2f] flex flex-col items-center gap-6 py-10 text-[20px] font-bold md:hidden shadow-xl">
            <li onClick={() => { goToHome(); setMenuOpen(false); }} className="list-none cursor-pointer">Home</li>
            <li onClick={() => { goToWebDev(); setMenuOpen(false); }} className="list-none cursor-pointer">Portfolio</li>
            <li className="list-none cursor-pointer">Resume</li>
            <li className="list-none cursor-pointer">About Me</li>
          </div>
        )}
      </nav>

      {/* BODY CONTENT */}
      <div className="w-full h-screen overflow-hidden relative">
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {/* ✅ SLIDE 1 → HERO */}
          <div className="w-full h-screen flex-shrink-0 relative">
            <div id="home" className="relative h-full flex items-center px-6 md:px-12 lg:px-24 pt-24">
              {/* BACKGROUND IMAGE */}
              <div
                className="absolute inset-0 bg-no-repeat bg-center md:bg-right bg-contain z-0 opacity-40 md:opacity-100"
                style={{ backgroundImage: "url('/hero.png')" }}
              ></div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2f2f2f] via-[#2f2f2f]/80 to-transparent z-0"></div>

              {/* CONTENT */}
              <div className="relative z-10 w-full md:w-[70%] lg:w-1/2">
                <h1 className="text-[42px] sm:text-[55px] md:text-[65px] lg:text-[90px] font-bold mb-6 text-gray-200 leading-tight">
                  Abhinay Pal
                </h1>

                <div
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="text-[16px] md:text-[18px] lg:text-[20px] text-white leading-relaxed flex flex-wrap gap-x-2 gap-y-1 cursor-default"
                >
                  {words.map((word, i) => {
                    const vals = randomValues.current[i] || { x: 0, y: 0, rotate: 0, delay: 0 };
                    return (
                      <span
                        key={i}
                        className="inline-block transition-transform"
                        style={{
                          transform: hovered
                            ? "translate(0,0) rotate(0deg)"
                            : `translate(${vals.x}px, ${vals.y}px) rotate(${vals.rotate}deg)`,
                          transition: hovered
                            ? `transform 0.5s ease-out ${vals.delay}s`
                            : `transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) ${vals.delay}s`,
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>

                <img
                  src="/left-btn.png"
                  alt="Next Slide"
                  onClick={nextSlide}
                  className="mt-12 w-12 md:w-16 cursor-pointer hover:scale-110 transition animate-bounce"
                />
              </div>
            </div>
          </div>

          {/* ✅ SLIDE 2 → WEB DEV */}
          {/* ✅ SLIDE 2 → WEB DEV CONTENT */}
          <div className="w-full h-screen flex-shrink-0 bg-[#2f2f2f] relative overflow-hidden flex flex-col justify-between px-6 md:px-12 lg:px-24 py-10 pt-24 md:pt-28">

          {/* 🔥 TOP DIV (LEFT - TITLE - RIGHT) */}
          <div className="flex items-center justify-between w-full">

            {/* LEFT BUTTON */}
            <button onClick={goToHome} className="z-40 hover:scale-110 transition active:scale-95">
              <img src="/right-btn.png" alt="Previous" className="w-12 md:w-16" />
            </button>

            {/* TITLE */}
            <h1 className="text-[28px] md:text-[60px] lg:text-[70px] font-bold text-center flex-1">
              Web Development
            </h1>

            {/* RIGHT BUTTON */}
            <button onClick={nextSlide} className="z-40 hover:scale-110 transition active:scale-95">
              <img src="/right-btn.png" alt="Next" className="w-12 md:w-16 rotate-180" />
            </button>

          </div>


          {/* 🔥 CONTENT DIV */}
          <div className="w-full mt-4 text-left">

            <h2 className="text-[20px] md:text-[30px] font-semibold mb-3 text-blue-400">
              Front-end Marvels
            </h2>

            <p className="text-gray-400 text-[14px] md:text-[18px] leading-relaxed w-full">
              Experience seamless user interfaces created with cutting-edge technologies.
              seamless user interfaces created with cutting-edge technologies.
            </p>

          </div>


          {/* 🔥 PROJECT SECTION */}
          <div className="relative w-full max-w-6xl mx-auto h-[300px] md:h-[400px] flex items-center justify-center">

            {/* PROJECT CARDS */}
            <div className="relative w-full h-full flex items-center justify-center">

              {[
                { id: 1, x: "-120%", y: "-10%", rotate: "-8deg" }, 
                { id: 2, x: "0%", y: "-30%", rotate: "0deg" },    
                { id: 3, x: "120%", y: "-10%", rotate: "8deg" }   
              ].map((proj, index) => (
                <div
                  key={proj.id}
                  className="absolute w-44 md:w-72 h-28 md:h-48 rounded-2xl border border-white/10 shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
                  style={{
                    transform: showProjects 
                      ? `translate(${proj.x}, ${proj.y}) rotate(${proj.rotate}) scale(1)` 
                      : `translate(0, 120%) scale(0.5)`,
                    opacity: showProjects ? 1 : 0,
                    zIndex: index === 1 ? 20 : 10,
                    backgroundImage: `url('/project${proj.id}.png')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    transitionDelay: `${index * 120}ms`
                  }}
                />
              ))}

            </div>
          </div>


          {/* 🔥 CENTER DOWN ARROW */}
          {!showProjects && (
          <div className="flex flex-col items-center transition-all duration-500 mb-20">
            {/* LINE */}
            <div className="w-[2px] h-16 bg-gray-400"></div>

            {/* TEXT */}
            <p className="text-sm text-gray-400 align-right">Click the button</p>

            {/* DOWN ARROW */}
            <div className="text-xl mt-1">↓</div>
          </div>)}


          {/* 🔥 TORCH BUTTON */}
          <div className="absolute bottom-[-120px] left-1/2 -translate-x-1/2 z-50">
            <button 
              onClick={() => setShowProjects(!showProjects)}
              className="hover:scale-110 transition active:scale-90"
            >
              <img 
                src="/Torch.png" 
                alt="Toggle" 
                className={`w-16 md:w-20 transition-all duration-500 ${
                  showProjects
                    ? "brightness-125 drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]"
                    : ""
                }`}
              />
            </button>
          </div>

        </div>
        </div>
      </div>
    </div>
  );
}

export default App;