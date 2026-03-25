'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Brain, Fingerprint } from 'lucide-react';
import Link from 'next/link';

interface AIOrbitProps {
    href?: string;
    tooltipText?: string;
}

export function AIOrb({ href = 'https://vybexai.vercel.app/', tooltipText = 'Explore AI' }: AIOrbitProps) {
    const [hovered, setHovered] = useState(false);

    // Premium Green/Emerald Color Palette
    const colors = {
        primary: 'rgb(34, 197, 94)', // Green 500
        secondary: 'rgb(16, 185, 129)', // Emerald 500
        accent: 'rgb(74, 222, 128)', // Green 400
        glow: 'rgba(34, 197, 94, 0.4)',
        halo: 'rgba(16, 185, 129, 0.15)',
    };

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
                                whileHover={{ x: -5, backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                                className="px-4 py-3 rounded-xl border border-green-500/20 bg-black/80 backdrop-blur-xl flex items-center gap-3 group transition-colors cursor-pointer"
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
                                whileHover={{ x: -5, backgroundColor: 'rgba(16, 185, 129, 0.15)' }}
                                className="px-4 py-3 rounded-xl border border-green-500/20 bg-black/80 backdrop-blur-xl flex items-center gap-3 group transition-colors cursor-pointer"
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

            {/* ── Outer Aurora Bloom ── */}
            <motion.div
                className="absolute rounded-full pointer-events-none"
                style={{
                    width: 140,
                    height: 140,
                    background: `radial-gradient(circle at 50% 50%, ${colors.glow} 0%, rgba(34, 197, 94, 0.1) 45%, transparent 70%)`,
                    filter: 'blur(30px)',
                }}
                animate={{ 
                    scale: hovered ? [1, 1.25, 1.15] : [1, 1.1, 1], 
                    opacity: hovered ? [0.6, 0.9, 0.7] : [0.3, 0.5, 0.3] 
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Atmospheric Halo ── */}
            <motion.div
                className="absolute rounded-full pointer-events-none border border-green-500/20"
                style={{
                    width: 80,
                    height: 80,
                    boxShadow: `0 0 20px ${colors.halo}, inset 0 0 10px ${colors.halo}`,
                }}
                animate={{ scale: hovered ? 1.2 : [1, 1.05, 1], opacity: hovered ? 1 : [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Siri/AI Orb Core ── */}
            <motion.div
                className="relative flex items-center justify-center cursor-pointer overflow-hidden"
                style={{
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    background: '#050a05',
                    boxShadow: hovered 
                        ? `0 0 40px rgba(34, 197, 94, 0.4), inset 0 0 15px rgba(34, 197, 94, 0.2)`
                        : `0 0 20px rgba(34, 197, 94, 0.2), inset 0 0 10px rgba(34, 197, 94, 0.1)`,
                }}
                animate={{ scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
            >
                {/* Internal Animated Blobs (Siri Style) */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                    {/* Blob 1 */}
                    <motion.div
                        className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%]"
                        style={{
                            background: `radial-gradient(circle at center, ${colors.primary} 0%, transparent 60%)`,
                            mixBlendMode: 'screen',
                        }}
                        animate={{
                            x: [0, 10, -5, 0],
                            y: [0, -10, 5, 0],
                            scale: [1, 1.1, 0.9, 1],
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Blob 2 */}
                    <motion.div
                        className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[120%]"
                        style={{
                            background: `radial-gradient(circle at center, ${colors.secondary} 0%, transparent 60%)`,
                            mixBlendMode: 'screen',
                        }}
                        animate={{
                            x: [0, -15, 10, 0],
                            y: [0, 5, -10, 0],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Blob 3 */}
                    <motion.div
                        className="absolute top-[10%] right-[-20%] w-[100%] h-[100%]"
                        style={{
                            background: `radial-gradient(circle at center, ${colors.accent} 0%, transparent 50%)`,
                            mixBlendMode: 'screen',
                        }}
                        animate={{
                            rotate: [0, 360],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Surface Polish / Glass reflection */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                
            </motion.div>
        </div>
    );
}
