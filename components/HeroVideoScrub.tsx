'use client';

import { useEffect, useRef } from 'react';
import HeroCTAButton from './HeroCTAButton';

/**
 * HeroVideoScrub — Efeito Apple-style scroll-driven video + névoa dinâmica
 *
 * Técnica:
 *  - Container 170vh = zona de scroll compacta (reduzida da antiga 280vh)
 *  - Vídeo sticky fixo durante a zona
 *  - Lerp mais agressivo (0.25) = resposta mais rápida ao scroll
 *  - Névoa SVG sincronizada com scroll: sobe/desce conforme o progresso
 *  - requestAnimationFrame único para tudo (performance máxima)
 *  - preload="auto" + muted = seeking fluido no browser
 *  - Sem seta de scroll (removida conforme solicitado)
 */
export default function HeroVideoScrub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fogRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        const fog = fogRef.current;
        if (!container || !video || !fog) return;

        // Lerp: interpolação suave. 0.25 = resposta rápida mas ainda fluida
        const lerp = (current: number, target: number, factor: number) =>
            current + (target - current) * factor;

        let currentTime = 0;
        let currentFogY = 100; // começa totalmente abaixo (fora da tela)

        const animate = () => {
            const containerRect = container.getBoundingClientRect();
            const containerHeight = containerRect.height;
            const windowHeight = window.innerHeight;

            // Progresso 0→1 dentro da zona de scroll
            const scrolled = -containerRect.top;
            const scrollableDistance = containerHeight - windowHeight;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

            // ── Vídeo ──
            if (video.duration && !isNaN(video.duration)) {
                const targetTime = progress * video.duration;
                currentTime = lerp(currentTime, targetTime, 0.25);
                if (Math.abs(currentTime - video.currentTime) > 0.008) {
                    video.currentTime = currentTime;
                }
            }

            // ── Névoa ──
            // translateY: 100% = escondida abaixo, 0% = totalmente sobre o vídeo
            // A névoa surge conforme o usuário desce (progress > 0.3 começa aparecer)
            const fogProgress = Math.max(0, (progress - 0.15) / 0.85);
            const targetFogY = (1 - fogProgress) * 80; // de 80% abaixo até 0% (posição final)
            currentFogY = lerp(currentFogY, targetFogY, 0.08); // lerp mais lento = névoa dramática

            fog.style.transform = `translateY(${currentFogY}%)`;
            fog.style.opacity = String(Math.min(1, fogProgress * 1.2));

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        // Container 170vh cria a zona de scroll para scrubbing.
        // O sticky tem 100vh — logo, sobram 70vh de container "morto" após o scrub.
        // marginBottom: '-70vh' cancela exatamente esse espaço → sem gap preto.
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: '170vh', marginBottom: '-70vh' }}
            id="hero-scroll-container"
        >
            {/* Wrapper sticky */}
            <div
                className="sticky top-0 w-full overflow-hidden bg-[#0B0F19]"
                style={{ height: '100vh' }}
            >
                {/* ── Vídeo ── */}
                <video
                    ref={videoRef}
                    src="/banner home vda astronauta 1/hero-vda-lp.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                    autoPlay={false}
                    aria-hidden="true"
                />

                {/* ── Overlay de leitura (gradiente padrão) ── */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(11,15,25,0.35) 0%, rgba(11,15,25,0.50) 45%, rgba(11,15,25,0.88) 82%, #0B0F19 100%)',
                    }}
                    aria-hidden="true"
                />

                {/* ── Névoa / Mist dinâmica ── */}
                {/*
                    SVG noise turbulence cria a textura orgânica da névoa.
                    O elemento sobe conforme o scroll avança (controlado via JS acima).
                    opacity também varia para reforçar o efeito de emergence.
                */}
                <div
                    ref={fogRef}
                    className="absolute inset-x-0 bottom-0 z-[15] pointer-events-none"
                    style={{
                        height: '70%',
                        opacity: 0,
                        willChange: 'transform, opacity',
                        // Gradiente de névoa: parte de baixo sólida, parte de cima transparente
                        background:
                            'linear-gradient(to top, rgba(11,15,25,0.0) 0%, rgba(11,15,25,0.0) 0%)',
                    }}
                    aria-hidden="true"
                >
                    {/* Camada 1 — névoa base (azulada-escura) */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1440 800"
                        preserveAspectRatio="xMidYMid slice"
                        style={{ opacity: 0.55 }}
                        aria-hidden="true"
                    >
                        <defs>
                            <filter id="fog-blur-1" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence
                                    type="fractalNoise"
                                    baseFrequency="0.012 0.008"
                                    numOctaves="4"
                                    seed="2"
                                    result="noise"
                                />
                                <feDisplacementMap
                                    in="SourceGraphic"
                                    in2="noise"
                                    scale="120"
                                    xChannelSelector="R"
                                    yChannelSelector="G"
                                    result="displaced"
                                />
                                <feGaussianBlur in="displaced" stdDeviation="18" result="blurred" />
                                <feComposite in="blurred" in2="SourceGraphic" operator="in" />
                            </filter>
                            <linearGradient id="fog-gradient-1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0B0F19" stopOpacity="0" />
                                <stop offset="40%" stopColor="#0d1320" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#0B0F19" stopOpacity="0.9" />
                            </linearGradient>
                        </defs>
                        <rect
                            width="1440"
                            height="800"
                            fill="url(#fog-gradient-1)"
                            filter="url(#fog-blur-1)"
                        />
                    </svg>

                    {/* Camada 2 — névoa superior (mais suave, texturizada) */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1440 800"
                        preserveAspectRatio="xMidYMid slice"
                        style={{ opacity: 0.65, mixBlendMode: 'screen' }}
                        aria-hidden="true"
                    >
                        <defs>
                            <filter id="fog-blur-2" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence
                                    type="turbulence"
                                    baseFrequency="0.008 0.005"
                                    numOctaves="3"
                                    seed="7"
                                    result="noise2"
                                />
                                <feGaussianBlur in="noise2" stdDeviation="30" result="softNoise" />
                                <feBlend in="SourceGraphic" in2="softNoise" mode="multiply" />
                            </filter>
                            <radialGradient id="fog-gradient-2" cx="50%" cy="80%" r="70%">
                                <stop offset="0%" stopColor="#1a2035" stopOpacity="0.7" />
                                <stop offset="60%" stopColor="#0B0F19" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <ellipse
                            cx="720"
                            cy="750"
                            rx="900"
                            ry="400"
                            fill="url(#fog-gradient-2)"
                            filter="url(#fog-blur-2)"
                        />
                    </svg>

                    {/* Camada 3 — filling sólido embaixo */}
                    <div
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                            height: '40%',
                            background:
                                'linear-gradient(to top, #0B0F19 0%, rgba(11,15,25,0.7) 60%, transparent 100%)',
                        }}
                    />
                </div>

                {/* ── Conteúdo Hero ── */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center h-full px-4 sm:px-6 lg:px-8 pt-[80px]">
                    <div>
                        <span className="block text-[10px] font-bold tracking-[0.45em] text-white/30 uppercase mb-5">
                            Aurenos
                        </span>
                        <div className="flex items-center justify-center gap-4 mb-6 mx-auto">
                            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
                            <span className="text-[10px] sm:text-xs font-bold text-slate-300 uppercase tracking-[0.3em] drop-shadow-lg">
                                A Jornada do Zero ao Lucro
                            </span>
                            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
                        </div>

                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 max-w-3xl mx-auto drop-shadow-2xl text-white">
                            Venda os{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#D4AF37]">
                                produtos da VDA
                            </span>{' '}
                            direto no Whatsapp.
                        </h1>

                        <p className="text-[10px] sm:text-xs text-[#94A3B8] font-medium tracking-wide leading-relaxed mb-8 max-w-md mx-auto drop-shadow-md">
                            Entregamos uma lista de produtos e ensinamos todo passo a passo para você vender pelo whatsapp.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-auto">
                            <HeroCTAButton />
                            <p className="text-xs text-slate-400 mt-2 font-medium">
                                Role a página para descobrir o sistema.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
