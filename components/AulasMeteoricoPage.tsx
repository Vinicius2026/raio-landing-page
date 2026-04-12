"use client";

import { memo, useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/lib/meta-pixel";

// ─── Helpers ─────────────────────────────────────────────────────────────────
/**
 * Dispara Lead event para o Meta Pixel + Conversions API.
 * O parâmetro content_name diferencia os pontos de clique
 * para análise de funil no Gerenciador de Eventos da Meta.
 */
function handleCtaClick(label: string) {
  trackEvent("Lead", { content_name: label });
}

const CTA_HREF =
  "https://chat.whatsapp.com/HasGl6O2FvcCOJp3RxG8Pm?mode=gi_t";

// ─── Animation variants ───────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 22 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 65, damping: 18, delay: 0.05 },
  },
};

// ─── CtaButton — botão reutilizável com pixel event garantido ────────────────
interface CtaButtonProps {
  href: string;
  label: string;
  size: "lg" | "md";
  text: string;
}

function CtaButton({ href, label, size, text }: CtaButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onClick={() => handleCtaClick(label)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.018, y: -2 }}
      whileTap={{ scale: 0.975 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex items-center justify-center w-full rounded-2xl text-black font-black tracking-wide cursor-pointer overflow-hidden select-none"
      style={{
        padding: size === "lg" ? "20px 36px" : "16px 28px",
        fontSize: size === "lg" ? "16px" : "14.5px",
        letterSpacing: "0.04em",
        background:
          "linear-gradient(135deg, #c8a020 0%, #f0d060 40%, #e8c840 70%, #c8a020 100%)",
        boxShadow: hovered
          ? "0 0 0 1px rgba(240,208,80,0.5), 0 12px 48px rgba(212,175,55,0.55), 0 2px 8px rgba(0,0,0,0.4)"
          : "0 0 0 1px rgba(212,175,55,0.22), 0 6px 28px rgba(212,175,55,0.28), 0 2px 8px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.4s ease",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      {/* Shimmer sweep */}
      <motion.span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        animate={{ x: hovered ? "100%" : "-100%" }}
        transition={{ duration: 0.65, ease: "easeInOut" }}
        style={{
          background:
            "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.32) 50%, transparent 80%)",
        }}
      />
      {/* Dot indicator */}
      <span
        className="relative z-10 flex items-center gap-2.5"
        style={{ textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
      >
        <span
          className="flex-shrink-0 w-2 h-2 rounded-full bg-black/40"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(0,0,0,0.3)",
            animation: "pulseDot 2s ease-in-out infinite",
          }}
        />
        {text}
      </span>
    </motion.a>
  );
}

// ─── Particle dots background ─────────────────────────────────────────────────
function ParticleDots() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {Array.from({ length: 28 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 4 === 0 ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)",
            animation: `floatDot ${6 + Math.random() * 8}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Section divider ─────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="flex items-center gap-3 py-2" aria-hidden="true">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.15), transparent)" }} />
      <div className="w-1 h-1 rounded-full bg-[#D4AF37]/30" />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.15), transparent)" }} />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function AulasMeteoricoPage() {
  const [showSticky, setShowSticky] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => setShowSticky(window.scrollY > 420);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main
      className="min-h-screen relative"
      style={{ background: "#080808", fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Google Fonts inline */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Playfair+Display:wght@700;900&display=swap');

        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.10); opacity: 0.65; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.06); }
        }
        @keyframes lineFlow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(220%); }
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          33% { transform: translateY(-12px) translateX(6px); opacity: 0.8; }
          66% { transform: translateY(8px) translateX(-4px); opacity: 0.5; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        * { box-sizing: border-box; }

        .gold-text {
          background: linear-gradient(90deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .card-glass {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .card-glass:hover {
          background: rgba(255,255,255,0.038);
          border-color: rgba(212,175,55,0.14);
          transition: all 0.3s ease;
        }

        .sticky-bar {
          background: rgba(8,8,8,0.94);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255,255,255,0.06);
        }
      `}} />

      {/* ══════════════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Entrar VDA Gratuito"
        className="relative min-h-screen flex items-center justify-center px-5 py-20 overflow-hidden"
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-[30%] -left-[20%] w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.065) 0%, transparent 68%)",
              animation: "breathe 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-[25%] -right-[15%] w-[500px] h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.028) 0%, transparent 68%)",
              animation: "breathe 11s ease-in-out infinite",
              animationDelay: "5s",
            }}
          />
          {/* Bottom vignette */}
          <div
            className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(8,8,8,0.6), transparent)" }}
          />
        </div>

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            opacity: 0.025,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: "180px 180px",
          }}
        />

        {/* Vertical lines */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ opacity: 0.018 }}
        >
          {[15, 35, 55, 75, 92].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-full"
              style={{
                left: `${left}%`,
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9), transparent)",
                animation: `lineFlow ${12 + i * 2}s linear infinite`,
                animationDelay: `${i * 2.2}s`,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        <ParticleDots />

        {/* Content */}
        <div className="relative z-10 w-full max-w-[390px] mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >
            {/* Minimal Label */}
            <motion.div variants={fadeUp} className="mb-12 -mt-2 md:mt-4">
              <p className="text-[10px] font-medium tracking-[0.25em] text-white/90 uppercase">
                Aula Gratuita Liberada
              </p>
            </motion.div>

            {/* Logo */}
            <motion.div variants={scaleIn} className="mb-8 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="relative"
              >
                {/* Glow halo */}
                <div
                  className="absolute inset-0 -m-12 rounded-full pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.09) 0%, transparent 65%)",
                    filter: "blur(32px)",
                    animation: "pulseGlow 5s ease-in-out infinite",
                  }}
                />
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[9px] font-bold tracking-[0.5em] text-white/22 uppercase">Aurenos</span>
                </div>
                <Image
                  src="/images/vda-logo.png"
                  alt="VDA – Venda Direta Automática"
                  width={720}
                  height={240}
                  className="relative w-[255px] md:w-[310px] h-auto select-none"
                  style={{
                    filter: "drop-shadow(0 0 36px rgba(255,255,255,0.12)) drop-shadow(0 0 64px rgba(212,175,55,0.08))",
                  }}
                  priority
                  quality={100}
                  fetchPriority="high"
                />
              </motion.div>

              {/* Divisor ornamental */}
              <motion.div variants={fadeUp} className="mt-7 flex items-center gap-3">
                <div className="w-8 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,175,55,0.25))" }} />
                <div className="w-1 h-1 rounded-full" style={{ background: "rgba(212,175,55,0.35)" }} />
                <span className="text-[9.5px] font-semibold tracking-[0.48em] uppercase text-white/22">
                  Venda Direta Automática
                </span>
                <div className="w-1 h-1 rounded-full" style={{ background: "rgba(212,175,55,0.35)" }} />
                <div className="w-8 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(212,175,55,0.25))" }} />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} className="w-full text-center mb-6 px-1">
              <h1
                className="text-[27px] md:text-[33px] font-black tracking-tight text-white leading-[1.18]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Como estruturar{" "}
                <span className="gold-text">
                  vendas pelo WhatsApp
                </span>
                <br />de forma simples e escalável
              </h1>
              <p className="text-[14px] md:text-[15px] text-white/58 mt-5 leading-[1.72] max-w-[88%] mx-auto font-light">
                Entre no grupo gratuito e acompanhe, na prática, como funcionam estratégias usadas no dia a dia para gerar vendas online.
              </p>
            </motion.div>

            {/* Social proof micro */}
            <motion.div variants={fadeUp} className="mb-7">
              <div
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.055)",
                }}
              >
                <div className="flex -space-x-1.5">
                  {["#8B5CF6", "#F59E0B", "#10B981"].map((c, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full border border-[#080808]"
                      style={{ background: `linear-gradient(135deg, ${c}, ${c}88)` }}
                    />
                  ))}
                </div>
                <span className="text-[11.5px] text-white/40 font-light">
                  Método aplicado diariamente no mercado digital
                </span>
              </div>
            </motion.div>

            {/* CTA primário */}
            <motion.div variants={fadeUp} className="w-full mb-4">
              <CtaButton
                href={CTA_HREF}
                label="VDA Gratuito Meteórico - Hero"
                size="lg"
                text="Entrar no grupo gratuito"
              />
            </motion.div>

            {/* Trust micro-copy */}
            <motion.div variants={fadeUp} className="flex items-center gap-5 justify-center">
              {[
                { icon: "✦", text: "Sem custo" },
                { icon: "⚡", text: "Acesso imediato" },
                { icon: "✉", text: "Direto no WhatsApp" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37]/50 text-[9px]">{item.icon}</span>
                  <span className="text-[11px] text-white/32 font-light tracking-wide">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          O QUE VOCÊ VAI VER
          ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="O que acontece no grupo"
        className="relative pt-4 pb-16 px-5 overflow-hidden"
      >
        <Divider />
        <div className="max-w-[390px] mx-auto relative z-10 pt-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-center"
          >
            <motion.div variants={fadeUp} className="text-center mb-8">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]/50 mb-3 block">
                Conteúdo do Grupo
              </span>
              <h2
                className="text-[21px] md:text-[25px] font-black tracking-tight text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                O que você vai ver{" "}
                <span className="gold-text">dentro do grupo:</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full space-y-3">
              {[
                { title: "Estrutura simples de vendas via WhatsApp", num: "01" },
                { title: "Estratégias de tráfego que estão funcionando atualmente", num: "02" },
                { title: "Bastidores e aplicação prática no dia a dia", num: "03" },
                { title: "Atualizações e conteúdos durante o período do evento", num: "04" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="card-glass flex items-center gap-4 p-4 rounded-2xl"
                  style={{ transition: "all 0.25s ease" }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(212,175,55,0.08)",
                      border: "1px solid rgba(212,175,55,0.18)",
                    }}
                  >
                    <span
                      className="text-[11px] font-black"
                      style={{
                        background: "linear-gradient(135deg, #D4AF37, #f0d060)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {item.num}
                    </span>
                  </div>
                  <span className="text-[13.5px] text-white/75 font-light leading-snug flex-1">
                    {item.title}
                  </span>
                  <svg
                    className="w-4 h-4 flex-shrink-0 text-[#D4AF37]/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ + VDA
          ══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-14 px-5 overflow-hidden">
        <Divider />
        <div className="max-w-[390px] mx-auto flex flex-col gap-12 pt-10">

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div className="text-center mb-7">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]/50 mb-3 block">
                Dúvidas Comuns
              </span>
              <h3
                className="text-[18px] font-black text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Tirando as dúvidas comuns
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  q: "Preciso ter experiência?",
                  a: "Qualquer um que se desempenhar pode participar e ter resultado. O conteúdo é prático e vai direto ao ponto.",
                },
                {
                  q: "É pago?",
                  a: "Não, o acesso ao grupo é inteiramente gratuito.",
                },
                {
                  q: "Vou precisar comprar algo?",
                  a: "Não é necessário para acompanhar o conteúdo e entender o mecanismo de vendas.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-glass p-5 rounded-2xl"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center mt-0.5"
                      style={{
                        background: "rgba(212,175,55,0.1)",
                        border: "1px solid rgba(212,175,55,0.2)",
                      }}
                    >
                      <span className="text-[10px] font-black text-[#D4AF37]">?</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-white/90 mb-1.5">{item.q}</p>
                      <p className="text-[12.5px] text-white/52 font-light leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* O que é VDA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
          >
            <div
              className="relative p-7 rounded-3xl overflow-hidden text-center"
              style={{
                background: "linear-gradient(135deg, rgba(212,175,55,0.06) 0%, rgba(212,175,55,0.02) 100%)",
                border: "1px solid rgba(212,175,55,0.14)",
              }}
            >
              {/* Corner accent */}
              <div
                className="absolute top-0 right-0 w-20 h-20 pointer-events-none"
                aria-hidden="true"
                style={{
                  background: "radial-gradient(circle at top right, rgba(212,175,55,0.12), transparent 70%)",
                }}
              />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]/50 mb-4 block">
                O Método
              </span>
              <h3
                className="text-[20px] font-black text-white tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                O que é a{" "}
                <span className="gold-text">VDA</span>?
              </h3>
              <p className="text-[13.5px] text-white/60 leading-[1.7] font-light">
                A VDA é um método focado em estruturar vendas diretas utilizando o WhatsApp como principal canal, com aplicação totalmente prática no nosso mercado digital.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT — Thiago
          ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Sobre o Fundador Thiago Lima"
        className="relative pt-4 pb-32 px-5 overflow-hidden"
      >
        <Divider />
        <div className="max-w-[390px] mx-auto relative z-10 pt-12 flex flex-col items-center">

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col items-center w-full"
          >
            <motion.div variants={fadeUp} className="text-center mb-8">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]/50 mb-3 block">
                Sobre o Fundador
              </span>
              <h2
                className="text-[21px] font-black text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Thiago Lima
              </h2>
            </motion.div>

            {/* Foto com halo dourado */}
            <motion.div variants={fadeUp} className="relative mb-8">
              {/* Halo */}
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                aria-hidden="true"
                style={{
                  background: "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 72%)",
                  filter: "blur(22px)",
                  animation: "pulseGlow 5.5s ease-in-out infinite",
                }}
              />
              {/* Frame ornamental */}
              <div
                className="relative w-[200px] h-[272px] md:w-[224px] md:h-[304px] rounded-3xl overflow-hidden"
                style={{
                  boxShadow: "0 0 0 1px rgba(212,175,55,0.16), 0 28px 72px rgba(0,0,0,0.8)",
                }}
              >
                <Image
                  src="/images/thiago-vda.webp"
                  alt="Thiago Lima"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 200px, 224px"
                  loading="lazy"
                />
                {/* Gradient overlay bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  aria-hidden="true"
                  style={{ background: "linear-gradient(to top, rgba(8,8,8,0.78), transparent)" }}
                />
              </div>
            </motion.div>

            {/* Bullet list */}
            <motion.div variants={fadeUp} className="w-full space-y-2.5 mb-10 px-1">
              {[
                "Atua ativamente com vendas digitais via WhatsApp",
                "Vasta experiência como estrategista",
                "Criador do método VDA e desenvolvedor de times",
              ].map((item, i) => (
                <div
                  key={i}
                  className="card-glass flex items-start gap-3 px-4 py-3.5 rounded-xl"
                >
                  <div
                    className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5"
                    style={{ background: "linear-gradient(135deg, #D4AF37, #f0d060)" }}
                  />
                  <span className="text-[13px] text-white/65 font-light leading-snug">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Disclaimer Final Info */}
            <motion.div variants={fadeUp} className="w-full text-center">
              <p className="text-[12px] text-white/35 mb-2 leading-relaxed font-light px-3">
                As vagas para o grupo são liberadas por período. <br />Deslize para acompanhar e entrar.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════════ */}
      <footer
        className="relative pt-10 pb-32 md:pb-10 px-5 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.045)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.22), transparent)" }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
            className="text-center space-y-3"
          >
            <div className="space-y-1">
              <p className="text-[11.5px] text-white/22">
                © {year} VDA – Venda Direta Automática.
              </p>
              <p className="text-[11px] text-white/14">
                Todos os direitos reservados.{" "}
                <a
                  href="mailto:contato@aurenos.com.br"
                  className="text-white/20 hover:text-white/38 transition-colors"
                >
                  contato@aurenos.com.br
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/politica-de-privacidade"
                className="text-[11px] text-blue-500/55 hover:text-blue-400/80 transition-colors underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
            </div>

            <p className="text-[10px] text-white/30 max-w-2xl mx-auto leading-relaxed">
              Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem
              possui qualquer endosso dessas plataformas. Todo o conteúdo deste site é de
              responsabilidade exclusiva dos representantes do aurenos.com.br.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════════════════
          STICKY BOTTOM CTA (MOBILE ONLY)
          ══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 95, damping: 22 }}
            className="fixed bottom-0 left-0 right-0 z-50 px-4 pt-4 pb-5 md:hidden sticky-bar"
          >
            <div className="max-w-[390px] mx-auto w-full">
              <CtaButton
                href={CTA_HREF}
                label="VDA Gratuito Meteórico - Sticky"
                size="md"
                text="Quero entrar no grupo"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default memo(AulasMeteoricoPage);