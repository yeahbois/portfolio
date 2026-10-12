'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  id: string
  sender: 'user' | 'assistant' | 'system'
  text: string
  timestamp: string
  toolCall?: {
    name: string
    params: Record<string, string>
  }
  suggestedActions?: string[]
}

interface KnowledgeDoc {
  id: string
  title: string
  category: 'Pricing' | 'Products' | 'Policies' | 'FAQ'
  content: string
  active: boolean
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  interest: string
  date: string
  status: 'New' | 'Contacted' | 'Closed'
}

const INITIAL_KNOWLEDGE: KnowledgeDoc[] = [
  {
    id: 'kb-1',
    title: 'Enterprise Subscription Pricing Tiers',
    category: 'Pricing',
    content: 'Starter Plan: $299/mo includes 5k chats. Pro Plan: $799/mo includes 25k chats + custom RAG vector sync. Enterprise: Custom quote with dedicated SLA and on-premise AI deployment.',
    active: true
  },
  {
    id: 'kb-2',
    title: 'Automated Service & Return Policies',
    category: 'Policies',
    content: '30-day money-back guarantee for all SaaS software deployments. Technical onboarding completed within 48 business hours.',
    active: true
  },
  {
    id: 'kb-3',
    title: 'Nexus Core RAG Architecture Overview',
    category: 'Products',
    content: 'Nexus uses an abstracted AI Service Layer defaulting to the Infinity provider with hybrid vector search and structured function execution.',
    active: true
  }
]

const INITIAL_LEADS: Lead[] = [
  {
    id: 'LD-901',
    name: 'Marcus Brody',
    email: 'm.brody@fintech.co',
    phone: '+1 (555) 234-5678',
    interest: 'Enterprise Custom RAG Sync',
    date: '2025-05-14',
    status: 'New'
  },
  {
    id: 'LD-902',
    name: 'Sarah Chen',
    email: 'sarah@designflow.io',
    phone: '+1 (555) 876-5432',
    interest: 'Pro Tier Chatbot Widget',
    date: '2025-05-13',
    status: 'Contacted'
  }
]

export default function NexusPage() {
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public')
  const [adminTab, setAdminTab] = useState<'analytics' | 'knowledge' | 'leads' | 'settings'>('analytics')

  // Chatbot state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello! I am Nexus, your intelligent business assistant. How can I assist you with our services, pricing, or technical capabilities today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'What are your pricing tiers?',
        'How does the knowledge base work?',
        'I would like a product demo'
      ]
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [leadModalOpen, setLeadModalOpen] = useState(false)

  // Lead Form
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [leadInterest, setLeadInterest] = useState('Product Demo')
  const [leadSuccess, setLeadSuccess] = useState(false)

  // Admin Knowledge state
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>(INITIAL_KNOWLEDGE)
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [newDocTitle, setNewDocTitle] = useState('')
  const [newDocCategory, setNewDocCategory] = useState<'Pricing' | 'Products' | 'Policies' | 'FAQ'>('Products')
  const [newDocContent, setNewDocContent] = useState('')

  const chatEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // AI Response Simulation with Provider Abstraction Layer logic
  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText
    if (!text.trim()) return

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')
    setIsTyping(true)

    // Simulate AI Service Layer processing & structured response
    setTimeout(() => {
      let replyText = ''
      let toolCall = undefined
      let suggestedActions: string[] | undefined = undefined

      const lower = text.toLowerCase()

      if (lower.includes('price') || lower.includes('cost') || lower.includes('tier') || lower.includes('pricing')) {
        replyText = 'Nexus offers three flexible business plans: Starter ($299/mo for 5k chats), Pro ($799/mo with custom RAG vector search), and Enterprise (Custom quotes with dedicated SLAs). Would you like me to connect you with our solutions team?'
        toolCall = {
          name: 'query_knowledge_base',
          params: { query: 'pricing tiers', source: 'kb-1' }
        }
        suggestedActions = ['Book a 1-on-1 Demo', 'Compare Pro vs Enterprise', 'How fast is onboarding?']
      } else if (lower.includes('demo') || lower.includes('contact') || lower.includes('sales')) {
        replyText = 'I can immediately capture your contact details and schedule a personalized walkthrough with our team.'
        toolCall = {
          name: 'trigger_lead_modal',
          params: { intent: 'high_conversion_lead' }
        }
        setLeadModalOpen(true)
      } else if (lower.includes('rag') || lower.includes('knowledge') || lower.includes('document')) {
        replyText = 'Nexus uses a proprietary RAG (Retrieval-Augmented Generation) pipeline. You can upload PDFs, FAQ entries, or sync your website directly from the Admin Dashboard.'
        toolCall = {
          name: 'retrieve_system_specs',
          params: { module: 'RAG_Engine_V2' }
        }
        suggestedActions = ['Try asking about pricing', 'Capture my contact info']
      } else {
        replyText = `Thank you for your inquiry about "${text}". Based on our knowledge base, Nexus automatically automates visitor support, converts leads, and executes tool actions for your team.`
        suggestedActions = ['What are your pricing tiers?', 'Schedule a sales call']
      }

      const assistantMsg: Message = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall,
        suggestedActions
      }

      setIsTyping(false)
      setMessages((prev) => [...prev, assistantMsg])
    }, 1200)
  }

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newLeadRecord: Lead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      name: leadName || 'Anonymous Inquiry',
      email: leadEmail,
      phone: leadPhone || 'N/A',
      interest: leadInterest,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    }

    setLeads([newLeadRecord, ...leads])
    setLeadSuccess(true)
    setTimeout(() => {
      setLeadSuccess(false)
      setLeadModalOpen(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          sender: 'system',
          text: `✅ Lead record #${newLeadRecord.id} successfully created! Our sales team will reach out to ${leadEmail}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1800)
  }

  const handleAddKnowledge = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDocTitle || !newDocContent) return

    const newDoc: KnowledgeDoc = {
      id: `kb-${knowledgeDocs.length + 1}`,
      title: newDocTitle,
      category: newDocCategory,
      content: newDocContent,
      active: true
    }

    setKnowledgeDocs([newDoc, ...knowledgeDocs])
    setNewDocTitle('')
    setNewDocContent('')
  }

  return (
    <div className="min-h-screen bg-[#090D16] text-[#E0E6ED] font-sans">
      {/* Header Bar */}
      <header className="border-b border-cyan-950/80 bg-[#060910] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-mono text-xl font-bold tracking-wider text-cyan-400">
              NEXUS // AI
            </span>
            <span className="text-[10px] font-mono border border-cyan-500/30 text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/40">
              PROVIDER: INFINITY_ABSTRACTION_v3
            </span>
          </div>

          <div className="flex items-center space-x-3 font-mono text-xs">
            <button
              onClick={() => setViewMode('public')}
              className={`px-4 py-2 rounded-xl transition-all border ${
                viewMode === 'public'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              🤖 Live Assistant Widget
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-4 py-2 rounded-xl transition-all border ${
                viewMode === 'admin'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                  : 'text-slate-400 border-transparent hover:text-white'
              }`}
            >
              ⚙️ Admin & Knowledge Console
            </button>
            <Link href="/" className="text-slate-400 hover:text-white text-xs pl-2">
              ← Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* ========================================================
          PUBLIC PRODUCT LANDING & INTERACTIVE ASSISTANT
         ======================================================== */}
      {viewMode === 'public' && (
        <div>
          {/* Pitch Banner */}
          <section className="py-12 border-b border-cyan-950/60 bg-gradient-to-b from-[#0B132B] to-[#090D16] px-6 text-center">
            <div className="max-w-4xl mx-auto space-y-4">
              <span className="font-mono text-xs text-cyan-400 tracking-widest uppercase border border-cyan-500/30 px-3 py-1 rounded-full bg-cyan-950/50">
                ENTERPRISE BUSINESS CONVERSATIONAL AI
              </span>
              <h1 className="text-3xl md:text-5xl font-mono font-bold tracking-tight text-white">
                &quot;Your website should answer before your team does.&quot;
              </h1>
              <p className="text-slate-400 font-mono text-xs md:text-sm max-w-2xl mx-auto">
                Embed Nexus into your digital products. Answers FAQs using your internal knowledge base, executes tool calls, and converts qualified leads 24/7.
              </p>
            </div>
          </section>

          {/* Interactive Assistant Terminal Grid */}
          <section className="py-12 px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Widget Sidebar Info */}
              <div className="lg:col-span-4 space-y-6 font-mono text-xs">
                <div className="border border-cyan-900/60 bg-[#0C1222] p-6 rounded-2xl space-y-4">
                  <div className="flex items-center space-x-2 text-cyan-400 font-bold border-b border-cyan-950 pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span>ACTIVE AGENT STATUS</span>
                  </div>

                  <div className="space-y-2 text-slate-300">
                    <p><strong className="text-slate-400">Model:</strong> Infinity AI (Abstracted)</p>
                    <p><strong className="text-slate-400">Retrieval:</strong> Hybrid Vector + RAG Sync</p>
                    <p><strong className="text-slate-400">Response Latency:</strong> ~120ms</p>
                    <p><strong className="text-slate-400">Leads Captured:</strong> {leads.length} records</p>
                  </div>

                  <button
                    onClick={() => setLeadModalOpen(true)}
                    className="w-full py-3 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded-xl font-bold hover:bg-cyan-500/30 transition-all uppercase tracking-wider"
                  >
                    + Request Product Demo
                  </button>
                </div>

                <div className="border border-slate-800 bg-[#0C1222] p-6 rounded-2xl space-y-3">
                  <p className="text-slate-400 uppercase font-bold text-[10px]">Indexed Knowledge Sources:</p>
                  <ul className="space-y-2 text-slate-300">
                    {knowledgeDocs.map((doc) => (
                      <li key={doc.id} className="flex items-center space-x-2">
                        <span className="text-cyan-400">✓</span>
                        <span className="truncate">{doc.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Main Chat Terminal */}
              <div className="lg:col-span-8 border border-cyan-900/60 bg-[#060910] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[600px]">
                {/* Terminal Header */}
                <div className="bg-[#0C1222] border-b border-cyan-950 p-4 flex justify-between items-center font-mono text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="text-slate-300 font-bold ml-2">nexus-assistant-widget.exe</span>
                  </div>

                  <button
                    onClick={() =>
                      setMessages([
                        {
                          id: 'msg-reset',
                          sender: 'assistant',
                          text: 'Conversation cleared. How else may I assist your business?',
                          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        }
                      ])
                    }
                    className="text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    Clear History
                  </button>
                </div>

                {/* Messages Feed */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-xs">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : msg.sender === 'system' ? 'items-center' : 'items-start'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1 text-[10px] text-slate-500">
                        <span>{msg.sender.toUpperCase()}</span>
                        <span>•</span>
                        <span>{msg.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-xl p-4 rounded-2xl border leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-cyan-950/60 border-cyan-800/80 text-cyan-100 rounded-tr-none'
                            : msg.sender === 'system'
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300 w-full text-center font-bold'
                            : 'bg-slate-900 border-slate-800 text-slate-200 rounded-tl-none'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {/* Tool Call Badge */}
                        {msg.toolCall && (
                          <div className="mt-3 pt-2 border-t border-cyan-900/40 font-mono text-[10px] text-cyan-400 flex items-center space-x-2">
                            <span className="bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded">
                              ⚡ TOOL CALL: {msg.toolCall.name}()
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Suggested Actions */}
                      {msg.suggestedActions && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {msg.suggestedActions.map((act) => (
                            <button
                              key={act}
                              onClick={() => handleSendMessage(act)}
                              className="bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 px-3 py-1.5 rounded-full font-mono text-[11px] transition-all"
                            >
                              💬 {act}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs">
                      <span className="animate-pulse">⚡ Nexus AI is generating response...</span>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Chat Input */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSendMessage()
                  }}
                  className="bg-[#0C1222] border-t border-cyan-950 p-4 flex gap-3"
                >
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Ask about pricing, features, or RAG architecture..."
                    className="flex-1 bg-slate-900 border border-cyan-900/60 rounded-xl px-4 py-3 text-xs font-mono text-white outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cyan-500 text-slate-950 font-mono text-xs font-bold rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-wider"
                  >
                    Send →
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ========================================================
          ADMIN CONSOLE & KNOWLEDGE MANAGEMENT
         ======================================================== */}
      {viewMode === 'admin' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block">
                NEXUS ADMIN CONSOLE
              </span>
              <h1 className="text-2xl font-bold font-mono text-white">Knowledge Base & Analytics</h1>
            </div>

            <div className="flex gap-2 font-mono text-xs bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setAdminTab('analytics')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  adminTab === 'analytics' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                📊 Analytics & Conversion
              </button>
              <button
                onClick={() => setAdminTab('knowledge')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  adminTab === 'knowledge' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                📚 Knowledge Manager ({knowledgeDocs.length})
              </button>
              <button
                onClick={() => setAdminTab('leads')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  adminTab === 'leads' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                🎯 Captured Leads ({leads.length})
              </button>
            </div>
          </div>

          {/* ANALYTICS TAB */}
          {adminTab === 'analytics' && (
            <div className="space-y-8 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 uppercase block mb-1">Total Conversations</span>
                  <span className="text-3xl font-bold text-cyan-400">1,420</span>
                  <span className="text-[10px] text-slate-500 block mt-2">↑ +24% this week</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 uppercase block mb-1">Leads Captured</span>
                  <span className="text-3xl font-bold text-emerald-400">{leads.length} Contacts</span>
                  <span className="text-[10px] text-emerald-400 block mt-2">High Intent Qualified</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 uppercase block mb-1">Conversion Rate</span>
                  <span className="text-3xl font-bold text-amber-400">18.4%</span>
                  <span className="text-[10px] text-slate-500 block mt-2">Target &gt; 15%</span>
                </div>
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 uppercase block mb-1">RAG Retrieval Precision</span>
                  <span className="text-3xl font-bold text-indigo-400">99.2%</span>
                  <span className="text-[10px] text-slate-500 block mt-2">Infinity Vector Engine</span>
                </div>
              </div>
            </div>
          )}

          {/* KNOWLEDGE BASE TAB */}
          {adminTab === 'knowledge' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-mono text-xs">
              {/* Add Knowledge Form */}
              <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white uppercase">Add Knowledge Document</h3>
                <form onSubmit={handleAddKnowledge} className="space-y-4">
                  <div>
                    <label className="block text-slate-400 mb-1">DOCUMENT TITLE</label>
                    <input
                      type="text"
                      required
                      value={newDocTitle}
                      onChange={(e) => setNewDocTitle(e.target.value)}
                      placeholder="e.g. 2025 SLA & Support Policy"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">CATEGORY</label>
                    <select
                      value={newDocCategory}
                      onChange={(e) => setNewDocCategory(e.target.value as any)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                    >
                      <option value="Pricing">Pricing</option>
                      <option value="Products">Products</option>
                      <option value="Policies">Policies</option>
                      <option value="FAQ">FAQ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1">DOCUMENT CONTENT (FOR VECTOR EMBEDDING)</label>
                    <textarea
                      rows={5}
                      required
                      value={newDocContent}
                      onChange={(e) => setNewDocContent(e.target.value)}
                      placeholder="Paste exact business policy or product description here..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400 leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-cyan-400 transition-all"
                  >
                    + Embed into Vector Knowledge Base
                  </button>
                </form>
              </div>

              {/* Documents List */}
              <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                <h3 className="text-base font-bold text-white uppercase">Active Indexed Knowledge Docs</h3>
                <div className="space-y-4">
                  {knowledgeDocs.map((doc) => (
                    <div key={doc.id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-cyan-400">{doc.title}</span>
                        <span className="bg-cyan-950 border border-cyan-800 text-cyan-300 px-2 py-0.5 rounded text-[10px]">
                          {doc.category}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">{doc.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LEADS CRM TAB */}
          {adminTab === 'leads' && (
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl font-mono text-xs space-y-4">
              <h3 className="text-base font-bold text-white uppercase">Captured Lead Database</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-3">ID</th>
                      <th className="p-3">Lead Name</th>
                      <th className="p-3">Email & Phone</th>
                      <th className="p-3">Interest Area</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leads.map((ld) => (
                      <tr key={ld.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-cyan-400">{ld.id}</td>
                        <td className="p-3 text-white font-bold">{ld.name}</td>
                        <td className="p-3">
                          <p className="text-slate-200">{ld.email}</p>
                          <p className="text-[10px] text-slate-500">{ld.phone}</p>
                        </td>
                        <td className="p-3 text-slate-300">{ld.interest}</td>
                        <td className="p-3 text-slate-400">{ld.date}</td>
                        <td className="p-3">
                          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            {ld.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Lead Capture Modal */}
      {leadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0C1222] border border-cyan-500/40 rounded-2xl max-w-md w-full p-8 relative space-y-6 shadow-2xl font-mono text-xs">
            <button
              onClick={() => setLeadModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <div>
              <span className="text-cyan-400 uppercase tracking-widest text-[10px] block mb-1">
                HIGH INTENT CONVERSION
              </span>
              <h3 className="text-xl font-bold text-white">Connect with Nexus Sales</h3>
            </div>

            {leadSuccess ? (
              <div className="p-6 bg-emerald-950/50 border border-emerald-500/40 rounded-xl text-center space-y-2">
                <span className="text-3xl">✨</span>
                <p className="text-emerald-400 font-bold text-sm">Details Received!</p>
                <p className="text-slate-300 text-[11px]">
                  Our technical advisor will reach out to {leadEmail} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-400 mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Marcus Brody"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">WORK EMAIL</label>
                  <input
                    type="email"
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    placeholder="marcus@company.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">PHONE NUMBER (OPTIONAL)</label>
                  <input
                    type="tel"
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-cyan-400 transition-all text-xs shadow-lg shadow-cyan-500/20"
                >
                  Submit & Request Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center font-mono text-xs text-slate-500">
        <p>NEXUS AI Business System • Crafted for Client Showcase by Marcello Lienarta</p>
      </footer>
    </div>
  )
}
