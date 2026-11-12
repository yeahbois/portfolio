import { Question } from '../types'

export const curatedNumerikal: Question[] = [
  {
    id: 'num-001',
    subtestId: 'numerikal',
    title: 'Deret Angka Bertingkat Dua (Second-Order Differences)',
    prompt: `Tentukan bilangan berikutnya pada deret berikut:
4,  9,  19,  35,  58,  ...`,
    options: [
      { key: 'A', text: '84' },
      { key: 'B', text: '89' },
      { key: 'C', text: '92' },
      { key: 'D', text: '78' },
      { key: 'E', text: '95' }
    ],
    correctAnswer: 'B',
    explanation:
      'Hitung selisih antar suku berurutan (tingkat 1):\n9 - 4 = +5\n19 - 9 = +10\n35 - 19 = +16\n58 - 35 = +23\n\nSekarang periksa selisih dari selisih tersebut (tingkat 2):\n10 - 5 = +5\n16 - 10 = +6\n23 - 16 = +7\nPola selisih tingkat 2 adalah bilangan berurutan (+5, +6, +7, +8).\nMaka selisih tingkat 1 berikutnya = 23 + 8 = +31.\nBilangan suku berikutnya = 58 + 31 = 89.',
    difficulty: '111-115',
    estimatedIqRange: '112-117',
    tags: ['deret-bertingkat', 'selisih-tingkat-dua', 'pola-bilangan']
  },
  {
    id: 'num-002',
    subtestId: 'numerikal',
    title: 'Deret Berselingan Dua Jalur (Interleaved Sequences)',
    prompt: `Berapakah dua suku berikutnya dari deret di bawah ini?
3,  12,  7,  24,  15,  48,  31,  ... ,  ...`,
    options: [
      { key: 'A', text: '96 dan 63' },
      { key: 'B', text: '63 dan 96' },
      { key: 'C', text: '72 dan 55' },
      { key: 'D', text: '96 dan 64' },
      { key: 'E', text: '88 dan 45' }
    ],
    correctAnswer: 'A',
    explanation:
      'Pisahkan deret menjadi dua jalur berselingan:\nJalur Ganjil (posisi 1, 3, 5, 7, 9): 3, 7, 15, 31, ...\nPolanya: (3 x 2) + 1 = 7, (7 x 2) + 1 = 15, (15 x 2) + 1 = 31, suku berikutnya = (31 x 2) + 1 = 63.\n\nJalur Genap (posisi 2, 4, 6, 8): 12, 24, 48, ...\nPolanya: dikali 2 terus menerus (12 x 2 = 24, 24 x 2 = 48, 48 x 2 = 96).\n\nUrutan dua suku berikutnya adalah suku ke-8 (jalur genap = 96) disusul suku ke-9 (jalur ganjil = 63). Jawaban yang benar adalah 96 dan 63.',
    difficulty: '116-120',
    estimatedIqRange: '117-123',
    tags: ['deret-berseling', 'pola-ganda', 'aljabar-mental']
  },
  {
    id: 'num-003',
    subtestId: 'numerikal',
    title: 'Logika Aritmatika Cepat: Efisiensi Kerja Paralel',
    prompt: `Server Alpha dapat memproses 1.200 transaksi dalam waktu 40 detik. Server Beta dapat memproses jumlah transaksi yang sama dalam waktu 60 detik.
Jika kedua server bekerja sama secara paralel untuk menyelesaikan total 5.000 transaksi, berapa detik waktu yang dibutuhkan?`,
    options: [
      { key: 'A', text: '80 detik' },
      { key: 'B', text: '100 detik' },
      { key: 'C', text: '120 detik' },
      { key: 'D', text: '90 detik' },
      { key: 'E', text: '105 detik' }
    ],
    correctAnswer: 'B',
    explanation:
      'Hitung laju pemrosesan per detik masing-masing server:\n- Laju Server Alpha = 1.200 transaksi / 40 detik = 30 transaksi/detik.\n- Laju Server Beta = 1.200 transaksi / 60 detik = 20 transaksi/detik.\n- Laju gabungan kedua server = 30 + 20 = 50 transaksi/detik.\n\nWaktu total untuk 5.000 transaksi = 5.000 / 50 = 100 detik.',
    difficulty: '111-115',
    estimatedIqRange: '110-115',
    tags: ['laju-kerja', 'aritmatika-cepat', 'kecepatan-paralel']
  },
  {
    id: 'num-004',
    subtestId: 'numerikal',
    title: 'Pola Bilangan Modulo & Kuadrat Tersembunyi',
    prompt: `Perhatikan deret unik berikut:
2,  5,  11,  23,  47,  ...`,
    options: [
      { key: 'A', text: '95' },
      { key: 'B', text: '91' },
      { key: 'C', text: '89' },
      { key: 'D', text: '102' },
      { key: 'E', text: '97' }
    ],
    correctAnswer: 'A',
    explanation:
      'Identifikasi pola relasi berulang antar suku:\n(2 x 2) + 1 = 5\n(5 x 2) + 1 = 11\n(11 x 2) + 1 = 23\n(23 x 2) + 1 = 47\nPolanya adalah: suku_berikutnya = (suku_sebelumnya x 2) + 1.\nMaka nilai suku berikutnya = (47 x 2) + 1 = 94 + 1 = 95.',
    difficulty: '111-115',
    estimatedIqRange: '111-116',
    tags: ['rekursif-aritmatika', 'penggandaan', 'deret-angka']
  },
  {
    id: 'num-005',
    subtestId: 'numerikal',
    title: 'Deret Pangkat dan Selisih Kubik',
    prompt: `Tentukan angka yang hilang pada deret berikut:
0,  7,  26,  63,  124,  ...`,
    options: [
      { key: 'A', text: '215' },
      { key: 'B', text: '216' },
      { key: 'C', text: '225' },
      { key: 'D', text: '198' },
      { key: 'E', text: '240' }
    ],
    correctAnswer: 'A',
    explanation:
      'Kenali pola bilangan kubik (n^3 - 1):\n1^3 - 1 = 1 - 1 = 0\n2^3 - 1 = 8 - 1 = 7\n3^3 - 1 = 27 - 1 = 26\n4^3 - 1 = 64 - 1 = 63\n5^3 - 1 = 125 - 1 = 124\nMaka suku ke-6 = 6^3 - 1 = 216 - 1 = 215.',
    difficulty: '116-120',
    estimatedIqRange: '118-123',
    tags: ['bilangan-kubik', 'deret-pangkat', 'analisis-pola']
  }
]

export function generateNumerikalQuestions(count: number = 310): Question[] {
  const result: Question[] = [...curatedNumerikal]

  let idCounter = 6
  while (result.length < count) {
    const patternType = idCounter % 4
    let question: Question
    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    if (patternType === 0) {
      // Linear multi-difference sequence
      const base = (idCounter * 3) % 20 + 2
      const step1 = (idCounter % 5) + 3
      const stepDiff = 2
      const s0 = base
      const s1 = s0 + step1
      const s2 = s1 + (step1 + stepDiff)
      const s3 = s2 + (step1 + 2 * stepDiff)
      const s4 = s3 + (step1 + 3 * stepDiff)
      const s5 = s4 + (step1 + 4 * stepDiff)

      question = {
        id: `num-${String(idCounter).padStart(3, '0')}`,
        subtestId: 'numerikal',
        title: `Deret Bilangan Pola Tingkat Dua #${idCounter}`,
        prompt: `Berapakah nilai suku berikutnya pada deret bilangan ini?\n${s0},  ${s1},  ${s2},  ${s3},  ${s4},  ...`,
        options: [
          { key: 'A', text: String(s5) },
          { key: 'B', text: String(s5 + 4) },
          { key: 'C', text: String(s5 - 3) },
          { key: 'D', text: String(s5 + 7) },
          { key: 'E', text: String(s5 - 6) }
        ],
        correctAnswer: 'A',
        explanation: `Analisis selisih deret:
Selisih 1: ${s1 - s0}
Selisih 2: ${s2 - s1} (+${stepDiff} dari sebelumnya)
Selisih 3: ${s3 - s2} (+${stepDiff} dari sebelumnya)
Selisih 4: ${s4 - s3} (+${stepDiff} dari sebelumnya)
Selisih ke suku berikutnya = ${s4 - s3 + stepDiff}.
Maka nilai suku berikutnya = ${s4} + ${s4 - s3 + stepDiff} = ${s5}.`,
        difficulty: difficultyChoice,
        estimatedIqRange: difficultyChoice === '120+' ? '121-127' : '112-119',
        tags: ['deret-angka', 'numerik-iq', 'selisih-bertingkat']
      }
    } else if (patternType === 1) {
      // Alternating Multiplicative and Additive Sequence
      const start = (idCounter % 6) + 3
      const mult = 2
      const add = (idCounter % 4) + 1
      const n1 = start
      const n2 = n1 * mult
      const n3 = n2 + add
      const n4 = n3 * mult
      const n5 = n4 + add
      const n6 = n5 * mult

      question = {
        id: `num-${String(idCounter).padStart(3, '0')}`,
        subtestId: 'numerikal',
        title: `Pola Operasi Bergantian (Kali & Tambah) #${idCounter}`,
        prompt: `Tentukan angka kelanjutan dari deret berikut:\n${n1},  ${n2},  ${n3},  ${n4},  ${n5},  ...`,
        options: [
          { key: 'A', text: String(n6) },
          { key: 'B', text: String(n6 + 5) },
          { key: 'C', text: String(n6 - 4) },
          { key: 'D', text: String(n5 + add) },
          { key: 'E', text: String(n6 + 8) }
        ],
        correctAnswer: 'A',
        explanation: `Analisis operasi bergantian:
- ${n1} x ${mult} = ${n2}
- ${n2} + ${add} = ${n3}
- ${n3} x ${mult} = ${n4}
- ${n4} + ${add} = ${n5}
Operasi berikutnya adalah dikali ${mult}: ${n5} x ${mult} = ${n6}.`,
        difficulty: difficultyChoice,
        estimatedIqRange: difficultyChoice === '120+' ? '121-127' : '112-119',
        tags: ['operasi-bergantian', 'deret-angka', 'aritmatika-mental']
      }
    } else if (patternType === 2) {
      // Work rate / velocity problem
      const speedA = 60 + (idCounter % 5) * 10
      const timeMinutes = 30 + (idCounter % 4) * 15
      const distance = (speedA * timeMinutes) / 60
      const targetTimeMinutes = timeMinutes - 10
      const requiredSpeed = Math.round((distance / (targetTimeMinutes / 60)) * 10) / 10

      question = {
        id: `num-${String(idCounter).padStart(3, '0')}`,
        subtestId: 'numerikal',
        title: `Penalaran Kuantitatif: Laju Perjalanan #${idCounter}`,
        prompt: `Sebuah kendaraan menempuh jarak tertentu dalam waktu ${timeMinutes} menit dengan kecepatan rata-rata ${speedA} km/jam.
Jika kendaraan tersebut harus tiba 10 menit lebih cepat (dalam ${targetTimeMinutes} menit), berapa kecepatan rata-rata yang harus ditempuh?`,
        options: [
          { key: 'A', text: `${requiredSpeed} km/jam` },
          { key: 'B', text: `${Math.round((requiredSpeed + 8) * 10) / 10} km/jam` },
          { key: 'C', text: `${Math.round((requiredSpeed - 6) * 10) / 10} km/jam` },
          { key: 'D', text: `${speedA + 15} km/jam` },
          { key: 'E', text: `${Math.round((requiredSpeed + 14) * 10) / 10} km/jam` }
        ],
        correctAnswer: 'A',
        explanation: `Langkah kalkulasi:
1. Hitung jarak: s = v x t = ${speedA} km/jam x (${timeMinutes}/60) jam = ${distance} km.
2. Waktu target baru: ${targetTimeMinutes} menit = ${targetTimeMinutes}/60 jam.
3. Kecepatan baru yang dibutuhkan: v = s / t = ${distance} / (${targetTimeMinutes}/60) = ${requiredSpeed} km/jam.`,
        difficulty: difficultyChoice,
        estimatedIqRange: difficultyChoice === '120+' ? '120-126' : '110-116',
        tags: ['soal-cerita-kuantitatif', 'kecepatan-jarak-waktu', 'aljabar-praktis']
      }
    } else {
      // Fibonacci variant (Sum of previous two terms + constant)
      const c = (idCounter % 3) + 1
      const f1 = (idCounter % 4) + 1
      const f2 = f1 + 2
      const f3 = f1 + f2 + c
      const f4 = f2 + f3 + c
      const f5 = f3 + f4 + c
      const f6 = f4 + f5 + c

      question = {
        id: `num-${String(idCounter).padStart(3, '0')}`,
        subtestId: 'numerikal',
        title: `Varian Barisan Rekursif Fibonacci #${idCounter}`,
        prompt: `Carilah suku selanjutnya pada barisan bilangan rekursif ini:\n${f1},  ${f2},  ${f3},  ${f4},  ${f5},  ...`,
        options: [
          { key: 'A', text: String(f6) },
          { key: 'B', text: String(f6 + 4) },
          { key: 'C', text: String(f6 - 5) },
          { key: 'D', text: String(f5 * 2) },
          { key: 'E', text: String(f6 + 9) }
        ],
        correctAnswer: 'A',
        explanation: `Pola rekursif yang berlaku:
- ${f1} + ${f2} + ${c} = ${f3}
- ${f2} + ${f3} + ${c} = ${f4}
- ${f3} + ${f4} + ${c} = ${f5}
Suku selanjutnya dihitung dengan menjumlahkan dua suku sebelumnya ditambah konstanta ${c}:
${f4} + ${f5} + ${c} = ${f6}.`,
        difficulty: difficultyChoice,
        estimatedIqRange: difficultyChoice === '120+' ? '121-127' : '112-118',
        tags: ['fibonacci-variant', 'rekursif', 'pola-bilangan']
      }
    }

    result.push(question)
    idCounter++
  }

  return result
}

