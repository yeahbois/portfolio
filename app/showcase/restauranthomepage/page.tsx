'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

interface Dish {
  id: string
  name: string
  category: 'starters' | 'mains' | 'desserts' | 'beverages'
  price: string
  description: string
  ingredients: string[]
  dietary: string[]
  calories: string
  pairings: string
  color: string
}

const DISHES: Dish[] = [
  {
    id: 'wagyu-harz',
    name: 'Harz Wagyu & Black Truffle',
    category: 'mains',
    price: '€48.00',
    description: 'Dry-aged Harz highland beef, pan-seared over cherrywood charcoal with winter black truffle shavings and smoked bone marrow reduction.',
    ingredients: ['Dry-aged Beef', 'Black Truffle', 'Bone Marrow', 'Wild Thyme', 'Harz Salt Butter'],
    dietary: ['Gluten-Free', 'High Protein'],
    calories: '680 kcal',
    pairings: '2018 Pinot Noir, Domaine de la Romanée',
    color: '#FF2A5F'
  },
  {
    id: 'forest-salmon',
    name: 'Wild Atlantic Salmon Confit',
    category: 'mains',
    price: '€38.00',
    description: 'Slow-poached salmon in pine-infused olive oil, accompanied by charred leek cream, pickled chanterelles, and crispy skin crisp.',
    ingredients: ['Atlantic Salmon', 'Pine Needle Oil', 'Chanterelles', 'Charred Leek', 'Dill Emulsion'],
    dietary: ['Gluten-Free', 'Pescatarian'],
    calories: '520 kcal',
    pairings: '2021 Riesling Reserve, Mosel',
    color: '#0F5132'
  },
  {
    id: 'velvet-duck',
    name: 'Glazed Duck Breast & Elderberry',
    category: 'mains',
    price: '€42.00',
    description: 'Pan-roasted duck breast with elderberry reduction, caramelized parsnip puree, and spiced hazelnut crumble.',
    ingredients: ['Local Duck', 'Harz Elderberries', 'Parsnip Puree', 'Hazelnuts', 'Star Anise Jus'],
    dietary: ['Contains Nuts', 'Dairy-Free option'],
    calories: '610 kcal',
    pairings: '2019 Syrah, Rhône Valley',
    color: '#D4AF37'
  },
  {
    id: 'truffle-carpaccio',
    name: 'Smoked Forest Mushroom Carpaccio',
    category: 'starters',
    price: '€24.00',
    description: 'Wafer-thin king oyster mushrooms drizzled with white truffle oil, toasted pine nuts, and aged parmesan crisps.',
    ingredients: ['King Oyster Mushrooms', 'White Truffle Oil', '24-Mo Aged Parmesan', 'Pine Nuts', 'Micro Herbs'],
    dietary: ['Vegetarian', 'Gluten-Free'],
    calories: '290 kcal',
    pairings: '2022 Sauvignon Blanc, Marlborough',
    color: '#D4AF37'
  },
  {
    id: 'velvet-chocolate',
    name: 'Golden Dark Chocolate Sphere',
    category: 'desserts',
    price: '€18.00',
    description: ' Valrhona 72% dark chocolate dome poured over with hot espresso caramel, revealing hazelnut praline and gold leaf flakes.',
    ingredients: ['72% Valrhona Chocolate', 'Gold Leaf', 'Espresso Caramel', 'Hazelnut Praline', 'Vanilla Bean Ice Cream'],
    dietary: ['Vegetarian'],
    calories: '450 kcal',
    pairings: '20-Year Tawny Port',
    color: '#FF2A5F'
  },
  {
    id: 'harz-elixir',
    name: 'Harz Botanical Elixir',
    category: 'beverages',
    price: '€16.00',
    description: 'Signature cocktail featuring artisanal Harz gin, smoked rosemary, fermented wild berries, and champagne spritz.',
    ingredients: ['Harz Botanical Gin', 'Smoked Rosemary', 'Fermented Wild Berries', 'Brut Champagne'],
    dietary: ['Vegan', 'Gluten-Free'],
    calories: '180 kcal',
    pairings: 'Signature Aperitif',
    color: '#0F5132'
  }
]

export default function SavorPage() {
  const [selectedDish, setSelectedDish] = useState<Dish>(DISHES[0])
  const [activeCategory, setActiveCategory] = useState<'all' | 'starters' | 'mains' | 'desserts' | 'beverages'>('all')
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [isSideNavOpen, setIsSideNavOpen] = useState(false)
  const [guestCount, setGuestCount] = useState('2 Persons')
  const [resDate, setResDate] = useState('2025-05-15')
  const [resTime, setResTime] = useState('19:30')
  const [resName, setResName] = useState('')
  const [resEmail, setResEmail] = useState('')
  const [resNotes, setResNotes] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const rotationRef = useRef({ angleX: 0, angleY: 0 })

  // Interactive 3D Canvas Rendering (Sphere / Platter 3D Wireframe / Particle Mesh simulation)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / width - 0.5
      const y = (e.clientY - rect.top) / height - 0.5
      mouseRef.current.targetX = x * 2
      mouseRef.current.targetY = y * 2
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Generate 3D Dish mesh points
    const points: { x: number; y: number; z: number; size: number; color: string }[] = []
    const numPoints = 240
    for (let i = 0; i < numPoints; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = u * 2.0 * Math.PI
      const phi = Math.acos(2.0 * v - 1.0)
      const r = 160 + Math.sin(i * 0.1) * 30
      points.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        size: Math.random() * 2 + 1,
        color: i % 3 === 0 ? '#D4AF37' : i % 3 === 1 ? '#FF2A5F' : '#0F5132'
      })
    }

    let time = 0

    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05

      rotationRef.current.angleY = time * 0.5 + mouseRef.current.x * 0.8
      rotationRef.current.angleX = mouseRef.current.y * 0.5

      const cosY = Math.cos(rotationRef.current.angleY)
      const sinY = Math.sin(rotationRef.current.angleY)
      const cosX = Math.cos(rotationRef.current.angleX)
      const sinX = Math.sin(rotationRef.current.angleX)

      const centerX = width / 2
      const centerY = height / 2

      // Draw outer ambient ring
      ctx.beginPath()
      ctx.arc(centerX, centerY, 200, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)'
      ctx.lineWidth = 1
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(centerX, centerY, 240, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 42, 95, 0.1)'
      ctx.lineWidth = 1
      ctx.setLineDash([4, 8])
      ctx.stroke()
      ctx.setLineDash([])

      // Render 3D points sorted by depth
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY
        let z1 = p.z * cosY + p.x * sinY
        // Rotate X
        let y1 = p.y * cosX - z1 * sinX
        let z2 = z1 * cosX + p.y * sinX

        // Perspective scale
        const fov = 400
        const scale = fov / (fov + z2 + 250)
        return {
          x: centerX + x1 * scale,
          y: centerY + y1 * scale,
          z: z2,
          scale,
          size: p.size * scale,
          color: p.color
        }
      })

      projected.sort((a, b) => b.z - a.z)

      projected.forEach((p) => {
        const alpha = Math.max(0.1, Math.min(1, (p.z + 200) / 400))
        ctx.beginPath()
        ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.fill()
      })

      // Draw golden interactive core glow
      ctx.globalAlpha = 0.25
      const gradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, 180)
      gradient.addColorStop(0, selectedDish.color || '#D4AF37')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 180, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1.0

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [selectedDish])

  const filteredDishes = activeCategory === 'all'
    ? DISHES
    : DISHES.filter((d) => d.category === activeCategory)

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setIsReservationOpen(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#e5e2e1] font-sans selection:bg-[#D4AF37] selection:text-[#0A0A0A]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/10 z-50 flex justify-between items-center px-6 md:px-16 py-4">
        <div className="flex items-center space-x-3">
          <span className="font-serif text-2xl font-bold tracking-tight text-[#D4AF37]">
            SAVOR
          </span>
          <span className="text-[10px] font-mono border border-[#D4AF37]/30 px-2 py-0.5 text-[#D4AF37] tracking-widest uppercase">
            3D DIGITAL EXPERIENCE
          </span>
        </div>

        <div className="hidden md:flex gap-8 items-center font-mono text-xs tracking-wider uppercase">
          <a href="#hero" className="hover:text-[#FF2A5F] transition-colors">Hero</a>
          <a href="#interactive-3d" className="hover:text-[#FF2A5F] transition-colors">3D Menu</a>
          <a href="#menu-grid" className="hover:text-[#FF2A5F] transition-colors">Full Selection</a>
          <a href="#experience" className="hover:text-[#FF2A5F] transition-colors">Atmosphere</a>
          <a href="#location" className="hover:text-[#FF2A5F] transition-colors">Location</a>
        </div>

        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-xs font-mono text-[#e5e2e1]/60 hover:text-white transition-colors"
          >
            ← Portfolio
          </Link>
          <button
            onClick={() => setIsReservationOpen(true)}
            className="bg-[#FF2A5F] text-white px-5 py-2.5 rounded-full font-mono text-xs font-bold tracking-wider hover:scale-105 shadow-[0_0_20px_rgba(255,42,95,0.4)] transition-all"
          >
            Reserve Table
          </button>
        </div>
      </nav>

      {/* Hero Section with Interactive 3D Canvas */}
      <section id="hero" className="relative min-h-screen pt-28 flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0 opacity-30 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]"></div>

        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 py-12">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[#FF2A5F]/40 bg-[#FF2A5F]/10 text-[#FF2A5F] font-mono text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF2A5F] animate-ping"></span>
              <span>FINE DINING & DIGITAL ART</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-none">
              Dining, <br />
              <span className="text-[#D4AF37] italic font-light">Reimagined.</span>
            </h1>

            <p className="text-lg text-[#e5e2e1]/80 max-w-lg leading-relaxed font-light">
              An immersive culinary sanctuary where Michelin-grade gastronomy meets real-time interactive 3D craftsmanship. Explore our dishes before taking your seat.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => {
                  const el = document.getElementById('interactive-3d')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="bg-[#D4AF37] text-[#0A0A0A] px-8 py-4 rounded-full font-mono text-xs font-bold tracking-widest hover:bg-white transition-all uppercase"
              >
                Explore 3D Menu
              </button>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="border border-white/20 hover:border-[#D4AF37] px-8 py-4 rounded-full font-mono text-xs tracking-widest transition-all uppercase"
              >
                Book a Table
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-xs font-mono">
              <div>
                <p className="text-[#D4AF37] font-bold">LOCATION</p>
                <p className="text-[#e5e2e1]/70">Harz District, DE</p>
              </div>
              <div>
                <p className="text-[#D4AF37] font-bold">HOURS</p>
                <p className="text-[#e5e2e1]/70">17:00 – 23:30 Daily</p>
              </div>
              <div>
                <p className="text-[#D4AF37] font-bold">MICHELIN</p>
                <p className="text-[#e5e2e1]/70">2 Stars Candidate</p>
              </div>
            </div>
          </div>

          {/* Right Interactive 3D Canvas Container */}
          <div className="lg:col-span-6 relative h-[450px] md:h-[550px] w-full border border-white/10 rounded-3xl overflow-hidden bg-[#0A0A0A]/90 shadow-2xl flex flex-col justify-between p-6">
            <div className="flex justify-between items-start z-10">
              <div>
                <span className="font-mono text-[10px] text-[#D4AF37] tracking-widest uppercase block">
                  Interactive Object
                </span>
                <span className="font-serif text-xl text-white font-bold">
                  {selectedDish.name}
                </span>
              </div>
              <span className="font-mono text-sm text-[#D4AF37] font-bold border border-[#D4AF37]/30 px-3 py-1 rounded-full">
                {selectedDish.price}
              </span>
            </div>

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

            <div className="z-10 flex justify-between items-end text-xs font-mono text-[#e5e2e1]/70">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Move cursor to rotate 3D viewport</span>
              </div>
              <span>{selectedDish.calories}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Dish Showcase Section */}
      <section id="interactive-3d" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-mono text-xs text-[#FF2A5F] tracking-widest uppercase block mb-2">
              01 // 3D DISH INSPECTION
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Select a Creation to <span className="text-[#D4AF37] italic">Examine</span>
            </h2>
          </div>
          <p className="font-mono text-xs text-[#e5e2e1]/70 max-w-md">
            Click any dish to trigger camera focus, ingredient breakdown, sommelier pairing suggestions, and nutritional data.
          </p>
        </div>

        {/* Dish Selection Chips */}
        <div className="flex flex-wrap gap-3 mb-12">
          {DISHES.map((dish) => (
            <button
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs transition-all ${
                selectedDish.id === dish.id
                  ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-white/5 border border-white/10 hover:border-[#D4AF37] text-[#e5e2e1]'
              }`}
            >
              {dish.name}
            </button>
          ))}
        </div>

        {/* Detailed Dish Inspection Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 border border-white/15 bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: `${selectedDish.color}22` }}
          />

          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest font-bold">
                {selectedDish.category}
              </span>
              <span className="text-white/20">•</span>
              <span className="font-mono text-xs text-[#e5e2e1]/70">{selectedDish.calories}</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-serif font-bold text-white">
              {selectedDish.name}
            </h3>

            <p className="text-base text-[#e5e2e1]/80 leading-relaxed font-light">
              {selectedDish.description}
            </p>

            {/* Ingredients Tags */}
            <div>
              <p className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest mb-3">
                Key Ingredients
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDish.ingredients.map((ing) => (
                  <span key={ing} className="bg-black/40 border border-white/10 px-3 py-1 rounded-md text-xs font-mono text-[#e5e2e1]">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Wine Pairing & Dietary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              <div>
                <p className="font-mono text-[10px] text-[#e5e2e1]/60 uppercase tracking-widest">
                  Sommelier Wine Pairing
                </p>
                <p className="font-serif text-sm font-semibold text-[#D4AF37] mt-1">
                  {selectedDish.pairings}
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] text-[#e5e2e1]/60 uppercase tracking-widest">
                  Dietary Badges
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedDish.dietary.map((d) => (
                    <span key={d} className="text-[10px] font-mono border border-emerald-500/40 text-emerald-400 px-2 py-0.5 rounded">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between items-start lg:items-end border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-12 relative z-10 space-y-6">
            <div className="text-left lg:text-right">
              <span className="font-mono text-xs text-[#e5e2e1]/60 block mb-1">PRICE PER PORTION</span>
              <span className="text-4xl md:text-5xl font-serif font-bold text-[#D4AF37]">
                {selectedDish.price}
              </span>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full py-4 bg-[#FF2A5F] text-white font-mono text-xs font-bold tracking-widest rounded-xl hover:scale-102 transition-all uppercase shadow-[0_0_20px_rgba(255,42,95,0.3)]"
              >
                Order For Table Reservation
              </button>
              <p className="text-[10px] font-mono text-[#e5e2e1]/50 text-center">
                Includes complimentary amouse-bouche & water service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Menu Grid */}
      <section id="menu-grid" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="font-mono text-xs text-[#0F5132] tracking-widest uppercase block mb-2">
              02 // COMPLETE GASTRONOMIC COLLECTION
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Full Culinary <span className="text-[#D4AF37] italic">Roster</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border border-white/10 p-1.5 rounded-full bg-white/5">
            {(['all', 'starters', 'mains', 'desserts', 'beverages'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#0A0A0A] font-bold'
                    : 'text-[#e5e2e1]/70 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => setSelectedDish(dish)}
              className={`border p-8 rounded-3xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group flex flex-col justify-between ${
                selectedDish.id === dish.id ? 'border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.2)]' : 'border-white/10'
              }`}
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/30 px-2 py-0.5 rounded">
                    {dish.category}
                  </span>
                  <span className="font-serif text-xl font-bold text-[#D4AF37]">{dish.price}</span>
                </div>

                <h4 className="text-xl font-serif font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {dish.name}
                </h4>

                <p className="text-xs text-[#e5e2e1]/70 font-light leading-relaxed mb-6">
                  {dish.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {dish.ingredients.slice(0, 3).map((i) => (
                    <span key={i} className="text-[10px] font-mono bg-black/40 text-[#e5e2e1]/80 px-2 py-0.5 rounded">
                      {i}
                    </span>
                  ))}
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedDish(dish)
                    const el = document.getElementById('interactive-3d')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full py-2.5 border border-white/20 text-xs font-mono rounded-xl group-hover:border-[#D4AF37] group-hover:text-[#D4AF37] transition-all"
                >
                  Inspect in 3D →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Restaurant Atmosphere & Story */}
      <section id="experience" className="py-24 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-[#D4AF37] tracking-widest uppercase block">
              03 // ATMOSPHERE & CRAFT
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Velvet Acoustics, <br />
              <span className="text-[#FF2A5F]">Neon Noir Elegance.</span>
            </h2>
            <p className="text-base text-[#e5e2e1]/80 leading-relaxed font-light">
              Located in the mystical Harz mountainside, Savor blends historical architectural elements with modern velvet seating, ambient warm champagne illumination, and an open hearth kitchen.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="border-l-2 border-[#D4AF37] pl-4">
                <span className="text-3xl font-serif font-bold text-white block">48</span>
                <span className="font-mono text-xs text-[#e5e2e1]/60">Exclusive Cover Seats</span>
              </div>
              <div className="border-l-2 border-[#FF2A5F] pl-4">
                <span className="text-3xl font-serif font-bold text-white block">350+</span>
                <span className="font-mono text-xs text-[#e5e2e1]/60">Curated Wine Cellar</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 border border-white/10 p-8 rounded-3xl bg-white/5 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-[#D4AF37]">Chef&apos;s Tasting Journey</h3>
            <p className="text-sm font-mono text-[#e5e2e1]/80 leading-relaxed">
              &quot;We don&apos;t simply serve meals; we choreograph a multi-sensory evening where every temperature, texture, and aroma tells the story of our valley.&quot;
            </p>

            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center font-serif text-lg text-[#D4AF37] font-bold">
                M
              </div>
              <div>
                <p className="font-serif font-bold text-white">Marcello Lienarta</p>
                <p className="font-mono text-xs text-[#D4AF37]">Executive Culinary Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Drawer / Modal */}
      {isReservationOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-3xl max-w-xl w-full p-8 md:p-10 relative space-y-6 shadow-2xl">
            <button
              onClick={() => setIsReservationOpen(false)}
              className="absolute top-6 right-6 text-white/60 hover:text-white font-mono text-xl"
            >
              ✕
            </button>

            <div>
              <span className="font-mono text-xs text-[#D4AF37] uppercase tracking-widest block mb-1">
                SAVOR GASTRONOMY
              </span>
              <h3 className="text-3xl font-serif font-bold text-white">Table Reservation</h3>
            </div>

            {bookingSuccess ? (
              <div className="p-6 bg-emerald-950/50 border border-emerald-500/40 rounded-2xl text-center space-y-3">
                <span className="text-3xl">✨</span>
                <h4 className="font-serif text-xl text-emerald-400 font-bold">Reservation Requested!</h4>
                <p className="font-mono text-xs text-emerald-200">
                  Confirmation sent for {guestCount} on {resDate} at {resTime}. We look forward to welcoming you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-[#e5e2e1]/70 mb-1">FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    placeholder="Marcello Lienarta"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#e5e2e1]/70 mb-1">GUESTS</label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"
                    >
                      <option>2 Persons</option>
                      <option>4 Persons</option>
                      <option>6 Persons</option>
                      <option>Private Dining (8+)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#e5e2e1]/70 mb-1">TIME</label>
                    <input
                      type="time"
                      required
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#e5e2e1]/70 mb-1">DATE</label>
                  <input
                    type="date"
                    required
                    value={resDate}
                    onChange={(e) => setResDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#e5e2e1]/70 mb-1">DIETARY / SPECIAL NOTES</label>
                  <textarea
                    rows={2}
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                    placeholder="Allergies, anniversary celebration, window seating preference..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D4AF37] text-[#0A0A0A] font-bold rounded-xl tracking-widest hover:bg-white transition-all uppercase shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                >
                  CONFIRM RESERVATION REQUEST
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="location" className="py-12 border-t border-white/10 px-6 md:px-16 text-center font-mono text-xs text-[#e5e2e1]/60 space-y-4">
        <p className="text-white font-serif text-2xl font-bold tracking-tight text-[#D4AF37]">SAVOR</p>
        <p>Bahnhofstrasse 16, 38835 Osterwieck • Tel: +49 (0) 39421 2440</p>
        <p className="text-[10px] text-white/40">© 2025 SAVOR. Crafted for Client Showcase by Marcello Lienarta.</p>
      </footer>
    </div>
  )
}
