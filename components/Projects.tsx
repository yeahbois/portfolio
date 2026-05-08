'use client'

const projects = [
  {
    title: 'PROJECT_VOID_DASHBOARD',
    desc: 'Real-time monitoring system for distributed servers with a futuristic dashboard UI.',
    tech: ['NEXTJS', 'SUPABASE', 'TAILWIND', 'THREEJS'],
    id: '01'
  },
  {
    title: 'ENIGMA_PROTOCOL_API',
    desc: 'End-to-end encrypted messaging API with zero-knowledge proof architecture.',
    tech: ['NODEJS', 'RUST', 'POSTGRES', 'REDIS'],
    id: '02'
  },
  {
    title: 'CYBER_ASSET_VAULT',
    desc: 'Secure digital asset management system with biometric authentication simulation.',
    tech: ['REACT', 'SOLIDITY', 'ETHERS.JS'],
    id: '03'
  },
  {
    title: 'PHANTOM_OS_INTERFACE',
    desc: 'A web-based operating system interface mock-up with terminal integration.',
    tech: ['TYPESCRIPT', 'CANVAS', 'Framer Motion'],
    id: '04'
  }
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">01. PROJECTS</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="ascii-border p-6 bg-surface/30 hover:bg-surface-variant/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-primary opacity-50">PROJ_ID_{p.id}</span>
              <div className="flex space-x-3">
                <span className="material-symbols-outlined text-xl opacity-40 hover:opacity-100 cursor-pointer">folder</span>
                <span className="material-symbols-outlined text-xl opacity-40 hover:opacity-100 cursor-pointer">open_in_new</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-sm opacity-70 mb-6 font-mono leading-relaxed">
              {p.desc}
            </p>
            <div className="flex flex-wrap gap-3">
              {p.tech.map((t) => (
                <span key={t} className="text-[10px] font-mono border border-outline/20 px-2 py-0.5 opacity-50">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="px-8 py-3 border border-outline/20 text-[10px] font-mono tracking-widest hover:border-primary hover:text-primary transition-all">
          LOAD_MORE_RECORDS.DAT
        </button>
      </div>
    </section>
  )
}
