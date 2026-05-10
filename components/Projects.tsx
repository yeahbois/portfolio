import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Projects() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching projects:', error)
    return null
  }

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">01. PROJECTS</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map((p, index) => (
          <div key={p.id} className="ascii-border p-6 bg-surface/30 hover:bg-surface-variant/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="font-mono text-xs text-primary font-bold">PROJ_ID_{index + 1}</span>
              <div className="flex space-x-3">
                <a href={p.href || '#'} target="_blank" rel="noopener noreferrer" className="opacity-60 hover:opacity-100 cursor-pointer" aria-label="Open project">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0-33-23.5-56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
                </a>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-sm text-on-surface/90 mb-4 font-mono leading-relaxed">
              {p.description}
            </p>
            <ul className="mb-6 space-y-2">
              {p.points?.map((point: string, i: number) => (
                <li key={i} className="text-xs text-on-surface/80 flex items-start">
                  <span className="mr-2 text-primary font-bold">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {p.tech?.map((t: string) => (
                <span key={t} className="text-[10px] font-mono border border-outline/40 px-2 py-0.5 text-on-surface/80">
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
