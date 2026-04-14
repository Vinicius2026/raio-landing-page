"use client";

import { motion, Variants } from "framer-motion";
import { Activity, Users, Target } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 20 } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const features = [
  {
    icon: Activity,
    title: "Testes reais",
    description: "O que estão rodando agora, na prática",
    glow: "rgba(245,158,11,0.08)",
  },
  {
    icon: Users,
    title: "Troca constante",
    description: "Dúvidas, ideias e ajustes todos os dias",
    glow: "rgba(14,165,233,0.06)",
  },
  {
    icon: Target,
    title: "Sem teoria",
    description: "Veja antes de tentar sozinho",
    glow: "rgba(34,197,94,0.06)",
  },
];

export default function Features() {
  return (
    <section className="relative px-5 py-20 max-w-5xl mx-auto overflow-hidden">

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/50 mb-4 block">
            O que você encontra lá
          </span>
          <h2 className="text-[24px] md:text-[36px] font-extrabold text-white tracking-tight leading-tight">
            Você não entra em um grupo.
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, #F59E0B, #FBBF24)" }}>
              Você entra em um ambiente ativo.
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 w-full">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl text-center cursor-default"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,158,11,0.15)";
                (e.currentTarget as HTMLElement).style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.06), 0 0 40px ${feature.glow}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)";
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.glow}, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{
                    background: "rgba(245,158,11,0.08)",
                    border: "1px solid rgba(245,158,11,0.15)",
                  }}
                >
                  <feature.icon className="w-6 h-6 text-amber-400/80" />
                </div>
                <h3 className="text-[16px] font-bold text-white mb-2.5">{feature.title}</h3>
                <p className="text-[13.5px] text-white/45 font-light leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
