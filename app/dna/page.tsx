'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { 
  Fingerprint, Search, TrendingUp, Cpu, ArrowRight, Dna, 
  Sparkles, Brain, Zap, Globe, BarChart3, ChevronRight,
  Shield, Rocket, Target, Share2, Download, Copy, Check,
  Coffee, RotateCcw, Moon
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
                <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                    Map your startup's genetic potential. Enter your idea below to receive a detailed intelligence report and growth trajectory prediction.
                </p>
              </div>

              {/* ── Build Form ──────────────────────────────────── */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white/5 backdrop-blur-3xl p-6 sm:p-8 rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-2xl">
                <div className="space-y-6">
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
                <div className="space-y-6">
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
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <Dna size={22} className="group-hover:rotate-180 transition-transform duration-700" />
                      Scan Idea DNA
                    </button>
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
    "Scanning idea structure...",
    "Analyzing market signals...",
    "Mapping startup genome...",
    "Sequencing growth vectors...",
    "Finalizing DNA report..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-xl mx-auto text-center py-20"
    >
      <div className="relative mb-12">
        <DNAHelixAnimated />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-transparent h-full w-full z-10" />
      </div>
      <h2 className="text-2xl font-mono text-cyan-400 mb-4 h-8">
        {steps[step]}
      </h2>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 4, ease: "linear" }}
          className="h-full bg-cyan-500"
        />
      </div>
    </motion.div>
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
    const text = `I just analyzed my startup idea on Vybex DNA! My DNA Score is ${report.dnaScore}.\n\nCheck out your startup's potential at ${window.location.origin}/dna`;
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
      // Use toPng with explicit options to prevent clipping
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        quality: 1, 
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        // Ensure the element is captured at its full natural size
        style: {
          transform: 'none',
          margin: '0',
          left: '0',
          top: '0',
        }
      });
      
      const link = document.createElement('a');
      link.download = `Vybex-DNA-Certificate-${report.dnaScore}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("High-Res Certificate downloaded!");
    } catch (err) {
      console.error("Image Export Error:", err);
      toast.error("Failed to generate certificate image. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ── Formal Analysis Certificate (Target for Image) ── */}
      <div 
        ref={cardRef}
        className="bg-white text-black p-6 sm:p-12 rounded-[2px] border-[6px] border-double border-gray-200 shadow-2xl relative font-serif max-w-2xl mx-auto"
      >
        {/* Certification Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <Dna size={300} />
        </div>

        <div className="relative z-10 border border-gray-100 p-6 sm:p-10 h-full flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-6 shadow-xl">
             <Fingerprint size={32} className="text-white" />
          </div>
          
          <h4 className="text-[10px] font-bold text-gray-400 tracking-[0.4em] uppercase mb-1 font-sans">Official Intelligence Report</h4>
          <h5 className="text-2xl sm:text-3xl font-black mb-8 tracking-tight font-sans text-gray-900 border-b-2 border-gray-900 pb-1">Vybex DNA Certificate</h5>
          
          <p className="text-center text-gray-600 text-xs sm:text-sm max-w-md mb-10 italic leading-relaxed">
            "This document certifies that the aforementioned startup concept has undergone comprehensive genetic sequencing via the Vybex Intelligence Engine."
          </p>

          <div className="grid grid-cols-3 gap-6 sm:gap-12 w-full mb-10">
            <div className="text-center">
               <div className="text-3xl sm:text-4xl font-black text-black font-sans">{report.dnaScore}</div>
               <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-sans mt-1">DNA Score</div>
            </div>
            <div className="text-center">
               <div className="text-3xl sm:text-4xl font-black text-black font-sans">{report.marketScore}</div>
               <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-sans mt-1">Market Scale</div>
            </div>
            <div className="text-center">
               <div className="text-3xl sm:text-4xl font-black text-black font-sans uppercase">{report.complexity}</div>
               <div className="text-[8px] text-gray-400 font-bold uppercase tracking-widest font-sans mt-1">Difficulty</div>
            </div>
          </div>

          <div className="w-full border-t border-gray-200 pt-6 flex justify-between items-end">
            <div className="space-y-0.5">
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest font-sans">Emission Date</p>
              <p className="text-xs font-bold text-black font-sans">{new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
               <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest font-sans">Verified By</p>
               <p className="text-xs font-serif italic font-bold">Vybex AI Systems</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Share Actions ── */}
      <div className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur-xl">
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
    <div className="relative w-full h-[300px] flex justify-center items-center">
       {Array.from({ length: 12 }).map((_, i) => (
         <motion.div
           key={i}
           animate={{
             y: [0, -150, 0],
             rotateY: [0, 360],
             scale: [1, 1.5, 1],
             opacity: [0.3, 1, 0.3]
           }}
           transition={{
             duration: 3,
             repeat: Infinity,
             delay: i * 0.2,
             ease: "easeInOut"
           }}
           className="absolute w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.8)]"
           style={{
             top: `${i * 8}%`,
             left: `${50 + Math.sin(i * 0.8) * 30}%`
           }}
         />
       ))}
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
