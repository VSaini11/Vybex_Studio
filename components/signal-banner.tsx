import Link from 'next/link';
import { getSignals } from '@/app/admin/signals/actions';

export async function SignalBanner({ isActive = true }: { isActive?: boolean }) {
  const result = await getSignals();
  const latestSignal = (result.success && result.signals && result.signals.length > 0) ? result.signals[0] : null;

  if (!latestSignal) return null;

  return (
    <section className={`w-full relative z-20 flex justify-center pb-24 px-4 sm:px-6 border-b border-white/5 ${isActive ? 'bg-[#050505]/80 backdrop-blur-md' : 'bg-[#050505]'}`}>
      <Link href={`/signals/${latestSignal.slug}`} className="block w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/5 hover:border-purple-500/20 transition-all duration-500 group shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img 
          src="/IMG_20260720_225204.png" 
          alt="Read our latest Transmission on Vybex Signals" 
          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
        />
      </Link>
    </section>
  );
}
