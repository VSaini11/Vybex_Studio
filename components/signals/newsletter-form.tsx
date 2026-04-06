'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'actually_subscribed' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.message.includes('already subscribed')) {
          setStatus('actually_subscribed');
          setMessage(data.message);
        } else {
          setStatus('success');
          setMessage(data.message);
        }
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Failed to connect to the server.');
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full relative">
      <AnimatePresence mode="wait">
        {status === 'success' || status === 'actually_subscribed' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-4 py-4"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
            <p className="text-green-400 font-bold text-lg tracking-tight">{message}</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-2 text-xs font-black uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
            >
              Subscribe another email
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center gap-4 p-2 bg-white/[0.03] border border-white/10 rounded-[2rem] focus-within:border-green-500/50 transition-all duration-500 shadow-2xl"
          >
            <div className="relative flex-1 w-full flex items-center pl-6">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent border-none outline-none text-white text-sm py-4 placeholder:text-gray-600 font-medium"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto px-8 py-4 rounded-[1.5rem] bg-green-500 text-black font-black uppercase tracking-[0.2em] text-[11px] hover:bg-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 overflow-hidden shadow-xl shadow-green-500/20"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  Subscribe
                  <Send size={16} />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {status === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 mt-4 text-xs font-bold text-red-500 flex items-center justify-center gap-2"
        >
          <AlertCircle size={14} />
          {message}
        </motion.p>
      )}
    </div>
  );
}
