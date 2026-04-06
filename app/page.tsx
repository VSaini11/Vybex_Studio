import { Hero } from '@/components/hero';
import { EarlyAccessPass } from '@/components/early-access-pass';
import { Portfolio } from '@/components/portfolio';
import { MerchandisePreview } from '@/components/merchandise-preview';
import { Pricing } from '@/components/pricing';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { AIOrb } from '@/components/ai-orb';
import { getGiveawayStatus, getSubscriberData, getFeedbackData, getWinnerReviews } from './admin/control-center/actions';
import { WinnersCircle } from '@/components/winners-circle';
import { Founder } from '@/components/founder';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const giveawayStatus = await getGiveawayStatus();
  const isGiveawayActive = giveawayStatus.success ? giveawayStatus.isActive : true;
  const nextDrawDate = giveawayStatus.success && giveawayStatus.nextDrawDate ? new Date(giveawayStatus.nextDrawDate) : new Date('2026-03-22T18:00:00+05:30');
  const prizeDescription = giveawayStatus.success && giveawayStatus.prizeDescription ? giveawayStatus.prizeDescription : 'Vybex VIP Pass & Merchandise';
  
  const subscriberData = await getSubscriberData();
  const totalSubscribers = subscriberData.success ? subscriberData.totalCount : 0;
  const subscriberInitials = subscriberData.success ? subscriberData.initials : [];

  const feedbackData = await getFeedbackData();
  const totalFeedbacks = feedbackData.success ? feedbackData.totalCount : 0;
  const averageRating = feedbackData.success ? feedbackData.averageRating : 0;
  const feedbackInitials = feedbackData.success ? feedbackData.initials : [];

  const winnerReviewsData = await getWinnerReviews();
  const winnerReviews = winnerReviewsData.success ? winnerReviewsData.reviews : [];

  return (
    <>
      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* Subtle background grain */}
        <div className="fixed inset-0 pointer-events-none grain" />

        <Hero 
          totalFeedbacks={totalFeedbacks}
          averageRating={averageRating}
          feedbackInitials={feedbackInitials}
        />
        <EarlyAccessPass 
          isActive={isGiveawayActive} 
          nextDrawDate={nextDrawDate}
          prizeDescription={prizeDescription}
          totalSubscribers={totalSubscribers}
          subscriberInitials={subscriberInitials}
        />
        <WinnersCircle winnerReviews={winnerReviews} />
        <Portfolio />
        <Founder />
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
