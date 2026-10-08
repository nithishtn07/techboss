import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import SearchModal from './components/layout/SearchModal';
import ScrollToTop from './components/layout/ScrollToTop';
import VideoModal from './components/video/VideoModal';
import LoadingScreen from './components/ui/LoadingScreen';

// Pages
import Home from './pages/Home';
import Videos from './pages/Videos';
import TechHub from './pages/TechHub';
import Community from './pages/Community';
import About from './pages/About';
import CreatorDashboard from './pages/CreatorDashboard';
import NotFound from './pages/NotFound';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <BrowserRouter>
      {/* Short initial loading animation with sessionStorage caching */}
      <LoadingScreen />

      {/* Auto scroll to top on page navigation */}
      <ScrollToTop />

      <div className="relative min-h-screen flex flex-col bg-[#07080c] text-slate-100 overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
        {/* Sticky/Floating Global Navbar */}
        <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1 w-full">
          <Routes>
            <Route
              path="/"
              element={<Home onSelectVideo={(v) => setSelectedVideo(v)} />}
            />
            <Route
              path="/videos"
              element={<Videos onSelectVideo={(v) => setSelectedVideo(v)} />}
            />
            <Route path="/tech-hub" element={<TechHub />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/creator-dashboard" element={<CreatorDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Global Live Search Overlay (accessible anywhere / Ctrl+K) */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectVideo={(v) => {
            setSelectedVideo(v);
          }}
        />

        {/* Global Video Preview / Play Modal */}
        <VideoModal
          video={selectedVideo}
          isOpen={Boolean(selectedVideo)}
          onClose={() => setSelectedVideo(null)}
        />
      </div>
    </BrowserRouter>
  );
}
