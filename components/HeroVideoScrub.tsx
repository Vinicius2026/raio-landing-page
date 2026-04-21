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
 *  - poster= mostra hero-imagem-lp.webp antes de qualquer interação
 *
 * Efeito de véu (substituiu névoa SVG):
 *  - CSS gradient puro animado via style inline — zero custo de SVG filters
 *  - Véu escuro sobe de baixo conforme o scroll avança (opacity + translateY)
 *  - Muito mais fluido e leve que feTurbulence/feGaussianBlur
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

        // Desbloqueio de seeking em iOS/Android
        // iOS Safari exige que o vídeo "tente" tocar antes de permitir currentTime manual
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
                        // iOS restrito — poster (hero-imagem-lp.webp) já visível como fallback
                    });
            } else {
                video.pause();
                video.currentTime = 0;
                isUnlockedRef.current = true;
            }
        };

        unlockVideo();
        const onFirstTouch = () => { unlockVideo(); document.removeEventListener('touchstart', onFirstTouch); };
        document.addEventListener('touchstart', onFirstTouch, { passive: true });
        const onCanPlay = () => { if (!isUnlockedRef.current) unlockVideo(); };
        video.addEventListener('canplay', onCanPlay);

        // Loop RAF: lê scroll → atualiza vídeo + véu CSS
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

            // ── Véu de transição (substitui névoa SVG pesada) ──
            // Véu CSS puro: opacidade sobe suavemente conforme o scroll avança
            // Começa a aparecer a partir de 20% de progresso
            const veilProgress = Math.max(0, (progress - 0.20) / 0.80);
            const targetVeilOpacity = veilProgress;
            currentFogYRef.current = lerp(currentFogYRef.current, targetVeilOpacity, 0.06);
            // Véu escurece de baixo para cima via background-position
            const gradientStop = Math.round((1 - currentFogYRef.current) * 30 + 50); // 50% → 80%
            fog.style.opacity = '1';
            fog.style.background = `linear-gradient(to top,
                rgba(11,15,25,${(currentFogYRef.current * 0.95).toFixed(3)}) 0%,
                rgba(11,15,25,${(currentFogYRef.current * 0.65).toFixed(3)}) ${gradientStop}%,
                rgba(11,15,25,0) 100%
            )`;

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
                {/* Vídeo com poster correto (hero-imagem-lp.webp) visível em mobile antes do unlock */}
                <video
                    ref={videoRef}
                    src="/banner home vda astronauta 1/hero-vda-lp.mp4"
                    className="absolute inset-0 w-full h-full object-cover"
                    muted
                    playsInline
                    preload="auto"
                    poster="/banner home vda astronauta 1/hero-imagem-lp.webp"
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

                {/*
                  Véu de transição CSS puro — substitui a névoa SVG pesada.
                  Um único div com background gradient animado via JS:
                  - Zero custo de SVG filters (sem feTurbulence, sem feGaussianBlur)
                  - Só muda a propriedade `background` inline — GPU-friendly
                  - Efeito: escurecimento suave de baixo para cima conforme o scroll
                */}
                <div
                    ref={fogRef}
                    className="absolute inset-x-0 bottom-0 z-[15] pointer-events-none"
                    style={{
                        height: '100%',
                        background: 'transparent',
                        willChange: 'background',
                    }}
                    aria-hidden="true"
                />

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
                            Copie e Cole a Metodologia que Está{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#D4AF37]">
                                Colocando Produtos VDA no Topo das Vendas.
                            </span>
                        </h1>

                        <p className="text-[10px] sm:text-xs text-[#94A3B8] font-medium tracking-wide leading-relaxed mb-8 max-w-md mx-auto drop-shadow-md">
                            Acesso imediato aos produtos, scripts e estratégias de fechamento. O caminho mais curto entre o &ldquo;oi&rdquo; do cliente e o dinheiro na conta.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 w-full sm:w-auto">
                            <HeroCTAButton />
                            <p className="text-xs text-slate-400 mt-2 font-medium">
                                Role a página para descobrir
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
