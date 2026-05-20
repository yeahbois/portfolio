'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { generateResumeLatex } from '@/utils/resume-latex'
import { ResumePreview } from '@/components/resume/ResumePreview'

interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location?: string;
  points: string[];
  order_index: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  href: string;
  points: string[];
  order_index: number;
}

interface PublicProject {
  id: string;
  name: string;
  images: string[];
  description: string;
  details: string;
  creator: string;
  status_percentage: number;
  status_message: string;
  order_index: number;
  github_url?: string;
}

interface Blog {
  id: string;
  title: string;
  content: string;
  images: string[];
  date: string;
  order_index: number;
}

interface Skill {
  id: string;
  category: string;
  items: string[];
  order_index: number;
}

interface Certificate {
  id: string;
  institution: string;
  degree: string;
  period: string;
  location?: string;
  order_index: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  order_index: number;
}

export default function Dashboard() {
  const [experience, setExperience] = useState<Experience[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [publicProjects, setPublicProjects] = useState<PublicProject[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [resumeContent, setResumeContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('experience')
  const [editItem, setEditItem] = useState<any>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  const [compileErrorLog, setCompileErrorLog] = useState<string | null>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [expRes, projRes, skillRes, resumeRes, publicProjRes, blogsRes, certRes, achRes] = await Promise.all([
          fetch('/api/experience'),
          fetch('/api/projects'),
          fetch('/api/skills'),
          fetch('/api/resume'),
          fetch('/api/public_projects'),
          fetch('/api/blogs'),
          fetch('/api/certificates'),
          fetch('/api/achievements')
        ])

        const expData = await expRes.json()
        const projData = await projRes.json()
        const skillData = await skillRes.json()
        const resumeData = await resumeRes.json()
        const publicProjData = await publicProjRes.json()
        const blogsData = await blogsRes.json()
        const certData = await certRes.json()
        const achData = await achRes.json()

        setExperience(Array.isArray(expData) ? expData : [])
        setProjects(Array.isArray(projData) ? projData : [])
        setSkills(Array.isArray(skillData) ? skillData : [])
        setResumeContent(resumeData.content || '')
        setPublicProjects(Array.isArray(publicProjData) ? publicProjData : [])
        setBlogs(Array.isArray(blogsData) ? blogsData : [])
        setCertificates(Array.isArray(certData) ? certData : [])
        setAchievements(Array.isArray(achData) ? achData : [])
      } catch (err) {
        console.error('Failed to fetch dashboard data', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const refreshData = async () => {
    try {
      const [expRes, projRes, skillRes, resumeRes, publicProjRes, blogsRes, certRes, achRes] = await Promise.all([
        fetch('/api/experience'),
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/resume'),
        fetch('/api/public_projects'),
        fetch('/api/blogs'),
        fetch('/api/certificates'),
        fetch('/api/achievements')
      ])

      const expData = await expRes.json()
      const projData = await projRes.json()
      const skillData = await skillRes.json()
      const resumeData = await resumeRes.json()
      const publicProjData = await publicProjRes.json()
      const blogsData = await blogsRes.json()
      const certData = await certRes.json()
      const achData = await achRes.json()

      setExperience(Array.isArray(expData) ? expData : [])
      setProjects(Array.isArray(projData) ? projData : [])
      setSkills(Array.isArray(skillData) ? skillData : [])
      setResumeContent(resumeData.content || '')
      setPublicProjects(Array.isArray(publicProjData) ? publicProjData : [])
      setBlogs(Array.isArray(blogsData) ? blogsData : [])
      setCertificates(Array.isArray(certData) ? certData : [])
      setAchievements(Array.isArray(achData) ? achData : [])
    } catch (err) {
      console.error('Failed to refresh dashboard data', err)
    }
  }

  const simulateProgress = (target: number, duration: number) => {
    return new Promise<void>((resolve) => {
      const start = progress;
      const startTime = Date.now();
      const tick = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / duration);
        const current = start + (target - start) * p;
        setProgress(Math.round(current));
        if (p < 1) {
          requestAnimationFrame(tick);
        } else {
          resolve();
        }
      };
      tick();
    });
  };

  const handleGenerateFromDB = async () => {
    setActionLoading(true);
    setProgress(0);
    setStatusText('GENERATING_LATEX_FROM_DB...');

    await simulateProgress(50, 400);
    const newContent = generateResumeLatex({ experience, projects, skills, certificates, achievements });
    setResumeContent(newContent);

    await simulateProgress(100, 200);
    setStatusText('GENERATION_COMPLETE');
    setTimeout(() => { setActionLoading(false); setProgress(0); setStatusText(''); }, 800);
  };

  const handleSaveToDB = async () => {
    setActionLoading(true);
    setProgress(0);
    setStatusText('SAVING_LATEX_TO_DATABASE...');

    await simulateProgress(50, 400);
    const res = await fetch('/api/resume', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: resumeContent }),
    });

    if (res.ok) {
      await simulateProgress(100, 200);
      setStatusText('SAVE_COMPLETE');
      setTimeout(() => { setActionLoading(false); setProgress(0); setStatusText(''); }, 800);
    } else {
      alert("Failed to save latex");
      setActionLoading(false);
    }
  };

  const handleCompileAndDeploy = async () => {
    setActionLoading(true);
    setProgress(0);
    setCompileErrorLog(null);
    setStatusText('INITIATING_SERVER_SIDE_COMPILE...');

    try {
      await simulateProgress(20, 200);
      setStatusText('COMPILING_LATEX_ON_SERVER...');

      const res = await fetch('/api/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: resumeContent,
          compile: true
        }),
      });

      if (res.ok) {
        await simulateProgress(100, 400);
        setStatusText('RESUME_PDF_UPDATED');
        setTimeout(() => { setActionLoading(false); setProgress(0); setStatusText(''); }, 1500);
      } else {
        const data = await res.json();
        if (res.status === 422) {
          setCompileErrorLog(data.log || 'Unknown LaTeX compilation error.');
        } else {
          alert(`Compilation Execution Error: ${data.error || 'Server error'}`);
        }
        setActionLoading(false);
      }
    } catch (err: any) {
      alert(`Network Error: ${err.message}`);
      setActionLoading(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure?')) return
    setActionLoading(true);
    setStatusText(`DELETING_${type.toUpperCase()}_RECORD...`);
    const res = await fetch(`/api/${type}?id=${id}`, { method: 'DELETE' })
    if (res.ok) {
      await refreshData();
    }
    setActionLoading(false);
    setStatusText('');
  }

  const handleSubmit = async (e: React.FormEvent, type: string) => {
    e.preventDefault()
    setActionLoading(true);
    setStatusText('PROCESSING_DATABASE_TRANSACTION...');
    setProgress(20);

    const formData = new FormData(e.target as HTMLFormElement)
    const data: any = Object.fromEntries(formData.entries())

    if (data.points) data.points = data.points.split('\n').filter((p: string) => p.trim() !== '')
    if (data.tech) data.tech = data.tech.split(',').map((t: string) => t.trim()).filter((t: string) => t !== '')
    if (data.items) data.items = data.items.split(',').map((i: string) => i.trim()).filter((i: string) => i !== '')
    if (data.images) data.images = data.images.split('\n').map((i: string) => i.trim()).filter((i: string) => i !== '')
    if (data.order_index) data.order_index = parseInt(data.order_index)
    if (data.status_percentage) data.status_percentage = parseInt(data.status_percentage)

    const method = editItem ? 'PUT' : 'POST'
    const payload = editItem ? { ...data, id: editItem.id } : data

    setProgress(50);
    const res = await fetch(`/api/${type}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      setProgress(100);
      setStatusText('TRANSACTION_SUCCESS');
      setEditItem(null)
      await refreshData()
      setTimeout(() => { setActionLoading(false); setProgress(0); setStatusText(''); }, 1000);
    } else {
      const err = await res.json()
      alert(`Error: ${err.error}`)
      setActionLoading(false);
    }
  }

  if (loading) return <div className="p-10 font-mono text-sm uppercase tracking-widest animate-pulse">Loading_System_Data...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      {actionLoading && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full ascii-border bg-surface p-8 space-y-4">
            <div className="flex justify-between text-[10px] tracking-widest uppercase">
              <span>{statusText}</span>
              <span>{progress}%</span>
            </div>
            <div className="h-4 w-full bg-outline/10 border border-outline/20 overflow-hidden p-0.5">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-[9px] opacity-40 text-center uppercase tracking-tighter">
              Do not close the terminal until process completes
            </div>
          </div>
        </div>
      )}

      {compileErrorLog && (
        <div className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-4xl w-full ascii-border bg-surface p-6 flex flex-col max-h-[85vh]">
            <div className="flex justify-between items-center border-b border-red-500/30 pb-3 mb-4">
              <span className="text-red-500 font-bold tracking-widest text-sm uppercase">
                SYSTEM_ERROR: LATEX_COMPILATION_FAILED.LOG
              </span>
              <button 
                onClick={() => setCompileErrorLog(null)}
                className="text-xs border border-outline/20 px-3 py-1 hover:bg-red-500 hover:text-white transition-all font-bold uppercase tracking-wider"
              >
                [CLOSE.EXE]
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-black/40 border border-outline/10 p-4 font-mono text-[10px] text-red-400/80 leading-relaxed whitespace-pre-wrap select-text">
              {compileErrorLog}
            </div>
            <div className="pt-4 text-center text-[9px] opacity-40 uppercase tracking-tighter">
              Fix the LaTeX syntax errors shown in the log above and try again.
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-outline/20 pb-6">
          <h1 className="text-2xl font-bold tracking-tighter">PORTFOLIO_DASHBOARD_v1.1</h1>
          <button onClick={async () => {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/')
            router.refresh()
          }} className="text-[10px] border border-outline/20 px-4 py-2 hover:bg-primary hover:text-on-primary transition-all">
            LOGOUT.SYS
          </button>
        </header>

        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {['experience', 'projects', 'certificates', 'achievements', 'public_projects', 'blogs', 'skills', 'resume'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setEditItem(null); }}
              className={`px-6 py-2 text-[10px] tracking-widest uppercase border whitespace-nowrap transition-all ${activeTab === tab ? 'bg-primary text-on-primary border-primary' : 'border-outline/20 opacity-50 hover:opacity-100'
                }`}
            >
              {tab.replace('_', ' ')}.DAT
            </button>
          ))}
        </div>

        <main className="ascii-border p-6 bg-surface/30 min-h-[400px]">
          {editItem || activeTab.startsWith('new_') ? (
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-bold mb-6 uppercase">{editItem ? 'Edit' : 'Add New'} {activeTab.replace('new_', '').replace('_', ' ')}</h2>
              <form onSubmit={(e) => handleSubmit(e, activeTab.startsWith('new_') ? activeTab.replace('new_', '') : activeTab)} className="space-y-4">
                {activeTab.includes('experience') && (
                  <>
                    <input name="company" defaultValue={editItem?.company} placeholder="Company" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="role" defaultValue={editItem?.role} placeholder="Role" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="period" defaultValue={editItem?.period} placeholder="Period (e.g. Nov 2025 – Present)" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="location" defaultValue={editItem?.location} placeholder="Location" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <textarea name="points" defaultValue={editItem?.points?.join('\n')} placeholder="Points (one per line)" className="w-full p-2 bg-background border border-outline/20 h-32 focus:border-primary outline-none" />
                  </>
                )}
                {(activeTab === 'projects' || activeTab === 'new_projects') && (
                  <>
                    <input name="title" defaultValue={editItem?.title} placeholder="Title" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="description" defaultValue={editItem?.description} placeholder="Description" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <input name="href" defaultValue={editItem?.href} placeholder="Link (href)" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <input name="tech" defaultValue={editItem?.tech?.join(', ')} placeholder="Tech (comma separated)" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <textarea name="points" defaultValue={editItem?.points?.join('\n')} placeholder="Points (one per line)" className="w-full p-2 bg-background border border-outline/20 h-32 focus:border-primary outline-none" />
                  </>
                )}
                {activeTab.includes('public_projects') && (
                  <>
                    <input name="name" defaultValue={editItem?.name} placeholder="Project Name" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="creator" defaultValue={editItem?.creator} placeholder="Creator" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <input name="github_url" defaultValue={editItem?.github_url} placeholder="GitHub Repo URL (Optional)" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <textarea name="images" defaultValue={editItem?.images?.join('\n')} placeholder="Image URLs (one per line, optional)" className="w-full p-2 bg-background border border-outline/20 h-24 focus:border-primary outline-none" />
                    <input name="description" defaultValue={editItem?.description} placeholder="Short Description" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    <textarea name="details" defaultValue={editItem?.details} placeholder="Full Project Details" className="w-full p-2 bg-background border border-outline/20 h-32 focus:border-primary outline-none" />
                    <div className="flex gap-4">
                      <input name="status_percentage" type="number" defaultValue={editItem?.status_percentage || 0} placeholder="Status %" className="w-1/3 p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                      <input name="status_message" defaultValue={editItem?.status_message} placeholder="Status Message (e.g. Completed)" className="w-2/3 p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                    </div>
                  </>
                )}
                {activeTab.includes('blogs') && (
                  <>
                    <input name="title" defaultValue={editItem?.title} placeholder="Blog Title" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <textarea name="images" defaultValue={editItem?.images?.join('\n')} placeholder="Image URLs (one per line, optional)" className="w-full p-2 bg-background border border-outline/20 h-24 focus:border-primary outline-none" />
                    <textarea name="content" defaultValue={editItem?.content} placeholder="Blog Content (Markdown supported)" className="w-full p-2 bg-background border border-outline/20 h-64 focus:border-primary outline-none" />
                  </>
                )}
                {activeTab.includes('skills') && (
                  <>
                    <input name="category" defaultValue={editItem?.category} placeholder="Category" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="items" defaultValue={editItem?.items?.join(', ')} placeholder="Items (comma separated)" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                  </>
                )}
                {activeTab.includes('certificates') && (
                  <>
                    <input name="institution" defaultValue={editItem?.institution} placeholder="Institution" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="degree" defaultValue={editItem?.degree} placeholder="Degree" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="period" defaultValue={editItem?.period} placeholder="Period" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <input name="location" defaultValue={editItem?.location} placeholder="Location" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                  </>
                )}
                {activeTab.includes('achievements') && (
                  <>
                    <input name="title" defaultValue={editItem?.title} placeholder="Title" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" required />
                    <textarea name="description" defaultValue={editItem?.description} placeholder="Description" className="w-full p-2 bg-background border border-outline/20 h-24 focus:border-primary outline-none" />
                  </>
                )}
                <div className="flex flex-col space-y-1">
                  <label className="text-[8px] opacity-50 uppercase ml-1">Order Index (Lower = First)</label>
                  <input name="order_index" type="number" defaultValue={editItem?.order_index || 0} className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none" />
                </div>
                <div className="flex space-x-4 pt-4">
                  <button type="submit" className="bg-primary text-on-primary px-8 py-2 text-[10px] tracking-widest hover:opacity-90">SAVE_CHANGES.SH</button>
                  <button type="button" onClick={() => { setEditItem(null); if (activeTab.startsWith('new_')) setActiveTab(activeTab.replace('new_', '')) }} className="border border-outline/20 px-8 py-2 text-[10px] tracking-widest hover:bg-surface transition-all">CANCEL.SYS</button>
                </div>
              </form>
            </div>
          ) : (
            <>
              {activeTab === 'experience' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">EXPERIENCE_MANAGER</h2>
                    <button onClick={() => setActiveTab('new_experience')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_EXP</button>
                  </div>
                  <div className="grid gap-4">
                    {experience.map((exp) => (
                      <div key={exp.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div>
                          <h3 className="font-bold text-sm">{exp.role} @ {exp.company}</h3>
                          <p className="text-[10px] opacity-50 uppercase">{exp.period}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(exp)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('experience', exp.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {experience.length === 0 && <p className="text-xs opacity-30 italic">No experience records found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Certificates_Manager</h2>
                    <button onClick={() => setActiveTab('new_certificates')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_CERT</button>
                  </div>
                  <div className="grid gap-4">
                    {certificates.map((edu) => (
                      <div key={edu.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div>
                          <h3 className="font-bold text-sm">{edu.institution}</h3>
                          <p className="text-[10px] opacity-50 uppercase">{edu.degree} | {edu.period}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(edu)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('certificates', edu.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {certificates.length === 0 && <p className="text-xs opacity-30 italic">No certificates found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Achievements_Manager</h2>
                    <button onClick={() => setActiveTab('new_achievements')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_ACHIEVEMENT</button>
                  </div>
                  <div className="grid gap-4">
                    {achievements.map((award) => (
                      <div key={award.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div>
                          <h3 className="font-bold text-sm">{award.title}</h3>
                          <p className="text-[10px] opacity-50 truncate">{award.description}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(award)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('achievements', award.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {achievements.length === 0 && <p className="text-xs opacity-30 italic">No achievements found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">PROJECT_MANAGER</h2>
                    <button onClick={() => setActiveTab('new_projects')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_PROJ</button>
                  </div>
                  <div className="grid gap-4">
                    {projects.map((proj) => (
                      <div key={proj.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div className="max-w-md">
                          <h3 className="font-bold text-sm">{proj.title}</h3>
                          <p className="text-[10px] opacity-50 truncate">{proj.description}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(proj)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('projects', proj.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {projects.length === 0 && <p className="text-xs opacity-30 italic">No project records found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'public_projects' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Public_Projects_Manager</h2>
                    <button onClick={() => setActiveTab('new_public_projects')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_PUBLIC_PROJ</button>
                  </div>
                  <div className="grid gap-4">
                    {publicProjects.map((proj) => (
                      <div key={proj.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div className="max-w-md">
                          <h3 className="font-bold text-sm">{proj.name}</h3>
                          <p className="text-[10px] opacity-50 truncate">{proj.description}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(proj)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('public_projects', proj.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {publicProjects.length === 0 && <p className="text-xs opacity-30 italic">No public projects found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Blogs_Manager</h2>
                    <button onClick={() => setActiveTab('new_blogs')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_BLOG</button>
                  </div>
                  <div className="grid gap-4">
                    {blogs.map((blog) => (
                      <div key={blog.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div className="max-w-md">
                          <h3 className="font-bold text-sm">{blog.title}</h3>
                          <p className="text-[10px] opacity-50 truncate">{blog.date}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(blog)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('blogs', blog.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {blogs.length === 0 && <p className="text-xs opacity-30 italic">No blog posts found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold tracking-tight">SKILLS_MANAGER</h2>
                    <button onClick={() => setActiveTab('new_skills')} className="text-[10px] bg-primary text-on-primary px-4 py-2 hover:opacity-90 tracking-widest uppercase">ADD_NEW_CAT</button>
                  </div>
                  <div className="grid gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="border border-outline/10 p-4 flex justify-between items-start bg-background/50 hover:border-outline/30 transition-all group">
                        <div>
                          <h3 className="font-bold text-sm">{skill.category}</h3>
                          <p className="text-[10px] opacity-50">{skill.items.join(', ')}</p>
                        </div>
                        <div className="flex space-x-3">
                          <button onClick={() => setEditItem(skill)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline">EDIT</button>
                          <button onClick={() => handleDelete('skills', skill.id)} className="text-[10px] text-red-500 opacity-30 group-hover:opacity-100 transition-all underline">DELETE</button>
                        </div>
                      </div>
                    ))}
                    {skills.length === 0 && <p className="text-xs opacity-30 italic">No skill categories found.</p>}
                  </div>
                </div>
              )}

              {activeTab === 'resume' && (
                <div className="space-y-6">
          <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
            <ResumePreview ref={resumeRef} data={{ experience, projects, skills, certificates, achievements }} />
          </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                    <h2 className="text-xl font-bold tracking-tight uppercase">Resume_Engine_v1.1</h2>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={handleGenerateFromDB}
                        disabled={actionLoading}
                        className="text-[10px] border border-outline/30 text-foreground px-4 py-2 hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest disabled:opacity-50"
                      >
                        Generate from DB
                      </button>
                      <button
                        onClick={handleSaveToDB}
                        disabled={actionLoading}
                        className="text-[10px] border border-outline/30 text-foreground px-4 py-2 hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest disabled:opacity-50"
                      >
                        Save to DB
                      </button>
                    </div>
                  </div>
                  <p className="text-[10px] opacity-50 mb-4 tracking-wider uppercase">Latex source management with cloud storage sync. (Note: Compilation is optimized for one-page professional layout).</p>
                  <textarea
                    value={resumeContent}
                    onChange={(e) => setResumeContent(e.target.value)}
                    className="w-full h-[500px] bg-background border border-outline/20 p-4 font-mono text-xs focus:outline-none focus:border-primary resize-none"
                    spellCheck="false"
                  />
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={handleCompileAndDeploy}
                      disabled={actionLoading}
                      className="bg-primary text-on-primary px-10 py-4 text-[10px] tracking-[0.2em] hover:opacity-90 transition-all uppercase font-bold disabled:opacity-50"
                    >
                      Compile & Update Resume.pdf
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
