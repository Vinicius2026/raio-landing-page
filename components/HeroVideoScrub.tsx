'use client';

import { useEffect, useRef } from 'react';
import HeroCTAButton from './HeroCTAButton';

/**
 * HeroVideoScrub — Vídeo hero-vda-lp.mp4 controlado pelo scroll
 *
 * Como funciona:
 *  - O vídeo é carregado com preload="auto" + muted + playsinline
 *  - Aguardamos o evento "loadeddata" para saber que o vídeo está pronto
 *  - O scroll progress (0→1) é mapeado diretamente para video.currentTime
 *  - Setamos currentTime diretamente — sem lerp no tempo (lerp em currentTime
 *    causa seeking contínuo para posições intermediárias e trava o vídeo)
 *  - requestAnimationFrame lê o scroll a cada frame do monitor (60fps)
 *  - Névoa SVG sincronizada sobe/desce com o scroll
 */
export default function HeroVideoScrub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fogRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const isReadyRef = useRef(false);
    const lastProgressRef = useRef(-1);
    const currentFogYRef = useRef(80);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        const fog = fogRef.current;
        if (!container || !video || !fog) return;

        // Lerp apenas para a névoa (não para o vídeo)
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        // Quando o vídeo estiver pronto para seeking
        const onReady = () => {
            isReadyRef.current = true;
            // Congela no frame 0
            video.currentTime = 0;
        };

        // O evento mais confiável para saber que seeking está disponível
        video.addEventListener('loadeddata', onReady, { once: true });

        // fallback: se o vídeo já estava carregado antes do mount
        if (video.readyState >= 2) onReady();

        // Loop de animação — lê scroll e atualiza vídeo + névoa
        const animate = () => {
            const containerRect = container.getBoundingClientRect();
            const scrolled = -containerRect.top;
            const scrollableDistance = containerRect.height - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

            // ── Vídeo ──
            // Só atualiza se o vídeo está pronto E o progresso mudou de fato
            if (isReadyRef.current && video.duration && !isNaN(video.duration)) {
                const targetTime = progress * video.duration;
                // Tolerância de 0.04s para não fazer seeking desnecessário em cada frame
                if (Math.abs(targetTime - video.currentTime) > 0.04) {
                    video.currentTime = targetTime;
                    lastProgressRef.current = progress;
                }
            }

            // ── Névoa dinâmica ──
            // Começa a surgir a partir de 15% de scroll
            const fogProgress = Math.max(0, (progress - 0.15) / 0.85);
            const targetFogY = (1 - fogProgress) * 80;
            currentFogYRef.current = lerp(currentFogYRef.current, targetFogY, 0.07);

            fog.style.transform = `translateY(${currentFogYRef.current.toFixed(2)}%)`;
            fog.style.opacity = String(Math.min(1, fogProgress * 1.3).toFixed(3));

            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
            video.removeEventListener('loadeddata', onReady);
        };
    }, []);

    return (
        // 170vh = zona de scroll. marginBottom cancela os 70vh de espaço morto.
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: '170vh', marginBottom: '-70vh' }}
            id="hero-scroll-container"
        >
            {/* Sticky: fica fixo na viewport durante todo o scroll da zona */}
            <div
                className="sticky top-0 w-full overflow-hidden bg-[#0B0F19]"
                style={{ height: '100vh' }}
            >
                {/* ── Vídeo hero-vda-lp.mp4 ── */}
                <video
                    ref={videoRef}
                    src="/banner home vda astronauta 1/hero-vda-lp.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                    // autoPlay={false} — não autoplay, scroll controla o frame
                    aria-hidden="true"
                />

                {/* Overlay gradiente para legibilidade do texto */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(11,15,25,0.3) 0%, rgba(11,15,25,0.45) 40%, rgba(11,15,25,0.85) 80%, #0B0F19 100%)',
                    }}
                    aria-hidden="true"
                />

                {/* ── Névoa dinâmica sincronizada com o scroll ── */}
                <div
                    ref={fogRef}
                    className="absolute inset-x-0 bottom-0 z-[15] pointer-events-none"
                    style={{
                        height: '75%',
                        opacity: 0,
                        transform: 'translateY(80%)',
                        willChange: 'transform, opacity',
                    }}
                    aria-hidden="true"
                >
                    {/* Camada base — turbulência fractal */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1440 800"
                        preserveAspectRatio="xMidYMid slice"
                        style={{ opacity: 0.6 }}
                        aria-hidden="true"
                    >
                        <defs>
                            <filter id="fog-f1" x="-20%" y="-20%" width="140%" height="140%">
                                <feTurbulence type="fractalNoise" baseFrequency="0.012 0.008" numOctaves="4" seed="2" />
                                <feGaussianBlur stdDeviation="22" />
                            </filter>
                            <linearGradient id="fog-lg1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0B0F19" stopOpacity="0" />
                                <stop offset="50%" stopColor="#0d1320" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#0B0F19" stopOpacity="0.95" />
                            </linearGradient>
                        </defs>
                        <rect width="1440" height="800" fill="url(#fog-lg1)" filter="url(#fog-f1)" />
                    </svg>

                    {/* Camada radial central */}
                    <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 1440 800"
                        preserveAspectRatio="xMidYMid slice"
                        style={{ opacity: 0.5 }}
                        aria-hidden="true"
                    >
                        <defs>
                            <radialGradient id="fog-rg1" cx="50%" cy="85%" r="65%">
                                <stop offset="0%" stopColor="#1a2035" stopOpacity="0.9" />
                                <stop offset="70%" stopColor="#0B0F19" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#0B0F19" stopOpacity="0" />
                            </radialGradient>
                        </defs>
                        <ellipse cx="720" cy="750" rx="900" ry="380" fill="url(#fog-rg1)" />
                    </svg>

                    {/* Preenchimento sólido na base */}
                    <div
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                            height: '35%',
                            background:
                                'linear-gradient(to top, #0B0F19 0%, rgba(11,15,25,0.8) 60%, transparent 100%)',
                        }}
                    />
                </div>

                {/* ── Conteúdo do Hero ── */}
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
