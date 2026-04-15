"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: number;
  sender: "left" | "right";
  name?: string;
  nameColor?: string;
  text?: string;
  type: "text" | "audio" | "typing";
  time: string;
  audioDuration?: string;
}

// ─── Message data — realistic WhatsApp group conversation ────────────────────
const CONVERSATION: Omit<Message, "id">[] = [
  {
    sender: "left",
    name: "Lucas Martins",
    nameColor: "#25D366",
    text: "Galera, subi a campanha ontem às 22h",
    time: "13:41",
    type: "text",
  },
  {
    sender: "left",
    name: "Lucas Martins",
    nameColor: "#25D366",
    text: "Já pingou 3 vendas hoje de manhã 🔥",
    time: "13:41",
    type: "text",
  },
  {
    sender: "right",
    text: "Sério?? com qual produto?",
    time: "13:42",
    type: "text",
  },
  {
    sender: "left",
    name: "Lucas Martins",
    nameColor: "#25D366",
    text: "O Elo 3 que o Thiago indicou na última call",
    time: "13:42",
    type: "text",
  },
  {
    sender: "left",
    name: "Ana Souza",
    nameColor: "#FF6B6B",
    text: "Aqui também! Fechei 2 ontem 🙏",
    time: "13:43",
    type: "text",
  },
  {
    sender: "left",
    name: "Lucas Martins",
    nameColor: "#25D366",
    type: "audio",
    audioDuration: "0:47",
    time: "13:44",
  },
  {
    sender: "right",
    text: "Acabei de ouvir, vou aplicar isso hoje mesmo",
    time: "13:45",
    type: "text",
  },
  {
    sender: "left",
    name: "Ana Souza",
    nameColor: "#FF6B6B",
    text: "A estrutura de copy que tem no bônus 1 é absurda, muda tudo",
    time: "13:46",
    type: "text",
  },
];

// Delay between each message (ms)
const MESSAGE_DELAYS = [0, 600, 1800, 2600, 4200, 5400, 7000, 8200];

// ─── Animation variants ─────────────────────────────────────────────────────
const msgEnter: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 24 },
  },
};

// ─── Audio waveform bars ─────────────────────────────────────────────────────
function AudioWaveform() {
  // 28 bars with random heights — pure CSS animation
  const bars = Array.from({ length: 28 }, (_, i) => ({
    key: i,
    h: 6 + Math.random() * 18,
    delay: i * 0.04,
  }));

  return (
    <div className="flex items-center gap-[1.5px] h-[26px]">
      {bars.map((b) => (
        <div
          key={b.key}
          className="w-[2.5px] rounded-full"
          style={{
            height: `${b.h}px`,
            background:
              "linear-gradient(to top, rgba(255,255,255,0.35), rgba(255,255,255,0.55))",
            animation: `waveBar 1.4s ease-in-out ${b.delay}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Typing indicator ────────────────────────────────────────────────────────
function TypingDots({ name, color }: { name: string; color: string }) {
  return (
    <div className="flex justify-start">
      <div
        className="relative max-w-[70%] px-4 py-3 rounded-2xl rounded-tl-[4px]"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <p
          className="text-[11px] font-semibold mb-1.5"
          style={{ color }}
        >
          {name}
        </p>
        <div className="flex items-center gap-[5px] py-0.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[7px] h-[7px] rounded-full bg-white/40"
              style={{
                animation: `typingBounce 1.2s ease-in-out ${i * 0.18}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function ChatSimulation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showTyping, setShowTyping] = useState(false);
  const [typingUser, setTypingUser] = useState({ name: "Lucas Martins", color: "#25D366" });
  const containerRef = useRef<HTMLDivElement>(null);
  const hasStartedRef = useRef(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom when new messages appear
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [visibleCount, showTyping]);

  // Trigger message sequence when visible
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStartedRef.current) {
          hasStartedRef.current = true;
          startSequence();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function startSequence() {
    CONVERSATION.forEach((msg, i) => {
      // Show typing indicator 700ms before each "left" message
      if (msg.sender === "left" && i > 0) {
        const typingDelay = (MESSAGE_DELAYS[i] || i * 1200) - 700;
        if (typingDelay > 0) {
          setTimeout(() => {
            setTypingUser({
              name: msg.name || "Membro",
              color: msg.nameColor || "#25D366",
            });
            setShowTyping(true);
          }, typingDelay);
        }
      }

      setTimeout(() => {
        setShowTyping(false);
        setVisibleCount((prev) => prev + 1);
      }, MESSAGE_DELAYS[i] || i * 1200);
    });
  }

  const messages: Message[] = CONVERSATION.map((m, i) => ({ ...m, id: i }));
  const visibleMessages = messages.slice(0, visibleCount);

  // Determine if name should show (WhatsApp rule: show name if previous msg was from different sender)
  function shouldShowName(msg: Message, idx: number): boolean {
    if (msg.sender === "right") return false; // "You" never show name
    if (idx === 0) return true;
    const prev = visibleMessages[idx - 1];
    return prev.sender !== msg.sender || prev.name !== msg.name;
  }

  return (
    <section
      ref={containerRef}
      className="relative px-5 py-20 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)",
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
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(90deg, #F59E0B, #FBBF24)",
              }}
            >
              lá dentro agora
            </span>
          </h2>
        </motion.div>

        {/* ═══ WhatsApp Group Chat ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#0B141A",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "0 40px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* ── Header ── */}
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{
              background: "#1F2C34",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
            }}
          >
            {/* Back arrow */}
            <svg
              className="w-5 h-5 text-white/50 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>

            {/* Group avatar */}
            <div className="relative flex-shrink-0">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #00A884 0%, #075E54 100%)",
                }}
              >
                <svg
                  className="w-5 h-5 text-white/80"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12.75c1.63 0 3.07.39 4.24.9 1.08.48 1.76 1.48 1.76 2.6V18H6v-1.75c0-1.12.68-2.12 1.76-2.6 1.17-.51 2.61-.9 4.24-.9zM4 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm1.13 1.1C4.76 14.04 4.39 14 4 14c-.99 0-1.93.21-2.78.58A2.01 2.01 0 000 16.43V18h4.5v-1.75c0-.97.42-1.84 1.03-2.57.2-.22.39-.43.6-.58zM20 13c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4 3.43c0-.81-.48-1.53-1.22-1.85A6.95 6.95 0 0020 14c-.39 0-.76.04-1.13.1.21.15.4.36.6.58.61.73 1.03 1.6 1.03 2.57V18H24v-1.57zM12 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z" />
                </svg>
              </div>
            </div>

            {/* Group info */}
            <div className="flex-1 min-w-0">
              <p className="text-[14.5px] font-semibold text-white/95 truncate">
                Bastidores VDA 🔒
              </p>
              <p className="text-[11.5px] text-white/40 font-light truncate">
                Lucas, Ana, Thiago, você e +139
              </p>
            </div>

            {/* Action icons */}
            <div className="flex items-center gap-4">
              <svg
                className="w-5 h-5 text-white/40"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm-9 0c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm18 0c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3z" />
              </svg>
            </div>
          </div>

          {/* ── Chat body ── */}
          <div
            ref={chatBodyRef}
            className="px-3 py-3 space-y-[3px] overflow-y-auto scrollbar-hide"
            style={{
              minHeight: "340px",
              maxHeight: "420px",
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.012'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundColor: "#0B141A",
            }}
          >
            {/* Date chip */}
            <div className="flex justify-center mb-2">
              <span
                className="px-3 py-1 rounded-lg text-[11px] text-white/50 font-medium"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                HOJE
              </span>
            </div>

            {/* Messages */}
            <AnimatePresence>
              {visibleMessages.map((msg, idx) => {
                const isRight = msg.sender === "right";
                const showName = shouldShowName(msg, idx);
                // Check if next message is from same sender (for grouping spacing)
                const nextMsg = visibleMessages[idx + 1];
                const isSameNextSender =
                  nextMsg &&
                  nextMsg.sender === msg.sender &&
                  nextMsg.name === msg.name;

                return (
                  <motion.div
                    key={msg.id}
                    variants={msgEnter}
                    initial="hidden"
                    animate="show"
                    className={`flex ${isRight ? "justify-end" : "justify-start"} ${
                      isSameNextSender ? "mb-[1px]" : "mb-[6px]"
                    }`}
                  >
                    <div
                      className={`relative max-w-[82%] px-[9px] pt-[6px] pb-[6px] ${
                        isRight
                          ? `rounded-lg ${showName || idx === 0 ? "rounded-tr-[3px]" : ""}`
                          : `rounded-lg ${showName ? "rounded-tl-[3px]" : ""}`
                      }`}
                      style={{
                        background: isRight ? "#005C4B" : "#1F2C34",
                        minWidth: "80px",
                      }}
                    >
                      {/* Tail (WhatsApp triangle) */}
                      {showName && !isRight && (
                        <div
                          className="absolute -left-[8px] top-0 w-0 h-0"
                          style={{
                            borderTop: "0px solid transparent",
                            borderRight: "8px solid #1F2C34",
                            borderBottom: "10px solid transparent",
                          }}
                        />
                      )}
                      {idx === 0 && isRight && (
                        <div
                          className="absolute -right-[8px] top-0 w-0 h-0"
                          style={{
                            borderTop: "0px solid transparent",
                            borderLeft: "8px solid #005C4B",
                            borderBottom: "10px solid transparent",
                          }}
                        />
                      )}

                      {/* Sender name (only for left, only when sender changes) */}
                      {showName && !isRight && msg.name && (
                        <p
                          className="text-[12.5px] font-semibold mb-[2px] leading-tight"
                          style={{ color: msg.nameColor || "#25D366" }}
                        >
                          {msg.name}
                        </p>
                      )}

                      {/* Content */}
                      {msg.type === "audio" ? (
                        <div className="flex items-center gap-2.5 py-1">
                          {/* Play button */}
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                              background: "rgba(255,255,255,0.1)",
                            }}
                          >
                            <svg
                              className="w-4 h-4 text-white/70 ml-0.5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                          {/* Waveform */}
                          <div className="flex-1">
                            <AudioWaveform />
                          </div>
                          {/* Duration */}
                          <span className="text-[11px] text-white/40 flex-shrink-0">
                            {msg.audioDuration}
                          </span>
                        </div>
                      ) : (
                        <p className="text-[14.2px] text-white/90 leading-[1.35] pr-12">
                          {msg.text}
                        </p>
                      )}

                      {/* Time + Read receipts */}
                      <div
                        className={`flex items-center gap-1 ${
                          msg.type === "audio" ? "justify-end -mt-1" : "justify-end -mt-3"
                        }`}
                        style={{
                          float: "right",
                          position: "relative",
                          marginTop: msg.type === "audio" ? "2px" : "-4px",
                        }}
                      >
                        <span className="text-[10.5px] text-white/35 leading-none">
                          {msg.time}
                        </span>
                        {isRight && (
                          <svg
                            className="w-[16px] h-[11px] text-[#53BDEB] flex-shrink-0"
                            viewBox="0 0 16 11"
                            fill="currentColor"
                          >
                            <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.344.153l-.311.345a.522.522 0 0 0-.131.351c0 .143.045.267.131.373l2.534 2.636a.616.616 0 0 0 .432.199.545.545 0 0 0 .455-.199L11.12 1.382a.477.477 0 0 0 .131-.34.477.477 0 0 0-.131-.34l-.049-.049zm-3.02 7.655l.562-.697a.455.455 0 0 1 .381-.178c.116 0 .216.036.304.102l.049.049c.1.1.131.217.131.34a.477.477 0 0 1-.131.34L5.66 12.205a.545.545 0 0 1-.455.199.616.616 0 0 1-.432-.199L2.24 9.569l.311-.345a.457.457 0 0 1 .344-.153c.131 0 .244.051.336.153l2.011 2.095 3.809-3.011z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Typing indicator */}
            <AnimatePresence>
              {showTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <TypingDots name={typingUser.name} color={typingUser.color} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Input bar ── */}
          <div
            className="flex items-center gap-2 px-2.5 py-2"
            style={{
              background: "#1F2C34",
              borderTop: "1px solid rgba(255,255,255,0.03)",
            }}
          >
            {/* Emoji */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-[22px] h-[22px] text-white/35"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
                />
              </svg>
            </div>

            {/* Input field */}
            <div
              className="flex-1 rounded-3xl px-4 py-2.5 text-[14px] text-white/30"
              style={{
                background: "#2A3942",
                border: "none",
              }}
            >
              Mensagem
            </div>

            {/* Mic */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#00A884" }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5-3c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Bottom participant avatars */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <div className="flex -space-x-2">
            {["#25D366", "#FF6B6B", "#F59E0B", "#8B5CF6", "#3B82F6"].map(
              (c, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-[2px]"
                  style={{
                    borderColor: "#0B0B0B",
                    background: `linear-gradient(135deg, ${c}, ${c}88)`,
                  }}
                />
              )
            )}
          </div>
          <span className="text-[11px] text-white/25 font-light">
            +142 participando agora
          </span>
        </motion.div>
      </div>

      {/* ── CSS animations ── */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        @keyframes waveBar {
          0% { transform: scaleY(0.4); }
          100% { transform: scaleY(1); }
        }
      `,
        }}
      />
    </section>
  );
}
