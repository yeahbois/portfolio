'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Transaction {
  id: string
  date: string
  description: string
  category: 'Revenue' | 'Software' | 'Payroll' | 'Marketing' | 'Consulting' | 'Office'
  entity: string
  type: 'Income' | 'Expense'
  amount: number
  method: 'Wire Transfer' | 'Stripe' | 'Credit Card' | 'ACH'
  status: 'Completed' | 'Pending' | 'Overdue'
}

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
}

interface Invoice {
  id: string
  customerName: string
  customerEmail: string
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  taxRate: number
  discountRate: number
  status: 'Paid' | 'Unpaid' | 'Overdue'
}

const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'TXN-8041',
    date: '2025-05-14',
    description: 'Enterprise License Renewal',
    category: 'Revenue',
    entity: 'Acme Global Corp',
    type: 'Income',
    amount: 18500,
    method: 'Wire Transfer',
    status: 'Completed'
  },
  {
    id: 'TXN-8042',
    date: '2025-05-13',
    description: 'AWS Cloud Infrastructure',
    category: 'Software',
    entity: 'Amazon Web Services',
    type: 'Expense',
    amount: 3420,
    method: 'Credit Card',
    status: 'Completed'
  },
  {
    id: 'TXN-8043',
    date: '2025-05-12',
    description: 'Q2 Engineering Team Payroll',
    category: 'Payroll',
    entity: 'Gusto Payroll',
    type: 'Expense',
    amount: 24500,
    method: 'ACH',
    status: 'Completed'
  },
  {
    id: 'TXN-8044',
    date: '2025-05-10',
    description: 'B2B Growth Campaign',
    category: 'Marketing',
    entity: 'Google Ads',
    type: 'Expense',
    amount: 4200,
    method: 'Stripe',
    status: 'Completed'
  },
  {
    id: 'TXN-8045',
    date: '2025-05-08',
    description: 'Custom AI Architecture Retainer',
    category: 'Consulting',
    entity: 'Apex Ventures',
    type: 'Income',
    amount: 12000,
    method: 'Wire Transfer',
    status: 'Pending'
  }
]

const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'INV-2025-01',
    customerName: 'Aethelgard Dynamics',
    customerEmail: 'billing@aethelgard.com',
    issueDate: '2025-05-01',
    dueDate: '2025-05-31',
    items: [
      { description: 'Full-Stack Next.js SaaS Architecture', quantity: 1, unitPrice: 12000 },
      { description: 'Database Schema Optimization & RLS Policies', quantity: 15, unitPrice: 150 }
    ],
    taxRate: 10,
    discountRate: 5,
    status: 'Unpaid'
  },
  {
    id: 'INV-2025-02',
    customerName: 'Starlight Logistics',
    customerEmail: 'finance@starlight.io',
    issueDate: '2025-04-15',
    dueDate: '2025-05-15',
    items: [
      { description: 'Automated Workflow Engine Integration', quantity: 1, unitPrice: 8500 }
    ],
    taxRate: 10,
    discountRate: 0,
    status: 'Paid'
  }
]

export default function LedgerPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'invoices' | 'reports'>('overview')
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly')

  // Transaction state
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedStatus, setSelectedStatus] = useState<string>('All')
  const [txnModalOpen, setTxnModalOpen] = useState(false)
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null)

  // New Transaction Form
  const [newTxnDesc, setNewTxnDesc] = useState('')
  const [newTxnCategory, setNewTxnCategory] = useState<'Revenue' | 'Software' | 'Payroll' | 'Marketing' | 'Consulting' | 'Office'>('Revenue')
  const [newTxnEntity, setNewTxnEntity] = useState('')
  const [newTxnType, setNewTxnType] = useState<'Income' | 'Expense'>('Income')
  const [newTxnAmount, setNewTxnAmount] = useState('')
  const [newTxnMethod, setNewTxnMethod] = useState<'Wire Transfer' | 'Stripe' | 'Credit Card' | 'ACH'>('Wire Transfer')

  // Invoice state
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES)
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)

  // New Invoice Form
  const [invCustomer, setInvCustomer] = useState('')
  const [invEmail, setInvEmail] = useState('')
  const [invItemDesc, setInvItemDesc] = useState('')
  const [invItemQty, setInvItemQty] = useState(1)
  const [invItemPrice, setInvItemPrice] = useState(0)

  // Financial Calculations
  const totalRevenue = transactions
    .filter((t) => t.type === 'Income' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0) + 112000

  const totalExpenses = transactions
    .filter((t) => t.type === 'Expense' && t.status === 'Completed')
    .reduce((sum, t) => sum + t.amount, 0) + 26000

  const netProfit = totalRevenue - totalExpenses
  const cashBalance = 198450

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || t.category === selectedCategory
    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTxnDesc || !newTxnAmount) return

    const newTxn: Transaction = {
      id: `TXN-${Math.floor(8050 + Math.random() * 900)}`,
      date: new Date().toISOString().split('T')[0],
      description: newTxnDesc,
      category: newTxnCategory,
      entity: newTxnEntity || 'Direct Billing',
      type: newTxnType,
      amount: Number(newTxnAmount),
      method: newTxnMethod,
      status: 'Completed'
    }

    setTransactions([newTxn, ...transactions])
    setTxnModalOpen(false)
    setNewTxnDesc('')
    setNewTxnAmount('')
    setNewTxnEntity('')
  }

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault()
    if (!invCustomer || !invItemDesc) return

    const newInv: Invoice = {
      id: `INV-2025-0${invoices.length + 1}`,
      customerName: invCustomer,
      customerEmail: invEmail || 'billing@client.com',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2025-06-15',
      items: [{ description: invItemDesc, quantity: Number(invItemQty), unitPrice: Number(invItemPrice) }],
      taxRate: 10,
      discountRate: 0,
      status: 'Unpaid'
    }

    setInvoices([newInv, ...invoices])
    setInvoiceModalOpen(false)
    setInvCustomer('')
    setInvItemDesc('')
  }

  const calculateInvoiceSubtotal = (inv: Invoice) => {
    return inv.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  }

  const calculateInvoiceTotal = (inv: Invoice) => {
    const subtotal = calculateInvoiceSubtotal(inv)
    const discount = subtotal * (inv.discountRate / 100)
    const tax = (subtotal - discount) * (inv.taxRate / 100)
    return Math.round(subtotal - discount + tax)
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#E2E8F0] font-mono selection:bg-[#38BDF8] selection:text-[#0B0F19]">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800 bg-[#070A12] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-black tracking-widest text-sky-400">
              LEDGER // TERMINAL
            </span>
            <span className="text-[10px] border border-sky-500/30 text-sky-400 px-2 py-0.5 rounded bg-sky-950/40 font-bold">
              FINANCIAL TERMINAL v4.2
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs">
            <div className="hidden md:flex items-center space-x-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">ACCOUNTS SYNCED</span>
            </div>

            <Link href="/" className="text-slate-400 hover:text-white transition-colors">
              ← Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Main Terminal Layout */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
          <div className="flex gap-2 text-xs bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'overview' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 Financial Overview
            </button>
            <button
              onClick={() => setActiveTab('transactions')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'transactions' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              💳 Transactions ({transactions.length})
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'invoices' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📄 Invoice System ({invoices.length})
            </button>
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === 'reports' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📈 Financial Reports
            </button>
          </div>

          {/* Time Range Switcher */}
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <span>PERIOD:</span>
            {(['daily', 'weekly', 'monthly', 'quarterly', 'yearly'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-2.5 py-1 rounded uppercase ${
                  timeRange === r ? 'bg-slate-800 text-sky-400 font-bold border border-slate-700' : 'hover:text-white'
                }`}
              >
                {r[0].toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            TAB 1: FINANCIAL OVERVIEW
           ======================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
              <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-[10px]">TOTAL REVENUE</span>
                <p className="text-2xl font-bold text-emerald-400">${totalRevenue.toLocaleString()}</p>
                <span className="text-[10px] text-emerald-400 block">↑ +18.2% MoM</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-[10px]">TOTAL EXPENSES</span>
                <p className="text-2xl font-bold text-rose-400">${totalExpenses.toLocaleString()}</p>
                <span className="text-[10px] text-slate-500 block">34.8% Expense Ratio</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-[10px]">NET PROFIT</span>
                <p className="text-2xl font-bold text-sky-400">${netProfit.toLocaleString()}</p>
                <span className="text-[10px] text-sky-400 block">65.2% Profit Margin</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-[10px]">CASH BALANCE</span>
                <p className="text-2xl font-bold text-white">${cashBalance.toLocaleString()}</p>
                <span className="text-[10px] text-slate-500 block">Liquid Assets</span>
              </div>

              <div className="bg-[#0F172A] border border-slate-800 p-5 rounded-2xl space-y-2">
                <span className="text-slate-400 uppercase text-[10px]">OUTSTANDING INVOICES</span>
                <p className="text-2xl font-bold text-amber-400">$12,400</p>
                <span className="text-[10px] text-amber-400 block">2 Pending Receivables</span>
              </div>
            </div>

            {/* Financial Visual Terminal Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs">
              {/* Revenue vs Expense Bar Graph Simulation */}
              <div className="lg:col-span-8 bg-[#0F172A] border border-slate-800 p-6 rounded-2xl space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-white uppercase">Revenue vs Expense Growth Trend</h3>
                  <div className="flex space-x-4 text-[10px]">
                    <span className="flex items-center gap-1.5 text-emerald-400"><span className="w-2.5 h-2.5 bg-emerald-400 rounded-sm"></span> Revenue</span>
                    <span className="flex items-center gap-1.5 text-rose-400"><span className="w-2.5 h-2.5 bg-rose-400 rounded-sm"></span> Expense</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {[
                    { month: 'Jan 2025', rev: 85, exp: 30 },
                    { month: 'Feb 2025', rev: 92, exp: 28 },
                    { month: 'Mar 2025', rev: 110, exp: 35 },
                    { month: 'Apr 2025', rev: 128, exp: 42 },
                    { month: 'May 2025', rev: 142, exp: 38 }
                  ].map((bar) => (
                    <div key={bar.month} className="space-y-1">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>{bar.month}</span>
                        <span>${bar.rev}k / ${bar.exp}k</span>
                      </div>
                      <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden flex">
                        <div style={{ width: `${(bar.rev / 160) * 100}%` }} className="bg-emerald-500 h-full"></div>
                        <div style={{ width: `${(bar.exp / 160) * 100}%` }} className="bg-rose-500 h-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expense Breakdown & Top Accounts */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase">Expense Categories</h3>
                  <div className="space-y-3 text-[11px]">
                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Engineering Payroll</span>
                        <span className="font-bold text-white">52%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="w-[52%] bg-sky-400 h-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Cloud Infrastructure (AWS)</span>
                        <span className="font-bold text-white">24%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="w-[24%] bg-indigo-400 h-full"></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-300 mb-1">
                        <span>Growth Marketing</span>
                        <span className="font-bold text-white">14%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                        <div className="w-[14%] bg-amber-400 h-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase">Top Enterprise Clients</h3>
                  <ul className="space-y-2 text-slate-300 text-[11px]">
                    <li className="flex justify-between py-1 border-b border-slate-800">
                      <span>Acme Global Corp</span>
                      <strong className="text-emerald-400">$64,000</strong>
                    </li>
                    <li className="flex justify-between py-1 border-b border-slate-800">
                      <span>Aethelgard Dynamics</span>
                      <strong className="text-emerald-400">$48,500</strong>
                    </li>
                    <li className="flex justify-between py-1">
                      <span>Apex Ventures</span>
                      <strong className="text-emerald-400">$30,000</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 2: TRANSACTIONS ENGINE
           ======================================================== */}
        {activeTab === 'transactions' && (
          <div className="space-y-6 text-xs">
            {/* Filter and Add Bar */}
            <div className="flex flex-col lg:flex-row justify-between gap-4 bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
              <div className="flex flex-wrap gap-3 flex-1">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search description, entity, ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-white outline-none focus:border-sky-400 w-full sm:w-64"
                />

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-sky-400"
                >
                  <option value="All">All Categories</option>
                  <option value="Revenue">Revenue</option>
                  <option value="Software">Software</option>
                  <option value="Payroll">Payroll</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Consulting">Consulting</option>
                </select>

                {/* Status Filter */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl text-white outline-none focus:border-sky-400"
                >
                  <option value="All">All Statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>

              <button
                onClick={() => setTxnModalOpen(true)}
                className="px-5 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-xl hover:bg-sky-400 transition-all uppercase tracking-wider whitespace-nowrap"
              >
                + Add Transaction
              </button>
            </div>

            {/* Transactions Table */}
            <div className="bg-[#0F172A] border border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                      <th className="p-4">Transaction ID</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Description</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Customer/Vendor</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredTransactions.map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => setSelectedTxn(t)}
                        className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                      >
                        <td className="p-4 font-bold text-sky-400">{t.id}</td>
                        <td className="p-4 text-slate-400">{t.date}</td>
                        <td className="p-4 font-bold text-white">{t.description}</td>
                        <td className="p-4">
                          <span className="border border-slate-700 bg-slate-900 px-2 py-0.5 rounded text-[10px]">
                            {t.category}
                          </span>
                        </td>
                        <td className="p-4 text-slate-300">{t.entity}</td>
                        <td className="p-4 text-slate-400">{t.method}</td>
                        <td className={`p-4 font-bold ${t.type === 'Income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {t.type === 'Income' ? '+' : '-'}${t.amount.toLocaleString()}
                        </td>
                        <td className="p-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            t.status === 'Completed'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}>
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 3: INVOICE BUILDER
           ======================================================== */}
        {activeTab === 'invoices' && (
          <div className="space-y-6 text-xs">
            <div className="flex justify-between items-center bg-[#0F172A] border border-slate-800 p-4 rounded-2xl">
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Client Invoice Generator</h3>
                <p className="text-slate-400 text-[11px]">Create multi-item B2B invoices with dynamic tax calculations.</p>
              </div>

              <button
                onClick={() => setInvoiceModalOpen(true)}
                className="px-5 py-2.5 bg-sky-500 text-slate-950 font-bold rounded-xl hover:bg-sky-400 transition-all uppercase tracking-wider"
              >
                + Generate New Invoice
              </button>
            </div>

            {/* Invoices List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invoices.map((inv) => {
                const total = calculateInvoiceTotal(inv)
                return (
                  <div
                    key={inv.id}
                    className="bg-[#0F172A] border border-slate-800 p-6 rounded-2xl space-y-4 hover:border-slate-700 transition-all"
                  >
                    <div className="flex justify-between items-start border-b border-slate-800 pb-3">
                      <div>
                        <span className="font-bold text-sky-400">{inv.id}</span>
                        <h4 className="text-base font-bold text-white mt-1">{inv.customerName}</h4>
                        <p className="text-[11px] text-slate-400">{inv.customerEmail}</p>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {inv.status}
                      </span>
                    </div>

                    <div className="space-y-2 text-[11px]">
                      <p className="text-slate-400 uppercase text-[10px]">INVOICE LINE ITEMS:</p>
                      {inv.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-slate-200 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                          <span>{item.description} (x{item.quantity})</span>
                          <span className="font-bold">${item.quantity * item.unitPrice}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="text-slate-500 text-[10px] block">DUE DATE</span>
                        <span className="text-slate-300">{inv.dueDate}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-slate-500 text-[10px] block">FINAL AMOUNT</span>
                        <span className="text-lg font-bold text-emerald-400">${total.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="w-full py-2 bg-slate-900 border border-slate-700 hover:border-sky-400 text-sky-400 rounded-xl transition-all font-bold"
                    >
                      View Printable Invoice Preview →
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================
            TAB 4: FINANCIAL REPORTS
           ======================================================== */}
        {activeTab === 'reports' && (
          <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-2xl space-y-6 text-xs font-mono">
            <div>
              <h3 className="text-base font-bold text-white uppercase">Financial Audit & Profit Statement</h3>
              <p className="text-slate-400">Statement generated for active period ({timeRange.toUpperCase()})</p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-300">Gross Software Revenue</span>
                <span className="font-bold text-emerald-400">$142,500.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-300">Consulting & Retainers</span>
                <span className="font-bold text-emerald-400">$18,000.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-300">Cost of Goods Sold (AWS & Cloud)</span>
                <span className="font-bold text-rose-400">-$12,420.00</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-800">
                <span className="text-slate-300">Operating Expenses (Payroll & Marketing)</span>
                <span className="font-bold text-rose-400">-$45,780.00</span>
              </div>
              <div className="flex justify-between py-3 font-bold text-sm bg-slate-900 p-4 rounded-xl border border-slate-800">
                <span className="text-white">NET OPERATING INCOME (EBITDA)</span>
                <span className="text-sky-400">$102,300.00</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Transaction Modal */}
      {txnModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl max-w-md w-full p-8 relative space-y-6 font-mono text-xs shadow-2xl">
            <button
              onClick={() => setTxnModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-white uppercase">Add New Transaction</h3>

            <form onSubmit={handleAddTransaction} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">DESCRIPTION</label>
                <input
                  type="text"
                  required
                  value={newTxnDesc}
                  onChange={(e) => setNewTxnDesc(e.target.value)}
                  placeholder="e.g. Mobile App Dev Retainer"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">TYPE</label>
                  <select
                    value={newTxnType}
                    onChange={(e) => setNewTxnType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                  >
                    <option value="Income">Income (+)</option>
                    <option value="Expense">Expense (-)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">AMOUNT ($)</label>
                  <input
                    type="number"
                    required
                    value={newTxnAmount}
                    onChange={(e) => setNewTxnAmount(e.target.value)}
                    placeholder="5000"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">CUSTOMER / VENDOR ENTITY</label>
                <input
                  type="text"
                  value={newTxnEntity}
                  onChange={(e) => setNewTxnEntity(e.target.value)}
                  placeholder="e.g. TechCorp Inc."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sky-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-sky-400 transition-all"
              >
                Save Transaction Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {invoiceModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0F172A] border border-slate-700 rounded-2xl max-w-md w-full p-8 relative space-y-6 font-mono text-xs shadow-2xl">
            <button
              onClick={() => setInvoiceModalOpen(false)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <h3 className="text-base font-bold text-white uppercase">Generate B2B Invoice</h3>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">CLIENT COMPANY NAME</label>
                <input
                  type="text"
                  required
                  value={invCustomer}
                  onChange={(e) => setInvCustomer(e.target.value)}
                  placeholder="e.g. Zenith Global Ltd"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">SERVICE ITEM DESCRIPTION</label>
                <input
                  type="text"
                  required
                  value={invItemDesc}
                  onChange={(e) => setInvItemDesc(e.target.value)}
                  placeholder="e.g. Custom AI Chatbot Development"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">QTY</label>
                  <input
                    type="number"
                    value={invItemQty}
                    onChange={(e) => setInvItemQty(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">UNIT RATE ($)</label>
                  <input
                    type="number"
                    value={invItemPrice}
                    onChange={(e) => setInvItemPrice(Number(e.target.value))}
                    placeholder="7500"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-sky-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-sky-400 transition-all"
              >
                Create Invoice Record
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Detail Printable Preview Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-xl w-full p-8 relative space-y-6 font-mono text-xs shadow-2xl">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white text-xl"
            >
              ✕
            </button>

            <div className="border-b border-slate-800 pb-4 flex justify-between items-start">
              <div>
                <span className="text-sky-400 font-bold text-lg">{selectedInvoice.id}</span>
                <p className="text-slate-400 text-[10px]">INVOICE STATEMENT</p>
              </div>
              <div className="text-right">
                <span className="text-white font-bold">{selectedInvoice.customerName}</span>
                <p className="text-slate-400 text-[10px]">{selectedInvoice.customerEmail}</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-bold text-slate-400 uppercase text-[10px]">LINE ITEMS:</p>
              {selectedInvoice.items.map((item, i) => (
                <div key={i} className="flex justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span>{item.description} (x{item.quantity})</span>
                  <span className="font-bold text-white">${item.quantity * item.unitPrice}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-1 text-right">
              <p className="text-slate-400">Subtotal: ${calculateInvoiceSubtotal(selectedInvoice)}</p>
              <p className="text-slate-400">Tax ({selectedInvoice.taxRate}%): +${Math.round(calculateInvoiceSubtotal(selectedInvoice) * 0.1)}</p>
              <p className="text-xl font-bold text-emerald-400 pt-2">
                Total Due: ${calculateInvoiceTotal(selectedInvoice)}
              </p>
            </div>

            <button
              onClick={() => {
                alert('Invoice PDF printed!')
                setSelectedInvoice(null)
              }}
              className="w-full py-3 bg-sky-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-sky-400 transition-all"
            >
              Print / Download PDF Invoice
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
        <p>LEDGER Financial SaaS Terminal • Crafted for Client Showcase by Marcello Lienarta</p>
      </footer>
    </div>
  )
}
