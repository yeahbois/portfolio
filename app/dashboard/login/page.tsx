'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.href = '/dashboard'
    } else {
      setError('Invalid password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full ascii-border p-8 bg-surface">
        <h1 className="text-2xl font-bold mb-6 tracking-tighter">ADMIN_LOGIN.EXE</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-mono mb-2 opacity-50 uppercase tracking-widest">
              Access_Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-outline/20 p-3 font-mono text-sm focus:outline-none focus:border-primary"
              placeholder="************"
              required
            />
          </div>
          {error && <p className="text-red-500 text-[10px] font-mono">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-primary text-on-primary font-mono text-xs tracking-widest hover:opacity-90 transition-opacity"
          >
            AUTHORIZE_ACCESS
          </button>
        </form>
      </div>
    </div>
  )
}
