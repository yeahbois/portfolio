import React from 'react'
import Link from 'next/link'
import { getComprehensiveMockExamQuestions } from '@/lib/tesiq/questions'
import PracticeEngine from '@/components/tesiq/PracticeEngine'

export const metadata = {
  title: 'Simulasi Komprehensif Tes IQ (Full Mock Exam) | Marcello Lienarta',
  description: 'Simulasi ujian lengkap 40 soal psikotes terintegrasi mencakup 8 subtes kognitif.'
}

interface PageProps {
  searchParams: Promise<{
    count?: string
  }>
}

export default async function SimulasiKomprehensifPage({ searchParams }: PageProps) {
  const { count: countParam } = await searchParams
  const count = countParam ? parseInt(countParam, 10) : 40

  const questions = getComprehensiveMockExamQuestions(count)

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto w-full font-mono">
      <div className="mb-6 pb-3 border-b border-outline/20 flex flex-wrap justify-between items-center gap-4">
        <div>
          <Link
            href="/tools/tesiq"
            className="text-xs text-on-surface-variant hover:text-primary transition-colors block mb-1"
          >
            ← KEMBALI KE DASHBOARD TES IQ
          </Link>
          <h1 className="text-xl md:text-2xl font-black">
            SIMULASI UJIAN PSIKOTES KOMPREHENSIF ({questions.length} SOAL)
          </h1>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary font-bold">
            8 SUBTES KOGNITIF LENGKAP
          </span>
        </div>
      </div>

      <PracticeEngine
        subtestId="simulasi-komprehensif"
        subtestName="Simulasi Ujian Psikotes Komprehensif (8 Subtes)"
        questions={questions}
        mode="exam"
        returnUrl="/tools/tesiq"
      />
    </div>
  )
}

