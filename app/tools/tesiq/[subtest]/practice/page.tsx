import React from 'react'
import { notFound } from 'next/navigation'
import { SUBTESTS_DATA } from '@/lib/tesiq/subtestsData'
import { getQuestionsForSubtest } from '@/lib/tesiq/questions'
import { SubtestId, DifficultyLevel } from '@/lib/tesiq/types'
import PracticeEngine from '@/components/tesiq/PracticeEngine'

interface PageProps {
  params: Promise<{
    subtest: string
  }>
  searchParams: Promise<{
    mode?: string
    limit?: string
    difficulty?: string
  }>
}

export async function generateMetadata({ params }: PageProps) {
  const { subtest } = await params
  const data = SUBTESTS_DATA[subtest]
  if (!data) return { title: 'Latihan Tidak Ditemukan' }
  return {
    title: `Latihan ${data.name} | TES IQ`,
    description: `Sesi latihan interaktif ${data.name} untuk meningkatkan skor IQ.`
  }
}

export default async function SubtestPracticePage({ params, searchParams }: PageProps) {
  const { subtest } = await params
  const { mode: modeParam, limit: limitParam, difficulty: diffParam } = await searchParams

  const data = SUBTESTS_DATA[subtest]
  if (!data) {
    notFound()
  }

  const mode = modeParam === 'exam' ? 'exam' : 'practice'
  const limit = limitParam ? parseInt(limitParam, 10) : 30
  const difficulty = diffParam as DifficultyLevel | undefined

  const questions = getQuestionsForSubtest(subtest as SubtestId, {
    limit,
    difficulty
  })

  return (
    <div className="py-8 px-4 max-w-6xl mx-auto w-full">
      <PracticeEngine
        subtestId={subtest as SubtestId}
        subtestName={data.name}
        questions={questions}
        mode={mode}
        returnUrl={`/tools/tesiq/${data.slug}`}
      />
    </div>
  )
}

