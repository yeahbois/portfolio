'use client'

import { useState, useRef, useEffect } from 'react'

// antislop active: during (session override).
// Reading this as: Technical AI Business Integration and Knowledge Retrieval System for B2B enterprises, in a restrained minimal and futuristic command console style, dial ENERGY 2 / RHYTHM 2 / MOTION 1.

interface Message {
  id: string
  sender: 'user' | 'assistant' | 'system'
  text: string
  timestamp: string
  toolCall?: {
    toolName: string
    query: string
    resultSummary: string
  }
  suggestions?: Array<{ label: string; action: string }>
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  company: string
  interest: string
  capturedAt: string
  score: 'High' | 'Medium' | 'Qualified'
}

interface KnowledgeDoc {
  id: string
  title: string
  category: 'Products' | 'Pricing' | 'Policies' | 'Technical Specs' | 'FAQs'
  content: string
  chunksCount: number
  similarityThreshold: number
  status: 'Indexed' | 'Draft'
  enabled: boolean
}

// Initial Realistic Seed Knowledge Base for Business Operations
const INITIAL_KNOWLEDGE: KnowledgeDoc[] = [
  {
    id: 'KB-201',
    title: 'Custom Web Application Architecture & Pricing',
    category: 'Pricing',
    content: 'Our core development tiers range from $3,500 for bespoke WebGL marketing engines to $15,000+ for enterprise multi-tenant automation portals. Every deliverable includes 90 days of dedicated maintenance, automated database backups, and custom admin dashboards.',
    chunksCount: 6,
    similarityThreshold: 0.88,
    status: 'Indexed',
    enabled: true,
  },
  {
    id: 'KB-202',
    title: 'Engineering Capabilities: 4 Core Specialties',
    category: 'Products',
    content: 'We engineer 4 primary commercial software types: 1. Ledger Financial Accounting Terminal (cash flow auditing, invoice calculations), 2. Savor 3D WebGL Restaurant Experience, 3. Nexus AI Business Assistant with RAG knowledge integration, and 4. StayFlow Hotel Booking & Workflow Automation Platform.',
    chunksCount: 8,
    similarityThreshold: 0.92,
    status: 'Indexed',
    enabled: true,
  },
  {
    id: 'KB-203',
    title: 'SLA Guarantees & Code Ownership Policy',
    category: 'Policies',
    content: 'All clients retain 100% intellectual property and source code ownership upon project completion. We provide a 99.9% uptime deployment guarantee via cloud serverless hosting and Supabase Postgres infrastructure.',
    chunksCount: 4,
    similarityThreshold: 0.85,
    status: 'Indexed',
    enabled: true,
  },
  {
    id: 'KB-204',
    title: 'Infinity AI Provider Abstraction Layer',
    category: 'Technical Specs',
    content: 'Nexus AI abstracts underlying model providers behind a unified AI Service interface. By default, it operates on the Infinity Model Provider (infinity-instruct-v1) and can be hot-swapped to Claude 3.5 Sonnet or OpenAI GPT-4o without UI modifications.',
    chunksCount: 5,
    similarityThreshold: 0.90,
    status: 'Indexed',
    enabled: true,
  },
]

const INITIAL_LEADS: Lead[] = [
  {
    id: 'LD-401',
    name: 'Alexander Wright',
    email: 'alex.wright@wrightlogistics.com',
    phone: '+1 415 892 1042',
    company: 'Wright Logistics Corp',
    interest: 'Custom Accounting Dashboard & Workflow Sync',
    capturedAt: '2025-03-14 16:22',
    score: 'High',
  },
  {
    id: 'LD-402',
    name: 'Sophia Chen',
    email: 'sophia@luminadesign.co',
    phone: '+1 650 334 9182',
    company: 'Lumina Creative Studio',
    interest: '3D WebGL Brand Experience & Interactive Showcase',
    capturedAt: '2025-03-12 10:15',
    score: 'Qualified',
  },
  {
    id: 'LD-403',
    name: 'Julian Henderson',
    email: 'j.henderson@crestviewhospitality.net',
    phone: '+1 312 555 0188',
    company: 'Crestview Boutique Hotels',
    interest: 'Automated Hotel Reservation Workflow Platform',
    capturedAt: '2025-03-10 14:05',
    score: 'High',
  },
]

export default function NexusShowcasePage() {
  const [activeView, setActiveView] = useState<'chat' | 'admin'>('chat')
  const [adminTab, setAdminTab] = useState<'leads' | 'knowledge' | 'analytics' | 'settings'>('leads')

  // Abstracted AI Provider Configuration
  const [aiConfig, setAiConfig] = useState({
    provider: 'Infinity AI (Free Model: infinity-instruct-v1)',
    temperature: 0.65,
    vectorSimilarityThreshold: 0.85,
    streamingSpeedMs: 25,
    leadCaptureTriggerEnabled: true,
  })

  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Welcome to Nexus. I am your automated business assistant connected to our company knowledge base. You can ask about our custom web software capabilities, pricing tiers, or implementation timelines. Notice: Simulation mode. No AI API yet, No database connection yet.',
      timestamp: '09:00 AM',
      suggestions: [
        { label: 'View Service Pricing Packages', action: 'What are your custom software development pricing packages?' },
        { label: 'Check Engineering Capabilities', action: 'What types of software systems can your team build?' },
        { label: 'Consult with Engineering', action: 'I want to schedule an engineering consultation for my business' },
      ],
    },
  ])

  const [inputQuery, setInputQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Knowledge Base State
  const [knowledgeBase, setKnowledgeBase] = useState<KnowledgeDoc[]>(INITIAL_KNOWLEDGE)
  const [kbSearchTerm, setKbSearchTerm] = useState('')
  const [newDoc, setNewDoc] = useState({
    title: '',
    category: 'Products' as const,
    content: '',
  })

  // Lead CRM State
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS)
  const [showInlineLeadCard, setShowInlineLeadCard] = useState(false)
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: 'Custom Software Architecture',
  })

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Abstracted AI Query Handler (Simulates Model Provider Retrieval)
  const handleSendMessage = (overrideQuery?: string) => {
    const query = overrideQuery || inputQuery
    if (!query.trim()) return

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!overrideQuery) setInputQuery('')
    setIsTyping(true)

    const lower = query.toLowerCase()

    // Determine Simulated RAG Knowledge Match
    let matchedDoc: KnowledgeDoc | undefined
    let answerText = ''
    let triggerLead = false
    let toolName = 'knowledge_vector_search'
    let toolQuery = query

    if (lower.includes('price') || lower.includes('cost') || lower.includes('package') || lower.includes('tier')) {
      matchedDoc = knowledgeBase.find((k) => k.category === 'Pricing')
      answerText = matchedDoc
        ? `${matchedDoc.content} We can tailor packages specifically for your company's operational scope.`
        : 'Our development packages range from $3,500 to $15,000+ depending on full-stack scope and workflow automation needs.'
      triggerLead = true
    } else if (lower.includes('build') || lower.includes('system') || lower.includes('capabilities') || lower.includes('software')) {
      matchedDoc = knowledgeBase.find((k) => k.category === 'Products')
      answerText = matchedDoc
        ? `${matchedDoc.content} Each project is engineered with high-density interfaces, complete component architectures, and responsive design.`
        : 'We specialize in building custom web applications, financial analytics terminals, 3D WebGL experiences, and business automation platforms.'
    } else if (lower.includes('consult') || lower.includes('quote') || lower.includes('talk') || lower.includes('hire') || lower.includes('contact')) {
      answerText = 'I would be happy to connect you with our lead engineering team. Please submit your business contact details in the consultation card below.'
      triggerLead = true
    } else {
      answerText = `Regarding "${query}", our automated service query engine matched relevant technical parameters. All projects are built with TypeScript, Next.js, and Supabase Postgres.`
    }

    // Simulate RAG Latency and Model Streaming
    setTimeout(() => {
      const assistantMsg: Message = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        toolCall: {
          toolName,
          query: toolQuery,
          resultSummary: matchedDoc
            ? `Matched Doc "${matchedDoc.title}" (Score: ${(matchedDoc.similarityThreshold).toFixed(2)})`
            : 'Matched general service documentation (Score: 0.82)',
        },
        suggestions: triggerLead
          ? [{ label: 'Schedule Engineering Call', action: 'I would like to schedule a project scoping call' }]
          : [
              { label: 'Ask About Service Pricing', action: 'What are your custom software development pricing packages?' },
              { label: 'Ask About Architecture SLA', action: 'What is your intellectual property ownership and SLA policy?' },
            ],
      }

      setMessages((prev) => [...prev, assistantMsg])
      setIsTyping(false)

      if (triggerLead && aiConfig.leadCaptureTriggerEnabled) {
        setShowInlineLeadCard(true)
      }
    }, 700)
  }

  // Handle Lead Form Submission
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadFormData.name || !leadFormData.email) return

    const newLeadRecord: Lead = {
      id: `LD-${Math.floor(400 + Math.random() * 200)}`,
      name: leadFormData.name,
      email: leadFormData.email,
      phone: leadFormData.phone || 'N/A',
      company: leadFormData.company || 'Private Enterprise',
      interest: leadFormData.requirements,
      capturedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      score: 'High',
    }

    setLeads([newLeadRecord, ...leads])
    setShowInlineLeadCard(false)
    setLeadFormData({ name: '', email: '', phone: '', company: '', requirements: 'Custom Software Architecture' })

    const confirmationMsg: Message = {
      id: `sys-${Date.now()}`,
      sender: 'system',
      text: `Lead capture successful for ${newLeadRecord.name} (${newLeadRecord.company}). Record stored in CRM pipeline. Note: Simulation mode. No AI API yet, No database connection yet.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, confirmationMsg])
  }

  // Handle Add Knowledge Doc
  const handleAddKnowledgeDoc = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDoc.title || !newDoc.content) return

    const doc: KnowledgeDoc = {
      id: `KB-${Math.floor(205 + Math.random() * 95)}`,
      title: newDoc.title,
      category: newDoc.category,
      content: newDoc.content,
      chunksCount: Math.ceil(newDoc.content.length / 180),
      similarityThreshold: 0.88,
      status: 'Indexed',
      enabled: true,
    }

    setKnowledgeBase([doc, ...knowledgeBase])
    setNewDoc({ title: '', category: 'Products', content: '' })
  }

  // Copy Message Text
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Clear Chat Conversation
  const handleClearChat = () => {
    setMessages([
      {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Conversation cleared. How can I assist you regarding our engineering services or technical systems today?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          { label: 'Explore Service Pricing', action: 'What are your custom software development pricing packages?' },
          { label: 'Engineering Capabilities', action: 'What types of software systems can your team build?' },
        ],
      },
    ])
    setShowInlineLeadCard(false)
  }

  // Filtered Knowledge Base
  const filteredKb = knowledgeBase.filter(
    (k) =>
      k.title.toLowerCase().includes(kbSearchTerm.toLowerCase()) ||
      k.content.toLowerCase().includes(kbSearchTerm.toLowerCase()) ||
      k.category.toLowerCase().includes(kbSearchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0A0D14] text-[#E6EDF3] font-mono selection:bg-[#00D2FF] selection:text-[#0A0D14]">
      {/* Top Header Navigation */}
      <header className="border-b border-[#1E2638] bg-[#0E131F] px-6 lg:px-12 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold tracking-[0.2em] text-[#00D2FF] uppercase">
              NEXUS
            </span>
            <span className="hidden sm:inline-block text-xs text-[#8B98A5]">
              / AI Business Assistant & Knowledge RAG System
            </span>
            <span className="text-[10px] text-[#00D2FF] bg-[#00D2FF]/10 border border-[#00D2FF]/30 px-2.5 py-0.5 rounded font-bold uppercase">
              Notice: No AI API yet, No database connection yet
            </span>
          </div>

          {/* Perspective View Switcher */}
          <div className="flex bg-[#07090F] p-1 border border-[#1E2638] text-xs">
            <button
              onClick={() => setActiveView('chat')}
              className={`px-4 py-2 font-bold transition-all ${
                activeView === 'chat'
                  ? 'bg-[#00D2FF] text-[#07090F]'
                  : 'text-[#8B98A5] hover:text-white'
              }`}
            >
              CUSTOMER CHAT WIDGET
            </button>
            <button
              onClick={() => setActiveView('admin')}
              className={`px-4 py-2 font-bold transition-all ${
                activeView === 'admin'
                  ? 'bg-[#00D2FF] text-[#07090F]'
                  : 'text-[#8B98A5] hover:text-white'
              }`}
            >
              ADMIN CRM & KNOWLEDGE
            </button>
          </div>
        </div>
      </header>

      {/* VIEWPORT 1: CUSTOMER CHAT WIDGET */}
      {activeView === 'chat' && (
        <main className="p-6 lg:p-12 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product Positioning & Live Metrics */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0E131F] border border-[#1E2638] p-6 space-y-4">
                <span className="text-[10px] text-[#00D2FF] font-bold uppercase tracking-widest bg-[#00D2FF]/10 px-2.5 py-1 border border-[#00D2FF]/30 inline-block">
                  PRACTICAL BUSINESS INTEGRATION
                </span>
                <h2 className="text-2xl font-bold text-white leading-tight">
                  Your website should answer before your team does.
                </h2>
                <p className="text-xs text-[#8B98A5] leading-relaxed">
                  Nexus embeds seamlessly into commercial web applications. It answers queries from your verified documentation, triggers lead capture during conversations, and operates on an abstracted model provider layer.
                </p>

                <div className="p-3 bg-[#07090F] border border-[#1E2638] space-y-1.5 text-[11px]">
                  <p className="text-white font-bold">Active Architecture Stack:</p>
                  <p className="text-[#8B98A5]">• Provider Layer: <span className="text-[#00D2FF]">{aiConfig.provider}</span></p>
                  <p className="text-[#8B98A5]">• Knowledge Sources: <span className="text-white">{knowledgeBase.length} Indexed Modules</span></p>
                  <p className="text-[#8B98A5]">• Status: <span className="text-[#10B981]">Preview State [No AI API yet, No DB yet]</span></p>
                </div>
              </div>

              {/* Live Conversational Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0E131F] border border-[#1E2638] p-4">
                  <p className="text-[10px] text-[#8B98A5] uppercase">TOTAL CONVERSATIONS</p>
                  <p className="text-2xl font-bold text-white mt-1">1,840</p>
                  <p className="text-[10px] text-[#10B981] mt-1">+24% vs previous month</p>
                </div>
                <div className="bg-[#0E131F] border border-[#1E2638] p-4">
                  <p className="text-[10px] text-[#8B98A5] uppercase">QUALIFIED LEADS</p>
                  <p className="text-2xl font-bold text-[#00D2FF] mt-1">{leads.length + 42}</p>
                  <p className="text-[10px] text-[#8B98A5] mt-1">18.4% Conversion Rate</p>
                </div>
              </div>

              {/* Model Provider Abstraction Notice */}
              <div className="bg-[#0E131F] border border-[#1E2638] p-4 text-xs text-[#8B98A5] space-y-1">
                <p className="text-white font-bold text-[11px] uppercase">Service Layer Abstraction:</p>
                <p className="text-[11px] leading-relaxed">
                  Model requests flow through: <code>AI Provider → AI Service → Client Application</code>. The default Infinity model can be switched in settings without rewriting UI code.
                </p>
              </div>
            </div>

            {/* Right Column: Distinctive Non-ChatGPT Chat Console */}
            <div className="lg:col-span-7 bg-[#0E131F] border border-[#1E2638] flex flex-col h-[700px] overflow-hidden">
              {/* Chat Console Top Bar */}
              <div className="bg-[#07090F] px-6 py-4 border-b border-[#1E2638] flex justify-between items-center text-xs">
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 bg-[#00D2FF] rounded-full"></span>
                  <span className="font-bold text-white">NEXUS CONVERSATION STREAM</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleClearChat}
                    className="text-[#8B98A5] hover:text-[#EF4444] text-[11px] uppercase transition-colors"
                  >
                    Clear Chat
                  </button>
                  <span className="text-[10px] text-[#8B98A5] border border-[#1E2638] px-2 py-0.5">
                    Stream Speed: {aiConfig.streamingSpeedMs}ms
                  </span>
                </div>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center space-x-2 mb-1.5 text-[10px] text-[#8B98A5]">
                      <span className="font-bold uppercase">
                        {msg.sender === 'user' ? 'VISITOR' : msg.sender === 'system' ? 'SYSTEM' : 'NEXUS AI'}
                      </span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[88%] p-4 text-xs leading-relaxed border ${
                        msg.sender === 'user'
                          ? 'bg-[#00D2FF] text-[#07090F] border-[#00D2FF] font-medium'
                          : msg.sender === 'system'
                          ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                          : 'bg-[#07090F] text-[#E6EDF3] border-[#1E2638]'
                      }`}
                    >
                      {/* Tool Call / RAG Diagnostic Info */}
                      {msg.toolCall && (
                        <div className="mb-3 p-2 bg-[#121622] border border-[#1E2638] text-[10px] text-[#00D2FF] space-y-0.5">
                          <p className="font-bold uppercase">TOOL CALL: {msg.toolCall.toolName}</p>
                          <p className="text-[#8B98A5]">{msg.toolCall.resultSummary}</p>
                        </div>
                      )}

                      <p>{msg.text}</p>

                      {/* Message Actions */}
                      {msg.sender === 'assistant' && (
                        <div className="mt-3 pt-2 border-t border-[#1E2638] flex justify-end items-center space-x-3 text-[10px]">
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="text-[#8B98A5] hover:text-white uppercase"
                          >
                            {copiedId === msg.id ? 'Copied ✓' : 'Copy'}
                          </button>
                          <button
                            onClick={() => handleSendMessage(msg.text)}
                            className="text-[#8B98A5] hover:text-[#00D2FF] uppercase"
                          >
                            Regenerate
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Contextual Suggestion Pills */}
                    {msg.suggestions && msg.suggestions.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {msg.suggestions.map((sug, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(sug.action)}
                            className="text-[10px] bg-[#121622] hover:bg-[#00D2FF] hover:text-[#07090F] text-[#00D2FF] px-3 py-1.5 border border-[#00D2FF]/30 transition-all font-bold uppercase"
                          >
                            {sug.label} &gt;
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center space-x-2 text-xs text-[#00D2FF]">
                    <span className="w-2 h-2 bg-[#00D2FF] rounded-full animate-ping"></span>
                    <span>Retrieving verified documentation and streaming tokens...</span>
                  </div>
                )}

                {/* Inline Lead Capture Trigger Card */}
                {showInlineLeadCard && (
                  <div className="bg-[#07090F] border border-[#00D2FF]/50 p-5 space-y-3 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-[#00D2FF] font-bold uppercase tracking-wider">
                        INTENT DETECTED: SCHEDULE ENGINEERING CONSULTATION
                      </span>
                      <button
                        onClick={() => setShowInlineLeadCard(false)}
                        className="text-[#8B98A5] hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="text-xs text-[#8B98A5]">
                      Would you like our engineering team to review your technical requirements? Submit your contact coordinates below:
                    </p>

                    <form onSubmit={handleLeadSubmit} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          required
                          type="text"
                          placeholder="Your Name *"
                          value={leadFormData.name}
                          onChange={(e) => setLeadFormData({ ...leadFormData, name: e.target.value })}
                          className="bg-[#0E131F] border border-[#1E2638] p-2.5 text-white outline-none focus:border-[#00D2FF]"
                        />
                        <input
                          required
                          type="email"
                          placeholder="Business Email *"
                          value={leadFormData.email}
                          onChange={(e) => setLeadFormData({ ...leadFormData, email: e.target.value })}
                          className="bg-[#0E131F] border border-[#1E2638] p-2.5 text-white outline-none focus:border-[#00D2FF]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={leadFormData.phone}
                          onChange={(e) => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                          className="bg-[#0E131F] border border-[#1E2638] p-2.5 text-white outline-none focus:border-[#00D2FF]"
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={leadFormData.company}
                          onChange={(e) => setLeadFormData({ ...leadFormData, company: e.target.value })}
                          className="bg-[#0E131F] border border-[#1E2638] p-2.5 text-white outline-none focus:border-[#00D2FF]"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#00D2FF] text-[#07090F] font-bold uppercase tracking-wider text-xs hover:bg-white transition-all"
                      >
                        Capture Lead into CRM Pipeline
                      </button>
                    </form>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Footer */}
              <div className="p-4 bg-[#07090F] border-t border-[#1E2638] flex space-x-3">
                <input
                  type="text"
                  placeholder="Ask Nexus about pricing, 3D WebGL, hotel automation, or custom systems..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 bg-[#0E131F] border border-[#1E2638] px-4 py-3 text-xs text-white outline-none focus:border-[#00D2FF]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-[#00D2FF] text-[#07090F] font-bold px-6 py-3 text-xs uppercase tracking-wider hover:bg-white transition-all"
                >
                  Query AI
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* VIEWPORT 2: ADMIN CRM, KNOWLEDGE & MODEL SETTINGS */}
      {activeView === 'admin' && (
        <main className="p-6 lg:p-12 max-w-7xl mx-auto space-y-8 font-mono">
          {/* Admin Navigation Subtabs */}
          <div className="flex flex-wrap border-b border-[#1E2638] gap-6 text-xs font-bold">
            <button
              onClick={() => setAdminTab('leads')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'leads'
                  ? 'border-[#00D2FF] text-[#00D2FF]'
                  : 'border-transparent text-[#8B98A5] hover:text-white'
              }`}
            >
              CAPTURED LEADS PIPELINE ({leads.length})
            </button>
            <button
              onClick={() => setAdminTab('knowledge')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'knowledge'
                  ? 'border-[#00D2FF] text-[#00D2FF]'
                  : 'border-transparent text-[#8B98A5] hover:text-white'
              }`}
            >
              KNOWLEDGE BASE RAG ({knowledgeBase.length})
            </button>
            <button
              onClick={() => setAdminTab('analytics')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'analytics'
                  ? 'border-[#00D2FF] text-[#00D2FF]'
                  : 'border-transparent text-[#8B98A5] hover:text-white'
              }`}
            >
              CONVERSATIONAL ANALYTICS
            </button>
            <button
              onClick={() => setAdminTab('settings')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'settings'
                  ? 'border-[#00D2FF] text-[#00D2FF]'
                  : 'border-transparent text-[#8B98A5] hover:text-white'
              }`}
            >
              AI MODEL SERVICE LAYER CONFIG
            </button>
          </div>

          {/* ADMIN TAB 1: LEADS CRM TABLE */}
          {adminTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-[#0E131F] border border-[#1E2638] p-4">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase">
                    INCOMING BUSINESS LEADS PIPELINE
                  </h3>
                  <p className="text-[11px] text-[#8B98A5]">
                    Captured by Nexus during real customer queries
                  </p>
                </div>
                <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-3 py-1 font-bold uppercase">
                  CRM Auto-Sync Active
                </span>
              </div>

              <div className="bg-[#0E131F] border border-[#1E2638] overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#07090F] border-b border-[#1E2638] text-[#8B98A5] text-[10px] uppercase">
                      <th className="p-4">LEAD ID</th>
                      <th className="p-4">NAME & COMPANY</th>
                      <th className="p-4">CONTACT CHANNELS</th>
                      <th className="p-4">DETECTED PROJECT INTEREST</th>
                      <th className="p-4">TIMESTAMP</th>
                      <th className="p-4 text-center">QUALIFICATION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2638]">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-[#141A29] transition-colors">
                        <td className="p-4 font-bold text-[#00D2FF]">{lead.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-white">{lead.name}</p>
                          <p className="text-[10px] text-[#8B98A5]">{lead.company}</p>
                        </td>
                        <td className="p-4">
                          <p className="text-white">{lead.email}</p>
                          <p className="text-[10px] text-[#8B98A5]">{lead.phone}</p>
                        </td>
                        <td className="p-4 text-white font-medium">{lead.interest}</td>
                        <td className="p-4 text-[#8B98A5]">{lead.capturedAt}</td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                              lead.score === 'High'
                                ? 'bg-[#00D2FF]/20 text-[#00D2FF] border border-[#00D2FF]/30'
                                : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                            }`}
                          >
                            {lead.score}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN TAB 2: KNOWLEDGE BASE RAG */}
          {adminTab === 'knowledge' && (
            <div className="space-y-8">
              {/* Add Knowledge Doc Form */}
              <form onSubmit={handleAddKnowledgeDoc} className="bg-[#0E131F] border border-[#1E2638] p-6 space-y-4">
                <h3 className="text-xs font-bold text-[#00D2FF] uppercase">
                  ADD KNOWLEDGE SOURCE FOR VECTOR RAG RETRIEVAL
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div className="sm:col-span-2">
                    <label className="text-[#8B98A5] block mb-1">DOCUMENT TITLE</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Enterprise Security & SSO Specifications"
                      value={newDoc.title}
                      onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                      className="w-full bg-[#07090F] border border-[#1E2638] p-3 text-white outline-none focus:border-[#00D2FF]"
                    />
                  </div>

                  <div>
                    <label className="text-[#8B98A5] block mb-1">CATEGORY</label>
                    <select
                      value={newDoc.category}
                      onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value as any })}
                      className="w-full bg-[#07090F] border border-[#1E2638] p-3 text-white outline-none focus:border-[#00D2FF]"
                    >
                      <option value="Products">Products</option>
                      <option value="Pricing">Pricing</option>
                      <option value="Policies">Policies</option>
                      <option value="Technical Specs">Technical Specs</option>
                      <option value="FAQs">FAQs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[#8B98A5] block mb-1">DOCUMENT BODY CONTENT</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Enter factual documentation, capabilities, or pricing structures for Nexus AI to cite..."
                    value={newDoc.content}
                    onChange={(e) => setNewDoc({ ...newDoc, content: e.target.value })}
                    className="w-full bg-[#07090F] border border-[#1E2638] p-3 text-xs text-white outline-none focus:border-[#00D2FF]"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00D2FF] text-[#07090F] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all"
                >
                  Chunk and Index to Vector Storage
                </button>
              </form>

              {/* Document Repository List */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h3 className="text-xs font-bold text-white uppercase">
                    ACTIVE RETRIEVAL CORPUS ({filteredKb.length} SOURCES)
                  </h3>
                  <input
                    type="text"
                    placeholder="Filter knowledge sources..."
                    value={kbSearchTerm}
                    onChange={(e) => setKbSearchTerm(e.target.value)}
                    className="bg-[#07090F] border border-[#1E2638] px-3 py-1.5 text-xs text-white w-full sm:w-64"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredKb.map((doc) => (
                    <div key={doc.id} className="bg-[#0E131F] border border-[#1E2638] p-5 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#00D2FF]">{doc.id}</span>
                        <div className="flex space-x-2">
                          <span className="text-[10px] bg-[#00D2FF]/10 text-[#00D2FF] px-2 py-0.5 border border-[#00D2FF]/30 uppercase font-bold">
                            {doc.category}
                          </span>
                          <span className="text-[10px] bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 border border-[#10B981]/30 font-mono">
                            {doc.chunksCount} chunks
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-white">{doc.title}</h4>
                      <p className="text-xs text-[#8B98A5] leading-relaxed line-clamp-3">{doc.content}</p>

                      <div className="pt-2 border-t border-[#1E2638] flex justify-between items-center text-[10px] text-[#8B98A5]">
                        <span>Threshold: {doc.similarityThreshold}</span>
                        <span className="text-[#10B981] font-bold">Vector Status: {doc.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADMIN TAB 3: CONVERSATIONAL ANALYTICS */}
          {adminTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0E131F] border border-[#1E2638] p-5">
                  <p className="text-[10px] text-[#8B98A5] uppercase">AVG RESOLUTION TIME</p>
                  <p className="text-2xl font-bold text-white mt-1">1.8 Seconds</p>
                  <p className="text-[10px] text-[#10B981] mt-1">Direct from vector index</p>
                </div>
                <div className="bg-[#0E131F] border border-[#1E2638] p-5">
                  <p className="text-[10px] text-[#8B98A5] uppercase">FALLBACK RATE</p>
                  <p className="text-2xl font-bold text-[#10B981] mt-1">2.4%</p>
                  <p className="text-[10px] text-[#8B98A5] mt-1">97.6% Knowledge coverage</p>
                </div>
                <div className="bg-[#0E131F] border border-[#1E2638] p-5">
                  <p className="text-[10px] text-[#8B98A5] uppercase">TOP QUERY CATEGORY</p>
                  <p className="text-2xl font-bold text-[#00D2FF] mt-1">Service Pricing</p>
                  <p className="text-[10px] text-[#8B98A5] mt-1">54% of visitor inquiries</p>
                </div>
                <div className="bg-[#0E131F] border border-[#1E2638] p-5">
                  <p className="text-[10px] text-[#8B98A5] uppercase">LEAD FORM CONVERSION</p>
                  <p className="text-2xl font-bold text-[#10B981] mt-1">18.4%</p>
                  <p className="text-[10px] text-[#8B98A5] mt-1">From automated triggers</p>
                </div>
              </div>

              {/* Frequently Asked Inquiries */}
              <div className="bg-[#0E131F] border border-[#1E2638] p-6 space-y-4">
                <h3 className="text-xs font-bold text-white uppercase">
                  TOP 5 MOST FREQUENT CUSTOMER INQUIRIES
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { q: 'What are your custom software development pricing packages?', count: 482, match: 'Pricing KB-201' },
                    { q: 'What types of software systems can your team build?', count: 390, match: 'Products KB-202' },
                    { q: 'What is your intellectual property ownership and SLA policy?', count: 215, match: 'Policies KB-203' },
                    { q: 'Can you build interactive 3D WebGL websites like Savor?', count: 184, match: 'Products KB-202' },
                    { q: 'How does your hotel booking automation system work?', count: 142, match: 'Products KB-202' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#07090F] border border-[#1E2638] flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">&gt; {item.q}</p>
                        <p className="text-[10px] text-[#8B98A5]">Matched: {item.match}</p>
                      </div>
                      <span className="text-[#00D2FF] font-bold text-sm">{item.count} queries</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ADMIN TAB 4: AI MODEL CONFIGURATION */}
          {adminTab === 'settings' && (
            <div className="bg-[#0E131F] border border-[#1E2638] p-6 space-y-6 max-w-2xl">
              <div>
                <h3 className="text-xs font-bold text-white uppercase">
                  ABSTRACTED AI SERVICE LAYER CONFIGURATION
                </h3>
                <p className="text-[11px] text-[#8B98A5] mt-1">
                  Swapping the underlying model changes internal inference without requiring code adjustments.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[#8B98A5] block mb-1">Configured AI Model Provider</label>
                  <select
                    value={aiConfig.provider}
                    onChange={(e) => setAiConfig({ ...aiConfig, provider: e.target.value })}
                    className="w-full bg-[#07090F] border border-[#1E2638] p-3 text-white outline-none focus:border-[#00D2FF]"
                  >
                    <option value="Infinity AI (Free Model: infinity-instruct-v1)">Infinity AI (Free Model: infinity-instruct-v1)</option>
                    <option value="Anthropic Claude 3.5 Sonnet (Direct API)">Anthropic Claude 3.5 Sonnet (Direct API)</option>
                    <option value="OpenAI GPT-4o Enterprise (Direct API)">OpenAI GPT-4o Enterprise (Direct API)</option>
                    <option value="Local Ollama Llama 3.3 (Private Host)">Local Ollama Llama 3.3 (Private Host)</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[#8B98A5]">Temperature / Sampling Purity</label>
                    <span className="text-[#00D2FF] font-bold">{aiConfig.temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={aiConfig.temperature}
                    onChange={(e) => setAiConfig({ ...aiConfig, temperature: Number(e.target.value) })}
                    className="w-full accent-[#00D2FF]"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <label className="text-[#8B98A5]">Vector Similarity Retrieval Threshold</label>
                    <span className="text-[#00D2FF] font-bold">{aiConfig.vectorSimilarityThreshold}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="0.95"
                    step="0.05"
                    value={aiConfig.vectorSimilarityThreshold}
                    onChange={(e) => setAiConfig({ ...aiConfig, vectorSimilarityThreshold: Number(e.target.value) })}
                    className="w-full accent-[#00D2FF]"
                  />
                </div>

                <div className="pt-2 border-t border-[#1E2638]">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aiConfig.leadCaptureTriggerEnabled}
                      onChange={(e) => setAiConfig({ ...aiConfig, leadCaptureTriggerEnabled: e.target.checked })}
                    />
                    <span className="text-white">Enable Automatic Lead Capture Triggers in Chat</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </div>
  )
}
