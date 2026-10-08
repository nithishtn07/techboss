import React from 'react';
import {
  Compass,
  Smartphone,
  Laptop,
  Cpu,
  BookOpen,
  Scale,
  Headphones,
  ExternalLink
} from 'lucide-react';
import GadgetCard from '../components/tech/GadgetCard';
import GuideCard from '../components/tech/GuideCard';
import ComparisonTool from '../components/tech/ComparisonTool';
import { GADGETS_DATA, AI_TOOLS_DATA } from '../data/gadgets';
import { ARTICLES_DATA } from '../data/articles';

export default function TechHub() {
  const smartphones = GADGETS_DATA.filter((g) => g.category === 'Smartphones');
  const laptops = GADGETS_DATA.filter((g) => g.category === 'Laptops');
  const gadgets = GADGETS_DATA.filter((g) => g.category === 'Gadgets');

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" /> ARCHITECTURAL INTELLIGENCE
          </div>
          <h1 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight">
            TECH HUB
          </h1>
          <p className="text-base sm:text-lg text-slate-300 font-sans">
            Your shortcut to understanding what's worth your attention. Unfiltered specifications, practical benchmarks, and clear Tamil recommendations.
          </p>
        </div>

        {/* Quick Nav Anchors */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {[
            { label: 'Smartphones', id: 'smartphones', icon: Smartphone },
            { label: 'Laptops', id: 'laptops', icon: Laptop },
            { label: 'AI Tools', id: 'ai-tools', icon: Cpu },
            { label: 'Gadgets', id: 'gadgets', icon: Headphones },
            { label: 'Buying Guides', id: 'guides', icon: BookOpen },
            { label: 'Comparisons', id: 'compare', icon: Scale },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0f121e] border border-white/10 hover:border-cyan-500/40 text-xs font-tech font-bold text-slate-300 hover:text-[#00e5ff] transition-all hover:-translate-y-0.5"
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* ==================================================
            1. SMARTPHONES ZONE
           ================================================== */}
        <section id="smartphones" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Smartphone className="w-4 h-4 text-[#00e5ff]" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff]">
                  ZONE 01
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                SMARTPHONES
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Flagship titans, camera leaders, and high-value Tamil consumer picks with authentic hardware specs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {smartphones.map((phone) => (
              <GadgetCard key={phone.id} gadget={phone} />
            ))}
          </div>
        </section>

        {/* ==================================================
            2. LAPTOPS ZONE
           ================================================== */}
        <section id="laptops" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Laptop className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-purple-400">
                  ZONE 02
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                LAPTOPS
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Tested for video rendering, college coding, gaming frame rates, and battery thermals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {laptops.map((laptop) => (
              <GadgetCard key={laptop.id} gadget={laptop} />
            ))}
          </div>
        </section>

        {/* ==================================================
            3. AI TOOLS DIRECTORY
           ================================================== */}
        <section id="ai-tools" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-emerald-400">
                  ZONE 03
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                AI TOOLS
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Independent AI utilities evaluated for practical coding, content generation, and local execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_TOOLS_DATA.map((tool) => (
              <div
                key={tool.id}
                className="group relative flex flex-col p-6 rounded-2xl bg-[#0f121e] border border-white/10 hover:border-emerald-400/40 shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 uppercase">
                    {tool.badge}
                  </span>
                  <span className="text-[10px] font-tech text-slate-400">
                    {tool.freeTier}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-display text-white group-hover:text-emerald-300 transition-colors">
                  {tool.name}
                </h3>
                <span className="text-xs font-tech text-cyan-400 mt-0.5 mb-2 block">
                  {tool.category}
                </span>

                <p className="text-xs text-slate-300 font-sans leading-relaxed line-clamp-3 mb-4">
                  {tool.description}
                </p>

                <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    Independent tool
                  </span>
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-tech font-bold text-white hover:text-emerald-300 transition-colors"
                  >
                    <span>Explore</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
            <span className="text-[11px] font-mono text-slate-500">
              * Note: Tech Boss features these tools strictly for educational evaluation. No corporate sponsorships or affiliations are claimed.
            </span>
          </div>
        </section>

        {/* ==================================================
            4. GADGETS & WEARABLES ZONE
           ================================================== */}
        <section id="gadgets" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Headphones className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-cyan-400">
                  ZONE 04
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                GADGETS & WEARABLES
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Tested audio gear, noise cancellation benchmarks, and daily wearable accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gadgets.map((gadget) => (
              <GadgetCard key={gadget.id} gadget={gadget} />
            ))}
          </div>
        </section>

        {/* ==================================================
            5. BUYING GUIDES ZONE
           ================================================== */}
        <section id="guides" className="space-y-8 scroll-mt-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-tech font-bold uppercase tracking-widest text-cyan-400">
                  ZONE 05
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                BUYING GUIDES
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Structured consumer checklists to avoid marketing gimmicks before spending your money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ARTICLES_DATA.map((article) => (
              <GuideCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* ==================================================
            6. COMPARISONS ZONE
           ================================================== */}
        <section id="compare" className="scroll-mt-28">
          <ComparisonTool />
        </section>
      </div>
    </div>
  );
}
