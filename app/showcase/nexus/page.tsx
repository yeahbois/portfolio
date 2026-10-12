'use client'

import { useState, useRef, useEffect } from 'react'

// Interfaces
interface Message {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  actions?: Array<{ label: string; action: string }>
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  interest: string
  capturedAt: string
}

interface KnowledgeDoc {
  id: string
  title: string
  category: 'Products' | 'Pricing' | 'Policies' | 'FAQs'
  content: string
  status: 'Indexed' | 'Pending'
}

// Initial Seed Knowledge Base
const INITIAL_KNOWLEDGE: KnowledgeDoc[] = [
  { id: 'KB-101', title: 'Enterprise Web Development Services', category: 'Products', content: 'We build custom Next.js web applications, AI chatbots, administrative dashboards, and web automation tools for growing businesses.', status: 'Indexed' },
  { id: 'KB-102', title: 'Service Pricing & Contracts', category: 'Pricing', content: 'Custom web project packages range from $3,000 for boutique landing engines to $15,000+ for enterprise multi-system platforms.', status: 'Indexed' },
  { id: 'KB-103', title: 'SLA & Turnaround Guarantee', category: 'Policies', content: 'All custom software comes with 90 days of complimentary bug fixes, priority SLA support, and database backup routines.', status: 'Indexed' },
  { id: 'KB-104', title: 'AI Integration Capabilities', category: 'FAQs', content: 'Nexus AI connects to your custom company data via vector RAG, supports streaming responses, lead forms, and calendar booking redirects.', status: 'Indexed' },
]

const INITIAL_LEADS: Lead[] = [
  { id: 'LD-901', name: 'Alexander Wright', email: 'alex@wrighttech.io', phone: '+1 415 892 1042', interest: 'Custom ERP & AI System', capturedAt: '2025-02-14 14:22' },
  { id: 'LD-902', name: 'Sophia Chen', email: 'sophia@lumina.co', phone: '+1 650 334 9182', interest: '3D WebGL Restaurant Site', capturedAt: '2025-02-12 09:15' },
]

export default function NexusAIAssistantPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'admin'>('chat')
  const [adminSection, setAdminSection] = useState<'leads' | 'knowledge' | 'analytics' | 'settings'>('leads')

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: 'Hello! I am Nexus, your intelligent business assistant. How can I help you regarding our web engineering services, pricing, or product integration today?',
      timestamp: '10:00 AM',
      actions: [
        { label: 'Explore Service Pricing', action: 'What are your service pricing packages?' },
        { label: 'Schedule Consultation', action: 'I want to speak with your team' },
        { label: 'View Capabilities', action: 'What software can you build for my business?' },
      ],
    },
  ])
  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Knowledge Base State
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeDoc[]>(INITIAL_KNOWLEDGE)
  const [newDoc, setNewDoc] = useState({ title: '', category: 'Products' as const, content: '' })

  // Lead Capture State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', interest: 'Custom Web Engineering' })

  // AI Model Configuration Layer
  const [aiConfig, setAiConfig] = useState({
    provider: 'Infinity AI (Free Model Abstraction)',
    temperature: 0.7,
    ragThreshold: 0.82,
    leadCaptureTrigger: true,
  })

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Abstracted AI Query Processing Layer
  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || inputQuery
    if (!query.trim()) return

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputQuery('')
    setIsTyping(true)

    // Simulate Streaming Infinity AI Model + RAG response
    setTimeout(() => {
      let botResponse = 'I searched our knowledge base for your inquiry. '
      let actions: Array<{ label: string; action: string }> | undefined = undefined

      const lower = query.toLowerCase()
      if (lower.includes('price') || lower.includes('pricing') || lower.includes('cost')) {
        botResponse = 'Our custom development packages range from $3,000 for boutique web applications to $15,000+ for enterprise platforms with automated workflows. Would you like us to prepare a tailored quote for your business?'
        actions = [{ label: 'Get Tailored Quote', action: 'I want a custom quote' }]
      } else if (lower.includes('build') || lower.includes('software') || lower.includes('capabilities')) {
        botResponse = 'We specialize in building 4 core product categories: 1. Financial Accounting Terminals (Ledger), 2. Interactive 3D WebGL Experiences (Savor), 3. AI Business Assistants (Nexus), and 4. Hotel Booking & Automation Platforms (StayFlow).'
      } else if (lower.includes('speak') || lower.includes('quote') || lower.includes('consultation')) {
        botResponse = 'Great! Please share your contact details below so our lead engineering team can reach out to you directly.'
        setShowLeadForm(true)
      } else {
        botResponse = `Thanks for reaching out regarding "${query}". Nexus AI utilizes Infinity model RAG retrieval to scan customer documentation in real time and answer technical questions with precision.`
      }

      const botMsg: Message = {
        id: `b-${Date.now()}`,
        sender: 'assistant',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions,
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  // Handle Lead Form Submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadForm.name || !leadForm.email) return

    const newLeadRecord: Lead = {
      id: `LD-${Math.floor(100 + Math.random() * 900)}`,
      name: leadForm.name,
      email: leadForm.email,
      phone: leadForm.phone || 'N/A',
      interest: leadForm.interest,
      capturedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    }

    setLeads([newLeadRecord, ...leads])
    setShowLeadForm(false)
    setLeadForm({ name: '', email: '', phone: '', interest: 'Custom Web Engineering' })

    setMessages((prev) => [
      ...prev,
      {
        id: `sys-${Date.now()}`,
        sender: 'assistant',
        text: `Thank you, ${newLeadRecord.name}! Your consultation request has been recorded in our Nexus CRM. We will reach out via ${newLeadRecord.email} shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  // Handle Add Knowledge Base Doc
  const handleAddKnowledge = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDoc.title || !newDoc.content) return

    const doc: KnowledgeDoc = {
      id: `KB-${Math.floor(100 + Math.random() * 900)}`,
      title: newDoc.title,
      category: newDoc.category,
      content: newDoc.content,
      status: 'Indexed',
    }

    setKnowledgeBase([doc, ...knowledgeBase])
    setNewDoc({ title: '', category: 'Products', content: '' })
  }

  return (
    <div className="min-h-screen bg-[#090C10] text-[#E6EDF3] font-mono">
      {/* Top Header */}
      <header className="border-b border-[#21262D] bg-[#161B22] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#00D2FF] rounded-full animate-ping"></div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight flex items-center space-x-2">
              <span>NEXUS</span>
              <span className="text-[10px] bg-[#21262D] text-[#00D2FF] px-2 py-0.5 rounded border border-[#00D2FF]/30">
                AI BUSINESS ASSISTANT v3.0
              </span>
            </h1>
            <p className="text-[11px] text-[#8B949E]">Infinity AI Provider & RAG Vector Knowledge Storage</p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex bg-[#0D1117] p-1 rounded border border-[#21262D] text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded transition-all font-bold ${activeTab === 'chat' ? 'bg-[#21262D] text-[#00D2FF]' : 'text-[#8B949E] hover:text-white'}`}
          >
            CUSTOMER CHAT WIDGET
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 rounded transition-all font-bold ${activeTab === 'admin' ? 'bg-[#21262D] text-[#00D2FF]' : 'text-[#8B949E] hover:text-white'}`}
          >
            ADMIN CRM & KNOWLEDGE
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-6 max-w-6xl mx-auto">
        {activeTab === 'chat' ? (
          /* CHAT WIDGET VIEWPORT */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product Positioning */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#161B22] border border-[#21262D] p-6 rounded-xl space-y-4">
                <span className="text-[10px] text-[#00D2FF] font-bold uppercase tracking-widest bg-[#00D2FF]/10 px-2.5 py-1 rounded border border-[#00D2FF]/30">
                  EMBEDDABLE BUSINESS AI
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  "Your website should answer before your team does."
                </h2>
                <p className="text-xs text-[#8B949E] leading-relaxed">
                  Nexus embeds seamlessly into client websites, querying your product knowledge base, capturing leads directly into your database, and automating customer onboarding.
                </p>
              </div>

              {/* Live Assistant Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#161B22] border border-[#21262D] p-4 rounded-xl">
                  <p className="text-[10px] text-[#8B949E] uppercase">TOTAL CONVERSATIONS</p>
                  <p className="text-2xl font-bold text-white mt-1">1,420</p>
                </div>
                <div className="bg-[#161B22] border border-[#21262D] p-4 rounded-xl">
                  <p className="text-[10px] text-[#8B949E] uppercase">LEADS GENERATED</p>
                  <p className="text-2xl font-bold text-[#00D2FF] mt-1">{leads.length + 38}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Chat Interface */}
            <div className="lg:col-span-7 bg-[#161B22] border border-[#21262D] rounded-xl flex flex-col h-[600px] overflow-hidden">
              {/* Chat Window Header */}
              <div className="bg-[#0D1117] px-6 py-4 border-b border-[#21262D] flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <div className="w-2.5 h-2.5 bg-[#00D2FF] rounded-full"></div>
                  <span className="text-xs font-bold text-white">NEXUS AI CONVERSATION SESSION</span>
                </div>
                <span className="text-[10px] text-[#8B949E]">Model: {aiConfig.provider}</span>
              </div>

              {/* Messages Area */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-[10px] text-[#8B949E]">{msg.sender === 'user' ? 'VISITOR' : 'NEXUS AI'}</span>
                      <span className="text-[9px] text-[#8B949E]">{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] p-4 rounded-xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#00D2FF] text-[#090C10] font-bold'
                          : 'bg-[#0D1117] border border-[#21262D] text-[#E6EDF3]'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Quick Suggestion Action Buttons */}
                    {msg.actions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(act.action)}
                            className="text-[10px] bg-[#21262D] hover:bg-[#00D2FF] hover:text-[#090C10] text-[#00D2FF] px-3 py-1.5 rounded border border-[#00D2FF]/30 transition-all font-bold"
                          >
                            {act.label} &rarr;
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center space-x-2 text-xs text-[#8B949E]">
                    <span className="w-2 h-2 bg-[#00D2FF] rounded-full animate-bounce"></span>
                    <span>Nexus AI is querying Infinity model knowledge base...</span>
                  </div>
                )}

                {/* Lead Form Overlay inside Chat */}
                {showLeadForm && (
                  <div className="bg-[#0D1117] border border-[#00D2FF]/40 p-4 rounded-xl space-y-3 mt-4">
                    <p className="text-xs font-bold text-[#00D2FF]">LEAD CAPTURE FORM // SCHEDULE CONSULTATION</p>
                    <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                      <input
                        required
                        type="text"
                        placeholder="Full Name *"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                        className="w-full bg-[#161B22] border border-[#21262D] p-2 rounded text-white outline-none focus:border-[#00D2FF]"
                      />
                      <input
                        required
                        type="email"
                        placeholder="Business Email *"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full bg-[#161B22] border border-[#21262D] p-2 rounded text-white outline-none focus:border-[#00D2FF]"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                        className="w-full bg-[#161B22] border border-[#21262D] p-2 rounded text-white outline-none focus:border-[#00D2FF]"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-[#00D2FF] text-[#090C10] font-bold rounded uppercase tracking-wider hover:bg-white transition-all"
                      >
                        SUBMIT LEAD DETAILS
                      </button>
                    </form>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Query Input Footer */}
              <div className="p-4 bg-[#0D1117] border-t border-[#21262D] flex space-x-3">
                <input
                  type="text"
                  placeholder="Ask Nexus AI about services, pricing, technical stack..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-[#161B22] border border-[#21262D] px-4 py-3 text-xs text-white rounded-lg focus:border-[#00D2FF] outline-none"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-[#00D2FF] text-[#090C10] font-bold px-6 py-3 rounded-lg text-xs hover:bg-white transition-all uppercase"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ADMIN DASHBOARD VIEWPORT */
          <div className="space-y-6">
            {/* Admin Section Tabs */}
            <div className="flex border-b border-[#21262D] space-x-6 text-xs font-bold">
              <button
                onClick={() => setAdminSection('leads')}
                className={`pb-3 border-b-2 uppercase ${adminSection === 'leads' ? 'border-[#00D2FF] text-[#00D2FF]' : 'border-transparent text-[#8B949E]'}`}
              >
                LEADS CRM ({leads.length})
              </button>
              <button
                onClick={() => setAdminSection('knowledge')}
                className={`pb-3 border-b-2 uppercase ${adminSection === 'knowledge' ? 'border-[#00D2FF] text-[#00D2FF]' : 'border-transparent text-[#8B949E]'}`}
              >
                KNOWLEDGE BASE RAG ({knowledgeBase.length})
              </button>
              <button
                onClick={() => setAdminSection('settings')}
                className={`pb-3 border-b-2 uppercase ${adminSection === 'settings' ? 'border-[#00D2FF] text-[#00D2FF]' : 'border-transparent text-[#8B949E]'}`}
              >
                AI MODEL CONFIGURATION
              </button>
            </div>

            {/* ADMIN SECTION 1: LEADS CRM */}
            {adminSection === 'leads' && (
              <div className="bg-[#161B22] border border-[#21262D] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#0D1117] border-b border-[#21262D] text-[#8B949E] text-[10px] uppercase">
                      <th className="p-4">LEAD ID</th>
                      <th className="p-4">NAME</th>
                      <th className="p-4">EMAIL</th>
                      <th className="p-4">PHONE</th>
                      <th className="p-4">PROJECT INTEREST</th>
                      <th className="p-4">CAPTURED AT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#21262D]">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#1C2128]">
                        <td className="p-4 font-bold text-[#00D2FF]">{lead.id}</td>
                        <td className="p-4 font-bold text-white">{lead.name}</td>
                        <td className="p-4 text-[#8B949E]">{lead.email}</td>
                        <td className="p-4 text-[#8B949E]">{lead.phone}</td>
                        <td className="p-4 text-white font-semibold">{lead.interest}</td>
                        <td className="p-4 text-[#8B949E]">{lead.capturedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ADMIN SECTION 2: KNOWLEDGE BASE */}
            {adminSection === 'knowledge' && (
              <div className="space-y-6">
                {/* Add Document Form */}
                <form onSubmit={handleAddKnowledge} className="bg-[#161B22] border border-[#21262D] p-6 rounded-xl space-y-4">
                  <h3 className="text-xs font-bold text-white uppercase">ADD KNOWLEDGE BASE DOCUMENT</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <input
                      required
                      type="text"
                      placeholder="Document Title"
                      value={newDoc.title}
                      onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                      className="bg-[#0D1117] border border-[#21262D] p-3 rounded text-white outline-none focus:border-[#00D2FF]"
                    />
                    <select
                      value={newDoc.category}
                      onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                      className="bg-[#0D1117] border border-[#21262D] p-3 rounded text-white outline-none focus:border-[#00D2FF]"
                    >
                      <option value="Products">Products</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Policies">Policies</option>
                      <option value="FAQs">FAQs</option>
                    </select>
                  </div>
                  <textarea
                    required
                    placeholder="Document Content & Technical Specifications..."
                    rows={3}
                    value={newDoc.content}
                    onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                    className="w-full bg-[#0D1117] border border-[#21262D] p-3 text-xs text-white rounded outline-none focus:border-[#00D2FF]"
                  />
                  <button type="submit" className="px-6 py-2.5 bg-[#00D2FF] text-[#090C10] text-xs font-bold rounded uppercase">
                    INDEX TO RAG STORAGE
                  </button>
                </form>

                {/* Document List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {knowledgeBase.map((doc) => (
                    <div key={doc.id} className="bg-[#161B22] border border-[#21262D] p-4 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#00D2FF]">{doc.id}</span>
                        <span className="text-[10px] bg-[#00D2FF]/10 text-[#00D2FF] px-2 py-0.5 rounded border border-[#00D2FF]/30 font-bold uppercase">
                          {doc.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                      <p className="text-xs text-[#8B949E] leading-relaxed">{doc.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADMIN SECTION 3: AI CONFIGURATION */}
            {adminSection === 'settings' && (
              <div className="bg-[#161B22] border border-[#21262D] p-6 rounded-xl space-y-6 max-w-xl">
                <h3 className="text-xs font-bold text-white uppercase">AI MODEL SERVICE LAYER CONFIGURATION</h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <label className="text-[#8B949E] block mb-1">AI Model Provider</label>
                    <input
                      disabled
                      value={aiConfig.provider}
                      className="w-full bg-[#0D1117] border border-[#21262D] p-3 rounded text-white opacity-70"
                    />
                  </div>
                  <div>
                    <label className="text-[#8B949E] block mb-1">RAG Similarity Vector Threshold ({aiConfig.ragThreshold})</label>
                    <input
                      type="range"
                      min="0.5"
                      max="0.95"
                      step="0.05"
                      value={aiConfig.ragThreshold}
                      onChange={(e) => setAiConfig({ ...aiConfig, ragThreshold: Number(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
