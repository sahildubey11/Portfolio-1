import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import StarBackground from '../StarBackground';
import FooterMotion from './Footer';
import dpImage from '../dp.jpg';
interface AboutProps {
  isLightMode: boolean;
}
export default function About({ isLightMode }: AboutProps) {
  const [index, setIndex] = useState(0);
  const words = ["A Developer", "A Maker", "A Problem Solver", "A DevOps Engineer"];

  // Typewriter/Word Swap Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000 ${
      isLightMode ? 'bg-transparent text-black' : 'bg-transparent text-white'
    }`}>
      <StarBackground isLightMode={isLightMode} />
      
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0  pointer-events-none z-0" />

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-6 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="space-y-8">
            <header>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-7xl md:text-9xl italic tracking-tighter mb-2 ${
      isLightMode ? 'text-black' : 'text-white'
    }`}
              >
                About
              </motion.h1>
              
              <div className="text-3xl md:text-4xl font-bold flex flex-wrap gap-x-3 items-center">
  <span className={`${
      isLightMode ? 'text-black' : 'text-white'
    }`}>I'm Sahil.</span>
  {/* 1. Increased h to [1.4em] for clearance 
      2. Changed min-w to fit-content or a larger value 
      3. Added flex-1 to let it grow 
  */}
        <div className="relative h-[1.4em] overflow-hidden inline-flex items-center min-w-[250px] sm:min-w-[350px]">
            <AnimatePresence mode="wait">
            <motion.span
                key={words[index]}
                initial={{ y: 30, opacity: 0 }}   /* Increased starting y */
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}    /* Increased exit y */
                transition={{ duration: 0.5, ease: "circOut" }}
                className="absolute left-0 text-cyan-400 whitespace-nowrap" /* Added whitespace-nowrap */
            >
                {words[index]}
            </motion.span>
            </AnimatePresence>
        </div>
        </div>
            </header>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`space-y-6 text-base md:text-lg leading-relaxed max-w-xl transition-colors duration-500 ${
                isLightMode ? 'text-neutral-700' : 'text-neutral-300'
              }`}
            >
              <section>
                <h2 className="text-sm uppercase tracking-[0.3em] text-cyan-500 font-bold mb-3">Who Am I?</h2>
                <p>
                  I thrive on bringing ideas to life through interactive and modern web experiences. 
                  With a deep focus on <span className={`font-medium transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>React, Next.js, and TypeScript</span>, 
                  I build powerful, efficient, and scalable applications.
                </p>
              </section>

              <section>
                <h2 className="text-sm uppercase tracking-[0.3em] text-cyan-500 font-bold mb-3">What Drives Me?</h2>
                <p>
                  My love for problem-solving and continuous learning fuels my passion for development. 
                  I find joy in tackling complex projects and crafting solutions that not only meet technical 
                  standards but provide an <span className={`font-medium transition-colors duration-500 ${isLightMode ? 'text-black' : 'text-white'}`}>exceptional user experience.</span>
                </p>
              </section>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            {/* Decorative frame background */}
            <div className="absolute -inset-4 bg-cyan-500/10 rounded-2xl blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500" />
            
            <div className={`relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] mx-auto aspect-[4/5] overflow-hidden rounded-2xl border shadow-2xl transition-colors duration-500 ${
              isLightMode ? 'border-black/10 bg-white' : 'border-white/10 bg-neutral-900'
            }`}>
              <img 
                src={dpImage} 
                alt="Sahil Dubey" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              
              {/* Subtle glassmorphism overlay on bottom of image */}
              <div className={`absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t to-transparent transition-colors duration-500 ${isLightMode ? 'from-white/90' : 'from-black/80'}`}>
                <p className="text-sm text-cyan-400">#A_Devloper</p>
              </div>
            </div>
          </motion.div>
          
        </div>
      </main>
      <footer>
          <FooterMotion isLightMode={isLightMode} /> 

      </footer>
    </div>
  );
}