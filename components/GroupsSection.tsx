import Image from 'next/image';
import Link from 'next/link';

export default function GroupsSection() {
    return (
        <>
            <section className="w-full py-16 md:py-28 relative bg-[#090C15] border-t border-white/5 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
                <div className="hidden lg:block absolute left-[6%] xl:left-[12%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
                <div className="hidden lg:block absolute left-[6%] xl:left-[12%] top-1/2 -translate-y-1/2 w-[1px] h-56 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent pointer-events-none shadow-[0_0_15px_rgba(249,115,22,0.8)]"></div>
                
                <div className="hidden lg:block absolute right-[6%] xl:right-[12%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none"></div>
                <div className="hidden lg:block absolute right-[6%] xl:right-[12%] top-1/2 -translate-y-1/2 w-[1px] h-56 bg-gradient-to-b from-transparent via-[#D4AF37]/50 to-transparent pointer-events-none shadow-[0_0_15px_rgba(212,175,55,0.8)]"></div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[1100px] h-[300px] md:h-[600px] bg-orange-500/5 rounded-[100%] blur-[100px] md:blur-[150px] pointer-events-none z-0"></div>

                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center flex flex-col items-center reveal">
                    <h3 className="font-serif text-2xl sm:text-[28px] lg:text-[34px] font-bold text-white mb-4 sm:mb-6 tracking-wide shadow-black drop-shadow-md">
                        Nossos Grupos de contato diário.
                    </h3>
                    <p className="text-[13px] sm:text-[15px] font-light text-slate-300 leading-relaxed max-w-3xl mx-auto mb-12 sm:mb-16 drop-shadow-sm">
                        Garanta a VDA hoje com um desconto exclusivo: de <span className="line-through text-white/40">R$ 297</span> por <strong className="text-white font-medium">apenas R$ 97,00</strong>. Tenha acesso imediato ao conteúdo completo em 6 módulos e 20+ videoaulas, incluindo as ferramentas que utilizamos para vender diariamente, produtos selecionados e materiais prontos de áudio, imagem e vídeo para cada oferta. Além disso, participe dos nossos grupos de suporte e contato diário. Aproveite: <span className="text-orange-500 font-semibold">promoção por tempo limitadíssimo!</span>
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-12 sm:gap-16 md:gap-24 w-full">
                        <div className="relative group cursor-default">
                            <div className="absolute inset-0 bg-[#D4AF37]/15 rounded-full blur-[40px] group-hover:bg-[#D4AF37]/25 transition-colors duration-700 origin-center pointer-events-none scale-110"></div>
                            <div className="relative w-60 h-60 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border border-white/10 bg-[#060913] flex items-center justify-center p-[3px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.25)]">
                                <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-[#0a0f19]">
                                    <Image src="/blvda img/vda-grupoaberto.webp" alt="Grupo Aberto" width={256} height={256} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                                </div>
                            </div>
                        </div>

                        <div className="relative group cursor-default">
                            <div className="absolute inset-0 bg-orange-500/15 rounded-full blur-[40px] group-hover:bg-orange-500/25 transition-colors duration-700 origin-center pointer-events-none scale-110"></div>
                            <div className="relative w-60 h-60 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full border border-white/10 bg-[#060913] flex items-center justify-center p-[3px] shadow-[0_15px_40px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-700 hover:border-orange-500/40 hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)]">
                                <div className="w-full h-full rounded-full overflow-hidden relative flex items-center justify-center bg-[#0a0f19]">
                                    <Image src="/blvda img/vda-grupofechados.webp" alt="Grupo Fechado" width={256} height={256} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 sm:mt-14 w-full flex justify-center reveal">
                        <Link href="#oferta" className="block w-full max-w-[280px] sm:max-w-[340px] text-center py-4 px-6 rounded-2xl font-black text-[13px] sm:text-[14px] tracking-wide text-white uppercase bg-[#21c55e] shadow-[0_0_30px_rgba(33,197,94,0.35),0_0_60px_rgba(33,197,94,0.15)] hover:shadow-[0_0_40px_rgba(33,197,94,0.55),0_0_80px_rgba(33,197,94,0.25)] hover:scale-[1.04] hover:bg-[#1daf52] transition-all duration-300 ease-out active:scale-[0.98]">
                            COMPRAR VDA POR R$ 97,00
                        </Link>
                    </div>
                </div>
            </section>

            {/* Garantia Section */}
            <section className="w-full py-12 md:py-16 relative bg-[#0f141e] border-y border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 reveal">
                    <div className="glass p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 flex flex-col md:flex-row items-center gap-6 md:gap-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-500/10 rounded-full blur-[80px] pointer-events-none"></div>
                        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-300 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <div className="absolute inset-0 bg-slate-600/20 rounded-full flex items-center justify-center animate-[pulse_3s_infinite]">
                                <div className="w-full h-full border-2 border-dashed border-slate-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
                            </div>
                        </div>
                        <div className="text-center md:text-left relative z-10 flex flex-col items-center md:items-start">
                            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-3 text-slate-100">7 Dias de <span className="text-orange-500">Garantia Total</span>.</h2>
                            <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xl mx-auto md:mx-0">
                                Seu risco é absolutamente zero. Caso você não goste da estrutura, não se adapte ao conteúdo ou simplesmente queira a devolução do seu dinheiro por qualquer motivo, basta solicitar via formulário ou no WhatsApp de suporte que realizaremos o reembolso <strong>100% integral</strong> do valor pago.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 md:mt-28 mb-8 relative z-10 reveal" style={{ transitionDelay: '200ms' }}>
                    <div className="flex items-center justify-center gap-4 mb-10 md:mb-12">
                        <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-orange-500/40"></div>
                        <h3 className="font-serif text-2xl md:text-3xl font-bold text-center text-white drop-shadow-md">FAQ - Perguntas e Respostas</h3>
                        <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-orange-500/40"></div>
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4 relative overflow-hidden">
                        {[
                            {q: 'Preciso saber vender?', a: 'Não precisa saber vender, vamos explicar o passo a passo de como vendemos até todos os dias no Whatsapp. O que vende é a estratégia, o material para enviar enquanto está fazendo a venda e é claro o produto escolhido.'},
                            {q: 'Eu preciso ter o produto para vender?', a: 'Vendemos como indicação. O produto que vamos vender é de outra pessoa e recebemos por isso.'},
                            {q: 'Eu não sei como conseguir clientes no whatsapp para fazer vendas. Serviria pra mim?', a: 'Sim! Você terá acesso ao curso e também ao painel de controle da VDA. Existe todo um passo a passo que precisa ser realizado sem mudar nada. Dentro da VDA vamos lhe ensinar como conseguir os clientes e o melhor, como convencer na conversa transformando o interessado em comprador.'},
                            {q: 'Já fiz alguns cursos, o que a VDA tem de diferente?', a: 'VDA - Venda Direta Automática. Estamos oferecendo para todos a possibilidade de vender produtos vencedores pelo whatsapp, sendo possível vender todos os dias. Disponibilizamos todo o material que usamos em todas as vendas: áudio, vídeo, texto e imagens. Tudo que estamos fazendo para realizar vendas nós ensinamos dentro da VDA.'},
                            {q: 'Preciso saber anunciar?', a: 'Não precisa! Não é obrigatório criar anúncios. Claro que anunciar vai ajudar a escalar, mas iniciamos com o que chamamos de tráfego orgânico, ou seja, sem anúncios no início. Ensinamos o tutorial básico que funciona quando chegar a hora de anunciar e todo o passo a passo está dentro da VDA.'},
                            {q: 'Posso dividir meu acesso com outra pessoa?', a: 'Não! Cada usuário tem seu acesso individual.'},
                            {q: 'O que é Painel de Controle VDA?', a: 'O Painel de Controle da VDA é um painel pessoal de usuário com as escolhas de produtos, os materiais de apoio de whatsapp, notificações, lives e suporte em grupo. Dentro do painel o aluno consegue realizar todas as tarefas da área de membros VDA.'}
                        ].map((faq, i) => (
                            <details key={i} className="group bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden open:bg-white/[0.06] hover:bg-white/[0.05] transition-all duration-300">
                                <summary className="flex justify-between items-center font-semibold cursor-pointer list-none p-5 md:p-6 text-[13px] md:text-[15px] text-slate-100 hover:text-orange-500 transition-colors [&::-webkit-details-marker]:hidden select-none">
                                    <span>{faq.q}</span>
                                    <span className="transition-transform duration-300 group-open:rotate-180 text-orange-500 shrink-0">
                                        <svg fill="none" height="20" width="20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"></path></svg>
                                    </span>
                                </summary>
                                <div className="text-slate-400 text-xs md:text-[14px] px-5 md:px-6 pb-5 md:pb-6 leading-relaxed font-light border-t border-white/5 pt-4 mt-1">
                                    {faq.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
