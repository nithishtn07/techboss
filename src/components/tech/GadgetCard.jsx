import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Cpu, Battery, X, Info } from 'lucide-react';
import Button from '../ui/Button';

export default function GadgetCard({ gadget }) {
  const [showSpecsModal, setShowSpecsModal] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative flex flex-col rounded-2xl bg-[#0f121d] border border-white/10 hover:border-cyan-500/40 shadow-lg overflow-hidden transition-all duration-300"
      >
        {/* Device Image Box */}
        <div className="relative aspect-[4/3] w-full bg-[#0a0d15] overflow-hidden flex items-center justify-center p-6">
          <img
            src={gadget.image}
            alt={gadget.name}
            loading="lazy"
            className="w-full h-full object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f121d] via-transparent to-transparent opacity-90" />

          {/* Tier Badge */}
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/75 border border-white/15 text-[10px] font-tech font-bold uppercase tracking-wider text-[#00e5ff] backdrop-blur-md">
            {gadget.tier || gadget.category}
          </div>

          {/* Rating */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded bg-black/75 border border-white/15 text-xs font-tech font-semibold text-amber-300 backdrop-blur-md">
            <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>{gadget.rating}</span>
          </div>

          {/* Estimated Price */}
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-black/80 border border-cyan-500/30 text-xs font-mono font-bold text-white">
            {gadget.priceEst}
          </div>
        </div>

        {/* Content Box */}
        <div className="flex flex-col flex-1 p-5">
          <h3 className="text-lg font-bold font-display text-white group-hover:text-[#00e5ff] transition-colors">
            {gadget.name}
          </h3>

          <p className="mt-2 text-xs text-slate-300 font-sans line-clamp-2 leading-relaxed">
            {gadget.verdict}
          </p>

          {/* Mini Specs Pill Grid */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.03] border border-white/5 truncate">
              <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{gadget.specs?.processor?.split('(')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/[0.03] border border-white/5 truncate">
              <Battery className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{gadget.specs?.battery?.split(' ')[0]} mAh</span>
            </div>
          </div>

          {/* Card Footer */}
          <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-tech text-slate-500">
              Informational specs
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSpecsModal(true)}
            >
              View Details
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Specifications Modal */}
      <AnimatePresence>
        {showSpecsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div
              className="absolute inset-0"
              onClick={() => setShowSpecsModal(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-2xl bg-[#0e121d] border border-cyan-500/30 p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-tech uppercase text-cyan-400 tracking-wider">
                    {gadget.category} • {gadget.tier}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white">
                    {gadget.name}
                  </h3>
                </div>
                <button
                  onClick={() => setShowSpecsModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Spec list table */}
              <div className="py-4 space-y-3">
                {Object.entries(gadget.specs || {}).map(([key, val]) => (
                  <div
                    key={key}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-white/5 text-xs"
                  >
                    <span className="font-tech uppercase text-slate-400 font-semibold mb-0.5 sm:mb-0">
                      {key}
                    </span>
                    <span className="font-mono text-white sm:text-right font-medium max-w-[300px]">
                      {val}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-400 bg-white/[0.02] p-3 rounded-xl border border-white/5 flex items-start gap-2">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  Informational reference specs curated for Tech Boss Tamil reviews. Pricing reflects approximate Indian market launch tier.
                </span>
              </div>

              <div className="mt-5 flex justify-end">
                <Button variant="secondary" size="sm" onClick={() => setShowSpecsModal(false)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
