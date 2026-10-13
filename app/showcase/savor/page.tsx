'use client'

import { useState, useEffect, useRef } from 'react'

// antislop active: during (session override).
// Design Read: Luxury WebGL Dining Showcase for High-End Clientele, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

// Signature Dishes Data
const SIGNATURE_DISHES = [
  {
    id: 'savor-1',
    name: 'Black Truffle Tagliolini',
    price: '$38',
    category: 'First Course',
    description: 'Hand-rolled egg ribbon pasta bathed in cultured Normandy butter, finished with 24-month aged Parmigiano-Reggiano and freshly shaved Umbrian winter black truffles.',
    ingredients: ['Hand-rolled Tagliolini', 'Umbrian Black Truffle', 'Normandy Butter', 'Parmigiano-Reggiano 24mo', 'Fleur de Sel'],
    dietary: 'Vegetarian Option Available',
    rotationDeg: 45,
    colorAccent: '#D4AF37',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'savor-2',
    name: 'Dry-Aged Wagyu Ribeye A5',
    price: '$120',
    category: 'Mains',
    description: '45-day dry-aged Miyazaki Wagyu ribeye seared over binchotan charcoal. Served with roasted bone marrow emulsion and charred baby leek jus.',
    ingredients: ['Miyazaki Wagyu A5', 'Binchotan Charcoal Smoke', 'Bone Marrow Emulsion', 'Charred Leek', 'Black Garlic'],
    dietary: 'Gluten-Free',
    rotationDeg: 120,
    colorAccent: '#E11D48',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'savor-3',
    name: 'Glacier Toothfish & Yuzu Glaze',
    price: '$54',
    category: 'Mains',
    description: 'Sustainably wild-caught Patagonian Toothfish caramelized with fermented yuzu saikyo miso, accompanied by sea grapes and dashi-poached daikon radish.',
    ingredients: ['Patagonian Toothfish', 'Yuzu Saikyo Miso', 'Sea Grapes', 'Daikon Radish', 'Dashi Reduction'],
    dietary: 'Pescatarian / GF',
    rotationDeg: 210,
    colorAccent: '#06B6D4',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'savor-4',
    name: 'Dark Chocolate Sphere & Gold',
    price: '$26',
    category: 'Desserts',
    description: '70% Valrhona Guanaja dark chocolate shell filled with hazelnut praline mousse and passionfruit gel, melted tableside with hot espresso ganache.',
    ingredients: ['70% Valrhona Dark Chocolate', 'Hazelnut Praline', 'Passionfruit Gel', 'Single Origin Espresso', '24k Gold Leaf'],
    dietary: 'Vegetarian',
    rotationDeg: 300,
    colorAccent: '#F59E0B',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=800&q=80',
  },
]

export default function SavorRestaurantPage() {
  const [selectedDish, setSelectedDish] = useState(SIGNATURE_DISHES[0])
  const [rotationAngle, setRotationAngle] = useState(0)
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [reservationNotice, setReservationNotice] = useState('')

  // Interactive 3D Canvas mouse reactivity
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 20
      const y = (clientY / window.innerHeight - 0.5) * 20
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Render 3D Canvas Simulation Animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let angle = 0

    const render = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2 + mousePos.x
      const centerY = canvas.height / 2 + mousePos.y

      // Draw 3D luxury plate simulation wireframes & lighting
      ctx.save()
      ctx.translate(centerX, centerY)

      // Outer golden aura ring
      ctx.beginPath()
      ctx.arc(0, 0, 160 + Math.sin(angle) * 5, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Middle rotating plate rim
      ctx.save()
      ctx.rotate(angle * 0.2)
      ctx.beginPath()
      ctx.ellipse(0, 0, 130, 90, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.restore()

      // Inner dish geometric lattice
      for (let i = 0; i < 8; i++) {
        const rad = (i * Math.PI) / 4 + angle * 0.5
        const px = Math.cos(rad) * 60
        const py = Math.sin(rad) * 40
        ctx.beginPath()
        ctx.arc(px, py, 4, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? 'rgba(212, 175, 55, 0.8)' : 'rgba(225, 29, 72, 0.8)'
        ctx.fill()
      }

      ctx.restore()

      angle += 0.015
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => cancelAnimationFrame(animationFrameId)
  }, [mousePos])

  return (
    <div className="min-h-screen bg-[#08080A] text-[#E5E5E7] font-serif selection:bg-[#D4AF37] selection:text-[#08080A]">
      {/* Editorial Header Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#08080A]/80 backdrop-blur-md border-b border-white/10 px-8 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-extrabold tracking-widest text-[#D4AF37] font-mono">
            SAVOR <span className="text-xs font-serif italic text-white/60 font-normal">/ Culinary Art</span>
          </div>
          <span className="hidden sm:inline-block text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-1 rounded font-mono font-bold uppercase tracking-wider">
            [NOTE: No AI API yet, No database connection yet]
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-xs font-sans tracking-widest uppercase text-white/80">
          <a href="#hero" className="hover:text-[#D4AF37] transition-colors">Experience</a>
          <a href="#dishes" className="hover:text-[#D4AF37] transition-colors">3D Menu</a>
          <a href="#story" className="hover:text-[#D4AF37] transition-colors">Story</a>
        </div>

        <button
          onClick={() => setIsReserveModalOpen(true)}
          className="border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#08080A] px-6 py-2 rounded-full text-xs font-sans font-bold tracking-widest transition-all duration-300 uppercase"
        >
          Reserve Table
        </button>
      </nav>

      {/* HERO 3D SECTION */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden px-6">
        {/* WebGL 3D Interactive Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <p className="text-[#D4AF37] font-sans text-xs tracking-[0.3em] uppercase font-bold">
            CUISINE REIMAGINED THROUGH ART & MOTION
          </p>

          <h1 className="text-6xl md:text-9xl font-normal tracking-tight text-white leading-none">
            Dining, <br />
            <span className="italic font-light text-[#D4AF37]">Reimagined.</span>
          </h1>

          <p className="text-base md:text-xl font-light text-white/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Where Michelin-caliber gastronomy meets interactive digital artistry. Move your cursor to explore spatial textures, signature dishes, and private dining.
          </p>

          <div className="pt-8 flex justify-center space-x-6 font-sans">
            <a
              href="#dishes"
              className="bg-[#D4AF37] text-[#08080A] px-8 py-4 rounded-full text-xs font-bold tracking-widest hover:bg-white transition-all uppercase"
            >
              Explore 3D Dishes
            </a>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="border border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-full text-xs font-bold tracking-widest transition-all uppercase"
            >
              Private Booking
            </button>
          </div>
        </div>
      </section>

      {/* 3D INTERACTIVE DISH MENU SHOWCASE */}
      <section id="dishes" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-3 font-sans">
          <span className="text-xs text-[#D4AF37] font-bold tracking-[0.2em] uppercase">SPATIAL CUISINE SHOWCASE</span>
          <h2 className="text-4xl md:text-6xl font-serif font-normal text-white">Interactive Culinary Sculpture</h2>
          <p className="text-sm text-white/60 max-w-lg mx-auto font-light">
            Select a signature dish to trigger spatial camera focus, ingredient breakdowns, and sensory pairings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Dish Selector List */}
          <div className="lg:col-span-5 space-y-4 font-sans">
            {SIGNATURE_DISHES.map((dish) => (
              <div
                key={dish.id}
                onClick={() => {
                  setSelectedDish(dish)
                  setRotationAngle((prev) => prev + 90)
                }}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  selectedDish.id === dish.id
                    ? 'bg-white/5 border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.15)]'
                    : 'bg-white/2 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">{dish.category}</span>
                  <span className="text-lg font-serif text-white">{dish.price}</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-2">{dish.name}</h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">{dish.description}</p>
              </div>
            ))}
          </div>

          {/* 3D Visualizer Card Focus */}
          <div className="lg:col-span-7 bg-[#101014] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
            {/* Background Image with rotation effect */}
            <div className="absolute inset-0 z-0 opacity-30 transition-all duration-700">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="w-full h-full object-cover transition-transform duration-1000 scale-105"
                style={{ transform: `rotate(${rotationAngle * 0.05}deg)` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-[#101014]/60 to-transparent"></div>
            </div>

            <div className="relative z-10 flex justify-between items-start font-sans">
              <span className="text-xs bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {selectedDish.dietary}
              </span>
              <span className="text-3xl font-serif text-[#D4AF37] font-bold">{selectedDish.price}</span>
            </div>

            <div className="relative z-10 space-y-6 pt-20">
              <div>
                <span className="text-xs text-white/60 font-sans tracking-widest uppercase">3D OBJECT INSPECTOR</span>
                <h3 className="text-4xl md:text-5xl font-serif text-white mt-1">{selectedDish.name}</h3>
              </div>

              <p className="text-base text-white/80 font-sans leading-relaxed max-w-xl">
                {selectedDish.description}
              </p>

              {/* Ingredients Breakdown */}
              <div className="space-y-2 pt-2 font-sans">
                <p className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">Deconstructed Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDish.ingredients.map((ing) => (
                    <span key={ing} className="bg-white/10 border border-white/15 px-3 py-1 rounded-lg text-xs text-white">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 font-sans flex space-x-4">
                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="bg-[#D4AF37] text-[#08080A] px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all"
                >
                  Order In Tasting Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESTAURANT STORY */}
      <section id="story" className="py-28 bg-[#0C0C0E] border-t border-b border-white/5 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs text-[#D4AF37] font-sans font-bold tracking-[0.2em] uppercase">OUR PHILOSOPHY</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">Artisan Heritage & Modern WebGL Precision</h2>
            <p className="text-sm font-sans text-white/70 leading-relaxed">
              Founded in 2024, Savor blends multi-sensory digital art with sustainable organic farming. Every dish is a sculpted canvas crafted to provoke thought and elevate taste.
            </p>
          </div>

          <div className="relative h-96 rounded-2xl overflow-hidden border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
              alt="Restaurant Interior"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* RESERVATION MODAL */}
      {isReserveModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-[#121216] border border-[#D4AF37]/30 rounded-3xl max-w-md w-full p-8 space-y-6 relative">
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white"
            >
              ✕
            </button>

            <div>
              <span className="text-xs text-[#D4AF37] font-bold tracking-widest uppercase">TABLE RESERVATION</span>
              <h3 className="text-2xl font-serif text-white mt-1">Reserve Your Experience</h3>
            </div>

            {reservationNotice ? (
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 p-4 rounded-xl text-center space-y-3">
                <p className="text-xs text-[#D4AF37] font-bold">{reservationNotice}</p>
                <button
                  onClick={() => {
                    setReservationNotice('')
                    setIsReserveModalOpen(false)
                  }}
                  className="px-6 py-2 bg-[#D4AF37] text-[#08080A] text-xs font-bold rounded-lg uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setReservationNotice('Reservation recorded in demo session state. [NOTE: No AI API yet, No database connection yet]')
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="text-white/60 uppercase block mb-1">Full Name</label>
                  <input required type="text" placeholder="Marcello Lienarta" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 uppercase block mb-1">Guests</label>
                    <select className="w-full bg-[#121216] border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]">
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/60 uppercase block mb-1">Date</label>
                    <input required type="date" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-[#D4AF37]" />
                  </div>
                </div>
                <button type="submit" className="w-full py-4 bg-[#D4AF37] text-[#08080A] font-bold rounded-xl uppercase tracking-widest hover:bg-white transition-all">
                  CONFIRM RESERVATION
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
