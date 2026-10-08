import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { YoutubeIcon } from '../ui/BrandIcons';
import Button from '../ui/Button';

export default function Navbar({ onOpenSearch }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Videos', path: '/videos' },
    { label: 'Tech Hub', path: '/tech-hub' },
    { label: 'Community', path: '/community' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-2.5 bg-[#07090ec7] backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-4 sm:py-5 bg-gradient-to-b from-[#07090e]/95 via-[#07090e]/70 to-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* LEFT: TECH BOSS Logo */}
            <Link
              to="/"
              className="group flex items-center gap-2.5 select-none focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_30px_rgba(0,229,255,0.7)] transition-all">
                <span className="font-tech font-extrabold text-black text-lg tracking-tighter">
                  TB
                </span>
                <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-[#00e5ff] rounded-full border-2 border-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                  TECH <span className="text-[#00e5ff]">BOSS</span>
                </span>
                <span className="text-[9px] font-tech text-slate-400 tracking-widest uppercase -mt-1 hidden sm:block">
                  TAMIL TECH MEDIA
                </span>
              </div>
            </Link>

            {/* CENTER: Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-tech font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-[#00e5ff]'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-active-pill"
                          className="absolute inset-0 rounded-full bg-cyan-500/10 border border-cyan-500/40 -z-10"
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Search tech library"
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-cyan-400 transition-all flex items-center gap-2 text-xs font-tech cursor-pointer"
                title="Search (Ctrl + K)"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline text-slate-400">Search</span>
                <kbd className="hidden lg:inline text-[10px] font-mono text-slate-500 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                  Ctrl K
                </kbd>
              </button>

              {/* YouTube Link */}
              <a
                href="https://www.youtube.com/@TechBossTamil"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 hover:text-red-300 transition-all"
                title="Watch on Tech Boss YouTube"
                aria-label="Tech Boss YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>

              {/* Explore Tech CTA */}
              <Link to="/tech-hub" className="hidden sm:inline-block">
                <Button variant="primary" size="sm" icon={Compass} iconPosition="left">
                  Explore Tech
                </Button>
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:text-cyan-400 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 pt-20 px-6 pb-8 bg-[#07090eed] backdrop-blur-2xl md:hidden flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-4 pt-4">
              <span className="text-[11px] font-tech font-bold uppercase tracking-widest text-[#00e5ff] block">
                NAVIGATION
              </span>

              <nav className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-2xl text-lg font-display font-bold transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-cyan-500/15 text-[#00e5ff] border border-cyan-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-50" />
                  </NavLink>
                ))}
              </nav>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenSearch();
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-slate-300 text-sm font-tech"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#00e5ff]" /> Search Tech Library...
                  </span>
                  <span className="text-xs font-mono text-slate-500">Ctrl K</span>
                </button>
              </div>
            </div>

            {/* Mobile Footer & Socials */}
            <div className="pt-6 border-t border-white/10 space-y-4">
              <Link to="/tech-hub" className="block">
                <Button variant="primary" size="lg" className="w-full">
                  EXPLORE TECH HUB
                </Button>
              </Link>

              <div className="flex items-center justify-between text-xs font-tech text-slate-400">
                <span>© Tech Boss Tamil</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.youtube.com/@TechBossTamil"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-400 hover:text-white"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Instagram
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    X
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
