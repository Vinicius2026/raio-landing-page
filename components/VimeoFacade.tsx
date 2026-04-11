'use client';
import { useState, useRef, useEffect } from 'react';

export default function VimeoFacade({ videoId, title }: { videoId: string, title: string }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsLoaded(true);
                observer.disconnect();
            }
        }, { rootMargin: "50% 0px" }); // Carrega quando o vídeo estiver 50% de distância da tela (Lazy agressivo e imperceptível)

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className="relative w-full aspect-[9/16] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-black shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <div className={`absolute inset-0 bg-[#0B0F19] flex items-center justify-center transition-opacity duration-700 ${isLoaded ? 'opacity-0 z-0' : 'opacity-100 z-20 animate-pulse'}`}>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-t-2 border-orange-500 animate-spin"></div>
                    <span className="text-[10px] text-orange-500/70 font-semibold uppercase tracking-widest">Carregando player...</span>
                </div>
            </div>
            
            {isLoaded && (
                <iframe 
                    src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: 'inherit' }}
                    title={title}
                    className="z-10 relative border-0"
                    loading="lazy"
                />
            )}
        </div>
    );
}
