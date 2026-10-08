import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Play,
  Compass,
  ArrowRight,
  Smartphone,
  Cpu,
  ChevronDown,
  ExternalLink,
  Bot,
  Zap,
  Users,
  Sparkles
} from 'lucide-react';
import Hero3DPhone from '../components/hero/Hero3DPhone';
import AICoreVisual from '../components/hero/AICoreVisual';
import StatsCounter from '../components/ui/StatsCounter';
import FeaturedVideo from '../components/video/FeaturedVideo';
import VideoCard from '../components/video/VideoCard';
import GadgetCard from '../components/tech/GadgetCard';
import Button from '../components/ui/Button';
import { VIDEOS_DATA } from '../data/videos';
import { GADGETS_DATA } from '../data/gadgets';

export default function Home({ onSelectVideo }) {
  const featuredVid = VIDEOS_DATA.find((v) => v.featured) || VIDEOS_DATA[0];
  const latestVideos = VIDEOS_DATA.filter((v) => !v.featured).slice(0, 4);
  const featuredGadgets = GADGETS_DATA.filter((g) => g.featured).slice(0, 3);

  const trendingCategories = [
    {
      title: 'SMARTPHONES',
      tag: 'FLAGSHIPS & BUDGET',
      description: 'Snapdragon 8 Elite benchmarks, 200MP camera shootouts, and best phones under ₹20,000.',
      icon: Smartphone,
      accent: '#00e5ff',
      link: '/tech-hub',
      image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'ARTIFICIAL INTELLIGENCE',
      tag: 'LOCAL LLMS & PROMPTS',
      description: 'DeepSeek, Claude 3.7, automated video editing, and how AI reshapes everyday Tamil computing.',
      icon: Cpu,
      accent: '#8b5cf6',
      link: '/tech-hub',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'HARDWARE & GADGETS',
      tag: 'AUDIO & WEARABLES',
      description: 'Noise-canceling earphones, smart rings, GaN chargers, and high-efficiency daily tech gear.',
      icon: Zap,
      accent: '#38bdf8',
      link: '/tech-hub',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    },
    {
      title: 'FUTURE COMPUTING',
      tag: 'SILICON & ROBOTICS',
      description: 'Quantum advances, Apple Silicon roadmaps, and humanoid robotics explained simply.',
      icon: Bot,
      accent: '#10b981',
      link: '/tech-hub',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const futureTopics = [
    { title: 'Generative AI & Reasoning', desc: 'Frontier reasoning architectures tested in Tamil workflows.' },
    { title: '3nm Silicon Architectures', desc: 'Efficiency leaps in mobile APUs and thermal throttling limits.' },
    { title: 'Humanoid Robotics & Automation', desc: 'Autonomous factory workers and assistive robotics realities.' },
    { title: 'Foldable & Rollable Displays', desc: 'Creaseless hinge engineering and ultra-thin glass durability.' },
    { title: 'Next-Gen 6G & Satellite Link', desc: 'Direct-to-cell satellite messaging and extreme low latency.' },
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* ==================================================
          1. CINEMATIC HERO SECTION
         ================================================== */}
      <section className="relative min-h-[92vh] sm:min-h-screen pt-28 sm:pt-32 pb-16 flex items-center justify-center tech-grid-pattern">
        {/* Subtle Background Radial Atmosphere */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Side: Typography & Action (7 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left z-10"
            >
              {/* Creator Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech font-bold tracking-widest text-[#00e5ff] uppercase backdrop-blur-md">
                <span className="flex h-2 w-2 rounded-full bg-[#00e5ff] animate-ping" />
                <span>TAMIL TECH CREATOR</span>
              </div>

              {/* Ultra Bold Hero Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black font-display tracking-tight text-white leading-[1.04]">
                TAMIL TECH. <br />
                <span className="text-gradient-cyan">BEYOND LIMITS.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-sans max-w-2xl leading-relaxed mx-auto lg:mx-0">
                Technology explained simply. Discover smartphones, gadgets, AI, apps and the future of tech — all in Tamil.
              </p>

              {/* Primary Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  icon={Play}
                  onClick={() => onSelectVideo(featuredVid)}
                  className="w-full sm:w-auto"
                >
                  WATCH LATEST VIDEO
                </Button>
                <Link to="/tech-hub" className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    size="lg"
                    icon={Compass}
                    className="w-full sm:w-auto"
                  >
                    EXPLORE TECH HUB
                  </Button>
                </Link>
              </div>

              {/* Secondary Community Link */}
              <div className="pt-2">
                <Link
                  to="/community"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-tech text-slate-400 hover:text-[#00e5ff] transition-colors group"
                >
                  <span>Join the Tech Boss community</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>

            {/* Right Side: Interactive 3D Smartphone Device Composition (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 flex justify-center z-10"
            >
              <Hero3DPhone />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-slate-500 pointer-events-none">
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </div>
      </section>

      {/* ==================================================
          2. CREATOR STATS STRIP
         ================================================== */}
      <StatsCounter />

      {/* ==================================================
          3. LATEST FEATURED VIDEO
         ================================================== */}
      <FeaturedVideo video={featuredVid} onSelect={onSelectVideo} />

      {/* ==================================================
          4. WHAT'S TRENDING IN TECH
         ================================================== */}
      <section className="relative w-full py-16 bg-[#090b12]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff] block mb-2">
                CURATED CATEGORIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                WHAT'S TRENDING
              </h2>
            </div>
            <p className="text-xs font-tech text-slate-400 max-w-sm">
              Explore key tech verticals driving the next decade of Tamil digital literacy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  to={item.link}
                  className="group relative flex flex-col rounded-2xl bg-[#0e111b] border border-white/10 hover:border-cyan-500/40 p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 shadow-lg"
                >
                  {/* Subtle top image strip */}
                  <div className="relative h-28 -mx-6 -mt-6 mb-5 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e111b] via-[#0e111b]/50 to-transparent" />
                    <div className="absolute top-4 left-4 p-2 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
                      <Icon className="w-5 h-5" style={{ color: item.accent }} />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <h3 className="mt-1 text-lg font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 font-sans leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-tech font-bold text-slate-300 group-hover:text-cyan-400">
                    <span>Explore vertical</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          5. FEATURED GADGETS SHOWCASE
         ================================================== */}
      <section className="relative w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff] block mb-2">
                CURATED HARDWARE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                TECH WORTH KNOWING
              </h2>
            </div>
            <Link to="/tech-hub">
              <Button variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                View All Devices
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredGadgets.map((gadget) => (
              <GadgetCard key={gadget.id} gadget={gadget} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          6. LATEST VIDEOS GRID
         ================================================== */}
      <section className="relative w-full py-16 bg-[#080a11]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-tech font-bold uppercase tracking-widest text-[#00e5ff] block mb-2">
                TECH BOSS ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-display text-white">
                RECENT UPLOADS
              </h2>
            </div>
            <Link to="/videos">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                VIEW ALL VIDEOS →
              </Button>
            </Link>
          </div>

          {/* 4 cols desktop, 2 cols tablet, 1 col mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSelect={onSelectVideo}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/videos">
              <Button variant="secondary" size="lg" icon={Play}>
                BROWSE FULL VIDEO LIBRARY ({VIDEOS_DATA.length}+ EPISODES)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================
          7. AI & FUTURE TECH SECTION
         ================================================== */}
      <section className="relative w-full py-20 bg-gradient-to-b from-[#090b12] to-[#0d101a] border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Vision & Topics (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-tech text-purple-300 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>NEXT-GEN SILICON & INTELLIGENCE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight leading-tight">
                THE FUTURE IS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e5ff] via-purple-400 to-[#00e5ff]">
                  ALREADY HERE.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed max-w-xl">
                From open-weights reasoning models running locally on smartphones to humanoids in factory lines, Tamil technology media is evolving to cover foundational science and practical application.
              </p>

              {/* Topics List */}
              <div className="space-y-3 pt-2">
                {futureTopics.map((topic, i) => (
                  <div
                    key={topic.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-md bg-cyan-500/15 text-cyan-400 text-xs font-tech font-bold flex items-center justify-center shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold font-display text-white">
                        {topic.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-sans">
                        {topic.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Interactive AI Core Visual (5 cols) */}
            <div className="lg:col-span-5 flex justify-center">
              <AICoreVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          8. COMMUNITY CALL TO ACTION
         ================================================== */}
      <section className="relative w-full py-20 bg-[#07080c]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-[#111524] to-[#090b12] border border-cyan-500/30 shadow-[0_0_60px_rgba(0,229,255,0.1)] relative overflow-hidden">
            <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-tech text-cyan-400 uppercase tracking-wider mb-6">
              <Users className="w-3.5 h-3.5" />
              <span>THE TECH BOSS MOVEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
              TECH SHOULD BE FOR EVERYONE.
            </h2>

            <p className="mt-4 text-base text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest technology, discoveries, benchmarks and ideas from the Tech Boss community.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/community" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  JOIN THE COMMUNITY
                </Button>
              </Link>
              <a
                href="https://www.youtube.com/@TechBossTamil"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="secondary"
                  size="lg"
                  icon={ExternalLink}
                  iconPosition="right"
                  className="w-full sm:w-auto"
                >
                  WATCH ON YOUTUBE
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
