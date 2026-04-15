'use client';

import { useEffect, useRef } from 'react';
import HeroCTAButton from './HeroCTAButton';

/**
 * HeroVideoScrub — hero-vda-lp.mp4 controlado pelo scroll
 *
 * Compatibilidade mobile (iOS Safari / Android):
 *  - iOS bloqueia video.currentTime seeking sem interação do usuário
 *  - Solução: chamar play() + pause() imediatamente para "desbloquear" o vídeo
 *  - Em touchstart (1º toque) também tentamos desbloquear
 *  - Enquanto o vídeo não está pronto, mostramos o frame 0 (WebP) como fallback
 *  - poster= também ajuda a mostrar algo imediatamente antes de qualquer interação
 */
export default function HeroVideoScrub() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const fogRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const isUnlockedRef = useRef(false);
    const currentFogYRef = useRef(80);

    useEffect(() => {
        const container = containerRef.current;
        const video = videoRef.current;
        const fog = fogRef.current;
        if (!container || !video || !fog) return;

        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

        /**
         * Técnica padrão para desbloquear seeking em iOS/Android.
         * iOS Safari exige que o vídeo "tente" tocar antes de permitir seeking manual.
         * Chamamos play() silenciosamente e pausamos imediatamente.
         */
        const unlockVideo = () => {
            if (isUnlockedRef.current) return;
            const promise = video.play();
            if (promise !== undefined) {
                promise
                    .then(() => {
                        video.pause();
                        video.currentTime = 0;
                        isUnlockedRef.current = true;
                    })
                    .catch(() => {
                        // iOS com restrições muito rígidas — fallback via poster já está ativo
                    });
            } else {
                video.pause();
                video.currentTime = 0;
                isUnlockedRef.current = true;
            }
        };

        // Tenta desbloquear imediatamente (funciona no Android e desktop)
        unlockVideo();

        // No iOS, o desbloqueio só ocorre após primeira interação do usuário
        const onFirstTouch = () => {
            unlockVideo();
            document.removeEventListener('touchstart', onFirstTouch);
        };
        document.addEventListener('touchstart', onFirstTouch, { passive: true });

        // Quando o vídeo reportar que pode ser usado para seeking
        const onCanPlay = () => {
            if (!isUnlockedRef.current) unlockVideo();
        };
        video.addEventListener('canplay', onCanPlay);

        // Loop RAF: lê o scroll e atualiza currentTime + névoa
        const animate = () => {
            const containerRect = container.getBoundingClientRect();
            const scrolled = -containerRect.top;
            const scrollableDistance = containerRect.height - window.innerHeight;
            const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

            // ── Vídeo ──
            if (isUnlockedRef.current && video.duration && !isNaN(video.duration)) {
                const targetTime = progress * video.duration;
                if (Math.abs(targetTime - video.currentTime) > 0.04) {
                    video.currentTime = targetTime;
                }
            }

            // ── Névoa ──
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
            video.removeEventListener('canplay', onCanPlay);
            document.removeEventListener('touchstart', onFirstTouch);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: '170vh', marginBottom: '-70vh' }}
            id="hero-scroll-container"
        >
            <div
                className="sticky top-0 w-full overflow-hidden bg-[#0B0F19]"
                style={{ height: '100vh' }}
            >
                {/* Vídeo com poster para exibição imediata em mobile antes do unlock */}
                <video
                    ref={videoRef}
                    src="/banner home vda astronauta 1/hero-vda-lp.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                    // poster garante que algo visível aparece antes de qualquer interação
                    poster="/banner home vda astronauta 1/Astronaut_standing_in_ocean_delpmaspu__000.webp"
                    aria-hidden="true"
                />

                {/* Overlay gradiente */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        background:
                            'linear-gradient(to bottom, rgba(11,15,25,0.3) 0%, rgba(11,15,25,0.45) 40%, rgba(11,15,25,0.85) 80%, #0B0F19 100%)',
                    }}
                    aria-hidden="true"
                />

                {/* Névoa dinâmica */}
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

                    <div
                        className="absolute bottom-0 left-0 right-0"
                        style={{
                            height: '35%',
                            background: 'linear-gradient(to top, #0B0F19 0%, rgba(11,15,25,0.8) 60%, transparent 100%)',
                        }}
                    />
                </div>

                {/* Conteúdo */}
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
