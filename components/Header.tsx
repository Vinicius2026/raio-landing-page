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

    return (
        <>
            {/* Floating Transparent Navigation Header */}
            <header className="fixed top-0 left-0 w-full z-50 transition-all duration-500 h-[60px] md:h-[80px] flex items-center bg-transparent mt-2 md:mt-4 pointer-events-none">
                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-3 items-center">
                    <div className="flex items-center justify-start"></div>
                    <div className="flex items-center justify-center"></div>
                    <div className="flex items-center justify-end pointer-events-auto">
                        <button 
                            onClick={toggleMenu}
                            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
                            aria-expanded={isMenuOpen}
                            className="flex flex-col justify-center items-end w-10 h-10 space-y-[4px] focus:outline-none z-[60] group cursor-pointer relative overflow-hidden bg-black/20 backdrop-blur-sm p-2 rounded-xl border border-white/5 shadow-2xl transition hover:bg-black/40"
                        >
                            <span 
                                className="block h-[1px] bg-white transition-all duration-300 group-hover:bg-orange-500"
                                style={{
                                    width: isMenuOpen ? '24px' : '20px',
                                    transform: isMenuOpen ? 'rotate(-45deg) translate(-6px, 6px)' : 'none'
                                }}
                            ></span>
                            <span 
                                className="block h-[1px] bg-white transition-all duration-300 group-hover:bg-orange-500"
                                style={{
                                    width: isMenuOpen ? '32px' : '24px',
                                    opacity: isMenuOpen ? '0' : '1',
                                    transform: isMenuOpen ? 'translateX(10px)' : 'none'
                                }}
                            ></span>
                            <span 
                                className="block h-[1px] bg-white transition-all duration-300 group-hover:bg-orange-500"
                                style={{
                                    width: isMenuOpen ? '24px' : '16px',
                                    transform: isMenuOpen ? 'rotate(45deg) translate(-5px, -5px)' : 'none'
                                }}
                            ></span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Overlay */}
            <div 
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleMenu}
            ></div>

            {/* Fullscreen Minimalist Drawer Menu */}
            <div 
                className={`fixed inset-y-0 left-0 w-full sm:w-[400px] bg-[#000000] border-r border-white/5 z-[55] transform transition-transform duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] shadow-2xl flex flex-col ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Drawer Header */}
                <div className="h-[80px] w-full border-b border-white/5 flex items-center justify-end px-6 sm:px-8 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col justify-center items-center px-6 py-2.5 bg-[#030408] rounded-xl border-t border-black/80">
                        <span className="text-[9px] font-bold tracking-[0.4em] text-white/30 uppercase mb-1">Aurenos</span>
                        <Image src="/logotipo/logo2.webp" alt="Venda Direta Automática - Metodologia VDA" width={140} height={45} className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90" />
                    </div>
                    <button onClick={toggleMenu} aria-label="Fechar menu" className="text-white hover:text-orange-500 p-2 transition-transform hover:scale-110 focus:outline-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex flex-col px-8 py-10 gap-8 mt-2 relative z-20">
                    <Link href="#oferta" onClick={toggleMenu} className="mobile-link group flex items-center w-full relative py-2">
                        <div className="absolute left-0 w-10 h-10 rounded-full bg-orange-500/10 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
                        <div className="w-10 h-10 flex items-center justify-center relative z-10 text-slate-500 group-hover:text-orange-500 transition-colors duration-500 shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <span className="text-[26px] font-serif font-light text-slate-300 group-hover:text-white ml-5 transform group-hover:translate-x-2 transition-transform duration-500 z-10 tracking-wide whitespace-nowrap">Comprar Curso</span>
                        <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border-l border-white/10 pl-4 h-full flex items-center">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-orange-500">I</span>
                        </div>
                    </Link>

                    {/* Area de Membros */}
                    <a href="#" onClick={toggleMenu} className="mobile-link group flex items-center w-full relative py-2">
                         <div className="absolute left-0 w-10 h-10 rounded-full bg-slate-100/10 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
                        <div className="w-10 h-10 flex items-center justify-center relative z-10 text-slate-500 group-hover:text-slate-100 transition-colors duration-500 shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="text-[26px] font-serif font-light text-slate-400 group-hover:text-white ml-5 transform group-hover:translate-x-2 transition-transform duration-500 z-10 tracking-wide whitespace-nowrap">Área de Membros</span>
                        <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border-l border-white/10 pl-4 h-full flex items-center">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-white/50">II</span>
                        </div>
                    </a>
                    
                    {/* Painel de Controle */}
                    <a href="https://app.aurenos.com.br" target="_blank" rel="noopener" onClick={toggleMenu} className="mobile-link group flex items-center w-full relative py-2">
                        <div className="absolute left-0 w-10 h-10 rounded-full bg-[#00e5ff]/10 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
                        <div className="w-10 h-10 flex items-center justify-center relative z-10 text-slate-500 group-hover:text-[#00e5ff] transition-colors duration-500 shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </div>
                        <span className="text-[26px] font-serif font-light text-slate-400 group-hover:text-white ml-5 transform group-hover:translate-x-2 transition-transform duration-500 z-10 tracking-wide whitespace-nowrap">Painel de Controle</span>
                        <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border-l border-white/10 pl-4 h-full flex items-center">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#00e5ff]/50">III</span>
                        </div>
                    </a>

                    {/* Chamar Suporte */}
                    <a href="https://wa.me/5521969789507?text=Ol%C3%A1%2C%20tenho%20algumas%20d%C3%BAvidas." target="_blank" rel="noopener" onClick={toggleMenu} className="mobile-link group flex items-center w-full relative py-2">
                        <div className="absolute left-0 w-10 h-10 rounded-full bg-[#10B981]/10 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"></div>
                        <div className="w-10 h-10 flex items-center justify-center relative z-10 text-slate-500 group-hover:text-[#10B981] transition-colors duration-500 shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </div>
                        <span className="text-[26px] font-serif font-light text-slate-400 group-hover:text-white ml-5 transform group-hover:translate-x-2 transition-transform duration-500 z-10 tracking-wide whitespace-nowrap">Chamar Suporte</span>
                        <div className="ml-auto opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 border-l border-white/10 pl-4 h-full flex items-center">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#10B981]/50">IV</span>
                        </div>
                    </a>
                </nav>

                {/* Drawer Footer */}
                <div className="mt-auto p-8 mb-4">
                    <div className="flex items-center gap-4 mb-4">
                        <a href="mailto:contato@aurenos.com" className="text-xs tracking-widest text-[#94A3B8] hover:text-white transition-colors hover:underline underline-offset-4 decoration-orange-500">contato@aurenos.com</a>
                    </div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">VDA Produções &copy;</p>
                </div>
            </div>
        </>
    );
}
