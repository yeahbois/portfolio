import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Achievements() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: achievements, error } = await supabase
    .from('achievements')
    .select('*')
    .order('order_index', { ascending: true })

  if (error || !achievements || achievements.length === 0) {
    return null
  }

  return (
    <section id="achievements" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">06. ACHIEVEMENTS</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {achievements.map((ach) => (
          <div key={ach.id} className="ascii-border p-6 bg-surface/30 group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors uppercase">{ach.title}</h3>
            <p className="font-mono text-sm text-on-surface/80 leading-relaxed">{ach.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
