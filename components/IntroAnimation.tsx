'use client';

import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export function IntroAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Check if we've already shown the intro in this session
    const hasShown = typeof window !== 'undefined' && sessionStorage.getItem('hasShownIntro');
    if (hasShown) {
      setIsVisible(false);
      setIsAnimationComplete(true);
      return;
    }

    // Timer to hide the intro after animation
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('hasShownIntro', 'true');
      }
    }, 4500); // Wait for the slow enlargement to finish

    return () => clearTimeout(timer);
  }, []);

  const containerVars: Variants = {
    initial: { opacity: 1 },
    animate: { 
      opacity: 1,
    },
    exit: { 
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      transition: { duration: 1.2, ease: "easeInOut" }
    }
  };

  const logoVars: Variants = {
    initial: { 
      opacity: 0, 
      scale: 0.6, 
      filter: "blur(15px)" 
    },
    animate: { 
      opacity: 1, 
      scale: 1.1, // Slow enlargement
      filter: "blur(0px)",
      transition: { 
        duration: 4, // Very slow enlargement
        ease: [0.22, 1, 0.36, 1], // Smooth cubic bezier
        opacity: { duration: 1.5, ease: "easeOut" },
        filter: { duration: 2, ease: "easeOut" }
      }
    }
  };

  if (isAnimationComplete) return null;

  return (
    <AnimatePresence onExitComplete={() => setIsAnimationComplete(true)}>
      {isVisible && (
        <motion.div
          variants={containerVars}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          {/* Logo enlarging slowly */}
          <motion.div variants={logoVars} className="relative">
            <Image 
              src="/Vybex.png" 
              alt="Vybex Logo" 
              width={240} 
              height={240} 
              className="w-40 h-40 md:w-60 md:h-60 object-contain brightness-125 saturate-150"
              priority
            />
            
            {/* Subtle glow behind the logo */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.4 }}
              transition={{ duration: 4.5, ease: "easeOut" }}
              className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full -z-10"
            />
          </motion.div>

          {/* Large background subtle glow */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 3, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-800/10 blur-[200px] rounded-full" 
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
