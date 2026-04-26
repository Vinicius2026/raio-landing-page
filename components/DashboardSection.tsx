'use client';
import Image from 'next/image';
import { trackEvent } from '@/lib/meta-pixel';

export default function DashboardSection() {
    return (
        <section id="dashboard-presentation" className="w-full pt-20 sm:pt-28 pb-12 sm:pb-16 relative overflow-hidden flex flex-col items-center bg-[#060913]">
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#00e5ff]/5 rounded-full md:blur-[70px] blur-[50px] pointer-events-none z-0"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex flex-col items-center">
                <div className="mb-10 sm:mb-16 reveal flex flex-col items-center justify-center text-center relative z-50">
                    {/* Eyebrow tag */}
                    <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-slate-500 mb-4">Metodologia VDA</p>

                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-bold text-white leading-snug tracking-tight max-w-xl">
                        O nosso mapa validado para ajudar você a{' '}
                        <span className="relative inline-block">
                            estruturar o seu sistema de vendas
                            <span className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-orange-500/60 via-[#D4AF37]/70 to-transparent pointer-events-none" />
                        </span>
                        {' '}passo a passo.
                    </h2>

                    
                    <div className="inline-flex items-center gap-3 mt-6 mb-8">
                        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#00e5ff]/60"></div>
                        <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)] text-center">Painel de Controle VDA</span>
                        <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#00e5ff]/60"></div>
                    </div>

                    <div className="inline-block bg-white text-[#050810] font-bold py-3 sm:py-[10px] px-8 sm:px-8 rounded-full text-[13px] sm:text-[14px] shadow-[0_0_25px_rgba(255,255,255,0.15)] pointer-events-none select-none mt-2">
                        Grupo Interagindo Diariamente
                    </div>
                </div>

                <div className="relative w-full h-[400px] sm:h-[600px] reveal mt-4 sm:mt-8">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%] rounded-lg sm:rounded-xl border border-white/5 bg-[#0B0F19] overflow-hidden opacity-80 brightness-110 z-10 shadow-2xl">
                        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5 bg-[#0B0F19]">
                            <span className="w-2 h-2 rounded-full bg-red-500/40"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500/40"></span>
                            <span className="w-2 h-2 rounded-full bg-green-500/40"></span>
                        </div>
                        <Image src="/dentro da vda/produto-dashboard-review.webp" alt="Dashboard Back" width={800} height={400} sizes="(max-width: 640px) 90vw, 75vw" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060913] via-transparent to-transparent"></div>
                    </div>

                    <div className="absolute bottom-4 sm:bottom-12 left-0 sm:left-4 w-[150px] sm:w-[240px] bg-[#0A0D14] rounded-[24px] sm:rounded-[40px] border border-[#00e5ff]/20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-4 sm:p-6 z-30 transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-8 sm:w-12 h-1 bg-white/10 rounded-full mx-auto mb-4 sm:mb-6"></div>
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-8">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/30 flex items-center justify-center shadow-[0_0_10px_rgba(0,229,255,0.2)] shrink-0">
                                <span className="text-[8px] sm:text-[10px] font-black text-[#00e5ff] tracking-tighter">VDA</span>
                            </div>
                            <span className="text-[7px] sm:text-[8px] text-slate-400 font-medium tracking-widest uppercase leading-tight">Venda Direta<br/>Automática</span>
                        </div>
                        <p className="text-[9px] sm:text-xs text-slate-400 font-medium mb-1 text-left">Vendas Hoje</p>
                        <p className="text-white text-lg sm:text-2xl font-black tracking-tight mb-6 sm:mb-8 text-left leading-none"><span className="text-[#00e5ff] text-base sm:text-xl mr-1">R$</span>8.240,00</p>
                        
                        <div className="flex items-end justify-between h-14 sm:h-20 gap-1 sm:gap-2">
                            <div className="w-full bg-[#00e5ff]/20 rounded-t-sm animate-[pulse_3s_infinite]" style={{ height: '30%' }}></div>
                            <div className="w-full bg-[#00e5ff]/40 rounded-t-sm" style={{ height: '50%' }}></div>
                            <div className="w-full bg-[#00e5ff]/30 rounded-t-sm" style={{ height: '40%' }}></div>
                            <div className="w-full bg-[#00e5ff] rounded-t-sm shadow-[0_0_15px_rgba(0,229,255,0.4)]" style={{ height: '90%' }}></div>
                        </div>
                        
                        <div className="w-1/2 h-1 bg-white/5 rounded-full mx-auto mt-4 sm:mt-6"></div>
                    </div>

                    <div className="absolute bottom-12 sm:bottom-24 right-0 sm:right-4 w-[180px] sm:w-[320px] bg-[#0A0D14] rounded-xl sm:rounded-2xl border border-[#00e5ff]/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-1.5 sm:p-2 z-40 transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-full relative rounded-lg overflow-hidden border border-white/5 bg-[#060913]">
                            <Image src="/blvda img/vda-fluxo-vendas.webp" alt="Fluxo de Vendas VDA" width={300} height={200} sizes="(max-width: 640px) 180px, 320px" className="w-full h-auto object-cover" loading="lazy" decoding="async" />
                            <div className="absolute bottom-0 left-0 w-full h-1.5 sm:h-2 bg-white/10">
                                <div className="h-full bg-[#00e5ff] w-[100%] shadow-[0_0_10px_rgba(0,229,255,0.6)]"></div>
                            </div>
                        </div>
                        <div className="p-3 sm:p-4 text-left">
                            <div className="w-full h-1.5 sm:h-2 bg-white/5 rounded-full mb-2"></div>
                            <div className="w-2/3 h-1.5 sm:h-2 bg-[#00e5ff]/20 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="mt-20 sm:mt-28 mb-8 sm:mb-12 w-full flex flex-col items-center justify-center relative reveal z-50">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-[650px] h-[60px] bg-white/10 blur-[80px] rounded-full pointer-events-none"></div>
                    
                    <h3 className="font-serif text-center leading-tight tracking-tight relative z-10 max-w-5xl px-4 mx-auto flex flex-col items-center">
                        <span className="block text-[26px] sm:text-[38px] lg:text-[46px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-50 to-slate-300 drop-shadow-[0_0_30px_rgba(255,255,255,0.55)] mb-2 sm:mb-3">
                            Venda sem perder tempo criando sites
                        </span>
                        <span className="block font-light text-slate-300 text-[18px] sm:text-[24px] lg:text-[30px] opacity-85 tracking-wide leading-relaxed max-w-4xl drop-shadow-none">
                            ou arriscando seu <strong className="font-medium text-white/95">capital</strong><br />
                            em testes sem fim.
                        </span>
                    </h3>
                    {/* Pricing summary — sem botão */}
                    <div className="mt-10 flex flex-col items-center gap-1.5">
                        <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/25">Quanto você precisa investir</p>
                        <div className="flex items-baseline gap-1.5 mt-1">
                            <span className="text-[13px] text-white/40 font-light">R$</span>
                            <span className="text-[28px] font-black text-white leading-none" style={{ textShadow: '0 0 20px rgba(249,115,22,0.3)' }}>97,00</span>
                            <span className="text-[11px] text-white/30 font-light">pagamento único</span>
                        </div>
                        <p className="text-[11px] text-white/25 font-light tracking-wide">Sem mensalidade. Sem taxas escondidas.</p>
                    </div>
                </div>
            </div>
            
            {/* ── Transição entre seções — premium e leve ── */}
            <div className="relative w-full flex flex-col items-center justify-center py-10 pointer-events-none select-none overflow-hidden" aria-hidden="true">
                {/* Gradiente de fade superior */}
                <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#060913] to-transparent" />
                {/* Linha central com glow */}
                <div className="relative flex items-center w-full max-w-xs sm:max-w-md">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-white/20" />
                    {/* Diamante ornamental central */}
                    <div className="mx-3 flex flex-col items-center gap-1">
                        <div className="w-1.5 h-1.5 rotate-45 border border-orange-500/50 bg-orange-500/10 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-white/20" />
                </div>
                {/* Gradiente de fade inferior */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0B0F19] to-transparent" />
            </div>
        </section>
    );
}
