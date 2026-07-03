'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isShowcase = pathname?.startsWith('/showcase')

  useEffect(() => {
    if (isShowcase) {
      document.body.classList.add('showcase-page')
    } else {
      document.body.classList.remove('showcase-page')
    }
  }, [isShowcase])

  if (isShowcase) {
    return <>{children}</>
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </div>
      <div className="scanline"></div>
    </>
  )
}
