'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('vda_cookie_consent');
        if (!consent) {
            // Small delay so it doesn't flash on load
            const t = setTimeout(() => setIsVisible(true), 800);
            return () => clearTimeout(t);
        }
    }, []);

    const accept = () => {
        localStorage.setItem('vda_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up"
            style={{ animation: 'fadeInUp .5s ease-out forwards' }}
        >
            <style jsx>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translate(-50%, 16px); }
                    to   { opacity: 1; transform: translate(-50%, 0); }
                }
            `}</style>
            <button
                onClick={accept}
                className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0B0F19]/90 backdrop-blur-lg border border-white/10 hover:border-[#D4AF37]/40 shadow-[0_4px_24px_rgba(0,0,0,.5)] transition-all duration-300 cursor-pointer"
            >
                <span className="text-[12px] text-white/50 font-medium">
                    Usamos cookies
                </span>
                <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-widest group-hover:text-white transition-colors">
                    OK
                </span>
            </button>
        </div>
    );
}
