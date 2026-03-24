
import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useSmoothScroll } from './SmoothScroll';
import { Routes, Route } from 'react-router-dom'
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import MarqueeMotion from './MarqueeMotion';
import Projects from './pages/Projects';

import { Link, useNavigate, useLocation } from 'react-router-dom';
import StarBackground from './StarBackground';
import About from './pages/About';
const PerspectiveText = ({ label }: { label: string }) => {
  return (
    <motion.div 
      initial="initial"
      whileHover="hovered"
      className="relative flex overflow-hidden cursor-pointer"
    >
      {label.split("").map((char, i) => (
        <div key={i} className="relative">
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.02 
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
          <motion.span
            className="absolute left-0 top-0 inline-block"
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{ 
              duration: 0.5, 
              ease: [0.76, 0, 0.24, 1],
              delay: i * 0.02 
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
};

function App() {
 const [isLightMode, setIsLightMode] = useState(false);
const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
const [isAnimating, setIsAnimating] = useState(false);
const [pendingTheme, setPendingTheme] = useState(false); // New: Tracks the "incoming" theme

const toggleTheme = (e: React.MouseEvent) => {
  if (isAnimating) return;
  
  const { clientX, clientY } = e;
  setRipplePos({ x: clientX, y: clientY });
  setPendingTheme(!isLightMode); // Set what the theme WILL be
  setIsAnimating(true);

  // The actual state flip happens halfway through for a seamless blend
  setTimeout(() => {
    setIsLightMode(!isLightMode);
  }, 400); 

  // Reset animation state
  setTimeout(() => {
    setIsAnimating(false);
  }, 850);
};
  useSmoothScroll();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [ballPosition, setBallPosition] = useState({ x: 0, width: 10 });
  const [lockedIndex, setLockedIndex] = useState<number | null>(0); // starts on Work (index 0)

  const [cursorVariant, setCursorVariant] = useState("default");
  const [leaderVariant, setLeaderVariant] = useState("arrow");  

// 1. Position for the LEADER (the Arrow) - Instant
  const leaderX = useMotionValue(-100);
  const leaderY = useMotionValue(-100);



  // follower Spring creates the "lag" / smooth follow effect
  const springConfig = { damping: 20, stiffness: 300, mass: 1.5 };
  const followerX = useSpring(leaderX, springConfig);
  const followerY = useSpring(leaderY, springConfig);


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      leaderX.set(e.clientX);
      leaderY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);



  // Variants for the cursor states
  const leaderVariants = {
  arrow: { scale: 1, opacity: 1 },
  pointer: { scale: 1.1, opacity: 1 }
  };
  const variants = {
    default: {
      height: 16,
      width: 16,
      backgroundColor: "#00fff2",
      mixBlendMode: "normal" as const,
    },
    explore: {
      height: 100,
      width: 100,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
    },
    talk:{
      height: 100,
      width: 100,
      backgroundColor: "#ffffff",
      mixBlendMode: "difference" as const,
    }

  };
  // Typing effect
  const [displayText, setDisplayText] = useState('');
  const phrases = ["Fullstack Engineer", "UI Alchemist", "3D Enthusiast"];
  
  useEffect(() => {
    let i = 0, j = 0;
    const type = () => {
      const currentPhrase = phrases[i];
      setDisplayText(currentPhrase.slice(0, j));
      if (j === currentPhrase.length) {
        i = (i + 1) % phrases.length;
        j = 0;
        setTimeout(type, 1800);
      } else {
        j++;
        setTimeout(type, 70);
      }
    };
    type();
  }, []);


  useEffect(() => {
  const handleLinkHover = () => setLeaderVariant("pointer");
  const handleLinkLeave = () => setLeaderVariant("arrow");

  // Select all interactive elements
  const interactiveElements = document.querySelectorAll("a, button, .cursor-pointer");

  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", handleLinkHover);
    el.addEventListener("mouseleave", handleLinkLeave);
  });

  return () => {
    interactiveElements.forEach((el) => {
      el.removeEventListener("mouseenter", handleLinkHover);
      el.removeEventListener("mouseleave", handleLinkLeave);
    });
  };
}, [displayText]); // Re-run if dynamic content like typing effect updates

const location = useLocation();
// Helper to update ball position
const updateBallPosition = (index: number | null) => {
  if (index === null || !navRefs.current[index]) return;

  const linkEl = navRefs.current[index]!;
  const rect = linkEl.getBoundingClientRect();
  const navRect = navRefs.current[0]!.parentElement!.getBoundingClientRect();
  const centerX = rect.left - navRect.left + rect.width / 2;
  setBallPosition({ x: centerX - 5, width: 10 });
};

// Force initial position on mount / route change
useEffect(() => {
  let defaultIndex = 0;
  if (location.pathname === '/skills') defaultIndex = 1;
  else if (location.pathname === '/contact') defaultIndex = 3;
  // add more routes later

  setLockedIndex(defaultIndex);
  updateBallPosition(defaultIndex);
}, [location.pathname]);

  
return (
    <div className={`min-h-screen overflow-x-hidden relative isolate cursor-none transition-colors duration-700 ${
    isLightMode ? 'bg-neutral-50 text-black' : 'bg-neutral-950 text-white'
  }`}>
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="cloud-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="5" />
        <feDisplacementMap in="SourceGraphic" scale="120" />
      </filter>
    </svg>
      <StarBackground isLightMode={isLightMode} />
        
     <motion.div
  initial={false}
  animate={{
    clipPath: isAnimating 
      ? `circle(150% at ${ripplePos.x}px ${ripplePos.y}px)` 
      : `circle(0% at ${ripplePos.x}px ${ripplePos.y}px)`,
  }}
  transition={{ 
    duration: 0.8, 
    ease: [0.4, 0, 0.2, 1], // Smooth "Accelerate-Decelerate" curve
  }}
  className="fixed inset-0 pointer-events-none"
  style={{
    // Growing color: if moving to light, grow white. If moving to dark, grow black.
    backgroundColor: pendingTheme ? "#fafafa" : "#0a0a0a",
    zIndex: 9998, 
  }}
/>
      

     

      {/* Navbar */}
      <div className="flex justify-center">
      <nav className="my-4 w-[40%] bg-white/5 backdrop-blur-xl relative z-[50] border-2 rounded-4xl border-black/10 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-8 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tighter z-10">
            <a href="/">
            Sahil Dubey<span className="text-cyan-400">.</span>
            </a>
          </h1>

          <div className="relative flex gap-10 text-sm font-medium z-10">
            {[
              { label: 'Projects', href: '/projects', route: '/projects' },
              { label: 'Skills', href: '/skills', route: '/skills' },
              { label: 'About', href: '/about', route: '/about' },
              { label: 'Contact', href: '/contact', route: '/contact' },
            ].map((link, index) => {
              const isActive = lockedIndex === index;
              const isHovered = hoveredIndex === index;

              return (
                <Link
                  key={link.label}
                  to={link.href}
                  ref={(el) => (navRefs.current[index] = el)}
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    updateBallPosition(index); // move on hover
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    // Only reset to locked if not hovering
                    if (lockedIndex !== null) updateBallPosition(lockedIndex);
                  }}
                  onClick={() => {
                    setLockedIndex(index); // lock to this item on click
                    updateBallPosition(index);
                  }}
                  className={`transition-colors ${
                    isActive || isHovered ? 'text-cyan-400' : 'hover:text-cyan-400'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* The ball */}
            <motion.div
              className="absolute -bottom-2 w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 pointer-events-none"
              animate={{ x: ballPosition.x,
                scale: hoveredIndex !== null ? [1, 1.5, 1] : 1
               }}
              transition={{
                x: { type: 'spring', stiffness: 500, damping: 20 },
                y: { duration: 0.3, ease: "easeOut" }
              }}
            />
          </div>
        </div>
      </nav>
    </div>
    <button
      onClick={toggleTheme}
      className="fixed top-4 left-8 z-[5] p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
    >
  {isLightMode ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00fff2" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )}
</button>
      
  <Routes>
        {/* HOME PAGE ROUTE */}
        <Route path="/" element={
          <>
            <section className="min-h-[90vh] flex items-center relative overflow-hidden bottom-10 " id="hero">
              <div className="absolute inset-0 bg-[radial-gradient(#00ffea_0.8px,transparent_1px)] bg-[length:40px_40px] opacity-5 pointer-events-none" />
              <div className="max-w-5xl mx-auto text-center px-6 relative z-10">
                <motion.h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-5">
                  Hey, I'm Sahil Dubey<span className="text-blue-400">.</span>
                </motion.h1>
                <div className="text-4xl md:text-5xl text-neutral-400 mb-8 min-h-[68px]">
                  {displayText}<span className="animate-pulse">|</span>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  <a href="./Projects" className="px-10 py-4 bg-white text-black rounded-2xl font-semibold text-lg"
                    onMouseEnter={() => setCursorVariant("explore")}
                    onMouseLeave={() => setCursorVariant("default")}>See my work →</a>
                  <a href="./Contact" className="px-10 py-4 border border-white/30 rounded-2xl font-semibold text-lg hover:bg-white/10"
                    onMouseEnter={() => setCursorVariant("talk")}
                    onMouseLeave={() => setCursorVariant("default")}>Let's talk</a>
                </div>
              </div>
            </section>

            <MarqueeMotion />

            <section className={`min-h-screen py-20 md:px-30 z-10 flex flex-col justify-center transition-colors duration-1000 ${
                isLightMode ? 'bg-neutral-50 text-black' : 'bg-neutral-950 text-white'
              }`} id="explore">
              <div className="w-full ">
                <p className={`text-lg  tracking-widest uppercase mb-10 flex items-center gap-2 ${
                    isLightMode ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>

                    
                  EXPLORE <span className={`w-2 h-2 rounded-full ${isLightMode ? 'bg-neutral-800' : 'bg-neutral-500'}`}></span>
                  
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
                <div className="md:col-span-4 pb-4">
                  <p className="text-neutral-400 text-lg leading-relaxed">
                    Welcome to the Explore section, where my
                    journey as a Web Developer unfolds. Here,
                    I share my fascination with design and
                    technology, highlighting the projects
                    that inspire me. Each creation is a
                    testament to my dedication to crafting
                    engaging digital experiences. Dive in and
                    discover the unique stories behind my
                    work, as I continue to evolve and embrace
                    new challenges.
                  </p>
                </div>
                <div className="md:col-span-8 flex flex-col items-end">
                  <div className="flex flex-col space-y-0 leading-none">
                    {['ABOUT', 'PROJECTS', 'CONTACT'].map((item) => (
                      <a key={item} 
        href={`/${item.toLowerCase()}`} 
        className={`text-7xl md:text-[10rem] font-black tracking-tighter uppercase transition-colors duration-500 ${
          isLightMode ? 'text-neutral-600 hover:text-black' : 'text-neutral-400 hover:text-white'
        }`}
                        onMouseEnter={() => setCursorVariant("explore")}
                        onMouseLeave={() => setCursorVariant("default")}>
                        <PerspectiveText label={item} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        } />




        {/* SKILLS PAGE ROUTE */}
       
          <Route path="/skills" element={<Skills isLightMode={isLightMode} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects isLightMode={isLightMode} />} />
        
      </Routes>

      {/* THE FOLLOWER (The Dot/Spotlight that trails) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] flex items-center justify-center"
        variants={variants}
        animate={cursorVariant}
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {cursorVariant === "explore" && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black font-bold text-xs uppercase">
            View
          </motion.span>
        )}
        {cursorVariant === "talk" && (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-black font-bold text-xs uppercase">
            Talk
          </motion.span>
        )}
      </motion.div>
      
         {/* THE LEADER (The White Arrow that follows mouse instantly) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        animate={leaderVariant}
        variants={leaderVariants}
        style={{
          x: leaderX,
          y: leaderY,
          // Adjust offset so the tip of the arrow is the actual mouse point
          translateX: "-10%", 
          translateY: "-10%",
        }}
      >

        {leaderVariant === "arrow" ? (
        /* Your existing Triangle Arrow */
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L5 21V3Z" fill="white" stroke="black" strokeWidth="1"/>
        </svg>
      ) : (
        /* The Pointer (Hand) SVG */
        <svg width="24" height="24" viewBox="0 0 24 24" fill="color">
          <path d="M9 3V12M9 3L7 5M9 3L11 5M12 9V12M15 9V12M18 10V12M9 21H15C17.2091 21 19 19.2091 19 17V12.5C19 11.1193 17.8807 10 16.5 10C16.2731 10 16.056 10.0302 15.8504 10.0868C15.4804 9.43105 14.7909 9 14 9C13.7161 9 13.4468 9.05284 13.199 9.14856C12.8344 8.44473 12.1009 8 11.25 8C10.7424 8 10.2785 8.16439 9.9044 8.44181V4.5C9.9044 3.67157 9.23283 3 8.4044 3C7.57597 3 6.9044 3.67157 6.9044 4.5V15.7197C6.9044 15.8458 6.84364 15.9641 6.74103 16.0378L4.35702 17.7505C3.77459 18.1691 3.55192 18.9416 3.82136 19.6091C4.22558 20.6106 5.14324 21 6.13601 21H9Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      </motion.div>

      
    </div>
  );
}

export default App;