'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AIOrbitProps {
    href?: string;
    tooltipText?: string;
}

export function AIOrb({ href = 'https://vybexai.vercel.app/', tooltipText = 'Open AI Builder' }: AIOrbitProps) {
    const [hovered, setHovered] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => {
            setClicked(false);
            if (href && href !== '') {
                window.open(href, '_blank', 'noopener,noreferrer');
            }
        }, 400);
    };

    return (
        <div className="fixed bottom-7 right-7 z-[9999] flex items-center justify-center select-none">

            {/* Tooltip */}
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, x: 12, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 12, scale: 0.9 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute right-[80px] whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium pointer-events-none"
                        style={{
                            color: 'rgba(200,255,220,0.9)',
                            background: 'rgba(0,8,4,0.88)',
                            border: '1px solid rgba(0,255,120,0.18)',
                            backdropFilter: 'blur(14px)',
                            boxShadow: '0 4px 32px rgba(0,0,0,0.6), 0 0 14px rgba(0,255,120,0.08)',
                            letterSpacing: '0.04em',
                        }}
                    >
                        {tooltipText}
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
            <motion.button
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                onClick={handleClick}
                aria-label="Open AI Builder"
                style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    position: 'relative',
                    cursor: 'pointer',
                    border: 'none',
                    outline: 'none',
                    overflow: 'hidden',
                    zIndex: 2,
                    // Planet surface — deep dark with bright green-cyan atmosphere edge
                    background:
                        'radial-gradient(circle at 35% 30%, rgba(0,255,120,0.30) 0%, rgba(0,160,70,0.18) 22%, rgba(0,50,25,0.60) 55%, rgba(0,10,6,0.95) 85%, #000a05 100%)',
                    boxShadow: clicked
                        ? `0 0 0 2px rgba(0,255,120,0.55),
               0 0 35px rgba(0,255,120,0.7),
               0 0 70px rgba(0,255,120,0.35),
               inset 0 0 18px rgba(0,255,120,0.25)`
                        : hovered
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
                    scale: clicked ? 0.86 : hovered ? 1.14 : [1, 1.05, 1],
                }}
                transition={
                    clicked || hovered
                        ? { duration: 0.22, ease: 'easeOut' }
                        : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
                }
            >
                {/* Atmospheric rim glow — bright edge like planet limb */}
                <span
                    style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '50%',
                        boxShadow: 'inset 0 0 0 2px rgba(0,255,120,0.22), inset -8px -8px 16px rgba(0,0,0,0.7)',
                        pointerEvents: 'none',
                    }}
                />
                {/* Surface pole highlight */}
                <span
                    style={{
                        position: 'absolute',
                        top: '12%',
                        left: '22%',
                        width: '44%',
                        height: '26%',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(ellipse at 50% 50%, rgba(160,255,200,0.28) 0%, transparent 80%)',
                        filter: 'blur(3px)',
                        pointerEvents: 'none',
                    }}
                />
                {/* Dark band across planet */}
                <span
                    style={{
                        position: 'absolute',
                        top: '52%',
                        left: '5%',
                        right: '5%',
                        height: '16%',
                        background: 'rgba(0,0,0,0.35)',
                        filter: 'blur(4px)',
                        borderRadius: '50%',
                        pointerEvents: 'none',
                    }}
                />

                {/* Center AI spark icon */}
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    style={{ position: 'relative', zIndex: 3, margin: 'auto', display: 'block' }}
                >
                    <motion.path
                        d="M12 2L13.8 9.2H21L15 13.8L17.2 21L12 17L6.8 21L9 13.8L3 9.2H10.2L12 2Z"
                        fill="rgba(180,255,220,0.95)"
                        style={{ filter: 'drop-shadow(0 0 5px rgba(0,255,140,1)) drop-shadow(0 0 10px rgba(0,255,140,0.6))' }}
                        animate={{
                            opacity: hovered ? [0.9, 1, 0.9] : [0.75, 1, 0.75],
                            scale: hovered ? [1, 1.08, 1] : [1, 1.04, 1],
                        }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </svg>
            </motion.button>

            {/* Click ripple */}
            <AnimatePresence>
                {clicked && (
                    <motion.div
                        key="ripple"
                        className="absolute rounded-full pointer-events-none"
                        initial={{ width: 56, height: 56, opacity: 0.7 }}
                        animate={{ width: 110, height: 110, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease: 'easeOut' }}
                        style={{
                            border: '1.5px solid rgba(0,255,120,0.65)',
                            boxShadow: '0 0 18px rgba(0,255,120,0.4)',
                            zIndex: 0,
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
