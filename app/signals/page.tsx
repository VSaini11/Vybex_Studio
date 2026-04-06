import { Signal as SignalIcon, Sparkles } from 'lucide-react';
import { getSignals } from '../admin/signals/actions';
import SignalsList from '@/components/signals-list';
import NewsletterForm from '@/components/signals/newsletter-form';
import * as motion from 'framer-motion/client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SignalsPage() {
  const result = await getSignals();
  const signals = (result.success && result.signals) ? result.signals : [];

  return (
    <div className="min-h-screen bg-[#080d08] text-[#d4e8d4] font-sans selection:bg-green-500/30 overflow-hidden relative">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-green-500/10 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
        
        {/* Signals List Wrapper */}
        <SignalsList signals={signals} />

        {/* Newsletter Section */}
        <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="mt-32 p-12 rounded-[3.5rem] bg-gradient-to-br from-green-500/10 via-black to-transparent border border-green-500/20 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-green-500/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">Never miss a signal.</h2>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Get the latest platform updates and ecosystem news delivered straight to your inbox.
          </p>
          
          <NewsletterForm />
          
          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
            Secure Transmission // End-to-End Encrypted
          </p>
        </motion.div>

      </div>
      
      {/* Bottom Helix Visualization (Inspired by layout) */}
      <div className="fixed bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-[#080d08] to-transparent pointer-events-none z-0" />
    </div>
  );
}
