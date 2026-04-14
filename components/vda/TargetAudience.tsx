"use client";

import { motion, Variants } from "framer-motion";
import { Check, X } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 20 } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const forYou = [
  "Quer fazer a primeira venda com mais clareza",
  "Já tentou e se sente perdido",
  "Quer parar de testar no escuro",
  "Prefere aprender vendo o que funciona",
];

const notNeeded = ["Experiência", "Aparecer", "Investir alto"];

export default function TargetAudience() {
  return (
    <section className="relative px-5 py-20 max-w-3xl mx-auto overflow-hidden">

      {/* Ambient glow */}
      <div
        className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(34,197,94,0.04) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col gap-14"
      >
        {/* For you */}
        <motion.div variants={fadeUp}>
          <h3 className="text-[22px] md:text-[28px] font-extrabold text-white tracking-tight mb-8">
            Isso é pra você se:
          </h3>
          <div className="space-y-3.5">
            {forYou.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center mt-0.5"
                  style={{
                    background: "rgba(34,197,94,0.1)",
                    border: "1px solid rgba(34,197,94,0.2)",
                    boxShadow: "0 0 10px rgba(34,197,94,0.08)",
                  }}
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[14px] text-white/70 font-light leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Not needed */}
        <motion.div variants={fadeUp}>
          <h3 className="text-[18px] font-bold text-white mb-6">
            Você <span className="text-white/30">não</span> precisa de nada disso:
          </h3>
          <div className="flex flex-wrap gap-3">
            {notNeeded.map((item, i) => (
              <div
                key={i}
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <X className="w-3.5 h-3.5 text-white/25" />
                <span className="text-[13px] text-white/40 font-light">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-white/30 mt-6 font-light">
            Você só precisa entrar e observar.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
