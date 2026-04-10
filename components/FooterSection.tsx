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
                        <a href="mailto:contato@metodovda.com" className="flex items-center gap-2 hover:text-slate-200 bg-white/5 py-2 px-6 rounded-full border border-white/10 mt-2 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            contato@metodovda.com
                        </a>
                    </div>
                </div>
                <div className="mt-8 md:mt-10 text-center text-[9px] md:text-[10px] text-[#94A3B8]/40 max-w-3xl mx-auto leading-relaxed border-t border-white/5 pt-6">
                    Este site não faz parte dos websites da Meta, do Facebook ou Instagram, nem possui qualquer endosso dessas plataformas. Todo o conteúdo deste site é de responsabilidade exclusiva dos representantes do metodovda.com.
                </div>
            </div>
        </footer>
    );
}
