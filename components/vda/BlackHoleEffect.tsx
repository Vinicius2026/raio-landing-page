"use client";

import { useEffect, useRef } from "react";

/**
 * BlackHoleEffect — Efeito de "buraco negro" no final da página /acelerarvendas
 *
 * Implementação:
 * - Canvas 2D puro (sem libs externas) — performance máxima
 * - Partículas em espiral sendo sugadas para o centro
 * - Disco de acreção com glow radial animado
 * - Will-change e RAF otimizado
 * - Canvas só renderiza quando visível (IntersectionObserver)
 */
export default function BlackHoleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isVisibleRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Particle system
    const PARTICLE_COUNT = 80;
    interface Particle {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      opacity: number;
      hue: number;
    }

    const particles: Particle[] = Array.from(
      { length: PARTICLE_COUNT },
      () => ({
        angle: Math.random() * Math.PI * 2,
        radius: 60 + Math.random() * 200,
        speed: 0.003 + Math.random() * 0.008,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.2 + Math.random() * 0.5,
        hue: 25 + Math.random() * 20, // amber/orange range
      })
    );

    let time = 0;

    const draw = () => {
      if (!isVisibleRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);
      time += 0.008;

      // ── Accretion disk glow ──
      const diskGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 140);
      diskGrad.addColorStop(0, "rgba(0,0,0,0.95)");
      diskGrad.addColorStop(0.15, "rgba(20,12,5,0.8)");
      diskGrad.addColorStop(0.4, `rgba(245,158,11,${0.06 + Math.sin(time * 1.5) * 0.02})`);
      diskGrad.addColorStop(0.7, `rgba(245,158,11,${0.02 + Math.sin(time * 2) * 0.01})`);
      diskGrad.addColorStop(1, "transparent");
      ctx.fillStyle = diskGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Event horizon ring ──
      ctx.beginPath();
      ctx.arc(cx, cy, 28, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0,0,0,0.98)";
      ctx.fill();

      // Inner glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(245,158,11,${0.15 + Math.sin(time * 3) * 0.08})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ── Particles spiraling inward ──
      for (const p of particles) {
        p.angle += p.speed;
        // Slowly pull inward
        p.radius -= 0.04;
        if (p.radius < 25) {
          // Respawn at outer edge
          p.radius = 100 + Math.random() * 160;
          p.angle = Math.random() * Math.PI * 2;
          p.opacity = 0.2 + Math.random() * 0.5;
        }

        const x = cx + Math.cos(p.angle) * p.radius;
        const y = cy + Math.sin(p.angle) * p.radius * 0.55; // Squashed = disk-like

        // Fade as they approach center
        const fadeFactor = Math.min(1, (p.radius - 25) / 80);
        const alpha = p.opacity * fadeFactor;

        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${alpha})`;
        ctx.fill();

        // Tiny trail
        if (p.radius > 50) {
          const tx = cx + Math.cos(p.angle - p.speed * 4) * (p.radius + 3);
          const ty = cy + Math.sin(p.angle - p.speed * 4) * (p.radius + 3) * 0.55;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(tx, ty);
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 50%, ${alpha * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // ── Outer gravitational distortion rings ──
      for (let ring = 0; ring < 3; ring++) {
        const r = 80 + ring * 50 + Math.sin(time * (1.2 + ring * 0.3)) * 5;
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * 0.5, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245,158,11,${0.04 - ring * 0.01})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    // Only render when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "340px", background: "#0B0B0B" }}
      aria-hidden="true"
    >
      {/* Top gradient blend */}
      <div
        className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, #0B0B0B, transparent)",
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: "transform" }}
      />

      {/* Bottom gradient blend */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0B0B0B, transparent)",
        }}
      />
    </section>
  );
}
