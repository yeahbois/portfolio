'use client'

import { useState } from 'react'

export default function Contact() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Since it's a simple request, we can use mailto or just a mock submission
    const mailtoUrl = `mailto:marcellolienarta663@gmail.com?subject=Portfolio Contact from ${email}&body=${encodeURIComponent(message)}`
    window.location.href = mailtoUrl
    setStatus('SENT_VIA_MAIL_CLIENT')
  }

  return (
    <section id="contact" className="py-20 px-4 max-w-7xl mx-auto w-full">
      <div className="flex items-center space-x-4 mb-12">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight">04. CONNECT</h2>
        <div className="h-[1px] flex-1 bg-outline/20"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="ascii-border p-8 bg-surface/30">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-mono mb-2 opacity-50 uppercase tracking-widest">
                Source_Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-outline/20 p-3 font-mono text-sm focus:outline-none focus:border-primary"
                placeholder="USER@HOST.COM"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono mb-2 opacity-50 uppercase tracking-widest">
                Transmission_Payload
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-background border border-outline/20 p-3 font-mono text-sm h-32 focus:outline-none focus:border-primary"
                placeholder="Type your message here..."
                required
              />
            </div>
            {status && <p className="text-primary text-[10px] font-mono">{status}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-on-primary font-mono text-xs tracking-widest hover:opacity-90 transition-all flex items-center justify-center space-x-2"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              <span>INITIALIZE_TRANSMISSION</span>
            </button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] opacity-40 uppercase tracking-[0.3em] mb-4">Direct_Access</p>
          <a
            href="mailto:marcellolienarta663@gmail.com"
            className="text-xl font-bold hover:text-primary transition-colors border-b border-dashed border-outline/30 hover:border-primary"
          >
            marcellolienarta663@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}
