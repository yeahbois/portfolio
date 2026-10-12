'use client'

import { useState } from 'react'

// Interfaces
interface Transaction {
  id: string
  date: string
  description: string
  category: string
  entity: string // Customer or Vendor
  type: 'income' | 'expense'
  amount: number
  method: string
  status: 'Completed' | 'Pending' | 'Flagged'
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
  taxRate: number // percentage
  discount: number
  status: 'Paid' | 'Unpaid' | 'Overdue'
}

// Initial Realistic Financial Seed Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TX-9021', date: '2025-02-14', description: 'Enterprise SaaS Annual License', category: 'Software Revenue', entity: 'Acme Corp', type: 'income', amount: 14500, method: 'Wire Transfer', status: 'Completed' },
  { id: 'TX-9022', date: '2025-02-13', description: 'AWS Cloud Infrastructure', category: 'Hosting & Servers', entity: 'Amazon Web Services', type: 'expense', amount: 2340, method: 'Credit Card', status: 'Completed' },
  { id: 'TX-9023', date: '2025-02-12', description: 'Q1 UI/UX Design Contract', category: 'Consulting Revenue', entity: 'Starlight Tech', type: 'income', amount: 8200, method: 'ACH Transfer', status: 'Completed' },
  { id: 'TX-9024', date: '2025-02-11', description: 'Office Space Rental - Feb', category: 'Facilities', entity: 'Skyline Properties', type: 'expense', amount: 3500, method: 'Direct Debit', status: 'Completed' },
  { id: 'TX-9025', date: '2025-02-10', description: 'Cybersecurity Audit Retainer', category: 'Professional Services', entity: 'Sentinel Security', type: 'expense', amount: 1800, method: 'Wire Transfer', status: 'Completed' },
  { id: 'TX-9026', date: '2025-02-08', description: 'API Integration Project', category: 'Software Revenue', entity: 'Nexus Labs', type: 'income', amount: 5600, method: 'Stripe', status: 'Completed' },
  { id: 'TX-9027', date: '2025-02-05', description: 'Payroll Services Fee', category: 'Human Resources', entity: 'Gusto Payroll', type: 'expense', amount: 420, method: 'Direct Debit', status: 'Completed' },
  { id: 'TX-9028', date: '2025-02-03', description: 'Custom ERP Module Delivery', category: 'Software Revenue', entity: 'Vanguard Retail', type: 'income', amount: 12000, method: 'Wire Transfer', status: 'Pending' },
]

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2025-001',
    customer: 'Acme Corp',
    date: '2025-02-01',
    dueDate: '2025-03-01',
    status: 'Paid',
    taxRate: 10,
    discount: 500,
    items: [
      { id: '1', description: 'Enterprise Custom Dashboard Suite', quantity: 1, unitPrice: 12000 },
      { id: '2', description: 'Annual Priority SLA Support', quantity: 1, unitPrice: 3000 },
    ],
  },
  {
    id: 'INV-2025-002',
    customer: 'Starlight Tech',
    date: '2025-02-05',
    dueDate: '2025-02-20',
    status: 'Unpaid',
    taxRate: 10,
    discount: 0,
    items: [
      { id: '1', description: '3D WebGL Product Visualizer Component', quantity: 1, unitPrice: 8200 },
    ],
  },
  {
    id: 'INV-2025-003',
    customer: 'Vanguard Retail',
    date: '2025-01-15',
    dueDate: '2025-02-01',
    status: 'Overdue',
    taxRate: 8,
    discount: 200,
    items: [
      { id: '1', description: 'Automated Inventory Sync System', quantity: 1, unitPrice: 9500 },
    ],
  },
]

export default function LedgerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'invoices' | 'reports'>('overview')

  // State for Transactions
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [isTxModalOpen, setIsTxModalOpen] = useState(false)
  const [newTx, setNewTx] = useState<{
    description: string
    category: string
    entity: string
    type: 'income' | 'expense'
    amount: number
    method: string
  }>({
    description: '',
    category: 'Software Revenue',
    entity: '',
    type: 'income',
    amount: 0,
    method: 'Wire Transfer',
  })

  // State for Invoices
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false)
  const [newInvoice, setNewInvoice] = useState({
    customer: '',
    dueDate: '',
    taxRate: 10,
    discount: 0,
    items: [{ description: 'Core Web Engineering', quantity: 1, unitPrice: 5000 }],
  })

  // Period Filter for Reports
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly')

  // Calculated Metrics
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0)
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0)
  const netProfit = totalIncome - totalExpenses
  const cashBalance = 142850 + netProfit
  const accountsReceivable = invoices.filter(i => i.status !== 'Paid').reduce((acc, inv) => {
    const sub = inv.items.reduce((s, item) => s + (item.quantity * item.unitPrice), 0)
    const tax = (sub - inv.discount) * (inv.taxRate / 100)
    return acc + (sub - inv.discount + tax)
  }, 0)

  // Handlers for Transactions
  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTx.description || !newTx.entity || newTx.amount <= 0) return
    const created: Transaction = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      description: newTx.description,
      category: newTx.category,
      entity: newTx.entity,
      type: newTx.type,
      amount: Number(newTx.amount),
      method: newTx.method,
      status: 'Completed',
    }
    setTransactions([created, ...transactions])
    setIsTxModalOpen(false)
    setNewTx({
      description: '',
      category: 'Software Revenue',
      entity: '',
      type: 'income',
      amount: 0,
      method: 'Wire Transfer',
    })
  }

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id))
    setSelectedTx(null)
  }

  // Handlers for Invoices
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInvoice.customer) return
    const inv: Invoice = {
      id: `INV-2025-00${invoices.length + 1}`,
      customer: newInvoice.customer,
      date: new Date().toISOString().split('T')[0],
      dueDate: newInvoice.dueDate || '2025-03-15',
      status: 'Unpaid',
      taxRate: Number(newInvoice.taxRate),
      discount: Number(newInvoice.discount),
      items: newInvoice.items.map((it, idx) => ({ ...it, id: String(idx + 1) })),
    }
    setInvoices([inv, ...invoices])
    setIsCreateInvoiceOpen(false)
  }

  const handleToggleInvoiceStatus = (id: string) => {
    setInvoices(invoices.map(inv => {
      if (inv.id === id) {
        const nextStatus = inv.status === 'Paid' ? 'Unpaid' : 'Paid'
        return { ...inv, status: nextStatus }
      }
      return inv
    }))
  }

  // Filtered Transactions
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCat = categoryFilter === 'All' || t.category === categoryFilter
    const matchesType = typeFilter === 'All' || t.type === typeFilter.toLowerCase()
    return matchesSearch && matchesCat && matchesType
  })

  return (
    <div className="min-h-screen bg-[#0E1117] text-[#E2E8F0] font-mono select-none">
      {/* Top Navigation Bar */}
      <header className="border-b border-[#232A36] bg-[#141A24] px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse"></div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
              <span>LEDGER</span>
              <span className="text-[10px] bg-[#232A36] text-[#10B981] px-2 py-0.5 rounded border border-[#10B981]/30">FINANCIAL TERMINAL v4.2</span>
            </h1>
            <p className="text-[11px] text-[#8A99AD]">Automated Business Accounting & Cash Flow Engine</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#0A0D14] p-1 rounded border border-[#232A36] text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded transition-all font-bold ${activeTab === 'overview' ? 'bg-[#232A36] text-[#10B981]' : 'text-[#8A99AD] hover:text-white'}`}
          >
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded transition-all font-bold ${activeTab === 'transactions' ? 'bg-[#232A36] text-[#10B981]' : 'text-[#8A99AD] hover:text-white'}`}
          >
            TRANSACTIONS ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded transition-all font-bold ${activeTab === 'invoices' ? 'bg-[#232A36] text-[#10B981]' : 'text-[#8A99AD] hover:text-white'}`}
          >
            INVOICES ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded transition-all font-bold ${activeTab === 'reports' ? 'bg-[#232A36] text-[#10B981]' : 'text-[#8A99AD] hover:text-white'}`}
          >
            REPORTS
          </button>
        </div>
      </header>

      {/* Main Terminal Viewport */}
      <main className="p-6 max-w-7xl mx-auto space-y-8">
        {/* KPI Banner Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
            <p className="text-[10px] text-[#8A99AD] uppercase tracking-wider mb-1">TOTAL REVENUE (YTD)</p>
            <p className="text-2xl font-bold text-[#10B981]">${totalIncome.toLocaleString()}</p>
            <p className="text-[10px] text-[#10B981] mt-1">↑ +14.2% vs previous quarter</p>
          </div>

          <div className="bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
            <p className="text-[10px] text-[#8A99AD] uppercase tracking-wider mb-1">TOTAL EXPENSES (YTD)</p>
            <p className="text-2xl font-bold text-[#EF4444]">${totalExpenses.toLocaleString()}</p>
            <p className="text-[10px] text-[#8A99AD] mt-1">Operational & Infra costs</p>
          </div>

          <div className="bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
            <p className="text-[10px] text-[#8A99AD] uppercase tracking-wider mb-1">NET PROFIT / LOSS</p>
            <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              ${netProfit.toLocaleString()}
            </p>
            <p className="text-[10px] text-[#8A99AD] mt-1">Margin: {((netProfit / (totalIncome || 1)) * 100).toFixed(1)}%</p>
          </div>

          <div className="bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
            <p className="text-[10px] text-[#8A99AD] uppercase tracking-wider mb-1">CASH BALANCE</p>
            <p className="text-2xl font-bold text-[#3B82F6]">${cashBalance.toLocaleString()}</p>
            <p className="text-[10px] text-[#8A99AD] mt-1">Liquid reserve in treasury</p>
          </div>

          <div className="bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
            <p className="text-[10px] text-[#8A99AD] uppercase tracking-wider mb-1">ACCOUNTS RECEIVABLE</p>
            <p className="text-2xl font-bold text-[#F59E0B]">${accountsReceivable.toLocaleString()}</p>
            <p className="text-[10px] text-[#F59E0B] mt-1">Uncollected invoices</p>
          </div>
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Visual Revenue vs Expense Chart simulation */}
            <div className="bg-[#141A24] border border-[#232A36] p-6 rounded-lg">
              <div className="flex justify-between items-center mb-6 border-b border-[#232A36] pb-4">
                <div>
                  <h2 className="text-sm font-bold text-white uppercase tracking-wider">Financial Trend: Revenue vs Expense Breakdown</h2>
                  <p className="text-[11px] text-[#8A99AD]">Interactive cash flow timeline across core service categories</p>
                </div>
                <div className="flex space-x-4 text-xs font-bold">
                  <span className="flex items-center space-x-2"><span className="w-3 h-3 bg-[#10B981] inline-block rounded-sm"></span><span>Revenue</span></span>
                  <span className="flex items-center space-x-2"><span className="w-3 h-3 bg-[#EF4444] inline-block rounded-sm"></span><span>Expenses</span></span>
                </div>
              </div>

              {/* Bar Graph Representation */}
              <div className="space-y-4">
                {[
                  { month: 'Oct 2024', rev: 18000, exp: 6500 },
                  { month: 'Nov 2024', rev: 22400, exp: 7200 },
                  { month: 'Dec 2024', rev: 31000, exp: 9800 },
                  { month: 'Jan 2025', rev: 28500, exp: 8100 },
                  { month: 'Feb 2025', rev: totalIncome, exp: totalExpenses },
                ].map((item) => (
                  <div key={item.month} className="space-y-1">
                    <div className="flex justify-between text-xs text-[#8A99AD]">
                      <span className="font-bold text-white">{item.month}</span>
                      <span>Net: ${(item.rev - item.exp).toLocaleString()}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-4 bg-[#0A0D14] rounded overflow-hidden p-0.5">
                      <div className="bg-[#10B981] h-full rounded-sm transition-all duration-500" style={{ width: `${Math.min((item.rev / 40000) * 100, 100)}%` }}></div>
                      <div className="bg-[#EF4444] h-full rounded-sm transition-all duration-500" style={{ width: `${Math.min((item.exp / 40000) * 100, 100)}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Customers & Top Products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Top Customers */}
              <div className="bg-[#141A24] border border-[#232A36] p-6 rounded-lg">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#232A36] pb-3">
                  TOP ENTERPRISE ACCOUNTS
                </h3>
                <div className="space-y-3 text-xs">
                  {[
                    { name: 'Acme Corp', LTV: '$29,500', status: 'Active Retainer' },
                    { name: 'Starlight Tech', LTV: '$16,400', status: 'Active Contract' },
                    { name: 'Vanguard Retail', LTV: '$21,500', status: 'Project Terms' },
                    { name: 'Nexus Labs', LTV: '$11,200', status: 'Software License' },
                  ].map((cust) => (
                    <div key={cust.name} className="flex justify-between items-center p-3 bg-[#0A0D14] rounded border border-[#232A36]">
                      <div>
                        <p className="font-bold text-white">{cust.name}</p>
                        <p className="text-[10px] text-[#8A99AD]">{cust.status}</p>
                      </div>
                      <span className="text-sm font-bold text-[#10B981]">{cust.LTV}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Breakdown */}
              <div className="bg-[#141A24] border border-[#232A36] p-6 rounded-lg">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#232A36] pb-3">
                  EXPENSE CATEGORY DISTRIBUTION
                </h3>
                <div className="space-y-4 text-xs">
                  {[
                    { cat: 'Hosting & Servers', amount: 2340, pct: 28 },
                    { cat: 'Facilities / Rent', amount: 3500, pct: 43 },
                    { cat: 'Professional Services', amount: 1800, pct: 22 },
                    { cat: 'Human Resources', amount: 420, pct: 7 },
                  ].map((exp) => (
                    <div key={exp.cat} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-white">{exp.cat}</span>
                        <span className="text-[#EF4444] font-bold">${exp.amount.toLocaleString()} ({exp.pct}%)</span>
                      </div>
                      <div className="w-full bg-[#0A0D14] h-2 rounded overflow-hidden">
                        <div className="bg-[#EF4444] h-full rounded" style={{ width: `${exp.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TRANSACTIONS ENGINE */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            {/* Filter Controls Bar */}
            <div className="bg-[#141A24] border border-[#232A36] p-4 rounded-lg flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search description, entity, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-[#0A0D14] border border-[#232A36] px-3 py-2 text-xs rounded focus:border-[#10B981] outline-none text-white w-full md:w-64"
                />

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="bg-[#0A0D14] border border-[#232A36] px-3 py-2 text-xs rounded text-[#8A99AD] focus:border-[#10B981] outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Software Revenue">Software Revenue</option>
                  <option value="Consulting Revenue">Consulting Revenue</option>
                  <option value="Hosting & Servers">Hosting & Servers</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Professional Services">Professional Services</option>
                  <option value="Human Resources">Human Resources</option>
                </select>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-[#0A0D14] border border-[#232A36] px-3 py-2 text-xs rounded text-[#8A99AD] focus:border-[#10B981] outline-none"
                >
                  <option value="All">All Types</option>
                  <option value="Income">Income (+)</option>
                  <option value="Expense">Expense (-)</option>
                </select>
              </div>

              <button
                onClick={() => setIsTxModalOpen(true)}
                className="bg-[#10B981] text-[#0A0D14] font-bold px-4 py-2 text-xs rounded hover:bg-[#34D399] transition-all shrink-0 w-full md:w-auto"
              >
                + RECORD TRANSACTION
              </button>
            </div>

            {/* Transaction Data Table */}
            <div className="bg-[#141A24] border border-[#232A36] rounded-lg overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#232A36] bg-[#0A0D14] text-[#8A99AD] text-[10px] uppercase tracking-wider">
                    <th className="p-4">TX ID</th>
                    <th className="p-4">DATE</th>
                    <th className="p-4">DESCRIPTION</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">ENTITY</th>
                    <th className="p-4 text-right">AMOUNT</th>
                    <th className="p-4">METHOD</th>
                    <th className="p-4 text-center">STATUS</th>
                    <th className="p-4 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232A36]">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#1C2433] transition-colors cursor-pointer" onClick={() => setSelectedTx(tx)}>
                      <td className="p-4 font-bold text-[#10B981]">{tx.id}</td>
                      <td className="p-4 text-[#8A99AD]">{tx.date}</td>
                      <td className="p-4 font-semibold text-white">{tx.description}</td>
                      <td className="p-4 text-[#8A99AD]">{tx.category}</td>
                      <td className="p-4 text-white">{tx.entity}</td>
                      <td className={`p-4 text-right font-bold ${tx.type === 'income' ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                        {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
                      </td>
                      <td className="p-4 text-[#8A99AD]">{tx.method}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          tx.status === 'Completed' ? 'bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30' : 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30'
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="p-4 text-center" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDeleteTransaction(tx.id)}
                          className="text-[#EF4444] hover:underline text-[10px] font-bold"
                        >
                          DELETE
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-[#8A99AD]">
                        No transactions matched your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: INVOICES SYSTEM */}
        {activeTab === 'invoices' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Client Invoicing Engine</h2>
                <p className="text-[11px] text-[#8A99AD]">Automated billing, discounts, tax rates, and client payment tracking</p>
              </div>
              <button
                onClick={() => setIsCreateInvoiceOpen(true)}
                className="bg-[#10B981] text-[#0A0D14] font-bold px-4 py-2 text-xs rounded hover:bg-[#34D399] transition-all"
              >
                + GENERATE INVOICE
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {invoices.map((inv) => {
                const subtotal = inv.items.reduce((s, it) => s + (it.quantity * it.unitPrice), 0)
                const tax = (subtotal - inv.discount) * (inv.taxRate / 100)
                const total = subtotal - inv.discount + tax

                return (
                  <div key={inv.id} className="bg-[#141A24] border border-[#232A36] p-6 rounded-lg space-y-4 flex flex-col justify-between hover:border-[#10B981]/50 transition-all">
                    <div>
                      <div className="flex justify-between items-start border-b border-[#232A36] pb-3 mb-3">
                        <div>
                          <span className="text-[10px] text-[#8A99AD] uppercase tracking-wider">{inv.id}</span>
                          <h3 className="text-lg font-bold text-white">{inv.customer}</h3>
                        </div>
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                          inv.status === 'Paid' ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' :
                          inv.status === 'Overdue' ? 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40' :
                          'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                        }`}>
                          {inv.status}
                        </span>
                      </div>

                      <div className="space-y-1 text-xs text-[#8A99AD] mb-4">
                        <p>Issued: <span className="text-white">{inv.date}</span></p>
                        <p>Due Date: <span className="text-white">{inv.dueDate}</span></p>
                      </div>

                      <div className="space-y-2 border-t border-b border-[#232A36] py-3 text-xs">
                        <p className="text-[10px] text-[#8A99AD] uppercase font-bold">Line Items ({inv.items.length})</p>
                        {inv.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-white text-[11px]">
                            <span>{item.description} (x{item.quantity})</span>
                            <span className="font-bold">${(item.quantity * item.unitPrice).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between items-center text-sm font-bold text-white">
                        <span>TOTAL BALANCE</span>
                        <span className="text-[#10B981] text-base">${total.toLocaleString()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="w-full bg-[#232A36] text-white py-2 text-xs rounded font-bold hover:bg-[#2C3545] transition-all"
                        >
                          PREVIEW
                        </button>
                        <button
                          onClick={() => handleToggleInvoiceStatus(inv.id)}
                          className="w-full bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] py-2 text-xs rounded font-bold hover:bg-[#10B981] hover:text-[#0A0D14] transition-all"
                        >
                          TOGGLE {inv.status === 'Paid' ? 'UNPAID' : 'PAID'}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 4: FINANCIAL REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#141A24] border border-[#232A36] p-4 rounded-lg">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">Dynamic Financial Reporting</h2>
                <p className="text-[11px] text-[#8A99AD]">Automated audit tables across customizable date periods</p>
              </div>

              {/* Period Switcher */}
              <div className="flex bg-[#0A0D14] p-1 rounded border border-[#232A36] text-xs">
                {(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setReportPeriod(p)}
                    className={`px-3 py-1 rounded uppercase font-bold text-[10px] ${reportPeriod === p ? 'bg-[#10B981] text-[#0A0D14]' : 'text-[#8A99AD] hover:text-white'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Statement Table */}
            <div className="bg-[#141A24] border border-[#232A36] p-6 rounded-lg space-y-6">
              <h3 className="text-xs font-bold text-[#10B981] uppercase tracking-wider">
                INCOME STATEMENT AUDIT // PERIOD: {reportPeriod.toUpperCase()}
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-[#232A36] pb-2 font-bold text-white">
                  <span>GROSS REVENUE</span>
                  <span className="text-[#10B981]">${totalIncome.toLocaleString()}</span>
                </div>
                <div className="pl-4 space-y-1 text-[#8A99AD]">
                  <div className="flex justify-between"><span>Software Revenue & Licenses</span><span>$32,100</span></div>
                  <div className="flex justify-between"><span>Consulting & Custom Retainers</span><span>$8,200</span></div>
                </div>

                <div className="flex justify-between border-b border-[#232A36] pb-2 pt-4 font-bold text-white">
                  <span>TOTAL OPERATING EXPENSES</span>
                  <span className="text-[#EF4444]">${totalExpenses.toLocaleString()}</span>
                </div>
                <div className="pl-4 space-y-1 text-[#8A99AD]">
                  <div className="flex justify-between"><span>Hosting, Cloud & Servers</span><span>$2,340</span></div>
                  <div className="flex justify-between"><span>Facilities & Space</span><span>$3,500</span></div>
                  <div className="flex justify-between"><span>Audit & Compliance</span><span>$1,800</span></div>
                  <div className="flex justify-between"><span>Human Resources & Payroll</span><span>$420</span></div>
                </div>

                <div className="flex justify-between border-t border-b border-[#10B981] py-3 text-sm font-extrabold text-white bg-[#0A0D14] px-4 rounded mt-6">
                  <span>NET OPERATING INCOME</span>
                  <span className="text-[#10B981]">${netProfit.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* RECORD TRANSACTION MODAL */}
      {isTxModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141A24] border border-[#232A36] rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#232A36] pb-3">
              <h3 className="text-sm font-bold text-white uppercase">RECORD NEW TRANSACTION</h3>
              <button onClick={() => setIsTxModalOpen(false)} className="text-[#8A99AD] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddTransaction} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Description</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Q1 Design Contract Payment"
                  value={newTx.description}
                  onChange={(e) => setNewTx({ ...newTx, description: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Customer / Vendor Entity</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Acme Corp"
                  value={newTx.entity}
                  onChange={(e) => setNewTx({ ...newTx, entity: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Type</label>
                  <select
                    value={newTx.type}
                    onChange={(e) => setNewTx({ ...newTx, type: e.target.value as 'income' | 'expense' })}
                    className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                  >
                    <option value="income">Income (+)</option>
                    <option value="expense">Expense (-)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Amount ($ USD)</label>
                  <input
                    required
                    type="number"
                    placeholder="5000"
                    value={newTx.amount || ''}
                    onChange={(e) => setNewTx({ ...newTx, amount: Number(e.target.value) })}
                    className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Category</label>
                <select
                  value={newTx.category}
                  onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                >
                  <option value="Software Revenue">Software Revenue</option>
                  <option value="Consulting Revenue">Consulting Revenue</option>
                  <option value="Hosting & Servers">Hosting & Servers</option>
                  <option value="Facilities">Facilities</option>
                  <option value="Professional Services">Professional Services</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsTxModalOpen(false)}
                  className="px-4 py-2 bg-[#232A36] text-white rounded font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10B981] text-[#0A0D14] rounded font-bold hover:bg-[#34D399]"
                >
                  SAVE RECORD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE INVOICE MODAL */}
      {isCreateInvoiceOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141A24] border border-[#232A36] rounded-lg max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#232A36] pb-3">
              <h3 className="text-sm font-bold text-white uppercase">GENERATE CLIENT INVOICE</h3>
              <button onClick={() => setIsCreateInvoiceOpen(false)} className="text-[#8A99AD] hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Client / Customer Name</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Apex Dynamics"
                  value={newInvoice.customer}
                  onChange={(e) => setNewInvoice({ ...newInvoice, customer: e.target.value })}
                  className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Due Date</label>
                  <input
                    type="date"
                    value={newInvoice.dueDate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                    className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#8A99AD] uppercase block mb-1">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={newInvoice.taxRate}
                    onChange={(e) => setNewInvoice({ ...newInvoice, taxRate: Number(e.target.value) })}
                    className="w-full bg-[#0A0D14] border border-[#232A36] p-2.5 rounded text-white focus:border-[#10B981] outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsCreateInvoiceOpen(false)}
                  className="px-4 py-2 bg-[#232A36] text-white rounded font-bold"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#10B981] text-[#0A0D14] rounded font-bold hover:bg-[#34D399]"
                >
                  CREATE INVOICE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW INVOICE DRAWER */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="bg-[#141A24] border-l border-[#232A36] h-full w-full max-w-md p-8 space-y-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center border-b border-[#232A36] pb-4 mb-6">
                <div>
                  <span className="text-xs font-bold text-[#10B981]">{selectedInvoice.id}</span>
                  <h3 className="text-xl font-bold text-white">{selectedInvoice.customer}</h3>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="text-[#8A99AD] hover:text-white">✕</button>
              </div>

              <div className="space-y-4 text-xs text-[#8A99AD]">
                <p>Date Issued: <span className="text-white font-bold">{selectedInvoice.date}</span></p>
                <p>Due Date: <span className="text-white font-bold">{selectedInvoice.dueDate}</span></p>
                <p>Status: <span className="text-[#10B981] font-bold">{selectedInvoice.status}</span></p>

                <div className="border-t border-[#232A36] pt-4 space-y-2">
                  <p className="text-[10px] text-[#8A99AD] uppercase font-bold">Line Items</p>
                  {selectedInvoice.items.map((it) => (
                    <div key={it.id} className="flex justify-between text-white">
                      <span>{it.description} (x{it.quantity})</span>
                      <span className="font-bold">${(it.quantity * it.unitPrice).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="w-full py-3 bg-[#10B981] text-[#0A0D14] font-bold rounded"
            >
              CLOSE PREVIEW
            </button>
          </div>
        </div>
      )}

      {/* PREVIEW TRANSACTION MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141A24] border border-[#232A36] rounded-lg max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-[#232A36] pb-3">
              <h3 className="text-xs font-bold text-[#10B981] uppercase">TRANSACTION RECORD DETAILS</h3>
              <button onClick={() => setSelectedTx(null)} className="text-[#8A99AD] hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-[#8A99AD]">ID:</span><span className="text-white font-bold">{selectedTx.id}</span></div>
              <div className="flex justify-between"><span className="text-[#8A99AD]">Date:</span><span className="text-white">{selectedTx.date}</span></div>
              <div className="flex justify-between"><span className="text-[#8A99AD]">Description:</span><span className="text-white font-bold">{selectedTx.description}</span></div>
              <div className="flex justify-between"><span className="text-[#8A99AD]">Entity:</span><span className="text-white">{selectedTx.entity}</span></div>
              <div className="flex justify-between"><span className="text-[#8A99AD]">Category:</span><span className="text-white">{selectedTx.category}</span></div>
              <div className="flex justify-between"><span className="text-[#8A99AD]">Payment Method:</span><span className="text-white">{selectedTx.method}</span></div>
              <div className="flex justify-between items-center border-t border-[#232A36] pt-3 text-sm font-bold">
                <span className="text-white">Amount</span>
                <span className={selectedTx.type === 'income' ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                  {selectedTx.type === 'income' ? '+' : '-'}${selectedTx.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                onClick={() => handleDeleteTransaction(selectedTx.id)}
                className="px-4 py-2 bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] rounded font-bold hover:bg-[#EF4444] hover:text-white transition-all"
              >
                DELETE RECORD
              </button>
              <button
                onClick={() => setSelectedTx(null)}
                className="px-4 py-2 bg-[#232A36] text-white rounded font-bold"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
