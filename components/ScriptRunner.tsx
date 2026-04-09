'use client';
import { useEffect } from 'react';

export default function ScriptRunner() {
    useEffect(() => {
        // --- Reveal Animation Logic (High Performance via IntersectionObserver) --- 
        const reveals = document.querySelectorAll('.reveal');

        if ('IntersectionObserver' in window) {
            const revealObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -50px 0px',
                threshold: 0.05
            });

            reveals.forEach(element => {
                revealObserver.observe(element);
            });
        } else {
            reveals.forEach(el => el.classList.add('active'));
        }

        // --- Hero Canvas Sequence Animation ---
        const canvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
        if (!canvas) return;

        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;
        const heroContainer = document.getElementById('hero-scroll-container');

        const frameCount = 40;
        const images: any[] = new Array(frameCount);
        const isMobileDevice = window.innerWidth < 768;
        
        canvas.width = isMobileDevice ? window.innerWidth * window.devicePixelRatio : 1920;
        canvas.height = isMobileDevice ? window.innerHeight * window.devicePixelRatio : 1080;

        const getFramePath = (index: number) => (
            `/banner home vda astronauta 1/Astronaut_standing_in_ocean_delpmaspu__${index.toString().padStart(3, '0')}.webp`
        );

        const drawImageCover = (ctx: any, img: any, cw: number, ch: number) => {
            const imgW = img.width || img.naturalWidth || 1920;
            const imgH = img.height || img.naturalHeight || 1080;
            const scale = Math.max(cw / imgW, ch / imgH);
            const w = imgW * scale;
            const h = imgH * scale;
            const x = (cw - w) / 2;
            const y = (ch - h) / 2;
            ctx.drawImage(img, x, y, w, h);
        };

        const preloadImages = () => {
            const firstImg = new Image();
            firstImg.src = getFramePath(0);
            firstImg.onload = () => {
                if (isMobileDevice && typeof OffscreenCanvas !== 'undefined') {
                    const oc = new OffscreenCanvas(canvas.width, canvas.height);
                    const ocCtx = oc.getContext('2d', { alpha: false });
                    drawImageCover(ocCtx, firstImg, canvas.width, canvas.height);
                    images[0] = oc;
                    context.drawImage(oc, 0, 0, canvas.width, canvas.height);
                } else {
                    images[0] = firstImg;
                    drawImageCover(context, firstImg, canvas.width, canvas.height);
                }

                setTimeout(() => {
                    for (let i = 1; i < frameCount; i++) {
                        const img = new Image();
                        img.src = getFramePath(i);
                        img.onload = () => {
                            if (isMobileDevice && typeof OffscreenCanvas !== 'undefined') {
                                const oc = new OffscreenCanvas(canvas.width, canvas.height);
                                const ctx = oc.getContext('2d', { alpha: false });
                                drawImageCover(ctx, img, canvas.width, canvas.height);
                                images[i] = oc;
                            } else {
                                images[i] = img;
                            }
                        };
                    }
                }, 300);
            };
        };

        let activeFrameIndex = 0;
        const drawFrame = (index: number) => {
            const imgOrCanvas = images[index];
            if (!imgOrCanvas || activeFrameIndex === index) return;
            
            if (imgOrCanvas.width > 0 || imgOrCanvas.naturalHeight !== 0) {
                if (imgOrCanvas instanceof HTMLImageElement) {
                    drawImageCover(context, imgOrCanvas, canvas.width, canvas.height);
                } else {
                    context.drawImage(imgOrCanvas, 0, 0, canvas.width, canvas.height);
                }
                activeFrameIndex = index;
            }
        };

        const overlay = document.getElementById('hero-overlay');
        const heroBgWrapper = document.getElementById('hero-bg-wrapper');

        const updateScrollAnimation = () => {
            if (!heroContainer) return;
            const scrollTop = Math.max(0, window.scrollY);
            const isMobile = window.innerWidth < 768;
            const scrollMultiplier = isMobile ? 1.5 : 0.8;
            const maxScroll = Math.max(window.innerHeight * scrollMultiplier, 600);
            let scrollFraction = scrollTop / maxScroll;
            scrollFraction = Math.max(0, Math.min(1, scrollFraction));

            const frameIndex = Math.min(
                frameCount - 1,
                Math.floor(scrollFraction * frameCount)
            );

            drawFrame(frameIndex);

            if (overlay) {
                const targetOpacity = 0.4 + (scrollFraction * 0.55);
                overlay.style.opacity = targetOpacity.toString();
            }

            if (heroBgWrapper) {
                if (isMobile) {
                    heroBgWrapper.style.transform = `translate3d(0, 0, 0)`;
                } else {
                    heroBgWrapper.style.transform = `translate3d(0, ${scrollTop * 0.4}px, 0)`;
                }
            }
        };

        preloadImages();

        let ticking = false;
        const scrollListener = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateScrollAnimation();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', scrollListener, { passive: true });

        return () => {
            window.removeEventListener('scroll', scrollListener);
        };
    }, []);

    return null;
}
