import { motion, setTarget } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter, Send, ArrowRight, Target } from 'lucide-react';
import StarBackground from '../StarBackground';
import FooterMotion from './Footer';

// Add the prop type
interface ContactProps {
  isLightMode: boolean;
  setCursorVariant: (variant: string) => void;
  setLeaderVariant: (variant: string) => void;
}



export default function Contact({ isLightMode,setCursorVariant, setLeaderVariant }: ContactProps)  {
  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-1000 ${
      isLightMode ? 'bg-transparent text-black' : 'bg-transparent text-white'
    }`}>
      <StarBackground isLightMode={isLightMode} />
      
      {/* Background Gradient Overlay */}
      <div className={`absolute inset-0 pointer-events-none z-[-1] transition-opacity duration-1000 ${
        isLightMode ? 'opacity-0' : 'bg-gradient-to-b from-transparent via-neutral-950/40 to-neutral-950'
      }`} />

      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT COLUMN: Catchy Header & Socials */}
          <div className="space-y-12">
            <div>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="text-8xl md:text-9xl italic tracking-tighter mb-8"
              >
                Connect.
              </motion.h1>
              <p className={`text-xl max-w-md leading-relaxed transition-colors duration-500 ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Have a vision you want to turn into a digital masterpiece? Let's discuss your next project.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-6" >
              {[
                { icon: <Github />, label: "GitHub", href: "https://github.com/sahildubey11", color: isLightMode ? "hover:text-black" : "hover:text-white"  }, 
                { icon: <Linkedin />, label: "LinkedIn", href: "https://www.linkedin.com/in/sahildubey11/", color: "hover:text-blue-400" },
                // { icon: <Twitter />, label: "Twitter", href: "#", color: "hover:text-cyan-400" },
                { icon: <Mail />, label: "Email", href: "mailto:sahildubey2004fb@gmail.com", color: "hover:text-emerald-400" },
              ].map((social, i) => (
                <motion.a
                onMouseEnter={() => {
                  setCursorVariant("explore"); // Changes the "Follower" dot
                  setLeaderVariant("pointer"); // Changes the "Leader" arrow
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setLeaderVariant("arrow");
                }}
                  key={i}
                  href={social.href}
                  initial={{ opacity: 0, x: -20 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-4 transition-all duration-300 ${social.color} group ${isLightMode ? 'text-neutral-600' : 'text-neutral-500'}`}
                >
                  <div className={`p-3 rounded-full border transition-all duration-500 group-hover:border-current group-hover:scale-110 group-hover:-rotate-12 ${
                    isLightMode ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'
                  }`}>
                    {social.icon}
                  </div>
                  <span className="text-lg font-medium">{social.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`backdrop-blur-2xl border p-8 md:p-12 rounded-3xl shadow-2xl relative transition-colors duration-500 ${
              isLightMode ? 'bg-white/50 border-black/10 shadow-black/5' : 'bg-white/5 border-white/10'
            }`}
          >
            {/* Animated glow effect behind form */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -z-10 top-10 right-10 w-72 h-72 bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" 
            />
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-cyan-400 uppercase tracking-wider ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className={`w-full border rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400/50 transition-colors ${
                      isLightMode ? 'bg-white/50 border-black/10 placeholder:text-neutral-400 text-black focus:bg-white' : 'bg-white/5 border-white/10 placeholder:text-neutral-600 text-white'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-cyan-400 uppercase tracking-wider ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className={`w-full border rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400/50 transition-colors ${
                      isLightMode ? 'bg-white/50 border-black/10 placeholder:text-neutral-400 text-black focus:bg-white' : 'bg-white/5 border-white/10 placeholder:text-neutral-600 text-white'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-cyan-400 uppercase tracking-wider ml-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Project Inquiry" 
                  className={`w-full border rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400/50 transition-colors ${
                    isLightMode ? 'bg-white/50 border-black/10 placeholder:text-neutral-400 text-black focus:bg-white' : 'bg-white/5 border-white/10 placeholder:text-neutral-600 text-white'
                  }`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-cyan-400 uppercase tracking-wider ml-1">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Tell me about your project..." 
                  className={`w-full border rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400/50 transition-colors resize-none ${
                    isLightMode ? 'bg-white/50 border-black/10 placeholder:text-neutral-400 text-black focus:bg-white' : 'bg-white/5 border-white/10 placeholder:text-neutral-600 text-white'
                  }`}
                />
              </div>

              <motion.button 
              
                onMouseEnter={() => {
                  setCursorVariant("send"); // Changes the "Follower" dot
                  setLeaderVariant("pointer"); // Changes the "Leader" arrow
                }}
                onMouseLeave={() => {
                  setCursorVariant("default");
                  setLeaderVariant("arrow");
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 group"
              >
              
                <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:rotate-12" />
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </main>
      <footer>
        <FooterMotion isLightMode={isLightMode} />
      </footer>
    </div>
  );
}