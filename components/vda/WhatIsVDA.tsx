"use client";

import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

/**
 * WhatIsVDA — Seção "O que é a VDA" para /acelerarvendas
 * Adaptada do conteúdo da página /aulas-meteorico (bloco "O Método")
 */
export default function WhatIsVDA() {
  return (
    <section
      id="what-is-vda"
      className="relative px-5 py-20 overflow-hidden"
      aria-label="O que é a VDA"
    >
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center"
        >
          {/* Card principal */}
          <motion.div
            variants={fadeUp}
            className="relative p-8 md:p-10 rounded-3xl overflow-hidden text-center w-full max-w-lg"
            style={{
              background:
                "linear-gradient(135deg, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 100%)",
              border: "1px solid rgba(245,158,11,0.14)",
            }}
          >
            {/* Corner accent */}
            <div
              className="absolute top-0 right-0 w-24 h-24 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle at top right, rgba(245,158,11,0.12), transparent 70%)",
              }}
            />

            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/50 mb-4 block">
              O Método
            </span>
            <h2 className="text-[22px] md:text-[26px] font-extrabold text-white tracking-tight mb-5">
              O que é a{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)",
                }}
              >
                VDA
              </span>
              ?
            </h2>

            <p className="text-[14px] md:text-[15px] text-white/55 leading-[1.75] font-light mb-6">
              A VDA é um método focado em estruturar vendas diretas utilizando o
              WhatsApp como principal canal, com aplicação totalmente prática no
              mercado digital. Tudo que ensinamos é o que aplicamos no dia a dia.
            </p>

            {/* Mini features */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { num: "6", label: "Módulos" },
                { num: "20+", label: "Videoaulas" },
                { num: "100%", label: "Prático" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-3 rounded-xl"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span
                    className="text-[18px] font-black bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #F59E0B, #FBBF24)",
                    }}
                  >
                    {item.num}
                  </span>
                  <span className="text-[10px] text-white/40 font-medium uppercase tracking-wider mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Conteúdo do acesso — adaptado do AulasMeteoricoPage "O que você vai ver" */}
          <motion.div
            variants={fadeUp}
            className="w-full max-w-lg mt-8 space-y-3"
          >
            {[
              {
                title: "Estrutura completa de vendas via WhatsApp",
                num: "01",
              },
              {
                title:
                  "Estratégias de tráfego organic e pago funcionando agora",
                num: "02",
              },
              {
                title: "Bastidores e aplicação prática no dia a dia",
                num: "03",
              },
              {
                title: "Materiais prontos: áudios, vídeos, textos e imagens",
                num: "04",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                className="flex items-center gap-4 p-4 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.18)",
                  }}
                >
                  <span
                    className="text-[11px] font-black bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #F59E0B, #FBBF24)",
                    }}
                  >
                    {item.num}
                  </span>
                </div>
                <span className="text-[13.5px] text-white/70 font-light leading-snug flex-1">
                  {item.title}
                </span>
                <svg
                  className="w-4 h-4 flex-shrink-0 text-amber-400/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
