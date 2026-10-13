'use client'

import { useState } from 'react'

// antislop active: during (session override).
// Reading this as: Financial Terminal and Accounting Suite for Small and Medium Businesses, in a dense, precise, and restrained data terminal style, dial ENERGY 1 / RHYTHM 2 / MOTION 1.

interface Transaction {
  id: string
  date: string
  description: string
  category: string
  entity: string
  type: 'income' | 'expense'
  amount: number
  method: string
  status: 'Completed' | 'Pending' | 'Flagged'
  notes?: string
}

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
}

interface Invoice {
  id: string
  customer: string
  date: string
  dueDate: string
  items: InvoiceItem[]
  taxRate: number
  discount: number
  status: 'Paid' | 'Unpaid' | 'Overdue'
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TX-9021', date: '2025-03-14', description: 'Enterprise SaaS Annual Core License', category: 'Software Revenue', entity: 'Acme Global Corp', type: 'income', amount: 14500, method: 'Wire Transfer', status: 'Completed', notes: 'Master service agreement #4928' },
  { id: 'TX-9022', date: '2025-03-13', description: 'Cloud Infrastructure & Server Fleet', category: 'Cloud Infrastructure', entity: 'Amazon Web Services', type: 'expense', amount: 2340, method: 'Corporate Card', status: 'Completed', notes: 'Monthly compute and multi-region egress' },
  { id: 'TX-9023', date: '2025-03-12', description: 'Q1 3D WebGL Development Retainer', category: 'Custom Engineering', entity: 'Starlight Tech Inc', type: 'income', amount: 8200, method: 'ACH Transfer', status: 'Completed', notes: 'Milestone 2 sign-off approved' },
  { id: 'TX-9024', date: '2025-03-11', description: 'Engineering Studio Lease', category: 'Facilities', entity: 'Skyline Commercial Properties', type: 'expense', amount: 3500, method: 'Direct Debit', status: 'Completed', notes: 'Office lease Suite 400' },
  { id: 'TX-9025', date: '2025-03-10', description: 'Cybersecurity Penetration Test Retainer', category: 'Professional Services', entity: 'Sentinel Security Group', type: 'expense', amount: 1800, method: 'Wire Transfer', status: 'Completed', notes: 'Annual compliance review' },
  { id: 'TX-9026', date: '2025-03-08', description: 'Workflow Automation Engine Delivery', category: 'Software Revenue', entity: 'Nexus Labs AG', type: 'income', amount: 6400, method: 'Stripe Direct', status: 'Completed', notes: 'B2B integration module' },
  { id: 'TX-9027', date: '2025-03-05', description: 'Payroll & Health Benefits Administration', category: 'Payroll & HR', entity: 'Gusto Payroll Platform', type: 'expense', amount: 890, method: 'Direct Debit', status: 'Completed', notes: 'Monthly payroll tax processing' },
  { id: 'TX-9028', date: '2025-03-03', description: 'Hospitality Engine Licensing Contract', category: 'Software Revenue', entity: 'Vanguard Resort Holdings', type: 'income', amount: 12500, method: 'Wire Transfer', status: 'Pending', notes: 'Pending international wire clearance' },
  { id: 'TX-9029', date: '2025-02-28', description: 'Database Backup Cold Storage', category: 'Cloud Infrastructure', entity: 'Cloudflare R2', type: 'expense', amount: 180, method: 'Corporate Card', status: 'Completed', notes: 'Immutable audit logs' },
  { id: 'TX-9030', date: '2025-02-24', description: 'Enterprise UI Design Consultation', category: 'Custom Engineering', entity: 'Apex Dynamics', type: 'income', amount: 4800, method: 'ACH Transfer', status: 'Completed', notes: 'Design sprint week 2' },
]

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2025-001',
    customer: 'Acme Global Corp',
    date: '2025-03-01',
    dueDate: '2025-04-01',
    status: 'Paid',
    taxRate: 10,
    discount: 500,
    items: [
      { id: '1', description: 'Enterprise Financial Terminal Deployment', quantity: 1, unitPrice: 12000 },
      { id: '2', description: 'Priority SLA Dedicated Engineering Support', quantity: 1, unitPrice: 3000 },
    ],
  },
  {
    id: 'INV-2025-002',
    customer: 'Starlight Tech Inc',
    date: '2025-03-05',
    dueDate: '2025-03-25',
    status: 'Unpaid',
    taxRate: 10,
    discount: 0,
    items: [
      { id: '1', description: 'Interactive 3D WebGL Product Visualizer', quantity: 1, unitPrice: 8200 },
    ],
  },
  {
    id: 'INV-2025-003',
    customer: 'Vanguard Resort Holdings',
    date: '2025-02-15',
    dueDate: '2025-03-01',
    status: 'Overdue',
    taxRate: 8,
    discount: 250,
    items: [
      { id: '1', description: 'Automated Hotel Reservation & Event Engine', quantity: 1, unitPrice: 12500 },
    ],
  },
  {
    id: 'INV-2025-004',
    customer: 'Nexus Labs AG',
    date: '2025-03-10',
    dueDate: '2025-04-10',
    status: 'Paid',
    taxRate: 10,
    discount: 100,
    items: [
      { id: '1', description: 'AI Assistant Service Layer Abstraction Module', quantity: 1, unitPrice: 6500 },
    ],
  },
]

export default function LedgerShowcasePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'invoices' | 'reports'>('overview')

  // Financial Filter States
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortField, setSortField] = useState<'date' | 'amount' | 'description'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  // Transaction CRUD State
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [isTxModalOpen, setIsTxModalOpen] = useState(false)
  const [editingTx, setEditingTx] = useState<Transaction | null>(null)
  const [newTxForm, setNewTxForm] = useState<{
    description: string
    category: string
    entity: string
    type: 'income' | 'expense'
    amount: number
    method: string
    status: 'Completed' | 'Pending' | 'Flagged'
    notes: string
  }>({
    description: '',
    category: 'Software Revenue',
    entity: '',
    type: 'income',
    amount: 0,
    method: 'Wire Transfer',
    status: 'Completed',
    notes: '',
  })

  // Invoice CRUD State
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)
  const [newInvoiceForm, setNewInvoiceForm] = useState({
    customer: '',
    dueDate: '2025-04-15',
    taxRate: 10,
    discount: 0,
    items: [{ id: '1', description: 'Core Application Architecture', quantity: 1, unitPrice: 6000 }],
  })

  // Dynamic Financial Calculations
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
  const totalExpenses = transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
  const netProfit = totalIncome - totalExpenses
  const profitMargin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0
  const cashBalance = 168400 + netProfit

  const accountsReceivable = invoices
    .filter((inv) => inv.status !== 'Paid')
    .reduce((acc, inv) => {
      const sub = inv.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0)
      const tax = (sub - inv.discount) * (inv.taxRate / 100)
      return acc + (sub - inv.discount + tax)
    }, 0)

  const accountsPayable = 9450 // Pending vendor vouchers

  // Transaction Operations
  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTxForm.description || !newTxForm.entity || newTxForm.amount <= 0) return

    if (editingTx) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTx.id
            ? { ...t, ...newTxForm, amount: Number(newTxForm.amount) }
            : t
        )
      )
      setEditingTx(null)
    } else {
      const created: Transaction = {
        id: `TX-${Math.floor(9031 + Math.random() * 900)}`,
        date: new Date().toISOString().split('T')[0],
        description: newTxForm.description,
        category: newTxForm.category,
        entity: newTxForm.entity,
        type: newTxForm.type,
        amount: Number(newTxForm.amount),
        method: newTxForm.method,
        status: newTxForm.status,
        notes: newTxForm.notes,
      }
      setTransactions([created, ...transactions])
    }

    setIsTxModalOpen(false)
    setNewTxForm({
      description: '',
      category: 'Software Revenue',
      entity: '',
      type: 'income',
      amount: 0,
      method: 'Wire Transfer',
      status: 'Completed',
      notes: '',
    })
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter((t) => t.id !== id))
    setSelectedTx(null)
  }

  const handleEditClick = (tx: Transaction) => {
    setEditingTx(tx)
    setNewTxForm({
      description: tx.description,
      category: tx.category,
      entity: tx.entity,
      type: tx.type,
      amount: tx.amount,
      method: tx.method,
      status: tx.status,
      notes: tx.notes || '',
    })
    setIsTxModalOpen(true)
  }

  // Invoice Operations
  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInvoiceForm.customer) return

    const inv: Invoice = {
      id: `INV-2025-00${invoices.length + 1}`,
      customer: newInvoiceForm.customer,
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoiceForm.dueDate,
      status: 'Unpaid',
      taxRate: Number(newInvoiceForm.taxRate),
      discount: Number(newInvoiceForm.discount),
      items: newInvoiceForm.items.map((it, idx) => ({ ...it, id: String(idx + 1) })),
    }

    setInvoices([inv, ...invoices])
    setIsInvoiceModalOpen(false)
  }

  const handleToggleInvoiceStatus = (id: string) => {
    setInvoices(
      invoices.map((inv) => {
        if (inv.id === id) {
          const next = inv.status === 'Paid' ? 'Unpaid' : 'Paid'
          return { ...inv, status: next }
        }
        return inv
      })
    )
  }

  // Filtered & Sorted Transactions
  const filteredTransactions = transactions
    .filter((t) => {
      const matchQuery =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCat = categoryFilter === 'All' || t.category === categoryFilter
      const matchType = typeFilter === 'All' || t.type === typeFilter.toLowerCase()
      const matchStatus = statusFilter === 'All' || t.status === statusFilter
      return matchQuery && matchCat && matchType && matchStatus
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortOrder === 'desc'
          ? b.date.localeCompare(a.date)
          : a.date.localeCompare(b.date)
      }
      if (sortField === 'amount') {
        return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount
      }
      return sortOrder === 'desc'
        ? b.description.localeCompare(a.description)
        : a.description.localeCompare(b.description)
    })

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-[#0A0D12] text-[#E2E8F0] font-mono selection:bg-[#10B981] selection:text-[#0A0D12]">
      {/* Top Navigation Terminal Bar */}
      <header className="border-b border-[#1E2530] bg-[#0E1218] px-6 lg:px-12 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold tracking-[0.2em] text-[#10B981] uppercase">
              LEDGER
            </span>
            <span className="hidden sm:inline-block text-xs text-[#8A96A6]">
              / Financial Analytics Terminal v4.8
            </span>
            <span className="text-[10px] text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2.5 py-0.5 rounded font-bold uppercase">
              Notice: No AI API yet, No database connection yet
            </span>
          </div>

          {/* Tab Selector */}
          <div className="flex bg-[#07090D] p-1 border border-[#1E2530] text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-bold transition-all uppercase ${
                activeTab === 'overview'
                  ? 'bg-[#1E2530] text-[#10B981]'
                  : 'text-[#8A96A6] hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 font-bold transition-all uppercase ${
                activeTab === 'transactions'
                  ? 'bg-[#1E2530] text-[#10B981]'
                  : 'text-[#8A96A6] hover:text-white'
              }`}
            >
              Transactions ({transactions.length})
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 font-bold transition-all uppercase ${
                activeTab === 'invoices'
                  ? 'bg-[#1E2530] text-[#10B981]'
                  : 'text-[#8A96A6] hover:text-white'
              }`}
            >
              Invoices ({invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 font-bold transition-all uppercase ${
                activeTab === 'reports'
                  ? 'bg-[#1E2530] text-[#10B981]'
                  : 'text-[#8A96A6] hover:text-white'
              }`}
            >
              P&L Reports
            </button>
          </div>
        </div>
      </header>

      {/* Main Terminal Viewport */}
      <main className="p-6 lg:p-12 max-w-7xl mx-auto space-y-8">
        {/* Top Financial KPI Metrics Matrix (All Clickable for Drilldown) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            onClick={() => {
              setActiveTab('transactions')
              setTypeFilter('income')
            }}
            className="bg-[#0E1218] border border-[#1E2530] hover:border-[#10B981]/50 p-5 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center text-[10px] text-[#8A96A6] uppercase tracking-wider mb-1">
              <span>Total Revenue</span>
              <span className="text-[#10B981] group-hover:underline">Drilldown →</span>
            </div>
            <p className="text-2xl font-bold text-[#10B981]">${totalIncome.toLocaleString()}</p>
            <p className="text-[10px] text-[#8A96A6] mt-1">+16.4% vs Previous Quarter</p>
          </div>

          <div
            onClick={() => {
              setActiveTab('transactions')
              setTypeFilter('expense')
            }}
            className="bg-[#0E1218] border border-[#1E2530] hover:border-[#EF4444]/50 p-5 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center text-[10px] text-[#8A96A6] uppercase tracking-wider mb-1">
              <span>Total Expenses</span>
              <span className="text-[#EF4444] group-hover:underline">Drilldown →</span>
            </div>
            <p className="text-2xl font-bold text-[#EF4444]">${totalExpenses.toLocaleString()}</p>
            <p className="text-[10px] text-[#8A96A6] mt-1">Infrastructure & Operational</p>
          </div>

          <div
            onClick={() => setActiveTab('reports')}
            className="bg-[#0E1218] border border-[#1E2530] hover:border-[#10B981]/50 p-5 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center text-[10px] text-[#8A96A6] uppercase tracking-wider mb-1">
              <span>Net Profit (YTD)</span>
              <span className="text-[#10B981] group-hover:underline">Reports →</span>
            </div>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              ${netProfit.toLocaleString()}
            </p>
            <p className="text-[10px] text-[#8A96A6] mt-1">Margin: {profitMargin.toFixed(1)}%</p>
          </div>

          <div
            onClick={() => setActiveTab('reports')}
            className="bg-[#0E1218] border border-[#1E2530] hover:border-[#3B82F6]/50 p-5 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center text-[10px] text-[#8A96A6] uppercase tracking-wider mb-1">
              <span>Cash Balance</span>
              <span className="text-[#3B82F6] group-hover:underline">Ledger →</span>
            </div>
            <p className="text-2xl font-bold text-[#3B82F6]">${cashBalance.toLocaleString()}</p>
            <p className="text-[10px] text-[#8A96A6] mt-1">Liquid Treasury Reserve</p>
          </div>

          <div
            onClick={() => setActiveTab('invoices')}
            className="bg-[#0E1218] border border-[#1E2530] hover:border-[#F59E0B]/50 p-5 cursor-pointer transition-all group"
          >
            <div className="flex justify-between items-center text-[10px] text-[#8A96A6] uppercase tracking-wider mb-1">
              <span>Accounts Receivable</span>
              <span className="text-[#F59E0B] group-hover:underline">Invoices →</span>
            </div>
            <p className="text-2xl font-bold text-[#F59E0B]">${accountsReceivable.toLocaleString()}</p>
            <p className="text-[10px] text-[#8A96A6] mt-1">Uncollected Invoices Due</p>
          </div>
        </div>

        {/* TAB 1: EXECUTIVE FINANCIAL OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Revenue vs Expense Chart Breakdown */}
            <div className="bg-[#0E1218] border border-[#1E2530] p-6 space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1E2530] pb-4">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                    REVENUE VS EXPENSES COMPARISON TIMELINE
                  </h2>
                  <p className="text-[11px] text-[#8A96A6]">
                    Monthly cash flow comparison across core software contracts
                  </p>
                </div>

                <div className="flex space-x-6 text-xs font-bold">
                  <span className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-[#10B981]"></span>
                    <span>Revenue</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-[#EF4444]"></span>
                    <span>Expenses</span>
                  </span>
                </div>
              </div>

              {/* Precise Terminal Bar Visualization */}
              <div className="space-y-4 text-xs">
                {[
                  { month: 'November 2024', rev: 24500, exp: 7400 },
                  { month: 'December 2024', rev: 31200, exp: 9600 },
                  { month: 'January 2025', rev: 28900, exp: 8200 },
                  { month: 'February 2025', rev: 34100, exp: 8900 },
                  { month: 'March 2025 (Current)', rev: totalIncome, exp: totalExpenses },
                ].map((item) => (
                  <div key={item.month} className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#8A96A6]">
                      <span className="font-bold text-white">{item.month}</span>
                      <span>
                        Net Cash Flow: ${(item.rev - item.exp).toLocaleString()} | Margin: {(((item.rev - item.exp) / item.rev) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-4 bg-[#07090D] p-0.5 border border-[#1E2530]">
                      <div
                        className="bg-[#10B981] h-full transition-all duration-500"
                        style={{ width: `${Math.min((item.rev / 45000) * 100, 100)}%` }}
                      ></div>
                      <div
                        className="bg-[#EF4444] h-full transition-all duration-500"
                        style={{ width: `${Math.min((item.exp / 45000) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Accounts & Expense Category Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Enterprise Customers */}
              <div className="bg-[#0E1218] border border-[#1E2530] p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#1E2530] pb-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    TOP ENTERPRISE ACCOUNTS BY VALUE
                  </h3>
                  <span className="text-[10px] text-[#8A96A6]">Active Contracts</span>
                </div>

                <div className="space-y-3 text-xs">
                  {[
                    { name: 'Acme Global Corp', LTV: '$34,500', contract: 'Annual SaaS Retainer', status: 'Active' },
                    { name: 'Vanguard Resort Holdings', LTV: '$24,500', contract: 'StayFlow Engine Delivery', status: 'Pending Review' },
                    { name: 'Starlight Tech Inc', LTV: '$18,200', contract: '3D WebGL Visualization', status: 'Active' },
                    { name: 'Nexus Labs AG', LTV: '$12,800', contract: 'AI Service Layer Integration', status: 'Active' },
                  ].map((acc) => (
                    <div
                      key={acc.name}
                      onClick={() => {
                        setActiveTab('transactions')
                        setSearchTerm(acc.name)
                      }}
                      className="p-3 bg-[#07090D] border border-[#1E2530] hover:border-[#10B981] cursor-pointer flex justify-between items-center transition-all"
                    >
                      <div>
                        <p className="font-bold text-white">{acc.name}</p>
                        <p className="text-[10px] text-[#8A96A6]">{acc.contract}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#10B981] text-sm">{acc.LTV}</span>
                        <p className="text-[9px] text-[#8A96A6] uppercase">{acc.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Category Distribution */}
              <div className="bg-[#0E1218] border border-[#1E2530] p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#1E2530] pb-3">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    EXPENSE CATEGORY DISTRIBUTION
                  </h3>
                  <span className="text-[10px] text-[#8A96A6]">Cost Allocation</span>
                </div>

                <div className="space-y-4 text-xs">
                  {[
                    { cat: 'Facilities & Office Studio', amount: 3500, pct: 41 },
                    { cat: 'Cloud Infrastructure & Servers', amount: 2520, pct: 29 },
                    { cat: 'Professional Security & Audits', amount: 1800, pct: 21 },
                    { cat: 'Payroll & HR Administration', amount: 890, pct: 9 },
                  ].map((exp) => (
                    <div key={exp.cat} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white">{exp.cat}</span>
                        <span className="text-[#EF4444] font-bold">
                          ${exp.amount.toLocaleString()} ({exp.pct}%)
                        </span>
                      </div>
                      <div className="w-full bg-[#07090D] h-2 border border-[#1E2530]">
                        <div className="bg-[#EF4444] h-full" style={{ width: `${exp.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSACTION CRUD & ADVANCED FILTERING ENGINE */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Filter and Action Controls Bar */}
            <div className="bg-[#0E1218] border border-[#1E2530] p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto text-xs">
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search ID, description, entity..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#07090D] border border-[#1E2530] px-3 py-2 text-white outline-none focus:border-[#10B981] w-full sm:w-60"
                />

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#07090D] border border-[#1E2530] px-3 py-2 text-[#8A96A6] outline-none focus:border-[#10B981]"
                >
                  <option value="All">All Categories</option>
                  <option value="Software Revenue">Software Revenue</option>
                  <option value="Custom Engineering">Custom Engineering</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Payroll & HR">Payroll & HR</option>
                </select>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => {
                    setTypeFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#07090D] border border-[#1E2530] px-3 py-2 text-[#8A96A6] outline-none focus:border-[#10B981]"
                >
                  <option value="All">All Types</option>
                  <option value="income">Income (+)</option>
                  <option value="expense">Expense (-)</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="bg-[#07090D] border border-[#1E2530] px-3 py-2 text-[#8A96A6] outline-none focus:border-[#10B981]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Flagged">Flagged</option>
                </select>
              </div>

              <button
                onClick={() => {
                  setEditingTx(null)
                  setIsTxModalOpen(true)
                }}
                className="px-5 py-2.5 bg-[#10B981] text-[#0A0D12] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all shrink-0 w-full lg:w-auto"
              >
                + Record Transaction
              </button>
            </div>

            {/* Interactive Transaction Data Table */}
            <div className="bg-[#0E1218] border border-[#1E2530] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#07090D] border-b border-[#1E2530] text-[#8A96A6] text-[10px] uppercase tracking-wider">
                    <th
                      className="p-4 cursor-pointer hover:text-white"
                      onClick={() => {
                        setSortField('date')
                        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                      }}
                    >
                      Date {sortField === 'date' && (sortOrder === 'desc' ? '▼' : '▲')}
                    </th>
                    <th className="p-4">TX ID</th>
                    <th
                      className="p-4 cursor-pointer hover:text-white"
                      onClick={() => {
                        setSortField('description')
                        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                      }}
                    >
                      Description {sortField === 'description' && (sortOrder === 'desc' ? '▼' : '▲')}
                    </th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Customer / Vendor</th>
                    <th
                      className="p-4 text-right cursor-pointer hover:text-white"
                      onClick={() => {
                        setSortField('amount')
                        setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')
                      }}
                    >
                      Amount {sortField === 'amount' && (sortOrder === 'desc' ? '▼' : '▲')}
                    </th>
                    <th className="p-4">Method</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2530]">
                  {paginatedTransactions.map((tx) => (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-[#131822] cursor-pointer transition-colors"
                    >
                      <td className="p-4 text-[#8A96A6]">{tx.date}</td>
                      <td className="p-4 font-bold text-[#10B981]">{tx.id}</td>
                      <td className="p-4 font-bold text-white">{tx.description}</td>
                      <td className="p-4 text-[#8A96A6]">{tx.category}</td>
                      <td className="p-4 text-[#CBD5E1]">{tx.entity}</td>
                      <td
                        className={`p-4 text-right font-bold ${
                          tx.type === 'income' ? 'text-[#10B981]' : 'text-[#EF4444]'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </td>
                      <td className="p-4 text-[#8A96A6]">{tx.method}</td>
                      <td className="p-4 text-center">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                            tx.status === 'Completed'
                              ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                              : tx.status === 'Pending'
                              ? 'bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30'
                              : 'bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30'
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-center space-x-2 text-[10px]">
                          <button
                            onClick={() => handleEditClick(tx)}
                            className="text-[#3B82F6] hover:underline uppercase"
                          >
                            Edit
                          </button>
                          <span className="text-[#1E2530]">|</span>
                          <button
                            onClick={() => handleDeleteTransaction(tx.id)}
                            className="text-[#EF4444] hover:underline uppercase"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {paginatedTransactions.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-[#8A96A6]">
                        No transactions found matching your active filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center text-xs text-[#8A96A6] pt-2">
              <span>
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of{' '}
                {filteredTransactions.length} records
              </span>

              <div className="flex space-x-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 bg-[#0E1218] border border-[#1E2530] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#10B981]"
                >
                  Previous Page
                </button>
                <span className="px-3 py-1 bg-[#07090D] border border-[#1E2530] text-white">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 bg-[#0E1218] border border-[#1E2530] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#10B981]"
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: INVOICE GENERATOR & PREVIEW ENGINE */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#0E1218] border border-[#1E2530] p-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  ENTERPRISE CLIENT INVOICING
                </h2>
                <p className="text-[11px] text-[#8A96A6]">
                  Automated balance calculations, line-item tax rates, and customer billing drawers
                </p>
              </div>

              <button
                onClick={() => setIsInvoiceModalOpen(true)}
                className="px-5 py-2.5 bg-[#10B981] text-[#0A0D12] text-xs font-bold uppercase tracking-wider hover:bg-white transition-all"
              >
                + Create Client Invoice
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {invoices.map((inv) => {
                const sub = inv.items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0)
                const tax = (sub - inv.discount) * (inv.taxRate / 100)
                const total = sub - inv.discount + tax

                return (
                  <div
                    key={inv.id}
                    className="bg-[#0E1218] border border-[#1E2530] p-6 space-y-4 flex flex-col justify-between hover:border-[#10B981]/50 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-start border-b border-[#1E2530] pb-3 mb-3">
                        <div>
                          <span className="text-[10px] text-[#8A96A6]">{inv.id}</span>
                          <h3 className="text-base font-bold text-white">{inv.customer}</h3>
                        </div>
                        <span
                          className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                            inv.status === 'Paid'
                              ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                              : inv.status === 'Overdue'
                              ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30'
                              : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/30'
                          }`}
                        >
                          {inv.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-[#8A96A6] mb-4">
                        <p>Issued Date: <span className="text-white">{inv.date}</span></p>
                        <p>Due Date: <span className="text-white">{inv.dueDate}</span></p>
                      </div>

                      <div className="space-y-1.5 border-t border-b border-[#1E2530] py-3 text-xs">
                        <span className="text-[10px] text-[#8A96A6] uppercase font-bold block mb-1">
                          Items ({inv.items.length})
                        </span>
                        {inv.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-white text-[11px]">
                            <span className="truncate pr-2">{item.description}</span>
                            <span className="font-bold shrink-0">
                              ${(item.quantity * item.unitPrice).toLocaleString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-sm font-bold text-white">
                        <span>TOTAL AMOUNT</span>
                        <span className="text-[#10B981] text-base">${total.toLocaleString()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="w-full bg-[#1A202C] text-white py-2 text-xs font-bold uppercase hover:bg-[#2D3748] transition-all"
                        >
                          Preview Drawer
                        </button>
                        <button
                          onClick={() => handleToggleInvoiceStatus(inv.id)}
                          className="w-full bg-[#10B981]/15 border border-[#10B981]/30 text-[#10B981] py-2 text-xs font-bold uppercase hover:bg-[#10B981] hover:text-[#0A0D12] transition-all"
                        >
                          Mark {inv.status === 'Paid' ? 'Unpaid' : 'Paid'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 4: FINANCIAL REPORTS & P&L STATEMENT */}
        {activeTab === 'reports' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0E1218] border border-[#1E2530] p-4">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  INTERACTIVE FINANCIAL REPORTS
                </h2>
                <p className="text-[11px] text-[#8A96A6]">
                  Real-time profit and loss ledger across standard accounting time horizons
                </p>
              </div>

              {/* Time Horizon Tabs */}
              <div className="flex bg-[#07090D] p-1 border border-[#1E2530] text-xs">
                {(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setReportPeriod(period)}
                    className={`px-3 py-1 font-bold uppercase text-[10px] ${
                      reportPeriod === period
                        ? 'bg-[#10B981] text-[#0A0D12]'
                        : 'text-[#8A96A6] hover:text-white'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            {/* Comprehensive P&L Table */}
            <div className="bg-[#0E1218] border border-[#1E2530] p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-[#1E2530] pb-3">
                <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-wider">
                  STATEMENT OF PROFIT AND LOSS ({reportPeriod.toUpperCase()} INTERVAL)
                </h3>
                <span className="text-[10px] text-[#8A96A6]">Currency: USD ($)</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#1E2530] pb-2 font-bold text-white">
                  <span>1. TOTAL OPERATING REVENUE</span>
                  <span className="text-[#10B981]">${totalIncome.toLocaleString()}</span>
                </div>
                <div className="pl-4 space-y-1.5 text-[#8A96A6]">
                  <div className="flex justify-between">
                    <span>• Core Enterprise SaaS Licensing</span>
                    <span>$33,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Custom Architectural Engineering Retainers</span>
                    <span>$13,000</span>
                  </div>
                </div>

                <div className="flex justify-between border-b border-[#1E2530] pb-2 pt-4 font-bold text-white">
                  <span>2. OPERATING EXPENSES (OPEX)</span>
                  <span className="text-[#EF4444]">${totalExpenses.toLocaleString()}</span>
                </div>
                <div className="pl-4 space-y-1.5 text-[#8A96A6]">
                  <div className="flex justify-between">
                    <span>• Cloud Infrastructure & Server Deployment</span>
                    <span>$2,520</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Studio Lease & Facilities</span>
                    <span>$3,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Security Auditing & Compliance Retainers</span>
                    <span>$1,800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• Payroll Administration</span>
                    <span>$890</span>
                  </div>
                </div>

                <div className="flex justify-between border-t-2 border-b-2 border-[#10B981] py-4 text-sm font-bold text-white bg-[#07090D] px-4 mt-6">
                  <span>NET OPERATING INCOME</span>
                  <span className="text-[#10B981] text-base">${netProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* RECORD / EDIT TRANSACTION MODAL */}
      {isTxModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs"
        >
          <div className="bg-[#0E1218] border border-[#1E2530] max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E2530] pb-3">
              <h3 className="text-xs font-bold text-white uppercase">
                {editingTx ? 'EDIT TRANSACTION RECORD' : 'RECORD NEW TRANSACTION'}
              </h3>
              <button
                onClick={() => setIsTxModalOpen(false)}
                className="text-[#8A96A6] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTransaction} className="space-y-4">
              <div>
                <label className="text-[#8A96A6] block mb-1">Description *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Design Contract Q1"
                  value={newTxForm.description}
                  onChange={(e) => setNewTxForm({ ...newTxForm, description: e.target.value })}
                  className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="text-[#8A96A6] block mb-1">Entity (Customer or Vendor) *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Acme Global Corp"
                  value={newTxForm.entity}
                  onChange={(e) => setNewTxForm({ ...newTxForm, entity: e.target.value })}
                  className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8A96A6] block mb-1">Type</label>
                  <select
                    value={newTxForm.type}
                    onChange={(e) => setNewTxForm({ ...newTxForm, type: e.target.value as any })}
                    className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                  >
                    <option value="income">Income (+)</option>
                    <option value="expense">Expense (-)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#8A96A6] block mb-1">Amount ($ USD) *</label>
                  <input
                    required
                    type="number"
                    min="1"
                    placeholder="5000"
                    value={newTxForm.amount || ''}
                    onChange={(e) => setNewTxForm({ ...newTxForm, amount: Number(e.target.value) })}
                    className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#8A96A6] block mb-1">Category</label>
                <select
                  value={newTxForm.category}
                  onChange={(e) => setNewTxForm({ ...newTxForm, category: e.target.value })}
                  className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                >
                  <option value="Software Revenue">Software Revenue</option>
                  <option value="Custom Engineering">Custom Engineering</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Payroll & HR">Payroll & HR</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsTxModalOpen(false)}
                  className="px-4 py-2 bg-[#1A202C] text-white font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10B981] text-[#0A0D12] font-bold uppercase hover:bg-white"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE INVOICE MODAL */}
      {isInvoiceModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs"
        >
          <div className="bg-[#0E1218] border border-[#1E2530] max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E2530] pb-3">
              <h3 className="text-xs font-bold text-white uppercase">GENERATE CLIENT INVOICE</h3>
              <button
                onClick={() => setIsInvoiceModalOpen(false)}
                className="text-[#8A96A6] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveInvoice} className="space-y-4">
              <div>
                <label className="text-[#8A96A6] block mb-1">Client Entity *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Vanguard Resort Holdings"
                  value={newInvoiceForm.customer}
                  onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, customer: e.target.value })}
                  className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#8A96A6] block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newInvoiceForm.dueDate}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, dueDate: e.target.value })}
                    className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                  />
                </div>

                <div>
                  <label className="text-[#8A96A6] block mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={newInvoiceForm.taxRate}
                    onChange={(e) => setNewInvoiceForm({ ...newInvoiceForm, taxRate: Number(e.target.value) })}
                    className="w-full bg-[#07090D] border border-[#1E2530] p-2.5 text-white outline-none focus:border-[#10B981]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsInvoiceModalOpen(false)}
                  className="px-4 py-2 bg-[#1A202C] text-white font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10B981] text-[#0A0D12] font-bold uppercase hover:bg-white"
                >
                  Create Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INVOICE PREVIEW DRAWER */}
      {selectedInvoice && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-end font-mono text-xs"
        >
          <div className="bg-[#0E1218] border-l border-[#1E2530] h-full w-full max-w-lg p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex justify-between items-start border-b border-[#1E2530] pb-4">
                <div>
                  <span className="text-[10px] text-[#10B981] font-bold uppercase">{selectedInvoice.id}</span>
                  <h3 className="text-xl font-bold text-white mt-1">{selectedInvoice.customer}</h3>
                </div>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="text-[#8A96A6] hover:text-white text-base"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-2 text-[#8A96A6]">
                <p>Date Issued: <span className="text-white font-bold">{selectedInvoice.date}</span></p>
                <p>Payment Due: <span className="text-white font-bold">{selectedInvoice.dueDate}</span></p>
                <p>Status: <span className="text-[#10B981] font-bold">{selectedInvoice.status}</span></p>
              </div>

              <div className="border-t border-[#1E2530] pt-4 space-y-3">
                <span className="text-[10px] text-[#8A96A6] uppercase font-bold block">
                  Itemized Service Scope:
                </span>
                {selectedInvoice.items.map((it) => (
                  <div key={it.id} className="flex justify-between text-white p-2 bg-[#07090D] border border-[#1E2530]">
                    <span>{it.description} (x{it.quantity})</span>
                    <span className="font-bold">${(it.quantity * it.unitPrice).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#1E2530] pt-4 space-y-1.5 text-right">
                <p className="text-[#8A96A6]">Tax Rate: {selectedInvoice.taxRate}%</p>
                <p className="text-[#8A96A6]">Discount: -${selectedInvoice.discount}</p>
                <p className="text-lg font-bold text-[#10B981] pt-2">
                  Total Balance: $
                  {(
                    selectedInvoice.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0) -
                    selectedInvoice.discount +
                    (selectedInvoice.items.reduce((s, it) => s + it.quantity * it.unitPrice, 0) -
                      selectedInvoice.discount) *
                      (selectedInvoice.taxRate / 100)
                  ).toLocaleString()} USD
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full py-3 bg-[#10B981] text-[#0A0D12] font-bold uppercase tracking-wider"
            >
              Close Invoice Drawer
            </button>
          </div>
        </div>
      )}

      {/* TRANSACTION DETAIL MODAL */}
      {selectedTx && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs"
        >
          <div className="bg-[#0E1218] border border-[#1E2530] max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#1E2530] pb-3">
              <h3 className="text-xs font-bold text-[#10B981] uppercase">
                TRANSACTION AUDIT METADATA
              </h3>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-[#8A96A6] hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-[#CBD5E1]">
              <div className="flex justify-between"><span className="text-[#8A96A6]">Transaction ID:</span><span className="text-white font-bold">{selectedTx.id}</span></div>
              <div className="flex justify-between"><span className="text-[#8A96A6]">Post Date:</span><span className="text-white">{selectedTx.date}</span></div>
              <div className="flex justify-between"><span className="text-[#8A96A6]">Description:</span><span className="text-white font-bold">{selectedTx.description}</span></div>
              <div className="flex justify-between"><span className="text-[#8A96A6]">Entity:</span><span className="text-white">{selectedTx.entity}</span></div>
              <div className="flex justify-between"><span className="text-[#8A96A6]">Category:</span><span className="text-white">{selectedTx.category}</span></div>
              <div className="flex justify-between"><span className="text-[#8A96A6]">Payment Rail:</span><span className="text-white">{selectedTx.method}</span></div>
              <div className="flex justify-between"><span className="text-[#8A96A6]">Clearance Status:</span><span className="text-[#10B981] font-bold">{selectedTx.status}</span></div>
              {selectedTx.notes && (
                <div className="border-t border-[#1E2530] pt-2">
                  <span className="text-[#8A96A6] block text-[10px] uppercase">Audit Notes:</span>
                  <p className="text-white mt-0.5">{selectedTx.notes}</p>
                </div>
              )}
              <div className="flex justify-between items-center border-t border-[#1E2530] pt-3 text-sm font-bold">
                <span className="text-white">Amount</span>
                <span className={selectedTx.type === 'income' ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                  {selectedTx.type === 'income' ? '+' : '-'}${selectedTx.amount.toLocaleString()} USD
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => handleDeleteTransaction(selectedTx.id)}
                className="px-4 py-2 bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] font-bold uppercase hover:bg-[#EF4444] hover:text-white transition-all"
              >
                Delete Record
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-[#1A202C] text-white font-bold uppercase"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
