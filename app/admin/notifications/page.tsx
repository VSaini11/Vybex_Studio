'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Eye, Layout, Link as LinkIcon, Lock, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [formData, setFormData] = useState({
    subject: '',
    content: '',
    ctaText: '',
    ctaUrl: '',
    secret: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.subject || !formData.content || !formData.secret) {
      setStatus('error');
      setMessage('Subject, content, and secret are required.');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/notify-subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setMessage(data.message || 'Notification sent successfully!');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send notification.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#040704] text-[#d4e8d4] p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Draft and send notifications to all subscribers.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 bg-[#0a110a] border border-[#1a2e1a] px-4 py-2 rounded-xl"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-400">System Online</span>
          </motion.div>
        </header>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#080d08] border border-[#1a1a1a] rounded-2xl p-6 sm:p-8 shadow-2xl"
          >
            <div className="flex items-center gap-2 mb-8 text-white font-semibold text-lg">
              <Layout size={20} className="text-green-400" />
              <h2>Compose Notification</h2>
            </div>

            <form onSubmit={handleSend} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Subject Line</label>
                <input
                  type="text"
                  placeholder="e.g. 🎉 Exciting News from Vybex Studio!"
                  className="w-full bg-[#0a110a] border border-[#1a2e1a] rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-gray-700"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Main Content</label>
                <textarea
                  placeholder="Write your message here..."
                  rows={8}
                  className="w-full bg-[#0a110a] border border-[#1a2e1a] rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-gray-700 resize-none"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <LinkIcon size={14} /> CTA Text
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. View Project"
                    className="w-full bg-[#0a110a] border border-[#1a2e1a] rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-gray-700"
                    value={formData.ctaText}
                    onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                    <LinkIcon size={14} /> CTA URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    className="w-full bg-[#0a110a] border border-[#1a2e1a] rounded-xl px-4 py-3 focus:outline-none focus:border-green-500/50 transition-colors placeholder:text-gray-700"
                    value={formData.ctaUrl}
                    onChange={(e) => setFormData({ ...formData, ctaUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-[#1a1a1a]">
                <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                  <Lock size={14} /> Admin Secret
                </label>
                <input
                  type="password"
                  placeholder="Enter your NOTIFY_SECRET"
                  className="w-full bg-[#0a110a] border border-[#1a2e1a] rounded-xl px-4 py-3 focus:outline-none focus:border-red-500/30 transition-colors placeholder:text-gray-700"
                  value={formData.secret}
                  onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
                />
              </div>

              <AnimatePresence mode="wait">
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-4 rounded-xl flex items-start gap-3 ${
                      status === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                      status === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                      'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                    }`}
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin mt-0.5" size={18} /> :
                     status === 'success' ? <CheckCircle2 className="mt-0.5" size={18} /> :
                     <AlertCircle className="mt-0.5" size={18} />}
                    <span className="text-sm">{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-black font-bold py-4 rounded-xl shadow-lg shadow-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {status === 'loading' ? 'Processing...' : (
                  <>
                    <Send size={18} />
                    Send Notification to All Subscribers
                  </>
                )}
              </motion.button>
            </form>
          </motion.section>

          {/* Preview Section */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:sticky lg:top-8 h-fit"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Eye size={18} className="text-green-400" />
                <h3>Live Email Preview</h3>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-widest">Subscriber View</span>
            </div>

            <div className="bg-[#080d08] border border-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
              {/* Email Envelope UI */}
              <div className="bg-[#0f1a0f] px-6 py-4 border-b border-[#1a2e1a]">
                <div className="text-xs text-gray-500 mb-1">Subject</div>
                <div className="text-sm font-medium text-white line-clamp-1">{formData.subject || '(Subject will appear here)'}</div>
              </div>

              {/* Email Body */}
              <div className="p-8 sm:p-12 bg-black min-h-[400px]">
                <div className="bg-[#080d08] border border-[#1a1a1a] rounded-2xl p-8 max-w-[500px] mx-auto shadow-inner">
                  <h2 className="text-[#4ade80] text-xl font-bold mb-6">Vybex Studio Update 🚀</h2>
                  
                  <div className="text-[#9ca3af] text-sm leading-relaxed mb-8 whitespace-pre-wrap">{formData.content || 'Your message content will appear here...'}</div>

                  {formData.ctaUrl && (
                    <div className="text-center my-10">
                      <div className="inline-block bg-[#4ade80] text-black px-6 py-3 rounded-lg font-bold text-sm shadow-lg shadow-green-500/20">
                        {formData.ctaText || 'Learn More'}
                      </div>
                    </div>
                  )}

                  <div className="pt-6 border-t border-[#1a1a1a] mt-auto">
                    <p className="text-[#6b7280] text-xs leading-relaxed">
                      — The Vybex Studio Team<br />
                      <span className="text-[#4ade80]">vybexstudio.in</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl">
              <p className="text-xs text-yellow-500/80 leading-relaxed italic">
                Note: This is a visual representation. The actual email will be sent via Gmail API and may vary slightly in different mail clients.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
