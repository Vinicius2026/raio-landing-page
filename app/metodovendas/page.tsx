import type { Metadata } from 'next';
import Link from 'next/link';
import FooterSection from '@/components/FooterSection';
import AboutSection from '@/components/AboutSection';
import QuizButton from './QuizButton';

export const metadata: Metadata = {
    title: 'Novo Método Silencioso | VDA',
    description: 'Se algum dia já imaginou vender infoprodutos e produtos físicos pelo WhatsApp, chegou a hora de colocar isso em prática.',
    robots: { index: true, follow: true },
};

export default function NMSPage() {
    return (
        <>
            <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden selection:bg-black selection:text-white">

                {/* Texto central — carta de vendas minimalista */}
                <div className="max-w-[580px] w-full text-center">
                    <p className="text-[10px] font-mono tracking-[0.5em] uppercase text-black/25 mb-10">VDA — Método Silencioso</p>

                    <h1 className="font-serif text-[22px] sm:text-[28px] lg:text-[34px] leading-[1.35] font-normal text-black tracking-tight">
                        Se algum dia já imaginou vender infoprodutos e produtos físicos pelo WhatsApp
                    </h1>

                    <p className="mt-6 text-[15px] sm:text-[17px] leading-relaxed text-black/60 font-light">
                        então chegou a hora de colocar isso em prática da forma que funciona.
                    </p>

                    {/* Separador minimalista */}
                    <div className="flex items-center justify-center gap-3 my-10">
                        <div className="w-8 h-px bg-black/10" />
                        <div className="w-1 h-1 rounded-full bg-black/15" />
                        <div className="w-8 h-px bg-black/10" />
                    </div>

                    {/* Dois botões lado a lado */}
                    <div className="flex flex-row items-center justify-center gap-3 sm:gap-4">
                        <QuizButton />

                        <a
                            href="https://aurenos.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-transparent text-black text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase border border-black/15 transition-all duration-300 hover:border-black/40 hover:bg-black/[0.03] active:scale-[0.97]"
                        >
                            VDA Site
                        </a>
                    </div>
                </div>
            </main>

            {/* Seção Quem é o Thiago idêntica à da home */}
            <div className="relative overflow-hidden bg-zinc-950">
                <div className="relative z-10 pt-10">
                    <AboutSection />
                </div>
            </div>

            {/* Rodapé idêntico ao da home */}
            <div className="relative z-10 bg-[#0B0F19]">
                <FooterSection />
            </div>
        </>
    );
}
