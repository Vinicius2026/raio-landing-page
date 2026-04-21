'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import JoinGroupButton from './JoinGroupButton';
import { trackEvent } from '@/lib/meta-pixel';

export default function OfferSection() {
    const particleRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const particle = particleRef.current;
        const section = sectionRef.current;
        if (!particle || !section) return;

        let x = Math.random() * section.offsetWidth;
        let y = Math.random() * section.offsetHeight;

        let vx = (Math.random() - 0.5) * 2;
        let vy = (Math.random() - 0.5) * 2;
        const maxSpeed = 1.2;
        let animationFrameId: number;

        const animate = () => {
            if (!section.offsetWidth) {
                animationFrameId = requestAnimationFrame(animate);
                return;
            }
            const width = section.offsetWidth;
            const height = section.offsetHeight;

            x += vx;
            y += vy;

            if (x <= 0 || x >= width) vx *= -1;
            if (y <= 0 || y >= height) vy *= -1;

            x = Math.max(0, Math.min(x, width));
            y = Math.max(0, Math.min(y, height));

            if (Math.random() < 0.02) {
                vx += (Math.random() - 0.5) * 0.5;
                vy += (Math.random() - 0.5) * 0.5;
                vx = Math.max(-maxSpeed, Math.min(maxSpeed, vx));
                vy = Math.max(-maxSpeed, Math.min(maxSpeed, vy));
            }

            particle.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <>
            <div className="w-full flex justify-center items-center py-2 sm:py-4">
                <div className="w-[85%] max-w-4xl h-[2px] bg-black border-b border-slate-600/20 rounded-full shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] opacity-70"></div>
            </div>

            <section id="oferta" ref={sectionRef} className="w-full pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28 relative bg-[#0B0F19] overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full md:blur-[120px] blur-[60px] pointer-events-none z-0"></div>

                <div ref={particleRef} className="absolute left-0 top-0 pointer-events-none z-0 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)] opacity-70">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] sm:w-[250px] h-[180px] sm:h-[250px] bg-[#D4AF37]/25 rounded-full blur-[50px] sm:blur-[60px]"></div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                    <div className="relative max-w-4xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24 reveal flex flex-col items-center">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.1)_0%,rgba(249,115,22,0.05)_50%,transparent_100%)] blur-[60px] pointer-events-none -z-10 rounded-full"></div>
                        
                        <h2 className="font-serif font-black tracking-tight flex flex-col items-center justify-center z-10 w-full relative group">
                            <span className="text-3xl sm:text-4xl lg:text-[42px] text-white/90 drop-shadow-md mb-2 flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1CC] to-[#D4AF37] uppercase tracking-[0.1em] drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">
                                    4 Bônus
                                </span>
                                <span className="font-medium tracking-tight mt-1 sm:mt-0 text-slate-200 font-sans">que custaria</span>
                            </span>

                            <div className="relative inline-flex items-center justify-center my-4 sm:my-6 group/price cursor-default">
                                <div className="absolute inset-0 bg-red-600/15 blur-[20px] rounded-full transition-all duration-700 group-hover/price:bg-red-500/30"></div>
                                <span className="relative text-2xl sm:text-3xl lg:text-4xl text-red-500 font-sans font-bold tracking-[0.15em] line-through decoration-red-600/80 decoration-[3px] opacity-90 px-6 sm:px-8 py-2 md:py-3 rounded-full border border-red-500/30 bg-[#0B0F19]/60 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,0,0,0.1)] transition-transform duration-500 group-hover/price:scale-[1.03]">
                                    R$ 1.994,00
                                </span>
                            </div>

                            <span className="font-sans text-[2.25rem] sm:text-[3rem] lg:text-[4.5rem] leading-[1.1] text-white font-bold mt-2 sm:mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-5 drop-shadow-xl">
                                <span className="tracking-tight text-white/95 text-opacity-90">e hoje é</span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-slate-100 via-slate-300 to-slate-500 uppercase tracking-widest font-black drop-shadow-[0_4px_25px_rgba(203,213,225,0.4)] relative inline-block transform sm:hover:scale-[1.08] transition-all duration-500 ease-out mt-1 sm:mt-0 px-2 group/free">
                                    Gratuito
                                    <span className="absolute -top-1 -right-3 w-4 h-4 bg-slate-300 rounded-full blur-[3px] opacity-80 animate-pulse"></span>
                                    <span className="absolute -bottom-2 -left-2 w-3 h-3 bg-white rounded-full blur-[2px] opacity-60"></span>
                                </span>
                            </span>
                        </h2>

                        <div className="mt-8 sm:mt-10 w-full px-4 flex justify-center">
                            <div className="w-full max-w-[460px] border border-white/10 rounded-[20px] bg-[#060913]/90 p-5 sm:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition duration-300 hover:border-white/20 hover:bg-[#060913]">
                                <p className="text-[13px] sm:text-[15px] font-sans font-normal leading-relaxed text-slate-300 text-center tracking-wide">
                                    "Entendemos que com todos esses bônus o aluno avança para a venda mais rápida."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bonus list — sem imagens, layout compacto e direto */}
                    <div className="relative max-w-lg mx-auto mb-16 reveal space-y-3" style={{ transitionDelay: '150ms' }}>

                        {[
                            {
                                tag: 'Bônus 01',
                                title: 'Banco de Áudios + Criativos + Copy',
                                desc: 'Funil mestre via áudio. Áudios prontos pré-gravados — envie com um clique.',
                                price: 'R$ 500,00',
                                icon: (
                                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                                    </svg>
                                )
                            },
                            {
                                tag: 'Bônus 02',
                                title: 'Proteção e Continuidade VDA',
                                desc: 'Guia completo para estruturar sua operação com segurança e consistência.',
                                price: 'R$ 997,00',
                                icon: (
                                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                    </svg>
                                )
                            },
                            {
                                tag: 'Bônus 03',
                                title: 'Calculadora de Lucro e Escala VDA',
                                desc: 'A planilha que utilizamos para planejar e escalar operações com clareza.',
                                price: 'R$ 100,00',
                                icon: (
                                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                                    </svg>
                                )
                            },
                            {
                                tag: 'Bônus 04',
                                title: 'Otimizador de Criativos VDA',
                                desc: 'Ferramenta para produção e organização de criativos de alta performance.',
                                price: 'R$ 397,00',
                                icon: (
                                    <svg className="w-4 h-4 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                    </svg>
                                )
                            }
                        ].map((bonus, idx) => (
                            <div
                                key={idx}
                                className="relative rounded-2xl p-[1px] bg-gradient-to-r from-white/10 via-white/5 to-transparent group hover:-translate-y-0.5 transition-all duration-300"
                            >
                                <div className="relative w-full bg-[#0a0a0c] rounded-2xl px-5 py-4 flex items-center gap-4">
                                    {/* Icon */}
                                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center">
                                        {bonus.icon}
                                    </div>

                                    {/* Text */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/60">
                                                {bonus.tag}
                                            </span>
                                        </div>
                                        <p className="text-[13px] font-semibold text-slate-100 leading-tight mb-0.5 truncate">
                                            {bonus.title}
                                        </p>
                                        <p className="text-[11px] text-slate-400 font-light leading-snug line-clamp-1">
                                            {bonus.desc}
                                        </p>
                                    </div>

                                    {/* Price badge */}
                                    <div className="flex-shrink-0 text-right">
                                        <span className="block text-[10px] text-slate-500 line-through decoration-slate-600 leading-tight">
                                            {bonus.price}
                                        </span>
                                        <span className="block text-[13px] font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                                            R$ 0
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Total badge */}
                        <div className="flex items-center justify-between px-5 py-3 rounded-2xl border border-[#D4AF37]/20 bg-[#D4AF37]/5 mt-4">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_rgba(212,175,55,0.8)]"/>
                                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37]/80">
                                    Total de Bônus Inclusos
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-[11px] text-slate-500 line-through">R$ 1.994,00</span>
                                <span className="text-[15px] font-black text-white">Grátis</span>
                            </div>
                        </div>
                    </div>


                    <div className="relative max-w-lg mx-auto reveal" style={{ transitionDelay: '300ms' }}>
                        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-orange-500/20 via-transparent to-[#21c55e]/15 blur-[60px] pointer-events-none -z-10 scale-110"></div>
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-5 py-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse"></span>
                                <span className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">Oferta disponível por tempo limitado</span>
                            </div>
                        </div>

                        <div className="text-center mb-8 px-2">
                            <p className="text-base sm:text-lg font-semibold text-white/90 leading-snug max-w-sm mx-auto">
                                Quem vende pelo WhatsApp de forma profissional e sistemática
                                <strong className="text-white font-black"> cria uma fonte de renda consistente.</strong>
                            </p>
                            <p className="text-[11px] text-white/35 mt-2 font-medium tracking-wide">Método aplicado por alunos em todo o Brasil.</p>
                        </div>

                        <div className="pricing-card-border rounded-[28px] p-[1.5px]">
                            <div className="relative bg-[#070A10] rounded-[27px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.7)]">
                                <div className="pricing-noise absolute inset-0 z-0 opacity-[0.03] pointer-events-none"></div>
                                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none z-0"></div>

                                <div className="relative z-10 p-7 sm:p-9 flex flex-col items-center">
                                    <div className="w-full flex flex-col items-center justify-center text-center py-2 mb-2">
                                        <div className="inline-block px-5 py-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 mb-5 relative overflow-hidden">
                                            <span className="text-emerald-400 text-xs sm:text-sm font-black uppercase tracking-[0.3em] drop-shadow-md">
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                                                CURSO (VAGAS ABERTAS)
                                            </span>
                                        </div>
                                    </div>

                                    {/* Preço em destaque */}
                                    <div className="w-full flex flex-col items-center mt-2 mb-8">
                                        <div className="flex items-start justify-center gap-1.5">
                                            <span className="text-[18px] sm:text-[22px] text-white/50 font-medium mt-2 sm:mt-3">R$</span>
                                            <span className="text-[54px] sm:text-[64px] font-black text-white leading-none tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                                                97,00
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-emerald-400/90 mt-3 font-semibold tracking-wide uppercase drop-shadow-sm">Pagamento Único</p>
                                    </div>

                                    <div className="w-full grid grid-cols-2 gap-3 mb-7">
                                        <div className="relative rounded-2xl p-4 border border-[#A8203E]/20 bg-[#A8203E]/[0.04] hover:bg-[#A8203E]/[0.07] transition-colors duration-300">
                                            <span className="absolute top-2 right-3.5 text-[10px] font-black text-[#A8203E]/40 tracking-wider">#1</span>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-7 h-7 rounded-lg bg-[#A8203E]/15 border border-[#A8203E]/25 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-[#C4284A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C4284A]">Treinamento</span>
                                            </div>
                                            <ul className="space-y-1.5">
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-orange-500 mt-1.5 flex-shrink-0 shadow-[0_0_6px_rgba(249,115,22,0.8)]"></span><span className="text-[10px] text-orange-500 font-bold uppercase tracking-wider drop-shadow-md leading-tight">6 módulos completos <span className="text-[7.5px] font-normal tracking-normal text-white/50 normal-case ml-0.5">(Treinamento)</span><span className="block text-[8px] font-medium text-white/35 normal-case tracking-normal mt-0.5">22 video aulas</span></span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">Passo a passo inicial</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">Duplicação de operação</span></li>
                                            </ul>
                                        </div>

                                        <div className="relative rounded-2xl p-4 border border-[#A8203E]/20 bg-[#A8203E]/[0.04] hover:bg-[#A8203E]/[0.07] transition-colors duration-300">
                                            <span className="absolute top-2 right-3.5 text-[10px] font-black text-[#A8203E]/40 tracking-wider">#2</span>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-7 h-7 rounded-lg bg-[#A8203E]/15 border border-[#A8203E]/25 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-[#C4284A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C4284A]">Ferramentas</span>
                                            </div>
                                            <ul className="space-y-1.5">
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">Estrutura de lives semanais</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">Estratégia de vendas WhatsApp</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">Produção de conteúdo</span></li>
                                            </ul>
                                        </div>

                                        <div className="relative rounded-2xl p-4 border border-[#A8203E]/20 bg-[#A8203E]/[0.04] hover:bg-[#A8203E]/[0.07] transition-colors duration-300">
                                            <span className="absolute top-2 right-3.5 text-[10px] font-black text-[#A8203E]/40 tracking-wider">#3</span>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-7 h-7 rounded-lg bg-[#A8203E]/15 border border-[#A8203E]/25 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-[#C4284A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C4284A]">Estratégia</span>
                                            </div>
                                            <ul className="space-y-1.5">
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">14 bases de conteúdo VDA</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">Estratégia de escala</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">14 produtos validados</span></li>
                                            </ul>
                                        </div>

                                        <div className="relative rounded-2xl p-4 border border-[#A8203E]/20 bg-[#A8203E]/[0.04] hover:bg-[#A8203E]/[0.07] transition-colors duration-300">
                                            <span className="absolute top-2 right-3.5 text-[10px] font-black text-[#A8203E]/40 tracking-wider">#4</span>
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="w-7 h-7 rounded-lg bg-[#A8203E]/15 border border-[#A8203E]/25 flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-3.5 h-3.5 text-[#C4284A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0v10l-8 4m0-14L4 17m8 4V10"/></svg>
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#C4284A]">Materiais</span>
                                            </div>
                                            <ul className="space-y-1.5">
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">mais de 20 produtos premium</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">70 textos · 25 imagens</span></li>
                                                <li className="flex items-start gap-1.5"><span className="w-[3px] h-[3px] rounded-full bg-white/30 mt-1.5 flex-shrink-0"></span><span className="text-[10px] text-white/60 leading-tight">5 vídeos + 40 áudios</span></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="w-full flex justify-center items-center flex-col mb-7 -mt-2">
                                        <span className="text-[#21c55e] text-2xl font-light mb-1.5 leading-none drop-shadow-[0_0_8px_rgba(33,197,94,0.6)]">+</span>
                                        <h4 className="text-center font-sans mb-2.5 flex flex-col items-center max-w-[90%] sm:max-w-[85%] mx-auto mt-0.5">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-orange-500 text-[14px] sm:text-[15px] font-black uppercase tracking-[0.15em] leading-none mb-1.5 drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">
                                                4 Bônus Gratuito
                                            </span>
                                            <span className="block text-[9.5px] sm:text-[10px] text-slate-300 font-semibold uppercase tracking-wider leading-[1.6]">
                                                O sistema que nossa equipe usa para vender pelo WhatsApp de forma consistente.
                                            </span>
                                        <span className="block text-[8px] text-white/25 mt-1 normal-case tracking-normal font-normal">*Resultados variam conforme esforço, dedicação e contexto individual.</span>
                                    </h4>
                                </div>

                                    <div className="w-full flex justify-center">
                                        <a
                                            href="https://pay.cakto.com.br/3824kdo_857537"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => trackEvent('InitiateCheckout', { value: 97.00, currency: 'BRL', content_name: 'VDA Premium - OfferSection' })}
                                            className="group relative flex items-center justify-center w-full rounded-2xl cursor-pointer overflow-hidden py-4 px-8"
                                            style={{
                                                background: 'linear-gradient(135deg, #c8771a 0%, #f0a030 35%, #e89020 65%, #c8771a 100%)',
                                                boxShadow: '0 0 40px rgba(249,115,22,0.25), 0 4px 20px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            <span className="relative z-10 text-[14px] font-black text-white tracking-wider uppercase">
                                                Comprar VDA Agora
                                            </span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 relative z-10 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>

                                    <div className="flex items-center justify-center gap-2 mt-5">
                                        <svg className="w-3.5 h-3.5 text-[#21c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                        </svg>
                                        <span className="text-[10px] text-white/35 font-medium tracking-wide">Transação Segura e Criptografada</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-16 md:py-24 relative bg-[#0B0F19] border-y border-white/5">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center">

                    {/* ── O que você recebe ── */}
                    <div className="w-full max-w-2xl mx-auto mb-14 reveal relative">
                        {/* Ambient glow */}
                        <div
                            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[340px] h-[200px] pointer-events-none"
                            aria-hidden="true"
                            style={{
                                background: 'radial-gradient(ellipse 60% 50%, rgba(249,115,22,0.12) 0%, transparent 70%)',
                                filter: 'blur(30px)',
                            }}
                        />

                        {/* Card */}
                        <div className="relative rounded-3xl p-[1px] overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.25) 0%, rgba(212,175,55,0.1) 50%, rgba(249,115,22,0.05) 100%)' }}>
                            <div className="relative bg-[#070A12] rounded-3xl px-6 sm:px-10 py-8 sm:py-10 overflow-hidden">
                                {/* Inner top glow line */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(249,115,22,0.5), transparent)' }} />

                                <p className="text-[9px] font-black tracking-[0.4em] uppercase text-orange-500/60 mb-3">Acesso imediato</p>
                                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                                    O que você recebe
                                </h3>
                                <p className="text-sm text-slate-400 font-light mb-8">Ao entrar hoje, você terá acesso a:</p>

                                <ul className="space-y-3 text-left max-w-sm mx-auto">
                                    {[
                                        { icon: '🎓', label: 'Treinamento completo passo a passo' },
                                        { icon: '💬', label: 'Estratégias práticas para vender no WhatsApp' },
                                        { icon: '🧭', label: 'Orientação direta para iniciar rápido' },
                                        { icon: '⚡', label: 'Acesso imediato após a compra' },
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3.5">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.15)' }}>
                                                {item.icon}
                                            </span>
                                            <span className="text-[14px] text-slate-200 font-light leading-snug">{item.label}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20 reveal">
                        <div className="flex flex-col gap-6">
                            <div className="bg-[#05080f]/80 backdrop-blur-md rounded-xl border border-white/5 p-6 sm:p-8 relative overflow-hidden group text-left">
                                <div className="absolute top-0 left-6 sm:left-8 w-16 h-[3px] bg-gradient-to-r from-orange-500 to-[#D4AF37]"></div>
                                <h3 className="font-serif text-2xl sm:text-[28px] font-bold text-white leading-tight mb-4 tracking-tight shadow-black drop-shadow-md">
                                    Esses bônus podem sair do ar a qualquer momento.
                                </h3>
                                <p className="text-slate-300 font-light text-[13px] sm:text-[15px] leading-relaxed mb-4">
                                    Eles estão liberados só enquanto a turma estiver aberta. Depois, podem virar conteúdos pagos ou simplesmente não estarem mais disponíveis.
                                </p>
                                <p className="text-orange-500 font-medium text-[13px] sm:text-[15px] leading-relaxed drop-shadow-md">
                                    Se você deixar pra depois, talvez nem consiga mais acessar isso.
                                </p>
                            </div>

                            <div className="bg-[#05080f]/80 backdrop-blur-md rounded-xl border border-white/5 p-6 sm:p-8 relative overflow-hidden group text-left">
                                <div className="absolute top-0 left-6 sm:left-8 w-16 h-[3px] bg-gradient-to-r from-orange-500 to-[#D4AF37]"></div>
                                <h3 className="font-serif text-2xl sm:text-[28px] font-bold text-white leading-tight mb-6 tracking-tight shadow-black drop-shadow-md">
                                    Mais de 1.994,00 reais em Bônus!
                                </h3>
                                <div className="w-full relative rounded-[20px] p-[2px] mb-6 bg-gradient-to-b from-orange-500 to-orange-500/10 overflow-hidden group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                                    <div className="w-full bg-[#0a0f19] rounded-[18px] flex items-center justify-center p-4 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-orange-500/10 blur-[40px] z-0"></div>
                                        <Image src="/capas bonus/cube-bonus.png" alt="Cubo Bônus 1.994,00 Reais VDA" width={280} height={280} className="w-[80%] max-w-[280px] h-auto object-contain relative z-10 drop-shadow-[0_15px_30px_rgba(249,115,22,0.4)] group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                                    </div>
                                </div>
                                <p className="text-slate-300 font-light text-[13px] sm:text-[15px] leading-relaxed">
                                    Ao garantir sua vaga agora, você desbloqueia gratuitamente um pacote de bônus exclusivos que, juntos, <strong className="text-white font-medium">valem mais de R$1.994,00!</strong> e vão acelerar sua jornada rumo às suas primeiras vendas!
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col h-full">
                            <div className="bg-[#05080f]/80 backdrop-blur-md rounded-xl border border-white/5 p-6 sm:p-8 relative overflow-hidden h-full flex flex-col group text-left">
                                <div className="absolute top-0 left-6 sm:left-8 w-16 h-[3px] bg-gradient-to-r from-orange-500 to-[#D4AF37]"></div>
                                <h3 className="font-serif text-2xl sm:text-[28px] font-bold text-white leading-tight mb-4 tracking-tight shadow-black drop-shadow-md">
                                    Ficou com alguma dúvida antes de garantir sua vaga?
                                </h3>
                                <p className="text-slate-300 font-light text-[13px] sm:text-[15px] leading-relaxed mb-6 sm:mb-8">
                                    Nossa equipe está pronta para te ajudar! Clique abaixo e fale com a gente diretamente — estamos disponíveis para esclarecer qualquer ponto antes da sua decisão.
                                </p>
                                <div className="flex flex-col gap-4 mt-auto">
                                    <a href="https://wa.me/5521968960966?text=Quero%20falar%20com%20suporte%20da%20VDA.%20ID001428" target="_blank" rel="noopener noreferrer" className="w-full border border-white/5 bg-[#0a0f19] rounded-lg overflow-hidden flex flex-col group/btn hover:border-orange-500/50 transition-colors shadow-lg">
                                        <div className="p-4 sm:p-5 flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full border border-orange-500 flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(249,115,22,0.3)]">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.096-1.332-.118-.198-.065-.495-.152-.871-.307-1.497-.618-2.471-2.146-2.545-2.247-.074-.102-.607-.808-.607-1.54 0-.731.382-1.092.516-1.238.134-.146.29-.182.387-.182.097 0 .194 0 .28.005.088.004.21-.035.328.248.12.285.405.99.442 1.064.037.074.062.161.014.257-.048.096-.073.153-.146.239-.073.085-.154.186-.219.255-.07.075-.143.158-.063.296.08.137.355.586.76 1.05.52.597 1.01 1.107 1.168 1.256.095.09.183.136.27.126.113-.013.208-.09.288-.204.095-.136.195-.297.35-.297.108 0 .614.288.723.339.109.052.181.077.208.121.026.044.026.257-.118.662z"/>
                                                </svg>
                                            </div>
                                            <span className="font-bold text-white text-[15px] sm:text-[17px] tracking-tight leading-snug">Atendimento por<br/>Whatsapp</span>
                                        </div>
                                        <div className="w-full bg-orange-500 py-2.5 flex justify-center items-center text-center">
                                            <span className="font-black text-black text-[12px] uppercase tracking-widest drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">Clique para conversar</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
