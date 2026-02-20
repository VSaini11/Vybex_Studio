'use client';

import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowRight, Check } from 'lucide-react';

/* ── CSS: flip + grain ─────────────────────────────────────────── */
const CSS = `
.flip-card { perspective: 1100px; }
.flip-card-inner {
  position: relative; width: 100%; height: 100%;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
  transform-style: preserve-3d;
}
.flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
.flip-face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 1.25rem;
  overflow: hidden;
}
.flip-back { transform: rotateY(180deg); }

/* grain overlay */
.grain::before {
  content:'';
  position:absolute; inset:0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  border-radius:inherit; pointer-events:none; z-index:1;
}
.grain > * { position: relative; z-index: 2; }

/* tiny green bottom glow */
.card-glow::after {
  content:'';
  position:absolute; bottom:0; left:15%; right:15%; height:1px;
  background: linear-gradient(90deg, transparent, rgba(34,197,94,0.45), transparent);
  border-radius:50%;
  box-shadow: 0 0 18px 4px rgba(34,197,94,0.12);
  z-index:3;
}
`;

/* ── Services ──────────────────────────────────────────────────── */
const services = [
  {
    num: '01',
    title: 'Website Development',
    short: 'Fast · Scalable · SEO-Ready',
    desc: 'Modern websites built with Next.js and scalable architecture, optimized for speed and conversions.',
    features: ['Responsive Design', '4–6 Pages', 'Basic SEO Setup', 'Performance Optimization', 'Contact Form'],
  },
  {
    num: '02',
    title: 'UI/UX & Brand Identity',
    short: 'Design · Logo · Branding',
    desc: 'Premium design, logo, brand identity systems, posters & YouTube thumbnails.',
    features: ['Logo Design', 'Brand Color System', 'Typography Guidelines', 'UI/UX Systems', 'Creative Assets'],
  },
  {
    num: '03',
    title: 'Digital Product Building',
    short: 'SaaS · MVPs · Dashboards',
    desc: 'Landing pages, SaaS MVPs, booking systems, dashboards & internal tools built with modern architecture.',
    features: ['Custom Web App', 'Scalable Structure', 'Secure Backend', 'Database Integration', '1 Month Support'],
    featured: true,
  },
  {
    num: '04',
    title: 'Startup Growth Strategy',
    short: 'Strategy · Funnels · Growth',
    desc: 'A complete strategy to grow your business using digital systems and conversion-focused thinking.',
    features: ['Conversion Landing Page', 'Lead Capture System', 'Funnel Setup', 'Basic Automation', 'Strategy Consultation'],
  },
];

export function Portfolio() {
  const { ref, isInView } = useScrollAnimation();

  return (
    <section id="webuild" ref={ref} className="py-24 relative" style={{ background: '#080808' }}>
      <style>{CSS}</style>

      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#22c55e' }}>What We Offer</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Digital solutions that{' '}
            <span style={{ backgroundImage: 'linear-gradient(135deg,#4ade80,#22c55e)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
              solve real problems,
            </span>
            <br />not just look cool.
          </h2>
          <p className="text-xs mt-4 tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.18)' }}>Hover to explore each service</p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="flip-card"
              style={{ height: '360px' }}
            >
              <div className="flip-card-inner">

                {/* ── FRONT ─────────────────────────────────── */}
                <div
                  className="flip-face grain card-glow flex flex-col justify-between p-7"
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid #1a1a1a',
                  }}
                >
                  {/* number */}
                  <span
                    className="text-xs font-mono"
                    style={{ color: 'rgba(255,255,255,0.12)' }}
                  >
                    {s.num}
                  </span>

                  {/* title block — centered vertically */}
                  <div>
                    <h3 className="text-2xl font-black text-white leading-snug mb-3">{s.title}</h3>
                    <p className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.22)' }}>{s.short}</p>
                  </div>

                  {/* hint */}
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <span className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.14)' }}>flip to explore</span>
                  </div>
                </div>

                {/* ── BACK ──────────────────────────────────── */}
                <div
                  className="flip-face flip-back grain flex flex-col justify-between p-6"
                  style={{
                    background: '#0a0a0a',
                    border: '1px solid rgba(34,197,94,0.18)',
                    boxShadow: '0 0 40px rgba(34,197,94,0.05)',
                  }}
                >
                  <div>
                    {/* title */}
                    <div className="mb-4">
                      <span className="text-xs font-mono block mb-1" style={{ color: 'rgba(255,255,255,0.15)' }}>{s.num}</span>
                      <h3 className="text-base font-bold text-white">{s.title}</h3>
                    </div>

                    {/* desc */}
                    <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.desc}</p>

                    {/* features */}
                    <ul className="flex flex-col gap-1.5">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          <span
                            className="flex-shrink-0 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
                          >
                            <Check size={8} color="#4ade80" strokeWidth={3} />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <a
                    href="#contact"
                    className="mt-4 flex items-center justify-between px-4 py-2.5 rounded-full text-xs font-semibold text-black"
                    style={{ background: 'linear-gradient(135deg,#4ade80,#22c55e)' }}
                  >
                    Start This Project
                    <span className="w-5 h-5 rounded-full bg-black/20 flex items-center justify-center">
                      <ArrowRight size={11} />
                    </span>
                  </a>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
