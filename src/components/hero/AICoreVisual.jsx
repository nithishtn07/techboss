import React, { useEffect, useRef, useState } from 'react';
import { Activity } from 'lucide-react';

export default function AICoreVisual() {
  const canvasRef = useRef(null);
  const [activeMode, setActiveMode] = useState('REASONING');
  const [tokensPerSec, setTokensPerSec] = useState(148);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = 380);
    let height = (canvas.height = 380);

    // Particle nodes for neural cluster
    const nodeCount = 38;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 60 + Math.random() * 80;
      nodes.push({
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        baseAngle: angle,
        baseRadius: radius,
        speed: (Math.random() - 0.5) * 0.02,
        size: 2 + Math.random() * 3,
        color: i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? '#8b5cf6' : '#ffffff',
      });
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      // Outer Pulse Rings
      ctx.save();
      for (let r = 1; r <= 3; r++) {
        const ringRadius = 70 + r * 35 + Math.sin(time + r) * 6;
        ctx.strokeStyle = r === 1 ? 'rgba(0, 229, 255, 0.25)' : 'rgba(139, 92, 246, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, time * (r % 2 === 0 ? 0.4 : -0.4), time * (r % 2 === 0 ? 0.4 : -0.4) + Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();

      // Inter-node connection lines
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.baseAngle += n1.speed;
        n1.x = centerX + Math.cos(n1.baseAngle) * (n1.baseRadius + Math.sin(time * 2 + i) * 8);
        n1.y = centerY + Math.sin(n1.baseAngle) * (n1.baseRadius + Math.cos(time * 2 + i) * 8);

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n1.x - n2.x, n1.y - n2.y);
          if (dist < 75) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${1 - dist / 75 * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }

        // Draw node
        ctx.fillStyle = n1.color;
        ctx.shadowColor = n1.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(n1.x, n1.y, n1.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Center glowing Core
      const corePulse = 32 + Math.sin(time * 3) * 4;
      const coreGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, corePulse + 10);
      coreGrad.addColorStop(0, '#00e5ff');
      coreGrad.addColorStop(0.4, '#8b5cf6');
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, corePulse + 10, 0, Math.PI * 2);
      ctx.fill();

      // Central silicon glyph
      ctx.fillStyle = '#080a11';
      ctx.beginPath();
      ctx.arc(centerX, centerY, 20, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.strokeRect(centerX - 9, centerY - 9, 18, 18);

      animationId = requestAnimationFrame(render);
    };

    render();

    // Subtle random fluctuation for realistic telemetry
    const interval = setInterval(() => {
      setTokensPerSec(Math.floor(140 + Math.random() * 25));
    }, 1800);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center p-6 rounded-3xl bg-gradient-to-b from-[#101422] to-[#090b12] border border-cyan-500/20 shadow-2xl overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 bg-radial from-[#00e5ff]/10 via-transparent to-transparent pointer-events-none" />

      {/* Top Telemetry Header */}
      <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-xs font-tech font-bold tracking-widest text-[#00e5ff] uppercase">
            AI CORE ENGINE v3.4
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span>{tokensPerSec} TOKENS/SEC</span>
        </div>
      </div>

      {/* Interactive Core Canvas */}
      <div className="relative my-2">
        <canvas
          ref={canvasRef}
          className="w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] max-w-full"
        />
        
        {/* Floating label inside core */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className="mt-24 px-2.5 py-0.5 rounded-full bg-black/60 border border-cyan-400/40 text-[10px] font-mono text-cyan-300 backdrop-blur-sm">
            {activeMode} MATRIX
          </div>
        </div>
      </div>

      {/* Bottom Mode Switcher Buttons */}
      <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-white/10 z-10">
        {['REASONING', 'VISION', 'LOCAL SILICON'].map((mode) => (
          <button
            key={mode}
            onClick={() => setActiveMode(mode)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-tech font-medium transition-all text-center ${
              activeMode === mode
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40 shadow-sm shadow-[#00e5ff]/30'
                : 'bg-white/5 text-slate-400 border border-transparent hover:border-white/10 hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>
    </div>
  );
}
