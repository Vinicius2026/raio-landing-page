"use client";

import { motion } from "framer-motion";

const messages = [
  { text: "Mano, subi campanha ontem", time: "13:42", side: "left" as const },
  { text: "Já pingou 2 vendas hoje 🔥", time: "13:42", side: "left" as const },
  { text: "Sério? O que mudou?", time: "13:43", side: "right" as const },
  { text: "Ajustei o criativo e a headline", time: "13:45", side: "left" as const },
  { text: "Na call de hoje mostrou tudo 🎤", time: "13:46", side: "left" as const },
];

export default function ChatSimulation() {
  return (
    <section className="relative px-5 py-20 overflow-hidden">

      {/* Section glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-md mx-auto relative z-10">

        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/50 mb-3 block">
            Ambiente ativo
          </span>
          <h2 className="text-[22px] md:text-[28px] font-extrabold text-white tracking-tight">
            Olha o que está acontecendo{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #F59E0B, #FBBF24)" }}>
              lá dentro agora
            </span>
          </h2>
        </motion.div>

        {/* Chat container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.025)",
            border: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            boxShadow: "0 32px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.05), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-5 py-4"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            <div className="relative">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-[14px]"
                style={{
                  background: "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.08))",
                  border: "1px solid rgba(245,158,11,0.15)",
                }}
              >
                👤
              </div>
              <span
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2"
                style={{
                  borderColor: "rgba(17,17,17,0.9)",
                  boxShadow: "0 0 6px rgba(34,197,94,0.5)",
                  animation: "pulseGlow 2s ease-in-out infinite",
                }}
              />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-white/90 flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                  style={{ boxShadow: "0 0 4px rgba(34,197,94,0.5)" }}
                />
                Grupo Bastidores VDA
              </p>
              <p className="text-[11px] text-emerald-400/60 font-light">online agora</p>
            </div>
          </div>

          {/* Messages */}
          <div className="px-4 py-5 space-y-2.5 min-h-[300px]">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[78%] px-4 py-3 text-[14px] leading-relaxed ${
                    msg.side === "right"
                      ? "rounded-2xl rounded-tr-md"
                      : "rounded-2xl rounded-tl-md"
                  }`}
                  style={{
                    background: msg.side === "right"
                      ? "linear-gradient(135deg, #005C4B, #007a60)"
                      : "rgba(255,255,255,0.04)",
                    border: msg.side === "right" ? "none" : "1px solid rgba(255,255,255,0.04)",
                    color: "rgba(255,255,255,0.9)",
                  }}
                >
                  <span>{msg.text}</span>
                  <span className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-[10px] text-white/35">{msg.time}</span>
                    {msg.side === "right" && (
                      <span className="text-[10px] text-sky-400/70">✓✓</span>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom avatars */}
          <div
            className="flex items-center justify-center gap-3 px-5 py-4"
            style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div className="flex -space-x-2">
              {["#F59E0B", "#8B5CF6", "#10B981", "#EC4899", "#3B82F6"].map((c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2"
                  style={{
                    borderColor: "rgba(10,10,10,0.9)",
                    background: `linear-gradient(135deg, ${c}, ${c}77)`,
                    boxShadow: `0 0 6px ${c}22`,
                  }}
                />
              ))}
            </div>
            <span className="text-[11px] text-white/30 font-light">+142 participantes</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
