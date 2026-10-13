'use client'

import { useState, useEffect } from 'react'

// antislop active: during (session override).
// Reading this as: Boutique Hospitality Platform with Guest Booking and Operational Workflow Automation, in a dual editorial luxury and dense operational control style, dial ENERGY 2 / RHYTHM 3 / MOTION 1.

interface Room {
  id: string
  name: string
  category: 'Deluxe Suite' | 'Garden Sanctuary' | 'Penthouse Panorama' | 'Chalet Villa'
  capacity: number
  bedConfig: string
  squareFeet: number
  pricePerNight: number
  amenities: string[]
  images: string[]
  description: string
  availableCount: number
}

interface Reservation {
  id: string
  guestName: string
  guestEmail: string
  guestPhone: string
  roomName: string
  roomCategory: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  subtotal: number
  taxAndFees: number
  totalPrice: number
  status: 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Cancelled'
  isVip: boolean
  specialRequests?: string
  createdAt: string
}

interface WorkflowRule {
  id: string
  trigger: string
  action: string
  secondaryAction: string
  recipient: string
  active: boolean
  executionsCount: number
}

interface WorkflowLog {
  id: string
  timestamp: string
  ruleId: string
  triggerEvent: string
  dispatchedAction: string
  targetRecipient: string
  status: 'Success (Simulated)' | 'Queued'
}

const BOUTIQUE_ROOMS: Room[] = [
  {
    id: 'room-obsidian',
    name: 'The Obsidian Grand Suite',
    category: 'Deluxe Suite',
    capacity: 2,
    bedConfig: '1 King Bed (Italian Linen)',
    squareFeet: 680,
    pricePerNight: 340,
    amenities: ['Private Balcony with Alpine View', 'Freestanding Soaking Tub', 'Bespoke Bar with Rare Spirits', 'High-Speed Fiber Wi-Fi', 'Complimentary Champagne'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',
    ],
    description: 'A dark, polished basalt sanctuary overlooking private forest pines, featuring custom velvet chaise lounges, an acoustic sound system, and floor-to-ceiling tinted glass.',
    availableCount: 3,
  },
  {
    id: 'room-sanctuary',
    name: 'Sanctuary Garden Villa',
    category: 'Garden Sanctuary',
    capacity: 3,
    bedConfig: '1 King Bed + 1 Daybed',
    squareFeet: 920,
    pricePerNight: 460,
    amenities: ['Private Courtyard Garden', 'Outdoor Heated Plunge Pool', 'Rainfall Stone Shower', 'Dedicated 24/7 Concierge', 'Fireplace Hearth'],
    images: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
    ],
    description: 'Enclosed by lush native cedar and stone courtyards, this single-level retreat features an open-air plunge pool and custom teak wood finishes.',
    availableCount: 2,
  },
  {
    id: 'room-penthouse',
    name: 'The Crown Penthouse Panorama',
    category: 'Penthouse Panorama',
    capacity: 4,
    bedConfig: '2 Master King Suites',
    squareFeet: 1450,
    pricePerNight: 780,
    amenities: ['360 Skylight Observatory', 'Private Cedar Sauna', 'Personal Sommelier Kitchen', 'Helipad Arrival Transfer', 'Private Valet'],
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=85',
    ],
    description: 'Perched on the highest elevation of the resort ridge, offering panoramic mountain vistas, double master bedrooms, and an expansive wrap-around observation terrace.',
    availableCount: 1,
  },
  {
    id: 'room-chalet',
    name: 'Alpine Timberline Chalet',
    category: 'Chalet Villa',
    capacity: 4,
    bedConfig: '1 King + 2 Queen Suites',
    squareFeet: 1200,
    pricePerNight: 590,
    amenities: ['Wood Burning Stove', 'Wine Cellar Cabinet', 'Panoramic Hot Tub on Deck', 'Ski-in Ski-out Access', 'Heated Stone Flooring'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1000&q=85',
    ],
    description: 'Hand-hewn alpine timber meets contemporary glass architecture. Includes direct trail access and an outdoor cedar hot tub overlooking snow-capped ridges.',
    availableCount: 2,
  },
]

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'SF-1042',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@vanceholdings.com',
    guestPhone: '+1 212 555 0192',
    roomName: 'The Crown Penthouse Panorama',
    roomCategory: 'Penthouse Panorama',
    checkIn: '2025-03-24',
    checkOut: '2025-03-28',
    nights: 4,
    guests: 2,
    subtotal: 3120,
    taxAndFees: 468,
    totalPrice: 3588,
    status: 'Confirmed',
    isVip: true,
    specialRequests: 'High floor preferred, late arrival at 22:00, organic sparkling water in room',
    createdAt: '2025-03-12 14:20',
  },
  {
    id: 'SF-1043',
    guestName: 'Marcus Sterling',
    guestEmail: 'm.sterling@sterlingarch.org',
    guestPhone: '+1 415 555 0184',
    roomName: 'The Obsidian Grand Suite',
    roomCategory: 'Deluxe Suite',
    checkIn: '2025-03-22',
    checkOut: '2025-03-25',
    nights: 3,
    guests: 2,
    subtotal: 1020,
    taxAndFees: 153,
    totalPrice: 1173,
    status: 'Checked-In',
    isVip: false,
    specialRequests: 'Allergy to down feathers, hypoallergenic bedding requested',
    createdAt: '2025-03-14 09:45',
  },
  {
    id: 'SF-1044',
    guestName: 'Dr. Alistair Chen',
    guestEmail: 'alistair@chenbio.io',
    guestPhone: '+1 650 555 0244',
    roomName: 'Sanctuary Garden Villa',
    roomCategory: 'Garden Sanctuary',
    checkIn: '2025-03-20',
    checkOut: '2025-03-23',
    nights: 3,
    guests: 3,
    subtotal: 1380,
    taxAndFees: 207,
    totalPrice: 1587,
    status: 'Confirmed',
    isVip: true,
    specialRequests: 'Pre-heated plunge pool, airport transfer coordination',
    createdAt: '2025-03-15 11:10',
  },
]

const INITIAL_WORKFLOWS: WorkflowRule[] = [
  {
    id: 'WF-01',
    trigger: 'Reservation is Confirmed',
    action: 'Send Instant Booking Confirmation Email with PDF Folio',
    secondaryAction: 'Create Guest Folio in Property Management System',
    recipient: 'Guest Email (Immediate)',
    active: true,
    executionsCount: 142,
  },
  {
    id: 'WF-02',
    trigger: '48 Hours Prior to Arrival',
    action: 'Send Pre-Arrival Welcome SMS with Digital Key Link',
    secondaryAction: 'Prompt Guest for Pillow Menu & Arrival Time Preferences',
    recipient: 'Guest Mobile (+1 Day Before)',
    active: true,
    executionsCount: 98,
  },
  {
    id: 'WF-03',
    trigger: 'VIP Reservation Created (Total > $1,500)',
    action: 'Dispatch Push Alert to General Manager Mobile',
    secondaryAction: 'Schedule Complimentary Krug Champagne & Cheese Board',
    recipient: 'Front Desk Supervisor & GM Channel',
    active: true,
    executionsCount: 41,
  },
  {
    id: 'WF-04',
    trigger: 'Guest Checkout Completed',
    action: 'Dispatch Housekeeping Room Inspection & Cleaning Order',
    secondaryAction: 'Send Post-Stay Thank You Email with Review Request',
    recipient: 'Housekeeping Department & Guest Email',
    active: true,
    executionsCount: 116,
  },
]

const INITIAL_LOGS: WorkflowLog[] = [
  {
    id: 'LOG-881',
    timestamp: '2025-03-15 11:10:45',
    ruleId: 'WF-01',
    triggerEvent: 'Reservation Confirmed (SF-1044)',
    dispatchedAction: 'Generated Confirmation Email & PDF Folio',
    targetRecipient: 'alistair@chenbio.io',
    status: 'Success (Simulated)',
  },
  {
    id: 'LOG-882',
    timestamp: '2025-03-15 11:10:46',
    ruleId: 'WF-03',
    triggerEvent: 'VIP Threshold Exceeded ($1,587)',
    dispatchedAction: 'GM Mobile Alert: Welcome Amenity Scheduled',
    targetRecipient: 'GM Channel / Housekeeping',
    status: 'Success (Simulated)',
  },
  {
    id: 'LOG-883',
    timestamp: '2025-03-14 09:45:12',
    ruleId: 'WF-01',
    triggerEvent: 'Reservation Confirmed (SF-1043)',
    dispatchedAction: 'Generated Confirmation Email',
    targetRecipient: 'm.sterling@sterlingarch.org',
    status: 'Success (Simulated)',
  },
]

export default function StayFlowShowcasePage() {
  const [activePortal, setActivePortal] = useState<'guest' | 'admin'>('guest')
  const [adminTab, setAdminTab] = useState<'overview' | 'matrix' | 'workflows' | 'templates'>('workflows')

  // Guest Portal State
  const [searchDates, setSearchDates] = useState({
    checkIn: '2025-03-26',
    checkOut: '2025-03-29',
    guests: 2,
    roomCategory: 'All',
  })
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [addOnServices, setAddOnServices] = useState({
    airportTransfer: false,
    champagneArrival: false,
    dailyBreakfast: false,
  })
  const [guestForm, setGuestForm] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  })
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null)

  // Admin Operational State
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS)
  const [workflows, setWorkflows] = useState<WorkflowRule[]>(INITIAL_WORKFLOWS)
  const [workflowLogs, setWorkflowLogs] = useState<WorkflowLog[]>(INITIAL_LOGS)
  const [selectedResFolio, setSelectedResFolio] = useState<Reservation | null>(null)

  // New Workflow Rule Modal/Form
  const [newRule, setNewRule] = useState({
    trigger: 'Reservation is Confirmed',
    action: 'Send SMS Notification',
    secondaryAction: 'Update Folio Status in PMS',
    recipient: 'Guest Mobile',
  })

  // Template Preview State
  const [activeTemplate, setActiveTemplate] = useState<'confirmation' | 'prearrival' | 'housekeeping' | 'thankyou'>('confirmation')

  // Keyboard accessibility: Escape closes modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBookingModalOpen(false)
        setSelectedResFolio(null)
        setConfirmedBooking(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Calculate Nights Stay
  const calculateNights = () => {
    const d1 = new Date(searchDates.checkIn)
    const d2 = new Date(searchDates.checkOut)
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 3600 * 24))
    return diff > 0 ? diff : 1
  }

  // Calculate Dynamic Booking Totals
  const calculatePricing = (room: Room) => {
    const nights = calculateNights()
    const baseRoomTotal = room.pricePerNight * nights
    let addOns = 0
    if (addOnServices.airportTransfer) addOns += 120
    if (addOnServices.champagneArrival) addOns += 95
    if (addOnServices.dailyBreakfast) addOns += 45 * searchDates.guests * nights

    const subtotal = baseRoomTotal + addOns
    const taxesAndResortFee = Math.round(subtotal * 0.15)
    const total = subtotal + taxesAndResortFee

    return { nights, baseRoomTotal, addOns, subtotal, taxesAndResortFee, total }
  }

  // Confirm Reservation and Trigger Automation
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedRoom || !guestForm.name || !guestForm.email) return

    const pricing = calculatePricing(selectedRoom)
    const isVip = pricing.total >= 1500

    const newRes: Reservation = {
      id: `SF-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName: guestForm.name,
      guestEmail: guestForm.email,
      guestPhone: guestForm.phone || '+1 555 0100',
      roomName: selectedRoom.name,
      roomCategory: selectedRoom.category,
      checkIn: searchDates.checkIn,
      checkOut: searchDates.checkOut,
      nights: pricing.nights,
      guests: searchDates.guests,
      subtotal: pricing.subtotal,
      taxAndFees: pricing.taxesAndResortFee,
      totalPrice: pricing.total,
      status: 'Confirmed',
      isVip,
      specialRequests: guestForm.specialRequests,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    }

    setReservations([newRes, ...reservations])

    // Trigger Automated Workflows and Append Real-Time Logs
    const newLog1: WorkflowLog = {
      id: `LOG-${Math.floor(800 + Math.random() * 199)}`,
      timestamp: new Date().toLocaleTimeString(),
      ruleId: 'WF-01',
      triggerEvent: `Reservation Confirmed (${newRes.id})`,
      dispatchedAction: `Dispatched Booking Confirmation Email to ${newRes.guestEmail}`,
      targetRecipient: newRes.guestEmail,
      status: 'Success (Simulated)',
    }

    const additionalLogs = [newLog1]

    if (isVip) {
      additionalLogs.push({
        id: `LOG-${Math.floor(900 + Math.random() * 99)}`,
        timestamp: new Date().toLocaleTimeString(),
        ruleId: 'WF-03',
        triggerEvent: `VIP Booking Trigger (Total: $${newRes.totalPrice})`,
        dispatchedAction: 'Alert sent to General Manager. Champagne welcome queued.',
        targetRecipient: 'GM Channel / Housekeeping',
        status: 'Success (Simulated)',
      })
    }

    setWorkflowLogs([...additionalLogs, ...workflowLogs])
    setConfirmedBooking(newRes)
    setIsBookingModalOpen(false)
    setGuestForm({ name: '', email: '', phone: '', specialRequests: '' })
  }

  // Toggle Workflow Rule Active State
  const handleToggleWorkflow = (id: string) => {
    setWorkflows(
      workflows.map((wf) => (wf.id === id ? { ...wf, active: !wf.active } : wf))
    )
  }

  // Simulate Instant Event Test Trigger
  const handleSimulateEventTrigger = (eventKind: 'checkout' | 'prearrival' | 'vip') => {
    let firedRule: WorkflowRule | undefined
    let desc = ''
    let recip = ''

    if (eventKind === 'checkout') {
      firedRule = workflows.find((w) => w.id === 'WF-04')
      desc = 'Housekeeping Turnaround Order Dispatched + Thank You Email'
      recip = 'Housekeeping Queue / guest@example.com'
    } else if (eventKind === 'prearrival') {
      firedRule = workflows.find((w) => w.id === 'WF-02')
      desc = 'Pre-Arrival Digital Key SMS Dispatched (48h Notice)'
      recip = '+1 415 555 0184 (Guest Mobile)'
    } else {
      firedRule = workflows.find((w) => w.id === 'WF-03')
      desc = 'VIP Threshold Trigger: General Manager Mobile Notified'
      recip = 'GM Telegram Channel'
    }

    if (firedRule) {
      setWorkflows(
        workflows.map((w) =>
          w.id === firedRule?.id ? { ...w, executionsCount: w.executionsCount + 1 } : w
        )
      )

      const simLog: WorkflowLog = {
        id: `LOG-${Math.floor(900 + Math.random() * 99)}`,
        timestamp: new Date().toLocaleTimeString(),
        ruleId: firedRule.id,
        triggerEvent: `Manual Event Trigger (${firedRule.trigger})`,
        dispatchedAction: desc,
        targetRecipient: recip,
        status: 'Success (Simulated)',
      }

      setWorkflowLogs([simLog, ...workflowLogs])
    }
  }

  // Add Custom Workflow Rule
  const handleAddRule = (e: React.FormEvent) => {
    e.preventDefault()
    const rule: WorkflowRule = {
      id: `WF-0${workflows.length + 1}`,
      trigger: newRule.trigger,
      action: newRule.action,
      secondaryAction: newRule.secondaryAction,
      recipient: newRule.recipient,
      active: true,
      executionsCount: 0,
    }
    setWorkflows([...workflows, rule])
  }

  // Filtered Rooms
  const filteredRooms = searchDates.roomCategory === 'All'
    ? BOUTIQUE_ROOMS
    : BOUTIQUE_ROOMS.filter((r) => r.category === searchDates.roomCategory)

  return (
    <div className="min-h-screen bg-[#0C0E12] text-[#E8ECF2] font-sans selection:bg-[#D9A76A] selection:text-[#0C0E12]">
      {/* Top Header & Perspective Switcher */}
      <header className="border-b border-[#202530] bg-[#11141A] px-6 lg:px-12 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-bold tracking-[0.2em] text-[#D9A76A] uppercase font-mono">
              STAYFLOW
            </span>
            <span className="hidden sm:inline-block text-xs text-[#9CA3AF] font-mono">
              / Hotel Booking & Workflow Automation
            </span>
            <span className="text-[10px] font-mono text-[#D9A76A] bg-[#D9A76A]/10 border border-[#D9A76A]/30 px-2.5 py-0.5 rounded font-bold uppercase">
              Notice: No AI API yet, No database connection yet
            </span>
          </div>

          {/* Perspective View Toggle */}
          <div className="flex bg-[#0A0C10] p-1 border border-[#202530] text-xs font-mono">
            <button
              onClick={() => setActivePortal('guest')}
              className={`px-4 py-2 font-bold transition-all ${
                activePortal === 'guest'
                  ? 'bg-[#D9A76A] text-[#0C0E12]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              GUEST BOOKING PORTAL
            </button>
            <button
              onClick={() => setActivePortal('admin')}
              className={`px-4 py-2 font-bold transition-all ${
                activePortal === 'admin'
                  ? 'bg-[#D9A76A] text-[#0C0E12]'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              HOTEL WORKFLOW CONTROL CENTER
            </button>
          </div>
        </div>
      </header>

      {/* PORTAL VIEW 1: LUXURY GUEST BOOKING PORTAL */}
      {activePortal === 'guest' && (
        <main className="space-y-24 pb-28">
          {/* Hero Section */}
          <section className="relative min-h-[62vh] flex flex-col justify-center items-center text-center px-6 pt-16 bg-gradient-to-b from-[#151922] via-[#0E1117] to-[#0C0E12] border-b border-[#1C222E]">
            <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#D9A76A] uppercase mb-4">
              BOUTIQUE SANCTUARY & WORKFLOW AUTOMATION
            </span>

            <h1 className="text-4xl md:text-7xl font-serif font-normal text-white max-w-4xl leading-tight">
              Quiet Luxury, <br />
              Automated Perfection.
            </h1>

            <p className="text-sm md:text-base text-[#9CA3AF] max-w-2xl mt-4 font-light leading-relaxed">
              Every reservation calculates custom taxes, options, and automatically schedules pre-arrival preference workflows, digital key codes, and personalized concierge care.
            </p>

            {/* Availability Search Bar */}
            <div className="mt-12 bg-[#121620] border border-[#D9A76A]/40 p-4 shadow-2xl flex flex-col lg:flex-row items-center gap-4 max-w-5xl w-full text-xs font-mono">
              <div className="flex-1 text-left px-3 w-full">
                <label className="text-[10px] text-[#9CA3AF] uppercase font-bold block mb-1">
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={searchDates.checkIn}
                  onChange={(e) => setSearchDates({ ...searchDates, checkIn: e.target.value })}
                  className="bg-transparent text-white outline-none w-full border-b border-[#262E3D] pb-1 focus:border-[#D9A76A]"
                />
              </div>

              <div className="hidden lg:block w-[1px] h-10 bg-[#262E3D]"></div>

              <div className="flex-1 text-left px-3 w-full">
                <label className="text-[10px] text-[#9CA3AF] uppercase font-bold block mb-1">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={searchDates.checkOut}
                  onChange={(e) => setSearchDates({ ...searchDates, checkOut: e.target.value })}
                  className="bg-transparent text-white outline-none w-full border-b border-[#262E3D] pb-1 focus:border-[#D9A76A]"
                />
              </div>

              <div className="hidden lg:block w-[1px] h-10 bg-[#262E3D]"></div>

              <div className="flex-1 text-left px-3 w-full">
                <label className="text-[10px] text-[#9CA3AF] uppercase font-bold block mb-1">
                  Guests Count
                </label>
                <select
                  value={searchDates.guests}
                  onChange={(e) => setSearchDates({ ...searchDates, guests: Number(e.target.value) })}
                  className="bg-[#121620] text-white outline-none w-full border-b border-[#262E3D] pb-1 focus:border-[#D9A76A]"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                </select>
              </div>

              <div className="hidden lg:block w-[1px] h-10 bg-[#262E3D]"></div>

              <div className="flex-1 text-left px-3 w-full">
                <label className="text-[10px] text-[#9CA3AF] uppercase font-bold block mb-1">
                  Suite Type
                </label>
                <select
                  value={searchDates.roomCategory}
                  onChange={(e) => setSearchDates({ ...searchDates, roomCategory: e.target.value })}
                  className="bg-[#121620] text-white outline-none w-full border-b border-[#262E3D] pb-1 focus:border-[#D9A76A]"
                >
                  <option value="All">All Suites & Villas</option>
                  <option value="Deluxe Suite">Deluxe Suite</option>
                  <option value="Garden Sanctuary">Garden Sanctuary</option>
                  <option value="Penthouse Panorama">Penthouse Panorama</option>
                  <option value="Chalet Villa">Chalet Villa</option>
                </select>
              </div>

              <div className="px-2 w-full lg:w-auto shrink-0">
                <div className="bg-[#D9A76A] text-[#0C0E12] font-bold px-6 py-3.5 block text-center uppercase tracking-wider">
                  {calculateNights()} Nights Total
                </div>
              </div>
            </div>
          </section>

          {/* Room Listings Section */}
          <section className="max-w-7xl mx-auto px-6 lg:px-12 space-y-12">
            <div className="border-b border-[#202530] pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <span className="text-xs font-mono font-bold tracking-[0.25em] text-[#D9A76A] uppercase block mb-1">
                  BESPOKE ACCOMMODATIONS
                </span>
                <h2 className="text-3xl md:text-4xl font-serif text-white">
                  Available Suites & Private Villas
                </h2>
              </div>
              <span className="text-xs font-mono text-[#9CA3AF]">
                Showing {filteredRooms.length} available room categories for selected dates
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {filteredRooms.map((room) => {
                const pricing = calculatePricing(room)
                return (
                  <div
                    key={room.id}
                    className="bg-[#11141C] border border-[#222836] hover:border-[#D9A76A]/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Room Image */}
                      <div className="h-72 overflow-hidden relative">
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-[#0A0C10]/85 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-[#D9A76A] border border-[#D9A76A]/30 uppercase font-bold">
                          {room.category}
                        </div>
                        <div className="absolute top-4 right-4 bg-[#0A0C10]/85 backdrop-blur-md px-3 py-1 font-mono text-[10px] text-white border border-[#202530]">
                          {room.squareFeet} sq ft • {room.capacity} Guests Max
                        </div>
                      </div>

                      {/* Room Information */}
                      <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-2xl font-serif text-white">{room.name}</h3>
                            <p className="text-xs font-mono text-[#9CA3AF] mt-1">{room.bedConfig}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-3xl font-serif font-bold text-[#D9A76A]">
                              ${room.pricePerNight}
                            </span>
                            <span className="text-[10px] font-mono text-[#9CA3AF] block">/ night</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#D1D5DB] font-light leading-relaxed">
                          {room.description}
                        </p>

                        {/* Amenities Checklist */}
                        <div className="space-y-2 pt-2 border-t border-[#1C222E]">
                          <span className="text-[10px] font-mono text-[#D9A76A] uppercase font-bold tracking-wider block">
                            Included Suite Amenities
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {room.amenities.map((am) => (
                              <span
                                key={am}
                                className="text-[11px] font-mono bg-[#181C26] border border-[#252C3D] px-2.5 py-1 text-[#CBD5E1]"
                              >
                                {am}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Booking Calculation & Action */}
                    <div className="p-8 pt-0 border-t border-[#1C222E] mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <span className="text-[10px] font-mono text-[#9CA3AF] uppercase block">
                          Total Estimate ({pricing.nights} Nights)
                        </span>
                        <span className="text-xl font-bold font-serif text-white">
                          ${pricing.baseRoomTotal} <span className="text-xs font-sans text-[#9CA3AF] font-normal">+ taxes</span>
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedRoom(room)
                          setIsBookingModalOpen(true)
                        }}
                        className="px-6 py-3 bg-[#D9A76A] text-[#0C0E12] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white transition-all w-full sm:w-auto"
                      >
                        Reserve This Suite
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        </main>
      )}

      {/* PORTAL VIEW 2: HOTEL OPERATIONAL CONTROL CENTER */}
      {activePortal === 'admin' && (
        <main className="p-6 lg:p-12 max-w-7xl mx-auto space-y-8 font-mono">
          {/* Admin Subtabs */}
          <div className="flex flex-wrap border-b border-[#202530] gap-6 text-xs font-bold">
            <button
              onClick={() => setAdminTab('workflows')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'workflows'
                  ? 'border-[#D9A76A] text-[#D9A76A]'
                  : 'border-transparent text-[#9CA3AF] hover:text-white'
              }`}
            >
              AUTOMATION RULE ENGINE ({workflows.length})
            </button>
            <button
              onClick={() => setAdminTab('overview')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'overview'
                  ? 'border-[#D9A76A] text-[#D9A76A]'
                  : 'border-transparent text-[#9CA3AF] hover:text-white'
              }`}
            >
              OCCUPANCY & RESERVATIONS ({reservations.length})
            </button>
            <button
              onClick={() => setAdminTab('matrix')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'matrix'
                  ? 'border-[#D9A76A] text-[#D9A76A]'
                  : 'border-transparent text-[#9CA3AF] hover:text-white'
              }`}
            >
              ROOM STATUS MATRIX
            </button>
            <button
              onClick={() => setAdminTab('templates')}
              className={`pb-4 border-b-2 uppercase ${
                adminTab === 'templates'
                  ? 'border-[#D9A76A] text-[#D9A76A]'
                  : 'border-transparent text-[#9CA3AF] hover:text-white'
              }`}
            >
              COMMUNICATION TEMPLATES
            </button>
          </div>

          {/* ADMIN TAB 1: WORKFLOW AUTOMATION ENGINE (THE STAR SHOWCASE) */}
          {adminTab === 'workflows' && (
            <div className="space-y-8">
              {/* Event Simulation Trigger Bar */}
              <div className="bg-[#141822] border border-[#252E3E] p-6 space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <span className="text-[10px] text-[#D9A76A] uppercase font-bold tracking-widest block">
                      LIVE WORKFLOW DISPATCHER SIMULATOR
                    </span>
                    <h3 className="text-sm font-bold text-white uppercase mt-0.5">
                      Simulate Hospitality System Events
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#9CA3AF]">
                    Click to trigger automated actions and inspect execution logs
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => handleSimulateEventTrigger('checkout')}
                    className="px-4 py-2.5 bg-[#1C2230] border border-[#303B50] hover:border-[#10B981] hover:text-[#10B981] text-xs font-bold uppercase transition-all"
                  >
                    Simulate: Guest Checkout Completed
                  </button>
                  <button
                    onClick={() => handleSimulateEventTrigger('prearrival')}
                    className="px-4 py-2.5 bg-[#1C2230] border border-[#303B50] hover:border-[#D9A76A] hover:text-[#D9A76A] text-xs font-bold uppercase transition-all"
                  >
                    Simulate: 48h Pre-Arrival Notification
                  </button>
                  <button
                    onClick={() => handleSimulateEventTrigger('vip')}
                    className="px-4 py-2.5 bg-[#1C2230] border border-[#303B50] hover:border-[#60A5FA] hover:text-[#60A5FA] text-xs font-bold uppercase transition-all"
                  >
                    Simulate: VIP High-Value Booking
                  </button>
                </div>
              </div>

              {/* Visual Rule Builder List */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    ACTIVE HOSPITALITY WORKFLOW RULES
                  </h3>
                  <span className="text-[11px] text-[#9CA3AF]">
                    All rules run without manual staff intervention
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {workflows.map((wf) => (
                    <div
                      key={wf.id}
                      className="bg-[#11141C] border border-[#202530] p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-[10px] text-[#D9A76A] font-bold">
                            {wf.id} // AUTOMATION RULE
                          </span>
                          <span className="text-[10px] bg-[#1F2533] px-2 py-0.5 rounded text-[#9CA3AF]">
                            Trigger Count: {wf.executionsCount}
                          </span>
                        </div>

                        <div className="text-xs space-y-1">
                          <p className="text-white">
                            <span className="text-[#D9A76A] font-bold">WHEN:</span> {wf.trigger}
                          </p>
                          <p className="text-[#10B981]">
                            <span className="text-white font-bold">THEN:</span> {wf.action}
                          </p>
                          <p className="text-[#9CA3AF]">
                            <span className="text-white font-bold">AND:</span> {wf.secondaryAction} ({wf.recipient})
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleToggleWorkflow(wf.id)}
                        className={`px-4 py-2 text-[10px] font-bold uppercase transition-all shrink-0 ${
                          wf.active
                            ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                            : 'bg-gray-800 text-gray-500 border border-gray-700'
                        }`}
                      >
                        {wf.active ? 'ACTIVE WORKFLOW' : 'PAUSED'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-Time Execution Logs */}
              <div className="bg-[#11141C] border border-[#202530] p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#202530] pb-3">
                  <h3 className="text-xs font-bold text-white uppercase">
                    REAL-TIME AUTOMATION AUDIT LOG
                  </h3>
                  <span className="text-[10px] text-[#10B981] animate-pulse">
                    ● LOG STREAM MONITORING ACTIVE
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  {workflowLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-3 bg-[#0A0C10] border border-[#1C222E] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <span className="text-[10px] text-[#D9A76A] font-bold">{log.ruleId}</span>
                          <span className="text-[10px] text-[#9CA3AF]">{log.timestamp}</span>
                          <span className="text-white font-bold">{log.triggerEvent}</span>
                        </div>
                        <p className="text-[#CBD5E1] text-[11px]">{log.dispatchedAction}</p>
                      </div>

                      <div className="flex items-center space-x-3 text-[10px] shrink-0">
                        <span className="text-[#9CA3AF]">{log.targetRecipient}</span>
                        <span className="bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 px-2 py-0.5">
                          {log.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Custom Automation Rule Form */}
              <form onSubmit={handleAddRule} className="bg-[#141822] border border-[#252E3E] p-6 space-y-4">
                <h3 className="text-xs font-bold text-[#D9A76A] uppercase">
                  CREATE CUSTOM IF/THEN AUTOMATION TRIGGER
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-[#9CA3AF] block mb-1">TRIGGER EVENT (WHEN)</label>
                    <select
                      value={newRule.trigger}
                      onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
                      className="w-full bg-[#0A0C10] border border-[#262E3D] p-3 text-white outline-none"
                    >
                      <option value="Reservation is Confirmed">Reservation is Confirmed</option>
                      <option value="48 Hours Prior to Arrival">48 Hours Prior to Arrival</option>
                      <option value="Guest Completes Checkout">Guest Completes Checkout</option>
                      <option value="Late Checkout Requested">Late Checkout Requested</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">PRIMARY ACTION (THEN)</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Send SMS Welcome Key"
                      value={newRule.action}
                      onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
                      className="w-full bg-[#0A0C10] border border-[#262E3D] p-3 text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[#9CA3AF] block mb-1">SECONDARY ACTION & RECIPIENT</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alert Reception Channel"
                      value={newRule.secondaryAction}
                      onChange={(e) => setNewRule({ ...newRule, secondaryAction: e.target.value })}
                      className="w-full bg-[#0A0C10] border border-[#262E3D] p-3 text-white outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D9A76A] text-[#0C0E12] text-xs font-bold uppercase tracking-wider"
                >
                  Save and Activate Automation
                </button>
              </form>
            </div>
          )}

          {/* ADMIN TAB 2: OCCUPANCY & RESERVATIONS LIST */}
          {adminTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Operational KPI Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#11141C] border border-[#202530] p-5">
                  <p className="text-[10px] text-[#9CA3AF] uppercase">RESORT OCCUPANCY</p>
                  <p className="text-2xl font-bold text-[#D9A76A] mt-1">87.5%</p>
                  <p className="text-[10px] text-[#10B981] mt-1">7 of 8 Luxury Units Booked</p>
                </div>
                <div className="bg-[#11141C] border border-[#202530] p-5">
                  <p className="text-[10px] text-[#9CA3AF] uppercase">TODAY ARRIVALS</p>
                  <p className="text-2xl font-bold text-white mt-1">2 Partys</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-1">VIP Eleanor Vance arriving 22:00</p>
                </div>
                <div className="bg-[#11141C] border border-[#202530] p-5">
                  <p className="text-[10px] text-[#9CA3AF] uppercase">TODAY DEPARTURES</p>
                  <p className="text-2xl font-bold text-white mt-1">1 Party</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-1">Turnaround scheduled at 11:30</p>
                </div>
                <div className="bg-[#11141C] border border-[#202530] p-5">
                  <p className="text-[10px] text-[#9CA3AF] uppercase">MONTH-TO-DATE REVENUE</p>
                  <p className="text-2xl font-bold text-[#10B981] mt-1">$28,450</p>
                  <p className="text-[10px] text-[#9CA3AF] mt-1">Average Daily Rate: $485</p>
                </div>
              </div>

              {/* Reservations Data Table */}
              <div className="bg-[#11141C] border border-[#202530] overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0A0C10] border-b border-[#202530] text-[#9CA3AF] text-[10px] uppercase">
                      <th className="p-4">REF ID</th>
                      <th className="p-4">GUEST NAME</th>
                      <th className="p-4">ACCOMMODATION</th>
                      <th className="p-4">CHECK-IN</th>
                      <th className="p-4">CHECK-OUT</th>
                      <th className="p-4">NIGHTS</th>
                      <th className="p-4 text-right">TOTAL</th>
                      <th className="p-4 text-center">STATUS</th>
                      <th className="p-4 text-center">FOLIO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#202530]">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-[#181D28] transition-colors">
                        <td className="p-4 font-bold text-[#D9A76A]">{res.id}</td>
                        <td className="p-4">
                          <p className="font-bold text-white">{res.guestName}</p>
                          <p className="text-[10px] text-[#9CA3AF]">{res.guestEmail}</p>
                        </td>
                        <td className="p-4 text-[#CBD5E1]">
                          <p>{res.roomName}</p>
                          {res.isVip && (
                            <span className="text-[9px] bg-[#D9A76A]/20 text-[#D9A76A] px-1.5 py-0.2 border border-[#D9A76A]/30">
                              VIP STATUS
                            </span>
                          )}
                        </td>
                        <td className="p-4 text-[#9CA3AF]">{res.checkIn}</td>
                        <td className="p-4 text-[#9CA3AF]">{res.checkOut}</td>
                        <td className="p-4 text-white">{res.nights}</td>
                        <td className="p-4 text-right font-bold text-[#10B981]">
                          ${res.totalPrice.toLocaleString()}
                        </td>
                        <td className="p-4 text-center">
                          <span
                            className={`px-2 py-0.5 text-[10px] font-bold uppercase ${
                              res.status === 'Checked-In'
                                ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30'
                                : 'bg-[#D9A76A]/20 text-[#D9A76A] border border-[#D9A76A]/30'
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            onClick={() => setSelectedResFolio(res)}
                            className="text-[#D9A76A] hover:underline text-[10px] font-bold"
                          >
                            VIEW FOLIO
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ADMIN TAB 3: ROOM STATUS MATRIX */}
          {adminTab === 'matrix' && (
            <div className="bg-[#11141C] border border-[#202530] p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-[#202530] pb-4">
                <div>
                  <h3 className="text-xs font-bold text-white uppercase">
                    ROOM INVENTORY STATUS & HOUSEKEEPING MATRIX
                  </h3>
                  <p className="text-[11px] text-[#9CA3AF]">
                    Physical occupancy status across all boutique units
                  </p>
                </div>
                <div className="flex space-x-4 text-[10px]">
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 bg-[#10B981]"></span>
                    <span>Clean & Vacant</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 bg-[#D9A76A]"></span>
                    <span>Occupied</span>
                  </span>
                  <span className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 bg-[#EF4444]"></span>
                    <span>Turnaround / Housekeeping</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { unit: 'Unit 101', name: 'The Obsidian Grand Suite', status: 'Occupied', guest: 'Marcus Sterling', housekeeping: 'Inspected' },
                  { unit: 'Unit 102', name: 'The Obsidian Grand Suite', status: 'Clean & Vacant', guest: 'Arrival at 20:00', housekeeping: 'Ready' },
                  { unit: 'Unit 201', name: 'Sanctuary Garden Villa', status: 'Occupied', guest: 'Dr. Alistair Chen', housekeeping: 'Turnaround at 11:00' },
                  { unit: 'Unit 202', name: 'Sanctuary Garden Villa', status: 'Clean & Vacant', guest: 'Vacant', housekeeping: 'Ready' },
                  { unit: 'Unit 301', name: 'The Crown Penthouse', status: 'Occupied', guest: 'Eleanor Vance', housekeeping: 'VIP Preparation' },
                  { unit: 'Unit 401', name: 'Alpine Timberline Chalet', status: 'Turnaround / Housekeeping', guest: 'Checkout Completed', housekeeping: 'Cleaning in Progress' },
                  { unit: 'Unit 402', name: 'Alpine Timberline Chalet', status: 'Clean & Vacant', guest: 'Vacant', housekeeping: 'Ready' },
                ].map((item) => (
                  <div key={item.unit} className="bg-[#0A0C10] border border-[#202530] p-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-[#D9A76A]">{item.unit}</span>
                      <span
                        className={`px-1.5 py-0.5 font-bold ${
                          item.status === 'Clean & Vacant'
                            ? 'text-[#10B981] bg-[#10B981]/10'
                            : item.status === 'Occupied'
                            ? 'text-[#D9A76A] bg-[#D9A76A]/10'
                            : 'text-[#EF4444] bg-[#EF4444]/10'
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white">{item.name}</p>
                    <p className="text-[11px] text-[#9CA3AF]">Guest: {item.guest}</p>
                    <p className="text-[10px] text-[#CBD5E1] border-t border-[#1C222E] pt-2">
                      Housekeeping: {item.housekeeping}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADMIN TAB 4: COMMUNICATION TEMPLATES */}
          {adminTab === 'templates' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-2">
                <span className="text-[10px] text-[#D9A76A] uppercase font-bold tracking-widest block mb-2">
                  TRIGGERED MESSAGING TEMPLATES
                </span>
                {[
                  { id: 'confirmation', title: 'Booking Confirmation Email' },
                  { id: 'prearrival', title: '48h Pre-Arrival & Digital Key' },
                  { id: 'housekeeping', title: 'Housekeeping Turnaround Alert' },
                  { id: 'thankyou', title: 'Post-Checkout & Review Prompt' },
                ].map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setActiveTemplate(tmpl.id as any)}
                    className={`w-full text-left p-4 border transition-all text-xs font-bold ${
                      activeTemplate === tmpl.id
                        ? 'bg-[#181D28] border-[#D9A76A] text-white'
                        : 'bg-[#11141C] border-[#202530] text-[#9CA3AF] hover:text-white'
                    }`}
                  >
                    {tmpl.title}
                  </button>
                ))}
              </div>

              <div className="lg:col-span-8 bg-[#11141C] border border-[#202530] p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-[#202530] pb-3 text-xs">
                  <span className="text-white font-bold uppercase">TEMPLATE PREVIEW & MERGE TAGS</span>
                  <span className="text-[10px] text-[#10B981]">Dynamic Merge Tags Active</span>
                </div>

                <div className="bg-[#0A0C10] p-6 border border-[#1C222E] text-xs font-mono space-y-3 text-[#D1D5DB] leading-relaxed">
                  {activeTemplate === 'confirmation' && (
                    <>
                      <p className="text-[#D9A76A] font-bold">Subject: Your Reservation at StayFlow Sanctuary ({'{{reservation_id}}'})</p>
                      <p>Dear {'{{guest_name}}'},</p>
                      <p>We are delighted to confirm your stay at StayFlow. Your booking for the {'{{room_name}}'} has been secured for {'{{check_in_date}}'} through {'{{check_out_date}}'} ({'{{nights}}'} nights).</p>
                      <p>Total charge: ${'{{total_price}}'} USD. Your digital folio has been opened in our property management system.</p>
                      <p>48 hours prior to arrival, our system will automatically transmit your digital contactless key code and pre-arrival preference form.</p>
                    </>
                  )}
                  {activeTemplate === 'prearrival' && (
                    <>
                      <p className="text-[#D9A76A] font-bold">Subject: Welcome to StayFlow: Digital Key & Check-In Coordinates</p>
                      <p>Hello {'{{guest_name}}'},</p>
                      <p>Your suite, {'{{room_name}}'}, is currently being prepared for your arrival tomorrow. Your contactless door PIN is: #4928#.</p>
                      <p>If you have any last-minute dining preferences or require airport valet pickup, reply directly to this notification.</p>
                    </>
                  )}
                  {activeTemplate === 'housekeeping' && (
                    <>
                      <p className="text-[#D9A76A] font-bold">Subject: [OPERATIONAL DISPATCH] Turnaround Order: {'{{unit_number}}'}</p>
                      <p>Trigger: Guest checkout completed for {'{{guest_name}}'}.</p>
                      <p>Action: Unit {'{{unit_number}}'} ({'{{room_name}}'}) has been marked for priority linen change, sanitation, and mini-bar restocking.</p>
                      <p>Next Arrival: Scheduled at 15:00.</p>
                    </>
                  )}
                  {activeTemplate === 'thankyou' && (
                    <>
                      <p className="text-[#D9A76A] font-bold">Subject: Thank You for Staying With StayFlow</p>
                      <p>Dear {'{{guest_name}}'},</p>
                      <p>It was a privilege hosting you at our sanctuary. Your final itemized folio has been reconciled.</p>
                      <p>We invite you to share your feedback with our general management team to help us continually elevate our craft.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* BOOKING MODAL (STEP 2 OF GUEST FLOW) */}
      {isBookingModalOpen && selectedRoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs"
        >
          <div className="bg-[#121620] border border-[#D9A76A]/40 max-w-xl w-full p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsBookingModalOpen(false)}
              className="absolute top-6 right-6 text-[#9CA3AF] hover:text-white text-base focus:outline-none"
              aria-label="Close booking modal"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] text-[#D9A76A] font-bold uppercase tracking-widest block">
                CHECKOUT & WORKFLOW REGISTRATION
              </span>
              <h3 className="text-2xl font-serif text-white mt-1">{selectedRoom.name}</h3>
              <p className="text-[11px] text-[#9CA3AF] mt-1">
                Dates: {searchDates.checkIn} to {searchDates.checkOut} ({calculateNights()} Nights) • {searchDates.guests} Guests
              </p>
            </div>

            {/* Optional Concierge Add-Ons */}
            <div className="bg-[#0A0C10] p-4 border border-[#202530] space-y-3">
              <span className="text-[10px] text-[#D9A76A] uppercase font-bold tracking-wider block">
                Select Concierge Pre-Arrival Add-Ons
              </span>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOnServices.airportTransfer}
                  onChange={(e) => setAddOnServices({ ...addOnServices, airportTransfer: e.target.checked })}
                  className="rounded border-[#252E3E]"
                />
                <span className="text-white">Chauffeured Airport Transfer (+$120)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOnServices.champagneArrival}
                  onChange={(e) => setAddOnServices({ ...addOnServices, champagneArrival: e.target.checked })}
                  className="rounded border-[#252E3E]"
                />
                <span className="text-white">Chilled Champagne & Artisan Cheeses on Arrival (+$95)</span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={addOnServices.dailyBreakfast}
                  onChange={(e) => setAddOnServices({ ...addOnServices, dailyBreakfast: e.target.checked })}
                  className="rounded border-[#252E3E]"
                />
                <span className="text-white">Daily Artisanal In-Suite Breakfast (+$45/person/day)</span>
              </label>
            </div>

            {/* Guest Form */}
            <form onSubmit={handleConfirmReservation} className="space-y-4">
              <div>
                <label className="text-[#9CA3AF] uppercase block mb-1">Primary Guest Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={guestForm.name}
                  onChange={(e) => setGuestForm({ ...guestForm, name: e.target.value })}
                  className="w-full bg-[#0A0C10] border border-[#252E3E] p-3 text-white outline-none focus:border-[#D9A76A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[#9CA3AF] uppercase block mb-1">Email Address (For Workflow Dispatch) *</label>
                  <input
                    required
                    type="email"
                    placeholder="eleanor@vancecapital.com"
                    value={guestForm.email}
                    onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                    className="w-full bg-[#0A0C10] border border-[#252E3E] p-3 text-white outline-none focus:border-[#D9A76A]"
                  />
                </div>

                <div>
                  <label className="text-[#9CA3AF] uppercase block mb-1">Mobile Phone (For Key SMS)</label>
                  <input
                    type="tel"
                    placeholder="+1 212 555 0192"
                    value={guestForm.phone}
                    onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                    className="w-full bg-[#0A0C10] border border-[#252E3E] p-3 text-white outline-none focus:border-[#D9A76A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[#9CA3AF] uppercase block mb-1">Special Preferences / Allergies</label>
                <input
                  type="text"
                  placeholder="e.g. Feather allergy, late check-in at 21:00"
                  value={guestForm.specialRequests}
                  onChange={(e) => setGuestForm({ ...guestForm, specialRequests: e.target.value })}
                  className="w-full bg-[#0A0C10] border border-[#252E3E] p-3 text-white outline-none focus:border-[#D9A76A]"
                />
              </div>

              {/* Price Calculation Engine Summary */}
              {(() => {
                const p = calculatePricing(selectedRoom)
                return (
                  <div className="bg-[#0A0C10] p-4 border border-[#202530] space-y-2 text-[#CBD5E1]">
                    <div className="flex justify-between">
                      <span>Base Rate ({p.nights} nights @ ${selectedRoom.pricePerNight}):</span>
                      <span>${p.baseRoomTotal}</span>
                    </div>
                    {p.addOns > 0 && (
                      <div className="flex justify-between text-[#D9A76A]">
                        <span>Concierge Add-Ons:</span>
                        <span>+${p.addOns}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Taxes & Resort Hospitality Fee (15%):</span>
                      <span>${p.taxesAndResortFee}</span>
                    </div>
                    <div className="flex justify-between border-t border-[#202530] pt-2 font-bold text-white text-sm">
                      <span>TOTAL RESERVATION DUE:</span>
                      <span className="text-[#D9A76A]">${p.total} USD</span>
                    </div>
                  </div>
                )
              })()}

              <button
                type="submit"
                className="w-full py-4 bg-[#D9A76A] text-[#0C0E12] font-bold uppercase tracking-widest hover:bg-white transition-all text-xs"
              >
                Confirm Booking & Trigger Automated Folio
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMED BOOKING RECEIPT DRAWER */}
      {confirmedBooking && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs"
        >
          <div className="bg-[#121620] border border-[#D9A76A] max-w-md w-full p-8 text-center space-y-6">
            <div className="w-12 h-12 bg-[#10B981]/20 border border-[#10B981]/40 rounded-full flex items-center justify-center mx-auto text-[#10B981] font-bold text-xl">
              ✓
            </div>

            <div>
              <span className="text-[10px] text-[#D9A76A] font-bold uppercase tracking-widest block">
                RESERVATION CONFIRMED
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                BOOKING REF: {confirmedBooking.id}
              </h3>
            </div>

            <div className="bg-[#0A0C10] p-4 border border-[#202530] text-left space-y-2 text-[#CBD5E1]">
              <p>Guest: <span className="text-white font-bold">{confirmedBooking.guestName}</span></p>
              <p>Suite: <span className="text-white font-bold">{confirmedBooking.roomName}</span></p>
              <p>Dates: <span className="text-white">{confirmedBooking.checkIn} to {confirmedBooking.checkOut} ({confirmedBooking.nights} nights)</span></p>
              <p>Total Charge: <span className="text-[#10B981] font-bold">${confirmedBooking.totalPrice.toLocaleString()} USD</span></p>
            </div>

            <div className="bg-[#D9A76A]/10 border border-[#D9A76A]/30 p-4 text-[11px] text-[#D9A76A] text-left leading-relaxed">
              Workflow WF-01 triggered: Instant booking confirmation simulated for {confirmedBooking.guestEmail}. Pre-arrival automation scheduled.
              <br />
              <span className="text-[10px] text-[#9CA3AF] block mt-1">
                Notice: Simulation mode. No AI API yet, No database connection yet.
              </span>
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full py-3 bg-[#D9A76A] text-[#0C0E12] font-bold uppercase tracking-wider hover:bg-white transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* GUEST FOLIO DETAIL MODAL */}
      {selectedResFolio && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-mono text-xs"
        >
          <div className="bg-[#121620] border border-[#202530] max-w-lg w-full p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#202530] pb-3">
              <div>
                <span className="text-[10px] text-[#D9A76A] font-bold uppercase">{selectedResFolio.id}</span>
                <h3 className="text-base font-bold text-white">{selectedResFolio.guestName}</h3>
              </div>
              <button onClick={() => setSelectedResFolio(null)} className="text-[#9CA3AF] hover:text-white">✕</button>
            </div>

            <div className="space-y-3 text-[#D1D5DB]">
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Contact:</span><span className="text-white">{selectedResFolio.guestEmail}</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Phone:</span><span className="text-white">{selectedResFolio.guestPhone}</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Accommodation:</span><span className="text-white">{selectedResFolio.roomName}</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Stay Dates:</span><span className="text-white">{selectedResFolio.checkIn} to {selectedResFolio.checkOut} ({selectedResFolio.nights} nights)</span></div>
              <div className="flex justify-between"><span className="text-[#9CA3AF]">Status:</span><span className="text-[#10B981] font-bold">{selectedResFolio.status}</span></div>
              {selectedResFolio.specialRequests && (
                <div className="border-t border-[#202530] pt-2">
                  <span className="text-[#9CA3AF] block text-[10px] uppercase">Special Requests:</span>
                  <p className="text-white mt-0.5">{selectedResFolio.specialRequests}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedResFolio(null)}
              className="w-full py-2.5 bg-[#202530] hover:bg-[#303748] text-white font-bold uppercase transition-all"
            >
              Close Folio
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
