'use client';
import { MouseEvent } from 'react';

type JoinGroupButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export default function JoinGroupButton({ href, children, className }: JoinGroupButtonProps) {
    const handleCheckoutClick = async (e: MouseEvent<HTMLAnchorElement>) => {
        // Gera um event_id único para deduplicação entre Pixel e CAPI
        const eventId = typeof crypto !== 'undefined' && crypto.randomUUID 
            ? crypto.randomUUID() 
            : `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        
        const timestamp = Math.floor(Date.now() / 1000);

        try {
            // Dispara evento no Pixel (se instalado globalmente no head, o fbq estará disponivel)
            if (typeof window !== 'undefined' && (window as any).fbq) {
                (window as any).fbq('track', 'InitiateCheckout', {
                    content_name: 'VDA Premium',
                    currency: 'BRL',
                    value: 97.00
                }, { eventID: eventId });
            }

            // Dispara evento via Conversion API (CAPI) pro lado do servidor
            await fetch('/api/meta-capi', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    eventName: 'InitiateCheckout',
                    eventID: eventId,
                    customData: {
                        currency: 'BRL',
                        value: 97.00,
                        content_name: 'VDA Premium'
                    },
                    timestamp: timestamp
                })
            }).catch(err => console.error('CAPI Client Error:', err));

        } catch (error) {
            console.error('Meta Event Tracking Error:', error);
        }
        
        // A navegação ocorre naturalmente através do href da tag <a/>
    };

    return (
        <a 
            href={href} 
            onClick={handleCheckoutClick}
            className={className || "block px-6 py-4 rounded-xl font-bold text-[14px] md:text-[16px] text-white uppercase text-center bg-[#21c55e] shadow-[0_0_20px_rgba(33,197,94,0.4)] hover:shadow-[0_0_40px_rgba(33,197,94,0.6)] hover:bg-[#1daf52] transform hover:scale-[1.03] transition-all duration-300"}
        >
            {children}
        </a>
    );
}
