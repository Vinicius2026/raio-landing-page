import type { Metadata } from 'next';
import QuizGame from './QuizGame';

export const metadata: Metadata = {
    title: 'VDA Lição — Diagnóstico | VDA',
    description: 'Descubra onde suas conversas perdem força e como reverter isso com o método VDA.',
    robots: { index: false, follow: false },
};

export default function LicaoPage() {
    return <QuizGame />;
}
