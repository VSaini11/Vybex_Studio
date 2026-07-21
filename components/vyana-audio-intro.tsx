'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

export function VyanaAudioIntro() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const audioSrc = '/ElevenLabs_2026-07-21T14_42_17_Brielle - Podcast girl extremely natural_pvc_sp108_s11_sb75_se45_b_m2.mp3';

  const handlePlayFull = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  const handlePlayShort = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 119; // 1:59 timestamp
      audioRef.current.play();
      setIsPlaying(true);
      setHasInteracted(true);
    }
  };

  const togglePause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime >= 123) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 pb-20 pt-10 flex justify-center relative z-20">
      
      {/* Background soft glow - completely borderless and blended */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/5 blur-[150px] rounded-[100%] pointer-events-none" />

      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-0 md:gap-24 z-10 bg-transparent border-none">
        
        {/* Left Side: Agent Image Cutout with center glow */}
        <div 
          className="relative flex-shrink-0 w-64 h-64 md:w-80 md:h-80 flex items-center justify-center translate-y-12 md:translate-y-20"
        >
          
          {/* Main Image - Transparent Cutout */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
             <img 
               src="/vybex-ai-avatar.png" 
               alt="Vyana Avatar" 
               className="object-contain w-full h-full opacity-90 drop-shadow-[0_0_40px_rgba(34,197,94,0.2)] scale-[2.5] pointer-events-none"
               onError={(e) => {
                 // Prevent infinite loop by checking if we already tried the fallback
                 if (!e.currentTarget.src.includes('IMG_20260720_225204.png')) {
                   e.currentTarget.src = '/IMG_20260720_225204.png'; 
                 }
               }}
             />
             
             {/* Glow Overlay precisely over the image's drawn ball */}
             <div 
               className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%] w-16 h-16 rounded-full bg-green-400 mix-blend-screen blur-[12px] pointer-events-none transition-all duration-500 ${isPlaying ? 'opacity-90 scale-150 animate-pulse' : 'opacity-0 scale-50'}`}
             />
          </div>
          
        </div>

        {/* Right Side: Content & Smooth Animations */}
        <div className="flex-1 w-full text-center md:text-left flex flex-col justify-center max-w-md relative z-20 mt-4 md:mt-0">
          
          {/* Smooth, low-opacity transmitting animation */}
          <div className="h-8 mb-4 hidden md:flex items-end justify-center md:justify-start gap-1.5 opacity-40 pointer-events-none">
            {isPlaying && mounted ? (
              [...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [
                      `${20 + Math.random() * 20}%`,
                      `${50 + Math.random() * 50}%`,
                      `${10 + Math.random() * 30}%`,
                      `${40 + Math.random() * 60}%`,
                      `${20 + Math.random() * 20}%`
                    ]
                  }}
                  transition={{
                    duration: 0.4 + Math.random() * 0.4, // Faster, more erratic speech-like
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                  }}
                  className="w-1 rounded-full bg-green-400"
                />
              ))
            ) : (
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-green-400/20 to-transparent" />
            )}
          </div>

          <h3 className="text-2xl md:text-4xl font-light text-white mb-6 tracking-wide leading-tight">
            I am Vyana,<br/>
            Want to know about <span className="text-green-400 font-medium">Vybex Studio?</span>
          </h3>
          
          <AnimatePresence mode="wait">
            {!hasInteracted ? (
              <motion.div
                key="options"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={handlePlayFull}
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-black bg-white hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full md:w-max"
                >
                  Yes, I want to know
                </button>
                <button
                  onClick={handlePlayShort}
                  className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-white/5 hover:bg-white/10 transition-all border border-white/5 w-full md:w-max"
                >
                  No, I will see it myself
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="player"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center md:justify-start gap-5 mt-2"
              >
                <button 
                  onClick={togglePause}
                  className="w-14 h-14 flex-shrink-0 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-all text-white backdrop-blur-sm"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
                
                <div className="text-left">
                   <p className="text-base text-gray-200 font-light">Vyana is speaking</p>
                   <p className="text-xs text-green-400/60 font-medium tracking-widest uppercase mt-1.5 flex items-center gap-2">
                     {isPlaying ? (
                       <>
                         <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                         Transmitting
                       </>
                     ) : 'Paused'}
                   </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <audio 
        ref={audioRef}
        src={audioSrc}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onTimeUpdate={handleTimeUpdate}
        className="hidden"
      />
    </section>
  );
}
