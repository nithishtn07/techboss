import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Database, ShieldCheck, Languages, MessageSquare } from 'lucide-react';
import { getStatsApi } from '../../services/api';

export default function StatsCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [dbStats, setDbStats] = useState({ total_questions: 0, total_subscribers: 0 });
  const [isStatsLive, setIsStatsLive] = useState(false);

  useEffect(() => {
    let mounted = true;
    getStatsApi().then((res) => {
      if (mounted) {
        if (res.success && res.data) {
          setDbStats({
            total_questions: Number(res.data.total_questions) || 0,
            total_subscribers: Number(res.data.total_subscribers) || 0,
          });
          setIsStatsLive(true);
        } else {
          setIsStatsLive(false);
        }
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const pillars = [
    {
      targetNumber: dbStats.total_questions,
      suffix: isStatsLive && dbStats.total_questions > 0 ? '+' : '',
      label: 'COMMUNITY INQUIRIES',
      sub: isStatsLive ? 'Verified Questions in PostgreSQL' : 'PostgreSQL Live Sync',
      accent: '#00e5ff',
      icon: MessageSquare,
    },
    {
      targetNumber: dbStats.total_subscribers,
      suffix: isStatsLive && dbStats.total_subscribers > 0 ? '+' : '',
      label: 'DISPATCH SUBSCRIBERS',
      sub: isStatsLive ? 'Weekly Tamil Tech Readers' : 'PostgreSQL Live Sync',
      accent: '#38bdf8',
      icon: Database,
    },
    {
      targetNumber: 100,
      suffix: '%',
      label: 'TAMIL TECH FOCUS',
      sub: 'Clear, Jargon-Free Native Media',
      accent: '#8b5cf6',
      icon: Languages,
    },
    {
      targetNumber: 100,
      suffix: '%',
      label: 'CONSUMER FIRST',
      sub: 'Independent & Unfiltered Reviews',
      accent: '#10b981',
      icon: ShieldCheck,
    },
  ];

  return (
    <section
      ref={ref}
      aria-label="Platform Pillars & Live Metrics"
      className="relative z-10 w-full py-12 border-y border-white/10 bg-[#0a0d16]/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-cyan-500/20 transition-colors"
              >
                <div className="p-2 rounded-xl bg-white/5 text-slate-300 mb-3">
                  <Icon className="w-4 h-4" style={{ color: item.accent }} />
                </div>

                <div className="flex items-baseline gap-1">
                  <CounterNumber
                    target={item.targetNumber}
                    isInView={isInView}
                    duration={1800}
                  />
                  {item.suffix && (
                    <span
                      className="text-2xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight"
                      style={{ color: item.accent }}
                    >
                      {item.suffix}
                    </span>
                  )}
                </div>

                <h3 className="mt-2 text-xs sm:text-sm font-tech font-bold text-white tracking-wider uppercase">
                  {item.label}
                </h3>
                <p className="mt-1 text-[11px] sm:text-xs text-slate-400 font-sans">
                  {item.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CounterNumber({ target, isInView, duration = 1800 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target === undefined || target === null) return;

    const end = Number(target) || 0;
    if (end === 0) {
      setCount(0);
      return;
    }

    const totalFrames = Math.max(Math.round(duration / 16), 1);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
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
    <span className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-white tracking-tight">
      {count}
    </span>
  );
}
