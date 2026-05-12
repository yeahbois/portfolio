'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PublicProject {
  name: string;
  status_message?: string;
  creator?: string;
  status_percentage: number;
  images?: string[];
  description: string;
  details?: string;
}

export default function ProjectDetail({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = use(params)
  const [project, setProject] = useState<PublicProject | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (projectId === 'dashboard') return;
    fetch(`/api/public_projects?id=${projectId}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(data => {
        setProject(data)
        setLoading(false)
      })
      .catch(() => {
        router.push('/projects/dashboard')
      })
  }, [projectId, router])

  if (projectId === 'dashboard') return null;
  if (loading || !project) return <div className="p-10 font-mono text-sm animate-pulse">FETCHING_PROJECT_DATA.SYS...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/projects/dashboard" className="text-[10px] uppercase tracking-widest opacity-50 hover:opacity-100 hover:text-primary transition-all mb-8 inline-block">
          &lt; RETURN_TO_DASHBOARD
        </Link>

        <header className="mb-12">
          <div className="flex justify-between items-end mb-4">
            <h1 className="text-4xl font-bold tracking-tighter">{project.name}</h1>
            <span className="text-[10px] border border-primary text-primary px-2 py-1 uppercase">{project.status_message || 'ACTIVE'}</span>
          </div>
          <div className="flex items-center space-x-4 text-[10px] opacity-50 uppercase tracking-widest border-b border-outline/20 pb-6">
            <span>Creator: {project.creator}</span>
            <span>•</span>
            <span>Progress: {project.status_percentage}%</span>
          </div>
        </header>

        <div className="space-y-12">
          {project.images && project.images.length > 0 && (
            <div className="grid grid-cols-1 gap-4">
              {project.images.map((img: string, idx: number) => (
                <div key={idx} className="ascii-border p-2 bg-surface/30">
                  <img src={img} alt={`${project.name} ${idx + 1}`} className="w-full grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              ))}
            </div>
          )}

          <section className="ascii-border p-8 bg-surface/20">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Project Description</h2>
            <p className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap">{project.description}</p>
          </section>

          {project.details && (
            <section className="ascii-border p-8 bg-surface/20">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">Project Details</h2>
              <div className="text-sm leading-relaxed opacity-80 whitespace-pre-wrap">{project.details}</div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
