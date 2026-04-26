import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FooterSection from '@/components/FooterSection';

// Carregamento diferido de componentes que não impactam o "Above the Fold" (LCP inicial)
const MethodologySection = dynamic(() => import('@/components/MethodologySection'), { ssr: true });
const DashboardSection = dynamic(() => import('@/components/DashboardSection'), { ssr: true });
const OfferSection = dynamic(() => import('@/components/OfferSection'), { ssr: true });
const AboutSection = dynamic(() => import('@/components/AboutSection'), { ssr: true });
const GroupsSection = dynamic(() => import('@/components/GroupsSection'), { ssr: true });
const ParticleWaveBackground = dynamic(() => import('@/components/ParticleWaveBackground'), { ssr: false });

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <MethodologySection />
                <DashboardSection />
                <OfferSection />
                <div className="relative overflow-hidden bg-zinc-950">
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <ParticleWaveBackground />
                    </div>
                    
                    <div className="relative z-10">
                        <AboutSection />
                        <GroupsSection />
                    </div>
                </div>
            </main>
            
            {/* O Footer tem que ficar sobreposto pois é a real base, e colocaremos com z-10 para ficar em harmonia com nosso fundo 3D */}
            <div className="relative z-10 bg-[#0B0F19]">
                <FooterSection />
            </div>
        </>
    );
}
// teste git