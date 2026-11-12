import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SUBTESTS_DATA } from '@/lib/tesiq/subtestsData'
import { getQuestionsForSubtest } from '@/lib/tesiq/questions'
import { SubtestId } from '@/lib/tesiq/types'

interface PageProps {
  params: Promise<{
    subtest: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { subtest } = await params
  const data = SUBTESTS_DATA[subtest]
  if (!data) return { title: 'Subtes Tidak Ditemukan' }
  return {
    title: `${data.name} | Modul Latihan TES IQ`,
    description: data.description
  }
}

export default async function SubtestDetailPage({ params }: PageProps) {
  const { subtest } = await params
  const data = SUBTESTS_DATA[subtest]

  if (!data) {
    notFound()
  }

  // Sample preview questions
  const previewQuestions = getQuestionsForSubtest(subtest as SubtestId, { limit: 3 })

  return (
    <div className="py-12 px-4 max-w-5xl mx-auto w-full font-mono">
      {/* Top Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs border-b border-outline/20 pb-4">
        <div className="flex items-center space-x-2">
          <Link href="/tools/tesiq" className="text-on-surface-variant hover:text-primary transition-colors">
            ← TES_IQ_DASHBOARD
          </Link>
          <span className="text-outline/40">/</span>
          <span className="text-primary font-bold">{data.slug.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold">
            {data.totalQuestionsAvailable}+ SOAL TERSEDIA
          </span>
        </div>
      </div>

      {/* Main Subtest Hero Banner */}
      <div className="ascii-border p-6 md:p-8 bg-surface/30 mb-8 relative">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="text-[10px] font-bold px-2.5 py-1 bg-primary/10 border border-primary/30 text-primary uppercase">
            {data.formatLabel}
          </span>
          <span className="text-xs px-2.5 py-1 bg-surface border border-outline/30 font-bold">
            PRIORITAS: {data.priority.toUpperCase()}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">
          {data.name}
        </h1>

        <p className="text-sm md:text-base text-on-surface/90 leading-relaxed mb-6">
          {data.description}
        </p>

        {/* Diagnostic Score Comparison */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-background/60 border border-outline/20 mb-8">
          <div>
            <span className="text-[10px] text-on-surface/60 block mb-1">SKOR RIIL SAAT INI</span>
            <div className="text-2xl font-black flex items-baseline gap-2">
              <span className={data.currentScore < 100 ? 'text-red-500' : 'text-primary'}>
                {data.currentScore}
              </span>
              <span className="text-xs font-normal text-on-surface/70">({data.currentStatus})</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-secondary font-bold block mb-1">TARGET SKOR</span>
            <div className="text-2xl font-black text-secondary flex items-baseline gap-2">
              <span>{data.targetScore}</span>
              <span className="text-xs font-normal text-on-surface/70">({data.targetStatus})</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-on-surface/60 block mb-1">DEFISIT PENINGKATAN</span>
            <div className="text-2xl font-black text-foreground">
              +{data.targetScore - data.currentScore} Poin
            </div>
          </div>
        </div>

        {/* Action Drill Modes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={`/tools/tesiq/${data.slug}/practice?mode=practice&limit=25`}
            className="p-4 bg-primary text-on-primary font-bold text-center text-xs uppercase hover:opacity-90 transition-opacity flex flex-col justify-center items-center"
          >
            <span>Mulai Mode Latihan (25 Soal)</span>
            <span className="text-[10px] font-normal opacity-90 mt-1">
              Feedback pembahasan instan per soal
            </span>
          </Link>

          <Link
            href={`/tools/tesiq/${data.slug}/practice?mode=exam&limit=40`}
            className="p-4 border border-primary text-primary font-bold text-center text-xs uppercase hover:bg-primary hover:text-on-primary transition-all flex flex-col justify-center items-center"
          >
            <span>Mulai Simulasi Ujian (40 Soal)</span>
            <span className="text-[10px] font-normal opacity-80 mt-1">
              Dengan timer waktu & estimasi skor IQ akhir
            </span>
          </Link>
        </div>
      </div>

      {/* Deep Dive & Tactics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Left: Psychometric Role & Structure */}
        <div className="ascii-border p-6 bg-surface/30">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="text-primary font-mono">[01]</span>
            PERAN PSIKOMETRI & STRUKTUR TES
          </h2>
          <div className="space-y-4 text-xs leading-relaxed text-on-surface/85">
            <div>
              <span className="font-bold text-primary block mb-1">Signifikansi Kognitif:</span>
              <p>{data.psychometricRole}</p>
            </div>
            <div>
              <span className="font-bold text-primary block mb-1">Struktur & Model Soal:</span>
              <p>{data.testStructure}</p>
            </div>
          </div>
        </div>

        {/* Right: Tactical Tips for 105 - 120++ */}
        <div className="ascii-border p-6 bg-surface/30">
          <h2 className="text-base font-bold mb-4 flex items-center gap-2">
            <span className="text-primary font-mono">[02]</span>
            STRATEGI TAKTIS MENEMBUS SKOR 115 - 120+
          </h2>
          <ul className="space-y-3 text-xs leading-relaxed text-on-surface/85">
            {data.tacticalTips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0 mt-0.5">»</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Preview Questions */}
      <div className="ascii-border p-6 md:p-8 bg-surface/30 mb-12">
        <div className="flex justify-between items-center mb-6 pb-3 border-b border-outline/20">
          <h2 className="text-base md:text-lg font-bold">
            CONTOH CUPLIKAN SOAL ({data.name})
          </h2>
          <span className="text-xs text-on-surface-variant">LEVEL TINGGI (105-120+)</span>
        </div>

        <div className="space-y-6">
          {previewQuestions.map((q, idx) => (
            <div key={q.id} className="p-4 border border-outline/20 bg-background/40">
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-bold text-primary">
                  SOAL #{idx + 1}: {q.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 border border-outline/30">
                  IQ: {q.difficulty}
                </span>
              </div>
              <p className="text-xs text-on-surface/90 whitespace-pre-line mb-3">{q.prompt}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                {q.options.map((opt) => (
                  <div key={opt.key} className="p-2 border border-outline/20 bg-surface/20">
                    [{opt.key}] {opt.text}
                  </div>
                ))}
              </div>
              <div className="text-[11px] p-2 bg-surface text-on-surface/80 border-l-2 border-primary">
                <span className="font-bold text-primary mr-1">Petunjuk Solusi:</span>
                Kunci Jawaban: [{q.correctAnswer}]. {q.explanation.slice(0, 160)}...
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/tools/tesiq/${data.slug}/practice?mode=practice&limit=50`}
            className="inline-block px-8 py-3 bg-primary text-on-primary font-bold text-xs uppercase hover:opacity-90 transition-opacity"
          >
            Kerjakan Semua {data.totalQuestionsAvailable}+ Soal Sekarang
          </Link>
        </div>
      </div>
    </div>
  )
}

