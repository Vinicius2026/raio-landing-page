"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Zap } from "lucide-react";
import { trackEvent } from "@/lib/meta-pixel";

// ─── Animation presets ───────────────────────────────────────────────────────
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 20 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.05 },
  },
};

// ─── Main Page Component ─────────────────────────────────────────────────────
function AulasMeteoricoPage() {
  const [isVdaOpen, setIsVdaOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black relative">

      {/* ════════════════════════════════════════════════════════════════════
          HERO — Logo + CTA
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">

        {/* Ambient background — dois focos de luz suaves, sem bordar visíveis */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
              animation: "breathe 7s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
              animation: "breathe 9s ease-in-out infinite",
              animationDelay: "4s",
            }}
          />
        </div>

        {/* Grain sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.025,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: "180px 180px",
          }}
        />

        {/* Linhas de fluxo — opacidade muito baixa */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.025 }}>
          {[20, 40, 60, 80].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-full"
              style={{
                left: `${left}%`,
                background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)",
                animation: `lineFlow ${10 + i * 2.5}s linear infinite`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-sm mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center"
          >

            {/* ── Logo — sem borda, sem anel, float suave ── */}
            <motion.div variants={scaleIn} className="mb-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="relative"
              >
                {/* Halo dourado difuso atrás do logo — sem borda visível */}
                <div
                  className="absolute inset-0 -m-10 rounded-full pointer-events-none"
                  style={{
                    background: "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 65%)",
                    filter: "blur(24px)",
                    animation: "pulseGlow 4s ease-in-out infinite",
                  }}
                />

                <Image
                  src="/images/vda-logo.png"
                  alt="VDA – Venda Direta Automática"
                  width={720}
                  height={240}
                  className="relative w-[260px] md:w-[320px] h-auto select-none"
                  style={{ filter: "drop-shadow(0 0 40px rgba(255,255,255,0.18))" }}
                  priority
                  quality={100}
                />
              </motion.div>

              {/* Separador minimalista abaixo do logo */}
              <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
                <div className="w-12 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.15))" }} />
                <span className="text-[10px] font-semibold tracking-[0.45em] uppercase text-white/25">
                  Venda Direta Automática
                </span>
                <div className="w-12 h-px" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.15))" }} />
              </motion.div>
            </motion.div>

            {/* ── Headline ── */}
            <motion.div variants={fadeUp} className="w-full text-center mb-5">
              <h1 className="text-[26px] md:text-[32px] font-black tracking-tight text-white leading-tight">
                Entrar{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)" }}
                >
                  VDA Gratuito
                </span>
              </h1>
              <p className="text-[13px] text-white/35 mt-2.5 tracking-wide font-normal">
                Acesse agora as aulas gratuitas do método Meteórico
              </p>
            </motion.div>

            {/* ── Badge de urgência ── */}
            <motion.div variants={fadeUp} className="mb-5">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <span className="text-[11px] font-semibold text-[#D4AF37]/80 tracking-[0.15em] uppercase">
                  Vagas abertas agora
                </span>
              </div>
            </motion.div>

            {/* ── PRIMARY CTA ── */}
            <motion.div variants={fadeUp} className="w-full mb-8">
              <motion.a
                href="https://chat.whatsapp.com/HasGl6O2FvcCOJp3RxG8Pm?mode=gi_t"
                onClick={() => trackEvent("Lead", { content_name: "VDA Gratuito Meteórico" })}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.975 }}
                className="group relative flex items-center justify-center gap-3 w-full px-8 py-[18px] rounded-2xl text-black font-black text-[17px] tracking-wide overflow-hidden cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #c9a227 0%, #f0d060 45%, #c9a227 100%)",
                  boxShadow: "0 6px 40px rgba(212,175,55,0.30), 0 1px 0 rgba(255,255,255,0.15) inset",
                  transition: "box-shadow 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 10px 60px rgba(212,175,55,0.50), 0 1px 0 rgba(255,255,255,0.2) inset";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 40px rgba(212,175,55,0.30), 0 1px 0 rgba(255,255,255,0.15) inset";
                }}
              >
                {/* Shimmer sweep — só no hover, sem piscar idle */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                    transform: "translateX(-100%)",
                    transition: "transform 0.8s ease, opacity 0.2s",
                  }}
                  onTransitionEnd={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    if (el.style.transform === "translateX(100%)") {
                      el.style.transform = "translateX(-100%)";
                    }
                  }}
                  ref={(el) => {
                    if (!el) return;
                    const parent = el.parentElement;
                    if (!parent) return;
                    parent.addEventListener("mouseenter", () => {
                      el.style.transform = "translateX(100%)";
                    });
                    parent.addEventListener("mouseleave", () => {
                      el.style.transform = "translateX(-100%)";
                    });
                  }}
                />

                <Zap className="relative z-10 w-5 h-5 fill-current shrink-0" />
                <span className="relative z-10">Entrar na Turma</span>
                <svg
                  className="relative z-10 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.a>

              {/* Micro-copy de confiança */}
              <p className="text-center text-[11px] text-white/20 mt-3 font-normal tracking-wide">
                Gratuito · Sem compromisso · Acesso imediato
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ABOUT — Quem é o Thiago + O que é a VDA
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-4 pb-24 px-4 overflow-hidden">
        {/* Fundo sutil */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-lg mx-auto relative z-10">

          {/* Label da seção */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-8"
          >
            <div className="h-px w-10" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
            <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">
              Sobre o Fundador
            </span>
            <div className="h-px w-10" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
          </motion.div>

          {/* Card principal */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.07)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* Glow interno no topo */}
            <div
              className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-48 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            <div className="relative z-10 px-8 pt-10 pb-8 md:px-10">

              {/* ── Foto do Thiago — tratamento premium ── */}
              <motion.div variants={fadeUp} className="flex flex-col items-center mb-8">
                <div className="relative mb-5">
                  {/* Glow dourado difuso — sem borda visível no retrato */}
                  <div
                    className="absolute -inset-3 rounded-2xl pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
                      filter: "blur(20px)",
                      animation: "pulseGlow 5s ease-in-out infinite",
                    }}
                  />

                  {/* Container da foto — bordas finas e elegantes */}
                  <div
                    className="relative w-52 h-[17rem] md:w-60 md:h-[20rem] rounded-2xl overflow-hidden"
                    style={{
                      boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,175,55,0.18)",
                    }}
                  >
                    <Image
                      src="/images/thiago-vda.webp"
                      alt="Thiago Lima — Fundador VDA"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 208px, 240px"
                      loading="lazy"
                    />
                    {/* Fade na base da foto */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                      style={{ background: "linear-gradient(to top, rgba(0,0,0,0.75), transparent)" }}
                    />
                  </div>
                </div>

                {/* Badge de nome */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full"
                  style={{
                    background: "rgba(212,175,55,0.07)",
                    border: "1px solid rgba(212,175,55,0.15)",
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-[#D4AF37]/60" />
                  <span className="text-[10px] text-[#D4AF37]/60 uppercase tracking-[0.3em] font-semibold">
                    Thiago Lima · Fundador VDA
                  </span>
                </div>
              </motion.div>

              {/* Título */}
              <motion.h2
                variants={fadeUp}
                className="text-[22px] md:text-[28px] font-black text-center text-white tracking-tight leading-tight mb-5"
              >
                Quem é o{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #D4AF37, #f0d060)" }}
                >
                  Thiago da VDA
                </span>
              </motion.h2>

              {/* Bio */}
              <motion.div
                variants={fadeUp}
                className="space-y-3.5 text-[13.5px] text-white/45 leading-relaxed font-light text-center"
              >
                <p>
                  Especialista em vendas digitais pelo WhatsApp, Thiago Lima construiu o método{" "}
                  <strong className="text-white/65 font-medium">VDA – Venda Direta Automática</strong>{" "}
                  a partir de sua própria experiência no campo.
                </p>
                <p>
                  Uma trajetória real, construída no dia a dia e na vivência do digital.
                  Múltiplos 7 dígitos faturados. Especialista em monetização de redes sociais.
                  Hoje sua dedicação está nas ações sociais que realiza e no método VDA,
                  que ensina a vender produtos selecionados diretamente pelo WhatsApp.
                </p>
              </motion.div>

              {/* ── O que é a VDA? — Collapsible ── */}
              <motion.div
                variants={fadeUp}
                className="mt-8 pt-7"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              >
                <button
                  onClick={() => setIsVdaOpen(!isVdaOpen)}
                  className="w-full group flex flex-col items-center justify-center cursor-pointer rounded-xl py-5 px-4 transition-all duration-400"
                  style={{
                    background: isVdaOpen ? "rgba(255,255,255,0.025)" : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.025)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isVdaOpen)
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <h3 className="text-[22px] md:text-[26px] font-black text-white tracking-tight leading-tight mb-3 text-center">
                    O que é a{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{ backgroundImage: "linear-gradient(90deg, #D4AF37, #f0d060)" }}
                    >
                      VDA
                    </span>
                    ?
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium group-hover:text-white/35 transition-colors duration-300">
                      {isVdaOpen ? "Fechar" : "Saiba mais"}
                    </span>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-400"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                        transform: isVdaOpen ? "rotate(180deg)" : "rotate(0deg)",
                        background: isVdaOpen ? "rgba(255,255,255,0.04)" : "transparent",
                      }}
                    >
                      <ChevronDown className="w-3 h-3 text-white/35" />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isVdaOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3.5 text-[13.5px] text-white/45 leading-relaxed font-light text-center pt-4 pb-2">
                        <p>
                          Na <strong className="text-white/65 font-medium">VDA — Venda Direta Automática</strong>,
                          ensinamos como vender diariamente pelo WhatsApp. Temos os produtos
                          selecionados, sabemos atrair clientes interessados e realizamos
                          a venda de forma manual e automática.
                        </p>
                        <p>
                          Essa modalidade é uma das de maior acerto, pois o contato com
                          o cliente é imediato. Estude com uma das maiores companhias
                          de venda direta via WhatsApp no Brasil.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* ── CTA secundário dentro do card — reforço de conversão ── */}
              <motion.div variants={fadeUp} className="mt-8">
                <motion.a
                  href="https://chat.whatsapp.com/HasGl6O2FvcCOJp3RxG8Pm?mode=gi_t"
                  onClick={() => trackEvent("Lead", { content_name: "VDA Gratuito Meteórico - About" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative flex items-center justify-center gap-2.5 w-full px-8 py-4 rounded-xl text-black font-black text-[15px] tracking-wide cursor-pointer overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, #c9a227 0%, #f0d060 45%, #c9a227 100%)",
                    boxShadow: "0 4px 30px rgba(212,175,55,0.25)",
                    transition: "box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 50px rgba(212,175,55,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 30px rgba(212,175,55,0.25)";
                  }}
                >
                  <Zap className="relative z-10 w-4 h-4 fill-current shrink-0" />
                  <span className="relative z-10">Quero entrar agora</span>
                  <svg
                    className="relative z-10 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════════════════ */}
      <footer
        className="relative py-8 px-4 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="text-center space-y-3"
          >
            <div className="space-y-1">
              <p className="text-[13px] text-white/30">
                © {year} VDA – Venda Direta Automática.
              </p>
              <p className="text-[11px] text-white/15">
                Todos os direitos reservados.{" "}
                <a
                  href="mailto:contato@metodovda.com"
                  className="text-white/25 hover:text-white/45 transition-colors"
                >
                  contato@metodovda.com
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs">
              <Link
                href="/politica-de-privacidade"
                className="text-blue-500/70 hover:text-blue-400 transition-colors underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
            </div>

            <p className="text-[10px] text-white/12 max-w-2xl mx-auto leading-relaxed">
              Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem possui qualquer endosso dessas plataformas.
              Todo o conteúdo deste site é de responsabilidade exclusiva dos representantes do metodovda.com.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* ── Keyframes globais injetados via style tag ── */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.7; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes lineFlow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
    </main>
  );
}

export default memo(AulasMeteoricoPage);