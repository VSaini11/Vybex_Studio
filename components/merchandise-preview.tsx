'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Download, Image as ImageIcon, Camera, Shirt, Smartphone, Coffee, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getMerchandiseItems } from '@/app/admin/control-center/merchandise-actions';

const languages = [
  { text: 'Merchandise', lang: 'English' },
  { text: 'सामान', lang: 'Hindi' },
  { text: 'Marchandise', lang: 'French' },
  { text: 'マーチャンダイズ', lang: 'Japanese' },
  { text: 'ਮਰਚੈਂਡਾਈਜ਼', lang: 'Punjabi' },
  { text: 'Fanartikel', lang: 'German' },
  { text: 'بضائع', lang: 'Arabic' },
];

function MerchandiseCard({ item, index, totalItems, scrollProgress }: { item: any; index: number; totalItems: number; scrollProgress: any }) {
  // Parallax calculations
  const y = useTransform(
    scrollProgress,
    [0, 1],
    [index * 40, index * -120] // More subtle sliding
  );
  
  const opacity = useTransform(
    scrollProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );

  const scale = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      style={{ y, opacity, scale }}
      className="relative w-full max-w-3xl mx-auto mb-[-60px] z-[1]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ 
          y: -10,
          scale: 1.01,
          transition: { type: "spring", stiffness: 400, damping: 15 }
        }}
        className="relative aspect-[16/6] md:aspect-[21/6.5] rounded-[2rem] overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] group"
      >
        {/* Card Content */}
        <div className="absolute inset-0">
          {item.image ? (
            <motion.img
              src={item.image}
              alt={item.name}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-opacity"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-500/5 to-emerald-500/5">
              <ImageIcon size={40} className="text-white/5" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
        </div>

        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex gap-2">
          <div className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-black tracking-widest text-green-500 uppercase">
            {item.category}
          </div>
        </div>

        {/* Text Content */}
        <div className="absolute inset-x-0 bottom-0 p-8 flex items-end justify-between">
          <div className="max-w-xs md:max-w-md">
            <motion.h3 
              animate={{ x: isHovered ? 5 : 0 }}
              className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tighter"
            >
              {item.name}
            </motion.h3>
            <p className="text-gray-500 text-[10px] md:text-xs font-medium tracking-wide">
              {item.isComingSoon ? "Reserved for the next drop." : "Available for digital download."}
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-3">
            <motion.div
              animate={{ 
                y: isHovered ? -3 : 0,
                backgroundColor: isHovered ? "rgba(34, 197, 94, 1)" : "rgba(255, 255, 255, 0.03)"
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-white border border-white/5 transition-colors"
            >
              <ArrowRight size={18} className={isHovered ? "text-black" : "text-white"} />
            </motion.div>
          </div>
        </div>

        {/* Interaction Glow */}
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-r from-green-500/5 to-transparent"
        />
      </motion.div>
    </motion.div>
  );
}

export function MerchandisePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [langIndex, setLangIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % languages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function fetchItems() {
      const result = await getMerchandiseItems();
      if (result.success && result.items) {
        setItems(result.items.slice(0, 3));
      }
      setLoading(false);
    }
    fetchItems();
  }, []);

  return (
    <section id="merchandise" ref={containerRef} className="py-24 relative bg-black overflow-hidden border-y border-white/5">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/[0.005] rounded-full blur-[150px]" 
        />
        <motion.div 
          style={{ opacity: scrollYProgress }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/[0.005] rounded-full blur-[150px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 min-h-[80vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          
          {/* Column: Visual & Textual Anchor */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-green-500 font-bold tracking-[0.4em] uppercase text-[9px] mb-6"
            >
              Digital Collectibles
            </motion.span>
            
            {/* Stable & Stacked Mobile Title Block */}
            <div className="w-full lg:w-max h-auto lg:h-[1.2em] relative flex flex-col sm:flex-row items-center sm:items-baseline justify-center lg:justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter overflow-visible mb-8 gap-2 sm:gap-0 sm:pr-4">
              <span className="shrink-0 sm:pr-4">Our</span>
              <div className="relative text-center sm:text-left overflow-visible min-h-[1.2em] min-w-[200px] sm:min-w-[280px] md:min-w-[420px]">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={langIndex}
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent italic leading-tight block w-full sm:pr-10 whitespace-nowrap"
                  >
                    {languages[langIndex].text}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <p className="text-gray-500 text-sm md:text-lg max-w-lg font-medium leading-relaxed mb-10">
              A curated selection of exclusive assets, meticulously crafted to define the Vybex visual standard. High-quality, strictly digital, absolutely unique.
            </p>

            {/* Global CTA - Size optimized for mobile */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Link href="/merchandise">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3.5 sm:px-10 sm:py-5 bg-white text-black rounded-full font-black text-[10px] sm:text-xs uppercase tracking-[0.2em] flex items-center gap-3 sm:gap-4 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all"
                >
                  Browse Full Catalog
                  <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Column: Interactive Deck - Desktop Only */}
          <div className="hidden lg:flex relative flex-col items-center">
            <div className="w-full flex flex-col gap-0 max-w-xl">
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="animate-spin text-green-500" size={30} />
                </div>
              ) : items.length > 0 ? (
                <>
                  {items.map((item, index) => (
                    <MerchandiseCard 
                      key={item.id} 
                      item={item} 
                      index={index} 
                      totalItems={items.length} 
                      scrollProgress={smoothScroll}
                    />
                  ))}
                  
                  {/* Coming Soon in Vertical Style */}
                  {items.length < 3 && (
                    <div className="mt-12 flex flex-col items-center gap-8">
                      <div className="w-[1px] h-20 bg-gradient-to-b from-green-500/30 to-transparent" />
                      <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="flex flex-wrap justify-center gap-8 opacity-40"
                      >
                        {[
                          { name: 'Apparel', icon: <Shirt size={20}/> },
                          { name: 'Devices', icon: <Smartphone size={20}/> },
                          { name: 'Drinkware', icon: <Coffee size={20}/> }
                        ].map((p, i) => (
                          <div key={i} className="flex flex-col items-center gap-3 group">
                            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:text-green-500 transition-colors">
                              {p.icon}
                            </div>
                            <span className="text-[9px] font-black tracking-widest uppercase">{p.name}</span>
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </>
              ) : (
                <div className="py-20 text-center">
                  <ImageIcon className="mx-auto text-gray-800 mb-4" size={48} />
                  <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Collection Under Review</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
