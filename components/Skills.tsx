import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Skills() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: skillCategories, error } = await supabase
    .from('skills')
    .select('*')
    .order('order_index', { ascending: true })

  if (error) {
    console.error('Error fetching skills:', error)
    return null
  }

  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">03. SKILLS</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {skillCategories?.map((cat) => (
          <div key={cat.id} className="border-l border-primary/30 pl-6">
            <h3 className="font-mono text-sm text-primary mb-6 tracking-[0.2em]">{cat.category}</h3>
            <ul className="space-y-4">
              {cat.items?.map((skill: string) => (
                <li key={skill} className="flex items-center group">
                  <div className="w-1.5 h-1.5 bg-outline/40 mr-3 group-hover:bg-primary transition-colors"></div>
                  <span className="font-mono text-sm opacity-80 group-hover:opacity-100 transition-opacity">{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-20 p-8 border border-outline/10 bg-surface-variant/5 text-center">
        <p className="font-mono text-[10px] opacity-40 uppercase tracking-[0.5em] mb-4">Current_Focus</p>
        <p className="text-xl md:text-2xl font-bold tracking-tight">AI-Driven Infrastructure & Quantum-Safe Encryption</p>
      </div>
    </section>
  )
}
