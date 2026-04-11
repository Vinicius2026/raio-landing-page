import Link from 'next/link'

export default function PoliticaDePrivacidade() {
    return (
        <div className="min-h-screen bg-[#0B0F19] text-slate-50 font-sans px-4 py-20">
            <div className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <Link
                        href="/"
                        className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                        ← Voltar ao início
                    </Link>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-12 space-y-8">
                    {/* Header */}
                    <div className="space-y-2 border-b border-white/10 pb-8">
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Política de Privacidade
                        </h1>
                        <p className="text-slate-400 text-sm">
                            VDA – Venda Direta Automática · Última atualização: abril de 2025
                        </p>
                    </div>

                    {/* Intro */}
                    <section className="space-y-3">
                        <p className="text-slate-300 leading-relaxed">
                            A <strong className="text-white">VDA – Venda Direta Automática</strong>, de titularidade de{' '}
                            <strong className="text-white">Thiago Lima</strong>, está comprometida com a proteção dos seus
                            dados pessoais em conformidade com a{' '}
                            <strong className="text-white">Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018)</strong>.
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                            Esta Política descreve como coletamos, usamos, armazenamos e protegemos suas informações ao
                            acessar nossos sites, plataformas e adquirir nossos produtos.
                        </p>
                    </section>

                    {[
                        {
                            title: '1. Quem somos',
                            content: (
                                <div className="space-y-1 text-slate-300">
                                    <p><strong className="text-white">Nome:</strong> Thiago Lima (VDA – Venda Direta Automática)</p>
                                    <p><strong className="text-white">Produto:</strong> VDA – Venda Direta Automática</p>
                                    <p><strong className="text-white">Responsável:</strong> Thiago Lima</p>
                                    <p>
                                        <strong className="text-white">Contato:</strong>{' '}
                                        <a href="mailto:sac@aurenos.com.br" className="text-orange-400 hover:underline">sac@aurenos.com.br</a>
                                        {' · '}
                                        <a href="mailto:contato@aurenos.com.br" className="text-orange-400 hover:underline">contato@aurenos.com.br</a>
                                    </p>
                                </div>
                            ),
                        },
                        {
                            title: '2. Dados que coletamos',
                            content: (
                                <ul className="space-y-2 text-slate-300 list-none">
                                    {[
                                        'Nome completo e endereço de e-mail (ao se cadastrar ou adquirir produtos)',
                                        'Número de telefone / WhatsApp (quando fornecido voluntariamente)',
                                        'Dados de pagamento — processados exclusivamente pela plataforma Kiwify',
                                        'Dados de navegação: IP, tipo de navegador, páginas visitadas (via cookies e ferramentas analíticas)',
                                        'Dados de interação com anúncios (Meta Pixel, Google Analytics — mediante consentimento)',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="text-orange-500 mt-1 flex-shrink-0">·</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: '3. Finalidade do tratamento',
                            content: (
                                <ul className="space-y-2 text-slate-300 list-none">
                                    {[
                                        'Processar e entregar os produtos e serviços adquiridos',
                                        'Comunicar atualizações, novidades e ofertas relacionadas ao VDA',
                                        'Melhorar a experiência de navegação e personalizar conteúdos',
                                        'Cumprir obrigações legais e regulatórias',
                                        'Prevenir fraudes e garantir a segurança das transações',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-2">
                                            <span className="text-orange-500 mt-1 flex-shrink-0">·</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            ),
                        },
                        {
                            title: '4. Compartilhamento de dados',
                            content: (
                                <div className="space-y-2 text-slate-300">
                                    <p>Seus dados <strong className="text-white">não são vendidos</strong> a terceiros. Compartilhamos apenas com:</p>
                                    <ul className="space-y-1 list-none mt-2">
                                        {[
                                            'Kiwify — processamento de pagamentos',
                                            'Meta Ads e Google Analytics — veiculação de anúncios, mediante consentimento',
                                            'Ferramentas de e-mail marketing — envio de comunicações',
                                            'Autoridades públicas — quando exigido por lei',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-orange-500 mt-1 flex-shrink-0">·</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                        },
                        {
                            title: '5. Cookies, CAPI e Redirecionamento (WhatsApp)',
                            content: (
                                <p className="text-slate-300 leading-relaxed">
                                    A VDA coleta dados por meio de cookies e de rastreio via servidor (Pixel do Meta Ads e Conversions API - CAPI) voltados exclusivamente para fins de marketing, campanhas customizadas e acompanhamento de conversões de interessados. 
                                    <br/><br/>
                                    <strong className="text-white">Isenção e Consentimento:</strong> Ao clicar no botão principal de nossas landinpages (ex: "Entrar na Turma"), o usuário concorda expressamente com tal métrica e consente em ser direcionado de forma proativa ao WhatsApp para receber abertamente informações e tratativas a respeito da VDA.
                                </p>
                            ),
                        },
                        {
                            title: '6. Seus direitos (LGPD)',
                            content: (
                                <div className="space-y-2 text-slate-300">
                                    <p>Em conformidade com a LGPD, você tem direito a:</p>
                                    <ul className="space-y-1 list-none mt-2">
                                        {[
                                            'Confirmar a existência de tratamento dos seus dados',
                                            'Acessar seus dados pessoais em nossa posse',
                                            'Corrigir dados incompletos ou desatualizados',
                                            'Solicitar anonimização, bloqueio ou eliminação de dados desnecessários',
                                            'Revogar o consentimento a qualquer momento',
                                            'Solicitar a portabilidade dos dados',
                                        ].map((item) => (
                                            <li key={item} className="flex items-start gap-2">
                                                <span className="text-orange-500 mt-1 flex-shrink-0">·</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3">
                                        Contato:{' '}
                                        <a href="mailto:sac@aurenos.com.br" className="text-orange-400 hover:underline">sac@aurenos.com.br</a>
                                    </p>
                                </div>
                            ),
                        },
                        {
                            title: '7. Segurança e retenção',
                            content: (
                                <p className="text-slate-300 leading-relaxed">
                                    Adotamos medidas técnicas adequadas para proteger seus dados. Todas as transações
                                    são criptografadas via SSL/TLS. Os dados são mantidos pelo tempo necessário para
                                    cumprir as finalidades descritas ou atender obrigações legais.
                                </p>
                            ),
                        },
                        {
                            title: '8. Alterações',
                            content: (
                                <p className="text-slate-300 leading-relaxed">
                                    Podemos atualizar esta Política periodicamente. A data de última atualização
                                    estará sempre indicada no topo desta página.
                                </p>
                            ),
                        },
                        {
                            title: '9. Contato',
                            content: (
                                <div className="space-y-1 text-slate-300">
                                    <p>Para dúvidas, solicitações ou reclamações:</p>
                                    <div className="mt-3 space-y-1">
                                        <p>📧 <a href="mailto:sac@aurenos.com.br" className="text-orange-400 hover:underline">sac@aurenos.com.br</a></p>
                                        <p>📧 <a href="mailto:contato@aurenos.com.br" className="text-orange-400 hover:underline">contato@aurenos.com.br</a></p>
                                    </div>
                                </div>
                            ),
                        },
                    ].map(({ title, content }) => (
                        <section key={title} className="space-y-3">
                            <h2 className="font-serif text-xl font-bold text-white">{title}</h2>
                            {content}
                        </section>
                    ))}

                    <div className="border-t border-white/10 pt-6 text-center">
                        <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">
                            ← Voltar ao início
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
