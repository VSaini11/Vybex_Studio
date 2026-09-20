import { Hero } from '@/components/hero';
import { VyanaAudioIntro } from '@/components/vyana-audio-intro';
import { GiveawayInviteBanner } from '@/components/giveaway-invite-banner';
import { Portfolio } from '@/components/portfolio';
import { MerchandisePreview } from '@/components/merchandise-preview';
import { Pricing } from '@/components/pricing';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';
import { AIOrb } from '@/components/ai-orb';
import { getGiveawayStatus, getSubscriberData, getFeedbackData, getWinnerReviews } from './admin/control-center/actions';
import { getSignals } from '@/app/admin/signals/actions';
import { WinnersCircle } from '@/components/winners-circle';
import { Founder } from '@/components/founder';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const giveawayStatus = await getGiveawayStatus();
  const isGiveawayActive = giveawayStatus.success ? giveawayStatus.isActive : true;
  const nextDrawDate = giveawayStatus.success && giveawayStatus.nextDrawDate ? new Date(giveawayStatus.nextDrawDate) : new Date('2026-03-22T18:00:00+05:30');
  const prizeDescription = giveawayStatus.success && giveawayStatus.prizeDescription ? giveawayStatus.prizeDescription : 'Amazon Gift Voucher Worth 1000 Rs';
  // Section 1 = 'vyana' (Vyana Audio Intro), Section 2 = 'giveaway' (Giveaway Ad Banner)
  const activeIntroSection = giveawayStatus.success && giveawayStatus.activeIntroSection ? giveawayStatus.activeIntroSection : 'giveaway';
  
  const feedbackData = await getFeedbackData();
  const totalFeedbacks = feedbackData.success ? feedbackData.totalCount : 0;
  const averageRating = feedbackData.success ? feedbackData.averageRating : 0;
  const feedbackInitials = feedbackData.success ? feedbackData.initials : [];

  const winnerReviewsData = await getWinnerReviews();
  const winnerReviews = winnerReviewsData.success ? winnerReviewsData.reviews : [];

  return (
    <>
      <main className="min-h-dvh bg-[#080d08] text-white overflow-x-clip">
        {/* Subtle background grain */}
        <div className="fixed inset-0 pointer-events-none grain" />

        <Hero 
          totalFeedbacks={totalFeedbacks}
          averageRating={averageRating}
          feedbackInitials={feedbackInitials}
        />
        
        {/* ── 2nd Section Toggle ────────────────────────────────────────────────────────
            Section 1: Vyana Audio Intro (<VyanaAudioIntro />)
            Section 2: Giveaway Ad 'You Are Invited' Banner (<GiveawayInviteBanner />)
            Can be toggled from /admin/control-center or swapped here.
        ───────────────────────────────────────────────────────────────────────────── */}
        {activeIntroSection === 'vyana' ? (
          /* [Section 1: Original Vyana Audio Intro] */
          <VyanaAudioIntro />
        ) : (
          /* [Section 2: Active Giveaway 'You Are Invited' Ad Banner] */
          <GiveawayInviteBanner 
            prizeDescription={prizeDescription}
            nextDrawDate={nextDrawDate}
          />
        )}

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
