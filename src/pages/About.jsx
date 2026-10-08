import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Globe,
  Award,
  Video,
  Clock,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Tv,
  Heart
} from 'lucide-react';
import { YoutubeIcon } from '../components/ui/BrandIcons';
import Button from '../components/ui/Button';
import { TIMELINE_EVENTS } from '../data/community';

export default function About() {
  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider">
            <Tv className="w-3.5 h-3.5" /> CREATOR CHRONICLE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight">
            THE PERSON BEHIND THE TECH
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans leading-relaxed">
            Bridging cutting-edge global technology and Tamil-speaking consumers through authentic testing, straightforward language, and consumer-first integrity.
          </p>
        </div>

        {/* Creator Studio Visual Feature Area (Replaceable Placeholder) */}
        <div className="relative rounded-3xl bg-gradient-to-r from-[#0d101b] via-[#121626] to-[#0a0c14] border border-cyan-500/20 shadow-2xl overflow-hidden p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Visual Studio Representation (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 bg-slate-900 shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=1000&q=80"
                  alt="Tech Boss Production Studio"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090b12] via-black/20 to-transparent" />

                {/* Studio badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-xs font-tech font-bold text-white block">
                    TECH BOSS PRODUCTION DESK
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    Chennai / Tamil Nadu Studio Setup
                  </span>
                </div>
              </div>
            </div>

            {/* Editorial Bio Overview (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff] block">
                CREATOR PHILOSOPHY
              </span>

              <h2 className="text-2xl sm:text-4xl font-black font-display text-white leading-tight">
                WHO IS TECH BOSS?
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Tech Boss is one of South India's premier Tamil technology media platforms, recognized for simplifying smartphones, silicon benchmarks, AI breakthroughs, and consumer hardware.
              </p>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                Rather than reciting PR press releases, every device review is shaped by real-world usage: extreme battery drain under local climate conditions, network handoffs across Indian 5G bands, and genuine long-term value for money in Indian Rupees (INR).
              </p>

              {/* Creator Values Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xl font-bold font-display text-[#00e5ff] block">
                    100% Unfiltered
                  </span>
                  <span className="text-xs text-slate-400 font-sans mt-1 block">
                    Direct consumer advocacy with zero sponsored sugar-coating.
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-xl font-bold font-display text-purple-400 block">
                    Pure Tamil
                  </span>
                  <span className="text-xs text-slate-400 font-sans mt-1 block">
                    Complex computing logic simplified for everyday viewers.
                  </span>
                </div>
              </div>

              {/* Verified presentation note */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-500">
                * Note: Content represents general editorial structure. Verified biography details and studio milestones will link to official creator press kit.
              </div>

              <div className="pt-2">
                <a
                  href="https://www.youtube.com/@TechBossTamil"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="md" icon={YoutubeIcon} iconPosition="left">
                    WATCH ON YOUTUBE
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            WHY TAMIL TECH? SECTION
           ================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff] block">
              OUR MISSION
            </span>
            <h3 className="text-3xl font-black font-display text-white">
              WHY TAMIL TECH?
            </h3>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              When technology is explained only in technical English, millions of curious consumers and aspiring college students in Tamil Nadu miss out on critical knowledge about data privacy, hardware value, and AI advancements.
            </p>
            <p className="text-sm text-slate-300 font-sans leading-relaxed">
              Tech Boss breaks language barriers. Whether explaining the nuances of an LTPO OLED display or how to run a local AI model for university projects, our mission is digital empowerment through the native power of Tamil.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#0f121e] border border-white/10 space-y-4">
            <h4 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#00e5ff]" /> The Tech Boss Standard
            </h4>
            <div className="space-y-3 text-xs text-slate-300 font-sans">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>All phones bought or verified through genuine retail channels for honest long-term evaluations.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Camera comparisons evaluated on calibrated screens without deceptive social compression.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0 mt-0.5" />
                <span>Clear callouts on heating issues, battery drain, and Indian software bloatware.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================
            THE JOURNEY — TIMELINE VISUAL
           ================================================== */}
        <section className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff]">
              THE JOURNEY
            </span>
            <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
              FROM FIRST VIDEO TO 1M+ TECH BOSS FAM
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Key development milestones in building South India's trusted technology media voice.
            </p>
          </div>

          <div className="relative border-l-2 border-white/10 ml-4 sm:ml-32 md:ml-48 space-y-10 pl-6 sm:pl-10">
            {TIMELINE_EVENTS.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Node circle */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#08090d] border-2 border-[#00e5ff] group-hover:scale-125 group-hover:bg-[#00e5ff] transition-all" />

                <div className="p-6 rounded-2xl bg-[#0f121e] border border-white/10 hover:border-cyan-500/40 transition-all max-w-2xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-tech font-bold text-[#00e5ff] uppercase tracking-wider">
                      {event.year}
                    </span>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {event.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold font-display text-white">
                    {event.title}
                  </h4>
                  <span className="text-xs font-tech text-slate-400 block mt-0.5 mb-2">
                    {event.subtitle}
                  </span>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <div className="text-center pt-8">
          <a
            href="https://www.youtube.com/@TechBossTamil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="lg" icon={YoutubeIcon}>
              SUBSCRIBE ON YOUTUBE
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
