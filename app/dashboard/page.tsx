'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [experience, setExperience] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [resumeContent, setResumeContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('experience')
  const [editItem, setEditItem] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [expRes, projRes, skillRes, resumeRes] = await Promise.all([
        fetch('/api/experience'),
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/resume')
      ])

      const expData = await expRes.json()
      const projData = await projRes.json()
      const skillData = await skillRes.json()
      const resumeData = await resumeRes.json()

      setExperience(Array.isArray(expData) ? expData : [])
      setProjects(Array.isArray(projData) ? projData : [])
      setSkills(Array.isArray(skillData) ? skillData : [])
      setResumeContent(resumeData.content || '')
    } catch (err) {
      console.error('Failed to fetch dashboard data', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveResume = async () => {
    const res = await fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: resumeContent }),
    })
    if (res.ok) alert('Resume template updated!')
  }

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure?')) return
    const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' })
    if (res.ok) fetchData()
  }

  const handleSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data: any = Object.fromEntries(formData.entries())

    // Handle array fields
    if (data.points) data.points = data.points.split('\n').filter((p: string) => p.trim() !== '')
    if (data.tech) data.tech = data.tech.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '')
    if (data.items) data.items = data.items.split(',').map((i: string) => i.trim()).filter((i: string) => i !== '')
    if (data.order_index) data.order_index = parseInt(data.order_index)

    const method = editItem ? 'PUT' : 'POST'
    const payload = editItem ? { ...data, id: editItem.id } : data

    const res = await fetch(`/api/${type}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setEditItem(null)
      fetchData()
    } else {
      const err = await res.json()
      alert(`Error: ${err.error}`)
    }
  }

  if (loading) return <div className="p-10 font-mono text-sm uppercase tracking-widest">Loading_System_Data...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-outline/20 pb-6">
          <h1 className="text-2xl font-bold tracking-tighter">PORTFOLIO_DASHBOARD_v1.0</h1>
          <button onClick={() => {
             document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
             router.push('/')
          }} className="text-[10px] border border-outline/20 px-4 py-2 hover:bg-primary hover:text-on-primary transition-all">
            LOGOUT.SYS
          </button>
        </header>

        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {['experience', 'projects', 'skills', 'resume'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditItem(null); }}
              className={`px-6 py-2 text-[10px] tracking-widest uppercase border ${
                activeTab === tab ? 'bg-primary text-on-primary border-primary' : 'border-outline/20 opacity-50'
              }`}
            >
              {tab}.DAT
            </button>
          ))}
        </div>

        <main className="ascii-border p-6 bg-surface/30">
          {editItem || activeTab === 'new_experience' || activeTab === 'new_projects' || activeTab === 'new_skills' ? (
             <div className="max-w-2xl mx-auto">
                <h2 className="text-xl font-bold mb-6 uppercase">{editItem ? 'Edit' : 'Add New'} {activeTab.replace('new_', '')}</h2>
                <form onSubmit={(e) => handleSubmit(e, activeTab.startsWith('new_') ? activeTab.replace('new_', '') : activeTab)} className="space-y-4">
                   {activeTab.includes('experience') && (
                     <>
                        <input name="company" defaultValue={editItem?.company} placeholder="Company" className="w-full p-2 bg-background border border-outline/20" required />
                        <input name="role" defaultValue={editItem?.role} placeholder="Role" className="w-full p-2 bg-background border border-outline/20" required />
                        <input name="period" defaultValue={editItem?.period} placeholder="Period (e.g. Nov 2025 – Present)" className="w-full p-2 bg-background border border-outline/20" required />
                        <input name="location" defaultValue={editItem?.location} placeholder="Location" className="w-full p-2 bg-background border border-outline/20" />
                        <textarea name="points" defaultValue={editItem?.points?.join('\n')} placeholder="Points (one per line)" className="w-full p-2 bg-background border border-outline/20 h-32" />
                     </>
                   )}
                   {activeTab.includes('projects') && (
                     <>
                        <input name="title" defaultValue={editItem?.title} placeholder="Title" className="w-full p-2 bg-background border border-outline/20" required />
                        <input name="description" defaultValue={editItem?.description} placeholder="Description" className="w-full p-2 bg-background border border-outline/20" />
                        <input name="href" defaultValue={editItem?.href} placeholder="Link (href)" className="w-full p-2 bg-background border border-outline/20" />
                        <input name="tech" defaultValue={editItem?.tech?.join(', ')} placeholder="Tech (comma separated)" className="w-full p-2 bg-background border border-outline/20" />
                        <textarea name="points" defaultValue={editItem?.points?.join('\n')} placeholder="Points (one per line)" className="w-full p-2 bg-background border border-outline/20 h-32" />
                     </>
                   )}
                   {activeTab.includes('skills') && (
                     <>
                        <input name="category" defaultValue={editItem?.category} placeholder="Category" className="w-full p-2 bg-background border border-outline/20" required />
                        <input name="items" defaultValue={editItem?.items?.join(', ')} placeholder="Items (comma separated)" className="w-full p-2 bg-background border border-outline/20" required />
                     </>
                   )}
                   <input name="order_index" type="number" defaultValue={editItem?.order_index || 0} placeholder="Order Index" className="w-full p-2 bg-background border border-outline/20" />
                   <div className="flex space-x-4">
                      <button type="submit" className="bg-primary text-on-primary px-6 py-2 text-[10px]">SAVE_CHANGES.SH</button>
                      <button type="button" onClick={() => {setEditItem(null); if(activeTab.startsWith('new_')) setActiveTab(activeTab.replace('new_', ''))}} className="border border-outline/20 px-6 py-2 text-[10px]">CANCEL.SYS</button>
                   </div>
                </form>
             </div>
          ) : (
            <>
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">EXPERIENCE_MANAGER</h2>
                    <button onClick={() => setActiveTab('new_experience')} className="text-[10px] bg-primary text-on-primary px-4 py-2">ADD_NEW_EXP</button>
                  </div>
                  {experience.map((exp) => (
                    <div key={exp.id} className="border border-outline/10 p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{exp.role} @ {exp.company}</h3>
                        <p className="text-xs opacity-50">{exp.period}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => setEditItem(exp)} className="text-[10px] opacity-50 hover:opacity-100 underline">EDIT</button>
                        <button onClick={() => handleDelete('experience', exp.id)} className="text-[10px] text-red-500 opacity-50 hover:opacity-100 underline">DELETE</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">PROJECT_MANAGER</h2>
                    <button onClick={() => setActiveTab('new_projects')} className="text-[10px] bg-primary text-on-primary px-4 py-2">ADD_NEW_PROJ</button>
                  </div>
                  {projects.map((proj) => (
                    <div key={proj.id} className="border border-outline/10 p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{proj.title}</h3>
                        <p className="text-xs opacity-50 truncate max-w-md">{proj.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => setEditItem(proj)} className="text-[10px] opacity-50 hover:opacity-100 underline">EDIT</button>
                        <button onClick={() => handleDelete('projects', proj.id)} className="text-[10px] text-red-500 opacity-50 hover:opacity-100 underline">DELETE</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">SKILLS_MANAGER</h2>
                    <button onClick={() => setActiveTab('new_skills')} className="text-[10px] bg-primary text-on-primary px-4 py-2">ADD_NEW_CAT</button>
                  </div>
                  {skills.map((skill) => (
                    <div key={skill.id} className="border border-outline/10 p-4 flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">{skill.category}</h3>
                        <p className="text-xs opacity-50">{skill.items.join(', ')}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => setEditItem(skill)} className="text-[10px] opacity-50 hover:opacity-100 underline">EDIT</button>
                        <button onClick={() => handleDelete('skills', skill.id)} className="text-[10px] text-red-500 opacity-50 hover:opacity-100 underline">DELETE</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resume' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold tracking-tight mb-4">RESUME_LATEX_TEMPLATE_EDITOR</h2>
                  <p className="text-[10px] opacity-50 mb-4 tracking-wider">MODIFICATION_OF_RESUME.TEX_WILL_BE_REFLECTED_IN_NEXT_GENERATION_CYCLE</p>
                  <textarea
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    className="w-full h-[500px] bg-background border border-outline/20 p-4 font-mono text-xs focus:outline-none focus:border-primary"
                    spellCheck="false"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={handleSaveResume}
                      className="bg-primary text-on-primary px-8 py-3 text-[10px] tracking-widest hover:opacity-90"
                    >
                      SAVE_AND_DEPLOY_TEMPLATE.SH
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}
