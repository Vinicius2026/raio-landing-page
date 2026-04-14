"use client";

import { motion } from "framer-motion";

const testimonials = [
  "Comecei a entender o que tava errando",
  "Ver os outros fazendo muda tudo",
  "Já valeu mais que o valor pago",
];

// Duplicamos várias vezes para garantir que preencha a tela toda
// Usamos um número par de cópias para que a transição de -50% para 0%
// aconteça em um quadro visualmente idêntico, criando um loop infinito perfeito.
const duplicatedTestimonials = [
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
  ...testimonials,
];

export default function SocialProof() {
  return (
    <section className="relative py-14 w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full"
      >
        {/* Sombras laterais para dar o efeito de aparecimento/desaparecimento gradual */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" 
          style={{ background: "linear-gradient(to right, #0B0B0B, transparent)" }} 
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none" 
          style={{ background: "linear-gradient(to left, #0B0B0B, transparent)" }} 
        />

        {/* Track da animação */}
        <motion.div
          className="flex w-max items-center"
          // Animação da esquerda para a direita (começa deslocado para a esquerda e vai para 0)
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            ease: "linear",
            duration: 35, // Velocidade suave e contínua
            repeat: Infinity,
          }}
        >
          {duplicatedTestimonials.map((text, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 p-5 md:px-7 md:py-4 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(245,158,11,0.10)",
                backdropFilter: "blur(12px)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
              }}
            >
              <p className="text-[14px] md:text-[15px] text-amber-200/70 italic font-light whitespace-nowrap">
                &ldquo;{text}&rdquo;
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

