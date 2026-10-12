'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Room {
  id: string
  name: string
  type: 'Deluxe' | 'Suite' | 'Penthouse' | 'Villa'
  capacity: number
  bed: string
  pricePerNight: number
  image: string
  amenities: string[]
  description: string
  available: boolean
}

interface Reservation {
  id: string
  guestName: string
  guestEmail: string
  roomName: string
  checkIn: string
  checkOut: string
  nights: number
  totalPrice: number
  status: 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Cancelled'
  addons: string[]
}

interface WorkflowRule {
  id: string
  trigger: string
  actions: string[]
  enabled: boolean
}

const ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'The Alpine Panorama Suite',
    type: 'Suite',
    capacity: 2,
    bed: '1 King Bed',
    pricePerNight: 320,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Balcony', 'Mountain View', 'Fireplace', 'Rainfall Shower', 'Free Wi-Fi'],
    description: 'Breathtaking 180-degree mountain views with floor-to-ceiling glass windows, private sauna, and custom oak furnishings.',
    available: true
  },
  {
    id: 'room-2',
    name: 'Executive Garden Villa',
    type: 'Villa',
    capacity: 4,
    bed: '2 King Beds',
    pricePerNight: 550,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    amenities: ['Private Heated Pool', 'Butler Service', 'Kitchenette', 'Espresso Bar'],
    description: 'Secluded luxury villa nestled amidst botanical gardens featuring a private infinity plunge pool and dedicated butler.',
    available: true
  },
  {
    id: 'room-3',
    name: 'Velvet Horizon Deluxe Room',
    type: 'Deluxe',
    capacity: 2,
    bed: '1 Queen Bed',
    pricePerNight: 210,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    amenities: ['City Skyline View', 'Marble Bath', 'Smart Room Control', 'Mini Bar'],
    description: 'Elegantly proportioned urban sanctuary combining muted velvet textures with state-of-the-art room automation.',
    available: true
  },
  {
    id: 'room-4',
    name: 'Presidential Summit Penthouse',
    type: 'Penthouse',
    capacity: 6,
    bed: '3 King Beds',
    pricePerNight: 1200,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    amenities: ['Rooftop Terrace', 'Helipad Access', 'Wine Cellar', 'Private Chef Kitchen'],
    description: 'The pinnacle of luxury hospitality occupying the entire top floor, featuring a wrap-around sky terrace.',
    available: false
  }
]

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SF-1082',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    roomName: 'The Alpine Panorama Suite',
    checkIn: '2025-05-18',
    checkOut: '2025-05-21',
    nights: 3,
    totalPrice: 1056,
    status: 'Confirmed',
    addons: ['Spa Package', 'Breakfast Buffet']
  },
  {
    id: 'SF-1083',
    guestName: 'Alexander Hayes',
    guestEmail: 'a.hayes@techcorp.io',
    roomName: 'Executive Garden Villa',
    checkIn: '2025-05-15',
    checkOut: '2025-05-17',
    nights: 2,
    totalPrice: 1210,
    status: 'Checked-In',
    addons: ['Airport Transfer']
  },
  {
    id: 'SF-1084',
    guestName: 'Sophia Martinez',
    guestEmail: 'sophia.m@designstudio.co',
    roomName: 'Velvet Horizon Deluxe Room',
    checkIn: '2025-05-14',
    checkOut: '2025-05-15',
    nights: 1,
    totalPrice: 231,
    status: 'Checked-Out',
    addons: []
  }
]

const INITIAL_WORKFLOWS: WorkflowRule[] = [
  {
    id: 'wf-1',
    trigger: 'Reservation is Created',
    actions: ['Send Instant Email Confirmation', 'Generate QR Check-in Pass', 'Notify Front Desk Slack'],
    enabled: true
  },
  {
    id: 'wf-2',
    trigger: '24 Hours Before Check-in',
    actions: ['Send Pre-Arrival Instructions Email', 'Send Mobile Key Pass', 'Assign Housekeeping Priority'],
    enabled: true
  },
  {
    id: 'wf-3',
    trigger: 'Guest Checkout Completed',
    actions: ['Send Thank You & Review Request Email', 'Alert Housekeeping for Deep Clean', 'Sync Accounting Ledger'],
    enabled: true
  },
  {
    id: 'wf-4',
    trigger: 'VIP Guest Booking',
    actions: ['Notify General Manager', 'Schedule Complimentary Champagne Welcome'],
    enabled: true
  }
]

export default function StayFlowPage() {
  const [viewMode, setViewMode] = useState<'guest' | 'admin'>('guest')
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'reservations' | 'automation' | 'templates'>('overview')

  // Guest booking engine state
  const [searchCheckIn, setSearchCheckIn] = useState('2025-05-20')
  const [searchCheckOut, setSearchCheckOut] = useState('2025-05-23')
  const [guestsCount, setGuestsCount] = useState(2)
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [includeBreakfast, setIncludeBreakfast] = useState(true)
  const [includeSpa, setIncludeSpa] = useState(false)
  const [includeTransfer, setIncludeTransfer] = useState(false)
  const [guestName, setGuestName] = useState('')
  const [guestEmail, setGuestEmail] = useState('')
  const [bookingConfirmed, setBookingConfirmed] = useState<Reservation | null>(null)

  // Admin state
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS)
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(INITIAL_WORKFLOWS)
  const [selectedTemplate, setSelectedTemplate] = useState('Booking Confirmation')
  const [templateSubject, setTemplateSubject] = useState('Your Reservation #{{booking_id}} at StayFlow Resort is Confirmed')
  const [templateBody, setTemplateBody] = useState(
    'Dear {{guest_name}},\n\nThank you for choosing StayFlow Resort. Your reservation for {{room_name}} from {{check_in}} to {{check_out}} has been confirmed.\n\nTotal Paid: €{{total_price}}\n\nWe look forward to giving you an exceptional stay.'
  )

  const calculateNights = () => {
    const start = new Date(searchCheckIn).getTime()
    const end = new Date(searchCheckOut).getTime()
    const diff = Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)))
    return isNaN(diff) ? 3 : diff
  }

  const nights = calculateNights()

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRoom) return

    const basePrice = selectedRoom.pricePerNight * nights
    let addonsTotal = 0
    const addonsList: string[] = []
    if (includeBreakfast) {
      addonsTotal += 25 * nights * guestsCount
      addonsList.push('Daily Gourmet Breakfast')
    }
    if (includeSpa) {
      addonsTotal += 120
      addonsList.push('Thermal Spa Pass')
    }
    if (includeTransfer) {
      addonsTotal += 80
      addonsList.push('Private Chauffeur Transfer')
    }

    const totalWithTax = Math.round((basePrice + addonsTotal) * 1.1)

    const newRes: Reservation = {
      id: `SF-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: guestName || 'Valued Guest',
      guestEmail: guestEmail || 'guest@stayflow.com',
      roomName: selectedRoom.name,
      checkIn: searchCheckIn,
      checkOut: searchCheckOut,
      nights,
      totalPrice: totalWithTax,
      status: 'Confirmed',
      addons: addonsList
    }

    setReservations([newRes, ...reservations])
    setBookingConfirmed(newRes)
  }

  return (
    <div className="min-h-screen bg-[#0F141C] text-[#E2E8F0] font-sans">
      {/* Top Bar Switcher Header */}
      <header className="border-b border-slate-800 bg-[#0B0E14] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold font-serif tracking-tight text-amber-400">
              STAYFLOW
            </span>
            <span className="text-[10px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              HOSPITALITY AUTOMATION PLATFORM
            </span>
          </div>

          {/* Mode Toggle Switcher */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-full p-1 font-mono text-xs">
            <button
              onClick={() => setViewMode('guest')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                viewMode === 'guest'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏨 Guest Booking Portal
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-4 py-1.5 rounded-full transition-all ${
                viewMode === 'admin'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Staff Admin & Workflows
            </button>
          </div>

          <Link href="/" className="text-xs font-mono text-slate-400 hover:text-white transition-colors">
            ← Portfolio
          </Link>
        </div>
      </header>

      {/* ========================================================
          GUEST BOOKING ENGINE VIEW
         ======================================================== */}
      {viewMode === 'guest' && (
        <div>
          {/* Guest Hero Section */}
          <section className="relative py-20 px-6 border-b border-slate-800 bg-gradient-to-b from-[#141A24] to-[#0F141C]">
            <div className="max-w-6xl mx-auto text-center space-y-6">
              <span className="font-mono text-xs tracking-widest text-amber-400 uppercase border border-amber-500/30 px-3 py-1 rounded-full bg-amber-500/10">
                BOUTIQUE ALPINE RESORT & AUTOMATED STAY
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-slate-100 tracking-tight">
                Sanctuary in the Peaks. <br />
                <span className="text-amber-400 italic">Seamlessly Automated.</span>
              </h1>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                Experience bespoke hospitality with instant check-in passes, keyless room entry, and tailored guest concierge services.
              </p>

              {/* Search Bar Widget */}
              <div className="bg-slate-900/90 border border-slate-700/80 p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 text-left font-mono text-xs">
                <div>
                  <label className="block text-slate-400 mb-1 font-bold">CHECK-IN</label>
                  <input
                    type="date"
                    value={searchCheckIn}
                    onChange={(e) => setSearchCheckIn(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">CHECK-OUT</label>
                  <input
                    type="date"
                    value={searchCheckOut}
                    onChange={(e) => setSearchCheckOut(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1 font-bold">GUESTS</label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-amber-400"
                  >
                    <option value={1}>1 Guest</option>
                    <option value={2}>2 Guests</option>
                    <option value={4}>4 Guests</option>
                    <option value={6}>6+ Guests</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      const el = document.getElementById('rooms-list')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-lg hover:bg-amber-400 transition-all uppercase tracking-wider"
                  >
                    Search Rooms
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Rooms Grid */}
          <section id="rooms-list" className="py-16 px-6 max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-1">
                  AVAILABLE SUITES ({nights} NIGHTS)
                </span>
                <h2 className="text-3xl font-serif font-bold text-white">Select Your Residence</h2>
              </div>

              <div className="font-mono text-xs text-slate-400">
                Calculated for {guestsCount} guest(s) • {searchCheckIn} to {searchCheckOut}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {ROOMS.map((room) => {
                const totalStayPrice = room.pricePerNight * nights
                return (
                  <div
                    key={room.id}
                    className="border border-slate-800 bg-slate-900/60 rounded-3xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Room Image */}
                      <div className="h-56 overflow-hidden relative">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 font-mono text-[10px] px-3 py-1 rounded-full uppercase font-bold">
                          {room.type}
                        </span>
                        {!room.available && (
                          <span className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center font-mono text-red-400 font-bold uppercase text-sm">
                            Sold Out For Selected Dates
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                            {room.name}
                          </h3>
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed font-light">
                          {room.description}
                        </p>

                        <div className="flex flex-wrap gap-2 text-[10px] font-mono text-slate-300">
                          <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                            🛏️ {room.bed}
                          </span>
                          <span className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                            👥 Max {room.capacity} Guests
                          </span>
                          {room.amenities.slice(0, 3).map((a) => (
                            <span key={a} className="bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                              ✓ {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Footer / Price */}
                    <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex justify-between items-center">
                      <div>
                        <span className="text-2xl font-bold font-serif text-amber-400">€{room.pricePerNight}</span>
                        <span className="text-xs font-mono text-slate-500"> / night</span>
                        <p className="text-[10px] font-mono text-slate-400">Total: €{totalStayPrice} ({nights} nights)</p>
                      </div>

                      <button
                        disabled={!room.available}
                        onClick={() => setSelectedRoom(room)}
                        className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                          room.available
                            ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                            : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        Book Residence
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Booking Modal / Drawer */}
          {selectedRoom && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
              <div className="bg-[#0D1117] border border-slate-700 rounded-3xl max-w-2xl w-full p-8 relative space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <button
                  onClick={() => {
                    setSelectedRoom(null)
                    setBookingConfirmed(null)
                  }}
                  className="absolute top-6 right-6 text-slate-400 hover:text-white font-mono text-xl"
                >
                  ✕
                </button>

                <div>
                  <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-1">
                    CONFIRM RESERVATION
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white">{selectedRoom.name}</h3>
                </div>

                {bookingConfirmed ? (
                  <div className="p-6 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-4 text-center">
                    <span className="text-4xl">🎉</span>
                    <h4 className="text-xl font-serif font-bold text-emerald-400">Booking Confirmed & Automated!</h4>
                    <p className="text-xs font-mono text-slate-300">
                      Reservation ID: <strong className="text-amber-400">{bookingConfirmed.id}</strong>
                    </p>

                    <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl text-left font-mono text-xs space-y-2">
                      <p className="text-amber-400 font-bold uppercase">⚡ Triggered Workflows:</p>
                      <p className="text-slate-300">✓ Confirmation Email dispatched to {bookingConfirmed.guestEmail}</p>
                      <p className="text-slate-300">✓ Housekeeping schedule auto-allocated for {bookingConfirmed.checkIn}</p>
                      <p className="text-slate-300">✓ Reception dashboard updated with guest profile</p>
                    </div>

                    <button
                      onClick={() => {
                        setViewMode('admin')
                        setActiveAdminTab('reservations')
                      }}
                      className="w-full py-3 bg-amber-500 text-slate-950 font-bold font-mono text-xs rounded-xl uppercase tracking-wider hover:bg-amber-400 transition-all"
                    >
                      View Live Booking in Staff Dashboard →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCreateBooking} className="space-y-6 font-mono text-xs">
                    {/* Stay Breakdown */}
                    <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-xl space-y-2">
                      <div className="flex justify-between text-slate-300">
                        <span>Check-In / Out:</span>
                        <span className="font-bold text-white">{searchCheckIn} → {searchCheckOut} ({nights} Nights)</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Room Base Price:</span>
                        <span className="font-bold text-white">€{selectedRoom.pricePerNight} x {nights} = €{selectedRoom.pricePerNight * nights}</span>
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div className="space-y-3">
                      <p className="font-bold text-amber-400 uppercase">Optional Services & Enhancements:</p>
                      <label className="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeBreakfast}
                          onChange={(e) => setIncludeBreakfast(e.target.checked)}
                          className="accent-amber-500 w-4 h-4"
                        />
                        <div className="flex-1 flex justify-between">
                          <span>🍳 Gourmet Organic Breakfast Buffet</span>
                          <span className="text-amber-400 font-bold">+€25/night</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeSpa}
                          onChange={(e) => setIncludeSpa(e.target.checked)}
                          className="accent-amber-500 w-4 h-4"
                        />
                        <div className="flex-1 flex justify-between">
                          <span>💆 Thermal Alpine Spa Unlimited Pass</span>
                          <span className="text-amber-400 font-bold">+€120</span>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 bg-slate-900 p-3 rounded-xl border border-slate-800 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={includeTransfer}
                          onChange={(e) => setIncludeTransfer(e.target.checked)}
                          className="accent-amber-500 w-4 h-4"
                        />
                        <div className="flex-1 flex justify-between">
                          <span>🚘 Private Chauffeur Airport Transfer</span>
                          <span className="text-amber-400 font-bold">+€80</span>
                        </div>
                      </label>
                    </div>

                    {/* Guest Information */}
                    <div className="space-y-4 pt-2">
                      <p className="font-bold text-amber-400 uppercase">Guest Contact Details:</p>
                      <div>
                        <label className="block text-slate-400 mb-1">PRIMARY GUEST FULL NAME</label>
                        <input
                          type="text"
                          required
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Eleanor Vance"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1">EMAIL ADDRESS (FOR AUTOMATED PASSES)</label>
                        <input
                          type="email"
                          required
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          placeholder="eleanor.vance@example.com"
                          className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-400"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-amber-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-amber-400 transition-all text-sm shadow-lg shadow-amber-500/20"
                    >
                      Confirm Booking & Trigger Workflows
                    </button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          HOTEL STAFF ADMIN & AUTOMATION ENGINE VIEW
         ======================================================== */}
      {viewMode === 'admin' && (
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Admin Header & Navigation Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-slate-800 gap-4">
            <div>
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block">
                STAYFLOW HOTEL MANAGEMENT DASHBOARD
              </span>
              <h1 className="text-2xl font-bold font-serif text-white">Operations & Automation Control</h1>
            </div>

            <div className="flex gap-2 font-mono text-xs bg-slate-900 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAdminTab === 'overview' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                📊 Dashboard Metrics
              </button>
              <button
                onClick={() => setActiveAdminTab('reservations')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAdminTab === 'reservations' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                📋 Live Reservations ({reservations.length})
              </button>
              <button
                onClick={() => setActiveAdminTab('automation')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAdminTab === 'automation' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ Workflow Builder
              </button>
              <button
                onClick={() => setActiveAdminTab('templates')}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeAdminTab === 'templates' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ✉️ Email Templates
              </button>
            </div>
          </div>

          {/* TAB 1: OVERVIEW METRICS */}
          {activeAdminTab === 'overview' && (
            <div className="space-y-8">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-xs block mb-1 uppercase">Today&apos;s Occupancy</span>
                  <span className="text-3xl font-bold text-emerald-400">85%</span>
                  <span className="text-[10px] text-slate-500 block mt-2">17 / 20 Suites Occupied</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-xs block mb-1 uppercase">Monthly Revenue</span>
                  <span className="text-3xl font-bold text-amber-400">€42,850</span>
                  <span className="text-[10px] text-emerald-400 block mt-2">↑ +14.2% vs last month</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-xs block mb-1 uppercase">Today&apos;s Arrivals</span>
                  <span className="text-3xl font-bold text-sky-400">4 Guests</span>
                  <span className="text-[10px] text-slate-500 block mt-2">3 Pre-Arrival Emails Sent</span>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                  <span className="text-slate-400 text-xs block mb-1 uppercase">Automations Executed</span>
                  <span className="text-3xl font-bold text-indigo-400">128 Jobs</span>
                  <span className="text-[10px] text-slate-500 block mt-2">100% Success Rate</span>
                </div>
              </div>

              {/* Visual Calendar Timeline */}
              <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4 font-mono text-xs">
                <h3 className="text-base font-bold text-white uppercase font-serif">Visual Room Availability & Calendar Timeline</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="p-3">Room / Suite</th>
                        <th className="p-3">May 15</th>
                        <th className="p-3">May 16</th>
                        <th className="p-3">May 17</th>
                        <th className="p-3">May 18</th>
                        <th className="p-3">May 19</th>
                        <th className="p-3">May 20</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      <tr>
                        <td className="p-3 font-bold text-white">Alpine Suite</td>
                        <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">Available</span></td>
                        <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">Available</span></td>
                        <td className="p-3"><span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-1 rounded">E. Vance</span></td>
                        <td className="p-3" colSpan={3}><span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-1 rounded w-full block text-center">E. Vance (SF-1082)</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Garden Villa</td>
                        <td className="p-3" colSpan={2}><span className="bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded w-full block text-center">A. Hayes (SF-1083)</span></td>
                        <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">Available</span></td>
                        <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">Available</span></td>
                        <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">Available</span></td>
                        <td className="p-3"><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded">Available</span></td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Deluxe Room</td>
                        <td className="p-3"><span className="bg-slate-800 text-slate-400 px-2 py-1 rounded">Checked-Out</span></td>
                        <td className="p-3" colSpan={5}><span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded w-full block text-center">Available</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE RESERVATIONS TABLE */}
          {activeAdminTab === 'reservations' && (
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl font-mono text-xs space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-bold text-white uppercase font-serif">Guest Reservation Database</h3>
                <span className="text-slate-400">Total: {reservations.length} records</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="p-3">ID</th>
                      <th className="p-3">Guest</th>
                      <th className="p-3">Residence</th>
                      <th className="p-3">Dates</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Add-ons</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-bold text-amber-400">{res.id}</td>
                        <td className="p-3">
                          <p className="font-bold text-white">{res.guestName}</p>
                          <p className="text-[10px] text-slate-400">{res.guestEmail}</p>
                        </td>
                        <td className="p-3 text-slate-300">{res.roomName}</td>
                        <td className="p-3 text-slate-300">{res.checkIn} → {res.checkOut} ({res.nights}n)</td>
                        <td className="p-3 font-bold text-white">€{res.totalPrice}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            res.status === 'Confirmed'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                              : res.status === 'Checked-In'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {res.status}
                          </span>
                        </td>
                        <td className="p-3">
                          {res.addons.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {res.addons.map((a) => (
                                <span key={a} className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px]">
                                  {a}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500">None</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: WORKFLOW AUTOMATION BUILDER */}
          {activeAdminTab === 'automation' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="flex justify-between items-center bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
                <div>
                  <h3 className="text-base font-bold text-white uppercase font-serif">Visual Workflow & Event Automation Builder</h3>
                  <p className="text-slate-400">Configure event-driven triggers to execute scheduled guest emails and staff alerts.</p>
                </div>
                <button
                  onClick={() => {
                    const newWf: WorkflowRule = {
                      id: `wf-${workflows.length + 1}`,
                      trigger: 'Custom Event Trigger',
                      actions: ['Send Custom Email Notification'],
                      enabled: true
                    }
                    setWorkflows([...workflows, newWf])
                  }}
                  className="px-4 py-2 bg-amber-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-amber-400 transition-all"
                >
                  + Add New Workflow
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {workflows.map((wf) => (
                  <div key={wf.id} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-amber-400 uppercase">{wf.id}</span>
                        <span className="text-slate-500">|</span>
                        <span className="text-white font-bold">WHEN: {wf.trigger}</span>
                      </div>

                      <button
                        onClick={() => {
                          setWorkflows(
                            workflows.map((w) => (w.id === wf.id ? { ...w, enabled: !w.enabled } : w))
                          )
                        }}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                          wf.enabled
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : 'bg-slate-800 text-slate-500 border-slate-700'
                        }`}
                      >
                        {wf.enabled ? 'ACTIVE RULE' : 'DISABLED'}
                      </button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-slate-400 uppercase text-[10px]">THEN AUTOMATICALLY EXECUTE ACTIONS:</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {wf.actions.map((act, i) => (
                          <div key={i} className="bg-slate-800/80 border border-slate-700 p-3 rounded-xl flex items-center space-x-2">
                            <span className="text-amber-400 font-bold">↳</span>
                            <span className="text-slate-200">{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: EMAIL TEMPLATES */}
          {activeAdminTab === 'templates' && (
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-6 font-mono text-xs">
              <div>
                <h3 className="text-base font-bold text-white uppercase font-serif">Automated Guest Communication Templates</h3>
                <p className="text-slate-400">Edit dynamic template variables used in automated workflow dispatches.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['Booking Confirmation', 'Pre-Arrival Pass', 'Checkout Reminder', 'Review Request'].map((tpl) => (
                  <button
                    key={tpl}
                    onClick={() => setSelectedTemplate(tpl)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedTemplate === tpl
                        ? 'border-amber-400 bg-amber-500/10 text-amber-400 font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tpl}
                  </button>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div>
                  <label className="block text-slate-400 mb-1">EMAIL SUBJECT LINE</label>
                  <input
                    type="text"
                    value={templateSubject}
                    onChange={(e) => setTemplateSubject(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">EMAIL BODY CONTENT</label>
                  <textarea
                    rows={6}
                    value={templateBody}
                    onChange={(e) => setTemplateBody(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-amber-400 leading-relaxed"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-[10px] text-slate-500">
                    Variables available: &#123;&#123;guest_name&#125;&#125;, &#123;&#123;booking_id&#125;&#125;, &#123;&#123;room_name&#125;&#125;, &#123;&#123;check_in&#125;&#125;
                  </span>
                  <button
                    onClick={() => alert('Template saved successfully!')}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl uppercase tracking-wider hover:bg-amber-400 transition-all"
                  >
                    Save Template
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center font-mono text-xs text-slate-500">
        <p>STAYFLOW Resort & Guest Automation Engine • Crafted by Marcello Lienarta</p>
      </footer>
    </div>
  )
}
