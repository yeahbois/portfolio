'use client'

import { useState, useEffect, useRef } from 'react'

// antislop active: during (session override).
// Reading this as: Interactive 3D Luxury Restaurant Experience for high-end diners and food connoisseurs, in an editorial cinematic and warm artisanal style, dial ENERGY 2 / RHYTHM 3 / MOTION 2.

interface Dish {
  id: string
  name: string
  course: string
  price: string
  description: string
  ingredients: string[]
  dietary: string
  winePairing: string
  temperature: string
  prepTime: string
  image: string
  accentColor: string
}

const SIGNATURE_DISHES: Dish[] = [
  {
    id: 'dish-1',
    name: 'Black Winter Truffle Tagliolini',
    course: 'Primi Piatti',
    price: '$42',
    description: 'Fresh 40-egg yolk pasta ribbon immersed in cultured Normandy mountain butter, seasoned with aged 36-month Parmigiano-Reggiano and generous tableside shavings of Norcia black winter truffle.',
    ingredients: ['Hand-Crafted 40-Yolk Tagliolini', 'Norcia Black Truffles', 'Normandy Beurre de Baratte', '36mo Vacche Rosse Parmigiano', 'Maldon Smoked Sea Salt'],
    dietary: 'Vegetarian option available',
    winePairing: '2019 Barolo Cannubi, Piedmont',
    temperature: 'Warm (62°C)',
    prepTime: 'Freshly Rolled Daily',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#C5A059',
  },
  {
    id: 'dish-2',
    name: 'Dry-Aged Miyazaki Wagyu A5 Ribeye',
    course: 'Secondi',
    price: '$135',
    description: '45-day dry-aged Japanese black cattle ribeye grilled over Kishu binchotan charcoal. Accompanied by roasted bone marrow emulsion, charred Tokyo scallion jus, and black garlic reduction.',
    ingredients: ['Miyazaki Wagyu A5 Ribeye', 'Kishu Binchotan Sear', 'Roasted Bone Marrow Emulsion', 'Charred Tokyo Scallion', 'Fermented Black Garlic Puree'],
    dietary: 'Gluten-Free',
    winePairing: '2018 Château Pontet-Canet, Pauillac',
    temperature: 'Medium-Rare (54°C)',
    prepTime: '45-Day Dry Aging',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#B84A39',
  },
  {
    id: 'dish-3',
    name: 'Glacier Patagonian Toothfish in Yuzu Miso',
    course: 'Secondi di Pesce',
    price: '$58',
    description: 'Wild-caught deep-sea Patagonian Toothfish caramel-crusted in 72-hour fermented Saikyo sweet miso and green yuzu. Served with dashi-braised heirloom daikon and crisp sea grapes.',
    ingredients: ['Sustainably Harvested Toothfish', 'Kyoto Saikyo White Miso', 'Fresh Green Yuzu Zest', 'Braised Winter Daikon', 'Okinawan Sea Grapes'],
    dietary: 'Pescatarian / Dairy-Free',
    winePairing: '2021 Meursault Premier Cru, Burgundy',
    temperature: 'Delicately Glazed (58°C)',
    prepTime: '72-Hour Cured Marinade',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#2D8287',
  },
  {
    id: 'dish-4',
    name: 'Valrhona Guanaja Sphere with Gold Leaf',
    course: 'Dolci',
    price: '$28',
    description: 'Sculpted 70% dark chocolate shell enclosing roasted Piedmont hazelnut praline and tart passionfruit gel, melted tableside with hot single-origin Ethiopian espresso ganache.',
    ingredients: ['70% Valrhona Guanaja Dark Chocolate', 'IGP Piedmont Hazelnut Praline', 'Alphonso Passionfruit Gel', 'Single-Origin Yirgacheffe Espresso', '24-Karat Edible Gold Leaf'],
    dietary: 'Vegetarian',
    winePairing: '2017 Château d Yquem, Sauternes',
    temperature: 'Hot Tableside Pour over Chilled Core',
    prepTime: 'Artisanal Tempering',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=85',
    accentColor: '#C5A059',
  },
]

export default function SavorShowcasePage() {
  const [selectedDish, setSelectedDish] = useState<Dish>(SIGNATURE_DISHES[0])
  const [rotationDeg, setRotationDeg] = useState(0)
  const [isRotating, setIsRotating] = useState(false)
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false)
  const [reservationNotice, setReservationNotice] = useState('')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  // Reservation Form State
  const [reserveForm, setReserveForm] = useState({
    name: '',
    email: '',
    guests: '2 Guests',
    date: '2025-03-22',
    time: '19:30',
    seatingZone: 'Main Dining Salon',
    notes: '',
  })

  const heroCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const dishCanvasRef = useRef<HTMLCanvasElement | null>(null)

  // Track cursor position for spatial camera parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2
      const normY = (e.clientY / window.innerHeight - 0.5) * 2
      setCursorPos({ x: normX, y: normY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Keyboard accessibility: Escape closes modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsReserveModalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Hero 3D Restaurant Table Scene (Canvas WebGL-Style 3D Projection)
  useEffect(() => {
    const canvas = heroCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const render = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const centerX = w / 2 + cursorPos.x * 25
      const centerY = h / 2 + cursorPos.y * 20

      // Table Horizon Perspective Lines
      ctx.save()
      ctx.translate(centerX, centerY + 100)

      // Ambient Table Surface Grid with 3D projection
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.08)'
      ctx.lineWidth = 1

      for (let r = 80; r <= 380; r += 50) {
        ctx.beginPath()
        ctx.ellipse(0, 40, r, r * 0.45, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // Outer Bronze Charger Plate Ring
      ctx.beginPath()
      ctx.ellipse(0, 20, 220 + Math.sin(time * 0.8) * 3, 100, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.35)'
      ctx.lineWidth = 2
      ctx.stroke()

      // Inner Fine China Plate Rim
      ctx.beginPath()
      ctx.ellipse(0, 16, 170, 78, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(245, 239, 235, 0.25)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Wine Glass Goblet Silhouette (Perspective 3D projection)
      const glassX = 190 + cursorPos.x * 15
      const glassY = -60 + cursorPos.y * 10
      ctx.beginPath()
      ctx.ellipse(glassX, glassY + 40, 24, 10, 0, 0, Math.PI * 2) // Base
      ctx.moveTo(glassX, glassY + 40)
      ctx.lineTo(glassX, glassY - 10) // Stem
      ctx.moveTo(glassX - 30, glassY - 50) // Bowl Left
      ctx.bezierCurveTo(glassX - 35, glassY, glassX + 35, glassY, glassX + 30, glassY - 50)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1.2
      ctx.stroke()

      // Fine Cutlery Silhouette Left (Fork)
      const forkX = -210 - cursorPos.x * 10
      ctx.beginPath()
      ctx.moveTo(forkX, -40)
      ctx.lineTo(forkX, 60)
      ctx.moveTo(forkX - 6, -40)
      ctx.lineTo(forkX - 6, -10)
      ctx.moveTo(forkX + 6, -40)
      ctx.lineTo(forkX + 6, -10)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Candle Ambient Glow & Warm Flickering Light
      const candleFlicker = Math.sin(time * 3) * 4 + Math.cos(time * 5) * 2
      const grad = ctx.createRadialGradient(0, -90, 5, 0, -90, 220)
      grad.addColorStop(0, 'rgba(235, 170, 70, 0.32)')
      grad.addColorStop(0.4, 'rgba(184, 74, 57, 0.12)')
      grad.addColorStop(1, 'rgba(10, 10, 12, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(-240, -320, 480, 480)

      // Floating Culinary Botanical Particles in 3D Space
      for (let i = 0; i < 18; i++) {
        const pAngle = i * (Math.PI / 9) + time * 0.15
        const pDist = 90 + ((i * 19) % 140)
        const px = Math.cos(pAngle) * pDist
        const py = Math.sin(pAngle) * (pDist * 0.42) - 40 + Math.sin(time + i) * 6
        ctx.beginPath()
        ctx.arc(px, py, (i % 3) + 1, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? 'rgba(197, 160, 89, 0.7)' : 'rgba(245, 239, 235, 0.5)'
        ctx.fill()
      }

      ctx.restore()

      time += 0.02
      animationId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animationId)
  }, [cursorPos])

  // Interactive 3D Dish Inspection Canvas
  useEffect(() => {
    const canvas = dishCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let localAngle = rotationDeg

    const render = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      const w = canvas.width
      const h = canvas.height

      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2

      ctx.save()
      ctx.translate(cx, cy)

      // Circular 3D Spatial Compass
      ctx.beginPath()
      ctx.ellipse(0, 80, 160, 60, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Dynamic Rotation Orbit Nodes
      for (let i = 0; i < 12; i++) {
        const rad = (i * Math.PI) / 6 + (localAngle * Math.PI) / 180
        const nx = Math.cos(rad) * 160
        const ny = Math.sin(rad) * 60 + 80
        ctx.beginPath()
        ctx.arc(nx, ny, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = i === 0 ? '#C5A059' : 'rgba(245, 239, 235, 0.3)'
        ctx.fill()
      }

      ctx.restore()

      if (isRotating) {
        localAngle += 0.5
      }

      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [rotationDeg, isRotating])

  const handleReservationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reserveForm.name || !reserveForm.email) return

    setReservationNotice(
      `Table reserved for ${reserveForm.name} (${reserveForm.guests}) in the ${reserveForm.seatingZone} on ${reserveForm.date} at ${reserveForm.time}. Demo session confirmed. Note: No AI API yet, No database connection yet.`
    )
  }

  return (
    <div className="min-h-screen bg-[#08080A] text-[#F5EFEB] font-serif selection:bg-[#C5A059] selection:text-[#08080A]">
      {/* Top Editorial Nav (Self-Contained Showcase Navigation) */}
      <header className="fixed top-0 w-full z-40 bg-[#08080A]/90 backdrop-blur-md border-b border-[#232328] px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-xl md:text-2xl font-bold tracking-[0.25em] text-[#C5A059] uppercase font-mono">
              SAVOR
            </span>
            <span className="text-xs text-[#A89E94] italic font-serif">
              / Culinary Artistry in 3D
            </span>
            <span className="hidden md:inline-block text-[10px] font-mono uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-2.5 py-1 rounded">
              Notice: No AI API yet, No database connection yet
            </span>
          </div>

          <div className="flex items-center space-x-6 text-xs font-sans tracking-widest uppercase">
            <a href="#hero" className="text-[#A89E94] hover:text-[#C5A059] transition-colors">
              Table Scene
            </a>
            <a href="#dishes" className="text-[#A89E94] hover:text-[#C5A059] transition-colors">
              3D Menu
            </a>
            <a href="#story" className="text-[#A89E94] hover:text-[#C5A059] transition-colors">
              Story
            </a>
            <a href="#atmosphere" className="text-[#A89E94] hover:text-[#C5A059] transition-colors">
              Atmosphere
            </a>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-[#08080A] px-5 py-2 text-xs font-bold tracking-widest transition-all uppercase rounded-none focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            >
              Reserve Table
            </button>
          </div>
        </div>
      </header>

      {/* SECTION 1: FULLSCREEN 3D RESTAURANT HERO */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-24 px-6 overflow-hidden">
        {/* Interactive 3D Perspective Canvas */}
        <canvas
          ref={heroCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-90"
        />

        <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-sans font-bold tracking-[0.35em] text-[#C5A059] uppercase">
            MICHELIN-INSPIRED SPATIAL GASTRONOMY
          </p>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-normal tracking-tight text-white leading-none">
            Dining, <br />
            <span className="italic font-light text-[#C5A059]">Reimagined.</span>
          </h1>

          <p className="text-sm md:text-lg text-[#C8BFB5] max-w-2xl mx-auto font-sans font-light leading-relaxed">
            An immersive culinary installation where seasonal heritage ingredients and spatial 3D interaction converge. Move your cursor to adjust table perspectives and candlelight refraction.
          </p>

          <div className="pt-6 flex flex-wrap justify-center gap-4 font-sans text-xs">
            <a
              href="#dishes"
              className="px-8 py-3.5 bg-[#C5A059] text-[#08080A] font-bold tracking-widest uppercase hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            >
              Inspect Signature Dishes
            </a>
            <button
              onClick={() => setIsReserveModalOpen(true)}
              className="px-8 py-3.5 border border-[#404048] text-[#F5EFEB] font-bold tracking-widest uppercase hover:border-[#C5A059] hover:text-[#C5A059] transition-all focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
            >
              Reserve Private Salon
            </button>
          </div>

          <div className="pt-12 flex justify-center items-center space-x-8 text-[11px] font-sans text-[#A89E94] uppercase tracking-widest">
            <span>Spatial Depth: Interactive</span>
            <span className="w-1 h-1 bg-[#C5A059] rounded-full"></span>
            <span>Origin: Norcia & Miyazaki</span>
            <span className="w-1 h-1 bg-[#C5A059] rounded-full"></span>
            <span>Cellar: 420 Curated Vintages</span>
          </div>
        </div>
      </section>

      {/* SECTION 2: 3D INTERACTIVE SIGNATURE DISH INSPECTOR */}
      <section id="dishes" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="border-b border-[#232328] pb-6 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-2">
              SPATIAL CULINARY SCULPTURE
            </span>
            <h2 className="text-3xl md:text-5xl font-normal text-white">
              Interactive 3D Dish Catalog
            </h2>
          </div>
          <p className="text-xs font-sans text-[#A89E94] max-w-md leading-relaxed">
            Select an iconic dish to rotate coordinates, examine sensory ingredients, and review sommelier cellar pairings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Dish Selection Buttons */}
          <div className="lg:col-span-5 space-y-4 font-sans">
            {SIGNATURE_DISHES.map((dish) => {
              const isSelected = selectedDish.id === dish.id
              return (
                <div
                  key={dish.id}
                  onClick={() => {
                    setSelectedDish(dish)
                    setRotationDeg((prev) => prev + 90)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedDish(dish)
                      setRotationDeg((prev) => prev + 90)
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  className={`p-6 border transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] ${
                    isSelected
                      ? 'bg-[#121217] border-[#C5A059] shadow-lg'
                      : 'bg-[#0E0E12] border-[#222228] hover:border-[#444450]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">
                      {dish.course}
                    </span>
                    <span className="text-lg font-serif font-bold text-white">
                      {dish.price}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif text-white mb-2">{dish.name}</h3>
                  <p className="text-xs text-[#A89E94] line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right Column: 3D Visualizer & Ingredient Breakdown Stage */}
          <div className="lg:col-span-7 bg-[#101015] border border-[#26262E] p-8 md:p-12 relative flex flex-col justify-between min-h-[640px]">
            {/* 3D Orbit Canvas Overlay */}
            <canvas
              ref={dishCanvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
            />

            {/* Top Stage Indicators */}
            <div className="relative z-10 flex flex-wrap justify-between items-center gap-3 font-sans text-xs border-b border-[#222228] pb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 border border-[#C5A059]/30 px-3 py-1">
                {selectedDish.dietary}
              </span>
              <div className="flex items-center space-x-3 text-[#A89E94]">
                <span>Temp: {selectedDish.temperature}</span>
                <span>•</span>
                <span>{selectedDish.prepTime}</span>
              </div>
            </div>

            {/* Center Visual Representation with 3D Rotation Effect */}
            <div className="relative z-10 my-8 flex flex-col items-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl transition-transform duration-700">
                <img
                  src={selectedDish.image}
                  alt={selectedDish.name}
                  className="w-full h-full object-cover transition-transform duration-700"
                  style={{ transform: `rotate(${rotationDeg * 0.08}deg) scale(1.05)` }}
                />
              </div>

              {/* 3D Rotation Controls */}
              <div className="mt-6 flex items-center space-x-4 font-sans text-xs">
                <button
                  onClick={() => setRotationDeg((prev) => prev - 45)}
                  className="px-3 py-1.5 border border-[#303038] hover:border-[#C5A059] text-[#C5A059] uppercase tracking-wider transition-all"
                >
                  ↺ Rotate Left 45°
                </button>
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className={`px-4 py-1.5 border text-xs font-bold uppercase tracking-wider transition-all ${
                    isRotating
                      ? 'bg-[#C5A059] text-[#08080A] border-[#C5A059]'
                      : 'border-[#303038] text-white hover:border-[#C5A059]'
                  }`}
                >
                  {isRotating ? 'Pause 360 Spin' : 'Continuous 3D Spin'}
                </button>
                <button
                  onClick={() => setRotationDeg((prev) => prev + 45)}
                  className="px-3 py-1.5 border border-[#303038] hover:border-[#C5A059] text-[#C5A059] uppercase tracking-wider transition-all"
                >
                  ↻ Rotate Right 45°
                </button>
              </div>
            </div>

            {/* Dish Detailed Specs */}
            <div className="relative z-10 space-y-5 pt-4 border-t border-[#222228]">
              <div>
                <span className="text-[11px] font-sans font-bold text-[#C5A059] uppercase tracking-widest block">
                  3D INSPECTION METADATA
                </span>
                <h3 className="text-2xl md:text-3xl font-serif text-white mt-1">
                  {selectedDish.name}
                </h3>
              </div>

              <p className="text-xs md:text-sm text-[#D1C7BD] font-sans leading-relaxed">
                {selectedDish.description}
              </p>

              {/* Deconstructed Ingredients Matrix */}
              <div className="space-y-2 font-sans">
                <span className="text-[10px] text-[#A89E94] uppercase tracking-widest font-bold block">
                  Deconstructed Ingredients:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedDish.ingredients.map((ing) => (
                    <span
                      key={ing}
                      className="text-xs bg-[#1A1A22] border border-[#2D2D38] px-3 py-1 text-[#E0D8D0]"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cellar Sommelier Pairing */}
              <div className="bg-[#14141A] border border-[#C5A059]/30 p-4 font-sans text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold block">
                    Sommelier Reserve Pairing:
                  </span>
                  <span className="text-white font-medium">{selectedDish.winePairing}</span>
                </div>
                <button
                  onClick={() => setIsReserveModalOpen(true)}
                  className="px-4 py-2 bg-[#C5A059] text-[#08080A] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shrink-0"
                >
                  Order In Tasting Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE RESTAURANT INTERIOR & ATMOSPHERE */}
      <section id="atmosphere" className="py-28 bg-[#0B0B0E] border-t border-b border-[#202026] px-6 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#C5A059] uppercase">
              ARCHITECTURAL ACOUSTICS
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white">
              The Spatial Dining Atmosphere
            </h2>
            <p className="text-xs md:text-sm text-[#A89E94] font-sans leading-relaxed">
              Designed by acoustic engineers and modernist sculptors to isolate tables in private sonic micro-climates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#121218] border border-[#24242C] p-6 space-y-4">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80"
                  alt="Main Dining Salon"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-sans font-bold text-[#C5A059] uppercase tracking-widest block">
                ZONE 01 // MAIN SALON
              </span>
              <h3 className="text-xl font-serif text-white">The Onyx Gallery</h3>
              <p className="text-xs text-[#A89E94] font-sans leading-relaxed">
                Vaulted dark basalt stone ceilings with focused downward pin-lights illuminating only the plate and crystal stemware.
              </p>
            </div>

            <div className="bg-[#121218] border border-[#24242C] p-6 space-y-4">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80"
                  alt="Chefs Counter"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-sans font-bold text-[#C5A059] uppercase tracking-widest block">
                ZONE 02 // CHEF COUNTER
              </span>
              <h3 className="text-xl font-serif text-white">The Binchotan Hearth</h3>
              <p className="text-xs text-[#A89E94] font-sans leading-relaxed">
                An intimate eight-seat monolithic granite counter directly facing the open binchotan charcoal grill and pastry carving stations.
              </p>
            </div>

            <div className="bg-[#121218] border border-[#24242C] p-6 space-y-4">
              <div className="h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80"
                  alt="Wine Cellar"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <span className="text-[10px] font-sans font-bold text-[#C5A059] uppercase tracking-widest block">
                ZONE 03 // CELLAR VAULT
              </span>
              <h3 className="text-xl font-serif text-white">The Sommelier Archive</h3>
              <p className="text-xs text-[#A89E94] font-sans leading-relaxed">
                Subterranean cellar maintaining 14°C and 70% relative humidity, housing rare Grand Cru allocations and estate biodynamic verticals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: STORY & EXECUTIVE CHEF */}
      <section id="story" className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-bold tracking-[0.25em] text-[#C5A059] uppercase">
              CULINARY MANIFESTO
            </span>
            <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
              Crafted by Discipline, <br />
              Sculpted by Light.
            </h2>
            <p className="text-sm font-sans text-[#D1C7BD] leading-relaxed">
              Executive Chef Mateo Arispe spent a decade in Basque Country and Kyoto before founding Savor in 2024. Our kitchen rejects artificial emulsifiers and generic dining routines in favor of wood smoke, slow lacto-fermentation, and spatial plate geometry.
            </p>
            <p className="text-sm font-sans text-[#A89E94] leading-relaxed">
              Every tasting sequence consists of nine courses designed to tell a geographic story, starting from coastal tides to deep winter forest soils.
            </p>

            <div className="pt-4 grid grid-cols-2 gap-6 font-sans text-xs border-t border-[#232328]">
              <div>
                <span className="text-[10px] text-[#A89E94] uppercase tracking-widest block font-bold">
                  Degustation Duration:
                </span>
                <span className="text-white font-medium text-sm">3 Hours (9 Movements)</span>
              </div>
              <div>
                <span className="text-[10px] text-[#A89E94] uppercase tracking-widest block font-bold">
                  Cellar Pairings:
                </span>
                <span className="text-white font-medium text-sm">Standard & Reserve Flight</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative border border-[#2A2A34] p-4 bg-[#101016]">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=900&q=85"
                alt="Executive Chef Mateo Arispe"
                className="w-full h-[480px] object-cover"
              />
              <div className="absolute bottom-8 left-8 bg-[#08080A]/95 p-4 border border-[#C5A059]/40 font-sans">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  MATEO ARISPE
                </p>
                <p className="text-[10px] text-[#C5A059] tracking-widest uppercase">
                  Executive Chef & Co-Founder
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: TABLE RESERVATION DRAWER / MODAL */}
      {isReserveModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 font-sans"
        >
          <div className="bg-[#121217] border border-[#C5A059]/40 max-w-lg w-full p-8 space-y-6 relative text-xs">
            <button
              onClick={() => setIsReserveModalOpen(false)}
              className="absolute top-6 right-6 text-[#A89E94] hover:text-white text-base focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
              aria-label="Close reservation modal"
            >
              ✕
            </button>

            <div>
              <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest block">
                GASTRONOMY RESERVATION
              </span>
              <h3 className="text-2xl font-serif text-white mt-1">
                Reserve Your Table Experience
              </h3>
              <p className="text-[11px] text-[#A89E94] mt-1">
                Notice: Simulation mode. No AI API yet, No database connection yet.
              </p>
            </div>

            {reservationNotice ? (
              <div className="bg-[#C5A059]/10 border border-[#C5A059]/30 p-5 space-y-4 text-center">
                <p className="text-xs text-[#C5A059] font-medium leading-relaxed">
                  {reservationNotice}
                </p>
                <button
                  onClick={() => {
                    setReservationNotice('')
                    setIsReserveModalOpen(false)
                  }}
                  className="px-6 py-2.5 bg-[#C5A059] text-[#08080A] font-bold text-xs uppercase tracking-wider hover:bg-white transition-all"
                >
                  Return to Savor
                </button>
              </div>
            ) : (
              <form onSubmit={handleReservationSubmit} className="space-y-4">
                <div>
                  <label className="text-[#A89E94] uppercase tracking-wider block mb-1">
                    Guest Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Julian Montgomery"
                    value={reserveForm.name}
                    onChange={(e) => setReserveForm({ ...reserveForm, name: e.target.value })}
                    className="w-full bg-[#1A1A22] border border-[#2D2D38] p-3 text-white outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-[#A89E94] uppercase tracking-wider block mb-1">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="julian@montgomery.co"
                    value={reserveForm.email}
                    onChange={(e) => setReserveForm({ ...reserveForm, email: e.target.value })}
                    className="w-full bg-[#1A1A22] border border-[#2D2D38] p-3 text-white outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#A89E94] uppercase tracking-wider block mb-1">
                      Party Size
                    </label>
                    <select
                      value={reserveForm.guests}
                      onChange={(e) => setReserveForm({ ...reserveForm, guests: e.target.value })}
                      className="w-full bg-[#1A1A22] border border-[#2D2D38] p-3 text-white outline-none focus:border-[#C5A059]"
                    >
                      <option>2 Guests</option>
                      <option>4 Guests</option>
                      <option>6 Guests</option>
                      <option>Private Salon (8-12 Guests)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[#A89E94] uppercase tracking-wider block mb-1">
                      Dining Date
                    </label>
                    <input
                      required
                      type="date"
                      value={reserveForm.date}
                      onChange={(e) => setReserveForm({ ...reserveForm, date: e.target.value })}
                      className="w-full bg-[#1A1A22] border border-[#2D2D38] p-3 text-white outline-none focus:border-[#C5A059]"
                    >
                    </input>
                  </div>
                </div>

                <div>
                  <label className="text-[#A89E94] uppercase tracking-wider block mb-1">
                    Seating Zone
                  </label>
                  <select
                    value={reserveForm.seatingZone}
                    onChange={(e) => setReserveForm({ ...reserveForm, seatingZone: e.target.value })}
                    className="w-full bg-[#1A1A22] border border-[#2D2D38] p-3 text-white outline-none focus:border-[#C5A059]"
                  >
                    <option>Main Dining Salon</option>
                    <option>Chef Hearth Counter</option>
                    <option>Cellar Vault Pavilion</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C5A059] text-[#08080A] font-bold uppercase tracking-widest hover:bg-white transition-all text-xs focus:outline-none focus:ring-2 focus:ring-[#C5A059]"
                >
                  Confirm Table Reservation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
