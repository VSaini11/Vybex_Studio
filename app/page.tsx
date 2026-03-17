import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { EarlyAccessPass } from '@/components/early-access-pass';
import { About } from '@/components/about';
import { Services } from '@/components/services';
import { Portfolio } from '@/components/portfolio';
import { Features } from '@/components/features';
import { Pricing } from '@/components/pricing';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { AIOrb } from '@/components/ai-orb';

export default function Home() {
  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* Subtle background grain */}
        <div className="fixed inset-0 pointer-events-none grain" />

        <Navbar />
        <Hero />
        <EarlyAccessPass />
        <About />
        <Services />
        <Portfolio />
        <Features />
        <Pricing />
        <Contact />
        <Footer />
      </main>

      {/* AI Orb — fixed bottom-right, replace href with your target URL */}
      <AIOrb tooltipText="Open AI Builder" />
    </>
  );
}
