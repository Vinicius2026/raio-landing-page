'use client';
import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Quiz Data                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

interface Question {
    stage: string;
    emoji: string;
    color: string;       // accent color class
    colorBg: string;     // light bg version
    title: string;
    insight: string;     // micro-copy after answering
    options: { label: string; points: number }[];
}

const questions: Question[] = [
    {
        stage: 'Diagnóstico de Cenário',
        emoji: '🔍',
        color: 'text-blue-500',
        colorBg: 'bg-blue-500',
        title: 'Hoje, o que mais costuma travar uma conversa antes da decisão?',
        insight: 'Todo padrão tem uma causa. Vamos identificar a sua.',
        options: [
            { label: 'A pessoa pergunta e some', points: 20 },
            { label: 'A conversa demora para avançar', points: 25 },
            { label: 'Existe interesse, mas não decisão', points: 30 },
            { label: 'O volume chega, mas poucas evoluem', points: 35 },
        ],
    },
    {
        stage: 'Diagnóstico de Padrão',
        emoji: '📊',
        color: 'text-violet-500',
        colorBg: 'bg-violet-500',
        title: 'Em que ponto a maioria das conversas perde força?',
        insight: 'Identificar o ponto exato é o primeiro passo para reverter.',
        options: [
            { label: 'Logo no início', points: 20 },
            { label: 'Depois da explicação', points: 25 },
            { label: 'No momento de decidir', points: 35 },
            { label: 'Difícil identificar com clareza', points: 30 },
        ],
    },
    {
        stage: 'Consciência do Problema',
        emoji: '💡',
        color: 'text-amber-500',
        colorBg: 'bg-amber-500',
        title: 'O que mais influencia o avanço de uma conversa?',
        insight: 'A forma supera o produto. Sempre.',
        options: [
            { label: 'A oferta', points: 20 },
            { label: 'O timing', points: 25 },
            { label: 'A forma como é conduzida', points: 35 },
            { label: 'A qualidade do lead', points: 25 },
        ],
    },
    {
        stage: 'Pré-convicção',
        emoji: '🧠',
        color: 'text-emerald-500',
        colorBg: 'bg-emerald-500',
        title: 'Você acredita que a ordem da conversa influencia a decisão?',
        insight: 'A sequência certa muda tudo. Isso é estrutura.',
        options: [
            { label: 'Sim, totalmente', points: 35 },
            { label: 'Em alguns casos', points: 25 },
            { label: 'Nunca analisei isso', points: 20 },
            { label: 'Não com clareza', points: 15 },
        ],
    },
    {
        stage: 'Qualificação',
        emoji: '🚀',
        color: 'text-rose-500',
        colorBg: 'bg-rose-500',
        title: 'Se existir uma estrutura que mostra onde as conversas perdem força, faz sentido analisar agora?',
        insight: 'Decisão inteligente. Vamos processar seu diagnóstico.',
        options: [
            { label: 'Sim, quero ver', points: 40 },
            { label: 'Depende do que mostra', points: 25 },
            { label: 'Talvez depois', points: 10 },
        ],
    },
];

const TOTAL = questions.length;
const MAX_SCORE = 35 + 35 + 35 + 35 + 40;

/* ────────────────────────────────────────────────────────────────────────── */
/*  Component                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export default function QuizGame() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [selected, setSelected] = useState<number | null>(null);
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'analyzing' | 'result'>('intro');
    const [fade, setFade] = useState(true); // controls fade in/out
    const [analyzeStep, setAnalyzeStep] = useState(0);

    const progress = phase === 'quiz'
        ? ((step + (selected !== null ? 0.5 : 0)) / TOTAL) * 100
        : phase === 'result' || phase === 'analyzing' ? 100 : 0;

    // Analyzing animation steps
    useEffect(() => {
        if (phase !== 'analyzing') return;
        const msgs = ['Coletando respostas...', 'Cruzando padrões...', 'Calculando diagnóstico...', 'Resultado pronto ✓'];
        let i = 0;
        setAnalyzeStep(0);
        const timer = setInterval(() => {
            i++;
            if (i < msgs.length) {
                setAnalyzeStep(i);
            } else {
                clearInterval(timer);
                setTimeout(() => setPhase('result'), 600);
            }
        }, 900);
        return () => clearInterval(timer);
    }, [phase]);

    const handleStart = useCallback(() => {
        setFade(false);
        setTimeout(() => { setPhase('quiz'); setFade(true); }, 300);
    }, []);

    const handleSelect = useCallback((idx: number, pts: number) => {
        if (selected !== null) return;
        setSelected(idx);
        setScore(p => p + pts);

        setTimeout(() => {
            setFade(false);
            setTimeout(() => {
                setSelected(null);
                if (step < TOTAL - 1) {
                    setStep(p => p + 1);
                    setFade(true);
                } else {
                    setPhase('analyzing');
                    setFade(true);
                }
            }, 350);
        }, 1200);
    }, [selected, step]);

    const scorePercent = Math.round((score / MAX_SCORE) * 100);
    const level = scorePercent >= 75 ? 'Alto' : scorePercent >= 50 ? 'Médio' : 'Inicial';
    const levelEmoji = scorePercent >= 75 ? '🟢' : scorePercent >= 50 ? '🟡' : '🔴';

    /* ── INTRO ── */
    if (phase === 'intro') {
        return (
            <main className={`min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 transition-opacity duration-300 ${fade ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-sm w-full text-center">
                    {/* Logo badge */}
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-black to-zinc-800 flex items-center justify-center mx-auto mb-8 shadow-[0_10px_40px_rgba(0,0,0,0.18)]">
                        <span className="text-white text-[10px] font-bold tracking-[0.25em]">VDA</span>
                    </div>

                    <p className="text-[9px] font-mono tracking-[0.5em] uppercase text-black/20 mb-3">Método Silencioso</p>

                    <h1 className="text-[22px] sm:text-[26px] font-bold text-black leading-snug tracking-tight">
                        Diagnóstico de<br />Conversão
                    </h1>

                    <p className="mt-5 text-[14px] text-black/45 font-light leading-relaxed">
                        Descubra em <strong className="font-semibold text-black/70">5 perguntas</strong> onde suas conversas perdem força — e o que muda quando existe estrutura.
                    </p>

                    {/* Tags */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        {['🔍 5 etapas', '⏱ ~2 min', '📊 Resultado'].map((tag, i) => (
                            <span key={i} className="text-[10px] text-black/35 bg-black/[0.03] border border-black/[0.06] rounded-full px-3 py-1 font-medium">{tag}</span>
                        ))}
                    </div>

                    <button
                        onClick={handleStart}
                        className="mt-10 w-full py-4 bg-black text-white text-[12px] font-bold tracking-[0.2em] uppercase rounded-xl transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98] shadow-[0_6px_25px_rgba(0,0,0,0.2)]"
                    >
                        Iniciar Diagnóstico →
                    </button>
                </div>
            </main>
        );
    }

    /* ── ANALYZING ── */
    if (phase === 'analyzing') {
        const msgs = ['Coletando respostas...', 'Cruzando padrões...', 'Calculando diagnóstico...', 'Resultado pronto ✓'];
        return (
            <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6">
                <div className="max-w-xs w-full text-center">
                    {/* Spinner */}
                    <div className="w-16 h-16 mx-auto mb-8 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-black/5" />
                        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-black animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[20px]">🧠</span>
                        </div>
                    </div>

                    <p className="text-[9px] font-mono tracking-[0.5em] uppercase text-black/20 mb-4">Método Silencioso</p>
                    <h2 className="text-[18px] font-bold text-black mb-6">Analisando seu perfil...</h2>

                    {/* Progress steps */}
                    <div className="flex flex-col gap-2.5 text-left max-w-[220px] mx-auto">
                        {msgs.map((msg, i) => (
                            <div key={i} className={`flex items-center gap-2.5 transition-all duration-500 ${i <= analyzeStep ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}>
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] transition-colors duration-300 ${i < analyzeStep ? 'bg-emerald-500 text-white' : i === analyzeStep ? 'bg-black text-white' : 'bg-black/5 text-black/20'}`}>
                                    {i < analyzeStep ? '✓' : i === analyzeStep ? '·' : ''}
                                </span>
                                <span className={`text-[12px] font-medium transition-colors duration-300 ${i <= analyzeStep ? 'text-black/70' : 'text-black/20'}`}>{msg}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    /* ── RESULT ── */
    if (phase === 'result') {
        return (
            <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-12">
                <div className="max-w-sm w-full text-center">
                    {/* Score ring */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="5" />
                            <circle
                                cx="60" cy="60" r="50" fill="none"
                                stroke={scorePercent >= 75 ? '#10b981' : scorePercent >= 50 ? '#f59e0b' : '#ef4444'}
                                strokeWidth="5" strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 50}`}
                                strokeDashoffset={`${2 * Math.PI * 50 * (1 - scorePercent / 100)}`}
                                className="transition-all duration-[1500ms] ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[32px] font-bold text-black leading-none">{scorePercent}</span>
                            <span className="text-[8px] font-mono tracking-[0.4em] text-black/25 uppercase mt-1">Score</span>
                        </div>
                    </div>

                    {/* Level */}
                    <div className="inline-flex items-center gap-2 bg-black/[0.04] border border-black/[0.06] rounded-full px-4 py-1.5 mb-4">
                        <span className="text-[14px] leading-none">{levelEmoji}</span>
                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-black/50">Nível {level}</span>
                    </div>

                    <h2 className="text-[22px] sm:text-[26px] font-bold text-black tracking-tight mb-3">
                        Consciência {level}
                    </h2>

                    <p className="text-[14px] text-black/45 font-light leading-relaxed max-w-xs mx-auto mb-8">
                        {scorePercent >= 75
                            ? 'Você já enxerga os padrões. A estrutura VDA vai potencializar cada conversa que você tem.'
                            : scorePercent >= 50
                            ? 'Você reconhece parte dos gargalos. O VDA vai revelar exatamente onde agir para converter mais.'
                            : 'Existem pontos invisíveis travando seus resultados. A estrutura VDA mostra cada um — passo a passo.'}
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {[
                            { val: TOTAL, label: 'Respostas', icon: '📝' },
                            { val: score, label: 'Pontos', icon: '⚡' },
                            { val: level, label: 'Nível', icon: levelEmoji },
                        ].map((s, i) => (
                            <div key={i} className="bg-white rounded-xl border border-black/[0.06] py-3 px-2 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                                <p className="text-[16px] mb-0.5">{s.icon}</p>
                                <p className="text-[18px] font-bold text-black">{s.val}</p>
                                <p className="text-[8px] font-mono tracking-[0.3em] text-black/25 uppercase">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <a
                        href="https://aurenos.com.br"
                        className="block w-full py-4 bg-black text-white text-[12px] font-bold tracking-[0.18em] uppercase rounded-xl transition-all duration-300 hover:bg-zinc-800 active:scale-[0.98] shadow-[0_6px_25px_rgba(0,0,0,0.2)] mb-3"
                    >
                        🔓 Descobrir a Estrutura VDA
                    </a>
                    <Link
                        href="/metodovendas"
                        className="block w-full py-3.5 text-black/50 text-[11px] font-semibold tracking-[0.15em] uppercase rounded-xl border border-black/8 transition-all duration-300 hover:border-black/20 hover:text-black/70 active:scale-[0.98]"
                    >
                        ← Voltar
                    </Link>

                    <p className="mt-8 text-[9px] text-black/15 font-mono tracking-[0.2em]">Diagnóstico processado em tempo real pelo Método Silencioso</p>
                </div>
            </main>
        );
    }

    /* ── QUIZ ── */
    const q = questions[step];

    return (
        <main className="min-h-screen bg-[#FAFAFA] flex flex-col">

            {/* ── Top bar ── */}
            <div className="w-full px-5 pt-5 pb-2 sm:px-8 sm:pt-6 flex-shrink-0">
                <div className="flex items-center justify-between max-w-lg mx-auto mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-[14px] leading-none">{q.emoji}</span>
                        <span className="text-[9px] font-mono tracking-[0.35em] uppercase text-black/30">
                            {step + 1} de {TOTAL}
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/[0.03] border border-black/[0.06] rounded-full px-3 py-1">
                        <span className="text-[12px] leading-none">⚡</span>
                        <span className="text-[11px] font-bold text-black/50 tabular-nums">{score} pts</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="max-w-lg mx-auto h-[4px] bg-black/[0.05] rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${q.colorBg}`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* ── Question area ── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-6">
                <div className={`max-w-lg w-full transition-all duration-300 ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

                    {/* Stage badge */}
                    <div className="flex items-center gap-2 mb-5 justify-center sm:justify-start">
                        <span className={`text-[9px] font-bold tracking-[0.4em] uppercase ${q.color}`}>{q.stage}</span>
                    </div>

                    {/* Question */}
                    <h2 className="text-[19px] sm:text-[23px] font-bold text-black leading-snug tracking-tight text-center sm:text-left mb-7">
                        {q.title}
                    </h2>

                    {/* Revealead Insight — Apenas na última pergunta */}
                    {step === TOTAL - 1 && (
                        <div className="mb-8 p-5 bg-black/[0.03] border border-black/[0.05] rounded-2xl animate-[fadeIn_0.5s_ease-out]">
                            <p className="text-[14px] text-black/80 font-medium leading-relaxed text-center italic">
                                "Você está participando exatamente de como vendemos: <strong className="text-black font-bold">sem vender, guiando pela conversa.</strong>"
                            </p>
                            <p className="text-[13px] text-black/50 font-light leading-relaxed text-center mt-3">
                                Nós não criamos mensagens do zero. Temos todos os textos, áudios, vídeos e imagens prontos para cada produto. Nós sabemos a ordem exata que vende mais, e executamos de forma semi-automática.
                            </p>
                        </div>
                    )}

                    {/* Options */}
                    <div className="flex flex-col gap-2.5">
                        {q.options.map((opt, idx) => {
                            const isSel = selected === idx;
                            const isOther = selected !== null && selected !== idx;
                            const letters = ['A', 'B', 'C', 'D'];

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx, opt.points)}
                                    disabled={selected !== null}
                                    className={`
                                        group relative w-full text-left rounded-xl border transition-all duration-400
                                        ${isSel
                                            ? 'bg-black text-white border-black shadow-[0_6px_24px_rgba(0,0,0,0.18)] scale-[1.02]'
                                            : isOther
                                            ? 'bg-white/50 text-black/25 border-black/4 scale-[0.98] opacity-50'
                                            : 'bg-white text-black/70 border-black/8 hover:border-black/18 hover:shadow-[0_3px_14px_rgba(0,0,0,0.07)] active:scale-[0.99]'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4">
                                        {/* Letter badge */}
                                        <span className={`
                                            w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all duration-400
                                            ${isSel
                                                ? 'bg-white/20 text-white'
                                                : 'bg-black/[0.04] text-black/25 group-hover:bg-black/[0.08] group-hover:text-black/45'
                                            }
                                        `}>
                                            {letters[idx]}
                                        </span>
                                        <span className={`text-[13px] sm:text-[14px] font-medium leading-snug flex-1 ${isSel ? 'text-white' : ''}`}>
                                            {opt.label}
                                        </span>
                                        {/* Points badge */}
                                        {isSel && (
                                            <span className="text-[11px] font-mono font-bold tracking-wider text-white/60 animate-[fadeIn_0.3s_ease-out] flex items-center gap-1">
                                                <span className="text-emerald-400">+{opt.points}</span>
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Insight text — appears after selection */}
                    {selected !== null && (
                        <div className="mt-5 flex items-center gap-2.5 justify-center animate-[fadeIn_0.5s_ease-out]">
                            <span className="text-[14px] leading-none">💬</span>
                            <p className="text-[12px] text-black/35 font-medium italic">{q.insight}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Bottom dots ── */}
            <div className="w-full px-6 py-5 flex items-center justify-center gap-2 flex-shrink-0">
                {questions.map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-500 ${
                            i === step
                                ? `w-6 h-2 ${q.colorBg}`
                                : i < step
                                ? 'w-2 h-2 bg-black/25'
                                : 'w-2 h-2 bg-black/8'
                        }`}
                    />
                ))}
            </div>
        </main>
    );
}
