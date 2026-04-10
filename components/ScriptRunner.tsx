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

        // Animação movida e otimizada unicamente no HeroSection.tsx para evitar Memory Leak

    }, []);

    return null;
}
