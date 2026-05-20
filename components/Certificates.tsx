import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Certificates() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: certificates, error } = await supabase
    .from('certificates')
    .select('*')
    .order('order_index', { ascending: true })

  if (error || !certificates || certificates.length === 0) {
    return null
  }

  return (
    <section id="certificates" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">04. CERTIFICATES</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="space-y-12">
        {certificates.map((cert) => (
          <div key={cert.id} className="relative pl-8 md:pl-0">
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div className="md:col-span-1">
                <p className="font-mono text-sm text-primary font-bold">{cert.period}</p>
                {cert.location && <p className="font-mono text-xs opacity-80 mt-1">{cert.location}</p>}
              </div>
              <div className="md:col-span-3 mt-2 md:mt-0">
                <h3 className="text-xl font-bold tracking-tight text-foreground">{cert.degree}</h3>
                <p className="font-mono text-sm text-primary">{cert.institution}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
