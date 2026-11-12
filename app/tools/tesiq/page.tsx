import React from 'react'
import Link from 'next/link'
import { SUBTESTS_DATA, EXTERNAL_PSYCHOMETRIC_RESOURCES } from '@/lib/tesiq/subtestsData'
import { getTotalQuestionCount } from '@/lib/tesiq/questions'
import RadarChart from '@/components/tesiq/RadarChart'

export const metadata = {
  title: 'TES IQ & Latihan Psikotes Terpadu | Marcello Lienarta',
  description:
    'Sistem evaluasi dan modul latihan psikotes terpadu 8 subtes kognitif: analisis-sintesa, berpikir kritis fleksibel, verbal, numerikal, kreatifitas, abstraksi, dan memori kerja.'
}

export default function TesIqPage() {
  const subtests = Object.values(SUBTESTS_DATA)
  const totalQuestions = getTotalQuestionCount()

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto w-full font-mono">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-xs border-b border-outline/20 pb-4">
        <div className="flex items-center space-x-2">
          <Link href="/#tools" className="text-on-surface-variant hover:text-primary transition-colors">
            TOOLS
          </Link>
          <span className="text-outline/40">/</span>
          <span className="text-primary font-bold">TES_IQ_v1.0</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="px-2.5 py-0.5 bg-primary/10 border border-primary/30 text-primary text-[10px] font-bold">
            STATUS: DIAGNOSTIK_AKTIF
          </span>
          <span className="text-[10px] text-on-surface-variant">
            DATABASE: {totalQuestions}+ SOAL
          </span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="mb-12">
        <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-[0.2em] mb-4">
          PSIKOMETRI // DRILL & EVALUASI
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
          MODUL LATIHAN <span className="text-primary">TES IQ</span>
        </h1>
        <p className="text-sm md:text-base text-on-surface/80 max-w-3xl leading-relaxed">
          Platform latihan terpadu untuk menaikkan skor psikotes dan tes inteligensi kognitif (standar IST, TIKI,
          dan CFIT). Dilengkapi materi soal teks tingkat kesulitan 105 - 120++, stimulus visual abstraksi spasial,
          serta latihan retensi memori kerja.
        </p>
      </div>

      {/* Hero Stats Diagnostic Panel & Radar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left: Diagnostic Summary */}
        <div className="lg:col-span-7 ascii-border p-6 md:p-8 bg-surface/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-outline/20">
              <h2 className="text-lg md:text-xl font-bold tracking-tight">
                PROFIL DIAGNOSTIK SKOR SAAT INI
              </h2>
              <span className="text-[10px] text-primary font-bold">TARGET: 115 - 128+</span>
            </div>

            {/* Strategic Alert Box */}
            <div className="p-4 bg-primary/10 border-l-2 border-primary mb-6 text-xs leading-relaxed">
              <span className="font-bold text-primary block mb-1">
                [REKOMENDASI PRIORITAS BELAJAR]:
              </span>
              <p className="text-on-surface/90">
                1. <strong>Fokus Utama (Kurang/Cukup):</strong> Subtes <em>Analisis - Sintesa (89)</em> dan <em>Numerikal (96)</em> membutuhkan latihan intensif pada silogisme majemuk dan deret bertingkat untuk mencapai rentang 115+.
                <br />
                2. <strong>Fokus Peningkatan:</strong> <em>Berpikir Kritis (99)</em> dan <em>Abstraksi Spasial (103)</em>.
                <br />
                3. <strong>Pertahankan & Pertajam:</strong> <em>Kreatifitas (122)</em>, <em>Verbal (116)</em>, <em>Memori (114)</em>, dan <em>Kritis Fleksibel (106)</em>.
              </p>
            </div>

            {/* Subtests Score Bar Overview */}
            <div className="space-y-3">
              {subtests.map((sub) => {
                const percent = Math.min(100, Math.max(0, ((sub.currentScore - 70) / 60) * 100))
                const targetPercent = Math.min(100, Math.max(0, ((sub.targetScore - 70) / 60) * 100))
                const isUnder100 = sub.currentScore < 100

                return (
                  <div key={sub.id} className="text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold truncate max-w-[220px]">
                        {sub.shortName}
                      </span>
                      <div className="flex items-center gap-2 text-[10px]">
                        <span className={isUnder100 ? 'text-red-500 font-bold' : 'text-primary'}>
                          {sub.currentScore} ({sub.currentStatus})
                        </span>
                        <span className="text-on-surface-variant">→ Target: {sub.targetScore}</span>
                      </div>
                    </div>
                    {/* Progress Track */}
                    <div className="w-full bg-surface-variant/40 h-2 relative">
                      {/* Current Fill */}
                      <div
                        className={`h-full ${isUnder100 ? 'bg-red-500' : 'bg-primary'}`}
                        style={{ width: `${percent}%` }}
                      ></div>
                      {/* Target Indicator Marker */}
                      <div
                        className="absolute top-0 bottom-0 w-1 bg-secondary"
                        style={{ left: `${targetPercent}%` }}
                        title={`Target: ${sub.targetScore}`}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Simulation CTA */}
          <div className="mt-8 pt-6 border-t border-outline/20 flex flex-col sm:flex-row gap-4">
            <Link
              href="/tools/tesiq/simulasi"
              className="px-6 py-3 bg-primary text-on-primary font-bold text-xs uppercase text-center hover:opacity-90 transition-opacity flex-1"
            >
              Mulai Simulasi Komprehensif (40 Soal)
            </Link>
          </div>
        </div>

        {/* Right: Radar Chart Visual */}
        <div className="lg:col-span-5 ascii-border p-6 bg-surface/30 flex flex-col items-center justify-center">
          <div className="w-full flex justify-between items-center mb-4 pb-2 border-b border-outline/20">
            <span className="text-[10px] font-bold text-primary">VISUALISASI POLA KOGNITIF</span>
            <span className="text-[10px] text-on-surface-variant">SPIDER_RADAR_v1.0</span>
          </div>
          <RadarChart />
        </div>
      </div>

      {/* Subtests Grid (8 Subtests) */}
      <div className="mb-16">
        <div className="flex items-center space-x-4 mb-8">
          <h2 className="text-xl md:text-3xl font-black tracking-tight">
            DAFTAR SUBTES & MODUL LATIHAN
          </h2>
          <div className="h-[1px] flex-1 bg-outline/20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subtests.map((sub, idx) => {
            const isCritical = sub.currentScore < 100

            return (
              <div
                key={sub.id}
                className="ascii-border p-5 bg-surface/30 hover:bg-surface-variant/20 transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top Category Badge */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-bold px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary uppercase">
                      {sub.formatLabel.split(' ')[0]}
                    </span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 ${
                        isCritical
                          ? 'bg-red-500/10 text-red-500 border border-red-500/30'
                          : 'bg-surface border border-outline/30 text-on-surface/80'
                      }`}
                    >
                      {sub.currentScore} ({sub.currentStatus})
                    </span>
                  </div>

                  <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                    {idx + 1}. {sub.name}
                  </h3>

                  <p className="text-xs text-on-surface/80 leading-relaxed mb-4 line-clamp-3">
                    {sub.description}
                  </p>

                  <div className="text-[10px] space-y-1 mb-6 text-on-surface/70">
                    <div>
                      <span className="text-on-surface/50">Format:</span> {sub.formatLabel}
                    </div>
                    <div>
                      <span className="text-on-surface/50">Target:</span> {sub.targetScore} ({sub.targetStatus})
                    </div>
                    <div>
                      <span className="text-on-surface/50">Bank Soal:</span> {sub.totalQuestionsAvailable}+ Soal
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline/20 flex flex-col gap-2">
                  <Link
                    href={`/tools/tesiq/${sub.slug}`}
                    className="w-full py-2 border border-outline/30 text-center text-[10px] uppercase font-bold hover:border-primary hover:text-primary transition-all"
                  >
                    Buka Panduan Subtes
                  </Link>
                  <Link
                    href={`/tools/tesiq/${sub.slug}/practice`}
                    className="w-full py-2 bg-primary text-on-primary text-center text-[10px] uppercase font-bold hover:opacity-90 transition-opacity"
                  >
                    Mulai Latihan ({sub.totalQuestionsAvailable} Soal)
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* External Resources & APIs Section */}
      <div className="ascii-border p-6 md:p-8 bg-surface/30">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-outline/20">
          <div>
            <span className="text-[10px] text-primary font-bold uppercase tracking-widest block mb-1">
              {'// EKOSISTEM_SUMBER_EKSTERNAL'}
            </span>
            <h2 className="text-xl md:text-2xl font-black">
              SUMBER LATIHAN BERBASIS GAMBAR, DATASET & API PSIKOMETRI
            </h2>
          </div>
          <span className="text-xs text-on-surface/60">OPEN_PSYCHOMETRIC_RESOURCES</span>
        </div>

        <p className="text-xs md:text-sm text-on-surface/80 leading-relaxed mb-6 max-w-3xl">
          Untuk melengkapi latihan berbasis teks di atas, berikut adalah kurasi platform psikometri, dataset gambar
          matriks progresif terbuka (Raven Matrices), dan API latihan spasial terverifikasi:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXTERNAL_PSYCHOMETRIC_RESOURCES.map((res) => (
            <div key={res.id} className="p-4 border border-outline/20 bg-background/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-[10px] text-primary font-bold mb-2">
                  <span>{res.provider}</span>
                  <span className="uppercase text-[9px] px-1.5 py-0.5 border border-outline/20">
                    {res.type}
                  </span>
                </div>
                <h3 className="text-sm font-bold mb-2 text-foreground">{res.title}</h3>
                <p className="text-xs text-on-surface/70 leading-relaxed mb-4">
                  {res.description}
                </p>
              </div>

              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-primary hover:underline font-bold flex items-center justify-between pt-2 border-t border-outline/20"
              >
                <span>Akses Sumber Eksternal</span>
                <span>↗</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

