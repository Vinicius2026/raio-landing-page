"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Zap } from "lucide-react";
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
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.18 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 88, damping: 20 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 70, damping: 16, delay: 0.05 },
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
  const py = size === "lg" ? "18px" : "14px";
  const fontSize = size === "lg" ? "17px" : "15px";

  return (
    <motion.a
      href={href}
      onClick={() => handleCtaClick(label)}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.022, y: -2 }}
      whileTap={{ scale: 0.978 }}
      className="group relative flex items-center justify-center gap-2.5 w-full rounded-xl text-black font-black tracking-wide cursor-pointer overflow-hidden"
      style={{
        padding: `${py} 32px`,
        fontSize,
        background:
          "linear-gradient(135deg, #c9a227 0%, #f0d060 45%, #c9a227 100%)",
        boxShadow:
          "0 5px 36px rgba(212,175,55,0.28), 0 1px 0 rgba(255,255,255,0.14) inset",
        transition: "box-shadow 0.35s ease",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 10px 56px rgba(212,175,55,0.48), 0 1px 0 rgba(255,255,255,0.18) inset";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 5px 36px rgba(212,175,55,0.28), 0 1px 0 rgba(255,255,255,0.14) inset";
      }}
    >
      {/* Shimmer sweep no hover */}
      <span
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.30) 50%, transparent 75%)",
          transform: "translateX(-100%)",
          transition: "transform 0.7s ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "translateX(100%)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.transform = "translateX(-100%)")
        }
      />
      <Zap className="relative z-10 w-[18px] h-[18px] fill-current shrink-0" aria-hidden="true" />
      <span className="relative z-10">{text}</span>
      <svg
        className="relative z-10 w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </motion.a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function AulasMeteoricoPage() {
  const [isVdaOpen, setIsVdaOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-black relative">

      {/* ══════════════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Entrar VDA Gratuito"
        className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden"
      >
        {/* Ambient blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 70%)",
              animation: "breathe 7s ease-in-out infinite",
            }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
              animation: "breathe 9s ease-in-out infinite",
              animationDelay: "4s",
            }}
          />
        </div>

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            opacity: 0.022,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
            backgroundSize: "180px 180px",
          }}
        />

        {/* Vertical lines */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
          style={{ opacity: 0.022 }}
        >
          {[20, 40, 60, 80].map((left, i) => (
            <div
              key={i}
              className="absolute top-0 w-px h-full"
              style={{
                left: `${left}%`,
                background:
                  "linear-gradient(to bottom, transparent, rgba(255,255,255,0.8), transparent)",
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
            {/* Logo — sem borda, halo difuso */}
            <motion.div variants={scaleIn} className="mb-10 flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{
                  duration: 4.2,
                  repeat: Infinity,
                  ease: [0.45, 0, 0.55, 1],
                }}
                className="relative"
              >
                <div
                  className="absolute inset-0 -m-10 rounded-full pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.10) 0%, transparent 65%)",
                    filter: "blur(28px)",
                    animation: "pulseGlow 4.5s ease-in-out infinite",
                  }}
                />
                <Image
                  src="/images/vda-logo.png"
                  alt="VDA – Venda Direta Automática"
                  width={720}
                  height={240}
                  className="relative w-[260px] md:w-[320px] h-auto select-none"
                  style={{
                    filter: "drop-shadow(0 0 32px rgba(255,255,255,0.14))",
                  }}
                  priority
                  quality={100}
                  fetchPriority="high"
                />
              </motion.div>

              {/* Divisor */}
              <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
                <div
                  className="w-12 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.13))",
                  }}
                />
                <span className="text-[10px] font-semibold tracking-[0.45em] uppercase text-white/22">
                  Venda Direta Automática
                </span>
                <div
                  className="w-12 h-px"
                  style={{
                    background:
                      "linear-gradient(to left, transparent, rgba(255,255,255,0.13))",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUp} className="w-full text-center mb-5">
              <h1 className="text-[26px] md:text-[32px] font-black tracking-tight text-white leading-tight">
                Entrar{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #D4AF37 0%, #f0d060 50%, #D4AF37 100%)",
                  }}
                >
                  VDA Gratuito
                </span>
              </h1>
              <p className="text-[13px] text-white/33 mt-2.5 tracking-wide font-normal">
                Acesse agora as aulas gratuitas do método Meteórico
              </p>
            </motion.div>

            {/* Indicador de disponibilidade — só texto + dot, sem pill */}
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              />
              <span className="text-[11px] font-medium text-white/28 tracking-[0.18em] uppercase">
                Vagas abertas agora
              </span>
            </motion.div>

            {/* CTA primário */}
            <motion.div variants={fadeUp} className="w-full mb-8">
              <CtaButton
                href={CTA_HREF}
                label="VDA Gratuito Meteórico"
                size="lg"
                text="Entrar na Turma"
              />
              <p className="text-center text-[11px] text-white/17 mt-3 font-normal tracking-wide">
                Gratuito · Sem compromisso · Acesso imediato
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          BRIDGE — texto informativo entre hero e about
          ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Informação sobre turmas"
        className="relative px-4 pb-12 overflow-hidden"
      >
        <div className="max-w-sm mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-4"
          >
            {/* Linha dourada topo */}
            <div className="flex items-center gap-3 w-full justify-center">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(212,175,55,0.22))",
                }}
              />
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: "rgba(212,175,55,0.55)" }}
              />
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(212,175,55,0.22))",
                }}
              />
            </div>

            <p
              className="text-[13.5px] leading-relaxed font-light"
              style={{ color: "rgba(255,255,255,0.36)" }}
            >
              Fique na{" "}
              <span
                className="font-semibold"
                style={{ color: "rgba(255,255,255,0.58)" }}
              >
                Turma Gratuita
              </span>{" "}
              e caso queira entrar na{" "}
              <span
                className="font-semibold bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #D4AF37, #f0d060)",
                }}
              >
                Turma Premium
              </span>{" "}
              é só chamar o suporte da VDA.
            </p>

            {/* Linha neutra base */}
            <div className="flex items-center gap-3 w-full justify-center">
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.06))",
                }}
              />
              <div
                className="w-1 h-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.14)" }}
              />
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    "linear-gradient(to left, transparent, rgba(255,255,255,0.06))",
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          ABOUT — Thiago + VDA
          ══════════════════════════════════════════════════════════════════ */}
      <section
        aria-label="Sobre o Fundador Thiago Lima"
        className="relative pt-2 pb-24 px-4 overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-sm mx-auto relative z-10">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.10))",
              }}
            />
            <span className="text-[9px] font-bold text-white/18 uppercase tracking-[0.4em]">
              Sobre o Fundador
            </span>
            <div
              className="h-px w-10"
              style={{
                background:
                  "linear-gradient(to left, transparent, rgba(255,255,255,0.10))",
              }}
            />
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col items-center"
          >
            {/* Foto — sem card externo */}
            <motion.div variants={fadeUp} className="flex flex-col items-center mb-8">
              <div className="relative mb-6">
                {/* Halo dourado difuso */}
                <div
                  className="absolute -inset-4 rounded-2xl pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    animation: "pulseGlow 5s ease-in-out infinite",
                  }}
                />
                {/* Foto */}
                <div
                  className="relative w-52 h-[17rem] md:w-60 md:h-[20rem] rounded-2xl overflow-hidden"
                  style={{
                    boxShadow:
                      "0 24px 64px rgba(0,0,0,0.75), 0 0 0 1px rgba(212,175,55,0.14)",
                  }}
                >
                  <Image
                    src="/images/thiago-vda.webp"
                    alt="Thiago Lima, fundador da VDA – Venda Direta Automática"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 208px, 240px"
                    loading="lazy"
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    aria-hidden="true"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.70), transparent)",
                    }}
                  />
                </div>
              </div>

              {/* Nome — texto simples, sem card */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-px"
                  style={{ background: "rgba(212,175,55,0.38)" }}
                />
                <span className="text-[10px] text-white/28 uppercase tracking-[0.32em] font-medium">
                  Thiago Lima · Fundador VDA
                </span>
                <div
                  className="w-3 h-px"
                  style={{ background: "rgba(212,175,55,0.38)" }}
                />
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
                style={{
                  backgroundImage: "linear-gradient(90deg, #D4AF37, #f0d060)",
                }}
              >
                Thiago da VDA
              </span>
            </motion.h2>

            {/* Bio */}
            <motion.div
              variants={fadeUp}
              className="space-y-3.5 text-[13.5px] text-white/40 leading-relaxed font-light text-center mb-8"
            >
              <p>
                Especialista em vendas digitais pelo WhatsApp, Thiago Lima construiu o
                método{" "}
                <strong className="text-white/60 font-medium">
                  VDA – Venda Direta Automática
                </strong>{" "}
                a partir de sua própria experiência no campo.
              </p>
              <p>
                Uma trajetória real, construída no dia a dia e na vivência do digital.
                Múltiplos 7 dígitos faturados. Especialista em monetização de redes
                sociais. Hoje sua dedicação está nas ações sociais que realiza e no
                método VDA, que ensina a vender produtos selecionados diretamente pelo
                WhatsApp.
              </p>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              className="w-full mb-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
            />

            {/* Collapsible — O que é a VDA */}
            <motion.div variants={fadeUp} className="w-full mb-8">
              <button
                onClick={() => setIsVdaOpen((v) => !v)}
                aria-expanded={isVdaOpen}
                className="w-full group flex flex-col items-center justify-center cursor-pointer rounded-xl py-4 px-4"
              >
                <h3 className="text-[20px] md:text-[24px] font-black text-white tracking-tight leading-tight mb-2.5 text-center">
                  O que é a{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #D4AF37, #f0d060)",
                    }}
                  >
                    VDA
                  </span>
                  ?
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/18 uppercase tracking-[0.2em] font-medium transition-colors duration-300 group-hover:text-white/34">
                    {isVdaOpen ? "Fechar" : "Saiba mais"}
                  </span>
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{
                      border: "1px solid rgba(255,255,255,0.10)",
                      transform: isVdaOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  >
                    <ChevronDown className="w-3 h-3 text-white/30" />
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isVdaOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3.5 text-[13.5px] text-white/40 leading-relaxed font-light text-center pt-3 pb-2">
                      <p>
                        Na{" "}
                        <strong className="text-white/60 font-medium">
                          VDA — Venda Direta Automática
                        </strong>
                        , ensinamos como vender diariamente pelo WhatsApp. Temos os
                        produtos selecionados, sabemos atrair clientes interessados e
                        realizamos a venda de forma manual e automática.
                      </p>
                      <p>
                        Essa modalidade é uma das de maior acerto, pois o contato com
                        o cliente é imediato. Estude com uma das maiores companhias de
                        venda direta via WhatsApp no Brasil.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA secundário */}
            <motion.div variants={fadeUp} className="w-full">
              <CtaButton
                href={CTA_HREF}
                label="VDA Gratuito Meteórico - About"
                size="md"
                text="Quero entrar agora"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════════ */}
      <footer
        className="relative py-8 px-4 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)",
          }}
        />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="text-center space-y-3"
          >
            <div className="space-y-1">
              <p className="text-[12px] text-white/26">
                © {year} VDA – Venda Direta Automática.
              </p>
              <p className="text-[11px] text-white/14">
                Todos os direitos reservados.{" "}
                <a
                  href="mailto:contato@metodovda.com"
                  className="text-white/22 hover:text-white/42 transition-colors"
                >
                  contato@metodovda.com
                </a>
              </p>
            </div>

            <div className="flex items-center justify-center">
              <Link
                href="/politica-de-privacidade"
                className="text-[11px] text-blue-500/60 hover:text-blue-400 transition-colors underline underline-offset-2"
              >
                Política de Privacidade
              </Link>
            </div>

            <p className="text-[10px] text-white/10 max-w-2xl mx-auto leading-relaxed">
              Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem
              possui qualquer endosso dessas plataformas. Todo o conteúdo deste site é de
              responsabilidade exclusiva dos representantes do metodovda.com.
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Keyframes */}
      <style>{`
        @keyframes breathe {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.07); opacity: 0.72; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1; }
        }
        @keyframes lineFlow {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.82); }
        }
      `}</style>
    </main>
  );
}

export default memo(AulasMeteoricoPage);