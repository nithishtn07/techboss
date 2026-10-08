import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

export default function GuideCard({ article }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className="group flex flex-col rounded-2xl bg-[#0e111a] border border-white/10 hover:border-cyan-500/40 shadow-lg overflow-hidden transition-all duration-300"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        <img
          src={article.image}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e111a] via-transparent to-transparent opacity-80" />

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-[10px] font-tech font-bold uppercase tracking-wider text-cyan-400 backdrop-blur-md">
          {article.category}
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[11px] font-mono text-slate-300 border border-white/10">
          <Clock className="w-3 h-3 text-cyan-400" />
          <span>{article.readingTime}</span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-[#00e5ff] transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h3>

        <p className="mt-2 text-xs text-slate-400 font-sans line-clamp-3 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-1.5 flex-wrap">
            {article.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-tech text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5"
              >
                #{tag}
              </span>
            ))}
          </div>

          <span className="flex items-center gap-1 text-xs font-tech font-bold text-[#00e5ff] group-hover:translate-x-1 transition-transform">
            Read <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
