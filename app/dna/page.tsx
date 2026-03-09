'use client';

// Forced redeployment to refresh assets - 2026-03-09

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { 
  Fingerprint, Search, TrendingUp, Cpu, ArrowRight, Dna, 
  Sparkles, Brain, Zap, Globe, BarChart3, ChevronRight,
  Shield, Rocket, Target, Share2, Download, Copy, Check,
  Coffee, RotateCcw, Moon, BarChart, Lightbulb, Users
} from 'lucide-react';

import { analyzeStartupDNA } from './actions';
import { toast } from 'sonner';
import { toPng } from 'html-to-image';
import { useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────

type EngineState = 'IDLE' | 'SCANNING' | 'REPORT' | 'ERROR';

interface DNAFormData {
  idea: string;
  targetUsers: string;
  problem: string;
  features: string;
  industry: string;
}

interface DNAReport {
  summary: string;
  dnaScore: number;
  ideaClarity: number;
  marketScore: number;
  complexity: 'Low' | 'Medium' | 'High';
  riskFactors: string[];
  techStack: {
    frontend: string;
    backend: string;
    database: string;
    ai?: string;
  };
  mvpTime: string;
  mvpFeatures: string[];
  monetization: string[];
  competition: {
    analysis: string;
    direct: string[];
    indirect: string[];
    saturation: 'Low' | 'Medium' | 'High';
  };
  growth: string[];
  genome: {
    marketStrength: number;
    innovation: number;
    scalability: number;
    competition: number;
    monetization: number;
  };
  futureInsights: {
    trendScore: number;
    opportunities: string[];
    evolution: string;
  };
}

// ── Animation Variants ──────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// ── Main Page Component ─────────────────────────────────────────

export default function VybexDNAPage() {
  const [state, setState] = useState<EngineState>('IDLE');
  const [formData, setFormData] = useState<DNAFormData>({
    idea: '',
    targetUsers: '',
    problem: '',
    features: '',
    industry: '',
  });
  const [report, setReport] = useState<DNAReport | null>(null);

  const handleScan = async () => {
    if (!formData.idea) return;
    setState('SCANNING');
    
    try {
      const result = await analyzeStartupDNA(formData);
      
      if (result.success) {
        setReport(result.data);
        setState('REPORT');
      } else if (result.error === 'QUOTA_EXCEEDED') {
        setState('ERROR');
      } else {
        toast.error("AI Analysis failed. Please try again.");
        setState('IDLE');
      }
    } catch (error) {
      console.error(error);
      toast.error("AI Analysis failed. Please ensure your GEMINI_API_KEY is configured.");
      setState('IDLE');
    }
  };

  return (
    <main className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
      </div>
      
      <Navbar />

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          nav, footer, button, .sharing-options { display: none !important; }
          body { background: white !important; color: black !important; }
          main { background: white !important; color: black !important; padding-top: 0 !important; }
          .relative.z-10 { position: relative !important; top: 0 !important; color: black !important; }
          h1, h2, h3, h4, p, span, li { color: black !important; text-shadow: none !important; }
          .bg-white\/5, .bg-black\/40, .bg-\[\#0a0a0a\], .backdrop-blur-xl, .backdrop-blur-3xl { 
            background: white !important; 
            border: 1px solid #eee !important; 
            backdrop-filter: none !important;
            box-shadow: none !important;
          }
          .bg-cyan-500, .bg-purple-500, .bg-blue-500, .bg-red-500, .bg-green-500 {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          section, .grid-cols-12 > div { 
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 2rem !important;
          }
          .fixed, .absolute-glow, [class*="opacity-"] { display: none !important; }
          .max-w-6xl { max-width: 100% !important; margin: 0 !important; width: 100% !important; }
          .lg\:col-span-8, .lg\:col-span-4 { width: 100% !important; grid-column: span 12 / span 12 !important; }
        }
      `}</style>

      <div className="relative z-10 pt-32 pb-16 px-4">
        <AnimatePresence mode="wait">
          {state === 'IDLE' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-16">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-6"
                >
                  <Sparkles size={14} /> Startup Intelligence Engine
                </motion.div>
                <h1 className="text-4xl sm:text-6xl font-black mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
                  DNA Analyzer
                </h1>
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-12">
                    Map your startup's genetic potential. Enter your idea below to receive a detailed intelligence report and growth trajectory prediction.
                </p>

                {/* ── Intro Carousel ──────────────────────────────── */}
                <IntroCarousel />
              </div>

              {/* ── Build Form ──────────────────────────────────── */}
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white/[0.02] backdrop-blur-3xl p-6 sm:p-10 rounded-[32px] border border-white/10 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 space-y-6">
                    <InputGroup 
                      label="Startup Idea *" 
                      placeholder="e.g. AI Resume Builder for Students" 
                      value={formData.idea}
                      onChange={(v) => setFormData({...formData, idea: v})}
                    />
                    <InputGroup 
                      label="Target Users" 
                      placeholder="e.g. Students, job seekers, developers" 
                      value={formData.targetUsers}
                      onChange={(v) => setFormData({...formData, targetUsers: v})}
                    />
                    <InputGroup 
                      label="Problem Being Solved" 
                      placeholder="e.g. Students struggle with professional resumes" 
                      value={formData.problem}
                      onChange={(v) => setFormData({...formData, problem: v})}
                    />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <InputGroup 
                      label="Optional Features" 
                      placeholder="e.g. AI generator, ATS optimization" 
                      value={formData.features}
                      onChange={(v) => setFormData({...formData, features: v})}
                    />
                    <InputGroup 
                      label="Industry Category" 
                      placeholder="e.g. SaaS, Fintech, Education" 
                      value={formData.industry}
                      onChange={(v) => setFormData({...formData, industry: v})}
                    />
                    <div className="pt-2">
                      <button
                        onClick={handleScan}
                        disabled={!formData.idea}
                        className="w-full py-5 rounded-2xl bg-white text-black font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
                      >
                        <Zap size={22} fill="black" />
                        Initialize Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Background Helix ── */}
              <div className="mt-20 flex justify-center opacity-20 h-40">
                  <DNAHelixStatic />
              </div>
            </motion.div>
          )}

          {state === 'SCANNING' && <ScanningView />}

          {state === 'REPORT' && report && <ReportView report={report} onReset={() => setState('IDLE')} />}

          {state === 'ERROR' && (
            <ErrorView onRetry={() => setState('IDLE')} />
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}

// ── Components ──────────────────────────────────────────────────

function IntroCarousel() {
  const [index, setIndex] = useState(0);
  const cards = [
    {
      title: "Strategic Blueprint",
      desc: "Gain a comprehensive understanding of your startup's long-term potential before writing a single line of code.",
      icon: <Target size={24} className="text-cyan-400" />,
      tag: "Intelligence"
    },
    {
      title: "Market Nucleotides",
      desc: "Identify your target audience and competitive landscape with precision using our advanced genomic analysis.",
      icon: <Search size={24} className="text-purple-400" />,
      tag: "Validation"
    },
    {
      title: "Investment Readiness",
      desc: "Receive a professional score and certificate that you can share with investors to prove your concept's clarity.",
      icon: <Zap size={24} className="text-yellow-400" />,
      tag: "Growth"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [cards.length]);

  return (
    <div className="max-w-6xl mx-auto mb-20 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              scale: index === i ? 1.02 : 1,
              borderColor: index === i ? 'rgba(6, 182, 212, 0.4)' : 'rgba(255, 255, 255, 0.1)'
            }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`p-6 sm:p-8 rounded-[32px] bg-white/[0.03] border backdrop-blur-xl transition-all duration-500 text-left relative overflow-hidden group`}
          >
            <div className={`absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity`}>
               {card.icon}
            </div>
            <div className="mb-6 p-3 rounded-2xl bg-white/5 w-fit">
              {card.icon}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-2 block">{card.tag}</span>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">
              {card.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {card.desc}
            </p>
            {index === i && (
              <motion.div 
                layoutId="active-border"
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-purple-500"
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder, value, onChange }: { label: string, placeholder: string, value: string, onChange: (v: string) => void }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">{label}</label>
      <input 
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
      />
    </div>
  );
}

function ScanningView() {
  const [step, setStep] = useState(0);
  const steps = [
    "Initializing neural DNA probe...",
    "Scanning genomic structures...",
    "Analyzing market nucleotides...",
    "Mapping competitive sequences...",
    "Sequencing growth trajectories...",
    "Finalizing startup blueprint..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-2xl mx-auto text-center py-8 sm:py-20 px-4 min-h-[70vh] flex flex-col justify-center overflow-hidden"
    >
      <div className="relative mb-8 sm:mb-12 flex justify-center items-center">
        {/* Scanning laser beam effect */}
        <motion.div 
          animate={{ 
            top: ['20%', '80%', '20%'],
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute left-0 right-0 h-[2px] bg-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-20 pointer-events-none w-full max-w-sm mx-auto"
        />
        
        <div className="relative z-10 w-full max-w-sm aspect-square flex justify-center items-center">
          <DNAHelixAnimated />
          {/* Digital interference overlay */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
        </div>
        
        {/* Background data stream */}
        <div className="absolute inset-0 -z-10 opacity-20 overflow-hidden">
          <DataStream />
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-2"
        >
          <Fingerprint size={32} className="text-cyan-500 animate-pulse mb-2" />
          <h2 className="text-xl sm:text-2xl font-mono text-cyan-400 tracking-tight">
            {steps[step]}
          </h2>
        </motion.div>

        <div className="max-w-xs mx-auto">
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 7, ease: "linear" }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
            />
          </div>
          <div className="flex justify-between mt-2 font-mono text-[10px] text-cyan-500/60 uppercase tracking-widest">
            <span>Sequencing</span>
            <span>{Math.min(100, Math.floor((step / (steps.length - 1)) * 100))}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DataStream() {
  const data = "010101011010010101010101001010110".split("");
  return (
    <div className="grid grid-cols-8 gap-4 text-[8px] font-mono text-cyan-500/20 w-full break-all leading-tight select-none">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ 
            duration: Math.random() * 2 + 1, 
            repeat: Infinity, 
            delay: Math.random() * 2 
          }}
        >
          {data.sort(() => Math.random() - 0.5).join("")}
        </motion.div>
      ))}
    </div>
  );
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="max-w-md mx-auto text-center py-20 flex flex-col items-center"
    >
      <div className="relative mb-12 group">
        <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full scale-150 group-hover:bg-amber-500/30 transition-colors" />
        <div className="relative w-32 h-32 bg-amber-500/10 border border-amber-500/20 rounded-[40px] flex items-center justify-center p-8 backdrop-blur-3xl shadow-[0_0_50px_rgba(245,158,11,0.1)]">
           <Coffee size={64} className="text-amber-500" strokeWidth={1.5} />
           <div className="absolute -top-4 -right-4 flex flex-col gap-1">
              <Moon size={20} className="text-amber-500/40 animate-pulse" />
              <Moon size={14} className="text-amber-500/20 animate-pulse" style={{ animationDelay: '0.5s', marginLeft: '10px' }} />
           </div>
        </div>
      </div>

      <h2 className="text-3xl font-black text-white/50 mb-4 tracking-tight">
        Vyana is taking a break
      </h2>
      <p className="text-gray-500 text-sm max-w-xs leading-relaxed mb-10">
        Vyana is tired due to too many requests, try after some time.
      </p>

      <button
        onClick={onRetry}
        className="flex items-center gap-3 px-10 py-4 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all font-bold uppercase tracking-widest text-xs group"
      >
        <RotateCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
        Try Again
      </button>
    </motion.div>
  );
}

function ReportView({ report, onReset }: { report: DNAReport, onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black mb-1">DNA <span className="text-cyan-400">Analysis</span> Report</h2>
          <p className="text-gray-500 text-xs font-mono tracking-tighter">ID: STR-DNA-{Math.random().toString(36).substring(7).toUpperCase()}</p>
        </div>
        <button onClick={onReset} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-5 py-2.5 rounded-full hover:bg-white/10">
          New Scan <Zap size={14} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Left Column: Core Metrics */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Summary Card */}
          <section className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl">
             <div className="flex items-center gap-2 mb-4">
                <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-400"><Brain size={20} /></div>
                <h3 className="text-xl font-bold">DNA Overview</h3>
             </div>
             <p className="text-gray-300 text-base leading-relaxed italic">"{report.summary}"</p>
          </section>

          {/* Genome Visualizer */}
          <section className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl">
             <div className="flex items-center gap-2 mb-6">
                <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400"><Fingerprint size={20} /></div>
                <h3 className="text-xl font-bold">Startup Genome</h3>
             </div>
             <div className="space-y-5">
                <GenomeBar label="Market Strength" value={report.genome.marketStrength} />
                <GenomeBar label="Innovation" value={report.genome.innovation} color="bg-cyan-500" />
                <GenomeBar label="Scalability" value={report.genome.scalability} color="bg-blue-500" />
                <GenomeBar label="Competition" value={report.genome.competition} color="bg-red-500" />
                <GenomeBar label="Monetization" value={report.genome.monetization} color="bg-green-500" />
             </div>
          </section>

          {/* Risk Factors */}
          <section className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl">
             <div className="flex items-center gap-2 mb-5">
                <div className="p-2.5 bg-red-500/10 rounded-xl text-red-400"><Shield size={20} /></div>
                <h3 className="text-xl font-bold">Risk Factors</h3>
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {report.riskFactors.map((risk, i) => (
                   <div key={i} className="flex items-start gap-2.5 p-3.5 bg-white/5 border border-white/5 rounded-xl">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0" />
                      <p className="text-xs text-gray-400">{risk}</p>
                   </div>
                ))}
             </div>
          </section>

          {/* Tech & Ops */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Recommended Tech Stack</h4>
                <ul className="space-y-3">
                   <TechItem label="Frontend" value={report.techStack.frontend} />
                   <TechItem label="Backend" value={report.techStack.backend} />
                   <TechItem label="Database" value={report.techStack.database} />
                   {report.techStack.ai && <TechItem label="AI Services" value={report.techStack.ai} isPrimary />}
                </ul>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-[24px] p-6">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Estimated MVP Path</h4>
                <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-white">{report.mvpTime}</span>
                    <span className="text-gray-500 text-[10px] font-bold">BUILD TIME</span>
                </div>
                <div className="space-y-1.5">
                   {report.mvpFeatures.slice(0, 5).map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-gray-300">
                         <div className="w-1 h-1 rounded-full bg-cyan-400" />
                         {f}
                      </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Competition Analysis */}
          <section className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                   <div className="p-2.5 bg-red-500/10 rounded-xl text-red-400"><Search size={20} /></div>
                   <h3 className="text-xl font-bold">Competition Analysis</h3>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                   report.competition.saturation === 'High' ? 'border-red-500/50 text-red-400 bg-red-500/5' :
                   report.competition.saturation === 'Medium' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-500/5' :
                   'border-green-500/50 text-green-400 bg-green-500/5'
                }`}>
                   {report.competition.saturation} Saturation
                </span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <p className="text-sm text-gray-400 leading-relaxed italic border-l border-white/10 pl-4">"{report.competition.analysis}"</p>
                </div>
                <div className="space-y-4">
                   <div>
                      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Direct Rivals</span>
                      <div className="flex flex-wrap gap-1.5">
                         {report.competition.direct.map((c, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] text-gray-300 border border-white/5">{c}</span>
                         ))}
                      </div>
                   </div>
                   <div>
                      <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest block mb-2">Indirect Rivals</span>
                      <div className="flex flex-wrap gap-1.5">
                         {report.competition.indirect.map((c, i) => (
                            <span key={i} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] text-gray-400 border border-white/5">{c}</span>
                         ))}
                      </div>
                   </div>
                </div>
             </div>
          </section>
        </div>

        {/* Right Column: Insights & CTA */}
        <div className="lg:col-span-4 space-y-6">
           
           {/* DNA Score & Clarity */}
           <div className="space-y-3">
             <div className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-[24px] p-6 relative overflow-hidden group">
                <div className="relative z-10">
                   <h4 className="font-bold text-[10px] uppercase tracking-widest mb-1 opacity-70">DNA Score</h4>
                   <div className="text-6xl font-black mb-1">{report.dnaScore}</div>
                   <div className="h-1.5 w-full bg-black/10 rounded-full overflow-hidden mb-3">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${report.dnaScore}%` }}
                        className="h-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                      />
                   </div>
                   <p className="text-[9px] font-bold opacity-80 leading-snug uppercase tracking-wider">Overall Potential</p>
                </div>
                <Dna className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 group-hover:rotate-180 transition-transform duration-[2000ms]" />
             </div>

             <div className="bg-white/5 border border-white/10 rounded-[24px] p-4 relative overflow-hidden group">
                <div className="relative z-10">
                   <div className="flex justify-between items-center mb-3">
                      <h4 className="font-bold text-[9px] uppercase tracking-widest text-gray-500">Idea Clarity</h4>
                      <span className="text-lg font-black text-cyan-400">{report.ideaClarity}%</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${report.ideaClarity}%` }}
                        className="h-full bg-cyan-500"
                      />
                   </div>
                </div>
             </div>
           </div>

           {/* Market Potential Score */}
           <div className="bg-[#0a0a0a] border border-white/10 rounded-[24px] p-6 relative overflow-hidden group">
              <div className="relative z-10">
                 <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-500 mb-1">Market Potential</h4>
                 <div className="text-4xl font-black mb-3">{report.marketScore} <span className="text-xs text-gray-600">/ 10</span></div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${report.marketScore * 10}%` }}
                      className="h-full bg-purple-500"
                    />
                 </div>
              </div>
              <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 opacity-5" />
           </div>

           {/* Growth Strategy */}
           <div className="bg-[#0a0a0a] border border-white/10 rounded-[24px] p-6">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                 <Rocket size={12} className="text-cyan-400" /> Growth Vectors
              </h4>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-bold">
                 {report.growth.map((g, i) => (
                   <span key={i} className="px-2.5 py-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/10 text-cyan-400 w-full text-center">
                     {g}
                   </span>
                 ))}
              </div>
           </div>

           {/* Future Prediction */}
           <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-[24px] p-6 relative shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-2 bg-white/10 rounded-lg text-white"><Target size={16} /></div>
                 <h3 className="text-lg font-bold">Future Insights</h3>
              </div>
              <div className="space-y-4">
                 <p className="text-xs text-gray-300 leading-relaxed italic">"{report.futureInsights.evolution}"</p>
                 <div className="space-y-1.5">
                    {report.futureInsights.opportunities.slice(0, 3).map((opp, i) => (
                       <div key={i} className="flex items-center gap-2 text-[10px] text-gray-400 px-2.5 py-1.5 bg-white/5 rounded-lg">
                          <div className="w-1 h-1 rounded-full bg-purple-400" />
                          {opp}
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>


      {/* ── Shareable DNA Card ──────────────────────────────────── */}
      <ShareableCard report={report} />
      
    </motion.div>
  );
}

function GenomeBar({ label, value, color = "bg-purple-500" }: { label: string, value: number, color?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-mono font-bold uppercase tracking-widest text-gray-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className={`h-full ${color} shadow-[0_0_15px_rgba(34,197,94,0.3)]`}
        />
      </div>
    </div>
  );
}

function TechItem({ label, value, isPrimary = false }: { label: string, value: string, isPrimary?: boolean }) {
  return (
    <li className="flex flex-col">
      <span className="text-[10px] uppercase font-bold text-gray-600 tracking-widest mb-1">{label}</span>
      <span className={`text-sm ${isPrimary ? 'text-cyan-400 font-bold bg-cyan-500/5 px-3 py-2 rounded-xl border border-cyan-500/10 mt-1' : 'text-gray-300'}`}>{value}</span>
    </li>
  );
}

function BuildToolCard({ title, tool, icon }: { title: string, tool: string, icon: React.ReactNode }) {
  return (
    <div className="p-6 rounded-[24px] border border-white/10 hover:border-cyan-500/50 hover:bg-white/[0.03] transition-all group cursor-pointer">
      <div className="mb-6 p-4 rounded-2xl bg-white/5 text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-colors w-fit">
        {icon}
      </div>
      <h4 className="text-sm font-bold text-gray-400 mb-1">{title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-lg font-black">{tool}</span>
        <ArrowRight size={18} className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}

function ShareableCard({ report }: { report: DNAReport }) {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const textToCopy = `Vybex DNA Analysis Report\n\nSummary: ${report.summary}\nDNA Score: ${report.dnaScore}\nMarket Potential: ${report.marketScore}/10\n\nAnalyzed by Vybex Intelligence.`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast.success("DNA Summary copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleLinkedInShare = () => {
    const text = `I just analyzed my startup idea on Vybex DNA! My DNA Score is ${report.dnaScore}.\n\nCheck out your startup's potential at ${window.location.origin}/dna\n\n@VybexStudio #StartupDNA #AIAnalysis #Vybex`;
    const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=600');
    toast.info("Don't forget to upload the High-Res DNA Card you just downloaded!");
  };

  const handleExportPDF = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    if (cardRef.current === null) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        quality: 1, 
        pixelRatio: 3, // Increased for extreme high quality
        backgroundColor: '#000000', // Black background for a more premium look
        style: {
          transform: 'none',
          margin: '0',
          left: '0',
          top: '0',
          borderRadius: '0' // Sharp edges for the certificate export
        }
      });
      
      const link = document.createElement('a');
      link.download = `Vybex-DNA-Certificate-${report.dnaScore}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Ultra High-Res Certificate downloaded!");
    } catch (err) {
      console.error("Image Export Error:", err);
      toast.error("Failed to generate certificate image. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-4">
          <h3 className="text-2xl font-black text-white">Your Professional DNA Card</h3>
          <p className="text-gray-400 text-sm max-w-lg mx-auto">Download and share your startup's genetic certificate on LinkedIn to tag us and join the elite builders ecosystem.</p>
      </div>

      {/* ── Premium Certificate ── */}
      <div className="flex justify-center px-4">
        <div 
          ref={cardRef}
          className="w-full max-w-[600px] min-h-[550px] sm:aspect-[4/5] bg-black text-white p-6 sm:p-12 relative overflow-hidden flex flex-col items-center justify-between border-[1px] border-white/20 shadow-[0_50px_100px_rgba(0,0,0,1)]"
        >
          {/* High-end decorative elements */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full" />

          {/* Header */}
          <div className="relative z-10 flex flex-col items-center mt-2 sm:mt-4">
             <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mb-4 sm:mb-6 backdrop-blur-xl">
                <Dna size={24} className="sm:text-white" />
             </div>
             <h4 className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-cyan-400 mb-1 sm:mb-2">Vybex Intelligence Engine</h4>
             <h2 className="text-xl sm:text-3xl font-light tracking-tighter text-white">GENETIC CERTIFICATE</h2>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center w-full">
             <div className="w-full h-px bg-white/10 mb-4 sm:mb-8" />
             <p className="text-[8px] sm:text-[10px] font-medium text-gray-500 uppercase tracking-widest mb-2 sm:mb-4">Startup Concept Validated</p>
             <h3 className="text-lg sm:text-2xl font-bold mb-4 sm:mb-8 px-2 sm:px-4 leading-tight">
                {report.summary.length > 80 ? report.summary.substring(0, 80) + '...' : report.summary}
             </h3>
             
             <div className="grid grid-cols-2 gap-6 sm:gap-12 w-full max-w-sm mb-6 sm:mb-12">
                <div className="text-center">
                   <div className="text-3xl sm:text-5xl font-black mb-1 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{report.dnaScore}</div>
                   <div className="text-[8px] font-black uppercase tracking-widest text-gray-500">DNA Score</div>
                </div>
                <div className="text-center">
                   <div className="text-3xl sm:text-5xl font-black mb-1 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">{report.marketScore}</div>
                   <div className="text-[8px] font-black uppercase tracking-widest text-gray-500">Market Potential</div>
                </div>
             </div>

             <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-xs mb-4">
                {report.riskFactors.slice(0, 3).map((risk, i) => (
                  <span key={i} className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-white/[0.03] border border-white/10 rounded-full text-[7px] sm:text-[8px] text-gray-400 font-bold uppercase tracking-wider text-center">{risk}</span>
                ))}
             </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 w-full flex justify-between items-end border-t border-white/10 pt-4 sm:pt-8 mt-2 sm:mt-8">
             <div className="text-left space-y-0.5 sm:space-y-1">
                <p className="text-[7px] sm:text-[8px] font-black text-gray-500 uppercase tracking-widest">Verification ID</p>
                <p className="text-[8px] sm:text-[10px] font-mono text-white opacity-50 uppercase">STR-{Math.random().toString(36).substring(7).toUpperCase()}</p>
             </div>
             <div className="text-right space-y-0.5 sm:space-y-1">
                <p className="text-[7px] sm:text-[8px] font-black text-gray-500 uppercase tracking-widest">Validated at</p>
                <p className="text-[8px] sm:text-[10px] font-bold text-white">{new Date().toLocaleDateString()}</p>
             </div>
          </div>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
        <button 
           onClick={handleDownloadImage}
           className="h-16 rounded-2xl bg-white text-black font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] group"
        >
          <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
          Download DNA Card
        </button>
        <button 
           onClick={handleLinkedInShare}
           className="h-16 rounded-2xl bg-[#0A66C2] text-white font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all border border-white/10 shadow-[0_20px_40px_rgba(10,102,194,0.2)] group"
        >
          <Share2 size={20} className="group-hover:scale-110 transition-transform" />
          Share & Tag Vybex
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 text-center backdrop-blur-xl">
         <div className="text-center mb-6">
            <h4 className="text-lg font-bold mb-1">Build Your Reputation</h4>
            <p className="text-xs text-gray-400">Download the high-resolution formal card and share it on LinkedIn.</p>
         </div>

         <div className="flex flex-wrap justify-center gap-3 w-full">
            <button 
              onClick={handleDownloadImage}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-black uppercase tracking-widest shadow-xl hover:shadow-cyan-500/20 transition-all active:scale-95 flex-1 sm:flex-none justify-center"
            >
              <Download size={16} /> Download Card
            </button>
            
            <ShareButton 
              icon={<Share2 size={16} />} 
              label="Share on LinkedIn" 
              onClick={handleLinkedInShare}
            />

            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-xs font-bold text-gray-400 hover:text-cyan-400 flex-1 sm:flex-none justify-center"
            >
              {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Text'}
            </button>
         </div>
      </div>
    </div>
  );
}

function ShareButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all text-xs font-bold text-gray-400 hover:text-cyan-400 flex-1 sm:flex-none justify-center"
    >
      {icon} {label}
    </button>
  );
}

// ── Motion Visuals ───────────────────────────────────────────

function DNAHelixAnimated() {
  return (
    <div className="relative w-full h-[300px] flex justify-center items-center perspective-1000">
       <div className="relative w-40 h-full">
         {Array.from({ length: 24 }).map((_, i) => (
           <React.Fragment key={i}>
             {/* Base Molecule A */}
             <motion.div
               animate={{
                 y: [0, -20, 0],
                 x: [Math.sin(i * 0.5) * 50, Math.sin(i * 0.5 + Math.PI) * 50, Math.sin(i * 0.5) * 50],
                 scale: [1, 1.2, 1],
                 opacity: [0.4, 0.8, 0.4],
                 zIndex: [10, 0, 10]
               }}
               transition={{
                 duration: 4,
                 repeat: Infinity,
                 delay: i * 0.1,
                 ease: "easeInOut"
               }}
               className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
               style={{
                 top: `${(i / 24) * 100}%`,
                 left: '50%'
               }}
             />
             {/* Base Molecule B (Opposite side) */}
             <motion.div
               animate={{
                 y: [0, -20, 0],
                 x: [Math.sin(i * 0.5 + Math.PI) * 50, Math.sin(i * 0.5) * 50, Math.sin(i * 0.5 + Math.PI) * 50],
                 scale: [1, 1.2, 1],
                 opacity: [0.4, 0.8, 0.4],
                 zIndex: [0, 10, 0]
               }}
               transition={{
                 duration: 4,
                 repeat: Infinity,
                 delay: i * 0.1,
                 ease: "easeInOut"
               }}
               className="absolute w-2 h-2 sm:w-3 sm:h-3 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.8)]"
               style={{
                 top: `${(i / 24) * 100}%`,
                 left: '50%'
               }}
             />
             {/* Connecting bridge */}
             <motion.div 
                className="absolute h-px bg-white/10 -z-10"
                animate={{
                  scaleX: [0.5, 1, 0.5],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.1
                }}
                style={{
                  top: `${(i / 24) * 100 + 1.5}%`,
                  left: '25%',
                  width: '50%'
                }}
             />
           </React.Fragment>
         ))}
       </div>
    </div>
  );
}

function DNAHelixStatic() {
    return (
      <div className="relative w-full h-full flex justify-center">
         {Array.from({ length: 40 }).map((_, i) => (
           <div
             key={i}
             className="absolute w-1 h-1 bg-cyan-500/40 rounded-full"
             style={{
               top: `${i * 2.5}%`,
               left: `${50 + Math.sin(i * 0.4) * 15}%`
             }}
           />
         ))}
      </div>
    );
}
