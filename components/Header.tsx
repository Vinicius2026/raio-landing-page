'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuLinks = [
        { href: '#oferta', label: 'Comprar Curso', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z', accent: 'orange-500', num: '01', isInternal: true },
        { href: '/acelerarvendas', label: 'Acelera Chat', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', accent: 'amber-500', num: '02', isInternal: true },
        { href: 'https://app.aurenos.com.br/', label: 'Área de Membros', icon: 'M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z|M21 12a9 9 0 11-18 0 9 9 0 0118 0z', accent: 'slate-300', num: '03', isExternal: true },
        { href: 'https://app.cakto.com.br/student/courses', label: 'Acessar Aulas', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', accent: 'purple-400', num: '04', isExternal: true },
        { href: 'https://app.aurenos.com.br', label: 'Painel VDA', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', accent: '[#00e5ff]', num: '05', isExternal: true },
        { href: 'https://wa.me/5521968960966?text=Quero%20falar%20com%20suporte%20da%20VDA.%20ID001428', label: 'Suporte', icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', accent: 'emerald-400', num: '06', isExternal: true },
    ];

    const internalLinks = menuLinks.filter(l => l.isInternal);
    const externalLinks = menuLinks.filter(l => l.isExternal);

    const renderLink = (link: typeof menuLinks[0]) => {
        const paths = link.icon.split('|');
        const inner = (
            <div className="flex items-center gap-3.5 w-full py-2.5 group">
                {/* Número em miniatura */}
                <span className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-white/15 transition-colors duration-300">
                    <span className="text-[8px] font-mono font-bold tracking-wider text-white/25 group-hover:text-white/50 transition-colors duration-300">{link.num}</span>
                </span>
                {/* Icon */}
                <svg className={`w-[15px] h-[15px] text-slate-500 group-hover:text-${link.accent} transition-colors duration-300 flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    {paths.map((d, pi) => <path key={pi} strokeLinecap="round" strokeLinejoin="round" d={d} />)}
                </svg>
                {/* Label */}
                <span className="text-[14px] font-sans font-medium text-slate-400 group-hover:text-white tracking-wide transition-all duration-300 group-hover:translate-x-0.5">{link.label}</span>
                {/* Arrow */}
                <svg className="w-3 h-3 text-white/10 group-hover:text-white/30 ml-auto flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </div>
        );

        if (link.isExternal) {
            return <a key={link.num} href={link.href} target="_blank" rel="noopener noreferrer" onClick={toggleMenu} className="block border-b border-white/[0.04] last:border-b-0">{inner}</a>;
        }
        return <Link key={link.num} href={link.href} onClick={toggleMenu} className="block border-b border-white/[0.04] last:border-b-0">{inner}</Link>;
    };

    return (
        <>
            {/* Floating hamburger */}
            <header className="fixed top-0 left-0 w-full z-50 h-[56px] md:h-[72px] flex items-center pointer-events-none mt-2 md:mt-3">
                <div className="max-w-7xl mx-auto px-5 w-full flex items-center justify-end">
                    <button
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMenuOpen}
                        className="pointer-events-auto flex flex-col justify-center items-end w-9 h-9 space-y-[3px] z-[60] cursor-pointer bg-black/30 backdrop-blur-md p-2 rounded-lg border border-white/[0.06] shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-black/50 hover:border-white/10 group"
                    >
                        <span
                            className="block h-[1px] bg-white/70 transition-all duration-300 group-hover:bg-orange-500"
                            style={{
                                width: isMenuOpen ? '20px' : '17px',
                                transform: isMenuOpen ? 'rotate(-45deg) translate(-5px, 5px)' : 'none'
                            }}
                        />
                        <span
                            className="block h-[1px] bg-white/70 transition-all duration-300 group-hover:bg-orange-500"
                            style={{
                                width: isMenuOpen ? '20px' : '20px',
                                opacity: isMenuOpen ? '0' : '1',
                                transform: isMenuOpen ? 'translateX(8px)' : 'none'
                            }}
                        />
                        <span
                            className="block h-[1px] bg-white/70 transition-all duration-300 group-hover:bg-orange-500"
                            style={{
                                width: isMenuOpen ? '20px' : '13px',
                                transform: isMenuOpen ? 'rotate(45deg) translate(-4px, -4px)' : 'none'
                            }}
                        />
                    </button>
                </div>
            </header>

            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            />

            {/* ── Premium Drawer ── */}
            <div
                className={`fixed inset-y-0 left-0 w-full sm:w-[360px] z-[55] transform transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Glass background */}
                <div className="absolute inset-0 bg-[#030408]/95 backdrop-blur-xl" />

                {/* Subtle grid texture */}
                <div
                    className="absolute inset-0 opacity-[0.025] pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Right border glow */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/8 to-transparent" />

                {/* ── Header ── */}
                <div className="relative z-10 h-[56px] flex items-center justify-between px-5 border-b border-white/[0.05]">
                    <div className="flex items-center gap-2.5">
                        <Image src="/logotipo/logo2.webp" alt="VDA" width={100} height={32} className="h-7 w-auto object-contain opacity-80" />
                    </div>
                    <button onClick={toggleMenu} aria-label="Fechar menu" className="text-white/40 hover:text-white p-1 transition-colors duration-300">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* ── Navigation ── */}
                <nav className="relative z-10 flex-1 flex flex-col px-5 py-6 overflow-y-auto">

                    {/* Seção: Produtos */}
                    <p className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/15 mb-3 px-1">Produtos</p>
                    <div className="mb-5">
                        {internalLinks.map(renderLink)}
                    </div>

                    {/* Separador decorativo */}
                    <div className="flex items-center gap-2.5 my-3 px-1">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                        <div className="w-1 h-1 rotate-45 bg-white/10" />
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                    </div>

                    {/* Seção: Acesso */}
                    <p className="text-[8px] font-bold tracking-[0.5em] uppercase text-white/15 mb-3 mt-2 px-1">Acesso</p>
                    <div>
                        {externalLinks.map(renderLink)}
                    </div>
                </nav>

                {/* ── Footer ── */}
                <div className="relative z-10 px-5 py-4 border-t border-white/[0.04]">
                    <a href="mailto:contato@aurenos.com" className="text-[10px] tracking-[0.15em] text-white/20 hover:text-white/50 transition-colors duration-300">contato@aurenos.com</a>
                    <p className="text-[9px] tracking-[0.2em] text-white/10 mt-1.5">VDA Produções &copy; 2026</p>
                </div>
            </div>
        </>
    );
}
