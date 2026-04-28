'use client';
import { useState, useCallback } from 'react';
import Link from 'next/link';

/* ────────────────────────────────────────────────────────────────────────── */
/*  Quiz Data                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

interface Question {
    stage: string;
    title: string;
    options: { label: string; points: number }[];
}

const questions: Question[] = [
    {
        stage: 'Diagnóstico de Cenário',
        title: 'Hoje, o que mais costuma travar uma conversa antes da decisão?',
        options: [
            { label: 'A pessoa pergunta e some', points: 20 },
            { label: 'A conversa demora para avançar', points: 25 },
            { label: 'Existe interesse, mas não decisão', points: 30 },
            { label: 'O volume chega, mas poucas conversas evoluem', points: 35 },
        ],
    },
    {
        stage: 'Diagnóstico de Padrão',
        title: 'Em que ponto a maioria das conversas perde força?',
        options: [
            { label: 'Logo no início', points: 20 },
            { label: 'Depois da explicação', points: 25 },
            { label: 'Quando chega o momento de decidir', points: 35 },
            { label: 'Difícil identificar com clareza', points: 30 },
        ],
    },
    {
        stage: 'Consciência do Problema',
        title: 'O que mais influencia o avanço de uma conversa?',
        options: [
            { label: 'A oferta', points: 20 },
            { label: 'O timing', points: 25 },
            { label: 'A forma como a conversa é conduzida', points: 35 },
            { label: 'A qualidade do lead', points: 25 },
        ],
    },
    {
        stage: 'Pré-convicção',
        title: 'Você acredita que a ordem da conversa influencia a decisão?',
        options: [
            { label: 'Sim, totalmente', points: 35 },
            { label: 'Em alguns casos', points: 25 },
            { label: 'Nunca parei para analisar isso', points: 20 },
            { label: 'Não com clareza', points: 15 },
        ],
    },
    {
        stage: 'Qualificação',
        title: 'Se existir uma estrutura que mostra onde a maioria das conversas perde força, faz sentido analisar isso agora?',
        options: [
            { label: 'Sim', points: 40 },
            { label: 'Depende do que mostra', points: 25 },
            { label: 'Talvez depois', points: 10 },
        ],
    },
];

const TOTAL_QUESTIONS = questions.length;
const MAX_SCORE = 35 + 35 + 35 + 35 + 40; // 180

/* ────────────────────────────────────────────────────────────────────────── */
/*  Component                                                                */
/* ────────────────────────────────────────────────────────────────────────── */

export default function QuizGame() {
    const [currentStep, setCurrentStep] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'transition' | 'result'>('intro');
    const [answers, setAnswers] = useState<number[]>([]);

    const progress = phase === 'quiz' || phase === 'transition'
        ? ((currentStep + (phase === 'transition' ? 1 : 0)) / TOTAL_QUESTIONS) * 100
        : phase === 'result' ? 100 : 0;

    const handleStart = useCallback(() => {
        setPhase('quiz');
    }, []);

    const handleSelect = useCallback((optionIdx: number, points: number) => {
        if (selectedIdx !== null) return; // prevent double-click
        setSelectedIdx(optionIdx);
        setScore(prev => prev + points);
        setAnswers(prev => [...prev, optionIdx]);

        // Transition delay
        setTimeout(() => {
            setSelectedIdx(null);
            if (currentStep < TOTAL_QUESTIONS - 1) {
                setPhase('transition');
                setTimeout(() => {
                    setCurrentStep(prev => prev + 1);
                    setPhase('quiz');
                }, 400);
            } else {
                setPhase('result');
            }
        }, 600);
    }, [selectedIdx, currentStep]);

    const scorePercent = Math.round((score / MAX_SCORE) * 100);
    const scoreLevel = scorePercent >= 75 ? 'Alto' : scorePercent >= 50 ? 'Médio' : 'Inicial';

    /* ── INTRO SCREEN ── */
    if (phase === 'intro') {
        return (
            <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-16 selection:bg-black selection:text-white">
                <div className="max-w-md w-full text-center">
                    <div className="w-14 h-14 rounded-2xl bg-black flex items-center justify-center mx-auto mb-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                        <span className="text-white text-[11px] font-bold tracking-[0.2em]">VDA</span>
                    </div>

                    <h1 className="text-[20px] sm:text-[24px] font-semibold text-black leading-snug tracking-tight">
                        Diagnóstico de Conversão
                    </h1>
                    <p className="mt-4 text-[14px] text-black/50 font-light leading-relaxed max-w-xs mx-auto">
                        5 perguntas rápidas para descobrir onde suas conversas perdem força — e como reverter isso.
                    </p>

                    <div className="mt-3 flex items-center justify-center gap-4 text-[11px] text-black/30 font-mono tracking-wider">
                        <span>5 etapas</span>
                        <span className="w-1 h-1 rounded-full bg-black/15" />
                        <span>~2 min</span>
                    </div>

                    <button
                        onClick={handleStart}
                        className="mt-10 px-10 py-3.5 bg-black text-white text-[12px] font-semibold tracking-[0.18em] uppercase rounded-lg transition-all duration-300 hover:bg-black/85 active:scale-[0.97] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                    >
                        Iniciar Diagnóstico
                    </button>
                </div>
            </main>
        );
    }

    /* ── RESULT SCREEN ── */
    if (phase === 'result') {
        return (
            <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-6 py-16 selection:bg-black selection:text-white">
                <div className="max-w-md w-full text-center">

                    {/* Score ring */}
                    <div className="relative w-28 h-28 mx-auto mb-8">
                        <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" />
                            <circle
                                cx="60" cy="60" r="52" fill="none" stroke="black" strokeWidth="6"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 52}`}
                                strokeDashoffset={`${2 * Math.PI * 52 * (1 - scorePercent / 100)}`}
                                className="transition-all duration-[1200ms] ease-out"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-[28px] font-bold text-black leading-none">{scorePercent}</span>
                            <span className="text-[9px] font-mono tracking-[0.3em] text-black/30 uppercase mt-1">pontos</span>
                        </div>
                    </div>

                    <p className="text-[10px] font-mono tracking-[0.4em] uppercase text-black/25 mb-2">Seu nível</p>
                    <h2 className="text-[24px] sm:text-[28px] font-semibold text-black tracking-tight">
                        Consciência {scoreLevel}
                    </h2>
                    <p className="mt-4 text-[14px] text-black/50 font-light leading-relaxed max-w-sm mx-auto">
                        {scorePercent >= 75
                            ? 'Você já percebe os padrões. Está pronto para aplicar uma estrutura que transforma conversas em decisões.'
                            : scorePercent >= 50
                            ? 'Você reconhece parte dos gargalos. A estrutura VDA vai mostrar exatamente onde agir para converter mais.'
                            : 'Existem pontos invisíveis travando seus resultados. A estrutura VDA revela cada um deles — passo a passo.'}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-6 mt-8 text-center">
                        <div>
                            <p className="text-[22px] font-bold text-black">{TOTAL_QUESTIONS}</p>
                            <p className="text-[9px] font-mono tracking-[0.3em] text-black/25 uppercase">Respostas</p>
                        </div>
                        <div className="w-px h-8 bg-black/8" />
                        <div>
                            <p className="text-[22px] font-bold text-black">{score}</p>
                            <p className="text-[9px] font-mono tracking-[0.3em] text-black/25 uppercase">Score</p>
                        </div>
                        <div className="w-px h-8 bg-black/8" />
                        <div>
                            <p className="text-[22px] font-bold text-black">{scoreLevel}</p>
                            <p className="text-[9px] font-mono tracking-[0.3em] text-black/25 uppercase">Nível</p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                        <a
                            href="https://aurenos.com.br"
                            className="px-8 py-3.5 bg-black text-white text-[12px] font-semibold tracking-[0.15em] uppercase rounded-lg transition-all duration-300 hover:bg-black/85 active:scale-[0.97] shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
                        >
                            Descobrir a Estrutura VDA
                        </a>
                        <Link
                            href="/metodovendas"
                            className="px-8 py-3.5 text-black text-[12px] font-semibold tracking-[0.15em] uppercase rounded-lg border border-black/12 transition-all duration-300 hover:border-black/30 hover:bg-black/[0.02] active:scale-[0.97]"
                        >
                            Voltar
                        </Link>
                    </div>

                    <p className="mt-10 text-[10px] text-black/20 font-mono tracking-wider">
                        Seus resultados foram processados em tempo real.
                    </p>
                </div>
            </main>
        );
    }

    /* ── QUIZ SCREEN ── */
    const q = questions[currentStep];
    const isTransitioning = phase === 'transition';

    return (
        <main className="min-h-screen bg-[#FAFAFA] flex flex-col selection:bg-black selection:text-white">

            {/* ── Top bar ── */}
            <div className="w-full px-5 pt-5 pb-3 sm:px-8 sm:pt-6">
                <div className="flex items-center justify-between max-w-lg mx-auto mb-3">
                    <span className="text-[9px] font-mono tracking-[0.4em] uppercase text-black/25">
                        Etapa {currentStep + 1}/{TOTAL_QUESTIONS}
                    </span>
                    <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-[11px] font-semibold text-black/40 tabular-nums">{score} pts</span>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="max-w-lg mx-auto h-[3px] bg-black/[0.06] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-black rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* ── Question area ── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-10">
                <div
                    className={`max-w-lg w-full transition-all duration-400 ${
                        isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                    }`}
                >
                    {/* Stage label */}
                    <p className="text-[9px] font-mono tracking-[0.5em] uppercase text-black/20 mb-4 text-center sm:text-left">
                        {q.stage}
                    </p>

                    {/* Question */}
                    <h2 className="text-[18px] sm:text-[22px] font-semibold text-black leading-snug tracking-tight text-center sm:text-left mb-8">
                        {q.title}
                    </h2>

                    {/* Options */}
                    <div className="flex flex-col gap-2.5">
                        {q.options.map((opt, idx) => {
                            const isSelected = selectedIdx === idx;
                            const isOther = selectedIdx !== null && selectedIdx !== idx;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(idx, opt.points)}
                                    disabled={selectedIdx !== null}
                                    className={`
                                        group relative w-full text-left px-5 py-4 rounded-xl border transition-all duration-300
                                        ${isSelected
                                            ? 'bg-black text-white border-black shadow-[0_4px_20px_rgba(0,0,0,0.15)] scale-[1.01]'
                                            : isOther
                                            ? 'bg-white/60 text-black/30 border-black/5 scale-[0.99]'
                                            : 'bg-white text-black/70 border-black/8 hover:border-black/20 hover:bg-black/[0.02] hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)] active:scale-[0.99]'
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-3.5">
                                        {/* Option indicator */}
                                        <span className={`
                                            w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold tracking-wider flex-shrink-0 transition-all duration-300
                                            ${isSelected
                                                ? 'bg-white/20 text-white'
                                                : 'bg-black/[0.04] text-black/25 group-hover:bg-black/[0.08] group-hover:text-black/40'
                                            }
                                        `}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className={`text-[13px] sm:text-[14px] font-medium leading-snug transition-colors duration-300 ${isSelected ? 'text-white' : ''}`}>
                                            {opt.label}
                                        </span>
                                        {/* Points badge — appears after selection */}
                                        {isSelected && (
                                            <span className="ml-auto text-[10px] font-mono tracking-wider text-white/50 animate-[fadeIn_0.3s_ease-out]">
                                                +{opt.points}
                                            </span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Bottom indicator dots ── */}
            <div className="w-full px-6 py-5 flex items-center justify-center gap-2">
                {questions.map((_, i) => (
                    <div
                        key={i}
                        className={`rounded-full transition-all duration-500 ${
                            i === currentStep
                                ? 'w-5 h-1.5 bg-black'
                                : i < currentStep || (i === currentStep && phase === 'transition')
                                ? 'w-1.5 h-1.5 bg-black/30'
                                : 'w-1.5 h-1.5 bg-black/10'
                        }`}
                    />
                ))}
            </div>
        </main>
    );
}
