import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, Clock, Eye, Calendar } from 'lucide-react';
import Button from '../ui/Button';

export default function VideoModal({ video, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-3xl rounded-2xl bg-[#0e111a] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#090b12]">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-tech font-bold text-white uppercase tracking-wider">
                TECH BOSS PREVIEW • {video.category}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media Player Area */}
          <div className="relative aspect-video w-full bg-black group overflow-hidden">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-black/40 to-black/20" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-110 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.7)]"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </a>
              <span className="mt-3 text-xs font-tech uppercase text-white/90 bg-black/60 px-3 py-1 rounded-full border border-white/15 backdrop-blur-sm">
                Click to watch on YouTube
              </span>
            </div>

            {/* Duration pill */}
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 font-mono text-xs text-white border border-white/20">
              {video.duration}
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {video.title}
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {video.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-tech text-slate-400 pt-2 border-t border-white/5">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Clock className="w-3.5 h-3.5" /> {video.duration}
              </span>
              <span className="font-mono text-slate-300">
                {video.quality || "4K UHD"}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> {video.date}
              </span>
              {video.tag && (
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[11px]">
                  {video.tag}
                </span>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400">
                Official Tech Boss Tamil Video Coverage
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <Button variant="ghost" size="sm" onClick={onClose} className="w-full sm:w-auto">
                  Close
                </Button>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="primary" size="sm" icon={ExternalLink} iconPosition="right" className="w-full">
                    Watch on YouTube
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
