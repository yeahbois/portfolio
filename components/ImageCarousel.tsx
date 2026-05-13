'use client'

import { useState } from 'react'

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) return null

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)

  return (
    <div className="space-y-4">
      <div className="ascii-border p-2 bg-surface/30 relative group">
        <img
          src={images[currentIndex]}
          alt={`${alt} ${currentIndex + 1}`}
          className="w-full grayscale hover:grayscale-0 transition-all duration-700"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 border border-outline/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 border border-outline/20 p-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M304-82l-56-57 343-341-343-341 56-57 400 398-400 398Z"/></svg>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-primary w-4' : 'bg-outline/40'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-between items-center text-[10px] uppercase tracking-widest opacity-50 px-2">
          <span>Image {currentIndex + 1} of {images.length}</span>
          <div className="flex space-x-4">
            <button onClick={prev} className="hover:text-primary transition-colors cursor-pointer">PREV_IMG</button>
            <button onClick={next} className="hover:text-primary transition-colors cursor-pointer">NEXT_IMG</button>
          </div>
        </div>
      )}
    </div>
  )
}
