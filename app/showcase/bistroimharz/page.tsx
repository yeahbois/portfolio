'use client'

import { useState } from 'react'

// antislop active: during (session override).
// Design Read: Lux Velvet Dining Showcase for Bistro im Harz (Neon-Noir Aesthetic), dial ENERGY 2 / RHYTHM 2 / MOTION 2.

interface MenuItem {
  id: string
  name: string
  category: 'doner' | 'pizza' | 'schnitzel' | 'beverages'
  price: string
  priceNum: number
  description: string
  tags: string[]
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'bistro-1',
    name: 'Harzer Döner Special',
    category: 'doner',
    price: '€8.50',
    priceNum: 8.5,
    description: 'Fresh baked flatbread filled with seasoned rotisserie meat, crisp iceberg lettuce, red cabbage, vine tomatoes, and signature garlic dill sauce.',
    tags: ['Best Seller', 'House Special'],
  },
  {
    id: 'bistro-2',
    name: 'Dürum Roll Supreme',
    category: 'doner',
    price: '€9.00',
    priceNum: 9.0,
    description: 'Thin hand-pressed lavash roll stuffed with grilled veal strips, feta cheese, jalapenos, and spicy paprika spread.',
    tags: ['Spicy Option'],
  },
  {
    id: 'bistro-3',
    name: 'Pizza Harz Flame',
    category: 'pizza',
    price: '€12.50',
    priceNum: 12.5,
    description: 'Stone-baked pizza topped with spicy salami, smoked bacon, bell peppers, fresh mozzarella, and chili oil drizzle.',
    tags: ['Wood-Fired'],
  },
  {
    id: 'bistro-4',
    name: 'Pizza Quattro Formaggi',
    price: '€11.80',
    priceNum: 11.8,
    description: 'Rich combination of Mozzarella, Gorgonzola, Parmigiano-Reggiano, and Gouda on San Marzano tomato base.',
    category: 'pizza',
    tags: ['Vegetarian'],
  },
  {
    id: 'bistro-5',
    name: 'Classic Jägerschnitzel',
    category: 'schnitzel',
    price: '€14.50',
    priceNum: 14.5,
    description: 'Golden pan-fried pork cutlet smothered in creamy wild mushroom and onion gravy, served with crinkle-cut fries.',
    tags: ['Traditional German'],
  },
  {
    id: 'bistro-6',
    name: 'Zigeunerschnitzel Paprika',
    category: 'schnitzel',
    price: '€14.50',
    priceNum: 14.5,
    description: 'Crispy breaded cutlet topped with a tangy zesty bell pepper and tomato sauce, served with lemon slice and side salad.',
    tags: ['Chef Signature'],
  },
  {
    id: 'bistro-7',
    name: 'Signature Neon Spezi',
    category: 'beverages',
    price: '€3.80',
    priceNum: 3.8,
    description: 'Chilled blend of cola and fruity orange soda served over ice with fresh citrus wheel.',
    tags: ['Refreshing'],
  },
  {
    id: 'bistro-8',
    name: 'Iced Mint & Lemonade',
    category: 'beverages',
    price: '€4.20',
    priceNum: 4.2,
    description: 'House-made sparkling lemonade infused with crushed garden mint and organic raw sugar.',
    tags: ['House Craft'],
  },
]

export default function BistroImHarzPage() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'doner' | 'pizza' | 'schnitzel' | 'beverages'>('all')
  const [cart, setCart] = useState<MenuItem[]>([])
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [reservationNotice, setReservationNotice] = useState('')

  const [bookingForm, setBookingForm] = useState({
    name: '',
    guests: '2 Guests',
    date: '',
    time: '19:00',
    notes: '',
  })

  // Filtered Menu
  const filteredMenu = activeCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory)

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart([...cart, item])
    setIsCartOpen(true)
  }

  const removeFromCart = (index: number) => {
    const updated = [...cart]
    updated.splice(index, 1)
    setCart(updated)
  }

  const cartSubtotal = cart.reduce((acc, item) => acc + item.priceNum, 0)

  // Handle Reservation
  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingForm.name || !bookingForm.date) return
    setReservationNotice(`Table reservation confirmed for ${bookingForm.name} on ${bookingForm.date} at ${bookingForm.time}. [NOTE: No AI API yet, No database connection yet]`)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E5E2E1] font-sans selection:bg-[#FF2A5F] selection:text-white">
      {/* Lux Velvet Top Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex justify-between items-center max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center space-x-3">
          <span className="text-xl font-extrabold text-[#D4AF37] tracking-wider font-mono">Bistro im Harz</span>
          <span className="hidden sm:inline-block text-[10px] bg-[#FF2A5F]/10 text-[#FF2A5F] border border-[#FF2A5F]/30 px-2 py-0.5 rounded font-mono font-bold">
            [NOTE: No AI API yet, No database connection yet]
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-bold text-white/80">
          <a href="#menu" className="hover:text-[#FF2A5F] transition-colors">Menu</a>
          <a href="#experience" className="hover:text-[#FF2A5F] transition-colors">Experience</a>
          <a href="#about" className="hover:text-[#FF2A5F] transition-colors">Osterwieck Location</a>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-[#D4AF37] hover:border-[#D4AF37]"
          >
            Cart ({cart.length})
          </button>
          <button
            onClick={() => setIsReservationOpen(true)}
            className="bg-[#FF2A5F] text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,42,95,0.4)]"
          >
            Book Table
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80"
            alt="Bistro Dining Atmosphere"
            className="w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full border border-[#FF2A5F]/30 bg-[#FF2A5F]/10 text-[#FF2A5F] text-xs font-bold uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#FF2A5F]"></span>
            <span>NEON-NOIR DINING IN OSTERWIECK</span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-none">
            High Contrast. <br />
            <span className="text-[#D4AF37]">Authentic Taste.</span>
          </h1>

          <p className="text-sm md:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Welcome to Bistro im Harz. We elevate traditional Döner, wood-fired Pizzas, and handcrafted Schnitzels into a modern velvet culinary experience.
          </p>

          <div className="pt-4 flex justify-center space-x-4">
            <a
              href="#menu"
              className="bg-[#FF2A5F] text-white px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(255,42,95,0.3)]"
            >
              Explore Menu
            </a>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </section>

      {/* DYNAMIC MENU SHOWCASE */}
      <section id="menu" className="py-20 px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs text-[#D4AF37] font-bold tracking-[0.2em] uppercase">CURATED SELECTION</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Our Signature Menu</h2>
          <p className="text-sm text-white/60 max-w-md mx-auto">
            Select a dish category below to explore pre-orders and taste offerings.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 text-xs font-bold uppercase tracking-wider">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'doner', label: 'Döner & Dürum' },
            { id: 'pizza', label: 'Pizza' },
            { id: 'schnitzel', label: 'Schnitzel' },
            { id: 'beverages', label: 'Signature Beverages' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2.5 rounded-full border transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#0A0A0A] border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="bg-[#121212] border border-white/10 p-6 rounded-2xl flex flex-col justify-between space-y-4 hover:border-[#FF2A5F]/50 transition-all group"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-wrap gap-2 items-center">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors">{item.name}</h3>
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-[9px] bg-[#FF2A5F]/10 border border-[#FF2A5F]/30 text-[#FF2A5F] px-2 py-0.5 rounded font-bold uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xl font-extrabold text-[#D4AF37]">{item.price}</span>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">{item.description}</p>
              </div>

              <div className="pt-2 flex justify-between items-center border-t border-white/5">
                <span className="text-[10px] text-white/40 uppercase font-mono">Osterwieck Kitchen</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-4 py-2 bg-white/5 border border-white/15 text-white text-xs font-bold rounded-lg hover:bg-[#FF2A5F] hover:border-[#FF2A5F] transition-all"
                >
                  + Pre-Order Dish
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOCATION & HOURS */}
      <section id="about" className="py-20 bg-[#0E0E0E] border-t border-white/10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs text-[#FF2A5F] font-bold tracking-widest uppercase">VISIT OUR BISTRO</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">Osterwieck Dining Destination</h2>
            <p className="text-xs text-white/70 leading-relaxed">
              Located in the heart of Osterwieck, Bistro im Harz brings vibrant flavor profiles, pristine hygiene standards, and welcoming hospitality.
            </p>

            <div className="space-y-3 text-xs bg-[#141414] p-6 rounded-2xl border border-white/10">
              <p><strong className="text-[#D4AF37]">Address:</strong> Harzstrasse 14, 38835 Osterwieck, Germany</p>
              <p><strong className="text-[#D4AF37]">Hours:</strong> Tuesday - Sunday: 11:00 AM - 10:00 PM</p>
              <p><strong className="text-[#D4AF37]">Reservations:</strong> +49 (0) 39421 8820</p>
            </div>
          </div>

          <div className="relative h-80 rounded-2xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Bistro Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* RESERVATION MODAL */}
      {isReservationOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 text-xs">
          <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-3xl max-w-md w-full p-8 space-y-6 relative">
            <button
              onClick={() => {
                setIsReservationOpen(false)
                setReservationNotice('')
              }}
              className="absolute top-6 right-6 text-white/60 hover:text-white"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase">BISTRO IM HARZ</span>
              <h3 className="text-2xl font-bold text-white mt-1">Book Table Reservation</h3>
            </div>

            {reservationNotice ? (
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 rounded-xl text-center space-y-4">
                <p className="text-xs text-[#D4AF37] font-bold leading-relaxed">{reservationNotice}</p>
                <button
                  onClick={() => {
                    setReservationNotice('')
                    setIsReservationOpen(false)
                  }}
                  className="px-6 py-2.5 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-lg uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="text-white/60 block mb-1 uppercase">Full Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="Guest Name"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 block mb-1 uppercase">Party Size</label>
                    <select
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({ ...bookingForm, guests: e.target.value })}
                      className="w-full bg-[#141414] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                    >
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>8+ Guests</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white/60 block mb-1 uppercase">Date *</label>
                    <input
                      required
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#FF2A5F] text-white font-bold rounded-xl uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_15px_rgba(255,42,95,0.4)]"
                >
                  CONFIRM BOOKING
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* PRE-ORDER CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-end">
          <div className="bg-[#121212] border-l border-white/10 h-full w-full max-w-md p-8 space-y-6 flex flex-col justify-between overflow-y-auto text-xs">
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest">PRE-ORDER CART</span>
                  <h3 className="text-xl font-bold text-white">Your Selections ({cart.length})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-white/60 hover:text-white">✕</button>
              </div>

              {cart.length === 0 ? (
                <p className="text-white/50 text-center py-12">Your cart is currently empty. Click + Pre-Order Dish on any item to add it here.</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
                      <div>
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-[10px] text-[#D4AF37]">{item.price}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(idx)}
                        className="text-[#FF2A5F] hover:underline text-[10px] font-bold"
                      >
                        REMOVE
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-4 border-t border-white/10 pt-4">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span>SUBTOTAL</span>
                <span className="text-[#D4AF37]">€{cartSubtotal.toFixed(2)}</span>
              </div>
              <p className="text-[10px] text-white/50">Note: Pre-orders are saved in session state. [NOTE: No AI API yet, No database connection yet]</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-xl uppercase tracking-wider"
              >
                CLOSE CART
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
