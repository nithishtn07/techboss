import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, MessageSquare, CheckCircle } from 'lucide-react';

export default function CommunityWall({ initialQuestions = [] }) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [filter, setFilter] = useState('ALL');
  const [upvotedIds, setUpvotedIds] = useState(new Set());

  const handleUpvote = (id) => {
    const isUpvoted = upvotedIds.has(id);
    const newUpvoted = new Set(upvotedIds);

    if (isUpvoted) {
      newUpvoted.delete(id);
    } else {
      newUpvoted.add(id);
    }
    setUpvotedIds(newUpvoted);

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          return { ...q, upvotes: q.upvotes + (isUpvoted ? -1 : 1) };
        }
        return q;
      })
    );
  };

  const filtered =
    filter === 'ALL'
      ? questions
      : questions.filter((q) => q.category?.toLowerCase() === filter.toLowerCase());

  const categories = ['ALL', 'Smartphones', 'AI', 'Gadgets', 'PC'];

  return (
    <div className="space-y-6">
      {/* Category Pills Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                filter.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#00e5ff] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-slate-400">
          Showing {filtered.length} discussion threads
        </span>
      </div>

      {/* Questions Feed */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isUpvoted = upvotedIds.has(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#0e111a] border border-white/10 hover:border-cyan-500/30 transition-all space-y-4"
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-cyan-500/30"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold font-display text-white">
                        {item.author}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        • {item.city}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.timeAgo}
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded bg-white/5 text-[10px] font-tech text-cyan-400 uppercase border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Question Text */}
              <h4 className="text-base sm:text-lg font-semibold font-display text-white leading-snug">
                "{item.question}"
              </h4>

              {/* Tech Boss Verified Answer (if present) */}
              {item.answeredByTechBoss && item.techBossAnswer && (
                <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/30 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-tech font-bold text-[#00e5ff]">
                    <CheckCircle className="w-4 h-4 text-[#00e5ff]" />
                    <span>TECH BOSS VERIFIED RESPONSE</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed">
                    {item.techBossAnswer}
                  </p>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs font-tech text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      isUpvoted
                        ? 'bg-[#00e5ff]/20 border-[#00e5ff] text-[#00e5ff]'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
                    <span>{item.upvotes} Upvotes</span>
                  </button>

                  <span className="flex items-center gap-1.5 text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{item.replies} Replies</span>
                  </span>
                </div>

                <span className="text-[11px] font-tech text-cyan-400/80">
                  Tech Boss Tamil Community
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
