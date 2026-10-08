import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const stats = [
    {
      targetNumber: 1,
      suffix: 'M+',
      label: 'TECH COMMUNITY',
      sub: 'Active Tamil Subscribers',
      accent: '#00e5ff',
    },
    {
      targetNumber: 500,
      suffix: '+',
      label: 'TECH VIDEOS',
      sub: 'Reviews, Guides & Teardowns',
      accent: '#38bdf8',
    },
    {
      targetNumber: 10,
      suffix: 'M+',
      label: 'MONTHLY IMPRESSIONS',
      sub: 'Across Tech Boss Channels',
      accent: '#8b5cf6',
    },
    {
      targetNumber: 100,
      suffix: '%',
      label: 'TAMIL TECH FOCUS',
      sub: 'Unbiased Consumer First',
      accent: '#00e5ff',
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Creator Statistics"
      className="relative z-10 w-full py-12 border-y border-white/10 bg-[#0a0d16]/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="relative flex flex-col items-center text-center p-4 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-cyan-500/20 transition-colors"
            >
              <div className="flex items-baseline gap-1">
                <CounterNumber
                  target={stat.targetNumber}
                  isInView={isInView}
                  duration={2000}
                />
                <span
                  className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight"
                  style={{ color: stat.accent }}
                >
                  {stat.suffix}
                </span>
              </div>
              <h3 className="mt-2 text-sm sm:text-base font-tech font-bold text-white tracking-wider uppercase">
                {stat.label}
              </h3>
              <p className="mt-1 text-xs text-slate-400 font-sans">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Clear presentation disclaimer note as requested */}
        <div className="mt-6 text-center">
          <span className="text-[11px] font-mono text-slate-500 tracking-wide">
            * Showcase statistics for presentation. Figures connect to official live analytics in future release.
          </span>
        </div>
      </div>
    </section>
  );
}

function CounterNumber({ target, isInView, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const totalFrames = Math.round(duration / 16);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const current = Math.round(end * (1 - Math.pow(1 - progress, 3)));
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
      {count}
    </span>
  );
}
