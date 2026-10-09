import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Play, Smartphone, BookOpen, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { VIDEOS_DATA } from '../../data/videos';
import { GADGETS_DATA } from '../../data/gadgets';
import { ARTICLES_DATA } from '../../data/articles';

export default function SearchModal({ isOpen, onClose, onSelectVideo }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setQuery('');
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
      // Keyboard shortcut Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedVideos = q
    ? VIDEOS_DATA.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q)
      )
    : VIDEOS_DATA.slice(0, 3);

  const matchedGadgets = q
    ? GADGETS_DATA.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.category.toLowerCase().includes(q) ||
          g.tier.toLowerCase().includes(q) ||
          g.verdict.toLowerCase().includes(q)
      )
    : GADGETS_DATA.slice(0, 2);

  const matchedArticles = q
    ? ARTICLES_DATA.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q)
      )
    : ARTICLES_DATA.slice(0, 2);

  const totalMatches = matchedVideos.length + matchedGadgets.length + matchedArticles.length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop */}
        <div className="absolute inset-0" onClick={handleClose} />

        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl rounded-2xl bg-[#0d101b] border border-cyan-500/30 shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 flex flex-col max-h-[80vh]"
        >
          {/* Search Input Bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#090b12]">
            <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search videos, gadgets, comparisons, or guides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base font-sans text-white placeholder-slate-500 outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded text-slate-400 hover:text-white mr-2 text-xs font-mono"
              >
                Clear
              </button>
            )}
            <button
              onClick={handleClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results Area */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            {q && totalMatches === 0 ? (
              <div className="py-12 text-center">
                <p className="text-base font-display font-semibold text-white">
                  No tech stories or gadgets match "{query}"
                </p>
                <p className="mt-1 text-xs text-slate-400 font-sans">
                  Try searching for "iPhone", "DeepSeek", "OLED", "Snapdragon", or "PC build".
                </p>
              </div>
            ) : (
              <>
                {/* Videos Group */}
                {matchedVideos.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                      <span className="text-xs font-tech font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                        <Play className="w-3.5 h-3.5" /> Videos ({matchedVideos.length})
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          navigate('/videos');
                        }}
                        className="text-[11px] font-tech text-slate-400 hover:text-white"
                      >
                        View all videos →
                      </button>
                    </div>
                    <div className="space-y-2">
                      {matchedVideos.map((vid) => (
                        <div
                          key={vid.id}
                          onClick={() => {
                            onClose();
                            if (onSelectVideo) onSelectVideo(vid);
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer group"
                        >
                          <img
                            src={vid.thumbnail}
                            alt={vid.title}
                            className="w-16 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-display font-medium text-white group-hover:text-cyan-400 truncate">
                              {vid.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                              <span>{vid.category}</span>
                              <span>•</span>
                              <span>{vid.duration}</span>
                              {vid.date && (
                                <>
                                  <span>•</span>
                                  <span>{vid.date}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <a
                            href={vid.youtubeUrl || "https://www.youtube.com/@TechBossTamil/videos"}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onClose();
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/10 shrink-0 transition-colors"
                            title="Watch directly on YouTube"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gadgets Group */}
                {matchedGadgets.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                      <span className="text-xs font-tech font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> Gadgets & Hardware ({matchedGadgets.length})
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          navigate('/tech-hub');
                        }}
                        className="text-[11px] font-tech text-slate-400 hover:text-white"
                      >
                        Open Tech Hub →
                      </button>
                    </div>
                    <div className="space-y-2">
                      {matchedGadgets.map((gadget) => (
                        <div
                          key={gadget.id}
                          onClick={() => {
                            onClose();
                            navigate('/tech-hub');
                          }}
                          className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.02] hover:bg-purple-500/10 border border-transparent hover:border-purple-500/30 transition-all cursor-pointer group"
                        >
                          <img
                            src={gadget.image}
                            alt={gadget.name}
                            className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-display font-medium text-white group-hover:text-purple-300 truncate">
                              {gadget.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                              <span>{gadget.tier || gadget.category}</span>
                              <span>•</span>
                              <span className="text-cyan-400">{gadget.priceEst}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles Group */}
                {matchedArticles.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                      <span className="text-xs font-tech font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Guides & Deep Dives ({matchedArticles.length})
                      </span>
                    </div>
                    <div className="space-y-2">
                      {matchedArticles.map((art) => (
                        <div
                          key={art.id}
                          onClick={() => {
                            onClose();
                            navigate('/tech-hub');
                          }}
                          className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/30 transition-all cursor-pointer group"
                        >
                          <h4 className="text-xs sm:text-sm font-display font-medium text-white group-hover:text-emerald-300 truncate">
                            {art.title}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            {art.category} • {art.readingTime}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="px-4 py-2.5 border-t border-white/10 bg-[#090b12] flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Live local index filter</span>
            <div className="flex items-center gap-3">
              <span>[ESC] to close</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
