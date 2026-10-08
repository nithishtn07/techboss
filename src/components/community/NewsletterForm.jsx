import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight, Loader2, Info } from 'lucide-react';
import Button from '../ui/Button';
import { subscribeNewsletterApi } from '../../services/api';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAlreadySubscribed(false);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !/\S+@\S+\.\S+/.test(trimmedEmail)) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);

    try {
      // Real API request to FastAPI POST /api/newsletter
      const res = await subscribeNewsletterApi(trimmedEmail);

      if (res.success) {
        setSubmitted(true);
        setEmail('');
      } else if (res.message && res.message.toLowerCase().includes('already subscribed')) {
        setAlreadySubscribed(true);
      } else {
        setError(res.message || 'Unable to subscribe right now. Please try again later.');
      }
    } catch {
      setError('Server is temporarily unavailable. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl bg-gradient-to-br from-[#121626] via-[#0d101a] to-[#08090f] border border-cyan-500/25 p-8 sm:p-10 shadow-2xl overflow-hidden">
      <div className="relative z-10 max-w-xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider mb-3">
          <Mail className="w-3.5 h-3.5" /> WEEKLY TECH DISPATCH
        </div>
        <h3 className="text-2xl sm:text-3xl font-black font-display text-white">
          GET THE TECH DROP
        </h3>
        <p className="mt-2 text-sm text-slate-300 font-sans leading-relaxed">
          Zero spam. Just curated weekend recaps of smartphone price drops, critical security alerts, and AI tools worth your attention in Tamil.
        </p>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center gap-3 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-cyan-300"
            >
              <CheckCircle2 className="w-6 h-6 shrink-0 text-[#00e5ff]" />
              <div>
                <span className="font-tech font-bold text-sm text-white block">
                  You're on the list!
                </span>
                <span className="text-xs text-slate-300">
                  Welcome to the Tech Boss community! Subscription saved to PostgreSQL database.
                </span>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              {alreadySubscribed && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>This email is already subscribed to Tech Boss updates.</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                      if (alreadySubscribed) setAlreadySubscribed(false);
                    }}
                    disabled={loading}
                    className={`w-full bg-[#161a2b] border ${
                      error ? 'border-red-500' : 'border-white/15'
                    } focus:border-[#00e5ff] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors disabled:opacity-50`}
                  />
                  {error && (
                    <p className="absolute -bottom-5 left-1 text-[11px] text-red-400 font-tech">
                      {error}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={loading}
                  icon={loading ? Loader2 : ArrowRight}
                  iconPosition="right"
                >
                  {loading ? 'JOINING...' : 'JOIN'}
                </Button>
              </div>
              <span className="block mt-4 text-[11px] font-mono text-slate-500">
                Weekly curated Tamil tech roundups. Subscriptions persist directly to PostgreSQL.
              </span>
            </form>
          )}
        </AnimatePresence>
      </div>

      {/* Background Graphic elements */}
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-[#00e5ff]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
