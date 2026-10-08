import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw the loader this session
    const hasLoaded = sessionStorage.getItem('tb_intro_shown');
    if (hasLoaded) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('tb_intro_shown', 'true');
            setIsVisible(false);
            onComplete?.();
          }, 350);
          return 100;
        }
        return prev + 12;
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#07080c] select-none"
      >
        <div className="relative flex flex-col items-center">
          {/* Subtle Ambient Pulse */}
          <div className="absolute w-44 h-44 rounded-full bg-[#00e5ff]/15 blur-3xl" />

          {/* Logo Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center z-10"
          >
            <div className="text-3xl sm:text-4xl font-black font-display tracking-tight text-white">
              TECH <span className="text-[#00e5ff]">BOSS</span>
            </div>
            <p className="mt-1 text-xs font-tech text-slate-400 tracking-widest uppercase">
              TAMIL TECH • BEYOND LIMITS
            </p>
          </motion.div>

          {/* Thin Animated Loading Line */}
          <div className="w-56 sm:w-64 h-[2px] bg-white/10 rounded-full mt-6 overflow-hidden z-10">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00e5ff] via-[#8b5cf6] to-[#00e5ff]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between w-56 sm:w-64 text-[10px] font-mono text-slate-500 z-10">
            <span>INITIALIZING SYSTEM</span>
            <span className="text-[#00e5ff]">{progress}%</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
