import { motion } from 'framer-motion';
import { Mail, X, CheckCircle2 } from 'lucide-react';

interface ProfileCardProps {
  isLightMode: boolean;
}

export default function ProfileCard({ isLightMode }: ProfileCardProps) {
  return (
    <div className="flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`relative w-full max-w-2xl p-8 rounded-3xl border transition-all duration-500 ${
          isLightMode 
            ? 'bg-white border-black/10 shadow-xl' 
            : 'bg-neutral-900/80 border-white/10 backdrop-blur-md'
        }`}
      >
        {/* X Close/Social Button (Top Right) */}
        <div className="absolute top-6 right-8">
          <div className={`p-2 rounded-xl border transition-colors cursor-pointer ${
            isLightMode ? 'bg-black/5 border-black/10 hover:bg-black/10' : 'bg-white/5 border-white/10 hover:bg-white/10'
          }`}>
            <X className="w-5 h-5" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar Section */}
          <div className="relative shrink-0">
            <div className="w-40 h-40 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl">
              <img 
                src="YOUR_AVATAR_URL_HERE" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-4">
            <div className="space-y-1">
              <h2 className={`text-4xl font-bold tracking-tight flex items-center gap-2 bg-clip-text text-transparent ${
                isLightMode 
                  ? 'bg-gradient-to-b from-neutral-900 to-neutral-500' 
                  : 'bg-gradient-to-b from-white to-neutral-400'
              }`}>
                Harshit Singh
                <CheckCircle2 className="w-6 h-6 text-blue-500 fill-blue-500/10 shrink-0" />
              </h2>
              <p className={`text-lg font-medium ${isLightMode ? 'text-neutral-600' : 'text-neutral-400'}`}>
                Data & AI Enthusiast
              </p>
            </div>

            <p className={`text-base leading-relaxed font-mono ${isLightMode ? 'text-neutral-700' : 'text-neutral-300'}`}>
              CSE undergrad '26 based in Pune, India. 3 months of experience as a 
              Data Analyst intern, working in data, machine learning, and agent 
              automation, while exploring backend systems. Actively seeking 
              internship or fresher roles.
            </p>

            <div className="pt-4">
              <a 
                href="mailto:eharshit.dev@gmail.com"
                className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
              >
                <div className={`p-2 rounded-lg transition-colors ${
                  isLightMode ? 'bg-blue-50' : 'bg-blue-500/10'
                }`}>
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-mono text-sm tracking-tight border-b border-transparent group-hover:border-blue-300">
                  eharshit.dev@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}