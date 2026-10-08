import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { YoutubeIcon, InstagramIcon, XTwitterIcon } from '../ui/BrandIcons';
import { subscribeNewsletterApi } from '../../services/api';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleMiniSubscribe = async (e) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (trimmed && /\S+@\S+\.\S+/.test(trimmed)) {
      setLoading(true);
      await subscribeNewsletterApi(trimmed);
      setSubscribed(true);
      setEmail('');
      setLoading(false);
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Videos', path: '/videos' },
    { label: 'Tech Hub', path: '/tech-hub' },
    { label: 'Community', path: '/community' },
    { label: 'About', path: '/about' },
  ];

  const socialLinks = [
    {
      name: 'YouTube',
      href: 'https://www.youtube.com/@TechBossTamil',
      icon: YoutubeIcon,
      color: 'hover:text-red-400',
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: InstagramIcon,
      color: 'hover:text-pink-400',
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com',
      icon: XTwitterIcon,
      color: 'hover:text-cyan-400',
    },
    {
      name: 'Email Contact',
      href: 'mailto:contact@techboss.tamil',
      icon: Mail,
      color: 'hover:text-emerald-400',
    },
  ];

  return (
    <footer className="relative w-full border-t border-white/10 bg-[#06070b] text-slate-400 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-cyan-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Tagline (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <span className="font-tech font-bold text-black text-sm">TB</span>
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                TECH <span className="text-[#00e5ff]">BOSS</span>
              </span>
            </Link>

            <p className="text-sm text-cyan-300 font-tech font-bold">
              Tamil Tech • AI • Gadgets • Future
            </p>
            <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-sm">
              Simplifying smartphones, processors, generative AI, and futuristic gadgets for Tamil-speaking tech enthusiasts globally.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.name}
                    className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 ${s.color} hover:bg-white/10 transition-all`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-tech font-bold uppercase tracking-wider text-white">
              NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-tech">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-[#00e5ff] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#00e5ff] transition-colors" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/creator-dashboard"
                  className="hover:text-cyan-400 transition-colors flex items-center gap-2 text-slate-500 hover:text-slate-300"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  <span>Creator Dashboard</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Hubs (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-tech font-bold uppercase tracking-wider text-white">
              POPULAR HUBS
            </h4>
            <ul className="space-y-2.5 text-xs font-tech text-slate-400">
              <li>
                <Link to="/videos" className="hover:text-cyan-400 transition-colors">
                  Flagship Shootouts
                </Link>
              </li>
              <li>
                <Link to="/tech-hub" className="hover:text-cyan-400 transition-colors">
                  Device Comparison
                </Link>
              </li>
              <li>
                <Link to="/tech-hub" className="hover:text-cyan-400 transition-colors">
                  Curated AI Tools
                </Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-cyan-400 transition-colors">
                  Community Q&A
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition-colors">
                  Creator Chronicle
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter Mini UI (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-tech font-bold uppercase tracking-wider text-white">
              WEEKLY DISPATCH
            </h4>
            <p className="text-xs text-slate-400">
              Get our weekly breakdown of smartphones and AI developments in Tamil.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#00e5ff] shrink-0" />
                <span>Subscribed! Saved to database.</span>
              </div>
            ) : (
              <form onSubmit={handleMiniSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full bg-[#121625] border border-white/15 focus:border-[#00e5ff] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 outline-none pr-10 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-1 top-1 bottom-1 px-2.5 rounded-lg bg-[#00e5ff] hover:bg-[#38bdf8] text-black flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] font-mono text-slate-500 block">
                  PostgreSQL persistent dispatch • Zero spam
                </span>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Tech Boss</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Tamil Tech Media Platform</span>
            <span>•</span>
            <span className="text-[#00e5ff]">Render • Neon PostgreSQL • Vercel</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
