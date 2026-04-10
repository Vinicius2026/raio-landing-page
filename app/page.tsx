import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import MethodologySection from '@/components/MethodologySection';
import DashboardSection from '@/components/DashboardSection';
import AboutSection from '@/components/AboutSection';
import GroupsSection from '@/components/GroupsSection';
import OfferSection from '@/components/OfferSection';
import FooterSection from '@/components/FooterSection';

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