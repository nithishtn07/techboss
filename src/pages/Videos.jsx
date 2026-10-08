import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Play, RefreshCw, Sparkles } from 'lucide-react';
import VideoCard from '../components/video/VideoCard';
import Button from '../components/ui/Button';
import { VIDEOS_DATA, VIDEO_CATEGORIES } from '../data/videos';

export default function Videos({ onSelectVideo }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Latest'); // 'Latest', 'Oldest', 'Popular'
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredVideos = useMemo(() => {
    let result = [...VIDEOS_DATA];

    // Category filter
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      result = result.filter(
        (v) => v.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.category.toLowerCase().includes(q) ||
          (v.tag && v.tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'Oldest') {
      result.reverse();
    } else if (sortBy === 'Popular') {
      // Prioritize featured and major showdowns
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    // 'Latest' preserves default curated chronological upload sequence

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  const displayedVideos = filteredVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVideos.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('Latest');
  };

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider">
            <Play className="w-3.5 h-3.5" /> OFFICIAL VIDEO DIRECTORY
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            TECH BOSS VIDEO LIBRARY
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Smartphones, laptops, local AI and future silicon — tested rigorously and explained in straightforward Tamil.
          </p>
        </div>

        {/* Filter Controls Strip */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#0e111a] border border-white/10 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                placeholder="Search Tech Boss videos..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(8);
                }}
                className="w-full bg-[#141824] border border-white/10 focus:border-[#00e5ff] rounded-xl pl-10 pr-12 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2.5 self-end md:self-auto">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-tech text-slate-400 uppercase">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#141824] border border-white/10 focus:border-[#00e5ff] rounded-xl px-3 py-2 text-xs font-tech text-white outline-none cursor-pointer"
              >
                <option value="Latest">Latest</option>
                <option value="Oldest">Oldest</option>
                <option value="Popular">Popular</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {VIDEO_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(8);
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory.toLowerCase() === category.toLowerCase()
                    ? 'bg-[#00e5ff] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-tech text-slate-400">
          <span>
            Showing <strong className="text-white">{displayedVideos.length}</strong> of{' '}
            <strong className="text-cyan-400">{filteredVideos.length}</strong> videos
          </span>
          {(selectedCategory.toLowerCase() !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" /> Reset all filters
            </button>
          )}
        </div>

        {/* Videos Grid */}
        {filteredVideos.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#0e111a] border border-white/5 p-8">
            <h3 className="text-xl font-bold font-display text-white">
              No videos match your search
            </h3>
            <p className="mt-2 text-xs text-slate-400 max-w-sm mx-auto font-sans">
              Try adjusting your search terms or switch category back to "All" to explore the full Tech Boss library.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="mt-6"
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedVideos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onSelect={onSelectVideo}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && (
          <div className="pt-8 text-center">
            <Button
              variant="secondary"
              size="md"
              onClick={handleLoadMore}
              icon={RefreshCw}
              iconPosition="right"
            >
              Load More Videos ({filteredVideos.length - displayedVideos.length} Remaining)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
