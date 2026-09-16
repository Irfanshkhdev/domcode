import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import DomCodeLogo from './SegmentedLogo';

export default function NotFound({ onBackToHome }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden text-white font-sans px-4 text-center z-10">
      
      {/* Background Rotating Stealth Eclipse Logo (size 1200, opacity 3%) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="opacity-[0.03]"
        >
          <DomCodeLogo size={1200} />
        </motion.div>
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
        
        {/* Funny Cat GIF */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            alt="Cat searching under keyboard"
            className="w-64 h-64 object-cover rounded-3xl grayscale opacity-80 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] mb-8 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-mono text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 text-5xl md:text-6xl font-extrabold mb-4 tracking-tight"
        >
          404: Dead End
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-zinc-400 font-light text-center max-w-md mx-auto mb-10 text-sm md:text-base leading-relaxed"
        >
          We checked the server, the database, and even under the keyboard. This page doesn't exist.
        </motion.p>

        {/* Return to Base CTA Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={onBackToHome}
          className="px-6 py-3.5 rounded-xl bg-white text-black font-mono text-xs font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center space-x-2 cursor-pointer hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Base</span>
        </motion.button>

      </div>
    </div>
  );
}
