import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Experience() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: experiences, error } = await supabase
    .from('experience')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching experience:', error)
    return null
  }

  return (
    <section id="experience" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">02. EXPERIENCE</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="space-y-12">
        {experiences?.map((exp, index) => (
          <div key={exp.id} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div className="md:col-span-1">
                <p className="font-mono text-sm text-primary font-bold">{exp.period}</p>
                {exp.location && <p className="font-mono text-xs opacity-80 mt-1">{exp.location}</p>}
              </div>
              <div className="md:col-span-3 mt-2 md:mt-0">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{exp.role}</h3>
                <p className="font-mono text-sm text-primary mb-4">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.points?.map((task: string, i: number) => (
                    <li key={i} className="flex items-start text-sm text-on-surface/90">
                      <svg xmlns="http://www.w3.org/2000/svg" height="12px" viewBox="0 -960 960 960" width="12px" fill="currentColor" className="mt-1 mr-2 text-primary shrink-0"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
                      <span className="font-mono">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
