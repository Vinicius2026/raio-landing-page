"use client";

/**
 * AnimatedBgSection — Wrapper que adiciona efeito de background animado
 * com blobs flutuantes e linhas verticais sutis.
 *
 * Uso: envolver seções alternadas na page /acelerarvendas
 * para criar contraste visual entre seções com e sem animação.
 *
 * Performance: CSS puro + keyframes — zero JS runtime, zero RAF
 */
export default function AnimatedBgSection({
  children,
  variant = "amber",
}: {
  children: React.ReactNode;
  variant?: "amber" | "cyan" | "neutral";
}) {
  const colors = {
    amber: {
      blobA: "rgba(245,158,11,0.05)",
      blobB: "rgba(245,158,11,0.03)",
      lines: "rgba(245,158,11,0.04)",
      dots: "rgba(245,158,11,0.3)",
    },
    cyan: {
      blobA: "rgba(14,165,233,0.05)",
      blobB: "rgba(14,165,233,0.03)",
      lines: "rgba(14,165,233,0.04)",
      dots: "rgba(14,165,233,0.3)",
    },
    neutral: {
      blobA: "rgba(255,255,255,0.02)",
      blobB: "rgba(255,255,255,0.015)",
      lines: "rgba(255,255,255,0.03)",
      dots: "rgba(255,255,255,0.08)",
    },
  };
  const c = colors[variant];

  return (
    <div className="relative overflow-hidden">
      {/* Floating blob A */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[400px] h-[400px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${c.blobA} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "bgBlobFloat 14s ease-in-out infinite",
        }}
      />

      {/* Floating blob B */}
      <div
        className="absolute -bottom-[10%] -right-[10%] w-[350px] h-[350px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${c.blobB} 0%, transparent 70%)`,
          filter: "blur(60px)",
          animation: "bgBlobFloat 18s ease-in-out infinite reverse",
        }}
      />

      {/* Vertical flowing lines */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
        style={{ opacity: 0.5 }}
      >
        {[20, 50, 80].map((left, i) => (
          <div
            key={i}
            className="absolute top-0 w-px h-full"
            style={{
              left: `${left}%`,
              background: `linear-gradient(to bottom, transparent, ${c.lines}, transparent)`,
              animation: `bgLineFlow ${10 + i * 3}s linear infinite`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Floating micro dots */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              left: `${10 + Math.random() * 80}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? c.dots : "rgba(255,255,255,0.05)",
              animation: `bgDotFloat ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Children pass-through */}
      <div className="relative z-10">{children}</div>

      {/* CSS keyframes — injected once */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes bgBlobFloat {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(20px, -30px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        @keyframes bgLineFlow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes bgDotFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-10px) translateX(5px); opacity: 0.7; }
          66% { transform: translateY(6px) translateX(-3px); opacity: 0.4; }
        }
      `,
        }}
      />
    </div>
  );
}
