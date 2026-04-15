"use client";

/**
 * AnimatedBgSection — Wrapper com efeito de nebula/partículas no background
 *
 * Efeitos visuais:
 * - 2 nebulas laterais com gradientes radiais animados
 * - Partículas flutuantes com glow
 * - Linhas verticais sutis que fluem
 * - Sombra de borda lateral com efeito de profundidade
 *
 * Performance: CSS puro + keyframes — zero JS runtime
 */
export default function AnimatedBgSection({
  children,
  variant = "amber",
}: {
  children: React.ReactNode;
  variant?: "amber" | "cyan" | "neutral";
}) {
  const palettes = {
    amber: {
      nebulaA: "rgba(245,158,11,0.08)",
      nebulaB: "rgba(212,175,55,0.06)",
      nebulaC: "rgba(245,158,11,0.04)",
      particle: "rgba(245,158,11,0.5)",
      particleGlow: "rgba(245,158,11,0.4)",
      line: "rgba(245,158,11,0.06)",
      edgeShadow: "rgba(245,158,11,0.03)",
    },
    cyan: {
      nebulaA: "rgba(14,165,233,0.07)",
      nebulaB: "rgba(56,189,248,0.05)",
      nebulaC: "rgba(14,165,233,0.03)",
      particle: "rgba(56,189,248,0.5)",
      particleGlow: "rgba(56,189,248,0.4)",
      line: "rgba(56,189,248,0.05)",
      edgeShadow: "rgba(14,165,233,0.03)",
    },
    neutral: {
      nebulaA: "rgba(255,255,255,0.035)",
      nebulaB: "rgba(200,200,220,0.025)",
      nebulaC: "rgba(255,255,255,0.02)",
      particle: "rgba(255,255,255,0.3)",
      particleGlow: "rgba(255,255,255,0.2)",
      line: "rgba(255,255,255,0.04)",
      edgeShadow: "rgba(255,255,255,0.02)",
    },
  };
  const c = palettes[variant];

  // Generate deterministic particle positions
  const particles = [
    { x: 8, y: 15, size: 2, delay: 0, dur: 7 },
    { x: 92, y: 25, size: 1.5, delay: 1.5, dur: 9 },
    { x: 15, y: 60, size: 2.5, delay: 3, dur: 8 },
    { x: 85, y: 70, size: 1.8, delay: 0.5, dur: 10 },
    { x: 50, y: 10, size: 1.2, delay: 2, dur: 6 },
    { x: 30, y: 80, size: 2, delay: 4, dur: 8.5 },
    { x: 70, y: 45, size: 1.5, delay: 1, dur: 7.5 },
    { x: 5, y: 40, size: 2.2, delay: 2.5, dur: 9 },
    { x: 95, y: 55, size: 1.8, delay: 3.5, dur: 11 },
    { x: 45, y: 90, size: 2, delay: 0.8, dur: 8 },
    { x: 20, y: 30, size: 1.3, delay: 5, dur: 7 },
    { x: 75, y: 85, size: 2.5, delay: 1.2, dur: 10 },
    { x: 60, y: 20, size: 1.5, delay: 4.5, dur: 6.5 },
    { x: 10, y: 75, size: 1.8, delay: 2.8, dur: 9.5 },
    { x: 88, y: 40, size: 2, delay: 0.3, dur: 8 },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* ── Nebula cloud A — top-left ── */}
      <div
        className="absolute -top-[20%] -left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 70% 60%, ${c.nebulaA} 0%, ${c.nebulaC} 40%, transparent 70%)`,
          filter: "blur(40px)",
          animation: "nebulaFloat 16s ease-in-out infinite",
        }}
      />

      {/* ── Nebula cloud B — bottom-right ── */}
      <div
        className="absolute -bottom-[15%] -right-[15%] w-[450px] h-[450px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 65% 55%, ${c.nebulaB} 0%, ${c.nebulaC} 45%, transparent 72%)`,
          filter: "blur(45px)",
          animation: "nebulaFloat 20s ease-in-out infinite reverse",
          animationDelay: "3s",
        }}
      />

      {/* ── Nebula streak — center diagonal ── */}
      <div
        className="absolute top-[30%] left-[10%] w-[80%] h-[200px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(135deg, transparent 20%, ${c.nebulaC} 50%, transparent 80%)`,
          filter: "blur(50px)",
          transform: "rotate(-15deg) scaleY(0.6)",
          animation: "nebulaStreak 12s ease-in-out infinite",
          opacity: 0.7,
        }}
      />

      {/* ── Edge shadow — left ── */}
      <div
        className="absolute top-0 left-0 w-[120px] h-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to right, ${c.edgeShadow}, transparent)`,
        }}
      />

      {/* ── Edge shadow — right ── */}
      <div
        className="absolute top-0 right-0 w-[120px] h-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to left, ${c.edgeShadow}, transparent)`,
        }}
      />

      {/* ── Vertical flowing lines ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {[15, 40, 65, 88].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 w-px h-[200%]"
            style={{
              left: `${left}%`,
              background: `linear-gradient(to bottom, transparent 0%, ${c.line} 30%, transparent 50%, ${c.line} 70%, transparent 100%)`,
              animation: `lineFlowDown ${14 + i * 3}s linear infinite`,
              animationDelay: `${i * 2.5}s`,
            }}
          />
        ))}
      </div>

      {/* ── Floating particles with glow ── */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.x}%`,
              top: `${p.y}%`,
              background: c.particle,
              boxShadow: `0 0 ${p.size * 4}px ${p.size * 2}px ${c.particleGlow}`,
              animation: `particleDrift ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Children */}
      <div className="relative z-10">{children}</div>

      {/* ── CSS Keyframes ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes nebulaFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.8; }
          25% { transform: translate(25px, -20px) scale(1.08); opacity: 1; }
          50% { transform: translate(10px, 15px) scale(0.95); opacity: 0.7; }
          75% { transform: translate(-15px, -10px) scale(1.04); opacity: 0.9; }
        }
        @keyframes nebulaStreak {
          0%, 100% { transform: rotate(-15deg) scaleY(0.6) translateX(0); opacity: 0.5; }
          50% { transform: rotate(-12deg) scaleY(0.7) translateX(30px); opacity: 0.8; }
        }
        @keyframes lineFlowDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        @keyframes particleDrift {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          25% { transform: translate(8px, -12px); opacity: 0.8; }
          50% { transform: translate(-5px, -6px); opacity: 0.5; }
          75% { transform: translate(4px, 8px); opacity: 0.7; }
        }
      `,
        }}
      />
    </div>
  );
}
