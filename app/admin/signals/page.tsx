'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Signal as SignalIcon, Plus, Trash2, Loader2, Image as ImageIcon, Calendar, Clock, User, ChevronLeft, Eye, Edit3, Bold, Heading1, Heading2, Heading3, List, Sparkles } from 'lucide-react';
import { addSignal, getSignals, deleteSignal, updateSignal } from './actions';
import { toast } from 'sonner';
import Link from 'next/link';
import { MarkdownRenderer } from '@/components/markdown-renderer';

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

export default function SignalAdminPage() {
  const [signals, setSignals] = useState<SignalItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [newSignal, setNewSignal] = useState({
    title: '',
    content: '',
    image: '',
    readTime: '5 min read',
    author: 'Vybex Team',
    category: 'PLATFORM SIGNAL',
  });

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    setIsLoading(true);
    const result = await getSignals();
    if (result.success && result.signals) {
      setSignals(result.signals);
    }
    setIsLoading(false);
  };

  const handleCreateSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSignal.title || !newSignal.content) {
      toast.error('Title and content are required.');
      return;
    }
 
    setIsSubmitting(true);
    
    if (editingId) {
      // Update Mode
      const result = await updateSignal(editingId, newSignal);
      if (result.success && result.signal) {
        setSignals(signals.map(s => s._id === editingId ? result.signal : s));
        handleCancelEdit();
        toast.success('Transmission updated successfully!');
      } else {
        toast.error(result.error || 'Failed to update signal');
      }
    } else {
      // Create Mode
      const result = await addSignal(newSignal);
      if (result.success && result.signal) {
        setSignals([result.signal, ...signals]);
        handleCancelEdit();
        toast.success('Signal posted successfully!');
      } else {
        toast.error(result.error || 'Failed to post signal');
      }
    }
    setIsSubmitting(false);
  };

  const handleEdit = (signal: SignalItem) => {
    setEditingId(signal._id);
    setNewSignal({
      title: signal.title,
      content: signal.content,
      image: signal.image,
      readTime: signal.readTime,
      author: signal.author,
      category: signal.category || 'PLATFORM SIGNAL',
    });
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewSignal({
      title: '',
      content: '',
      image: '',
      readTime: '5 min read',
      author: 'Vybex Team',
      category: 'PLATFORM SIGNAL',
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this signal?')) {
      const result = await deleteSignal(id);
      if (result.success) {
        setSignals(signals.filter(s => s._id !== id));
        toast.success('Signal deleted');
      } else {
        toast.error('Failed to delete');
      }
    }
  };

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.getElementById('signal-content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = newSignal.content;
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const newContent = before + prefix + selection + suffix + after;
    setNewSignal({ ...newSignal, content: newContent });
    
    // Reset focus and selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 sm:p-12 font-sans selection:bg-green-500/30">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <Link href="/admin/control-center" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors mr-2">
              <ChevronLeft size={20} />
            </Link>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
              <SignalIcon size={24} className="text-black" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Vybex Signals</h1>
              <p className="text-gray-400 text-sm">Manage blog posts and announcements.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-16">
          
          {/* Create Form - Centered and Wide */}
          <div className="w-full max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 sm:p-10 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                {editingId ? <Edit3 size={24} className="text-green-400" /> : <Plus size={24} className="text-green-400" />}
                {editingId ? 'Modify Transmission' : 'Broadcast Transmission'}
              </h3>

              <form onSubmit={handleCreateSignal} className="space-y-6">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Signal Heading</label>
                  <input 
                    type="text" 
                    value={newSignal.title}
                    onChange={(e) => setNewSignal({...newSignal, title: e.target.value})}
                    placeholder="Enter an impactful title..."
                    className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-lg font-bold focus:outline-none focus:border-green-500/50 transition-all placeholder:text-gray-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Estimated synchronization</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input 
                        type="text" 
                        value={newSignal.readTime}
                        onChange={(e) => setNewSignal({...newSignal, readTime: e.target.value})}
                        placeholder="e.g. 5 min read"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Broadcaster Identity</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input 
                        type="text" 
                        value={newSignal.author}
                        onChange={(e) => setNewSignal({...newSignal, author: e.target.value})}
                        placeholder="Author name"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Signal Category</label>
                    <div className="relative">
                      <Sparkles size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                      <input 
                        type="text" 
                        value={newSignal.category}
                        onChange={(e) => setNewSignal({...newSignal, category: e.target.value})}
                        placeholder="e.g. PLATFORM SIGNAL"
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-green-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">Visual Asset</label>
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        
                        setIsUploading(true);
                        const formData = new FormData();
                        formData.append('file', file);

                        try {
                          const response = await fetch('/api/admin/upload-signal', {
                            method: 'POST',
                            body: formData,
                          });
                          const result = await response.json();
                          if (result.success) {
                            setNewSignal({...newSignal, image: result.url});
                            toast.success('Asset synchronized successfully');
                          } else {
                            toast.error(result.error || 'Upload failed');
                          }
                        } catch (err) {
                          toast.error('Sync failure: Network error');
                        } finally {
                          setIsUploading(false);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="w-full bg-black/40 border border-dashed border-white/10 rounded-2xl px-4 py-10 text-center group-hover:border-green-500/30 transition-all">
                      {isUploading ? (
                        <Loader2 className="animate-spin mx-auto text-green-500" size={32} strokeWidth={1} />
                      ) : newSignal.image ? (
                         <div className="flex flex-col items-center gap-4">
                           <div className="relative">
                             <img src={newSignal.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-2xl shadow-green-500/10 border border-white/10" />
                             <div className="absolute -top-2 -right-2 bg-green-500 text-black p-1 rounded-full"><Plus size={12} strokeWidth={3} className="rotate-45" /></div>
                           </div>
                           <span className="text-[10px] text-green-400 font-bold tracking-widest uppercase bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">Synchronization Complete</span>
                         </div>
                      ) : (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-green-500 transition-colors">
                            <ImageIcon size={24} strokeWidth={1.5} />
                          </div>
                          <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">Upload primary visual asset for this signal</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs text-gray-500 uppercase tracking-widest font-black">Data Stream</label>
                    <div className="flex bg-black/60 rounded-xl p-1 border border-white/5">
                      <button 
                        type="button"
                        onClick={() => setIsPreviewMode(false)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${!isPreviewMode ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        <Edit3 size={12} /> COMPOSE
                      </button>
                      <button 
                        type="button"
                        onClick={() => setIsPreviewMode(true)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${isPreviewMode ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        <Eye size={12} /> VISUALIZE
                      </button>
                    </div>
                  </div>

                  {!isPreviewMode ? (
                    <div className="space-y-3">
                      {/* Premium Toolbar */}
                      <div className="flex items-center gap-1.5 p-1.5 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
                        <button type="button" onClick={() => insertMarkdown('**', '**')} className="p-2.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all" title="Bold"><Bold size={16} /></button>
                        <div className="w-px h-5 bg-white/5 mx-1" />
                        <button type="button" onClick={() => insertMarkdown('# ')} className="p-2.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all" title="H1"><Heading1 size={16} /></button>
                        <button type="button" onClick={() => insertMarkdown('## ')} className="p-2.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all" title="H2"><Heading2 size={16} /></button>
                        <button type="button" onClick={() => insertMarkdown('### ')} className="p-2.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all" title="H3"><Heading3 size={16} /></button>
                        <div className="w-px h-5 bg-white/5 mx-1" />
                        <button type="button" onClick={() => insertMarkdown('- ')} className="p-2.5 hover:bg-white/5 text-gray-400 hover:text-white rounded-lg transition-all" title="List"><List size={16} /></button>
                      </div>
                      
                      <textarea 
                        id="signal-content"
                        value={newSignal.content}
                        onChange={(e) => setNewSignal({...newSignal, content: e.target.value})}
                        placeholder="Begin encoding signal data..."
                        rows={15}
                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-green-500/30 transition-all resize-none font-sans leading-relaxed custom-scrollbar placeholder:text-gray-700"
                      />
                    </div>
                  ) : (
                    <div className="w-full bg-black/40 border border-white/10 rounded-2xl px-8 py-10 min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar">
                      <MarkdownRenderer content={newSignal.content || '*Transmission empty. Awaiting data...*'} />
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full group relative overflow-hidden bg-white text-black font-black uppercase tracking-widest py-5 rounded-2xl transition-all hover:bg-green-500 hover:text-black border border-white shadow-[0_0_30px_rgba(255,255,255,0.05)] disabled:opacity-30 flex items-center justify-center gap-3 overflow-hidden"
                >
                  {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : (
                    <>
                      <SignalIcon size={18} className="group-hover:scale-110 transition-transform" /> 
                      {editingId ? 'Update Transmission' : 'Initiate Broadcast'}
                    </>
                  )}
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>

                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-all"
                  >
                    Cancel Edit & Return to New Signal
                  </button>
                )}
              </form>
            </motion.div>
          </div>

          {/* List Area */}
          <div className="w-full max-w-4xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
              <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 uppercase text-gray-400">
                <Calendar size={20} className="text-green-500/50" />
                Synchronization History
              </h3>
              {signals.length > 0 && <span className="text-[10px] font-black bg-white/5 px-3 py-1 rounded-full border border-white/10 text-gray-500 uppercase tracking-widest">{signals.length} Signals</span>}
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-40 bg-white/[0.01] border border-white/5 rounded-[2.5rem]">
                <Loader2 className="animate-spin text-green-500/50 mb-4" size={40} strokeWidth={1} />
                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">Synchronizing Archive...</p>
              </div>
            ) : signals.length === 0 ? (
              <div className="bg-white/[0.01] border border-white/5 rounded-[2.5rem] p-20 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-900/50 rounded-full flex items-center justify-center mb-6 border border-white/5">
                  <SignalIcon size={32} className="text-gray-800" strokeWidth={1} />
                </div>
                <p className="text-gray-500 font-black text-xl mb-2 uppercase tracking-tight">Archive Empty</p>
                <p className="text-gray-600 text-xs max-w-xs mx-auto leading-relaxed">System awaiting first transmission from the command center.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {signals.map((signal, index) => (
                  <motion.div 
                    layout
                    key={signal._id} 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white/[0.02] border border-white/5 hover:border-green-500/20 rounded-[2rem] p-6 flex flex-col sm:flex-row gap-8 transition-all relative overflow-hidden"
                  >
                    {signal.image ? (
                      <div className="w-full sm:w-40 h-40 rounded-2xl overflow-hidden flex-shrink-0 border border-white/5 group-hover:border-green-500/30 transition-all">
                        <img src={signal.image} alt={signal.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100" />
                      </div>
                    ) : (
                      <div className="w-full sm:w-40 h-40 rounded-2xl bg-gray-900 flex items-center justify-center flex-shrink-0 border border-white/5">
                        <SignalIcon size={32} className="text-gray-800" strokeWidth={1} />
                      </div>
                    )}
                    
                    <div className="flex-1 flex flex-col justify-center min-w-0 py-2">
                       <div className="flex items-center gap-3 mb-3">
                        <span className="flex items-center gap-1.5 text-[10px] text-gray-600 font-bold uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                          {new Date(signal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="w-1.5 h-px bg-white/10" />
                        <span className="flex items-center gap-1.5 text-[10px] text-green-500/60 font-bold uppercase tracking-widest">
                          {signal.readTime}
                        </span>
                      </div>

                      <h4 className="font-black text-white text-2xl mb-4 group-hover:text-green-400 transition-colors truncate">{signal.title}</h4>
                      
                      <div className="flex items-center gap-6">
                      <div className="flex items-center gap-4">
                        <Link 
                          href={`/signals/${signal.slug}`} 
                          target="_blank"
                          className="text-[10px] bg-white text-black px-4 py-2 rounded-lg font-black uppercase tracking-widest hover:bg-green-500 transition-all shadow-xl shadow-black/20"
                        >
                          View
                        </Link>
                        <button 
                          onClick={() => handleEdit(signal)}
                          className="text-[10px] bg-white/5 border border-white/10 px-4 py-2 rounded-lg font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(signal._id)}
                          className="text-[10px] text-red-500/50 hover:text-red-500 font-black uppercase tracking-widest transition-all p-2 hover:bg-red-500/5 rounded-lg"
                        >
                          Terminate
                        </button>
                      </div>
                      </div>
                    </div>

                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                       <SignalIcon size={120} strokeWidth={1} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
