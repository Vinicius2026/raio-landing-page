import type { Metadata, Viewport } from 'next'
import { Cormorant, Montserrat } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import ScriptRunner from '@/components/ScriptRunner'
import CookieBanner from '@/components/CookieBanner'

const cormorant = Cormorant({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-cormorant',
    display: 'swap',
    preload: true,
})

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700', '900'],
    variable: '--font-montserrat',
    display: 'swap',
    preload: true,
})

const BASE_URL = 'https://metodovda.com'

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    themeColor: '#0B0F19',
}

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    title: {
        default: 'VDA – Venda Direta Automática | Método de Vendas pelo WhatsApp',
        template: '%s | VDA',
    },
    description:
        'Aprenda a vender de forma profissional e sistemática pelo WhatsApp com o Método VDA de Thiago Lima. Treinamento completo com bônus exclusivos.',
    keywords: [
        'VDA',
        'Venda Direta Automática',
        'Thiago Lima',
        'vender no WhatsApp',
        'afiliado digital',
        'curso de vendas',
        'marketing digital',
        'método de vendas online',
    ],
    authors: [{ name: 'Thiago Lima', url: BASE_URL }],
    creator: 'Thiago Lima',
    publisher: 'VDA – Venda Direta Automática',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: BASE_URL,
    },
    icons: {
        icon: [
            { url: '/favicon.svg', type: 'image/svg+xml' },
            { url: '/favicon.ico', sizes: 'any' },
        ],
        apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
    openGraph: {
        type: 'website',
        locale: 'pt_BR',
        url: BASE_URL,
        siteName: 'VDA – Venda Direta Automática',
        title: 'VDA – Venda Direta Automática | Método de Vendas pelo WhatsApp',
        description:
            'Aprenda a vender de forma profissional e sistemática pelo WhatsApp com o Método VDA de Thiago Lima.',
        images: [
            {
                url: `${BASE_URL}/og-image.png`,
                width: 1200,
                height: 630,
                alt: 'VDA – Venda Direta Automática por Thiago Lima',
                type: 'image/png',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@thiagolimaslv',
        creator: '@thiagolimaslv',
        title: 'VDA – Venda Direta Automática | Thiago Lima',
        description:
            'Método VDA: aprenda a vender pelo WhatsApp de forma sistemática e profissional.',
        images: [`${BASE_URL}/og-image.png`],
    },
    other: {
        'format-detection': 'telephone=no',
        HandheldFriendly: 'true',
        MobileOptimized: 'width',
        'apple-mobile-web-app-title': 'VDA',
        'og:image:secure_url': `${BASE_URL}/og-image.png`,
        'itemprop:image': `${BASE_URL}/og-image.png`,
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR" className={`${cormorant.variable} ${montserrat.variable} scroll-smooth`}>
            <head>
                {/* In-app browser & PWA compatibility */}
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
                <meta name="apple-mobile-web-app-title" content="VDA" />
                {/* Referrer policy to preserve UTM params */}
                <meta name="referrer" content="no-referrer-when-downgrade" />
                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Course',
                            name: 'VDA – Venda Direta Automática',
                            description:
                                'Método completo para aprender a vender de forma profissional e sistemática pelo WhatsApp.',
                            provider: {
                                '@type': 'Person',
                                name: 'Thiago Lima',
                                sameAs: [
                                    'https://instagram.com/thiagolimaslv',
                                    'https://youtube.com/@thiagolimaslv',
                                ],
                            },
                            url: BASE_URL,
                            image: `${BASE_URL}/og-image.png`,
                            inLanguage: 'pt-BR',
                            offers: {
                                '@type': 'Offer',
                                price: '97.00',
                                priceCurrency: 'BRL',
                                availability: 'https://schema.org/InStock',
                                url: 'https://pay.kiwify.com.br/WJb9F4T',
                            },
                        }),
                    }}
                />
            </head>
            <body className={`bg-[#0B0F19] text-slate-50 font-sans antialiased selection:bg-orange-500 selection:text-white relative overflow-x-hidden min-h-screen flex flex-col`}>
                <div className="fixed inset-0 pointer-events-none z-[-1]">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full md:blur-[120px] blur-[60px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#D4AF37]/10 rounded-full md:blur-[120px] blur-[60px]"></div>
                </div>
                {children}
                <ScriptRunner />
                <CookieBanner />
                {process.env.NEXT_PUBLIC_META_PIXEL_ID && (
                    <Script
                        id="meta-pixel"
                        strategy="afterInteractive"
                        dangerouslySetInnerHTML={{
                            __html: `
                                !function(f,b,e,v,n,t,s)
                                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                                n.queue=[];t=b.createElement(e);t.async=!0;
                                t.src=v;s=b.getElementsByTagName(e)[0];
                                s.parentNode.insertBefore(t,s)}(window, document,'script',
                                'https://connect.facebook.net/en_US/fbevents.js');
                                fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
                                fbq('track', 'PageView');
                            `,
                        }}
                    />
                )}
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src={`https://www.facebook.com/tr?id=${process.env.NEXT_PUBLIC_META_PIXEL_ID}&ev=PageView&noscript=1`}
                        alt=""
                    />
                </noscript>
            </body>
        </html>
    )
}
