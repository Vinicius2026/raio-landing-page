"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

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
 * AboutFounder — Seção "Quem criou a VDA" para /acelerarvendas
 * Adaptada do conteúdo da página /aulas-meteorico
 */
export default function AboutFounder() {
  return (
    <section
      id="about-founder"
      className="relative px-5 py-20 overflow-hidden"
      aria-label="Sobre o Fundador"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse, rgba(245,158,11,0.06) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col items-center"
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="text-center mb-8">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-amber-400/50 mb-3 block">
              Sobre o Fundador
            </span>
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white tracking-tight">
              Quem é o{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #F59E0B, #FBBF24, #F59E0B)",
                }}
              >
                Thiago Lima
              </span>
            </h2>
          </motion.div>

          {/* Photo */}
          <motion.div variants={fadeUp} className="relative mb-8">
            <div
              className="absolute -inset-6 rounded-3xl pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
                filter: "blur(24px)",
              }}
            />
            <div
              className="relative w-[240px] h-[320px] md:w-[280px] md:h-[380px] rounded-3xl overflow-hidden"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(245,158,11,0.14), 0 32px 80px rgba(0,0,0,0.8)",
              }}
            >
              <Image
                src="/images/thiago-vda.webp"
                alt="Thiago Lima — Fundador VDA"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 240px, 280px"
                loading="lazy"
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(to top, rgba(11,11,11,0.8), transparent)",
                }}
              />
            </div>
          </motion.div>

          {/* Credential bullets */}
          <motion.div
            variants={fadeUp}
            className="w-full max-w-md space-y-2.5 mb-8"
          >
            {[
              "Atua ativamente com vendas digitais via WhatsApp",
              "Vasta experiência como estrategista de vendas diretas",
              "Criador do método VDA e desenvolvedor de times comerciais",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3.5 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                  style={{
                    background: "linear-gradient(135deg, #F59E0B, #FBBF24)",
                  }}
                />
                <span className="text-[13px] text-white/60 font-light leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div variants={fadeUp} className="w-full max-w-md text-center">
            <p className="text-[12.5px] text-white/35 font-light leading-relaxed italic">
              &quot;Ensinar o que funciona na prática — sem enrolação, sem
              teoria vazia. É isso que a VDA entrega.&quot;
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
