import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SegmentedLogo from './SegmentedLogo';

export default function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

          {/* Animated White Segmented Logo for Loading Screen */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
              <SegmentedLogo size={140} strokeColor="#FFFFFF" />
            </motion.div>
          </motion.div>

          {/* Brand Name & Tagline */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center z-10"
          >
            <h1 className="text-2xl md:text-3xl font-bold tracking-[0.25em] text-white uppercase font-mono mb-2">
              DOMCODE
            </h1>
            <div className="flex items-center justify-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <p className="text-xs md:text-sm tracking-widest text-zinc-400 uppercase font-light">
                We Build Software Around Your Business
              </p>
            </div>
          </motion.div>

          {/* Minimalist Loading Bar */}
          <div className="absolute bottom-12 w-48 h-[2px] bg-zinc-900 overflow-hidden rounded-full">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="w-full h-full bg-white shadow-[0_0_10px_#ffffff]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
