'use client';
import React, { useRef, useEffect, useCallback } from 'react';

// ── Configuração ──────────────────────────────────────────────────
const COLS = 60;
const ROWS = 60;
const SPACING = 14;          // px entre cada ponto
const BASE_RADIUS = 1.5;     // raio base da partícula
const WAVE_AMP = 8;          // amplitude da onda (px de deslocamento vertical)
const MOUSE_RADIUS = 120;    // raio de influência do cursor (px)
const MOUSE_STRENGTH = 18;   // força de elevação do mouse
const PARTICLE_COLOR = 'rgba(255, 255, 255, 0.30)';

export default function ParticleWaveBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const inViewRef = useRef(false);
    const mouseRef = useRef({ x: -9999, y: -9999 });

    // ── Render Loop ───────────────────────────────────────────────
    const animate = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;

        // Resize apenas quando necessário
        if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.scale(dpr, dpr);
        }

        ctx.clearRect(0, 0, w, h);

        const time = performance.now() * 0.0005; // velocidade da onda
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        // Offset para centralizar a grade no canvas
        const gridW = (COLS - 1) * SPACING;
        const gridH = (ROWS - 1) * SPACING;
        const offsetX = (w - gridW) / 2;
        const offsetY = (h - gridH) / 2;

        ctx.fillStyle = PARTICLE_COLOR;

        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const baseX = offsetX + col * SPACING;
                const baseY = offsetY + row * SPACING;

                // Onda matemática (sinusoidal cruzada — efeito topográfico)
                const waveX = Math.sin((col * 0.15) + time) * WAVE_AMP;
                const waveY = Math.cos((row * 0.2) + time * 0.8) * WAVE_AMP * 0.6;
                const wave = waveX + waveY;

                let px = baseX;
                let py = baseY + wave;

                // Interação com o mouse — elevação suave
                const dx = px - mx;
                const dy = py - my;
                const dist = Math.sqrt(dx * dx + dy * dy);
                let radius = BASE_RADIUS;

                if (dist < MOUSE_RADIUS) {
                    const factor = 1 - dist / MOUSE_RADIUS;
                    // Empurra as partículas para fora do cursor suavemente
                    px += (dx / dist) * factor * MOUSE_STRENGTH * 0.3;
                    py += (dy / dist) * factor * MOUSE_STRENGTH * 0.3;
                    // Aumenta o raio próximo ao cursor
                    radius = BASE_RADIUS + factor * 2;
                }

                // Opacidade variável baseada na onda (partículas mais "altas" brilham mais)
                const brightness = 0.2 + Math.abs(wave / (WAVE_AMP * 2)) * 0.5;
                ctx.globalAlpha = brightness;

                ctx.beginPath();
                ctx.arc(px, py, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;

        if (inViewRef.current) {
            animRef.current = requestAnimationFrame(animate);
        }
    }, []);

    // ── Intersection Observer (pausa quando fora da viewport) ─────
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                inViewRef.current = entry.isIntersecting;
                if (entry.isIntersecting) {
                    animRef.current = requestAnimationFrame(animate);
                } else {
                    cancelAnimationFrame(animRef.current);
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(container);
        return () => {
            observer.disconnect();
            cancelAnimationFrame(animRef.current);
        };
    }, [animate]);

    // ── Mouse Tracker ─────────────────────────────────────────────
    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        const handleLeave = () => {
            mouseRef.current = { x: -9999, y: -9999 };
        };

        window.addEventListener('mousemove', handleMove, { passive: true });
        window.addEventListener('mouseleave', handleLeave);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseleave', handleLeave);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            {/* Gradiente de fusão premium */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F97316]/5 to-[#0B0F19] pointer-events-none z-10" />
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ zIndex: 0 }}
            />
        </div>
    );
}
