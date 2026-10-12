'use client'

import { useState } from 'react'

// Room Types
interface Room {
  id: string
  name: string
  type: 'Deluxe Suite' | 'Executive Villa' | 'Penthouse Panorama' | 'Garden Sanctuary'
  capacity: number
  pricePerNight: number
  amenities: string[]
  image: string
  description: string
}

// Reservation
interface Reservation {
  id: string
  guestName: string
  guestEmail: string
  guestPhone: string
  roomName: string
  checkIn: string
  checkOut: string
  nights: number
  totalPrice: number
  status: 'Confirmed' | 'Checked-In' | 'Completed' | 'Cancelled'
}

// Workflow Trigger Automation Rule
interface WorkflowRule {
  id: string
  trigger: string
  action: string
  recipient: string
  active: boolean
}

const INITIAL_ROOMS: Room[] = [
  {
    id: 'room-101',
    name: 'The Obsidian Deluxe Suite',
    type: 'Deluxe Suite',
    capacity: 2,
    pricePerNight: 280,
    amenities: ['Private Balcony', 'King Bed', 'Soaking Tub', 'Complimentary Champagne', 'High-Speed Fiber'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description: 'A dark, elegant sanctuary with panoramic mountain views, custom velvet furnishings, and an Italian marble bathroom.',
  },
  {
    id: 'room-102',
    name: 'Sanctuary Garden Villa',
    type: 'Garden Sanctuary',
    capacity: 3,
    pricePerNight: 390,
    amenities: ['Private Courtyard Garden', 'Outdoor Rain Shower', 'Heated Plunge Pool', 'Butler Service'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Surrounded by lush flora, featuring a serene private patio, deep plunge pool, and dedicated 24/7 personal concierge.',
  },
  {
    id: 'room-103',
    name: 'The Crown Penthouse Panorama',
    type: 'Penthouse Panorama',
    capacity: 4,
    pricePerNight: 650,
    amenities: ['360 Skylight View', 'Private Sauna', 'Personal Chef Kitchen', 'Helipad Access', 'Valet Parking'],
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate luxury experience atop the resort tower, featuring floor-to-ceiling glass, private sauna, and bespoke dining.',
  },
]

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SF-801',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor@vancecapital.com',
    guestPhone: '+1 212 555 0192',
    roomName: 'The Obsidian Deluxe Suite',
    checkIn: '2025-02-18',
    checkOut: '2025-02-21',
    nights: 3,
    totalPrice: 924, // includes tax
    status: 'Confirmed',
  },
  {
    id: 'SF-802',
    guestName: 'Marcus Sterling',
    guestEmail: 'm.sterling@sterling.org',
    guestPhone: '+1 415 555 0184',
    roomName: 'The Crown Penthouse Panorama',
    checkIn: '2025-02-20',
    checkOut: '2025-02-25',
    nights: 5,
    totalPrice: 3575,
    status: 'Confirmed',
  },
]

const INITIAL_WORKFLOWS: WorkflowRule[] = [
  { id: 'WF-1', trigger: 'Reservation is Created', action: 'Send Immediate Confirmation Email + Invoice PDF', recipient: 'Guest Email', active: true },
  { id: 'WF-2', trigger: '48 Hours Before Arrival', action: 'Send Digital Key pre-arrival SMS & VIP preference form', recipient: 'Guest Mobile', active: true },
  { id: 'WF-3', trigger: 'VIP Guest Booking Confirmed', action: 'Notify Front Desk Reception & Prepare Welcome Amenity', recipient: 'Staff Channel', active: true },
  { id: 'WF-4', trigger: 'Guest Checkout Completed', action: 'Schedule Housekeeping Clean Request & Review Prompt', recipient: 'Housekeeping + Guest', active: true },
]

export default function StayFlowHotelPage() {
  const [activeTab, setActiveTab] = useState<'guest' | 'admin'>('guest')
  const [adminSubTab, setAdminSubTab] = useState<'occupancy' | 'calendar' | 'automation'>('occupancy')

  // Guest Booking Search Engine State
  const [searchDates, setSearchDates] = useState({ checkIn: '2025-02-20', checkOut: '2025-02-23', guests: 2 })
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [guestForm, setGuestForm] = useState({ name: '', email: '', phone: '', specialRequest: '' })
  const [confirmedBookingRef, setConfirmedBookingRef] = useState<Reservation | null>(null)

  // Reservations & Workflows State
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS)
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(INITIAL_WORKFLOWS)
  const [newRule, setNewRule] = useState({ trigger: 'Reservation is Created', action: 'Send Staff Slack Alert', recipient: 'Reception Staff' })

  // Calculate Night Stay
  const calculateNights = () => {
    const start = new Date(searchDates.checkIn)
    const end = new Date(searchDates.checkOut)
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24))
    return diff > 0 ? diff : 1
  }

  // Booking Submission Engine
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRoom || !guestForm.name || !guestForm.email) return

    const nights = calculateNights()
    const subtotal = selectedRoom.pricePerNight * nights
    const taxAndFees = subtotal * 0.10
    const total = subtotal + taxAndFees

    const createdRes: Reservation = {
      id: `SF-${Math.floor(100 + Math.random() * 900)}`,
      guestName: guestForm.name,
      guestEmail: guestForm.email,
      guestPhone: guestForm.phone || '+1 555 000 0000',
      roomName: selectedRoom.name,
      checkIn: searchDates.checkIn,
      checkOut: searchDates.checkOut,
      nights,
      totalPrice: total,
      status: 'Confirmed',
    }

    setReservations([createdRes, ...reservations])
    setConfirmedBookingRef(createdRes)
    setIsBookingModalOpen(false)
    setGuestForm({ name: '', email: '', phone: '', specialRequest: '' })
  }

  // Toggle Workflow Rule
  const handleToggleWorkflow = (id: string) => {
    setWorkflows(workflows.map(wf => wf.id === id ? { ...wf, active: !wf.active } : wf))
  }

  // Add Custom Workflow Rule
  const handleAddWorkflow = (e: React.FormEvent) => {
    e.preventDefault()
    const rule: WorkflowRule = {
      id: `WF-${workflows.length + 1}`,
      trigger: newRule.trigger,
      action: newRule.action,
      recipient: newRule.recipient,
      active: true,
    }
    setWorkflows([...workflows, rule])
  }

  return (
    <div className="min-h-screen bg-[#0C0F12] text-[#E2E8F0] font-sans selection:bg-[#E2A970] selection:text-[#0C0F12]">
      {/* Top Navigation */}
      <header className="border-b border-white/10 bg-[#12161C] px-8 py-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#E2A970] rounded-full animate-pulse"></div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest font-mono">
              STAYFLOW <span className="text-[10px] bg-white/10 text-[#E2A970] px-2 py-0.5 rounded border border-[#E2A970]/30 font-normal">GUEST AUTOMATION</span>
            </h1>
            <p className="text-[11px] text-gray-400 font-mono">Boutique Booking Engine & Triggered Email Workflows</p>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex bg-[#080A0C] p-1 rounded-full border border-white/10 text-xs font-mono">
          <button
            onClick={() => setActiveTab('guest')}
            className={`px-5 py-2 rounded-full transition-all font-bold ${activeTab === 'guest' ? 'bg-[#E2A970] text-[#0C0F12]' : 'text-gray-400 hover:text-white'}`}
          >
            GUEST BOUTIQUE PORTAL
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-5 py-2 rounded-full transition-all font-bold ${activeTab === 'admin' ? 'bg-[#E2A970] text-[#0C0F12]' : 'text-gray-400 hover:text-white'}`}
          >
            ADMIN & WORKFLOW BUILDER
          </button>
        </div>
      </header>

      {/* VIEWPORT 1: GUEST BOUTIQUE PORTAL */}
      {activeTab === 'guest' && (
        <main className="space-y-16 pb-20">
          {/* Luxury Hotel Hero */}
          <section className="relative min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-16 bg-gradient-to-b from-[#161C24] to-[#0C0F12] border-b border-white/5">
            <span className="text-xs font-mono text-[#E2A970] tracking-[0.3em] uppercase font-bold mb-4">
              BOUTIQUE HOSPITALITY REIMAGINED
            </span>
            <h2 className="text-4xl md:text-7xl font-serif text-white max-w-4xl leading-tight">
              Bespoke Suites & Automated Pre-Arrival Service
            </h2>
            <p className="text-sm md:text-base text-gray-400 max-w-2xl mt-4 font-light leading-relaxed">
              Experience flawless luxury. Our intelligent guest platform calculates pricing dynamically and triggers automated pre-arrival preferences before you even set foot on property.
            </p>

            {/* Availability Search Bar */}
            <div className="mt-10 bg-[#12161C] border border-[#E2A970]/30 p-4 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-4 max-w-4xl w-full font-mono text-xs">
              <div className="flex-1 text-left px-4">
                <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Check-In Date</label>
                <input
                  type="date"
                  value={searchDates.checkIn}
                  onChange={(e) => setSearchDates({ ...searchDates, checkIn: e.target.value })}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>

              <div className="w-full md:w-[1px] h-[1px] md:h-10 bg-white/10"></div>

              <div className="flex-1 text-left px-4">
                <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Check-Out Date</label>
                <input
                  type="date"
                  value={searchDates.checkOut}
                  onChange={(e) => setSearchDates({ ...searchDates, checkOut: e.target.value })}
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>

              <div className="w-full md:w-[1px] h-[1px] md:h-10 bg-white/10"></div>

              <div className="flex-1 text-left px-4">
                <label className="text-[10px] text-gray-400 uppercase font-bold block mb-1">Guests</label>
                <select
                  value={searchDates.guests}
                  onChange={(e) => setSearchDates({ ...searchDates, guests: Number(e.target.value) })}
                  className="bg-transparent text-white outline-none w-full"
                >
                  <option value={1} className="bg-[#12161C]">1 Guest</option>
                  <option value={2} className="bg-[#12161C]">2 Guests</option>
                  <option value={4} className="bg-[#12161C]">4 Guests</option>
                </select>
              </div>

              <div className="px-2 w-full md:w-auto">
                <span className="bg-[#E2A970] text-[#0C0F12] font-bold px-6 py-3.5 rounded-full block text-center uppercase tracking-wider">
                  {calculateNights()} NIGHTS SEARCH
                </span>
              </div>
            </div>
          </section>

          {/* Room Listings */}
          <section className="max-w-7xl mx-auto px-6 space-y-8">
            <div className="flex justify-between items-end border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-[#E2A970] font-bold tracking-widest uppercase">SUITES & VILLAS</span>
                <h3 className="text-3xl font-serif text-white mt-1">Available Luxury Accommodations</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INITIAL_ROOMS.map((room) => (
                <div key={room.id} className="bg-[#12161C] border border-white/10 rounded-3xl overflow-hidden group hover:border-[#E2A970]/50 transition-all duration-300 flex flex-col justify-between">
                  <div>
                    <div className="h-64 overflow-hidden relative">
                      <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <span className="absolute top-4 right-4 bg-[#0C0F12]/80 backdrop-blur-md text-[#E2A970] text-[10px] font-mono font-bold px-3 py-1 rounded-full border border-[#E2A970]/30">
                        {room.type}
                      </span>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xl font-serif text-white">{room.name}</h4>
                        <div className="text-right">
                          <span className="text-2xl font-serif font-bold text-[#E2A970]">${room.pricePerNight}</span>
                          <span className="text-[10px] text-gray-400 font-mono block">/ night</span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-400 font-light leading-relaxed">{room.description}</p>

                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono text-[#E2A970] font-bold uppercase tracking-wider block">Amenities Included</span>
                        <div className="flex flex-wrap gap-1.5">
                          {room.amenities.map((am) => (
                            <span key={am} className="text-[10px] bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-gray-300">
                              {am}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 pt-0">
                    <button
                      onClick={() => {
                        setSelectedRoom(room)
                        setIsBookingModalOpen(true)
                      }}
                      className="w-full py-3.5 bg-[#E2A970] text-[#0C0F12] font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white transition-all"
                    >
                      BOOK THIS SUITE (${room.pricePerNight * calculateNights()} Total)
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* VIEWPORT 2: ADMIN & WORKFLOW AUTOMATION BUILDER */}
      {activeTab === 'admin' && (
        <main className="p-8 max-w-7xl mx-auto space-y-8 font-mono">
          {/* Admin Subtabs */}
          <div className="flex border-b border-white/10 space-x-6 text-xs font-bold">
            <button
              onClick={() => setAdminSubTab('occupancy')}
              className={`pb-3 border-b-2 uppercase ${adminSubTab === 'occupancy' ? 'border-[#E2A970] text-[#E2A970]' : 'border-transparent text-gray-400'}`}
            >
              OCCUPANCY & RESERVATIONS ({reservations.length})
            </button>
            <button
              onClick={() => setAdminSubTab('automation')}
              className={`pb-3 border-b-2 uppercase ${adminSubTab === 'automation' ? 'border-[#E2A970] text-[#E2A970]' : 'border-transparent text-gray-400'}`}
            >
              AUTOMATION RULE ENGINE ({workflows.length})
            </button>
          </div>

          {/* ADMIN TAB 1: OCCUPANCY METRICS & RESERVATIONS */}
          {adminSubTab === 'occupancy' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-[#12161C] border border-white/10 p-4 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase">OCCUPANCY RATE</p>
                  <p className="text-2xl font-bold text-[#E2A970] mt-1">84.2%</p>
                </div>
                <div className="bg-[#12161C] border border-white/10 p-4 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase">ARRIVALS TODAY</p>
                  <p className="text-2xl font-bold text-white mt-1">6 Guests</p>
                </div>
                <div className="bg-[#12161C] border border-white/10 p-4 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase">DEPARTURES TODAY</p>
                  <p className="text-2xl font-bold text-white mt-1">4 Guests</p>
                </div>
                <div className="bg-[#12161C] border border-white/10 p-4 rounded-xl">
                  <p className="text-[10px] text-gray-400 uppercase">TOTAL GROSS REVENUE</p>
                  <p className="text-2xl font-bold text-[#10B981] mt-1">$18,420</p>
                </div>
              </div>

              {/* Reservations Table */}
              <div className="bg-[#12161C] border border-white/10 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#080A0C] border-b border-white/10 text-gray-400 text-[10px] uppercase">
                      <th className="p-4">REF ID</th>
                      <th className="p-4">GUEST NAME</th>
                      <th className="p-4">SUITE / ROOM</th>
                      <th className="p-4">CHECK-IN</th>
                      <th className="p-4">CHECK-OUT</th>
                      <th className="p-4">NIGHTS</th>
                      <th className="p-4">TOTAL REVENUE</th>
                      <th className="p-4">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-white/5">
                        <td className="p-4 font-bold text-[#E2A970]">{res.id}</td>
                        <td className="p-4 font-bold text-white">{res.guestName}</td>
                        <td className="p-4 text-gray-300">{res.roomName}</td>
                        <td className="p-4 text-gray-400">{res.checkIn}</td>
                        <td className="p-4 text-gray-400">{res.checkOut}</td>
                        <td className="p-4 text-white">{res.nights}</td>
                        <td className="p-4 font-bold text-[#10B981]">${res.totalPrice.toFixed(0)}</td>
                        <td className="p-4">
                          <span className="bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                            {res.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN TAB 2: AUTOMATION RULE ENGINE */}
          {adminSubTab === 'automation' && (
            <div className="space-y-6">
              {/* Add New Rule */}
              <form onSubmit={handleAddWorkflow} className="bg-[#12161C] border border-white/10 p-6 rounded-xl space-y-4">
                <h3 className="text-xs font-bold text-[#E2A970] uppercase">CREATE EVENT AUTOMATION RULE</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-gray-400 block mb-1">TRIGGER EVENT (WHEN)</label>
                    <select
                      value={newRule.trigger}
                      onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
                      className="w-full bg-[#080A0C] border border-white/10 p-3 rounded text-white"
                    >
                      <option value="Reservation is Created">Reservation is Created</option>
                      <option value="24 Hours Before Arrival">24 Hours Before Arrival</option>
                      <option value="Guest Completes Checkout">Guest Completes Checkout</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">AUTOMATED ACTION (THEN)</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Send SMS Welcome Key"
                      value={newRule.action}
                      onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                      className="w-full bg-[#080A0C] border border-white/10 p-3 rounded text-white"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 block mb-1">RECIPIENT CHANNEL</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Guest Email / Staff"
                      value={newRule.recipient}
                      onChange={(e) => setNewRule({ ...newRule, recipient: e.target.value })}
                      className="w-full bg-[#080A0C] border border-white/10 p-3 rounded text-white"
                    />
                  </div>
                </div>
                <button type="submit" className="px-6 py-2.5 bg-[#E2A970] text-[#0C0F12] text-xs font-bold rounded uppercase">
                  ADD WORKFLOW RULE
                </button>
              </form>

              {/* Active Workflows Grid */}
              <div className="space-y-4">
                {workflows.map((wf) => (
                  <div key={wf.id} className="bg-[#12161C] border border-white/10 p-6 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] text-[#E2A970] font-bold">{wf.id} // WORKFLOW TRIGGER</span>
                      <p className="text-sm font-bold text-white">WHEN: <span className="text-gray-300 font-normal">{wf.trigger}</span></p>
                      <p className="text-sm font-bold text-white">THEN: <span className="text-[#10B981] font-normal">{wf.action}</span> ({wf.recipient})</p>
                    </div>

                    <button
                      onClick={() => handleToggleWorkflow(wf.id)}
                      className={`px-4 py-2 rounded text-xs font-bold uppercase transition-all ${
                        wf.active ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' : 'bg-gray-800 text-gray-500'
                      }`}
                    >
                      {wf.active ? 'STATUS: ACTIVE' : 'STATUS: DISABLED'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}

      {/* BOOKING MODAL */}
      {isBookingModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#12161C] border border-white/10 rounded-3xl max-w-lg w-full p-8 space-y-6 font-mono text-xs relative">
            <button onClick={() => setIsBookingModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-white">✕</button>

            <div>
              <span className="text-[10px] text-[#E2A970] font-bold uppercase tracking-widest">{selectedRoom.type}</span>
              <h3 className="text-2xl font-serif text-white mt-1">{selectedRoom.name}</h3>
            </div>

            <form onSubmit={handleConfirmBooking} className="space-y-4">
              <div>
                <label className="text-gray-400 uppercase block mb-1">Full Name *</label>
                <input required type="text" placeholder="Eleanor Vance" value={guestForm.name} onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })} className="w-full bg-[#080A0C] border border-white/10 p-3 rounded text-white" />
              </div>
              <div>
                <label className="text-gray-400 uppercase block mb-1">Email Address *</label>
                <input required type="email" placeholder="eleanor@vancecapital.com" value={guestForm.email} onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })} className="w-full bg-[#080A0C] border border-white/10 p-3 rounded text-white" />
              </div>
              <div>
                <label className="text-gray-400 uppercase block mb-1">Phone Number</label>
                <input type="tel" placeholder="+1 212 555 0192" value={guestForm.phone} onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })} className="w-full bg-[#080A0C] border border-white/10 p-3 rounded text-white" />
              </div>

              <div className="bg-[#080A0C] p-4 rounded border border-white/10 space-y-2 text-gray-300">
                <div className="flex justify-between"><span>Rate per Night:</span><span>${selectedRoom.pricePerNight}</span></div>
                <div className="flex justify-between"><span>Nights Stay:</span><span>{calculateNights()}</span></div>
                <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-white text-sm"><span>TOTAL CHARGE:</span><span className="text-[#E2A970]">${(selectedRoom.pricePerNight * calculateNights() * 1.1).toFixed(0)}</span></div>
              </div>

              <button type="submit" className="w-full py-4 bg-[#E2A970] text-[#0C0F12] font-bold rounded-xl uppercase tracking-widest hover:bg-white transition-all">
                CONFIRM RESERVATION & TRIGGER AUTOMATION
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION SUCCESS RECEIPT */}
      {confirmedBookingRef && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs">
          <div className="bg-[#12161C] border border-[#E2A970] rounded-3xl max-w-md w-full p-8 text-center space-y-6">
            <div className="w-12 h-12 bg-[#10B981]/20 border border-[#10B981]/40 rounded-full flex items-center justify-center mx-auto text-[#10B981] font-bold text-xl">
              ✓
            </div>

            <div>
              <span className="text-[10px] text-[#E2A970] font-bold uppercase tracking-widest">RESERVATION CONFIRMED</span>
              <h3 className="text-xl font-bold text-white mt-1">REF: {confirmedBookingRef.id}</h3>
            </div>

            <div className="bg-[#080A0C] p-4 rounded-xl border border-white/10 text-left space-y-2 text-gray-300">
              <p>Guest: <span className="text-white font-bold">{confirmedBookingRef.guestName}</span></p>
              <p>Suite: <span className="text-white font-bold">{confirmedBookingRef.roomName}</span></p>
              <p>Dates: <span className="text-white">{confirmedBookingRef.checkIn} to {confirmedBookingRef.checkOut}</span></p>
              <p>Total Revenue: <span className="text-[#10B981] font-bold">${confirmedBookingRef.totalPrice.toFixed(0)}</span></p>
            </div>

            <p className="text-gray-400 text-[11px] leading-relaxed">
              Automated trigger WF-1 executed: Confirmation email and invoice PDF sent to <span className="text-white">{confirmedBookingRef.guestEmail}</span>.
            </p>

            <button onClick={() => setConfirmedBookingRef(null)} className="w-full py-3 bg-[#E2A970] text-[#0C0F12] font-bold rounded-xl uppercase">
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
