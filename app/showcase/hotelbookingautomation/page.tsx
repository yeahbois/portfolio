'use client'

import { useState, useEffect } from 'react'
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

// Types
interface MenuItem {
  id: string
  title: string
  price: number
  description: string
  image: string
  badge?: string
  vegetarian?: boolean
}

// Menu Data
const menuData: Record<string, MenuItem[]> = {
  doner: [
    {
      id: 'd1',
      title: 'Classic Döner Kebab',
      price: 6.0,
      description: 'Traditional spit-roasted seasoned beef and veal shaved thin, served in fresh crispy flatbread with garden salads, red cabbage, and our signature garlic-yogurt house sauce.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYFaqEpfzkSybs41OHjUW_maBs0niF2OIJqzHrVeN1h2EhQTvoa8bu7iHymwka5Ux2sgxcFrAHe5quL1irSI2ytXAPGEm99OXJb8VkgH9mZZF7g2rsBleAwzEJRLNryd22vI0wGOPoeuo1itfPt43MroVai_RdhhvBoGxHtxtzxtGU3GmUjlcBGnbUL_c-LSpAnLhn9iE4XDFeIUsDaPFV0DVjyO-4O_Myy1it7zq-CygWL20RYD_7P7rDfj2slQIBpIL_bqtOFg',
      badge: "Chef's Choice",
    },
    {
      id: 'd2',
      title: 'Dürum Special',
      price: 7.5,
      description: 'Thinly rolled artisan yufka flatbread loaded with spiced rotisserie meat, shredded lettuce, ripe tomatoes, red onions, and a double layer of fuchsia-infused sauce.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8kFwtm8tm3SxUkxQPOMRUQmN5T08bJYFzilAZA8_GgWsZEU8AGH0zFcyMOy7hG2kBL9T27e2ozCG0Shepg7ANwg_eWkhpHSX2Iigb3nX3YyYGffFibu2Up5av4a3EChze_EdJhv5MCv_-jVqSAWrW3hjPvoGTNiEdfO4cpJ_Q9KC0i3xS3HK42GKhFFGPOweer6rq3t53M-U1ydj8yv_jpQuB0kgquNfkvCgHq__ourEx8e29r7CPPrji3xi8qmdWXDtq1TD5VA',
    },
    {
      id: 'd3',
      title: 'Lahmacun Deluxe',
      price: 8.0,
      description: 'Hand-stretched Turkish pizza baked with minced spiced lamb and herbs, rolled up with shaved kebab meat, crispy cucumbers, and our signature herb-garlic reduction.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXiXS450Ug0EG1nXpj1Htsb5-YwvAKfGfZfgW8fWq7d3heBqq6iBVd4wPQXC3SkdJKEDeQ5J1UXp-1gR2DhEaDJ7ij205XM9IevHkElRfrt-61P6jS9dP-fcsySY6gCAPbfSdUA-Yvttqn9-i9jZoLlShmgPJ1MKMvv0Brb6K6M2XLu8YC8esNsBxklhRX2OnxvuAhf80CrIqWjwX44blz3K_chAZg6cdupGLnVMd_KQfi57NVqO2zoYetQZUyvzy9Fat005mTPQ',
    },
  ],
  pizza: [
    {
      id: 'p1',
      title: 'Pizza Harz (30cm)',
      price: 9.0,
      description: 'Our signature pizza topped with wild forest mushrooms, spicy local salami, mozzarella cheese, and fresh mountain thyme on a rich San Marzano tomato base.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuiYv-sACmjAb4pU_g_m9d3l_V_nwiG-EMOdzOmBt6SpN5wZLi6F2ZR6L-nFRy-qB9MEgPuLZEJFRdtmt8fInGC-ecXWLSPv9tmhk6rLCx5gHxPO0K9d2aSv0R7ABydUT2Jnkln10g80v5AncNJnsW02iPGig0OS93fRnJyvIIyusWYYDihpJFXhdJwSky0UlreylDs6CGg-AK3iYmIc449FG74owiQvww7txIufvQ5-EjD682VSih7054zMdOfDCWO9SV-KTa4w',
      badge: 'Popular',
    },
    {
      id: 'p2',
      title: 'Pizza Margherita',
      price: 7.5,
      description: 'The standard done exquisitely. Fresh bufala mozzarella, sweet San Marzano tomatoes, premium cold-pressed olive oil, and aromatic leaves of mountain basil.',
      image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80',
      vegetarian: true,
    },
    {
      id: 'p3',
      title: 'Pizza Vegetaria',
      price: 8.5,
      description: 'A colorful garden assembly of roasted red bell peppers, dark olives, grilled zucchini, wild mushrooms, artichoke hearts, and premium goats cheese crumble.',
      image: 'https://images.unsplash.com/photo-1571066811602-71683a3f680d?auto=format&fit=crop&w=800&q=80',
      vegetarian: true,
    },
  ],
  schnitzel: [
    {
      id: 's1',
      title: 'Wiener Schnitzel vom Kalb',
      price: 18.5,
      description: 'Pounded thin, tender veal cutlet in a crispy, golden bubble-crumb crust. Served with fresh lemon wedges, homemade mountain lingonberry compote, and a warm Austrian-style potato salad.',
      image: 'https://images.unsplash.com/photo-1599921841143-819065a55cc6?auto=format&fit=crop&w=800&q=80',
      badge: 'Premium',
    },
    {
      id: 's2',
      title: 'Harzer Jägerschnitzel',
      price: 15.5,
      description: 'Crispy pan-fried pork cutlet smothered in a rich, velvety forest mushroom and cognac cream sauce, topped with fresh chives, and served with house-made buttered spätzle.',
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 's3',
      title: 'Rahmschnitzel Classic',
      price: 14.5,
      description: 'Tender chicken cutlet sauteed in a creamy white wine reduction with green peppercorns, served with roasted green asparagus spears and crispy sea salt french fries.',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    },
  ],
  beverages: [
    {
      id: 'b1',
      title: 'Harz Forest Iced Tea',
      price: 4.5,
      description: 'Our proprietary cold-brew black tea infused with local pine needle needles, wild forest berries, dark honeycomb honey, fresh garden mint, and crushed ice.',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80',
      badge: 'House Special',
    },
    {
      id: 'b2',
      title: 'Fuchsia Velvet Sour',
      price: 6.5,
      description: 'A vibrant, botanical mocktail shaken with pure pomegranate juice, fresh wild rosemary syrup, cold-pressed key lime, egg white foam, and a dehydrated blood orange wheel.',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'b3',
      title: 'Emerald Oasis Cooler',
      price: 5.5,
      description: 'A cooling, premium refresher composed of fresh green apple extract, crushed organic cucumber, elderflower tonic, a squeeze of key lime, and a sprig of fresh sweet woodruff.',
      image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    },
  ],
}

// Icons (Inline SVG Components)
const LocationIcon = () => (
  <svg className="w-5 h-5 text-[#FF2A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const ClockIcon = () => (
  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5 text-[#95d4ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
)

const MinusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1M12 4h8a1 1 0 011 1v2H3V5a1 1 0 011-1h8z" />
  </svg>
)

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

export default function BistroShowcase() {
  const [activeTab, setActiveTab] = useState<'doner' | 'pizza' | 'schnitzel' | 'beverages'>('doner')
  const [tabOpacity, setTabOpacity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Booking Form State
  const [reservation, setReservation] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2 Persons',
    preference: 'Velvet Booth',
  })

  // Pre-ordered Items
  const [preOrder, setPreOrder] = useState<Array<{ item: MenuItem; quantity: number }>>([])

  // Booking reference (stub)
  const [bookingRef, setBookingRef] = useState('')

  // Handle Tab Switch with Smooth Fade Animation
  const handleTabChange = (tabId: typeof activeTab) => {
    if (tabId === activeTab) return
    setTabOpacity(0)
    setTimeout(() => {
      setActiveTab(tabId)
      setTabOpacity(1)
    }, 200)
  }

  // Pre-Order Handlers
  const addToPreOrder = (item: MenuItem) => {
    setPreOrder((prev) => {
      const existing = prev.find((entry) => entry.item.id === item.id)
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        )
      }
      return [...prev, { item, quantity: 1 }]
    })
    setIsDrawerOpen(true) // Automatically show summary drawer when item is added
  }

  const removeFromPreOrder = (itemId: string) => {
    setPreOrder((prev) => {
      const existing = prev.find((entry) => entry.item.id === itemId)
      if (!existing) return prev
      if (existing.quantity === 1) {
        return prev.filter((entry) => entry.item.id !== itemId)
      }
      return prev.map((entry) =>
        entry.item.id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry
      )
    })
  }

  const clearPreOrder = () => setPreOrder([])

  // Subtotal Calculation
  const subtotal = preOrder.reduce((acc, entry) => acc + entry.item.price * entry.quantity, 0)

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reservation.name || !reservation.phone || !reservation.date || !reservation.time) {
      alert('Please fill out all reservation fields.')
      return
    }
    // Generate simple random ref
    const ref = `BH-${Math.floor(100000 + Math.random() * 900000)}`
    setBookingRef(ref)
    setIsSubmitted(true)
  }

  // Reset Booking Form
  const resetBooking = () => {
    setReservation({
      name: '',
      phone: '',
      date: '',
      time: '',
      guests: '2 Persons',
      preference: 'Velvet Booth',
    })
    clearPreOrder()
    setIsSubmitted(false)
    setIsModalOpen(false)
    setIsDrawerOpen(false)
  }

  return (
    <div className={`w-full min-h-screen bg-[#0A0A0A] text-[#e5e2e1] overflow-x-hidden selection:bg-[#FF2A5F] selection:text-white ${outfit.variable} font-sans`}>
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FF2A5F] opacity-[0.06] blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-[60%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#0F5132] opacity-[0.08] blur-[150px] pointer-events-none z-0" />

      {/* TOP NAVIGATION */}
      <nav className="fixed top-0 w-full bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
          <div className="font-bold text-2xl tracking-wide text-[#D4AF37]">
            Bistro <span className="italic font-light">im</span> Harz
          </div>
          <div className="hidden md:flex gap-8 items-center font-medium">
            <a href="#menu" className="text-sm tracking-wider uppercase text-[#e5e2e1] hover:text-[#FF2A5F] transition-colors duration-200">Menu</a>
            <button onClick={() => setIsModalOpen(true)} className="text-sm tracking-wider uppercase text-[#e5e2e1] hover:text-[#FF2A5F] transition-colors duration-200">Reservations</button>
            <a href="#experience" className="text-sm tracking-wider uppercase text-[#e5e2e1] hover:text-[#FF2A5F] transition-colors duration-200">Experience</a>
            <a href="#bento" className="text-sm tracking-wider uppercase text-[#e5e2e1] hover:text-[#FF2A5F] transition-colors duration-200">Quality</a>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#FF2A5F] text-white px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-[0_0_15px_rgba(255,42,95,0.35)] hover:scale-105 hover:shadow-[0_0_20px_rgba(255,42,95,0.5)] transition-all duration-300"
          >
            Book a Table
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center justify-center pt-12 md:pt-24 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/70 to-[#0A0A0A] z-10"></div>
            <img 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity scale-105 transform transition-transform duration-[10000ms] ease-out hover:scale-100" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm9l_LyUQNMRoZlCZQxkuwSRsEkTHa7aUjnXCJVqdc5f4QhwW7MxkmphBHTxIO-TI_VyTgWR79f3-BIUCN8ecOELt8qU3VmZKGyLUTvpIBW8x6aYPpa9JhRwbdnWz0peCEz9L32hyh3YzwJNLSyOyC1sOdEe2R9dUypiiI5d-mdhQ4N_2SyuHc5-UAPWnmI5XpSkCJV1VsYcpq4VdTEWzW7KtF09t4tNsLeyvL63RFNdU6T3rngmdZjKPM9BMSh926c0joDV_OTA"
              alt="Bistro im Harz Atmosphere"
            />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-20 text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FF2A5F]/40 bg-[#FF2A5F]/10 text-[#FF2A5F] text-[10px] uppercase font-bold tracking-widest mb-8 animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF2A5F] shadow-[0_0_10px_#FF2A5F]"></span>
              EXCEPTIONAL HARZ CUISINE
            </div>

            <h1 className="font-extrabold text-5xl md:text-8xl tracking-tight text-white mb-6 leading-none">
              Bistro <span className="text-[#D4AF37] italic font-normal text-glow-gold">im</span> Harz
            </h1>

            <p className="max-w-2xl text-base md:text-xl text-gray-400 font-light leading-relaxed mb-12">
              Experience the art of refined casual dining. Where traditional Harz hospitality meets neon-noir sophistication in the heart of Osterwieck.
            </p>

            {/* Operational Badges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-16">
              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-2xl flex items-center gap-4 hover:border-[#FF2A5F]/30 hover:bg-[#121212]/90 transition-all duration-300">
                <div className="p-3 bg-[#FF2A5F]/10 rounded-xl">
                  <LocationIcon />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Location</p>
                  <p className="text-sm font-medium text-white">Bahnhofstr. 16, 38835 Osterwieck</p>
                </div>
              </div>

              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-2xl flex items-center gap-4 hover:border-[#D4AF37]/30 hover:bg-[#121212]/90 transition-all duration-300">
                <div className="p-3 bg-[#D4AF37]/10 rounded-xl">
                  <ClockIcon />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Hours</p>
                  <p className="text-sm font-medium text-white">11:00 - 21:30 Daily</p>
                </div>
              </div>

              <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/10 px-6 py-5 rounded-2xl flex items-center gap-4 hover:border-[#95d4ac]/30 hover:bg-[#121212]/90 transition-all duration-300">
                <div className="p-3 bg-[#95d4ac]/10 rounded-xl">
                  <PhoneIcon />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Contact</p>
                  <p className="text-sm font-medium text-white">039421 - 2440</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                href="#menu"
                className="bg-[#FF2A5F] text-white px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-[0_0_20px_rgba(255,42,95,0.35)] hover:scale-105 hover:bg-[#ff1e56] transition-all duration-300 text-center"
              >
                Explore Menu
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white/5 backdrop-blur-md border border-white/15 text-white hover:bg-white/10 px-10 py-4.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all duration-300 text-center"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </section>

        {/* MENU SECTION */}
        <section className="py-28 bg-[#0A0A0A] relative" id="menu">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 border-b border-white/10 pb-6">
              <div className="max-w-xl">
                <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Our Culinary <span className="text-[#FF2A5F]">Philosophy</span>
                </h2>
                <p className="text-gray-400 font-light">
                  Meticulously prepared specialties, from masterfully seasoned spit-roasted meats to sophisticated traditional Schnitzels and signature craft botanicals.
                </p>
              </div>

              {/* Tabs */}
              <div className="flex gap-4 md:gap-8 overflow-x-auto w-full md:w-auto scrollbar-thin scrollbar-thumb-white/10 pb-2">
                {(['doner', 'pizza', 'schnitzel', 'beverages'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`pb-3 font-semibold text-xs tracking-widest uppercase border-b-2 transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab
                        ? 'border-[#D4AF37] text-[#D4AF37]'
                        : 'border-transparent text-gray-400 hover:text-[#e5e2e1]'
                    }`}
                  >
                    {tab === 'doner' && 'Döner & Dürum'}
                    {tab === 'pizza' && 'Pizza'}
                    {tab === 'schnitzel' && 'Schnitzel'}
                    {tab === 'beverages' && 'Signature Beverages'}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Cards Grid */}
            <div 
              style={{ opacity: tabOpacity }} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300"
            >
              {menuData[activeTab].map((item) => (
                <div 
                  key={item.id}
                  className="bg-[#121212]/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden group flex flex-col hover:border-[#FF2A5F]/20 hover:bg-[#121212]/80 transition-all duration-300"
                >
                  <div className="h-60 md:h-64 overflow-hidden relative">
                    {item.badge && (
                      <span className="absolute top-4 left-4 z-10 bg-[#0F5132] text-emerald-100 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">
                        {item.badge}
                      </span>
                    )}
                    {item.vegetarian && (
                      <span className="absolute top-4 right-4 z-10 bg-[#0F5132]/90 backdrop-blur-md text-emerald-100 text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        VEGGIE
                      </span>
                    )}
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      src={item.image} 
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors duration-200">
                        {item.title}
                      </h3>
                      <span className="text-lg font-bold text-[#D4AF37] whitespace-nowrap">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>

                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-8 flex-grow">
                      {item.description}
                    </p>

                    <button 
                      onClick={() => addToPreOrder(item)}
                      className="w-full py-3.5 border border-white/10 hover:border-[#FF2A5F] hover:bg-[#FF2A5F] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300"
                    >
                      Add To Order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE BENTO SECTION */}
        <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#121212]/40" id="experience">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Giant Card */}
              <div 
                className="lg:col-span-8 bg-[#121212]/60 border border-white/5 rounded-3xl p-8 md:p-12 flex flex-col justify-end min-h-[350px] md:min-h-[500px] relative overflow-hidden group"
                id="bento"
              >
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent z-10"></div>
                  <img 
                    className="w-full h-full object-cover opacity-20 scale-105 group-hover:scale-100 transition-transform duration-[8000ms] ease-out" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm9l_LyUQNMRoZlCZQxkuwSRsEkTHa7aUjnXCJVqdc5f4QhwW7MxkmphBHTxIO-TI_VyTgWR79f3-BIUCN8ecOELt8qU3VmZKGyLUTvpIBW8x6aYPpa9JhRwbdnWz0peCEz9L32hyh3YzwJNLSyOyC1sOdEe2R9dUypiiI5d-mdhQ4N_2SyuHc5-UAPWnmI5XpSkCJV1VsYcpq4VdTEWzW7KtF09t4tNsLeyvL63RFNdU6T3rngmdZjKPM9BMSh926c0joDV_OTA"
                    alt="Celebration Venue"
                  />
                </div>
                <div className="relative z-10">
                  <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                    Celebrate Life's <span className="text-[#D4AF37]">Flavors</span>
                  </h3>
                  <p className="text-gray-300 font-light max-w-lg mb-8 leading-relaxed">
                    From intimate romantic escapes under deep fuchsia lighting to private velvet-clad corporate bookings, our unique neon-noir design sets the ultimate dining stage.
                  </p>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FF2A5F] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(255,42,95,0.3)] hover:scale-105 hover:bg-[#ff1e56] transition-all duration-300"
                  >
                    Book Your Event
                  </button>
                </div>
              </div>

              {/* Side Cards */}
              <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {/* Card 1 */}
                <div className="bg-[#121212]/60 border border-white/5 rounded-3xl p-8 flex flex-col justify-center items-center text-center hover:border-[#D4AF37]/20 transition-all duration-300">
                  <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-widest mb-3">EXPERIENCE WIDGET</span>
                  <h4 className="text-2xl font-bold text-white mb-2">Gift Cards</h4>
                  <p className="text-sm text-gray-400 font-light mb-6">
                    Deliver a sophisticated night out. Share the signature velvet luxury of Bistro im Harz.
                  </p>
                  <button 
                    onClick={() => alert('Gift card system coming soon!')}
                    className="text-[#FF2A5F] font-bold text-xs uppercase tracking-widest hover:underline hover:text-white transition-all"
                  >
                    Purchase Now &rarr;
                  </button>
                </div>

                {/* Card 2 */}
                <div className="bg-[#0F5132]/10 border border-[#0F5132]/30 rounded-3xl p-8 flex flex-col justify-center items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#0F5132]/20 flex items-center justify-center border border-[#0F5132]/40 mb-4">
                    <svg className="w-6 h-6 text-[#95d4ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Quality Standards</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">
                    100% locally sourced Harz produce, premium select meats, and farm-fresh garden botanicals prepared fresh daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-16 border-t border-white/10 bg-[#0A0A0A] relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
          <div className="font-bold text-2xl tracking-wide text-[#D4AF37]">
            Bistro <span className="italic font-light">im</span> Harz
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 font-light">
            <a href="#menu" className="hover:text-[#FF2A5F] transition-colors">Privacy Policy</a>
            <a href="#menu" className="hover:text-[#FF2A5F] transition-colors">Terms of Service</a>
            <a href="#menu" className="hover:text-[#FF2A5F] transition-colors">Impressum</a>
            <a href="#menu" className="hover:text-[#FF2A5F] transition-colors">Career</a>
          </div>
          <p className="text-xs text-gray-500 font-light mt-4">
            &copy; {new Date().getFullYear()} Bistro im Harz. Osterwieck, Germany. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* FLOATING SUMMARY BUTTON */}
      <button 
        onClick={() => setIsDrawerOpen(true)}
        className="fixed bottom-8 right-8 z-[45] bg-[#121212] border border-[#FF2A5F]/40 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,42,95,0.25)] hover:border-[#FF2A5F] hover:shadow-[0_0_25px_rgba(255,42,95,0.45)] hover:scale-105 transition-all duration-300"
        aria-label="View Booking Details"
      >
        <span className="relative">
          <svg className="w-6 h-6 text-[#FF2A5F]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          {(preOrder.length > 0) && (
            <span className="absolute -top-3.5 -right-3.5 bg-[#FF2A5F] text-white text-[9px] font-extrabold w-5.5 h-5.5 rounded-full flex items-center justify-center border border-[#0A0A0A]">
              {preOrder.reduce((acc, entry) => acc + entry.quantity, 0)}
            </span>
          )}
        </span>
      </button>

      {/* QUICK SUMMARY DRAWER (SIDEBAR) */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
        <aside className={`absolute right-0 top-0 h-full w-full sm:w-96 bg-[#121212] border-l border-white/10 shadow-2xl flex flex-col p-6 transition-transform duration-300 transform ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <div>
                <h3 className="font-bold text-lg text-white">Your Selection</h3>
                <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-widest">Bistro im Harz experience</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white transition-colors" onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto space-y-6 pr-1 scrollbar-thin scrollbar-thumb-white/10">
            {/* Quick Status / Details Card */}
            <div className="bg-[#0F5132]/10 border border-[#0F5132]/25 rounded-2xl p-4 flex gap-4 items-center">
              <CalendarIcon />
              <div>
                <p className="text-[9px] text-[#95d4ac] font-extrabold uppercase tracking-wider mb-0.5">Booking Status</p>
                <p className="text-sm font-semibold text-white">
                  {reservation.date && reservation.time 
                    ? `${reservation.date} @ ${reservation.time}`
                    : 'Awaiting date selection...'}
                </p>
                <p className="text-[11px] text-gray-400 font-light mt-0.5">
                  {reservation.guests} &bull; {reservation.preference}
                </p>
              </div>
            </div>

            {/* Preorder Menu Items Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pre-ordered Dishes</span>
                {preOrder.length > 0 && (
                  <button 
                    onClick={clearPreOrder}
                    className="text-[10px] text-gray-500 hover:text-[#FF2A5F] uppercase font-bold tracking-wider"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {preOrder.length === 0 ? (
                <div className="text-center py-8 bg-white/2 rounded-2xl border border-dashed border-white/5">
                  <p className="text-xs text-gray-500 font-light">No food items added yet.</p>
                  <p className="text-[10px] text-gray-600 font-light mt-1">Browse the menu to pre-order dishes.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {preOrder.map((entry) => (
                    <div key={entry.item.id} className="bg-white/2 border border-white/5 rounded-2xl p-3 flex gap-3 items-center justify-between">
                      <div className="min-w-0 flex-grow">
                        <p className="text-xs font-bold text-white truncate">{entry.item.title}</p>
                        <p className="text-[11px] text-[#D4AF37] font-semibold">{(entry.item.price * entry.quantity).toFixed(2)}€</p>
                      </div>

                      <div className="flex items-center gap-2 border border-white/10 rounded-lg p-1 bg-black/20">
                        <button 
                          onClick={() => removeFromPreOrder(entry.item.id)}
                          className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded transition-all"
                        >
                          <MinusIcon />
                        </button>
                        <span className="text-xs font-bold text-white px-1.5">{entry.quantity}</span>
                        <button 
                          onClick={() => addToPreOrder(entry.item)}
                          className="text-gray-400 hover:text-white p-1 hover:bg-white/5 rounded transition-all"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="mt-auto border-t border-white/5 pt-4 space-y-4">
            <div className="flex justify-between items-center text-sm font-bold text-white px-2">
              <span>Subtotal Pre-Order</span>
              <span className="text-[#D4AF37] text-lg">{subtotal.toFixed(2)}€</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#FF2A5F] text-white py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider text-center hover:bg-[#ff1e56] transition-all"
              >
                Booking Form
              </button>
              <button 
                onClick={handleSubmit}
                disabled={!reservation.name || !reservation.phone || !reservation.date || !reservation.time}
                className="bg-[#D4AF37] disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed text-[#0A0A0A] py-3.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-center hover:bg-white transition-all"
              >
                Confirm Request
              </button>
            </div>
            {!reservation.name && (
              <p className="text-[10px] text-center text-gray-500 font-light">
                * Complete the Booking Form to finalize submission
              </p>
            )}
          </div>
        </aside>
      </div>

      {/* RESERVATION MODAL */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsModalOpen(false)} />
        
        <div className="bg-[#121212] w-full max-w-3xl rounded-3xl border border-white/10 relative z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-gray-400 hover:text-white z-20"
            onClick={() => setIsModalOpen(false)}
          >
            <CloseIcon />
          </button>

          {/* Left Side: Brand Decor */}
          <div className="w-full md:w-[40%] bg-gradient-to-br from-[#0A0A0A] to-[#121212] p-8 flex flex-col justify-between relative overflow-hidden hidden md:flex border-r border-white/5">
            <div className="absolute inset-0 z-0 opacity-20">
              <img 
                className="w-full h-full object-cover mix-blend-luminosity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXiXS450Ug0EG1nXpj1Htsb5-YwvAKfGfZfgW8fWq7d3heBqq6iBVd4wPQXC3SkdJKEDeQ5J1UXp-1gR2DhEaDJ7ij205XM9IevHkElRfrt-61P6jS9dP-fcsySY6gCAPbfSdUA-Yvttqn9-i9jZoLlShmgPJ1MKMvv0Brb6K6M2XLu8YC8esNsBxklhRX2OnxvuAhf80CrIqWjwX44blz3K_chAZg6cdupGLnVMd_KQfi57NVqO2zoYetQZUyvzy9Fat005mTPQ"
                alt="Interior decor"
              />
            </div>
            <div className="relative z-10">
              <div className="font-extrabold text-lg text-[#D4AF37] mb-2 uppercase tracking-widest">BISTRO IM HARZ</div>
              <p className="text-[11px] text-gray-400 font-light">Fine hospitality, neon-noir nights.</p>
            </div>
            <div className="relative z-10 mt-auto">
              <p className="text-[11px] text-[#FF2A5F] font-bold uppercase tracking-widest mb-1">&bull; Velvet Booths Available</p>
              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Choose our Velvet Booths for a cozy dining session, or the Gold Lounge for premium hospitality.
              </p>
            </div>
          </div>

          {/* Right Side: Form / Success State */}
          <div className="w-full md:w-[60%] p-8 md:p-12 overflow-y-auto max-h-[90vh]">
            {!isSubmitted ? (
              <div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Book a Table</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                  Fill in your details below to request a dining reservation. We highly recommend booking 24 hours in advance.
                </p>

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="e.g. Marcello Lienarta"
                      value={reservation.name}
                      onChange={(e) => setReservation({ ...reservation, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#FF2A5F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      placeholder="e.g. +49 170 1234567"
                      value={reservation.phone}
                      onChange={(e) => setReservation({ ...reservation, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-500 focus:border-[#FF2A5F] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Guests</label>
                      <select 
                        value={reservation.guests}
                        onChange={(e) => setReservation({ ...reservation, guests: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#FF2A5F] focus:outline-none transition-colors"
                      >
                        <option>1 Person</option>
                        <option>2 Persons</option>
                        <option>4 Persons</option>
                        <option>6 Persons</option>
                        <option>8+ Persons</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Area Preference</label>
                      <select 
                        value={reservation.preference}
                        onChange={(e) => setReservation({ ...reservation, preference: e.target.value })}
                        className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#FF2A5F] focus:outline-none transition-colors"
                      >
                        <option>Velvet Booth</option>
                        <option>Neon Corner</option>
                        <option>Gold Lounge</option>
                        <option>Window Seat</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Date</label>
                      <input 
                        required
                        type="date" 
                        value={reservation.date}
                        onChange={(e) => setReservation({ ...reservation, date: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#FF2A5F] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">Time</label>
                      <input 
                        required
                        type="time" 
                        value={reservation.time}
                        onChange={(e) => setReservation({ ...reservation, time: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#FF2A5F] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit"
                      className="w-full bg-[#FF2A5F] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(255,42,95,0.3)] hover:scale-102 hover:bg-[#ff1e56] transition-all"
                    >
                      Request Table {preOrder.length > 0 && `& Pre-order (${subtotal.toFixed(2)}€)`}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-[#0F5132]/20 border border-[#0F5132]/40 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[#95d4ac]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Reservation Received</h3>
                <p className="text-xs text-[#D4AF37] font-semibold tracking-wider mb-6">REFERENCE: {bookingRef}</p>

                {/* Receipt Details Box */}
                <div className="bg-white/2 border border-white/10 rounded-2xl p-6 text-left space-y-4 mb-8 text-xs font-light text-gray-300">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider">Guest Information</span>
                    <span className="text-gray-400">{reservation.name}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider">Contact Phone</span>
                    <span className="text-gray-400">{reservation.phone}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider">Date & Time</span>
                    <span className="text-gray-400">{reservation.date} @ {reservation.time}</span>
                  </div>

                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="font-bold text-white text-[10px] uppercase tracking-wider">Guests / Preference</span>
                    <span className="text-gray-400">{reservation.guests} &bull; {reservation.preference}</span>
                  </div>

                  {preOrder.length > 0 && (
                    <div className="pt-2">
                      <p className="font-bold text-white text-[10px] uppercase tracking-wider mb-2">Pre-ordered Dishes</p>
                      <div className="space-y-1 bg-black/20 p-3 rounded-lg border border-white/5">
                        {preOrder.map((entry) => (
                          <div key={entry.item.id} className="flex justify-between items-center text-[11px]">
                            <span>{entry.quantity}x {entry.item.title}</span>
                            <span className="font-semibold text-white">{(entry.item.price * entry.quantity).toFixed(2)}€</span>
                          </div>
                        ))}
                        <div className="flex justify-between items-center text-xs font-bold text-white border-t border-white/5 pt-2 mt-2">
                          <span>Total Pre-Order Cost</span>
                          <span className="text-[#D4AF37]">{subtotal.toFixed(2)}€</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-xs text-gray-400 mb-8 font-light max-w-sm mx-auto leading-relaxed">
                  We have sent a text message with confirmation details to your phone. We look forward to welcoming you to Bistro im Harz!
                </p>

                <button 
                  onClick={resetBooking}
                  className="bg-white text-[#0A0A0A] hover:bg-gray-200 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors duration-200"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
