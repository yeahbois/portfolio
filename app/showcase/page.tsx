'use client'

import Link from 'next/link'

const SHOWCASE_PROJECTS = [
  {
    slug: 'savor',
    order: '01',
    title: 'Savor: Interactive 3D Restaurant Experience',
    subtitle: 'High-end dining web application driven by WebGL & 3D interaction',
    badge: '3D / WEBGL / FRONTEND ART',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    description: 'An immersive culinary journey featuring interactive 3D table scenes, camera motion dish focus, ingredient breakdown modals, and scroll-linked spatial transitions.',
    features: [
      'Interactive WebGL / Three.js 3D viewport',
      'Dynamic dish inspection with ingredient cards',
      'Editorial luxury aesthetic & table reservation engine',
      '60 FPS performance optimizations for mobile & desktop',
    ],
    tech: ['Next.js', 'React Three Fiber', 'Three.js', 'Tailwind CSS', 'TypeScript'],
    cta: 'INSPECT_SAVOR.3D',
    styleBorder: 'hover:border-amber-500/50',
  },
  {
    slug: 'stayflow',
    order: '02',
    title: 'StayFlow: Hotel Booking & Guest Automation',
    subtitle: 'End-to-end hospitality platform with visual event workflow automation',
    badge: 'AUTOMATION / WORKFLOWS / FULL-STACK',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    description: 'Combines a boutique hotel guest booking portal with an administrative workflow trigger engine to automate pre-arrival emails, check-ins, guest messaging, and housekeeping notifications.',
    features: [
      'Interactive room availability search & multi-tier pricing engine',
      'Visual IF/THEN automation rule builder',
      'Lifecycle guest messaging preview (Confirmation -> Pre-Arrival -> Checkout)',
      'Occupancy calendar matrix & staff dashboard',
    ],
    tech: ['Next.js', 'PostgreSQL / Supabase', 'Workflow Engine', 'Tailwind CSS', 'TypeScript'],
    cta: 'LAUNCH_STAYFLOW.SYS',
    styleBorder: 'hover:border-emerald-500/50',
  },
  {
    slug: 'nexus',
    order: '03',
    title: 'Nexus: AI Business Assistant & Knowledge System',
    subtitle: 'Production-ready AI integration platform with RAG knowledge base & lead capture',
    badge: 'AI INTEGRATION / RAG / LEAD CRM',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    description: 'An embeddable business assistant that queries customer documentation, automatically captures leads during conversations, and provides complete admin oversight.',
    features: [
      'Infinity Model Provider abstraction layer (multi-llm ready)',
      'Streaming chat responses & contextual lead capture triggers',
      'Knowledge Base Document & FAQ administration',
      'Analytics dashboard for conversion & user queries',
    ],
    tech: ['Next.js', 'Infinity AI Provider', 'Vector Knowledge Storage', 'Tailwind CSS', 'TypeScript'],
    cta: 'DEPLOY_NEXUS.AI',
    styleBorder: 'hover:border-cyan-500/50',
  },
  {
    slug: 'ledger',
    order: '04',
    title: 'Ledger: Business Accounting & Analytics Terminal',
    subtitle: 'Financial terminal for cash flow analysis, invoicing, and transaction auditing',
    badge: 'FINANCIAL TERMINAL / DATA VISUALIZATION',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    description: 'Dense, precise financial terminal designed for small and medium businesses. Features full transaction CRUD, invoice calculation engines, and interactive revenue reports.',
    features: [
      'Real-time P&L, Accounts Receivable, and Cash Flow metrics',
      'Advanced transaction table with filtering, search, sorting, and pagination',
      'Complete invoice generator with tax, discounts, and preview drawer',
      'Interactive date-range financial reporting views',
    ],
    tech: ['Next.js', 'Recharts', 'PostgreSQL / Supabase', 'Tailwind CSS', 'TypeScript'],
    cta: 'OPEN_LEDGER.FIN',
    styleBorder: 'hover:border-blue-500/50',
  },
  {
    slug: 'bistroimharz',
    order: '05',
    title: 'Bistro im Harz: Lux Velvet Dining & Menu System',
    subtitle: 'Neon-noir hospitality showcase with real-time menu pre-ordering',
    badge: 'LUXURY BRANDING / MENU SYSTEM',
    badgeColor: 'border-pink-500/30 text-pink-400 bg-pink-500/10',
    description: 'A dark-mode velvet dining showcase with animated menu category filters, quick table reservation modal, and interactive pre-order receipt sidebar.',
    features: [
      'Lux Velvet aesthetic with high-contrast neon accents',
      'Tabbed menu system with instant dish filtering',
      'Pre-order receipt cart drawer with subtotal calculations',
      'Table reservation modal with instant reference code',
    ],
    tech: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Google Fonts Outfit'],
    cta: 'VIEW_BISTRO.LUX',
    styleBorder: 'hover:border-pink-500/50',
  },
]

export default function ShowcaseDirectoryPage() {
  return (
    <div className="min-h-screen bg-[#0A0D12] text-on-surface py-20 px-4 max-w-7xl mx-auto w-full font-mono">
      {/* Header Banner */}
      <div className="mb-16 border-b border-outline/20 pb-8">
        <div className="flex items-center space-x-3 mb-2">
          <span className="w-3 h-3 rounded-full bg-primary animate-ping"></span>
          <span className="text-primary text-xs tracking-widest uppercase font-bold">
            SHOWCASE_GALLERY // COMMERCIAL_PRODUCTS
          </span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">
          Commercial Product Demos
        </h1>
        <p className="text-sm md:text-base text-on-surface-variant max-w-3xl leading-relaxed">
          I build digital products, 3D WebGL experiences, AI business systems, and custom workflow automation engines. Launch and inspect live interactive demonstrations below.
        </p>
      </div>

      {/* Grid of Showcase Cards */}
      <div className="grid grid-cols-1 gap-8 mb-12">
        {SHOWCASE_PROJECTS.map((proj) => (
          <div
            key={proj.slug}
            className={`bg-[#10141D] border border-outline/20 p-6 md:p-8 rounded-lg transition-all duration-300 ${proj.styleBorder} group relative overflow-hidden`}
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-outline/10 pb-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl md:text-3xl font-black text-primary/70">{proj.order}</span>
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded border uppercase tracking-wider ${proj.badgeColor}`}>
                    {proj.badge}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-white mt-2 group-hover:text-primary transition-colors">
                    {proj.title}
                  </h2>
                </div>
              </div>

              <Link
                href={`/showcase/${proj.slug}`}
                className="px-6 py-3 bg-primary text-on-primary text-xs font-bold tracking-widest hover:opacity-90 transition-all flex items-center space-x-2 shrink-0 self-start md:self-center"
              >
                <span>{proj.cta}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              {proj.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 bg-[#080A0E] p-4 rounded border border-outline/10">
              {proj.features.map((feat, idx) => (
                <div key={idx} className="flex items-start text-xs text-on-surface/90">
                  <span className="text-primary mr-2 font-bold">&gt;</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {proj.tech.map((t) => (
                <span key={t} className="text-[10px] border border-outline/30 px-2.5 py-1 text-on-surface-variant rounded bg-surface/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
