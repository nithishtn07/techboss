import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageSquare, Sparkles, Send, ShieldCheck, Heart } from 'lucide-react';
import QuestionForm from '../components/community/QuestionForm';
import NewsletterForm from '../components/community/NewsletterForm';
import CommunityWall from '../components/community/CommunityWall';

export default function Community() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleNewQuestion = () => {
    // Triggers instant refresh of live PostgreSQL community feed
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" /> TAMIL TECH FORUM
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight">
            TECH BOSS COMMUNITY
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans">
            Your questions. Real tech discussions. Connecting Tamil Nadu's vibrant community of students, builders, and gadget enthusiasts.
          </p>
        </div>

        {/* Top Grid: Question Form (7 cols) + Newsletter (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <QuestionForm onQuestionAdded={handleNewQuestion} />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <NewsletterForm />

            {/* Tech Boss Live Rules / Guidelines card */}
            <div className="p-6 rounded-3xl bg-[#0e111a] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" /> COMMUNITY GUIDELINES
              </div>
              <h4 className="text-sm font-bold font-display text-white">
                How We Pick Q&A For YouTube
              </h4>
              <ul className="text-xs text-slate-300 font-sans space-y-2 list-disc list-inside">
                <li>Specify your exact budget in INR (e.g., Under ₹25,000).</li>
                <li>State primary usage: Gaming, Camera, Battery, or College Coding.</li>
                <li>Mention your current device to help evaluate genuine upgrade value.</li>
                <li>Top inquiries get answered during weekly Tamil live streams!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Community Wall Section (Connected directly to PostgreSQL) */}
        <section className="pt-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff]">
                  LIVE COMMUNITY FEED
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                COMMUNITY INQUIRIES
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Real questions submitted through our platform and stored in PostgreSQL.
            </p>
          </div>

          <CommunityWall refreshTrigger={refreshTrigger} />
        </section>
      </div>
    </div>
  );
}
