'use client';
import { MouseEvent } from 'react';
import { trackEvent } from '@/lib/meta-pixel';

type JoinGroupButtonProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
};

export default function JoinGroupButton({ href, children, className }: JoinGroupButtonProps) {
    const handleCheckoutClick = async (e: MouseEvent<HTMLAnchorElement>) => {
        // Fire InitiateCheckout via centralized helper (Browser Pixel + CAPI in parallel)
        trackEvent('InitiateCheckout', {
            value: 97.00,
            currency: 'BRL',
            content_name: 'VDA Premium',
        });

        // Navigation happens naturally through the <a> href
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
