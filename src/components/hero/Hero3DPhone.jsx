import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Cpu, Wifi, Camera, Zap } from 'lucide-react';

function checkWebGLSupport() {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch {
    return false;
  }
}

export default function Hero3DPhone() {
  const mountRef = useRef(null);
  const [webGLFailed, setWebGLFailed] = useState(() => !checkWebGLSupport());
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container || webGLFailed) return;

    let scene, camera, renderer, phoneGroup;
    let frameId;

    try {
      const width = container.clientWidth || 450;
      const height = container.clientHeight || 520;

      scene = new THREE.Scene();

      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      mountRef.current.appendChild(renderer.domElement);

      phoneGroup = new THREE.Group();
      scene.add(phoneGroup);

      // --- Phone Chassis & Body ---
      // Outer rounded frame (Titanium dark finish)
      const bodyGeo = new THREE.BoxGeometry(2.3, 4.8, 0.22, 4, 4, 4);
      const titaniumMat = new THREE.MeshStandardMaterial({
        color: 0x141824,
        metalness: 0.88,
        roughness: 0.25,
        wireframe: false,
      });
      const phoneBody = new THREE.Mesh(bodyGeo, titaniumMat);
      phoneGroup.add(phoneBody);

      // Chamfer edge rim (Electric cyan glow border)
      const rimGeo = new THREE.BoxGeometry(2.34, 4.84, 0.2, 2, 2, 2);
      const rimMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        emissive: 0x004455,
        metalness: 0.9,
        roughness: 0.15,
      });
      const rim = new THREE.Mesh(rimGeo, rimMat);
      phoneGroup.add(rim);

      // Front Display Screen (Glossy deep OLED display with glowing gradient graphic)
      const screenGeo = new THREE.PlaneGeometry(2.18, 4.65);
      // Create a procedural canvas texture for screen wallpaper
      const screenCanvas = document.createElement('canvas');
      screenCanvas.width = 512;
      screenCanvas.height = 1024;
      const ctx = screenCanvas.getContext('2d');
      if (ctx) {
        // Dark futuristic gradient
        const grad = ctx.createLinearGradient(0, 0, 512, 1024);
        grad.addColorStop(0, '#0a0d17');
        grad.addColorStop(0.5, '#05192d');
        grad.addColorStop(1, '#000511');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 1024);

        // Tech Boss aesthetic typography on screen
        ctx.fillStyle = 'rgba(0, 229, 255, 0.15)';
        ctx.fillRect(40, 160, 432, 1);
        ctx.fillRect(40, 860, 432, 1);

        ctx.font = 'bold 36px sans-serif';
        ctx.fillStyle = '#00e5ff';
        ctx.fillText('TECH BOSS', 60, 240);

        ctx.font = '20px monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.fillText('TAMIL TECH EDITION', 60, 280);
        ctx.fillText('5G ULTRA • 3NM AI CORE', 60, 315);

        // Circular futuristic HUD glyph
        ctx.strokeStyle = '#00e5ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(256, 540, 120, 0, Math.PI * 1.6);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(139, 92, 246, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(256, 540, 95, 0.8, Math.PI * 2);
        ctx.stroke();

        ctx.font = 'bold 28px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('BEYOND LIMITS', 256, 548);
        ctx.font = '16px monospace';
        ctx.fillStyle = '#00e5ff';
        ctx.fillText('120Hz LTPO OLED', 256, 580);
      }

      const screenTex = new THREE.CanvasTexture(screenCanvas);
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTex,
        roughness: 0.1,
        metalness: 0.2,
      });
      const frontScreen = new THREE.Mesh(screenGeo, screenMat);
      frontScreen.position.z = 0.115;
      phoneGroup.add(frontScreen);

      // Camera Bump (Back)
      const bumpGeo = new THREE.BoxGeometry(0.9, 1.6, 0.08);
      const bumpMat = new THREE.MeshStandardMaterial({
        color: 0x0f131d,
        metalness: 0.9,
        roughness: 0.3,
      });
      const cameraBump = new THREE.Mesh(bumpGeo, bumpMat);
      cameraBump.position.set(-0.5, 1.3, -0.13);
      phoneGroup.add(cameraBump);

      // 3 Triple Lenses on the camera bump
      const lensGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.05, 32);
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x05070d,
        metalness: 0.95,
        roughness: 0.05,
      });
      const rimRingMat = new THREE.MeshStandardMaterial({
        color: 0x00e5ff,
        metalness: 0.9,
        roughness: 0.2,
      });

      for (let i = 0; i < 3; i++) {
        const lens = new THREE.Mesh(lensGeo, lensMat);
        lens.rotation.x = Math.PI / 2;
        lens.position.set(-0.5, 1.7 - i * 0.42, -0.17);
        phoneGroup.add(lens);

        const ringGeo = new THREE.RingGeometry(0.18, 0.22, 32);
        const ring = new THREE.Mesh(ringGeo, rimRingMat);
        ring.position.set(-0.5, 1.7 - i * 0.42, -0.196);
        ring.rotation.y = Math.PI;
        phoneGroup.add(ring);
      }

      // --- Lighting Setup ---
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      // Electric Cyan Key Light
      const cyanLight = new THREE.PointLight(0x00e5ff, 3.5, 15);
      cyanLight.position.set(4, 3, 5);
      scene.add(cyanLight);

      // Violet Rim Light (from behind/side)
      const violetLight = new THREE.PointLight(0x8b5cf6, 2.5, 12);
      violetLight.position.set(-4, -2, -3);
      scene.add(violetLight);

      // Top soft white light
      const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
      topLight.position.set(0, 6, 4);
      scene.add(topLight);

      // Mouse move listener
      const handleMouseMove = (e) => {
        const rect = mountRef.current?.getBoundingClientRect();
        if (!rect) return;
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mousePos.current.targetX = normX * 0.45;
        mousePos.current.targetY = normY * 0.35;
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Window resize listener
      const handleResize = () => {
        if (!mountRef.current || !renderer || !camera) return;
        const w = mountRef.current.clientWidth;
        const h = mountRef.current.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      // Initial angle: slight angle showcasing 3D depth and screen
      phoneGroup.rotation.y = -0.35;
      phoneGroup.rotation.x = 0.15;
      phoneGroup.rotation.z = -0.05;

      // Animation Loop
      let clock = new THREE.Clock();
      const animate = () => {
        frameId = requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth damping towards mouse position
        mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.04;
        mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.04;

        // Subtle floating / bobbing effect
        phoneGroup.position.y = Math.sin(elapsedTime * 0.9) * 0.1;

        // Base slow rotation combined with gentle mouse interaction
        phoneGroup.rotation.y = -0.3 + Math.sin(elapsedTime * 0.45) * 0.1 + mousePos.current.x * 0.5;
        phoneGroup.rotation.x = 0.12 + Math.cos(elapsedTime * 0.5) * 0.05 - mousePos.current.y * 0.5;

        renderer.render(scene, camera);
      };

      animate();

      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        if (renderer && renderer.domElement && container) {
          container.removeChild(renderer.domElement);
          renderer.dispose();
        }
      };
    } catch (err) {
      console.warn('WebGL initialization failed, falling back to CSS device mockup:', err);
      setWebGLFailed(true);
    }
  }, []);

  return (
    <div className="relative w-full max-w-[440px] h-[460px] sm:h-[520px] mx-auto flex items-center justify-center overflow-visible">
      {/* Soft Glow Radial Background */}
      <div className="absolute inset-0 bg-radial from-[#00e5ff]/15 via-transparent to-transparent blur-3xl pointer-events-none" />
      <div className="absolute w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-[#8b5cf6]/10 blur-[80px] pointer-events-none -bottom-8 right-0" />

      {/* 3D Canvas Mount Point */}
      {!webGLFailed ? (
        <div
          ref={mountRef}
          className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-300"
          title="Drag mouse over device to inspect in 3D"
        />
      ) : (
        /* Graceful Fallback if WebGL unavailable */
        <div className="relative w-64 sm:w-72 h-[420px] sm:h-[480px] rounded-[40px] border-2 border-cyan-400/40 bg-gradient-to-b from-[#101420] via-[#090b12] to-[#05070d] p-4 shadow-[0_0_50px_rgba(0,229,255,0.2)] flex flex-col items-center justify-between">
          <div className="w-20 h-3.5 bg-slate-900 rounded-full border border-white/10 mt-1" />
          <div className="text-center">
            <span className="text-xs uppercase tracking-widest text-[#00e5ff] font-tech font-bold block mb-1">
              TECH BOSS
            </span>
            <span className="text-lg sm:text-xl font-display font-bold text-white block">
              TAMIL TECH
            </span>
            <span className="text-xs text-slate-400 font-tech">
              BEYOND LIMITS
            </span>
          </div>
          <div className="w-full p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <span className="text-xs text-[#00e5ff] font-tech">120Hz LTPO AMOLED</span>
            <div className="text-xs text-slate-300 mt-1">Snapdragon 8 Elite • 3nm</div>
          </div>
        </div>
      )}

      {/* Floating Badges with mobile-safe coordinates */}
      <div className="absolute top-2 left-2 sm:-left-4 flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0e121d]/90 border border-[#00e5ff]/30 shadow-lg shadow-black/60 backdrop-blur-md">
        <span className="flex h-2 w-2 rounded-full bg-[#00e5ff]" />
        <span className="text-[11px] sm:text-xs font-tech font-bold text-[#00e5ff] flex items-center gap-1">
          <Cpu className="w-3.5 h-3.5" /> AI ENGINE
        </span>
        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">NPU</span>
      </div>

      <div className="absolute top-1/4 right-2 sm:-right-4 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0e121d]/90 border border-white/15 shadow-lg shadow-black/60 backdrop-blur-md">
        <Wifi className="w-3.5 h-3.5 text-[#00e5ff]" />
        <span className="text-[11px] sm:text-xs font-tech font-semibold text-white">5G SA</span>
        <span className="text-[10px] text-emerald-400 font-mono">BAND 78</span>
      </div>

      <div className="absolute bottom-20 left-2 sm:-left-6 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0e121d]/90 border border-purple-500/30 shadow-lg shadow-black/60 backdrop-blur-md">
        <Camera className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-[11px] sm:text-xs font-tech font-semibold text-white">PERISCOPE</span>
        <span className="text-[10px] text-purple-300 font-mono">5X OIS</span>
      </div>

      <div className="absolute bottom-2 right-2 sm:right-2 flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-[#0e121d]/90 border border-[#00e5ff]/25 shadow-lg shadow-black/60 backdrop-blur-md">
        <Zap className="w-3.5 h-3.5 text-yellow-400" />
        <span className="text-[11px] sm:text-xs font-tech font-semibold text-white">CHIPSET</span>
        <span className="text-[10px] text-cyan-300 font-mono">3nm</span>
      </div>
    </div>
  );
}
