'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Download, Lock, Search, Filter, Image as ImageIcon, Camera, Shirt, Smartphone, Coffee, ChevronRight, Loader2, Package } from 'lucide-react';
import Link from 'next/link';

import { getMerchandiseItems } from '@/app/admin/control-center/merchandise-actions';

const categories = [
  { id: 'all', name: 'All', icon: null },
  { id: 'wallpapers', name: 'Wallpapers', icon: <Camera size={18} /> },
  { id: 'logos', name: 'Logos', icon: <ImageIcon size={18} /> },
  { id: 'cups', name: 'Cups', icon: <Coffee size={18} /> },
  { id: 'bottles', name: 'Bottles', icon: <div className="w-[18px] h-[18px] border-2 border-current rounded-sm" /> }, 
  { id: 't-shirts-male', name: 'Male T-Shirts', icon: <Shirt size={18} className="text-blue-400" /> },
  { id: 't-shirts-female', name: 'Female T-Shirts', icon: <Shirt size={18} className="text-pink-400" /> },
  { id: 'phone-covers', name: 'Phone Covers', icon: <Smartphone size={18} /> },
];

function FloatingCard({ delay, x, y, rotate, image }: { delay: number; x: string; y: string; rotate: number; image?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: rotate - 10 }}
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        y: ["0px", "-25px", "0px"],
        rotate: [rotate, rotate + 5, rotate],
        scale: 1,
      }}
      transition={{ 
        duration: 12, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut" 
      }}
      className="absolute pointer-events-none z-0 hidden md:block overflow-visible"
      style={{ left: x, top: y }}
    >
      <div className="w-44 h-60 rounded-[2.5rem] bg-[#0a0a0a] border border-white/20 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-[2px]">
        {image ? (
          <img src={image} className="w-full h-full object-cover opacity-60" alt="" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
            <ImageIcon className="text-white/10" size={56} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </div>
    </motion.div>
  );
}

export default function MerchandisePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItems() {
      const result = await getMerchandiseItems();
      if (result.success && result.items) {
        setItems(result.items);
      }
      setLoading(false);
    }
    fetchItems();
  }, []);

  const filteredItems = activeCategory === 'all' 
    ? items 
    : activeCategory === 't-shirts-male'
      ? items.filter(item => item.category === 't-shirts' && item.gender === 'male')
      : activeCategory === 't-shirts-female'
        ? items.filter(item => item.category === 't-shirts' && item.gender === 'female')
        : items.filter(item => item.category === activeCategory);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-44 pb-24 px-4 border-b border-white/5 overflow-hidden">
        {/* Floating Background Assets */}
        <div className="absolute inset-0 z-0">
          <FloatingCard x="2%" y="10%" rotate={35} delay={0} image={items[0]?.image} />
          <FloatingCard x="82%" y="5%" rotate={-35} delay={2} image={items[1]?.image} />
          <FloatingCard x="5%" y="60%" rotate={-25} delay={4} image={items[2]?.image} />
          <FloatingCard x="80%" y="65%" rotate={25} delay={1} image={items[3]?.image || items[0]?.image} />
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-green-500/[0.04] rounded-full blur-[200px] pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center"
          >
            <nav className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-gray-500 mb-10 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md">
              <Link href="/" className="hover:text-green-500 transition-colors">Home</Link>
              <ChevronRight size={10} className="text-gray-700" />
              <span className="text-white">Gear</span>
            </nav>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight lg:leading-[1.1] overflow-visible pb-4">
              Vybex <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-600 italic px-4">Studio</span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
              A premium collection of digital crafts and physical artifacts, built for the next generation of creators.
            </p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col items-center gap-4"
            >
              <div className="w-[1px] h-12 bg-gradient-to-b from-green-500 to-transparent" />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-green-500/50">Explore Collection</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-[72px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/5 py-4 px-4 overflow-x-auto">
        <div className="max-w-6xl mx-auto flex items-center gap-3 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat.id 
                ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' 
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Merchandise Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {loading ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24">
                    <Loader2 className="animate-spin text-green-500 mb-4" size={48} />
                    <p className="text-gray-500 font-medium tracking-wide">Fetching the latest gear...</p>
                </div>
            ) : filteredItems.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24 bg-white/[0.02] border border-white/5 rounded-3xl">
                    <Package className="text-gray-700 mb-4" size={64} />
                    <p className="text-gray-500 font-medium">No items found in this category.</p>
                </div>
            ) : (
                <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-green-500/50 transition-all"
                >
                  {/* Image/Placeholder Area */}
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] flex items-center justify-center">
                    {item.isComingSoon ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
                        <div className="p-4 rounded-full bg-white/5 mb-4">
                           <Lock className="text-green-500" size={32} />
                        </div>
                        <span className="text-xs uppercase tracking-widest font-black text-green-500">Coming Soon</span>
                      </div>
                    ) : null}
                    
                    {/* Render image if available, else placeholder */}
                    {item.image ? (
                        <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center opacity-10 group-hover:scale-110 transition-transform duration-700">
                           {item.category === 'cups' && <Coffee size={120} />}
                           {item.category === 't-shirts' && <Shirt size={120} />}
                           {item.category === 'phone-covers' && <Smartphone size={120} />}
                           {item.category === 'bottles' && <div className="w-24 h-48 border-4 border-current rounded-xl" />}
                        </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] uppercase tracking-widest font-bold text-gray-500">{item.category}</span>
                       {!item.isComingSoon && (
                           <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-green-500">
                               <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                               Available
                           </span>
                       )}
                     </div>
                     <h3 className="text-lg font-bold text-white mb-1.5 line-clamp-1">{item.name}</h3>
                     <div className="flex items-center justify-between mb-4">
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{item.description}</p>
                        {item.price != null && item.price > 0 && (
                          <span className="text-lg font-black text-green-500 shrink-0 ml-4">₹{item.price}</span>
                        )}
                     </div>
                    
                    <div className="mt-auto">
                      {!item.isComingSoon ? (
                        item.redirectUrl ? (
                          <motion.a
                            href={item.redirectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 bg-green-500 text-black py-4 rounded-2xl font-bold hover:bg-green-400 transition-colors"
                          >
                            Buy Now
                            <ChevronRight size={18} />
                          </motion.a>
                        ) : (
                          <motion.a
                            href={item.downloadUrl}
                            download
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-2xl font-bold hover:bg-green-500 transition-colors"
                          >
                            <Download size={18} />
                            Download Asset
                          </motion.a>
                        )
                      ) : (
                        <button
                          disabled
                          className="w-full flex items-center justify-center gap-2 bg-white/5 text-gray-500 py-4 rounded-2xl font-bold cursor-not-allowed border border-white/5"
                        >
                          Notify Me
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
                </AnimatePresence>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
