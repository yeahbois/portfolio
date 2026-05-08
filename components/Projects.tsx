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
              <span className="font-mono text-xs text-primary opacity-50">PROJ_ID_{index + 1}</span>
              <div className="flex space-x-3">
                <a href={p.href || '#'} target="_blank" rel="noopener noreferrer" className="material-symbols-outlined text-xl opacity-40 hover:opacity-100 cursor-pointer">
                  open_in_new
                </a>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{p.title}</h3>
            <p className="text-sm opacity-70 mb-4 font-mono leading-relaxed">
              {p.description}
            </p>
            <ul className="mb-6 space-y-2">
              {p.points?.map((point: string, i: number) => (
                <li key={i} className="text-xs opacity-60 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              {p.tech?.map((t: string) => (
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
