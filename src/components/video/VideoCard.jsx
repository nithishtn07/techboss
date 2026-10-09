import React from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, ExternalLink } from 'lucide-react';

export default function VideoCard({ video, onSelect }) {
  const targetUrl = video?.youtubeUrl || "https://www.youtube.com/@TechBossTamil/videos";

  const handleCardClick = (e) => {
    // If the user clicked specifically on the Details modal trigger, don't open YouTube
    if (e.target.closest('[data-modal-trigger="true"]')) {
      e.preventDefault();
      e.stopPropagation();
      if (onSelect) onSelect(video);
      return;
    }
    // Default anchor behavior opens targetUrl in new tab
  };

  return (
    <motion.a
      href={targetUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleCardClick}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl bg-[#0e111b] border border-white/10 hover:border-cyan-500/40 shadow-lg hover:shadow-[0_10px_30px_rgba(0,229,255,0.12)] overflow-hidden cursor-pointer"
      title={`Watch "${video?.title}" on YouTube`}
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={video?.thumbnail}
          alt={video?.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e111b] via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Animated Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 group-hover:scale-115 group-hover:bg-red-600 group-hover:border-red-500 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.6)]">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Category Pill (Top Left) */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 border border-white/10 text-[10px] font-tech font-bold uppercase tracking-wider text-[#00e5ff] backdrop-blur-md">
          {video?.category}
        </div>

        {/* Quality / Resolution (Top Right) */}
        {video?.quality && (
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/75 text-[10px] font-mono text-slate-300 border border-white/10 backdrop-blur-md">
            {video.quality}
          </div>
        )}

        {/* Duration (Bottom Right) */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/85 text-[11px] font-mono font-medium text-white border border-white/10">
          {video?.duration}
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold font-display text-white line-clamp-2 group-hover:text-[#00e5ff] transition-colors leading-snug">
          {video?.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400 line-clamp-2 font-sans leading-relaxed">
          {video?.description}
        </p>

        {/* Footer Meta & Watch Trigger */}
        <div className="mt-auto pt-4 flex items-center justify-between text-xs font-tech text-slate-400 border-t border-white/5">
          <span className="flex items-center gap-1.5 text-cyan-400/90 font-medium">
            <Clock className="w-3.5 h-3.5" /> {video?.duration}
          </span>
          <div className="flex items-center gap-2">
            {onSelect && (
              <button
                type="button"
                data-modal-trigger="true"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(video);
                }}
                className="px-2 py-0.5 rounded text-[11px] font-tech text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Preview video details"
              >
                Details
              </button>
            )}
            <span className="text-[11px] font-tech font-semibold text-white group-hover:text-[#00e5ff] flex items-center gap-1">
              <span>Watch Video</span>
              <ExternalLink className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
