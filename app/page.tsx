import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { EarlyAccessPass } from '@/components/early-access-pass';
import { Services } from '@/components/services';
import { Portfolio } from '@/components/portfolio';
import { MerchandisePreview } from '@/components/merchandise-preview';
import { Pricing } from '@/components/pricing';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { AIOrb } from '@/components/ai-orb';
import { getGiveawayStatus } from './admin/control-center/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const giveawayStatus = await getGiveawayStatus();
  const isGiveawayActive = giveawayStatus.success ? giveawayStatus.isActive : true;
  const nextDrawDate = giveawayStatus.success && giveawayStatus.nextDrawDate ? new Date(giveawayStatus.nextDrawDate) : new Date('2026-03-22T18:00:00+05:30');
  const prizeDescription = giveawayStatus.success && giveawayStatus.prizeDescription ? giveawayStatus.prizeDescription : 'Vybex VIP Pass';

  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* Subtle background grain */}
        <div className="fixed inset-0 pointer-events-none grain" />

        <Navbar />
        <Hero />
        <EarlyAccessPass 
          isActive={isGiveawayActive} 
          nextDrawDate={nextDrawDate}
          prizeDescription={prizeDescription}
        />
        <Services />
        <Portfolio />
        <MerchandisePreview />
        <Pricing />
        <Contact />
        <Footer />
      </main>

      {/* AI Orb — fixed bottom-right, replace href with your target URL */}
      <AIOrb tooltipText="Open AI Builder" />
    </>
  );
}
