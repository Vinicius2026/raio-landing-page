"use client";

import { motion, Variants } from "framer-motion";
import { trackEvent } from "@/lib/meta-pixel";

const CTA_HREF = "#pricing";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 20 } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};

function handleCta() {
  trackEvent("InitiateCheckout", {
    content_name: "Bastidores VDA - Hero",
    value: 34,
    currency: "BRL",
  });
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-5 pt-28 pb-24 overflow-hidden">

      {/* ── Background layers ── */}

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial amber glow — top center */}
      <div
        className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(ellipse 60% 55% at 50% 30%, rgba(245,158,11,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      {/* Cyan edge glow — left */}
      <div
        className="absolute top-1/4 -left-[100px] w-[300px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Cyan edge glow — right */}
      <div
        className="absolute bottom-1/4 -right-[100px] w-[300px] h-[500px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        aria-hidden="true"
        style={{ background: "linear-gradient(to top, #0A0A0A, transparent)" }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          opacity: 0.03,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          backgroundSize: "200px 200px",
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 35 }).map((_, i) => {
          const size = 1.2 + Math.random() * 2.5;
          const isGold = i % 3 === 0;
          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: isGold
                  ? `rgba(245,158,11,${0.25 + Math.random() * 0.35})`
                  : `rgba(255,255,255,${0.04 + Math.random() * 0.08})`,
                boxShadow: isGold ? `0 0 ${4 + Math.random() * 6}px rgba(245,158,11,0.3)` : "none",
                animation: `floatParticle ${8 + Math.random() * 12}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          );
        })}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-center">

          {/* Badge */}
          <motion.div variants={fadeUp} className="mb-10">
            <div
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full"
              style={{
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.20)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 0 20px rgba(245,158,11,0.08)",
              }}
            >
              <svg className="w-3.5 h-3.5 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[11px] font-semibold tracking-[0.3em] text-amber-400/90 uppercase">
                Acesso Interno VDA
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="text-[30px] md:text-[54px] font-extrabold leading-[1.10] tracking-tight text-white mb-7 px-2"
          >
            Veja o que está{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)" }}
            >
              funcionando HOJE
            </span>
            <br />
            antes de tentar vender qualquer coisa
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={fadeUp}
            className="text-[15px] md:text-[18px] text-white/50 max-w-xl mx-auto mb-10 leading-relaxed font-light"
          >
            Entre nos Bastidores VDA e acompanhe em tempo real
            o que pessoas comuns estão fazendo para vender na internet
          </motion.p>

          {/* Social proof */}
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3.5 mb-12">
            <div className="flex -space-x-2.5">
              {["#8B5CF6", "#F59E0B", "#10B981", "#EC4899"].map((c, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-[2.5px] border-[#0A0A0A]"
                  style={{
                    background: `linear-gradient(135deg, ${c}, ${c}88)`,
                    boxShadow: `0 0 10px ${c}33`,
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full bg-emerald-400"
                style={{
                  boxShadow: "0 0 8px rgba(34,197,94,0.6)",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              />
              <span className="text-[13px] text-white/45 font-light">
                +142 pessoas ativas agora
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeUp} className="w-full max-w-sm mx-auto">
            <motion.a
              href={CTA_HREF}
              onClick={handleCta}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex flex-col items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden py-[22px] px-8"
              style={{
                background: "linear-gradient(135deg, #b8941a 0%, #f0d060 35%, #ecc840 65%, #b8941a 100%)",
                boxShadow: "0 0 40px rgba(245,158,11,0.25), 0 0 80px rgba(245,158,11,0.08), 0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {/* Shimmer */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)",
                  animation: "shimmerSweep 2s ease-in-out infinite",
                }}
              />
              <span className="relative z-10 text-[15px] md:text-[16px] font-black text-black tracking-wider uppercase">
                Quero acessar por R$34
              </span>
            </motion.a>
            <div className="flex items-center justify-center gap-2 mt-4">
              <svg className="w-3.5 h-3.5 text-white/25" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[12px] text-white/30 font-light tracking-wide">
                Pagamento único • Sem mensalidade
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
