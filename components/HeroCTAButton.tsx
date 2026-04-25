'use client';
import { trackEvent } from '@/lib/meta-pixel';

export default function HeroCTAButton() {
    return (
        <a
            href="https://pay.monetizze.com.br/DLA378148"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('InitiateCheckout', { value: 97.00, currency: 'BRL', content_name: 'VDA Premium' })}
            className="w-full sm:w-auto px-6 py-3 text-sm bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer border border-orange-500/50 backdrop-blur-sm">
            <span>Quero ter a VDA Completa</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </a>
    );
}
