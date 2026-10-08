import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2, HelpCircle } from 'lucide-react';
import Button from '../ui/Button';
import { submitQuestionApi } from '../../services/api';

export default function QuestionForm({ onQuestionAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Smartphones',
    question: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.question.trim()) {
      errs.question = 'Please type your tech question.';
    } else if (formData.question.trim().length < 15) {
      errs.question = 'Question should be at least 15 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    setLoading(true);

    try {
      // Real API request to FastAPI POST /api/questions
      const res = await submitQuestionApi({
        name: formData.name.trim(),
        email: formData.email.trim(),
        category: formData.category,
        question: formData.question.trim(),
      });

      if (res.success) {
        setIsSubmitted(true);
        if (onQuestionAdded) {
          onQuestionAdded({
            id: `q-user-${Date.now()}`,
            author: formData.name.trim(),
            city: 'Tamil Nadu',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
            question: formData.question.trim(),
            category: formData.category,
            upvotes: 1,
            replies: 0,
            timeAgo: 'Just now',
            answeredByTechBoss: false,
          });
        }
        // Clear the form data upon success
        setFormData({ name: '', email: '', category: 'Smartphones', question: '' });
      } else {
        // Keep entered data, show friendly error message
        setServerError(
          res.message || 'Unable to submit your question. Please check your details and try again.'
        );
      }
    } catch {
      setServerError('Server is temporarily unreachable. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', category: 'Smartphones', question: '' });
    setErrors({});
    setServerError('');
    setIsSubmitted(false);
  };

  return (
    <div className="relative rounded-3xl bg-[#0f121e] border border-cyan-500/20 p-6 sm:p-8 shadow-2xl overflow-hidden">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-4 h-4 text-[#00e5ff]" />
        <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#00e5ff]">
          ASK TECH BOSS
        </span>
      </div>
      <h3 className="text-2xl font-bold font-display text-white">
        Got A Tech Dilemma?
      </h3>
      <p className="mt-1 text-xs text-slate-300 font-sans">
        Submit your gadget query. The best questions get answered in upcoming YouTube episodes & weekly community live streams.
      </p>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-10 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-[#00e5ff] flex items-center justify-center mb-4 border border-cyan-500/40 shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">
              Thanks! Your question has been received.
            </h4>
            <p className="mt-2 text-xs text-slate-300 max-w-sm">
              Your question has been securely stored in the Tech Boss database and added to the community queue.
            </p>
            <p className="mt-4 text-[11px] font-mono text-cyan-400/90 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/20">
              ✓ Stored in PostgreSQL database: /api/questions
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="mt-6"
            >
              Ask Another Question
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {serverError && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{serverError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-tech text-slate-300 uppercase mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vignesh K."
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full bg-[#151928] border ${
                    errors.name ? 'border-red-500' : 'border-white/10'
                  } focus:border-[#00e5ff] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors`}
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-tech">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-tech text-slate-300 uppercase mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full bg-[#151928] border ${
                    errors.email ? 'border-red-500' : 'border-white/10'
                  } focus:border-[#00e5ff] rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors`}
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-tech">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-tech text-slate-300 uppercase mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#151928] border border-white/10 focus:border-[#00e5ff] rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors cursor-pointer"
              >
                <option value="Smartphones">Smartphones (Budget, Flagship, Camera)</option>
                <option value="AI">AI Tools & Reasoning</option>
                <option value="Gadgets">Gadgets & Audio Tech</option>
                <option value="PC">PC Builds & Laptops</option>
                <option value="Other">General Tamil Tech</option>
              </select>
            </div>

            {/* Question */}
            <div>
              <label className="block text-xs font-tech text-slate-300 uppercase mb-1.5">
                Your Question *
              </label>
              <textarea
                rows={4}
                placeholder="Describe your tech question clearly (e.g., budget, usage requirements, preferred brands)..."
                value={formData.question}
                onChange={(e) => {
                  setFormData({ ...formData, question: e.target.value });
                  if (errors.question) setErrors({ ...errors, question: '' });
                }}
                className={`w-full bg-[#151928] border ${
                  errors.question ? 'border-red-500' : 'border-white/10'
                } focus:border-[#00e5ff] rounded-xl p-4 text-sm text-white placeholder-slate-500 outline-none transition-colors resize-none`}
              />
              {errors.question && (
                <p className="mt-1 text-[11px] text-red-400 flex items-center gap-1 font-tech">
                  <AlertCircle className="w-3 h-3" /> {errors.question}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                icon={loading ? Loader2 : Send}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                {loading ? 'SUBMITTING...' : 'SUBMIT QUESTION'}
              </Button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
