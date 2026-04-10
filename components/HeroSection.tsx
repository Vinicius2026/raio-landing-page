'use client';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { trackEvent } from '@/lib/meta-pixel';

export default function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    
    // Suave efeito Parallax usando framer-motion
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.9]);

    return (
        <section ref={containerRef} id="hero-scroll-container" className="relative w-full min-h-[100vh] overflow-hidden flex items-center justify-center py-12 lg:py-16 bg-[#0B0F19] pt-[100px] lg:pt-[80px]">
            {/* Background Image with Parallax */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <motion.div 
                    style={{ y }} 
                    className="relative w-full h-full scale-110"
                >
                    <Image
                        src="/banner home vda astronauta 1/Astronaut_standing_in_ocean_delpmaspu__000.webp"
                        alt="Astronauta VDA - Venda Direta Automática"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                        quality={90}
                    />
                </motion.div>
                
                {/* Overlay dinâmico que escurece ao scrollar */}
                <motion.div 
                    style={{ opacity }}
                    className="absolute inset-0 bg-[#0B0F19] z-10 pointer-events-none"
                ></motion.div>
            </div>

            {/* Centered Content */}
            <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 mt-12 sm:mt-0">
                <div className="reveal">
                    <div className="flex items-center justify-center gap-4 mb-6 mx-auto">
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60"></div>
                        <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-[0.3em] drop-shadow-lg">
                            A Jornada do Zero ao Lucro
                        </span>
                        <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60"></div>
                    </div>

                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-3xl mx-auto drop-shadow-2xl text-white">
                        Venda os <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#D4AF37] text-glow">produtos da VDA</span> direto no Whatsapp.
                    </h1>

                    <p className="text-[10px] sm:text-xs text-[#94A3B8] font-medium tracking-wide leading-relaxed mb-8 max-w-md mx-auto drop-shadow-md">
                        Entregamos uma lista de produtos e ensinamos todo passo a passo para você vender pelo whatsapp.
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-auto">
                        <Link
                            href="#oferta"
                            onClick={() => trackEvent('InitiateCheckout', { value: 97.00, currency: 'BRL', content_name: 'VDA Premium' })}
                            className="w-full sm:w-auto px-6 py-3 text-sm bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer border border-orange-500/50 backdrop-blur-sm">
                            <span>Quero ter a VDA Completa</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        <p className="text-xs text-slate-400 mt-2 font-medium">Role a página para descobrir o sistema.</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-70 animate-bounce cursor-default">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </main>
    );
}
