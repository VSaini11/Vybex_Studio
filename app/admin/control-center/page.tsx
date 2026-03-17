'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, Gift, Sparkles, Trophy, Loader2, Unlock } from 'lucide-react';
import { getRandomSubscriber } from './actions';
import { addAuthorizedTool, getAuthorizedTools, deleteAuthorizedTool } from './tool-actions';
import confetti from 'canvas-confetti';

interface AuthorizedTool {
  id: string;
  name: string;
  url: string;
  apiKey: string;
  isActive: boolean;
}

export default function GiveawayAdminPage() {
  const [isRolling, setIsRolling] = useState(false);
  const [winnerEmail, setWinnerEmail] = useState<string | null>(null);
  const [winnerCode, setWinnerCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [authorizedTools, setAuthorizedTools] = useState<AuthorizedTool[]>([]);
  const [isLoadingTools, setIsLoadingTools] = useState(true);
  const [isAddingTool, setIsAddingTool] = useState(false);
  const [addingToolError, setAddingToolError] = useState<string | null>(null);

  const targetDate = new Date('2026-03-22T18:00:00');
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    const fetchTools = async () => {
      setIsLoadingTools(true);
      const result = await getAuthorizedTools();
      if (result.success && result.tools) {
        setAuthorizedTools(result.tools);
      }
      setIsLoadingTools(false);
    };
    fetchTools();

    const checkLockStatus = () => {
      setIsLocked(new Date() < targetDate);
    };
    
    checkLockStatus();
    const interval = setInterval(checkLockStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4ade80', '#22c55e', '#a855f7', '#3b82f6']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4ade80', '#22c55e', '#a855f7', '#3b82f6']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleRollWinner = async () => {
    if (isLocked) return;
    
    setIsRolling(true);
    setError(null);
    setWinnerEmail(null);
    setWinnerCode(null);
    
    // Artificial delay for suspense
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const result = await getRandomSubscriber();
      
      if (result.success && result.subscriber) {
        setWinnerEmail(result.subscriber.email);
        setWinnerCode(result.subscriber.vipCode || null);
        triggerConfetti();
      } else {
        setError(result.error || 'Failed to draw a winner');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsRolling(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 sm:p-12 font-sans selection:bg-green-500/30">
      
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Gift size={24} className="text-black" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Control Center</h1>
            <p className="text-gray-400 text-sm">Manage active giveaways and draw winners completely at random.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Active Giveaway Details Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:p-8 relative overflow-hidden backdrop-blur-xl"
            style={{ alignSelf: 'start' }}
          >
            <div className="absolute top-0 right-0 p-4">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Active Now
              </span>
            </div>

            <div className="mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                <Ticket className="text-blue-400" size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-2">Vybex VIP Pass</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                The ultimate access pass. Winners will receive an exclusive code allowing them to permanently unlock all future Vybex premium features for free.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-500 text-sm">Draw Pool</span>
                <span className="font-medium">All Active Subscribers</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-500 text-sm">Prize</span>
                <span className="font-medium text-blue-400">1x VIP Pass Code</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-gray-500 text-sm">Target Announcement</span>
                <span className="font-medium text-white">Sunday, Mar 22, 2026</span>
              </div>
            </div>

            <button
              onClick={handleRollWinner}
              disabled={isRolling || isLocked}
              className={`w-full relative group overflow-hidden rounded-xl bg-white text-black font-bold py-4 px-6 flex items-center justify-center gap-3 transition-all ${isLocked ? 'opacity-50 cursor-not-allowed bg-gray-300' : 'hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLocked ? (
                <>
                  <div className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    Locked until Sunday 6 PM
                  </div>
                </>
              ) : isRolling ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Rolling the digital dice...
                </>
              ) : (
                <>
                  <Sparkles size={20} className="text-black" />
                  Roll Winner Now
                </>
              )}
            </button>
            
            {error && (
              <p className="text-red-400 text-sm mt-4 text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">{error}</p>
            )}
          </motion.div>

          {/* Winner Reveal Area */}
          <div className="rounded-2xl border border-white/5 bg-[#0a0a0a] p-6 lg:p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden" style={{ alignSelf: 'start' }}>
            
            {/* Ambient Background for reveal area */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay" />
            
            <AnimatePresence mode="wait">
              {!winnerEmail && !isRolling && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center opacity-40"
                >
                  <Trophy size={64} className="mb-4 text-gray-600 stroke-1" />
                  <p className="text-gray-500 font-medium">Awaiting the draw...</p>
                  <p className="text-xs text-gray-600 mt-2 max-w-[200px]">Click roll to randomly select an active subscriber.</p>
                </motion.div>
              )}

              {isRolling && (
                <motion.div
                  key="rolling"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center relative z-10"
                >
                  {/* Digital scrambling effect simulation */}
                  <div className="w-24 h-24 rounded-full border-4 border-white/10 border-t-green-400 animate-spin mb-6" />
                  <h3 className="text-2xl font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                    Selecting Winner...
                  </h3>
                  <div className="text-sm text-gray-500 font-mono mt-4 flex gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>101</span>
                    ))}
                  </div>
                </motion.div>
              )}

              {winnerEmail && !isRolling && (
                <motion.div
                  key="winner"
                  initial={{ opacity: 0, scale: 0.5, y: 40 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                  className="flex flex-col items-center text-center relative z-10 w-full"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 blur-[80px] rounded-full -z-10" />
                  
                  <motion.div 
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black mb-6 shadow-[0_0_40px_rgba(74,222,128,0.4)]"
                  >
                    <Trophy size={40} />
                  </motion.div>
                  
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-green-400 font-semibold uppercase tracking-widest text-sm mb-2"
                  >
                    Winner Selected!
                  </motion.span>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-2xl sm:text-3xl font-bold mb-4 break-all px-4 bg-white/5 py-4 rounded-xl border border-white/10 w-full"
                  >
                    {winnerEmail}
                  </motion.h3>

                  {winnerCode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="w-full mb-8"
                    >
                      <p className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-2">Secret VIP Code generated</p>
                      <div className="bg-blue-500/10 border border-blue-500/20 py-3 rounded-lg font-mono text-xl text-blue-300 w-full font-bold shadow-inner">
                        {winnerCode}
                      </div>
                    </motion.div>
                  )}

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="w-full space-y-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => navigator.clipboard.writeText(winnerEmail)}
                        className="w-full py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium"
                      >
                        Copy Email
                      </button>
                      <button 
                        onClick={() => winnerCode && navigator.clipboard.writeText(winnerCode)}
                        disabled={!winnerCode}
                        className="w-full py-3 rounded-lg border border-blue-500/20 bg-blue-500/10 hover:bg-blue-500/20 transition-colors text-blue-400 text-sm font-bold disabled:opacity-50"
                      >
                        Copy Code
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Reach out to this email with their unique VIP Pass Code!
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
        </div>

        {/* Ecosystem Integration Section */}
        <div className="mt-8 border-t border-white/5 pt-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Unlock size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Ecosystem Integration</h2>
              <p className="text-gray-400 text-sm">Manage tools (like Vybex AI) that are authorized to verify VIP codes.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Add Tool Form */}
            <div className="lg:col-span-1 bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
              <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-400">Add New Tool</h3>
              <form 
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsAddingTool(true);
                  setAddingToolError(null);
                  
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const url = formData.get('url') as string;
                  
                  if (!name || !url) {
                    setAddingToolError('Name and URL are required.');
                    setIsAddingTool(false);
                    return;
                  }

                  const result = await addAuthorizedTool(name, url);
                  if (result.success && result.tool) {
                    setAuthorizedTools([result.tool, ...authorizedTools]);
                    (e.target as HTMLFormElement).reset();
                  } else {
                    setAddingToolError(result.error || 'Failed to add tool');
                  }
                  setIsAddingTool(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Tool Name</label>
                  <input 
                    type="text" 
                    name="name"
                    placeholder="e.g. Vybex AI"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Base URL</label>
                  <input 
                    type="url" 
                    name="url"
                    placeholder="e.g. https://ai.vybex.com"
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                {addingToolError && (
                  <p className="text-red-400 text-xs bg-red-400/10 p-2 rounded border border-red-400/20">{addingToolError}</p>
                )}
                <button 
                  type="submit"
                  disabled={isAddingTool}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg text-sm transition-colors flex justify-center items-center disabled:opacity-50"
                >
                  {isAddingTool ? <Loader2 size={16} className="animate-spin" /> : 'Generate API Key & Add Tool'}
                </button>
              </form>
            </div>

            {/* List of Tools */}
            <div className="lg:col-span-2 space-y-3">
              {isLoadingTools ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="animate-spin text-gray-500" />
                </div>
              ) : authorizedTools.length === 0 ? (
                <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-8 text-center flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center mb-3">
                    <Unlock size={20} className="text-gray-600" />
                  </div>
                  <p className="text-gray-400">No authorized tools yet.</p>
                  <p className="text-xs text-gray-500 mt-1">Add a tool to generate a verification API key.</p>
                </div>
              ) : (
                authorizedTools.map((tool) => (
                  <div key={tool.id} className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-white">{tool.name}</span>
                        {tool.isActive && (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 border border-green-500/20">Active</span>
                        )}
                      </div>
                      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline block mb-3">
                        {tool.url}
                      </a>
                      
                      <div className="flex items-center gap-2">
                        <div className="bg-black/40 border border-white/10 rounded px-2 py-1 flex items-center gap-2 max-w-[200px] sm:max-w-[300px]">
                          <span className="text-xs font-mono text-gray-400 truncate">{tool.apiKey}</span>
                        </div>
                        <button 
                          onClick={() => navigator.clipboard.writeText(tool.apiKey)}
                          className="text-xs text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 px-2 py-1 rounded transition-colors"
                        >
                          Copy Secret
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete ${tool.name}? It will no longer be able to verify VIP codes.`)) {
                          await deleteAuthorizedTool(tool.id);
                          setAuthorizedTools(authorizedTools.filter(t => t.id !== tool.id));
                        }
                      }}
                      className="text-xs text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-red-500/20 self-start sm:self-center"
                    >
                      Revoke Access
                    </button>
                  </div>
                ))
              )}
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
