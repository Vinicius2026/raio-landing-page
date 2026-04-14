"use client";

import { motion } from "framer-motion";
import { Video } from "lucide-react";

export default function CallsSection() {
  return (
    <section className="relative px-5 py-16 max-w-3xl mx-auto overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-8 md:p-10 rounded-3xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(245,158,11,0.12)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 60px rgba(245,158,11,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute -top-16 -left-16 w-32 h-32 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute -bottom-16 -right-16 w-32 h-32 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle, rgba(14,165,233,0.06), transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
          {/* Icon */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))",
              border: "1px solid rgba(245,158,11,0.18)",
              boxShadow: "0 0 20px rgba(245,158,11,0.08)",
            }}
          >
            <Video className="w-7 h-7 text-amber-400/80" />
          </div>

          {/* Content */}
          <div className="text-center md:text-left">
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase text-amber-400/50 mb-2 block">
              Calls ao vivo
            </span>
            <h3 className="text-[18px] md:text-[22px] font-extrabold text-white tracking-tight mb-3">
              Participe de análises ao vivo com o time VDA
            </h3>
            <p className="text-[13.5px] text-white/45 font-light leading-relaxed max-w-lg">
              Análises de ofertas, estratégias de anúncios e dúvidas respondidas em encontros agendados.
              Você pode ver o que funciona e entender o porquê.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
