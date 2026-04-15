"use client";

/**
 * AnimatedBgSection — Wrapper com efeito sutil de nebula no background
 *
 * Efeitos: nebulas suaves, poucas partículas discretas, 2 linhas verticais
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
      nebulaA: "rgba(245,158,11,0.05)",
      nebulaB: "rgba(212,175,55,0.035)",
      particle: "rgba(245,158,11,0.3)",
      particleGlow: "rgba(245,158,11,0.15)",
      line: "rgba(245,158,11,0.03)",
    },
    cyan: {
      nebulaA: "rgba(14,165,233,0.045)",
      nebulaB: "rgba(56,189,248,0.03)",
      particle: "rgba(56,189,248,0.3)",
      particleGlow: "rgba(56,189,248,0.15)",
      line: "rgba(56,189,248,0.03)",
    },
    neutral: {
      nebulaA: "rgba(255,255,255,0.025)",
      nebulaB: "rgba(200,200,220,0.018)",
      particle: "rgba(255,255,255,0.2)",
      particleGlow: "rgba(255,255,255,0.1)",
      line: "rgba(255,255,255,0.025)",
    },
  };
  const c = palettes[variant];

  // Only 6 particles — subtle and intentional
  const particles = [
    { x: 10, y: 20, size: 1.5, delay: 0, dur: 12 },
    { x: 90, y: 35, size: 1.2, delay: 3, dur: 14 },
    { x: 25, y: 75, size: 1.8, delay: 6, dur: 11 },
    { x: 78, y: 65, size: 1.3, delay: 2, dur: 15 },
    { x: 55, y: 15, size: 1, delay: 5, dur: 13 },
    { x: 42, y: 88, size: 1.5, delay: 8, dur: 12 },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Nebula A — top-left, soft */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 65% 55%, ${c.nebulaA} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "nebulaFloat 22s ease-in-out infinite",
        }}
      />

      {/* Nebula B — bottom-right, soft */}
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[350px] h-[350px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(ellipse 60% 50%, ${c.nebulaB} 0%, transparent 72%)`,
          filter: "blur(60px)",
          animation: "nebulaFloat 28s ease-in-out infinite reverse",
          animationDelay: "4s",
        }}
      />

      {/* 2 vertical lines — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {[30, 70].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 w-px h-[200%]"
            style={{
              left: `${left}%`,
              background: `linear-gradient(to bottom, transparent, ${c.line}, transparent)`,
              animation: `lineFlowDown ${18 + i * 5}s linear infinite`,
              animationDelay: `${i * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Floating particles — few, small, slow */}
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
              boxShadow: `0 0 ${p.size * 3}px ${c.particleGlow}`,
              animation: `particleDrift ${p.dur}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Children */}
      <div className="relative z-10">{children}</div>

      {/* CSS Keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes nebulaFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(15px, -10px) scale(1.04); }
        }
        @keyframes lineFlowDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0%); }
        }
        @keyframes particleDrift {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(5px, -8px); opacity: 0.5; }
        }
      `,
        }}
      />
    </div>
  );
}
