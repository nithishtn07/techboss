import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight, Sparkles, Scale } from 'lucide-react';
import { GADGETS_DATA } from '../../data/gadgets';

export default function ComparisonTool() {
  const [deviceAId, setDeviceAId] = useState(GADGETS_DATA[0].id);
  const [deviceBId, setDeviceBId] = useState(GADGETS_DATA[1].id);

  const deviceA = GADGETS_DATA.find((g) => g.id === deviceAId) || GADGETS_DATA[0];
  const deviceB = GADGETS_DATA.find((g) => g.id === deviceBId) || GADGETS_DATA[1];

  const handleSwap = () => {
    setDeviceAId(deviceBId);
    setDeviceBId(deviceAId);
  };

  const comparisonFields = [
    { label: 'Display', key: 'display' },
    { label: 'Processor', key: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Camera System', key: 'camera' },
    { label: 'Battery Capacity', key: 'battery' },
    { label: 'Weight', key: 'weight' },
    { label: 'Operating System', key: 'os' },
    { label: 'Charging Speed', key: 'fastCharging' },
  ];

  return (
    <section className="relative w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider mb-3">
            <Scale className="w-3.5 h-3.5" /> INTERACTIVE BENCHMARK
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
            COMPARE YOUR TECH
          </h2>
          <p className="mt-2 text-sm text-slate-300 font-sans">
            Head-to-head architectural showdown. Select two devices to compare displays, processors, sensors, and endurance side-by-side.
          </p>
        </div>

        {/* Device Selectors Header Card */}
        <div className="rounded-3xl bg-[#0f121e] border border-cyan-500/20 shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Device A Dropdown & Preview */}
            <div className="md:col-span-5 space-y-4">
              <label className="block text-xs font-tech font-bold uppercase tracking-wider text-cyan-400">
                DEVICE 1
              </label>
              <select
                value={deviceAId}
                onChange={(e) => setDeviceAId(e.target.value)}
                className="w-full bg-[#161a29] border border-white/15 focus:border-[#00e5ff] rounded-xl px-4 py-3 text-sm font-tech text-white outline-none transition-colors cursor-pointer"
              >
                {GADGETS_DATA.map((g) => (
                  <option key={g.id} value={g.id} className="bg-[#121520] text-white">
                    {g.name} ({g.tier || g.category})
                  </option>
                ))}
              </select>

              {/* Device A Visual Strip */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <img
                  src={deviceA.image}
                  alt={deviceA.name}
                  className="w-16 h-16 object-cover rounded-xl border border-white/10"
                />
                <div>
                  <h4 className="font-bold font-display text-white text-base">
                    {deviceA.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-0.5">
                    <span>{deviceA.priceEst}</span>
                    <span>•</span>
                    <span>⭐ {deviceA.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Swap Button (Center) */}
            <div className="md:col-span-1 flex justify-center py-2 md:py-0">
              <button
                onClick={handleSwap}
                title="Swap Devices"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00e5ff] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-95"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Device B Dropdown & Preview */}
            <div className="md:col-span-5 space-y-4">
              <label className="block text-xs font-tech font-bold uppercase tracking-wider text-purple-400">
                DEVICE 2
              </label>
              <select
                value={deviceBId}
                onChange={(e) => setDeviceBId(e.target.value)}
                className="w-full bg-[#161a29] border border-white/15 focus:border-purple-400 rounded-xl px-4 py-3 text-sm font-tech text-white outline-none transition-colors cursor-pointer"
              >
                {GADGETS_DATA.map((g) => (
                  <option key={g.id} value={g.id} className="bg-[#121520] text-white">
                    {g.name} ({g.tier || g.category})
                  </option>
                ))}
              </select>

              {/* Device B Visual Strip */}
              <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <img
                  src={deviceB.image}
                  alt={deviceB.name}
                  className="w-16 h-16 object-cover rounded-xl border border-white/10"
                />
                <div>
                  <h4 className="font-bold font-display text-white text-base">
                    {deviceB.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mt-0.5">
                    <span>{deviceB.priceEst}</span>
                    <span>•</span>
                    <span>⭐ {deviceB.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs font-tech uppercase text-slate-400">
                    <th className="py-3 px-4 w-1/4">Specification</th>
                    <th className="py-3 px-4 w-[37.5%] text-cyan-400 font-bold">
                      {deviceA.name}
                    </th>
                    <th className="py-3 px-4 w-[37.5%] text-purple-400 font-bold">
                      {deviceB.name}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {comparisonFields.map((field) => {
                    const valA = deviceA.specs?.[field.key] || 'N/A';
                    const valB = deviceB.specs?.[field.key] || 'N/A';
                    const isDifferent = valA !== valB;

                    return (
                      <tr
                        key={field.key}
                        className={`transition-colors ${
                          isDifferent ? 'bg-white/[0.015] hover:bg-white/[0.03]' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-tech font-semibold text-slate-300 text-xs">
                          {field.label}
                        </td>
                        <td
                          className={`py-3.5 px-4 font-mono text-xs sm:text-sm ${
                            isDifferent ? 'text-white font-medium' : 'text-slate-400'
                          }`}
                        >
                          <div className="flex items-start gap-1.5">
                            {isDifferent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                            )}
                            <span>{valA}</span>
                          </div>
                        </td>
                        <td
                          className={`py-3.5 px-4 font-mono text-xs sm:text-sm ${
                            isDifferent ? 'text-white font-medium' : 'text-slate-400'
                          }`}
                        >
                          <div className="flex items-start gap-1.5">
                            {isDifferent && (
                              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                            )}
                            <span>{valB}</span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Verdict Summary Box */}
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-tech font-bold text-white text-xs uppercase tracking-wide">
                    Tech Boss Quick Verdict
                  </h5>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {deviceA.tier === 'Flagship' && deviceB.tier === 'Flagship'
                      ? 'Both are top-tier flagship titans. Choose based on your ecosystem preference (Android customizations vs iOS Apple Silicon continuity).'
                      : `Comparing ${deviceA.name} and ${deviceB.name}. Check processor benchmarks and real-world thermals in our dedicated YouTube video.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
