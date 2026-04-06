import { getSignalBySlug, getSignals } from '../../admin/signals/actions';
import Link from 'next/link';
import { Signal as SignalIcon } from 'lucide-react';
import SignalDetailClient from '@/components/signal-detail-client';

interface SignalItem {
  _id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  readTime: string;
  author: string;
  category: string;
  createdAt: string;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SignalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const result = await getSignalBySlug(slug);
  
  if (!result.success || !result.signal) {
    return (
      <div className="min-h-screen bg-[#080d08] text-[#d4e8d4] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
          <SignalIcon size={40} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Signal Lost</h1>
        <p className="text-gray-500 mb-8 max-w-md">The transmission you are looking for does not exist or has been terminated.</p>
        <Link href="/signals" className="px-6 py-3 rounded-xl bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-100 transition-all">
          Return to Signals
        </Link>
      </div>
    );
  }

  const signal = result.signal;
  
  // Load more signals for recommendation
  const allResult = await getSignals();
  const moreSignals = (allResult.success && allResult.signals) 
    ? allResult.signals.filter((s: SignalItem) => s.slug !== slug).slice(0, 2)
    : [];

  return <SignalDetailClient signal={signal} moreSignals={moreSignals} />;
}
