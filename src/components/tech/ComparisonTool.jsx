import React, { useState } from 'react';
import { ArrowLeftRight, Sparkles, Scale, Zap } from 'lucide-react';
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

  const comparisonSpecs = [
    { label: 'Display', key: 'display', metricKey: 'display' },
    { label: 'Processor', key: 'processor', metricKey: 'processor' },
    { label: 'RAM', key: 'ram' },
    { label: 'Storage', key: 'storage' },
    { label: 'Camera System', key: 'camera', metricKey: 'camera' },
    { label: 'Battery Capacity', key: 'battery', metricKey: 'battery' },
    { label: 'Charging', key: 'fastCharging', metricKey: 'charging' },
    { label: 'Connectivity', key: 'connectivity' },
    { label: 'Operating System', key: 'os' },
    { label: 'Weight', key: 'weight' },
  ];

  const visualMeters = [
    { label: 'Display Quality', key: 'display' },
    { label: 'Compute Power', key: 'processor' },
    { label: 'Camera Capability', key: 'camera' },
    { label: 'Battery Endurance', key: 'battery' },
    { label: 'Charging Speed', key: 'charging' },
  ];

  return (
    <div className="relative w-full py-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-tech text-[#00e5ff] uppercase tracking-wider mb-3">
          <Scale className="w-3.5 h-3.5" /> INTERACTIVE COMPARISON MATRIX
        </div>
        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          HEAD-TO-HEAD COMPARISON
        </h2>
        <p className="mt-2 text-sm text-slate-300 font-sans">
          Select two devices to inspect displays, processors, camera hardware, and real-world endurance side-by-side.
        </p>
      </div>

      {/* Main Container */}
      <div className="rounded-3xl bg-[#0e111a] border border-cyan-500/30 shadow-2xl p-6 sm:p-8 space-y-8">
        {/* Device Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Device A Dropdown & Card */}
          <div className="md:col-span-5 space-y-3">
            <label className="block text-xs font-tech font-bold uppercase tracking-wider text-cyan-400">
              DEVICE A
            </label>
            <select
              value={deviceAId}
              onChange={(e) => setDeviceAId(e.target.value)}
              className="w-full bg-[#151928] border border-white/15 focus:border-[#00e5ff] rounded-xl px-4 py-3 text-sm font-tech text-white outline-none transition-colors cursor-pointer"
            >
              {GADGETS_DATA.map((g) => (
                <option key={g.id} value={g.id} className="bg-[#121520] text-white">
                  {g.name} ({g.tier || g.category})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <img
                src={deviceA.image}
                alt={deviceA.name}
                className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold font-display text-white text-sm sm:text-base truncate">
                  {deviceA.name}
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mt-1">
                  <span>{deviceA.priceEst}</span>
                  <span>•</span>
                  <span>{deviceA.tier}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Swap Button (Center) */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              onClick={handleSwap}
              title="Swap Devices"
              aria-label="Swap Device A and Device B"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00e5ff] hover:text-black text-white border border-white/20 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-lg"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>

          {/* Device B Dropdown & Card */}
          <div className="md:col-span-5 space-y-3">
            <label className="block text-xs font-tech font-bold uppercase tracking-wider text-purple-400">
              DEVICE B
            </label>
            <select
              value={deviceBId}
              onChange={(e) => setDeviceBId(e.target.value)}
              className="w-full bg-[#151928] border border-white/15 focus:border-purple-400 rounded-xl px-4 py-3 text-sm font-tech text-white outline-none transition-colors cursor-pointer"
            >
              {GADGETS_DATA.map((g) => (
                <option key={g.id} value={g.id} className="bg-[#121520] text-white">
                  {g.name} ({g.tier || g.category})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
              <img
                src={deviceB.image}
                alt={deviceB.name}
                className="w-16 h-16 object-cover rounded-xl border border-white/10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold font-display text-white text-sm sm:text-base truncate">
                  {deviceB.name}
                </h4>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mt-1">
                  <span>{deviceB.priceEst}</span>
                  <span>•</span>
                  <span>{deviceB.tier}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison Indicator Bars */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#090b12] border border-white/10 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              VISUAL PERFORMANCE METERS
            </span>
            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" /> {deviceA.name.split(' ')[0]}
              </span>
              <span className="flex items-center gap-1.5 text-purple-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-purple-400 inline-block" /> {deviceB.name.split(' ')[0]}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {visualMeters.map((meter) => {
              const scoreA = deviceA.scores?.[meter.key] || 85;
              const scoreB = deviceB.scores?.[meter.key] || 85;

              return (
                <div key={meter.key} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-tech text-slate-300">
                    <span>{meter.label}</span>
                    <span className="font-mono text-[11px] text-slate-400">
                      <span className="text-cyan-400 font-bold">{scoreA}%</span> vs{' '}
                      <span className="text-purple-400 font-bold">{scoreB}%</span>
                    </span>
                  </div>

                  {/* Dual Bar Graphic */}
                  <div className="grid grid-cols-2 gap-2">
                    {/* Bar A */}
                    <div className="h-3 rounded-full bg-white/5 overflow-hidden flex justify-end">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-500"
                        style={{ width: `${scoreA}%` }}
                      />
                    </div>

                    {/* Bar B */}
                    <div className="h-3 rounded-full bg-white/5 overflow-hidden flex justify-start">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500"
                        style={{ width: `${scoreB}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Side-By-Side Comparison Specs Table */}
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
              {/* Verified Price Row */}
              <tr className="bg-white/[0.02]">
                <td className="py-3.5 px-4 font-tech font-bold text-slate-200 text-xs">
                  Estimated Price (INR)
                </td>
                <td className="py-3.5 px-4 font-mono text-sm font-bold text-cyan-400">
                  {deviceA.priceEst}
                </td>
                <td className="py-3.5 px-4 font-mono text-sm font-bold text-purple-400">
                  {deviceB.priceEst}
                </td>
              </tr>

              {/* Dynamic Specs Rows */}
              {comparisonSpecs.map((field) => {
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

        {/* Verdict Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-tech font-bold text-white text-xs uppercase tracking-wider">
                Tech Boss Verdict Summary
              </h5>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {deviceA.name} ({deviceA.priceEst}) vs {deviceB.name} ({deviceB.priceEst}). Both are rigorous Tamil consumer picks with distinctive thermal profiles, displays, and OS ergonomics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
