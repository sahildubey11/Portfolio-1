import { motion } from 'framer-motion';
import StarBackground from '../StarBackground'; 
import FooterMotion from './Footer';

// Add the prop type
interface SkillsProps {
  isLightMode: boolean;
}

const colorMap = {
  cyan: {
    text: "text-cyan-400",
    hoverText: "group-hover:text-cyan-300",
    border: "hover:border-cyan-400/40",
    shadow: "hover:shadow-cyan-500/20",
    glow: "bg-cyan-500/10"
  },
  blue: {
    text: "text-blue-400",
    hoverText: "group-hover:text-blue-300",
    border: "hover:border-blue-400/40",
    shadow: "hover:shadow-blue-500/20",
    glow: "bg-blue-500/10"
  },
  emerald: {
    text: "text-emerald-400",
    hoverText: "group-hover:text-emerald-300",
    border: "hover:border-emerald-400/40",
    shadow: "hover:shadow-emerald-500/20",
    glow: "bg-emerald-500/10"
  },
  purple: {
    text: "text-purple-400",
    hoverText: "group-hover:text-purple-300",
    border: "hover:border-purple-400/40",
    shadow: "hover:shadow-purple-500/20",
    glow: "bg-purple-500/10"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const skillVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 150, damping: 12 } }
};

// Generates 12 waypoints tracing a smooth circle to use in Framer Motion keyframes
const generateCircularPath = (radius: number, reverse: boolean = false) => {
  const x = [];
  const y = [];
  for (let i = 0; i <= 12; i++) {
    const angle = (i * 30 * Math.PI) / 180;
    x.push((reverse ? -radius : radius) * Math.sin(angle));
    y.push(-radius + radius * Math.cos(angle)); // Starts at 0, drifts up to -2*radius, then back to 0
  }
  return { x, y };
};

const backgroundIcons = [
  { slug: "react", top: "10%", left: "5%", size: 64, delay: 0 },
  { slug: "nodedotjs", top: "20%", left: "85%", size: 72, delay: 1 },
  { slug: "python", top: "35%", left: "8%", size: 56, delay: 2 },
  { slug: "docker", top: "45%", left: "88%", size: 80, delay: 0.5 },
  { slug: "git", top: "60%", left: "5%", size: 48, delay: 1.5 },
  { slug: "figma", top: "70%", left: "90%", size: 64, delay: 2.5 },
  { slug: "linux", top: "85%", left: "10%", size: 72, delay: 0.2 },
  { slug: "graphql", top: "95%", left: "85%", size: 56, delay: 1.8 },
  { slug: "vercel", top: "15%", left: "50%", size: 60, delay: 0.8 },
  { slug: "github", top: "80%", left: "50%", size: 90, delay: 1.2 }
];

function FloatingBackgroundIcons({ isLightMode }: { isLightMode: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {backgroundIcons.map((icon, i) => {
        // Alternate rotation direction based on index
        const { x, y } = generateCircularPath(25, i % 2 === 0);
        return (
          <motion.div
            key={i}
            className="absolute pointer-events-auto cursor-pointer"
            style={{ top: icon.top, left: icon.left }}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: isLightMode ? 0.08 : 0.10, // Faint ambient opacity
              x,
              y,
              rotate: [0, 10, -10, 0] // Slow spin
            }}
            transition={{
              opacity: { duration: 1, delay: icon.delay },
              x: { duration: 15, repeat: Infinity, ease: "linear", delay: icon.delay },
              y: { duration: 15, repeat: Infinity, ease: "linear", delay: icon.delay },
              rotate: { duration: 12, repeat: Infinity, ease: "easeInOut", delay: icon.delay }
            }}
            whileHover={{
              opacity: 1, // Snaps to full color on hover
              scale: 1.3,
              rotate: 15,
              transition: { duration: 0.3, type: "spring", stiffness: 300 }
            }}
          >
            <img
              src={`https://cdn.simpleicons.org/${icon.slug}${!isLightMode && ['vercel', 'github', 'linux'].includes(icon.slug) ? '/white' : ''}`}
              alt={icon.slug}
              style={{ width: icon.size, height: icon.size }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// Helper function to reliably fetch icons and bypass adblockers
const getIconSrc = (slug: string, isLightMode: boolean) => {
  if (slug === 'amazonaws') {
    // Use the official Wikimedia Commons SVG source to bypass adblockers & ensure fill colors exist
    return 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg';
  }
  if (slug === 'visualstudiocode') {
    // Base64 SVG of VS Code to prevent any broken external URLs
    return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIzLjE1IDIuNTg3TDE4LjIxLjIxYTEuNDk0IDEuNDk0IDAgMCAwLTEuNzA1LjI5bC05LjQ2IDguNjMtNC4xMi0zLjEyOGEuOTk5Ljk5OSAwIDAgMC0xLjI3Ni4wNTdMLjMyNyA3LjI2MUExIDEgMCAwIDAgLjMyNiA4Ljc0TDMuODk5IDEyIC4zMjYgMTUuMjZhMSAxIDAgMCAwIC4wMDEgMS40NzlMMS42NSAxNy45NGEuOTk5Ljk5OSAwIDAgMCAxLjI3Ni4wNTdsNC4xMi0zLjEyOCA5LjQ2IDguNjNhMS40OTIgMS40OTIgMCAwIDAgMS43MDQuMjlsNC45NDItMi4zNzdBMS41IDEuNSAwIDAgMCAyNCAyMC4wNlYzLjkzOWExLjUgMS41IDAgMCAwLS44NS0xLjM1MnptLTUuMTQ2IDE0Ljg2MUwxMC44MjYgMTJsNy4xNzgtNS40NDh2MTAuODk2eiIgZmlsbD0iIzAwN0FDQyIvPjwvc3ZnPg==';
  }
  const needsWhite = !isLightMode && ['framer', 'threedotjs', 'shadcnui', 'express', 'prisma', 'resend'].includes(slug);
  return `https://cdn.simpleicons.org/${slug}${needsWhite ? '/white' : ''}`;
};

export default function Skills({ isLightMode }: SkillsProps) { // Accept the prop here
  const skillCategories = [
    {
      title: "Core Technologies",
      color: "cyan",
      skills: [
        { name: "React", slug: "react" },
        { name: "TypeScript", slug: "typescript" },
        { name: "Tailwind", slug: "tailwindcss" },
        { name: "Node.js", slug: "nodedotjs" },
        { name: "PostgreSQL", slug: "postgresql" },
      ]
    },
    {
      title: "Frontend Mastery",
      color: "blue",
      skills: [
        { name: "Framer", slug: "framer" },
        { name: "Three.js", slug: "threedotjs" },
        { name: "GSAP", slug: "greensock" },
        { name: "WebGL", slug: "webgl" },
        { name: "Shadcn", slug: "shadcnui" },
      ]
    },
    {
      title: "Backend & DevOps",
      color: "emerald",
      skills: [
        { name: "Express", slug: "express" },
        { name: "Prisma", slug: "prisma" },
        { name: "Docker", slug: "docker" },
        { name: "Git", slug: "git" },
        { name: "AWS", slug: "amazonaws" },
      ]
    },
    {
      title: "Tools & Ecosystem",
      color: "purple",
      skills: [
        { name: "Figma", slug: "figma" },
        { name: "Postman", slug: "postman" },
        { name: "VS Code", slug: "visualstudiocode" },
        { name: "Resend", slug: "resend" },
        { name: "Supabase", slug: "supabase" },
      ]
    }
  ];

  return (
   <div className={`min-h-screen flex flex-col transition-colors duration-1000 relative isolate overflow-hidden ${
    // Use bg-transparent in dark mode to let stars show through
    isLightMode ? 'bg-transparent text-black' : 'bg-transparent text-white'
  }`}>
      
      <StarBackground isLightMode={isLightMode} />
      {/* Background Gradient overlay logic */}
      <div className={`absolute inset-0  pointer-events-none z-[-1] transition-opacity duration-1000 ${
      // Using a lighter opacity (40%) so it doesn't drown out the stars
      isLightMode ? 'opacity-0' : 'bg-gradient-to-b from-transparent via-neutral-950/40 to-neutral-950'
    }`} />

      <FloatingBackgroundIcons isLightMode={isLightMode} />

      <main className="relative z-[100] flex-1 w-full max-w-7xl mx-auto px-4 lg:px-8 pt-20 pb-6 flex flex-col justify-center">
      {/* ... rest of your header and grid code ... */}
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12 relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-block px-4 py-1.5 mb-4 text-xs md:text-sm font-semibold tracking-widest uppercase border rounded-full transition-colors duration-500 ${
              isLightMode ? 'bg-black/5 border-black/10 text-cyan-600' : 'bg-white/5 border-white/10 text-cyan-400'
            }`}
          >
            My Stack
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-5xl md:text-7xl font-black tracking-tighter mb-4 transition-colors duration-500 ${
              isLightMode ? 'text-black' : 'text-white'
            }`}
          >
            Technical <span className="text-neutral-500 italic">Expertise</span>
          </motion.h1>
          
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.4 }}
             className={`text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed transition-colors duration-500 ${
               isLightMode ? 'text-neutral-600' : 'text-neutral-400'
             }`}
          >
            Synthesizing modern tools and architectures to build robust digital products.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {skillCategories.map((category, i) => {
            const theme = colorMap[category.color as keyof typeof colorMap];
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative backdrop-blur-3xl border rounded-[2rem] p-5 lg:p-6 transition-all duration-500 overflow-hidden ${
                  isLightMode 
                    ? 'bg-white border-black/10 hover:shadow-2xl' 
                    : 'bg-neutral-900/90 backdrop-blur-md border-white/10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                } ${theme.border} ${theme.shadow} z-[120]`}
              >
                {/* Floating animated gradient orb */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 90, 0]
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`absolute -top-10 -right-10 w-32 h-32 blur-3xl rounded-full -z-10 ${theme.glow}`} 
                />

                {/* Internal Radial Glow */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl rounded-full -z-10 ${theme.glow}`} />

                <h3 className={`text-lg md:text-xl font-bold mb-6 tracking-tight transition-colors ${theme.text} ${theme.hoverText}`}>
                  {category.title}
                </h3>

                <motion.div 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
                  }}
                  className="grid grid-cols-2 gap-x-4 gap-y-6 md:gap-y-8"
                >
                  {category.skills.map((skill, j) => {
                    // Small circular orbit for the grid items
                    const { x, y } = generateCircularPath(4, (i + j) % 2 === 0);
                    return (
                      <motion.div 
                        key={j}
                        variants={skillVariants}
                        whileHover={{ scale: 1.15, y: -5 }}
                        className="flex flex-col items-center text-center gap-4 group/icon cursor-pointer"
                      >
                        <motion.div 
                          animate={{ x, y }} // Gentle circular float effect
                          transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: (i * 5 + j) * 0.2 }}
                          className={`p-3 rounded-xl transition-all duration-300 ${
                          isLightMode ? 'bg-black/5 group-hover/icon:bg-white group-hover/icon:shadow-[0_0_20px_rgba(0,0,0,0.05)]' : 'bg-white/5 group-hover/icon:bg-neutral-800 group-hover/icon:shadow-[0_0_20px_rgba(255,255,255,0.05)]'
                        } border border-transparent group-hover/icon:border-current ${theme.text} ${theme.hoverText}`}>
                          <img 
                            src={getIconSrc(skill.slug, isLightMode)} 
                            alt={skill.name} 
                            className={`w-6 h-6 lg:w-8 lg:h-8 object-contain transition-transform duration-300 group-hover/icon:scale-110 ${!isLightMode && skill.slug === 'amazonaws' ? 'brightness-0 invert' : ''}`}
                          />
                        </motion.div>
                        <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                          isLightMode ? 'text-neutral-400 group-hover/icon:text-black' : 'text-neutral-500 group-hover/icon:text-white'
                        }`}>
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </main>
      <footer>
        <FooterMotion isLightMode={isLightMode} />
      </footer>
    </div>
  );
}