'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Question, SubtestId } from '@/lib/tesiq/types'
import VisualStimulus from './VisualStimulus'

interface PracticeEngineProps {
  subtestId: SubtestId | 'simulasi-komprehensif'
  subtestName: string
  questions: Question[]
  mode: 'practice' | 'exam'
  returnUrl: string
}

export default function PracticeEngine({
  subtestId,
  subtestName,
  questions,
  mode: initialMode,
  returnUrl
}: PracticeEngineProps) {
  const [mode, setMode] = useState<'practice' | 'exam'>(initialMode)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [showExplanation, setShowExplanation] = useState(false)
  const [bookmarked, setBookmarked] = useState<Record<number, boolean>>({})
  const [isFinished, setIsFinished] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(true)
  const [filterReview, setFilterReview] = useState<'all' | 'correct' | 'wrong'>('all')

  const currentQ = questions[currentIndex]
  const total = questions.length

  // Timer effect
  useEffect(() => {
    if (!isTimerRunning || isFinished) return
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isTimerRunning, isFinished])

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60)
    const s = sec % 60
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const handleSelectOption = useCallback(
    (key: string) => {
      if (isFinished) return
      // If in practice mode and explanation is already shown, do not lock out re-selection unless desired
      setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: key }))
      if (mode === 'practice') {
        setShowExplanation(true)
      }
    },
    [currentIndex, isFinished, mode]
  )

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1)
      setShowExplanation(mode === 'practice' && Boolean(selectedAnswers[currentIndex + 1]))
    } else {
      setIsFinished(true)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      setShowExplanation(mode === 'practice' && Boolean(selectedAnswers[currentIndex - 1]))
    }
  }

  const toggleBookmark = () => {
    setBookmarked((prev) => ({ ...prev, [currentIndex]: !prev[currentIndex] }))
  }

  // Keyboard shortcut listener: '1'-'5' or 'A'-'E'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFinished) return
      const key = e.key.toUpperCase()
      const validKeys = ['A', 'B', 'C', 'D', 'E']
      if (validKeys.includes(key)) {
        handleSelectOption(key)
      } else if (['1', '2', '3', '4', '5'].includes(key)) {
        const mapped = validKeys[parseInt(key, 10) - 1]
        if (mapped) handleSelectOption(mapped)
      } else if (e.key === 'ArrowRight' && (mode === 'exam' || selectedAnswers[currentIndex])) {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isFinished, mode, selectedAnswers, handleSelectOption])

  // Calculation of Results
  const calculateResults = () => {
    let correct = 0
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        correct++
      }
    })
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0
    // Estimated IQ formula: baseline 90 + accuracy * 0.38 (range 90 to 128+)
    const estimatedIq = Math.round(90 + (accuracy / 100) * 38)
    return { correct, accuracy, estimatedIq }
  }

  const restartQuiz = () => {
    setSelectedAnswers({})
    setCurrentIndex(0)
    setShowExplanation(false)
    setIsFinished(false)
    setElapsedSeconds(0)
    setIsTimerRunning(true)
  }

  if (total === 0) {
    return (
      <div className="ascii-border p-12 text-center bg-surface/30 font-mono">
        <p className="text-primary font-bold mb-4">[STATUS: SOAL_TIDAK_DITEMUKAN]</p>
        <p className="text-on-surface/80 text-sm mb-6">
          Tidak ada pertanyaan yang sesuai dengan kriteria filter saat ini.
        </p>
        <Link
          href={returnUrl}
          className="px-6 py-2 border border-outline/30 hover:border-primary text-xs uppercase"
        >
          Kembali ke Menu
        </Link>
      </div>
    )
  }

  // FINISHED VIEW (Score & Comprehensive Review)
  if (isFinished) {
    const { correct, accuracy, estimatedIq } = calculateResults()
    const wrongCount = total - correct

    return (
      <div className="w-full max-w-4xl mx-auto font-mono py-6">
        {/* Header Summary */}
        <div className="ascii-border p-8 bg-surface/40 mb-8 relative overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-outline/20 pb-4">
            <div>
              <span className="text-[10px] text-primary font-bold tracking-widest uppercase block mb-1">
                {'// HASIL_EVALUASI_SIMULASI'}
              </span>
              <h2 className="text-2xl md:text-3xl font-black">{subtestName}</h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs px-3 py-1 bg-primary/10 border border-primary/30 text-primary">
                WAKTU: {formatTime(elapsedSeconds)}
              </span>
              <span className="text-xs px-3 py-1 bg-surface border border-outline/30">
                MODE: {mode.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="border border-outline/20 p-4 bg-background/50 text-center">
              <span className="text-[10px] text-on-surface/60 block mb-1">TOTAL SOAL</span>
              <span className="text-2xl font-black">{total}</span>
            </div>
            <div className="border border-outline/20 p-4 bg-background/50 text-center">
              <span className="text-[10px] text-secondary block mb-1">JAWABAN BENAR</span>
              <span className="text-2xl font-black text-secondary">{correct}</span>
            </div>
            <div className="border border-outline/20 p-4 bg-background/50 text-center">
              <span className="text-[10px] text-on-surface/60 block mb-1">AKURASI</span>
              <span className="text-2xl font-black">{accuracy}%</span>
            </div>
            <div className="border border-primary/40 p-4 bg-primary/10 text-center">
              <span className="text-[10px] text-primary font-bold block mb-1">ESTIMASI SKOR IQ</span>
              <span className="text-2xl font-black text-primary">{estimatedIq}</span>
            </div>
          </div>

          {/* Diagnostic Note */}
          <div className="p-4 border-l-2 border-primary bg-primary/5 text-xs text-on-surface/90 leading-relaxed mb-6">
            <span className="font-bold text-primary block mb-1">[ANALISIS_DIAGNOSTIK]:</span>
            {accuracy >= 80 ? (
              <p>
                Performa luar biasa! Akurasi Anda mencapai {accuracy}%, berada pada rentang IQ target {estimatedIq}.
                Pola deduksi dan efisiensi waktu Anda telah memenuhi standar tes psikometri level tinggi.
              </p>
            ) : accuracy >= 60 ? (
              <p>
                Performa cukup solid ({accuracy}%), estimasi skor berkisar di {estimatedIq}.
                Fokuskan latihan berikutnya pada penguasaan trik eliminasi opsi pengacau dan manajemen waktu.
              </p>
            ) : (
              <p>
                Akurasi saat ini {accuracy}% (Estimasi skor: {estimatedIq}).
                Manfaatkan pembahasan langkah demi langkah di bawah ini untuk memahami pola logika formal yang sering mengecoh.
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-2.5 bg-primary text-on-primary text-xs font-bold uppercase hover:opacity-90 transition-opacity"
            >
              Ulangi Latihan
            </button>
            <Link
              href={returnUrl}
              className="px-6 py-2.5 border border-outline/30 hover:border-primary text-xs uppercase transition-colors"
            >
              Kembali ke Menu Subtes
            </Link>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="ascii-border p-6 bg-surface/30">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-outline/20">
            <h3 className="text-lg font-bold">TINJAUAN JAWABAN LENGKAP</h3>
            <div className="flex gap-2 text-xs">
              <button
                onClick={() => setFilterReview('all')}
                className={`px-3 py-1 border ${
                  filterReview === 'all'
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-outline/20 text-on-surface/70'
                }`}
              >
                Semua ({total})
              </button>
              <button
                onClick={() => setFilterReview('correct')}
                className={`px-3 py-1 border ${
                  filterReview === 'correct'
                    ? 'border-secondary bg-secondary/10 text-secondary'
                    : 'border-outline/20 text-on-surface/70'
                }`}
              >
                Benar ({correct})
              </button>
              <button
                onClick={() => setFilterReview('wrong')}
                className={`px-3 py-1 border ${
                  filterReview === 'wrong'
                    ? 'border-red-500 bg-red-500/10 text-red-500'
                    : 'border-outline/20 text-on-surface/70'
                }`}
              >
                Salah / Kosong ({wrongCount})
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[idx]
              const isCorrect = userAns === q.correctAnswer
              if (filterReview === 'correct' && !isCorrect) return null
              if (filterReview === 'wrong' && isCorrect) return null

              return (
                <div
                  key={q.id}
                  className={`p-4 border ${
                    isCorrect ? 'border-secondary/30 bg-secondary/5' : 'border-red-500/30 bg-red-500/5'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2 text-xs">
                    <span className="font-bold">
                      SOAL #{idx + 1} // {q.title || q.id}
                    </span>
                    <span
                      className={`px-2 py-0.5 text-[10px] font-bold ${
                        isCorrect ? 'bg-secondary/20 text-secondary' : 'bg-red-500/20 text-red-500'
                      }`}
                    >
                      {isCorrect ? 'STATUS: BENAR' : 'STATUS: SALAH'}
                    </span>
                  </div>

                  <p className="text-xs text-on-surface/90 whitespace-pre-line mb-3 font-mono">
                    {q.prompt}
                  </p>

                  <VisualStimulus stimulus={q.stimulus} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3 text-xs">
                    {q.options.map((opt) => {
                      const isOptionCorrect = opt.key === q.correctAnswer
                      const isOptionSelected = opt.key === userAns
                      return (
                        <div
                          key={opt.key}
                          className={`p-2 border text-xs flex items-center justify-between ${
                            isOptionCorrect
                              ? 'border-secondary bg-secondary/15 text-secondary font-bold'
                              : isOptionSelected
                              ? 'border-red-500 bg-red-500/15 text-red-500'
                              : 'border-outline/20 opacity-70'
                          }`}
                        >
                          <span>
                            [{opt.key}] {opt.text}
                          </span>
                          {isOptionCorrect && <span className="text-[10px]">✓ KUNCI</span>}
                          {isOptionSelected && !isOptionCorrect && (
                            <span className="text-[10px]">✕ PILIHAN ANDA</span>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <div className="p-3 bg-surface border border-outline/20 text-[11px] leading-relaxed text-on-surface/80">
                    <span className="font-bold text-primary block mb-1">PEMBAHASAN LOGIKA:</span>
                    {q.explanation}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // ACTIVE QUESTION PRACTICE VIEW
  return (
    <div className="w-full max-w-4xl mx-auto font-mono py-4">
      {/* Top Controls Bar */}
      <div className="ascii-border p-4 bg-surface/40 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href={returnUrl}
            className="text-xs text-on-surface/70 hover:text-primary transition-colors flex items-center gap-1"
          >
            ← <span>KEMBALI</span>
          </Link>
          <span className="text-outline/30">|</span>
          <span className="text-xs font-bold text-foreground truncate max-w-[200px] sm:max-w-md">
            {subtestName}
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          {/* Mode switch */}
          <div className="flex border border-outline/30 text-[10px]">
            <button
              onClick={() => {
                setMode('practice')
                if (selectedAnswers[currentIndex]) setShowExplanation(true)
              }}
              className={`px-2.5 py-1 ${
                mode === 'practice' ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface'
              }`}
            >
              LATIHAN
            </button>
            <button
              onClick={() => {
                setMode('exam')
                setShowExplanation(false)
              }}
              className={`px-2.5 py-1 ${
                mode === 'exam' ? 'bg-primary text-on-primary font-bold' : 'hover:bg-surface'
              }`}
            >
              SIMULASI UJIAN
            </button>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 border border-outline/30 px-3 py-1 bg-surface">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>{formatTime(elapsedSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="text-[10px] text-on-surface/60 hover:text-primary ml-1"
              title={isTimerRunning ? 'Jeda waktu' : 'Lanjutkan waktu'}
            >
              {isTimerRunning ? '⏸' : '▶'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-surface-variant/40 h-1.5 mb-6 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
        ></div>
      </div>

      {/* Main Question Card */}
      <div className="ascii-border p-6 md:p-8 bg-surface/30 mb-6 relative">
        {/* Meta badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-outline/20">
          <div className="flex items-center gap-2">
            <span className="text-primary font-bold text-xs">
              SOAL {currentIndex + 1} / {total}
            </span>
            <span className="text-[10px] px-2 py-0.5 border border-outline/30 text-on-surface/70">
              TINGKAT IQ: {currentQ.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleBookmark}
              className={`text-xs px-2.5 py-1 border transition-colors ${
                bookmarked[currentIndex]
                  ? 'border-primary text-primary bg-primary/10'
                  : 'border-outline/20 text-on-surface/60 hover:border-outline'
              }`}
            >
              {bookmarked[currentIndex] ? '★ TERSIMPAN' : '☆ SIMPAN'}
            </button>
          </div>
        </div>

        {/* Question Title */}
        {currentQ.title && (
          <h3 className="text-base font-bold mb-3 text-foreground">{currentQ.title}</h3>
        )}

        {/* Prompt */}
        <div className="text-sm md:text-base leading-relaxed text-on-surface/90 whitespace-pre-line mb-6 font-mono">
          {currentQ.prompt}
        </div>

        {/* Visual Stimulus if any (SVG matrix / folding net / memory grid) */}
        <VisualStimulus stimulus={currentQ.stimulus} />

        {/* Options */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((opt) => {
            const isSelected = selectedAnswers[currentIndex] === opt.key
            const isCorrect = opt.key === currentQ.correctAnswer
            const showPracticeState = mode === 'practice' && showExplanation

            let optionStyle =
              'border-outline/30 bg-surface/30 hover:border-primary/70 hover:bg-surface/50 text-foreground'
            if (isSelected) {
              optionStyle = 'border-primary bg-primary/15 text-primary font-bold'
            }
            if (showPracticeState) {
              if (isCorrect) {
                optionStyle = 'border-secondary bg-secondary/15 text-secondary font-bold'
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-red-500 bg-red-500/15 text-red-500'
              }
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full p-4 border text-left flex items-start gap-4 transition-all ${optionStyle}`}
              >
                <span className="w-6 h-6 border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {opt.key}
                </span>
                <span className="text-xs md:text-sm leading-relaxed">{opt.text}</span>
              </button>
            )
          })}
        </div>

        {/* Immediate Explanation in Practice Mode */}
        {mode === 'practice' && showExplanation && (
          <div className="border border-outline/30 p-5 bg-background/80 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`text-xs font-bold px-2 py-0.5 ${
                  selectedAnswers[currentIndex] === currentQ.correctAnswer
                    ? 'bg-secondary/20 text-secondary'
                    : 'bg-red-500/20 text-red-500'
                }`}
              >
                {selectedAnswers[currentIndex] === currentQ.correctAnswer
                  ? 'JAWABAN TEPAT'
                  : `JAWABAN KURANG TEPAT (KUNCI: ${currentQ.correctAnswer})`}
              </span>
            </div>
            <p className="text-xs leading-relaxed text-on-surface/90 whitespace-pre-line font-mono">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex justify-between items-center pt-4 border-t border-outline/20">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-5 py-2 border border-outline/30 text-xs font-mono uppercase hover:border-primary disabled:opacity-30 disabled:hover:border-outline/30 transition-all"
          >
            ← Sebelumnya
          </button>

          <div className="text-[10px] text-on-surface/50 hidden sm:block">
            Tekan [A-E] atau [1-5] untuk memilih jawaban
          </div>

          {currentIndex === total - 1 ? (
            <button
              onClick={() => setIsFinished(true)}
              className="px-6 py-2 bg-primary text-on-primary text-xs font-bold uppercase hover:opacity-90 transition-opacity"
            >
              Selesaikan Tes
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-on-primary text-xs font-bold uppercase transition-all"
            >
              Selanjutnya →
            </button>
          )}
        </div>
      </div>

      {/* Quick Jump Grid */}
      <div className="ascii-border p-4 bg-surface/20">
        <div className="text-[10px] text-on-surface/60 mb-2">NAVIGASI NOMOR CEPAT:</div>
        <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-1">
          {questions.map((_, idx) => {
            const isAnswered = Boolean(selectedAnswers[idx])
            const isCurrent = idx === currentIndex
            let btnStyle = 'border-outline/20 text-on-surface/60'
            if (isAnswered) btnStyle = 'border-primary/50 bg-primary/20 text-primary font-bold'
            if (isCurrent) btnStyle = 'border-primary ring-1 ring-primary font-black bg-primary text-on-primary'

            return (
              <button
                key={idx}
                onClick={() => {
                  setCurrentIndex(idx)
                  setShowExplanation(mode === 'practice' && Boolean(selectedAnswers[idx]))
                }}
                className={`w-7 h-7 text-[10px] border flex items-center justify-center transition-all ${btnStyle}`}
              >
                {idx + 1}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

