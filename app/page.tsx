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

export default function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <MethodologySection />
                <DashboardSection />
                <OfferSection />
                <AboutSection />
                <GroupsSection />
            </main>
            <FooterSection />
        </>
    );
}
// teste git