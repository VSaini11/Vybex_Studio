'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const plans = [
    {
        tier: 'Website Development',
        price: '₹18,000',
        tagline: 'Modern, fast, SEO-ready websites built with scalable architecture using Next.js and modern technologies.',
        features: [
            'Responsive Design',
            '4–6 Pages',
            'Contact Form',
            'Basic SEO Setup',
            'Performance Optimization',
            'Note: Domain & hosting billed separately',
        ],
        featured: false,
    },
    {
        tier: 'UI/UX & Brand Identity',
        price: '₹10,000',
        tagline: 'Premium website design, logo design, brand identity systems, posters & YouTube thumbnails.',
        features: [
            'Custom UI Design',
            'Logo Design',
            'Brand Color System',
            'Typography Guidelines',
            'Creative Assets (Posters/Thumbnails)',
        ],
        featured: false,
    },
    {
        tier: 'Digital Product Building',
        price: '₹45,000',
        tagline: 'Landing pages, SaaS MVPs, booking systems, dashboards, and internal tools built with modern architecture.',
        features: [
            'Custom Web Application',
            'Scalable Structure',
            'Secure Backend Setup',
            'Deployment Support',
            'Database Integration',
            '1 Month Technical Support',
            'Note: Cloud hosting, storage & third-party services billed separately'
        ],
        featured: true,
    },
    {
        tier: 'Startup Growth Strategy',
        price: '₹30,000',
        tagline: 'Helping startups grow using digital systems and conversion-focused strategies.',
        features: [
            'Conversion-Optimized Landing Page',
            'Lead Capture System',
            'Funnel Setup',
            'Basic Automation',
            'Growth Consultation',
            'Strategy Consultation',
        ],
        featured: false,
    },
];

export function Pricing() {
    return (
        <section id="pricing" className="relative py-28 px-6 overflow-hidden" style={{ background: '#080808' }}>
            {/* Top center glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[260px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(34,197,94,0.06) 0%, transparent 70%)', filter: 'blur(48px)' }} />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                        <span className="text-green-400">Pricing</span> Plans — Flexible plans for
                        <br />every stage of your growth
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm">
                        Transparent pricing. No hidden fees. Pick the package that fits your goals.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.tier}
                            className="relative flex flex-col h-full pt-9"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: i * 0.1 }}
                        >
                            {/* "Best Deal" tab — sits in pt-9 gap, flush with card top */}
                            {plan.featured && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-start justify-center">
                                    <div
                                        className="px-5 py-2 rounded-t-2xl text-xs font-semibold text-green-300 flex items-center gap-1.5 whitespace-nowrap"
                                        style={{
                                            background: 'rgba(22,50,28,0.95)',
                                            border: '1px solid rgba(34,197,94,0.3)',
                                            borderBottom: 'none',
                                        }}
                                    >
                                        Best Deal 🐍
                                    </div>
                                </div>
                            )}

                            {/* Card */}
                            <div
                                className="rounded-2xl flex flex-col h-full overflow-hidden"
                                style={
                                    plan.featured
                                        ? {
                                            background: '#0d130e',
                                            border: '1px solid rgba(34,197,94,0.35)',
                                            boxShadow: '0 0 48px rgba(34,197,94,0.12), 0 8px 40px rgba(0,0,0,0.6)',
                                            borderRadius: '1rem',
                                        }
                                        : {
                                            background: '#0d0d0d',
                                            border: '1px solid rgba(255,255,255,0.07)',
                                            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                                        }
                                }
                            >
                                <div className="p-6 flex flex-col flex-1">
                                    {/* Tier label */}
                                    <p className="text-sm font-semibold mb-3" style={{ color: '#4ade80' }}>
                                        {plan.tier}
                                    </p>

                                    {/* Price */}
                                    <div className="mb-1">
                                        <span className="text-xs text-gray-500">Starting From</span>
                                    </div>
                                    <div className="flex items-baseline gap-1 mb-1">
                                        <span className="text-4xl font-black text-white">{plan.price}</span>
                                    </div>
                                    <span className="text-xs text-gray-600 mb-5 block">/project</span>

                                    {/* Description */}
                                    <p className="text-sm text-gray-400 leading-relaxed mb-5">{plan.tagline}</p>

                                    {/* Divider */}
                                    <div className="mb-4" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

                                    {/* Features */}
                                    <ul className="flex flex-col gap-3 flex-1">
                                        {plan.features.map((f) => (
                                            <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                                                <span
                                                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center"
                                                    style={{
                                                        background: 'rgba(34,197,94,0.15)',
                                                        border: '1px solid rgba(34,197,94,0.3)',
                                                    }}
                                                >
                                                    <Check size={11} color="#4ade80" strokeWidth={3} />
                                                </span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA */}
                                    <motion.a
                                        href="#contact"
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="mt-8 flex items-center justify-between px-5 py-3 rounded-full text-sm font-semibold"
                                        style={
                                            plan.featured
                                                ? {
                                                    background: '#22c55e',
                                                    color: '#000',
                                                }
                                                : {
                                                    background: 'transparent',
                                                    color: '#fff',
                                                    border: '1px solid rgba(255,255,255,0.12)',
                                                }
                                        }
                                    >
                                        Start Your Project
                                        <span
                                            className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                                            style={{
                                                background: plan.featured ? '#000' : '#22c55e',
                                            }}
                                        >
                                            <ArrowRight size={14} color={plan.featured ? '#22c55e' : '#000'} strokeWidth={2.5} />
                                        </span>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
