"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Guarantee() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* Guarantee */}
      <section className="relative px-5 py-16 max-w-3xl mx-auto overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.1), rgba(34,197,94,0.03))",
              border: "1px solid rgba(34,197,94,0.18)",
              boxShadow: "0 0 30px rgba(34,197,94,0.06)",
            }}
          >
            <ShieldCheck className="w-7 h-7 text-emerald-400/80" />
          </div>
          <h3 className="text-[20px] font-extrabold text-white tracking-tight mb-3 uppercase">
            Garantia de 7 dias
          </h3>
          <p className="text-[14px] text-white/40 font-light max-w-sm leading-relaxed">
            Se não fizer sentido, é só sair. Sem risco.
          </p>
        </motion.div>
      </section>

      {/* Urgency */}
      <section className="px-5 py-6 text-center">
        <p className="text-[12px] text-white/20 font-light max-w-sm mx-auto leading-relaxed">
          Acesso pode ser fechado a qualquer momento para manter a qualidade do ambiente.
        </p>
      </section>

      {/* Footer */}
      <footer
        className="relative pt-10 pb-28 md:pb-10 px-5 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-4xl mx-auto text-center space-y-4 relative z-10">
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/politica-de-privacidade"
              className="text-[11px] text-white/25 hover:text-white/45 transition-colors underline underline-offset-2"
            >
              Política de Privacidade
            </Link>
            <span className="text-white/10 text-[10px]">•</span>
            <Link
              href="/politica-de-privacidade"
              className="text-[11px] text-white/25 hover:text-white/45 transition-colors underline underline-offset-2"
            >
              Termos de Uso
            </Link>
          </div>

          <p className="text-[10px] text-white/18 max-w-lg mx-auto leading-relaxed">
            Não garantimos resultados. Tudo depende da aplicação de cada pessoa.
            Este site não faz parte dos websites da Meta, do Facebook ou Instagram,
            nem possui qualquer endosso dessas plataformas. Conteúdo de responsabilidade
            exclusiva de aurenos.com.br.
          </p>

          <p className="text-[10px] text-white/12">
            © {year} VDA – Venda Direta Automática.
          </p>
        </div>
      </footer>
    </>
  );
}
