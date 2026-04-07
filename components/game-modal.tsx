'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, RefreshCcw, Trophy, Zap } from 'lucide-react';
import { VybexGame } from './vybex-game';

interface GameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GameModal({ isOpen, onClose }: GameModalProps) {
  const [status, setStatus] = useState<'IDLE' | 'PLAYING' | 'GAME_OVER'>('IDLE');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('vybex_high_score');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    setStatus('GAME_OVER');
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('vybex_high_score', finalScore.toString());
    }
  };

  const startGame = () => {
    setScore(0);
    setStatus('PLAYING');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center sm:p-4"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl" 
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full h-full sm:h-auto sm:max-w-[850px] sm:max-h-[85vh] overflow-hidden sm:overflow-y-auto bg-[#050a05] border-0 sm:border border-green-500/20 rounded-none sm:rounded-[2.5rem] shadow-[0_0_100px_rgba(34,197,94,0.15)] scrollbar-hide flex flex-col items-center justify-center"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 w-full p-4 sm:p-8 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex flex-col gap-1">
                <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-green-500/60">Operation</span>
                <h2 className="text-lg sm:text-2xl font-black text-white italic tracking-tight">Vybex Shift</h2>
              </div>
              
              <button 
                onClick={onClose}
                className="p-2 sm:p-3 rounded-full bg-white/5 border border-white/10 text-gray-500 hover:text-white hover:bg-white/10 transition-all pointer-events-auto"
              >
                <X size={18} />
              </button>
            </div>

            {/* Game Canvas Container */}
            <div className="w-full p-4 sm:p-8 pt-16 sm:pt-32 pb-6 sm:pb-12 flex flex-col items-center justify-center flex-1">
              <VybexGame 
                status={status} 
                onGameOver={handleGameOver} 
              />
              
              {/* UI Overlay States */}
              <AnimatePresence mode="wait">
                {status === 'IDLE' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm pt-20 sm:pt-24"
                  >
                    <div className="flex flex-col items-center gap-6 sm:gap-8 text-center px-10 sm:px-12">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.1)]">
                         <Zap className="text-green-500 animate-pulse" size={32} />
                      </div>
                      <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-xl sm:text-3xl font-black text-white px-2">READY SYSTEM?</h3>
                        <p className="text-gray-400 max-w-sm text-[11px] sm:text-sm font-medium leading-relaxed px-4">
                          Dodge data corruptions and maintain the stream integrity. High speed, low latency.
                        </p>
                      </div>
                      
                      <button 
                        onClick={startGame}
                        className="group relative px-8 sm:px-10 py-3 sm:py-4 bg-green-500 text-black font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] rounded-full hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                      >
                        <span className="flex items-center gap-2">
                           <Play size={14} fill="currentColor" /> Initialize 
                        </span>
                      </button>

                      {highScore > 0 && (
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                             <Trophy size={14} className="text-green-500/50" />
                             <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">
                                High Integrity: {highScore}
                             </span>
                          </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {status === 'GAME_OVER' && (
                  <motion.div
                    key="game_over"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md pt-20 sm:pt-24"
                  >
                     <div className="flex flex-col items-center gap-6 sm:gap-8 text-center px-4">
                        <div className="space-y-2">
                           <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.5em] text-red-500 animate-pulse">Critical Failure</span>
                           <h3 className="text-2xl sm:text-5xl font-black text-white">TERMINATED</h3>
                        </div>

                        <div className="flex flex-col items-center gap-2">
                           <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">System Performance</span>
                           <div className="text-2xl sm:text-4xl font-black text-green-500">{score}</div>
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                           <button 
                             onClick={startGame}
                             className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-black font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] rounded-xl hover:bg-green-500 transition-all"
                           >
                             <RefreshCcw size={14} /> Reboot
                           </button>
                           <button 
                             onClick={onClose}
                             className="px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] sm:text-xs tracking-[0.2em] rounded-xl hover:bg-white/10 transition-all"
                           >
                             Disconnect
                           </button>
                        </div>
                     </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status Bar */}
              {status === 'PLAYING' && (
                   <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full mt-4 sm:mt-8 flex items-center justify-between px-2 sm:px-4"
                  >
                     <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[7px] sm:text-[10px] font-black uppercase tracking-widest text-green-500/70">Secure Transmission...</span>
                     </div>
                     <div className="flex items-center gap-4 sm:gap-6">
                        <div className="flex flex-col items-end">
                            <span className="text-[7px] sm:text-[9px] font-black uppercase tracking-widest text-gray-600">Local High</span>
                            <span className="text-[10px] sm:text-xs font-black text-gray-400">{highScore}</span>
                        </div>
                     </div>
                  </motion.div>
              )}
            </div>

            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/[0.03] blur-[150px] rounded-full pointer-events-none" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
