'use client';
import Link from 'next/link';
import { trackEvent } from '@/lib/meta-pixel';

export default function QuizButton() {
    return (
        <Link
            href="/metodovendas/licao"
            onClick={() => trackEvent('Lead', { 
                content_name: 'Novo Método Silencioso — Iniciou Quiz' 
            })}
            className="group relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-black text-white text-[12px] sm:text-[13px] font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-black/85 active:scale-[0.97]"
        >
            VDA Lição
        </Link>
    );
}
