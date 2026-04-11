export default function FooterSection() {
    return (
        <footer className="w-full py-8 md:py-10 bg-black border-t border-white/5">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center items-center gap-6 text-center">
                    <div className="flex flex-col gap-1">
                        <p className="font-serif text-2xl font-bold text-slate-300 tracking-wider">VDA</p>
                        <p className="text-xs text-[#94A3B8]">Venda Direta Automática &copy; 2025</p>
                    </div>

                    <div className="flex flex-col items-center gap-4 text-sm text-[#94A3B8] transition-colors">
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <a href="/politica-de-privacidade" className="hover:text-orange-500 transition-colors">Política de Privacidade</a>
                            <a href="/politica-de-privacidade#6" className="hover:text-orange-500 transition-colors">Termos de Uso</a>
                        </div>
                        <a href="mailto:contato@aurenos.com.br" className="flex items-center gap-2 hover:text-slate-200 bg-white/5 py-2 px-6 rounded-full border border-white/10 mt-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            contato@aurenos.com.br
                        </a>
                    </div>
                </div>
                <div className="border-t border-white/10 mt-12 py-8 flex items-center justify-center">
                    <p className="text-[10px] text-slate-500 max-w-lg mx-auto text-center">
                    Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem possui qualquer endosso dessas plataformas. Todo o conteúdo deste site é de responsabilidade exclusiva dos representantes do aurenos.com.br.
                    </p>
                </div>
            </div>
        </footer>
    );
}
