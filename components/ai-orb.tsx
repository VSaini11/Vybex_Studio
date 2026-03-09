'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Fingerprint, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface AIOrbitProps {
    href?: string;
    tooltipText?: string;
}

export function AIOrb({ href = 'https://vybexai.vercel.app/', tooltipText = 'Explore AI' }: AIOrbitProps) {
    const [hovered, setHovered] = useState(false);

    return (
        <div 
            className="fixed bottom-7 right-7 z-[9999] flex items-center justify-center select-none"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >

            {/* Hover Menu */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute bottom-[80px] right-0 flex flex-col gap-2 min-w-[200px]"
                    >
                        <Link href="https://vybexai.vercel.app/">
                            <motion.div
                                whileHover={{ x: -5, backgroundColor: 'rgba(0,255,120,0.15)' }}
                                className="px-4 py-3 rounded-xl border border-green-500/10 bg-black/80 backdrop-blur-xl flex items-center gap-3 group transition-colors cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Brain className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-bold">Vybex AI</span>
                                    <span className="text-[10px] text-gray-400 group-hover:text-green-300">Intelligent Products</span>
                                </div>
                            </motion.div>
                        </Link>
                        
                        <Link href="/dna">
                            <motion.div
                                whileHover={{ x: -5, backgroundColor: 'rgba(0,255,120,0.15)' }}
                                className="px-4 py-3 rounded-xl border border-green-500/10 bg-black/80 backdrop-blur-xl flex items-center gap-3 group transition-colors cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                    <Fingerprint className="w-5 h-5 text-green-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-sm font-bold">Vybex DNA</span>
                                    <span className="text-[10px] text-gray-400 group-hover:text-green-300">Prediction Engine</span>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Deep-space corona bloom ── */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 120,
                    height: 120,
                    background:
                        'radial-gradient(circle at 50% 50%, rgba(0,255,120,0.10) 0%, rgba(0,200,90,0.05) 40%, transparent 75%)',
                    filter: 'blur(20px)',
                }}
                animate={{ scale: hovered ? [1, 1.22, 1.15] : [1, 1.14, 1], opacity: hovered ? [0.8, 1, 0.85] : [0.5, 0.72, 0.5] }}
                transition={{ duration: hovered ? 1.4 : 3.8, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Outer atmospheric halo ring ── */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 84,
                    height: 84,
                    border: '1.5px solid rgba(0,255,110,0.14)',
                    boxShadow:
                        '0 0 18px rgba(0,255,110,0.12), inset 0 0 14px rgba(0,255,110,0.04)',
                }}
                animate={{ scale: hovered ? 1.15 : [1, 1.05, 1], opacity: hovered ? 1 : [0.6, 0.9, 0.6] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Slow orbit ring with particles ── */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 74, height: 74 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            >
                {[0, 90, 180, 270].map((deg) => (
                    <span
                        key={deg}
                        style={{
                            position: 'absolute',
                            width: deg % 180 === 0 ? 3.5 : 2.5,
                            height: deg % 180 === 0 ? 3.5 : 2.5,
                            borderRadius: '50%',
                            background: deg % 180 === 0 ? 'rgba(0,255,130,0.85)' : 'rgba(0,200,100,0.55)',
                            boxShadow: deg % 180 === 0 ? '0 0 8px 2px rgba(0,255,130,0.9)' : '0 0 5px rgba(0,200,100,0.7)',
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${deg}deg) translateY(-35px) translate(-50%,-50%)`,
                        }}
                    />
                ))}
            </motion.div>

            {/* ── Fast inner trail ring ── */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{ width: 60, height: 60 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
                {[45, 225].map((deg) => (
                    <span
                        key={deg}
                        style={{
                            position: 'absolute',
                            width: 2,
                            height: 2,
                            borderRadius: '50%',
                            background: 'rgba(100,255,180,0.75)',
                            boxShadow: '0 0 6px 1px rgba(100,255,180,0.85)',
                            top: '50%',
                            left: '50%',
                            transform: `rotate(${deg}deg) translateY(-28px) translate(-50%,-50%)`,
                        }}
                    />
                ))}
            </motion.div>

            {/* ── The Planet Core ── */}
            <motion.div
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    zIndex: 2,
                    background:
                        'radial-gradient(circle at 35% 30%, rgba(0,255,120,0.30) 0%, rgba(0,160,70,0.18) 22%, rgba(0,50,25,0.60) 55%, rgba(0,10,6,0.95) 85%, #000a05 100%)',
                    boxShadow: hovered
                            ? `0 0 0 2px rgba(0,255,120,0.40),
               0 0 50px rgba(0,255,120,0.65),
               0 0 90px rgba(0,220,100,0.28),
               inset 0 0 22px rgba(0,255,120,0.18)`
                            : `0 0 0 1px rgba(0,255,120,0.22),
               0 0 28px rgba(0,255,120,0.50),
               0 0 55px rgba(0,200,90,0.20),
               inset 0 0 14px rgba(0,255,120,0.10)`,
                    transition: 'box-shadow 0.3s ease',
                }}
                animate={{
                    scale: hovered ? 1.14 : [1, 1.05, 1],
                }}
                transition={hovered
                        ? { duration: 0.22, ease: 'easeOut' }
                        : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
            >
                {/* Atmospheric rim glow */}
                <span
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        boxShadow: 'inset 0 0 0 2px rgba(0,255,120,0.22), inset -8px -8px 16px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                    }}
                />
                
                {/* Center AI spark icon */}
                <div className="flex items-center justify-center h-full">
                    <Sparkles className="w-6 h-6 text-green-300 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
            </motion.div>
        </div>
    );
}
