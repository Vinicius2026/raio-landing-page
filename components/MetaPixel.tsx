'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { getPixelInitScript } from '@/lib/meta-pixel';

export default function MetaPixel() {
    const [loaded, setLoaded] = useState(false);
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

    useEffect(() => {
        if (!loaded) {
            setLoaded(true);
        } else if (typeof window !== 'undefined' && (window as any).fbq) {
            // Fogo do PageView real apenas quando a rota muda ativamente, 
            // e NÃO quando o React apenas atualiza algum UI State no Layout
            (window as any).fbq('track', 'PageView');
        }
    }, [pathname, searchParams, loaded]);

    if (!pixelId) return null;

    return (
        <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: getPixelInitScript(pixelId)
            }}
        />
    );
}
