import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import StarBackground from '../StarBackground';
import { ExternalLink, Github, Layers, Layout, Smartphone, Globe, ArrowUpRight, Code2 } from 'lucide-react';
import FooterMotion from './Footer';

interface ProjectsProps {
  isLightMode: boolean;
  setCursorVariant: (variant: string) => void;
  setLeaderVariant: (variant: string) => void;
}

const projects = [
  {
    title: "DineFlow Pro",
    category: "Web Application",
    description: "A high-performance restaurant reservation and table management system with real-time analytics.",
    tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    color: "cyan",
    icon: <Layout className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop",
    year: "2024",
    github: "https://github.com/sahildubey11/Restaurant-reservation-and-table-management-system",
    live: "https://restaurant-reservation-and-table-management-system-agqb3h8zn.vercel.app/"
  },
  {
    title: "Lumina Mobile",
    category: "Mobile Design",
    description: "Next-gen crypto wallet focusing on glassmorphism and fluid interactions.",
    tags: ["React Native", "Framer", "Expo"],
    color: "purple",
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop",
    year: "2023",
    github: "#",
    live: "#"
  },
  {
    title: "Void Engine",
    category: "3D Graphics",
    description: "Custom WebGL rendering engine for interactive storytelling.",
    tags: ["WebGL", "GLSL", "TypeScript"],
    color: "emerald",
    icon: <Layers className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1000&auto=format&fit=crop",
    year: "2024",
    github: "#",
    live: "#"
  },
  {
    title: "Ethereal Portfolio",
    category: "Design System",
    description: "A minimalist design language built for modern creative developers.",
    tags: ["Next.js", "GSAP", "Prisma"],
    color: "blue",
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop",
    year: "2023",
    github: "#",
    live: "#"
  }
];

const glowMap = {
  cyan: {
    light: "hover:shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:border-cyan-400/60",
    dark: "hover:shadow-[0_0_40px_rgba(6,182,212,0.2)] hover:border-cyan-400/40"
  },
  purple: {
    light: "hover:shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:border-purple-400/60",
    dark: "hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:border-purple-400/40"
  },
  emerald: {
    light: "hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:border-emerald-400/60",
    dark: "hover:shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:border-emerald-400/40"
  },
  blue: {
    light: "hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:border-blue-400/60",
    dark: "hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] hover:border-blue-400/40"
  }
};

export default function Projects({ isLightMode, setCursorVariant, setLeaderVariant }: ProjectsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`min-h-screen transition-colors duration-1000 relative isolate overflow-visible ${
      isLightMode ? 'bg-transparent text-black' : 'bg-transparent text-white'
    }`}>
      
      <StarBackground isLightMode={isLightMode} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24">
        <div className="mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter"
          >
            Selected <span className="text-neutral-500 italic">Works</span>
          </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`text-lg md:text-xl max-w-2xl my-8 transition-colors duration-1000 ${
                isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                }`}
            >
                Building digital products with a focus on high-end aesthetics 
                and seamless user interactions.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => {
            const glowClass = glowMap[project.color as keyof typeof glowMap] || { light: 'hover:shadow-xl hover:border-black/20', dark: 'hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:border-white/30' };
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15 + 0.4, ease: "easeOut" }}
                onMouseEnter={() => {
                  setHoveredIndex(i);
                  setCursorVariant("explore");
                  setLeaderVariant("pointer");
                }}
                onMouseLeave={() => {
                  setHoveredIndex(null);
                  setCursorVariant("default");
                  setLeaderVariant("arrow");
                }}
                className={`group relative py-10 md:py-12 px-6 md:px-8 rounded-3xl border transition-all duration-500 flex flex-col h-full ${
                  isLightMode ? `bg-white border-black/10 ${glowClass.light}` : `bg-neutral-900 border-white/10 ${glowClass.dark}`
                } block`}
              >
              <div className="flex flex-col justify-between h-full gap-8 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-neutral-500">{project.year}</span>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${
                      isLightMode ? 'border-black/10 text-neutral-600' : 'border-white/10 text-neutral-400'
                    }`}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter group-hover:translate-x-2 transition-all duration-500 ease-out">
                    {project.title}
                  </h3>
                  <p className={`mt-6 text-base md:text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0 ${
                    isLightMode ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {project.description}
                  </p>
                </div>

                <div className="flex items-end justify-between mt-auto pt-4">
                  <div className="flex flex-wrap gap-2 flex-1">
                    {project.tags.map(tag => (
                      <span key={tag} className={`text-xs px-2 py-1 rounded-md ${isLightMode ? 'bg-black/5 text-neutral-600' : 'bg-white/5 text-neutral-400'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full border transition-all duration-500 ${isLightMode ? 'border-black/10 hover:bg-black hover:text-white' : 'border-white/10 hover:bg-white hover:text-black'}`}
                      title="View Source Code"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full border transition-all duration-500 ${isLightMode ? 'border-black/10 hover:bg-black hover:text-white' : 'border-white/10 hover:bg-white hover:text-black'}`}
                      title="Live Preview"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Hover Image Preview */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%", rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%", rotate: -2 }}
                    exit={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%", rotate: 10 }}
                    className="fixed left-1/2 top-1/2 w-[500px] xl:w-[600px] aspect-video z-[50] pointer-events-none hidden lg:block"
                  >
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Background Hover Reveal */}
              <div 
                className={`absolute inset-0 -z-10 rounded-3xl transition-opacity duration-500 opacity-0 group-hover:opacity-100 ${
                  isLightMode ? 'bg-neutral-200/30' : 'bg-white/[0.05]'
                }`}
              />
            </motion.div>
            );
          })}
        </div>
      </div>
      <footer>
        <FooterMotion isLightMode={isLightMode} />
      </footer>
    </div>
  );
}