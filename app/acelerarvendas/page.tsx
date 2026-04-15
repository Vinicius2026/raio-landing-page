import type { Metadata } from "next";
import Hero from "@/components/vda/Hero";
import ChatSimulation from "@/components/vda/ChatSimulation";
import Features from "@/components/vda/Features";
import CallsSection from "@/components/vda/CallsSection";
import TargetAudience from "@/components/vda/TargetAudience";
import SocialProof from "@/components/vda/SocialProof";
import Pricing from "@/components/vda/Pricing";
import Guarantee from "@/components/vda/Guarantee";
import StickyCtaMobile from "@/components/vda/StickyCtaMobile";
import WhatIsVDA from "@/components/vda/WhatIsVDA";
import AboutFounder from "@/components/vda/AboutFounder";
import AnimatedBgSection from "@/components/vda/AnimatedBgSection";
import BlackHoleEffect from "@/components/vda/BlackHoleEffect";

export const metadata: Metadata = {
  title: "Bastidores VDA — Acesso ao que está funcionando agora",
  description:
    "Entre nos bastidores e veja em tempo real o que pessoas comuns estão fazendo para vender na internet. Acesso por R$34, pagamento único.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Bastidores VDA — Veja o que está funcionando HOJE",
    description:
      "Acompanhe em tempo real estratégias reais de vendas. Acesso por R$34.",
    type: "website",
    images: [
      {
        url: "https://aurenos.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bastidores VDA",
      },
    ],
  },
};

export default function AcelerarVendasPage() {
  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{ background: "#0B0B0B" }}
    >
      {/* Global styles for this page */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&display=swap');

        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-18px) translateX(8px); opacity: 0.7; }
          50% { transform: translateY(-6px) translateX(-5px); opacity: 0.5; }
          75% { transform: translateY(12px) translateX(6px); opacity: 0.6; }
        }
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />

      {/* ── Seção 1: Hero (sem bg animado — design próprio com particles) ── */}
      <Hero />

      {/* ── Seção 2: Chat Simulation (com bg animado amber) ── */}
      <AnimatedBgSection variant="amber">
        <ChatSimulation />
      </AnimatedBgSection>

      {/* ── Seção 3: O que é a VDA (sem bg animado — card tem design próprio) ── */}
      <WhatIsVDA />

      {/* ── Seção 4: Features (com bg animado cyan) ── */}
      <AnimatedBgSection variant="cyan">
        <Features />
      </AnimatedBgSection>

      {/* ── Seção 5: Calls (sem bg animado — descanso visual) ── */}
      <CallsSection />

      {/* ── Seção 6: Target Audience (com bg animado neutral) ── */}
      <AnimatedBgSection variant="neutral">
        <TargetAudience />
      </AnimatedBgSection>

      {/* ── Seção 7: Social Proof (sem bg animado — marquee é o destaque) ── */}
      <SocialProof />

      {/* ── Seção 8: About Founder (com bg animado amber) ── */}
      <AnimatedBgSection variant="amber">
        <AboutFounder />
      </AnimatedBgSection>

      {/* ── Seção 9: Pricing (sem bg animado — foco no card de preço) ── */}
      <Pricing />

      {/* ── Seção 10: Guarantee + Footer ── */}
      <Guarantee />

      {/* ── Seção 11: Black Hole Effect (final da página) ── */}
      <BlackHoleEffect />

      {/* ── Sticky CTA Mobile ── */}
      <StickyCtaMobile />
    </main>
  );
}
