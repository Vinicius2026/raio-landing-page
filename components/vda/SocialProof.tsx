"use client";

import { motion } from "framer-motion";

const testimonials = [
  "Comecei a entender o que tava errando",
  "Ver os outros fazendo muda tudo",
  "Já valeu mais que o valor pago",
];

export default function SocialProof() {
  return (
    <section className="relative px-5 py-14 max-w-3xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative p-7 md:p-8 rounded-2xl overflow-hidden"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(245,158,11,0.10)",
          backdropFilter: "blur(12px)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Inner glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[80px] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse, rgba(245,158,11,0.06), transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-10">
          {testimonials.map((text, i) => (
            <div key={i} className="flex items-center gap-2">
              {i > 0 && (
                <span className="hidden md:block text-white/10 text-[18px]">•</span>
              )}
              <p className="text-[13.5px] text-amber-200/60 italic font-light text-center md:text-left">
                &ldquo;{text}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
