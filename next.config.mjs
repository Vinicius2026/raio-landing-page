/** @type {import('next').NextConfig} */
const nextConfig = {
    // ── Otimização de Imagens (PageSpeed) ──────────────────────────────────────
    // Next.js entrega automaticamente AVIF e WebP quando o browser suporta,
    // reduzindo o peso das imagens em 30-50% sem alterar qualidade ou código.
    images: {
        formats: ['image/avif', 'image/webp'],
        // Tamanhos responsivos otimizados para mobile-first
        deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 64, 96, 128, 200, 256, 384],
        minimumCacheTTL: 31536000, // 1 ano
    },

    // ── Headers de Cache para Assets Estáticos ─────────────────────────────────
    async headers() {
        return [
            {
                // Aplica cache longo a todos os assets estáticos do Next.js
                source: '/_next/static/(.*)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Cache de 1 semana para imagens, vídeos e fontes da pasta /public
                source: '/(.*\\.(?:webp|png|jpg|jpeg|svg|mp4|woff2|woff|ttf))',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=604800, stale-while-revalidate=86400',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
