'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface ShortLink {
  id: string;
  slug: string;
  long_url: string;
  created_at: string;
}

export default function ShortenerDashboard() {
  const [links, setLinks] = useState<ShortLink[]>([])
  const [loading, setLoading] = useState(true)
  const [editItem, setEditItem] = useState<ShortLink | null>(null)
  const [actionLoading, setActionLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/shortener/list')
      if (res.status === 401) {
        router.push('/dashboard/login?redirect=/shortener/dashboard')
        return
      }
      const data = await res.json()
      setLinks(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Failed to fetch links', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return
    setActionLoading(true)
    try {
      const res = await fetch(`/api/shortener/delete?id=${id}`, { method: 'DELETE' })
      if (res.ok) fetchLinks()
    } catch (err) {
      alert('Delete failed')
    } finally {
      setActionLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setActionLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/shortener/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, id: editItem?.id }),
      })
      if (res.ok) {
        setEditItem(null)
        fetchLinks()
      } else {
        const err = await res.json()
        alert(err.error || 'Update failed')
      }
    } catch (err) {
      alert('Update failed')
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) return <div className="p-10 font-mono text-sm uppercase tracking-widest animate-pulse">Scanning_Shortener_Database...</div>

  return (
    <div className="min-h-screen bg-background text-foreground font-mono p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-outline/20 pb-4">
          <h1 className="text-xl font-bold tracking-tighter uppercase">Shortener_Control_Panel_v1.0</h1>
          <div className="flex gap-4">
             <button onClick={() => router.push('/shortener/create')} className="text-[10px] border border-outline/20 px-4 py-2 hover:bg-primary hover:text-on-primary transition-all uppercase">New_Link</button>
             <button onClick={() => router.push('/dashboard')} className="text-[10px] border border-outline/20 px-4 py-2 hover:bg-primary hover:text-on-primary transition-all uppercase">Back_to_Dash</button>
          </div>
        </header>

        {editItem ? (
          <div className="ascii-border p-6 bg-surface mb-8">
            <h2 className="text-sm font-bold mb-4 uppercase">Edit_Link: {editItem.slug}</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input name="slug" defaultValue={editItem.slug} placeholder="Slug" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none text-sm" required />
              <input name="long_url" defaultValue={editItem.long_url} placeholder="Long URL" className="w-full p-2 bg-background border border-outline/20 focus:border-primary outline-none text-sm" required />
              <div className="flex gap-4">
                <button type="submit" disabled={actionLoading} className="bg-primary text-on-primary px-6 py-2 text-[10px] tracking-widest uppercase hover:opacity-90 disabled:opacity-50">SAVE_CHANGES</button>
                <button type="button" onClick={() => setEditItem(null)} className="border border-outline/20 px-6 py-2 text-[10px] tracking-widest uppercase hover:bg-background">CANCEL</button>
              </div>
            </form>
          </div>
        ) : (
          <div className="ascii-border overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface border-b border-outline/20 text-[10px] uppercase opacity-50">
                  <th className="p-4">Slug</th>
                  <th className="p-4">Destination</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {links.map((link) => (
                  <tr key={link.id} className="border-b border-outline/10 hover:bg-surface/50 transition-all group">
                    <td className="p-4 font-bold text-primary">/s/{link.slug}</td>
                    <td className="p-4 opacity-70 truncate max-w-[200px]">{link.long_url}</td>
                    <td className="p-4 text-right space-x-3">
                      <button onClick={() => setEditItem(link)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-primary transition-all underline uppercase">Edit</button>
                      <button onClick={() => handleDelete(link.id)} className="text-[10px] opacity-30 group-hover:opacity-100 hover:text-red-500 transition-all underline uppercase">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {links.length === 0 && <div className="p-8 text-center text-xs opacity-30 italic uppercase">No_Links_Found_In_Registry</div>}
          </div>
        )}
      </div>
    </div>
  )
}
