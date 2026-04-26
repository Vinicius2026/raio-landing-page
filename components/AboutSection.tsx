'use client';
import Image from 'next/image';
import { trackEvent } from '@/lib/meta-pixel';

export default function AboutSection() {
    return (
        <section className="w-full py-16 md:py-24 relative bg-[#060913]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/5 rounded-full md:blur-[100px] blur-[60px] pointer-events-none z-0"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex items-center justify-center gap-4 mb-10">
                    <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-orange-500/40"></div>
                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Sobre o Fundador</span>
                    <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-orange-500/40"></div>
                </div>

                <div className="reveal flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white/[0.03] border border-white/8 rounded-3xl p-7 md:p-10 shadow-[0_4px_60px_rgba(0,0,0,0.5)]">
                    <div className="flex-shrink-0 flex flex-col items-center gap-4">
                        <div className="thiago-img-wrap relative flex items-end justify-center" style={{ minWidth: '200px' }}>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[260px] h-[260px] bg-orange-500/30 rounded-full blur-[60px] pointer-events-none z-0 thiago-glow-main"></div>
                            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-[80px] h-[80px] rounded-full blur-[28px] pointer-events-none z-0" style={{ background: 'rgba(249,115,22,0.45)' }}></div>
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#060913] via-[#060913]/40 to-transparent pointer-events-none z-20"></div>
                            <Image 
                                src="/blvda img/thiago-vda.webp" 
                                alt="Thiago — Fundador VDA" 
                                width={260} 
                                height={260}
                                sizes="(max-width: 640px) 256px, (max-width: 1024px) 256px, 240px"
                                className="relative z-10 w-64 sm:w-64 md:w-60 h-auto object-cover object-top drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] thiago-img" 
                                loading="lazy" 
                                decoding="async" 
                            />
                            <div className="absolute inset-0 z-10 pointer-events-none rounded-none" style={{ background: 'rgba(249,100,10,0.18)', mixBlendMode: 'color', bottom: '48px' }}></div>
                        </div>
                        <span className="text-[9px] text-white/25 uppercase tracking-[0.25em]">Thiago · Fundador VDA</span>
                    </div>

                    <div className="flex-1 text-left">
                        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 text-center md:text-left">
                            Quem é o <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#D4AF37]">Thiago da VDA</span>
                        </h2>

                        <div className="space-y-3 text-sm md:text-[15px] text-white/60 leading-relaxed font-light">
                            <p>Atua ativamente com <strong className="text-white/80 font-medium">vendas digitais via WhatsApp</strong>, aplicando no dia a dia as mesmas estratégias que ensina dentro da VDA.</p>
                            <p>Possui <strong className="text-white/80 font-medium">vasta experiência como estrategista</strong> de vendas diretas, dominando desde a captação de leads até o fechamento no WhatsApp com alta conversão.</p>
                            <p>É o <strong className="text-white/80 font-medium">criador do método VDA</strong> e desenvolvedor de times comerciais que operam de forma escalável utilizando o WhatsApp como principal canal de vendas.</p>
                        </div>

                        <div className="mt-8 flex justify-center md:justify-start">
                            <a 
                                href="https://chat.whatsapp.com/HasGl6O2FvcCOJp3RxG8Pm?mode=gi_t" 
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackEvent('InitiateCheckout', { value: 97.00, currency: 'BRL', content_name: 'VDA Premium' })}
                                className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl font-bold text-sm text-white uppercase tracking-widest overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.55)] hover:scale-[1.03] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10">
                                <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"></span>
                                <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,1)] flex-shrink-0"></span>
                                Entrar para VDA
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Disclaimer Importante ── */}
            <div className="max-w-lg mx-auto px-4 mt-14 text-center">
                {/* thin rule */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25))' }} />
                    <span className="text-[9px] font-black tracking-[0.4em] uppercase" style={{ color: 'rgba(212,175,55,0.45)' }}>Importante</span>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.25))' }} />
                </div>

                <p className="font-serif text-xl sm:text-2xl font-bold text-white/90 leading-snug mb-4">
                    Esse método não é promessa milagrosa.
                </p>
                <p className="text-sm text-slate-400 font-light leading-relaxed mb-2">
                    Ele funciona para quem aplica.
                </p>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                    Se você seguir o passo a passo,{' '}
                    <span className="text-white font-medium">você terá tudo o que precisa.</span>
                </p>
            </div>
        </section>
    );
}
