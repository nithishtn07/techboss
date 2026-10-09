import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ThumbsUp,
  RotateCcw,
  Clock,
  Loader2,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  Database
} from 'lucide-react';
import Button from '../ui/Button';
import { getQuestionsApi } from '../../services/api';

function formatTimestamp(isoString) {
  if (!isoString) return 'Recently';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return 'Recently';
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);
    if (diffSec < 60) return 'Just now';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export default function CommunityWall({ refreshTrigger }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');
  const [upvotes, setUpvotes] = useState({});

  const fetchQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getQuestionsApi(50);
      if (res.success) {
        setQuestions(res.data);
      } else {
        setError(res.message || 'Unable to load community questions.');
      }
    } catch {
      setError('Connection failure: Unable to reach Tech Boss backend service.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [refreshTrigger]);

  const handleUpvote = (id) => {
    setUpvotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const categories = ['ALL', 'Smartphones', 'AI', 'Gadgets', 'PC', 'Other'];

  const filtered =
    filter === 'ALL'
      ? questions
      : questions.filter(
          (q) => q.category?.toLowerCase() === filter.toLowerCase()
        );

  return (
    <div className="space-y-6">
      {/* Category Pills Header & DB Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
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

        <div className="flex items-center gap-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-mono ${
              error
                ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                : loading
                ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
            }`}
          >
            <Database className="w-3 h-3" />
            <span>
              {error ? 'PostgreSQL Offline' : loading ? 'Syncing...' : 'PostgreSQL Live Sync'}
            </span>
          </span>

          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            {error ? (
              <span className="text-red-400/90">Feed Unavailable</span>
            ) : loading ? (
              <span className="text-slate-500">Checking feed...</span>
            ) : (
              `${filtered.length} ${filtered.length === 1 ? 'Inquiry' : 'Inquiries'}`
            )}
          </span>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0e111a] border border-white/5">
          <Loader2 className="w-8 h-8 text-[#00e5ff] animate-spin mb-3" />
          <h4 className="text-base font-bold font-display text-white">
            Loading community questions...
          </h4>
          <p className="mt-1 text-xs text-slate-400 font-sans">
            Fetching verified submissions from PostgreSQL database
          </p>
        </div>
      )}

      {/* Error State with [Try Again] - distinctly shows failure reason */}
      {!loading && error && (
        <div className="py-16 text-center flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0e111a] border border-red-500/30">
          <AlertCircle className="w-8 h-8 text-red-400 mb-3" />
          <h4 className="text-base font-bold font-display text-white">
            Community Feed Temporarily Unavailable
          </h4>
          <p className="mt-2 text-xs text-slate-300 font-sans max-w-md leading-relaxed">
            {error}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchQuestions}
            icon={RotateCcw}
            iconPosition="left"
            className="mt-5 cursor-pointer"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <div className="py-20 text-center flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0e111a] border border-white/5">
          <HelpCircle className="w-10 h-10 text-cyan-400/80 mb-3" />
          <h4 className="text-lg font-bold font-display text-white">
            No community questions yet.
          </h4>
          <p className="mt-1 text-xs text-slate-400 font-sans max-w-sm">
            Be the first to ask Tech Boss! Submit your question using the form above.
          </p>
        </div>
      )}

      {/* Loaded Questions Feed from PostgreSQL */}
      {!loading && !error && filtered.length > 0 && (
        <div className="space-y-4">
          {filtered.map((item) => {
            const upvoteCount = upvotes[item.id] || 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 sm:p-6 rounded-2xl bg-[#0e111a] border border-white/10 hover:border-cyan-500/30 transition-all space-y-4"
              >
                {/* Header (Author, Category, Timestamp) - Safe public fields only */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* Minimal Monogram Avatar */}
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-xs font-tech font-bold text-cyan-300">
                      {(item.name || 'TB')[0].toUpperCase()}
                    </div>
                    <div>
                      <span className="text-sm font-bold font-display text-white block">
                        {item.name}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{formatTimestamp(item.created_at)}</span>
                      </span>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded bg-white/5 text-[10px] font-tech text-cyan-400 uppercase border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Question Text */}
                <p className="text-sm sm:text-base font-sans text-slate-100 leading-relaxed">
                  "{item.question}"
                </p>

                {/* Bottom Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-tech text-slate-400">
                  <button
                    onClick={() => handleUpvote(item.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/40 hover:text-white transition-all cursor-pointer"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${upvoteCount > 0 ? 'text-[#00e5ff] fill-current' : ''}`} />
                    <span>Helpful {upvoteCount > 0 ? `(${upvoteCount})` : ''}</span>
                  </button>

                  <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Verified in DB</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
