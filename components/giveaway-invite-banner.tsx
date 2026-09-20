'use client';

import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Gift, ShieldCheck, CalendarClock, CheckCircle2 } from 'lucide-react';
import { CountdownTimer } from './countdown-timer';
import { useState } from 'react';

interface GiveawayInviteBannerProps {
  prizeDescription?: string;
  nextDrawDate?: Date;
  onExploreGiveaway?: () => void;
}

export function GiveawayInviteBanner({
  prizeDescription = 'Vybex VIP Pass & Merchandise',
  nextDrawDate = new Date('2026-03-22T18:00:00+05:30'),
  onExploreGiveaway
}: GiveawayInviteBannerProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const formattedDate = nextDrawDate
    ? new Date(nextDrawDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'March 22, 2026';

  const formattedTime = nextDrawDate
    ? new Date(nextDrawDate).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '06:00 PM';

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        const isExisting = res.status === 200 || data.message?.includes('already');
        setSubmitStatus({
          type: 'success',
          message: isExisting 
            ? 'You are already subscribed & entered into the draw! 🎉'
            : 'You are successfully entered into the giveaway! Check your inbox for confirmation. 🚀'
        });
        setEmail('');
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to enter giveaway.' });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="invite-giveaway-banner"
      className="relative w-full overflow-hidden py-20 sm:py-28 bg-[#030503] text-white z-20 border-y border-emerald-500/10"
    >
      {/* ── Background Glows & Aura Waves (Vybex Green + Violet Fusion) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft centered emerald aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-emerald-500/15 blur-[140px] rounded-full" />
        
        {/* Violet / neon streak flowing across the stamp like the reference */}
        <div className="absolute top-12 left-1/2 -translate-x-1/3 w-[500px] h-[300px] bg-gradient-to-r from-emerald-500/20 via-teal-500/25 to-purple-600/30 blur-[100px] rounded-full transform -rotate-12 pointer-events-none" />
        
        {/* Ambient subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'radial-gradient(#22c55e 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ── LEFT COLUMN: Text Content, Timer, Fair Badge & Entry Box ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-semibold uppercase tracking-widest">
              <Gift size={13} className="text-emerald-400" />
              Special Invitation Drop
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              You’re Invited
            </h1>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-light">
              Some creators and founders think about <span className="font-semibold text-white">technology and digital products as pure craft</span>.
            </p>

            <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-xl">
              They obsess over every pixel, experience, and interaction. They strive to build something extraordinary. To celebrate our early journey, we are opening our <span className="text-white font-medium">VIP Giveaway Draw</span>.
            </p>

            {/* Prize and Date Display */}
            <div className="pt-1">
              <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                Win the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400">{prizeDescription}</span>
              </p>
              <p className="text-xs sm:text-sm font-mono text-emerald-400/80 uppercase tracking-widest mt-1">
                Draw Announcement • {formattedDate} at {formattedTime}
              </p>
            </div>

            {/* ── Live Running Countdown Timer ── */}
            <div className="pt-2 flex flex-col items-center lg:items-start w-full">
              <div className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-black/60 border border-emerald-500/25 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.12)]">
                <CalendarClock className="text-emerald-400 shrink-0" size={24} />
                <div className="flex flex-col items-start">
                  <span className="text-[10px] text-emerald-300/80 font-mono uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Draw Countdown
                  </span>
                  <CountdownTimer targetDate={nextDrawDate} />
                </div>
              </div>
            </div>

            {/* ── 100% Verified Fair Draw Badge ── */}
            <div className="pt-1">
              <div className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 transition-colors">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-gray-200">100% Verified Fair Draw</span>
              </div>
            </div>

            {/* ── Direct Free Entry Box ── */}
            <div className="pt-2 w-full max-w-md">
              <form
                onSubmit={handleSubscribe}
                className="flex items-center rounded-2xl overflow-hidden p-1 bg-black/60 border border-emerald-500/30 shadow-[0_0_25px_rgba(34,197,94,0.15)] focus-within:border-emerald-400 transition-all"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email to enter draw"
                  className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-200 placeholder-gray-500 outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm text-black bg-emerald-400 hover:bg-emerald-300 active:scale-95 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)] flex items-center gap-1.5 cursor-pointer disabled:opacity-50 flex-shrink-0"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Claim Entry</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {submitStatus && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 text-xs font-medium flex items-center justify-center lg:justify-start gap-1.5 ${
                    submitStatus.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {submitStatus.type === 'success' && <CheckCircle2 size={14} />}
                  {submitStatus.message}
                </motion.div>
              )}

              <p className="text-[11px] text-gray-500 mt-3 tracking-wider uppercase text-center lg:text-left">
                No purchase necessary • Random selection from all active subscribers
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN: Stamp Ticket / Badge Element ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center items-center relative group"
          >
            {/* Neon back aura behind the stamp */}
            <div className="absolute -inset-6 bg-gradient-to-r from-emerald-500/30 via-green-400/20 to-purple-600/30 blur-3xl rounded-3xl opacity-75 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Perforated Stamp Card Container */}
            <div className="relative p-2.5 rounded-2xl bg-gradient-to-b from-white/15 via-white/5 to-transparent backdrop-blur-xl border border-white/10 shadow-2xl">
              
              {/* ── Amazon Official Corner Stamp Badge (Clean Transparent PNG) ── */}
              <div className="absolute -top-3.5 -right-3.5 z-30 drop-shadow-[0_4px_16px_rgba(255,153,0,0.45)] hover:scale-110 transition-transform duration-300 pointer-events-none select-none">
                <img 
                  src="/image (1).png" 
                  alt="Amazon" 
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div className="relative w-[320px] sm:w-[390px] min-h-[230px] rounded-xl bg-black/90 p-5 sm:p-6 flex flex-col justify-between overflow-hidden border border-emerald-500/20 shadow-[inset_0_0_30px_rgba(34,197,94,0.08)]">
                
                {/* Internal abstract glowing wave overlay */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-85"
                  style={{
                    background: 'radial-gradient(circle at 75% 30%, rgba(147, 51, 234, 0.45) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(34, 197, 94, 0.4) 0%, transparent 55%)',
                  }}
                />

                {/* Perforated Stamp Edge */}
                <div className="absolute inset-1.5 border border-dashed border-white/20 rounded-lg pointer-events-none" />

                {/* Stamp Top Meta Header */}
                <div className="relative z-10 flex items-start justify-between text-left pr-6">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.22em] text-emerald-300/90 uppercase">
                        Exclusive Event
                      </p>
                    </div>
                    <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-gray-400 uppercase mt-0.5">
                      For Future Builders
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-white">
                      {formattedDate}
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                      {formattedTime}
                    </p>
                  </div>
                </div>

                {/* Stamp Center Graphic / Title */}
                <div className="relative z-10 my-auto py-2 text-center flex flex-col items-center">
                  <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-emerald-400 uppercase mb-1">
                    Community Giveaway
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,0.4)]">
                    VYBEX FORWARD
                  </h2>

                  {/* Prize Details Pill */}
                  <div className="inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-emerald-400/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]">
                    <Sparkles size={12} className="text-emerald-400 shrink-0" />
                    <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wide uppercase text-emerald-300">
                      {prizeDescription}
                    </span>
                  </div>
                </div>

                {/* Stamp Bottom Meta */}
                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10 text-[9px] sm:text-[10px] font-mono text-gray-400">
                  <span className="tracking-widest">SERIES #2026-VIP</span>
                  <span className="text-emerald-400 font-semibold tracking-widest">100% FREE ENTRY</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
