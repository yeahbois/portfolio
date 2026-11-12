import { Question, SubtestId, DifficultyLevel } from '../types'
import { generateAnalisisSintesaQuestions } from './analisisSintesa'
import { generateBerpikirKritisFleksibelQuestions } from './berpikirKritisFleksibel'
import { generateVerbalQuestions } from './verbal'
import { generateBerpikirKritisQuestions } from './berpikirKritis'
import { generateNumerikalQuestions } from './numerikal'
import { generateKreatifitasQuestions } from './kreatifitas'
import { generateAbstraksiQuestions } from './abstraksi'
import { generateMemoriQuestions } from './memori'

// Cache generated questions in memory for instant responses
const questionBankCache: Partial<Record<SubtestId, Question[]>> = {}

export function getQuestionsForSubtest(
  subtestId: SubtestId,
  options?: {
    difficulty?: DifficultyLevel
    limit?: number
    search?: string
  }
): Question[] {
  if (!questionBankCache[subtestId]) {
    switch (subtestId) {
      case 'analisis-sintesa':
        questionBankCache[subtestId] = generateAnalisisSintesaQuestions(260)
        break
      case 'berpikir-kritis-fleksibel':
        questionBankCache[subtestId] = generateBerpikirKritisFleksibelQuestions(240)
        break
      case 'verbal':
        questionBankCache[subtestId] = generateVerbalQuestions(275)
        break
      case 'berpikir-kritis':
        questionBankCache[subtestId] = generateBerpikirKritisQuestions(250)
        break
      case 'numerikal':
        questionBankCache[subtestId] = generateNumerikalQuestions(310)
        break
      case 'kreatifitas':
        questionBankCache[subtestId] = generateKreatifitasQuestions(235)
        break
      case 'abstraksi':
        questionBankCache[subtestId] = generateAbstraksiQuestions(250)
        break
      case 'memori':
        questionBankCache[subtestId] = generateMemoriQuestions(230)
        break
      default:
        return []
    }
  }

  let list = questionBankCache[subtestId] || []

  if (options?.difficulty) {
    list = list.filter((q) => q.difficulty === options.difficulty)
  }

  if (options?.search && options.search.trim()) {
    const term = options.search.toLowerCase()
    list = list.filter(
      (q) =>
        q.prompt.toLowerCase().includes(term) ||
        (q.title && q.title.toLowerCase().includes(term)) ||
        q.tags.some((t) => t.toLowerCase().includes(term))
    )
  }

  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit)
  }

  return list
}

export function getComprehensiveMockExamQuestions(totalCount: number = 40): Question[] {
  const subtests: SubtestId[] = [
    'analisis-sintesa',
    'berpikir-kritis-fleksibel',
    'verbal',
    'berpikir-kritis',
    'numerikal',
    'kreatifitas',
    'abstraksi',
    'memori'
  ]

  const perSubtest = Math.max(2, Math.floor(totalCount / subtests.length))
  const pool: Question[] = []

  for (const s of subtests) {
    const qs = getQuestionsForSubtest(s, { limit: perSubtest })
    pool.push(...qs)
  }

  // Shuffle questions cleanly
  return pool.sort(() => 0.5 - Math.random()).slice(0, totalCount)
}

export function getTotalQuestionCount(): number {
  return 260 + 240 + 275 + 250 + 310 + 235 + 250 + 230 // 2,050 questions total!
}

