import React from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, ExternalLink } from 'lucide-react';
import Button from '../ui/Button';

export default function FeaturedVideo({ video, onSelect }) {
  if (!video) return null;

  return (
    <section className="relative w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff]">
                LATEST FROM TECH BOSS
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
              FEATURED EPISODE
            </h2>
          </div>
          <span className="text-xs font-tech text-slate-400">
            Freshly released Tamil tech teardown & shootout
          </span>
        </div>

        {/* Cinematic Featured Card */}
        <motion.div
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-3xl bg-gradient-to-r from-[#0d101a] via-[#101422] to-[#0d101a] border border-cyan-500/30 shadow-2xl overflow-hidden group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Visual & Video Thumbnail (7 Cols) */}
            <div
              className="lg:col-span-7 relative aspect-video w-full overflow-hidden cursor-pointer"
              onClick={() => onSelect(video)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] lg:bg-gradient-to-r lg:from-transparent lg:to-[#101422] opacity-80" />

              {/* Play Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-[0_0_35px_rgba(239,68,68,0.6)] backdrop-blur-sm transition-all duration-300 group-hover:scale-110">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-black/80 border border-cyan-500/40 text-xs font-tech font-bold text-[#00e5ff] backdrop-blur-md">
                  {video.category}
                </span>
                {video.tag && (
                  <span className="px-3 py-1 rounded-md bg-purple-500/20 border border-purple-500/40 text-xs font-tech font-bold text-purple-300 backdrop-blur-md hidden sm:inline">
                    {video.tag}
                  </span>
                )}
              </div>

              <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-black/90 border border-white/20 text-xs font-mono text-white">
                {video.duration}
              </div>
            </div>

            {/* Content Sidebar (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-5">
              <div className="flex items-center gap-3 text-xs font-tech text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold">
                  <Play className="w-3.5 h-3.5" /> {video.duration}
                </span>
                <span>•</span>
                <span className="text-slate-300 font-mono">
                  {video.quality || "4K UHD"}
                </span>
                <span>•</span>
                <span>{video.date}</span>
              </div>

              <h3
                onClick={() => onSelect(video)}
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold font-display text-white group-hover:text-[#00e5ff] transition-colors leading-tight cursor-pointer"
              >
                {video.title}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {video.description}
              </p>

              <div className="pt-3 flex flex-wrap items-center gap-3.5">
                <Button
                  variant="primary"
                  size="md"
                  icon={Play}
                  onClick={() => onSelect(video)}
                >
                  WATCH VIDEO
                </Button>
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="secondary"
                    size="md"
                    icon={ExternalLink}
                    iconPosition="right"
                  >
                    YouTube
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
