import Image from 'next/image';

import VimeoFacade from './VimeoFacade';

export default function MethodologySection() {
    return (
        <section id="metodologia" className="w-full pt-8 pb-16 relative border-y border-white/5 overflow-hidden" style={{ backgroundColor: 'rgba(30, 41, 59, 0.2)' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-3xl mx-auto text-center mb-16 reveal flex flex-col items-center relative">
                    <div className="relative mb-12 flex justify-center items-center">
                        <div className="relative h-16 sm:h-20 md:h-24 logo-float-container">
                            <Image src="/logotipo/logo2.webp" alt="VDA - Venda Direta Automática" width={200} height={100} sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 200px" className="h-full w-auto object-contain relative z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] opacity-90" />
                        </div>
                    </div>
                    <h2 className="font-serif mb-3 mt-2 leading-tight">
                        <span className="text-3xl md:text-5xl font-bold">Pare de insistir tentando vender <span className="text-orange-500">como afiliado</span>.</span><br className="hidden md:block" />
                        <span className="text-xl md:text-2xl font-bold">Se isso realmente funcionasse, <span className="text-slate-400 font-light">você não estaria lendo este texto agora.</span></span>
                    </h2>
                    <p className="text-sm md:text-sm text-[#94A3B8] leading-relaxed max-w-md mx-auto">
                        Mais esforço em marketing ou vendas pode não resolver. O que muda o jogo diariamente é uma nova direção.
                    </p>

                    {/* Novo parágrafo — texto de descoberta */}
                    <div className="mt-8 max-w-lg mx-auto relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />
                        <div className="relative border border-orange-500/20 rounded-2xl px-6 py-5 bg-[#0B0F19]/60 backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-orange-500/70">Descubra</span>
                            </div>
                            <p className="text-sm md:text-[15px] text-slate-200 leading-relaxed font-light">
                                Descubra o método simples que pessoas comuns estão usando para fazer suas{' '}
                                <strong className="text-white font-semibold">primeiras vendas direto pelo WhatsApp</strong>{' '}
                                — sem precisar aparecer, sem precisar criar produto e sem investir alto.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 max-w-4xl mx-auto flex flex-col items-center justify-center reveal" style={{ transitionDelay: '150ms' }}>
                    {/* Frase de impacto — estilizada */}
                    <p className="font-serif italic text-[15px] sm:text-lg md:text-xl text-center text-white/50 font-light tracking-wide leading-relaxed max-w-md mb-6 relative">
                        <span className="absolute -left-3 sm:-left-5 top-0 text-orange-500/30 text-2xl sm:text-3xl font-serif leading-none select-none">&ldquo;</span>
                        Eu vendo pelo Whatsapp inúmeros produtos que não são meus
                        <span className="absolute -right-3 sm:-right-5 bottom-0 text-orange-500/30 text-2xl sm:text-3xl font-serif leading-none select-none">&rdquo;</span>
                    </p>

                    <div className="inline-flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-orange-500/60"></div>
                        <span className="text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase text-orange-500 drop-shadow-md text-center max-w-[200px] md:max-w-none leading-relaxed">Venda Direta Automatica</span>
                        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-orange-500/60"></div>
                    </div>

                    <div className="w-full max-w-[300px] sm:max-w-[360px] mx-auto relative group z-20 mb-16 sm:mb-20">
                        <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-b from-orange-500/60 via-[#D4AF37]/20 to-orange-500/60 rounded-[32px] sm:rounded-[40px] blur-xl opacity-50 group-hover:opacity-80 transition duration-700 ease-in-out"></div>
                        <div className="relative bg-[#050810] rounded-[32px] sm:rounded-[40px] p-2 sm:p-2.5 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2">
                            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-[#000] rounded-full z-30 flex justify-center items-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]">
                                <div className="w-1 h-1 rounded-full bg-white/20 mr-1.5"></div>
                                <div className="w-8 h-1 rounded-full bg-white/10"></div>
                            </div>
                            <VimeoFacade videoId="1176448457" title="VDA ABERTURA" />
                        </div>
                    </div>

                    <div className="relative w-full flex justify-center mb-6 md:mb-8">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] md:w-[350px] h-[80px] md:h-[120px] bg-orange-500/10 rounded-full blur-[40px] pointer-events-none z-0"></div>
                        <h3 className="font-serif text-3xl md:text-5xl font-normal text-white text-center leading-[1.2] tracking-wide relative z-10">
                            O que vamos fazer <br />
                            <strong className="font-bold underline decoration-orange-500/40 underline-offset-8">exatamente</strong> na VDA
                        </h3>
                    </div>

                    <p className="text-slate-300 text-xs md:text-sm text-center leading-relaxed max-w-xl mt-2 font-light">
                        Na VDA, você não precisa criar nada do zero. Nós entregamos os <strong className="text-white font-medium">produtos que mais vendem hoje</strong>, junto com os <strong className="text-white font-medium">áudios, textos e vídeos exatos</strong> que usamos para fechar vendas no WhatsApp.<br className="hidden md:block" /><br className="hidden md:block" />
                        Basta seguir o método, usar nosso material de apoio e contar com uma comunidade ativa de centenas de alunos.
                    </p>

                    <div className="absolute left-1 sm:left-4 lg:left-8 top-1/4 bottom-0 flex flex-col items-center gap-4 opacity-50 pointer-events-none">
                        <div className="w-1 h-1 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                        <div className="w-[1px] h-32 bg-gradient-to-b from-orange-500/60 via-orange-500/10 to-transparent"></div>
                        <div className="w-[1px] h-12 bg-white/20 animate-[bounce_3s_infinite]"></div>
                        <div className="w-1 h-1 rounded-full bg-white/20 mt-4"></div>
                        <div className="w-0.5 h-0.5 rounded-full bg-white/10 mt-2"></div>
                    </div>

                    
                    <section className="w-full max-w-5xl mx-auto mb-4 text-center">

                        {/* Bloco de objeções — "Você não precisa ser especialista" */}
                        <div className="mb-12 max-w-2xl mx-auto reveal">
                            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-orange-500/60 mb-3">Para quem é</p>
                            <h4 className="font-serif text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                Você não precisa ser{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-[#D4AF37]">especialista</span>{' '}pra começar
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                                {[
                                    { icon: '🔍', text: 'Não sabe por onde começar' },
                                    { icon: '🙈', text: 'Não quer aparecer' },
                                    { icon: '📦', text: 'Não tem produto próprio' },
                                    { icon: '📣', text: 'Não entende nada de marketing' },
                                ].map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-orange-500/20 hover:bg-orange-500/[0.04] transition-all duration-300"
                                    >
                                        <span className="text-lg leading-none flex-shrink-0">{item.icon}</span>
                                        <span className="text-[13px] md:text-sm text-slate-300 font-light leading-snug">{item.text}</span>
                                        <svg className="w-4 h-4 text-orange-500/60 ml-auto flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-4 font-light">Se você tem um ou mais desses pontos, a VDA foi feita pra você.</p>
                        </div>

                        <h3 className="text-lg sm:text-2xl font-serif font-bold tracking-wide text-white drop-shadow-[0_0_20px_rgba(249,115,22,0.35)]">Recursos Premium VDA</h3>
                        <p className="text-xs sm:text-sm text-slate-300 mt-1 px-4 sm:px-0">As 6 vantagens essenciais para escalar vendas no WhatsApp com clareza.</p>
                        
                        <div className="flex sm:hidden justify-center items-center gap-3 w-full mb-2 mt-4 text-slate-500/60 text-[10px] tracking-widest uppercase font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                            Deslize para ver
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </div>
                        
                        <div className="bonus-cards mt-6 md:mt-8 flex overflow-x-auto touch-pan-x sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6 -mx-4 px-4 sm:mx-0 sm:px-0 w-[calc(100%+2rem)] sm:w-full reveal pb-4 sm:pb-8 snap-x snap-mandatory scrollbar-hide py-4">
                            {[
                                { img: '/capas bonus/1.webp', title1: 'Vendas no', title2: 'WhatsApp', desc: 'Negócio 100% focado no app' },
                                { img: '/capas bonus/2.webp', title1: 'Produtos', title2: 'Lucrativos', desc: 'Produtos validados e rentáveis' },
                                { img: '/capas bonus/3.webp', title1: 'Material de', title2: 'Apoio', desc: 'Kit completo para o aluno' },
                                { img: '/capas bonus/4.webp', title1: 'Estratégias de', title2: 'Venda', desc: 'Métodos testados para conversão' },
                                { img: '/capas bonus/5.webp', title1: 'Fluxo de', title2: 'Clientes', desc: 'Receba novos contatos todos os dias' },
                                { img: '/capas bonus/6.webp', title1: 'Fidelização e', title2: 'Recompra', desc: 'Clientes voltando para comprar novamente' }
                            ].map((card, idx) => (
                                <div key={idx} className="carousel-card shrink-0 w-[30vw] min-w-[110px] sm:w-[300px] snap-center relative bg-[#090C15]/90 backdrop-blur-sm rounded-[20px] p-3 md:p-5 border border-white/5 flex flex-col transition-all duration-700 shadow-[0_15px_30px_rgba(0,0,0,0.4)] group overflow-hidden cursor-default">
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-orange-500/80 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-32 h-32 bg-orange-500/15 rounded-full blur-[40px] pointer-events-none group-hover:bg-orange-500/30 transition-colors duration-700 z-0"></div>
                                    
                                    <h4 className="text-[10px] sm:text-sm font-medium mb-3 sm:mb-4 relative z-10 text-slate-300 tracking-wide text-center leading-tight transition-colors duration-500">
                                        {card.title1}<br />
                                        <strong className="text-white group-hover:text-orange-500 font-bold text-[11px] sm:text-[18px] drop-shadow-[0_2px_4px_rgba(249,115,22,0)] group-hover:drop-shadow-[0_2px_10px_rgba(249,115,22,0.6)] block mt-0.5 transition-all duration-500">{card.title2}</strong>
                                    </h4>

                                    <div className="w-full h-[75px] sm:h-[130px] relative z-10 flex justify-center items-center mb-3 sm:mb-5 transition-transform duration-700">
                                        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/20 blur-[30px] rounded-full transition-all duration-700 transform scale-75 group-hover:scale-100 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                                        <Image src={card.img} alt={card.title2} width={200} height={200} sizes="(max-width: 640px) 30vw, 130px" className="w-full h-full object-contain filter brightness-110 contrast-125 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_10px_25px_rgba(249,115,22,0.35)] transition-all duration-700 relative z-10" loading="lazy" decoding="async" />
                                    </div>

                                    <p className="text-slate-400 text-[9px] sm:text-xs relative z-10 pb-0 font-light leading-[1.3] text-center mt-auto w-full transition-all duration-500 group-hover:text-slate-200">
                                        {card.desc}
                                    </p>

                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center opacity-0 group-hover:opacity-100"></div>
                                </div>
                            ))}
                        </div>

                        {/* ── Imagem Módulos com nebula ── */}
                        <div className="relative w-full max-w-2xl mx-auto mt-14 mb-4 reveal flex justify-center items-center">
                            {/* Nebula layer 1 — branco azulado lento */}
                            <div
                                aria-hidden="true"
                                className="absolute pointer-events-none"
                                style={{
                                    width: '520px',
                                    height: '320px',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(ellipse 70% 55% at 40% 50%, rgba(186,230,255,0.18) 0%, rgba(147,210,255,0.07) 45%, transparent 75%)',
                                    filter: 'blur(28px)',
                                    animation: 'nebula-drift-1 18s ease-in-out infinite alternate',
                                }}
                            />
                            {/* Nebula layer 2 — branco puro, deslocado */}
                            <div
                                aria-hidden="true"
                                className="absolute pointer-events-none"
                                style={{
                                    width: '380px',
                                    height: '200px',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-45%, -55%)',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(ellipse 60% 50% at 60% 45%, rgba(255,255,255,0.10) 0%, rgba(200,235,255,0.05) 50%, transparent 80%)',
                                    filter: 'blur(22px)',
                                    animation: 'nebula-drift-2 24s ease-in-out infinite alternate',
                                }}
                            />
                            {/* Nebula layer 3 — azul claro fino */}
                            <div
                                aria-hidden="true"
                                className="absolute pointer-events-none"
                                style={{
                                    width: '300px',
                                    height: '180px',
                                    top: '60%',
                                    left: '55%',
                                    transform: 'translate(-50%, -50%)',
                                    borderRadius: '50%',
                                    background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(125,200,255,0.10) 0%, transparent 70%)',
                                    filter: 'blur(18px)',
                                    animation: 'nebula-drift-3 30s ease-in-out infinite alternate',
                                }}
                            />

                            {/* Image com borda animada minimalista */}
                            <div className="modulos-border-glow w-full max-w-xl">
                                <div className="relative z-10 w-full bg-[#070A12] rounded-[19px] p-1" style={{ filter: 'drop-shadow(0 16px 48px rgba(0,0,0,0.7)) drop-shadow(0 0 32px rgba(160,220,255,0.12))' }}>
                                    <Image
                                        src="/Modulos/modulos-curso-vda-ast2026.png"
                                        alt="Módulos do Curso VDA 2026"
                                        width={800}
                                        height={500}
                                        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 672px"
                                        className="w-full h-auto object-contain rounded-[15px]"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Keyframe styles — CSS puro, zero JS runtime */}
                        <style>{`
                            @keyframes nebula-drift-1 {
                                0%   { transform: translate(-50%, -50%) scale(1)    rotate(0deg); }
                                33%  { transform: translate(-52%, -48%) scale(1.04) rotate(2deg); }
                                66%  { transform: translate(-48%, -53%) scale(0.97) rotate(-1deg); }
                                100% { transform: translate(-50%, -50%) scale(1.02) rotate(1deg); }
                            }
                            @keyframes nebula-drift-2 {
                                0%   { transform: translate(-45%, -55%) scale(1) rotate(0deg); }
                                40%  { transform: translate(-43%, -52%) scale(1.06) rotate(-2deg); }
                                80%  { transform: translate(-47%, -57%) scale(0.96) rotate(3deg); }
                                100% { transform: translate(-46%, -54%) scale(1.03) rotate(-1deg); }
                            }
                            @keyframes nebula-drift-3 {
                                0%   { transform: translate(-50%, -50%) scale(1); }
                                50%  { transform: translate(-48%, -53%) scale(1.08); }
                                100% { transform: translate(-52%, -48%) scale(0.95); }
                            }
                        `}</style>

                        {/* ── Pra quem é isso ── */}
                        <div className="mt-10 mb-2 max-w-sm mx-auto">
                            {/* Divider */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                <span className="text-[9px] font-bold tracking-[0.35em] uppercase text-white/20">ideal para</span>
                                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>

                            <p className="text-xs font-bold tracking-[0.3em] uppercase text-orange-500/60 mb-3 text-center">
                                Pra quem é isso
                            </p>
                            <h5 className="font-serif text-xl font-bold text-white text-center mb-6 leading-snug">
                                Esse treinamento é ideal para quem:
                            </h5>

                            <ul className="space-y-2.5">
                                {[
                                    'Quer começar do zero',
                                    'Precisa de uma renda extra',
                                    'Não quer aparecer nas redes sociais',
                                    'Quer algo simples e direto ao ponto',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/25 flex items-center justify-center">
                                            <svg className="w-2.5 h-2.5 text-orange-500/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        <span className="text-[13px] text-slate-300 font-light leading-snug">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </section>
                </div>
            </div>
            
            <div className="w-full relative flex justify-center items-center h-px bg-white/5 mt-16">
                <div className="absolute w-1/2 max-w-2xl h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent"></div>
                <div className="absolute w-1/4 max-w-sm h-[3px] bg-orange-500/20 blur-[4px]"></div>
                <div className="absolute w-2 h-2 rotate-45 border border-orange-500/40 bg-[#0A0E17] shadow-[0_0_10px_rgba(249,115,22,0.4)]"></div>
            </div>
        </section>
    );
}
