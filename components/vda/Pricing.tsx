"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { trackEvent } from "@/lib/meta-pixel";

const CHECKOUT_HREF = "#";

function handleCta() {
  trackEvent("InitiateCheckout", {
    content_name: "Bastidores VDA - Pricing",
    value: 34,
    currency: "BRL",
  });
}

const bonuses = [
  "Acesso às calls ao vivo",
  "Grupo ativo com membros reais",
  "Ambiente real de vendas",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative px-5 py-24 overflow-hidden">

      {/* Background glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 60%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(14,165,233,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl p-9 md:p-12 text-center overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(245,158,11,0.16)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 100px rgba(245,158,11,0.06), 0 40px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Corner glows */}
          <div
            className="absolute -top-20 -right-20 w-40 h-40 pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(245,158,11,0.15), transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="absolute -bottom-20 -left-20 w-40 h-40 pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(14,165,233,0.06), transparent 70%)",
              filter: "blur(40px)",
            }}
          />

          {/* Shield icon */}
          <div className="relative z-10">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{
                background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))",
                border: "1px solid rgba(245,158,11,0.2)",
                boxShadow: "0 0 30px rgba(245,158,11,0.1)",
              }}
            >
              <svg className="w-7 h-7 text-amber-400/80" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>

            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/50 mb-2 block">
              Acesso aos Bastidores
            </span>
            <h3 className="text-[20px] font-extrabold text-white mb-5">BASTIDORES VDA</h3>

            {/* Price */}
            <div className="mb-8">
              <span className="text-[18px] text-white/30 font-light">R$</span>
              <span
                className="text-[60px] md:text-[72px] font-black leading-none bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #F59E0B, #FBBF24, #F59E0B)" }}
              >
                34
              </span>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8 text-left max-w-[260px] mx-auto">
              {["Pagamento único", "Sem mensalidade"].map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(34,197,94,0.1)",
                      border: "1px solid rgba(34,197,94,0.2)",
                      boxShadow: "0 0 8px rgba(34,197,94,0.08)",
                    }}
                  >
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-[13.5px] text-white/70 font-light">{b}</span>
                </div>
              ))}
            </div>

            {/* Bonus list */}
            <div
              className="rounded-2xl p-5 mb-8 space-y-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              {bonuses.map((b, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-amber-400/60 text-[13px] font-bold">+</span>
                  <span className="text-[12.5px] text-white/40 font-light">{b}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <motion.a
              href={CHECKOUT_HREF}
              onClick={handleCta}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden py-[22px] px-8 mb-5"
              style={{
                background: "linear-gradient(135deg, #b8941a 0%, #f0d060 35%, #ecc840 65%, #b8941a 100%)",
                boxShadow: "0 0 40px rgba(245,158,11,0.25), 0 0 80px rgba(245,158,11,0.08), 0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)",
                  animation: "shimmerSweep 2s ease-in-out infinite",
                }}
              />
              <span className="relative z-10 text-[15px] font-black text-black tracking-wider uppercase">
                Quero entrar agora
              </span>
            </motion.a>

            <p className="text-[12px] text-white/25 font-light">
              🍕 Menos que uma pizza
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
