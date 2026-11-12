export type SubtestId =
  | 'analisis-sintesa'
  | 'berpikir-kritis-fleksibel'
  | 'verbal'
  | 'berpikir-kritis'
  | 'numerikal'
  | 'kreatifitas'
  | 'abstraksi'
  | 'memori'

export type DifficultyLevel = '105-110' | '111-115' | '116-120' | '120+'

export type SubtestFormat = 'text' | 'numerical' | 'image' | 'hybrid' | 'memory'

export interface SubtestMeta {
  id: SubtestId
  slug: string
  name: string
  shortName: string
  currentScore: number
  currentStatus: 'Kurang' | 'Cukup' | 'Baik' | 'Baik Sekali'
  targetScore: number
  targetStatus: string
  format: SubtestFormat
  formatLabel: string
  priority: 'Tinggi (Fokus Utama)' | 'Sedang (Peningkatan)' | 'Pertahankan'
  description: string
  psychometricRole: string
  testStructure: string
  tacticalTips: string[]
  totalQuestionsAvailable: number
}

export interface QuestionOption {
  key: string // 'A', 'B', 'C', 'D', 'E'
  text: string
}

export interface Question {
  id: string
  subtestId: SubtestId
  title?: string
  prompt: string
  stimulus?: {
    type: 'text' | 'table' | 'svg-matrix' | 'svg-shape' | 'memory-grid' | 'memory-words'
    data?: any
  }
  options: QuestionOption[]
  correctAnswer: string // 'A', 'B', etc.
  explanation: string
  difficulty: DifficultyLevel
  estimatedIqRange: string
  tags: string[]
}

export interface UserAnswerRecord {
  questionId: string
  selectedAnswer: string
  isCorrect: boolean
  timeSpentSeconds: number
}

export interface QuizSessionResult {
  subtestId: SubtestId | 'simulasi-komprehensif'
  totalQuestions: number
  correctCount: number
  accuracyPercentage: number
  estimatedScore: number
  answers: UserAnswerRecord[]
  completedAt: string
}

export interface ExternalPsychometricResource {
  id: string
  title: string
  provider: string
  type: 'api' | 'dataset' | 'web-practice' | 'visual-bank'
  url: string
  description: string
  freeAccess: boolean
}

