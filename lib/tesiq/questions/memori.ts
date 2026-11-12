import { Question } from '../types'

export const curatedMemori: Question[] = [
  {
    id: 'mem-001',
    subtestId: 'memori',
    title: 'IST Merkaufgaben: Asosiasi Kategori dan Kata',
    prompt: `[PETUNJUK MEMORI KERJA]:
Bayangkan Anda telah menghafal daftar kata berikut selama 60 detik dalam sesi tes psikometri:
- KATEGORI BUNGA: Flamboyan, Kenanga, Mawar, Soka, Teratai
- KATEGORI PERKAKAS: Cangkul, Gegep, Palu, Sekop, Tang
- KATEGORI KOTA: Ambon, Denpasar, Medan, Padang, Sorong
- KATEGORI KESENIAN: Arca, Gamelan, Ketoprak, Mozaik, Opera
- KATEGORI BINATANG: Beruang, Cendrawasih, Komodo, Luwak, Trenggiling

PERTANYAAN RECALL:
Kata yang diawali dengan huruf "T" dan tergolong dalam KATEGORI BINATANG adalah:`,
    stimulus: {
      type: 'memory-words',
      data: {
        categoryTested: 'BINATANG',
        initialLetter: 'T'
      }
    },
    options: [
      { key: 'A', text: 'TRENGGILING' },
      { key: 'B', text: 'TERATAI' },
      { key: 'C', text: 'TANG' },
      { key: 'D', text: 'TARIK' },
      { key: 'E', text: 'TURIS' }
    ],
    correctAnswer: 'A',
    explanation:
      'Dalam daftar kata yang dihafalkan pada kategori BINATANG: [Beruang, Cendrawasih, Komodo, Luwak, Trenggiling]. Kata dengan huruf depan "T" adalah "Trenggiling". (Catatan pengacau: "Teratai" adalah Bunga, "Tang" adalah Perkakas). Subtes Merkaufgaben mengukur daya retrieval informasi terstruktur dari memori kerja.',
    difficulty: '111-115',
    estimatedIqRange: '113-118',
    tags: ['ist-merkaufgaben', 'memori-asosiatif', 'kategori-kata']
  },
  {
    id: 'mem-002',
    subtestId: 'memori',
    title: 'Digit Span Mundur (Backward Digit Span)',
    prompt: `[STIMULUS MEMORI DENGAR / RETENSI MENTAL]:
Diberikan urutan 7 digit angka berikut untuk diolah dalam memori kerja (working memory buffer):
9  -  4  -  1  -  7  -  3  -  8  -  2

Jika Anda diminta untuk membalik urutan angka tersebut dari belakang ke depan (backward span recall), urutan manakah yang TEPAT?`,
    options: [
      { key: 'A', text: '2 - 8 - 3 - 7 - 1 - 4 - 9' },
      { key: 'B', text: '2 - 3 - 8 - 7 - 1 - 4 - 9' },
      { key: 'C', text: '2 - 8 - 7 - 3 - 1 - 4 - 9' },
      { key: 'D', text: '9 - 4 - 1 - 7 - 3 - 8 - 2' },
      { key: 'E', text: '2 - 8 - 3 - 7 - 4 - 1 - 9' }
    ],
    correctAnswer: 'A',
    explanation:
      'Urutan semula dari kiri ke kanan: 9, 4, 1, 7, 3, 8, 2.\nUrutan pembalikan murni dari kanan ke kiri:\nDigit ke-7: 2\nDigit ke-6: 8\nDigit ke-5: 3\nDigit ke-4: 7\nDigit ke-3: 1\nDigit ke-2: 4\nDigit ke-1: 9\nHasil backward span yang benar: 2 - 8 - 3 - 7 - 1 - 4 - 9. Backward span 7 digit setara dengan level IQ 120+ dalam tes WAIS.',
    difficulty: '116-120',
    estimatedIqRange: '119-124',
    tags: ['digit-span-backward', 'working-memory', 'kapasitas-buffer']
  },
  {
    id: 'mem-003',
    subtestId: 'memori',
    title: 'Visual Grid Pattern Recall (Memori Matriks Spasial)',
    prompt: `[MEMORI SPASIAL 4x4]:
Sebuah kisi matriks 4x4 (16 kotak) menyala pada 4 koordinat spesifik selama 3 detik:
- Kotak (Baris 1, Kolom 3)
- Kotak (Baris 2, Kolom 1)
- Kotak (Baris 3, Kolom 4)
- Kotak (Baris 4, Kolom 2)

Setelah fase penundaan 10 detik, koordinat manakah yang BUKAN merupakan salah satu dari 4 kotak yang menyala sebelumnya?`,
    stimulus: {
      type: 'memory-grid',
      data: {
        activeCoords: ['(1,3)', '(2,1)', '(3,4)', '(4,2)']
      }
    },
    options: [
      { key: 'A', text: 'Kotak (Baris 2, Kolom 3)' },
      { key: 'B', text: 'Kotak (Baris 1, Kolom 3)' },
      { key: 'C', text: 'Kotak (Baris 3, Kolom 4)' },
      { key: 'D', text: 'Kotak (Baris 2, Kolom 1)' },
      { key: 'E', text: 'Kotak (Baris 4, Kolom 2)' }
    ],
    correctAnswer: 'A',
    explanation:
      'Koordinat aktif yang harus diingat adalah (1,3), (2,1), (3,4), dan (4,2). Kotak (Baris 2, Kolom 3) TIDAK PERNAH menyala (pada baris 2, yang menyala adalah kolom 1). Memori spasial grid mengukur kinerja visuospatial sketchpad dalam model Baddeley.',
    difficulty: '116-120',
    estimatedIqRange: '118-124',
    tags: ['memori-spasial', 'grid-recall', 'visuospatial-sketchpad']
  }
]

export function generateMemoriQuestions(count: number = 230): Question[] {
  const result: Question[] = [...curatedMemori]

  const categories = [
    {
      name: 'KOTA',
      words: ['Bandung', 'Cirebon', 'Gorontalo', 'Kupang', 'Manado', 'Semarang', 'Tarakan'],
      initials: ['B', 'C', 'G', 'K', 'M', 'S', 'T']
    },
    {
      name: 'KESENIAN',
      words: ['Batik', 'Calung', 'Gandrung', 'Keroncong', 'Monolog', 'Sasando', 'Tari'],
      initials: ['B', 'C', 'G', 'K', 'M', 'S', 'T']
    },
    {
      name: 'PERKAKAS',
      words: ['Baut', 'Cutter', 'Gergaji', 'Kikir', 'Martil', 'Solder', 'Tang'],
      initials: ['B', 'C', 'G', 'K', 'M', 'S', 'T']
    },
    {
      name: 'BUNGA',
      words: ['Bakung', 'Cempaka', 'Gladiol', 'Kamboja', 'Melati', 'Sedap-Malam', 'Tulip'],
      initials: ['B', 'C', 'G', 'K', 'M', 'S', 'T']
    }
  ]

  let idCounter = 4
  while (result.length < count) {
    const cat = categories[idCounter % categories.length]
    const wordIndex = (idCounter * 2) % cat.words.length
    const targetWord = cat.words[wordIndex]
    const targetInitial = cat.initials[wordIndex]
    const otherCat = categories[(idCounter + 1) % categories.length]
    const distractorWord = otherCat.words[wordIndex]

    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    const question: Question = {
      id: `mem-${String(idCounter).padStart(3, '0')}`,
      subtestId: 'memori',
      title: `Simulasi Retensi Memori Kerja #${idCounter}: ${cat.name}`,
      prompt: `[DRILL MERKAUFGABEN #${idCounter}]:
Diberikan kelompok kata terstruktur dalam kategori [${cat.name}]:
${cat.words.join(', ')}

PERTANYAAN RECALL ASOSIATIF:
Kata manakah yang tergolong dalam KATEGORI [${cat.name}] dan diawali dengan huruf depan "${targetInitial}"?`,
      stimulus: {
        type: 'memory-words',
        data: {
          category: cat.name,
          initial: targetInitial
        }
      },
      options: [
        { key: 'A', text: targetWord.toUpperCase() },
        { key: 'B', text: distractorWord.toUpperCase() },
        { key: 'C', text: 'TITANIUM' },
        { key: 'D', text: 'GELOMBANG' },
        { key: 'E', text: 'PARAMETRIK' }
      ],
      correctAnswer: 'A',
      explanation: `Analisis pemanggilan memori (memory recall):
Kata yang tepat dari daftar kategori ${cat.name} dengan huruf depan "${targetInitial}" adalah "${targetWord}". Opsi B ("${distractorWord}") berasal dari kategori ${otherCat.name}. Latihan ini memperkuat kapasitas buffer asosiasi kategori psikometris.`,
      difficulty: difficultyChoice,
      estimatedIqRange: difficultyChoice === '120+' ? '121-127' : '113-119',
      tags: ['ist-merkaufgaben', 'memori-kerja', 'kategori-kata', 'retensi-jangka-pendek']
    }

    result.push(question)
    idCounter++
  }

  return result
}

