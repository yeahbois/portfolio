import { Question } from '../types'

export const curatedVerbal: Question[] = [
  {
    id: 'vb-001',
    subtestId: 'verbal',
    title: 'Analogi Kata Kompleks: Relasi Keilmuan dan Metodologi',
    prompt: `HERMENEUTIKA : MAKNA = ENTOMOLOGI : ...`,
    options: [
      { key: 'A', text: 'BEBATUAN' },
      { key: 'B', text: 'SERANGGA' },
      { key: 'C', text: 'FOSIL' },
      { key: 'D', text: 'BAHASA' },
      { key: 'E', text: 'UNGGAS' }
    ],
    correctAnswer: 'B',
    explanation:
      'Hubungan analogi: "Hermeneutika adalah cabang ilmu atau metodologi yang secara spesifik mempelajari interpretasi MAKNA (teks/simbol)". Secara sepadan, "Entomologi adalah cabang ilmu biologi yang secara spesifik mempelajari SERANGGA". (Catatan: Bebatuan = Petrologi/Geologi, Fosil = Paleontologi, Unggas = Ornitologi).',
    difficulty: '116-120',
    estimatedIqRange: '118-124',
    tags: ['analogi-kata', 'istilah-akademik', 'relasi-keilmuan']
  },
  {
    id: 'vb-002',
    subtestId: 'verbal',
    title: 'Padanan Makna / Sinonim Leksikon Tingkat Tinggi',
    prompt: `Kata ESOTERIK memiliki padanan makna yang paling mendekati dengan:`,
    options: [
      { key: 'A', text: 'POPULIS DAN MUDAH DIPAHAMI MASYARAKAT UMUM' },
      { key: 'B', text: 'BERSIFAT TERTUTUP DAN HANYA DIPAHAMI KALANGAN KHUSUS' },
      { key: 'C', text: 'KETINGGALAN ZAMAN ATAU KUNO' },
      { key: 'D', text: 'BERKELANJUTAN DAN TIDAK TERBATAS WAKTU' },
      { key: 'E', text: 'MEMILIKI KANDUNGAN RACUN TINGGI' }
    ],
    correctAnswer: 'B',
    explanation:
      'Menurut KBBI dan etimologi bahasa ilmiah, kata "Esoterik" (esoteric) bermakna bersifat khusus, rahasia, atau hanya dapat dipahami dan diketahui oleh segelintir orang yang memiliki minat atau pengetahuan khusus (kebalikan dari eksoterik/umum). Jadi opsi B adalah definisi yang paling tepat.',
    difficulty: '116-120',
    estimatedIqRange: '116-122',
    tags: ['sinonim-kbbi', 'kosa-kata-tingkat-tinggi', 'leksikon-formal']
  },
  {
    id: 'vb-003',
    subtestId: 'verbal',
    title: 'Lawan Kata / Antonim Konseptual',
    prompt: `Lawan kata (antonim) yang paling tepat untuk istilah ANAKRONISTIS adalah:`,
    options: [
      { key: 'A', text: 'KONTEMPORER' },
      { key: 'B', text: 'SINKRON' },
      { key: 'C', text: 'ARSIPARIS' },
      { key: 'D', text: 'ARKAIK' },
      { key: 'E', text: 'ORTODOKS' }
    ],
    correctAnswer: 'A',
    explanation:
      '"Anakronistis" berarti tidak sesuai dengan urutan waktu atau zaman yang sebenarnya (seringkali tertinggal zaman atau penempatan unsur masa lalu di masa sekarang). Lawan katanya adalah "Kontemporer" (berada pada masa sekarang, kekinian, selaras dengan era waktu saat ini). "Arkaik" dan "Ortodoks" justru berkonotasi purba/tradisional.',
    difficulty: '116-120',
    estimatedIqRange: '118-123',
    tags: ['antonim-konseptual', 'waktu-dan-sejarah', 'leksikon-kbbi']
  },
  {
    id: 'vb-004',
    subtestId: 'verbal',
    title: 'Analogi Proporsional Ganda (A : B = C : D)',
    prompt: `... : AFORISME = NADA : ...`,
    options: [
      { key: 'A', text: 'KALIMAT : MUSIK' },
      { key: 'B', text: 'PEPATIH : MELODI' },
      { key: 'C', text: 'PUISI : SYAIR' },
      { key: 'D', text: 'LOGIKA : RITME' },
      { key: 'E', text: 'BACAAN : SUARA' }
    ],
    correctAnswer: 'B',
    explanation:
      'Aforisme adalah ungkapan ringkas padat yang memuat kebenaran filosofis atau moral, yang merupakan padanan sinonim formal dari "Pepatih / Peribahasa ringkas". Sejajar dengan itu, rangkaian susunan nada yang indah dan membentuk kesatuan musikal adalah "Melodi". Pasangan B menunjukkan hubungan keterkaitan konseptual yang paling simetris.',
    difficulty: '120+',
    estimatedIqRange: '122-127',
    tags: ['analogi-ganda', 'semantik-bahasa', 'sastra-seni']
  },
  {
    id: 'vb-005',
    subtestId: 'verbal',
    title: 'Relasi Derajat Intensitas dan Cacat Makna',
    prompt: `DELUSI : PERSEPSI = KEPALSUAN : ...`,
    options: [
      { key: 'A', text: 'KEBENARAN' },
      { key: 'B', text: 'IMAGINASI' },
      { key: 'C', text: 'KEYAKINAN' },
      { key: 'D', text: 'KEPASTIAN' },
      { key: 'E', text: 'KEBOHONGAN' }
    ],
    correctAnswer: 'A',
    explanation:
      'Hubungan analogi: "Delusi adalah bentuk penyimpangan atau cacat patologis dari PERSEPSI". Dengan pola yang sama, "Kepalsuan adalah bentuk penyimpangan atau ketiadaan dari KEBENARAN". Keduanya menunjukkan relasi kondisi cacat/palsu terhadap kondisi ideal dasarnya.',
    difficulty: '111-115',
    estimatedIqRange: '112-117',
    tags: ['analogi-hubungan', 'derajat-makna', 'filsafat-bahasa']
  }
]

export function generateVerbalQuestions(count: number = 275): Question[] {
  const result: Question[] = [...curatedVerbal]
  const vocabularyPairs = [
    {
      word: 'PEYORATIF',
      synonym: 'Merendahkan atau bermakna memburuk',
      antonym: 'Amelioratif (meninggikan nilai)',
      explanation: 'Peyoratif mengacu pada unsur bahasa yang mengalami pergeseran makna menjadi lebih rendah atau menghina.'
    },
    {
      word: 'EFEMERAL',
      synonym: 'Berumur pendek atau bersifat sementara (fana)',
      antonym: 'Abadi atau langgeng (perpetual)',
      explanation: 'Efemeral bermakna lekas berlalu atau hanya bertahan dalam rentang waktu yang sangat singkat.'
    },
    {
      word: 'AMBIVALEN',
      synonym: 'Bercabang dua atau memiliki perasaan bertentangan sekaligus',
      antonym: 'Tegas dan bulat tekad (unequivocal)',
      explanation: 'Ambivalen adalah kondisi batin atau sikap yang memuat daya tarik dan tolakan secara bersamaan.'
    },
    {
      word: 'HEURISTIK',
      synonym: 'Seni atau metode penemuan praktis untuk memecahkan masalah',
      antonym: 'Algoritma deterministik kaku',
      explanation: 'Heuristik adalah pendekatan berbasis jalan pintas mental (rule of thumb) untuk mempercepat solusi.'
    },
    {
      word: 'TAUTOLOGI',
      synonym: 'Pengulangan gagasan yang sama dengan kata berbeda tanpa menambah informasi',
      antonym: 'Pernyataan padat informatif',
      explanation: 'Tautologi adalah redundansi logika atau bahasa yang mengulang premis yang sama secara mubazir.'
    },
    {
      word: 'APRIORI',
      synonym: 'Pengetahuan yang didapat sebelum atau mendahului pengalaman empiris',
      antonym: 'Aposteriori (berdasarkan pengalaman induktif)',
      explanation: 'Apriori berakar pada penalaran rasional murni tanpa membutuhkan observasi indrawi.'
    },
    {
      word: 'PARADOKS',
      synonym: 'Pernyataan yang seolah bertentangan dengan akal sehat namun memuat kebenaran',
      antonym: 'Kebenaran linear yang gamblang',
      explanation: 'Paradoks menantang intuisi awal dengan menyajikan kontradiksi nyata di tingkat permukaan.'
    },
    {
      word: 'DIKOTOMI',
      synonym: 'Pembagian atas dua kelompok atau cabang yang saling bertentangan',
      antonym: 'Kontinum atau kesatuan monistik',
      explanation: 'Dikotomi membelah suatu domain menjadi dua kubu terpisah (misalnya benar vs salah).'
    }
  ]

  let idCounter = 6
  while (result.length < count) {
    const pair = vocabularyPairs[idCounter % vocabularyPairs.length]
    const isSynonymTest = idCounter % 2 === 0
    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    let question: Question
    if (isSynonymTest) {
      question = {
        id: `vb-${String(idCounter).padStart(3, '0')}`,
        subtestId: 'verbal',
        title: `Tes Leksikon Formal #${idCounter}: Sinonim Kata Baku`,
        prompt: `Dalam konteks wacana ilmiah dan bahasa formal, makna kata "${pair.word}" paling tepat didefinisikan sebagai:`,
        options: [
          { key: 'A', text: pair.synonym.toUpperCase() },
          { key: 'B', text: pair.antonym.toUpperCase() },
          { key: 'C', text: 'BERSIFAT ACAK DAN TANPA POLA YANG JELAS' },
          { key: 'D', text: 'MEMILIKI KANDUNGAN STATISTIK YANG TIDAK DAPAT DIUJI' },
          { key: 'E', text: 'MENGACU PADA PROSES BIOKIMIA SELULAR MIKRO' }
        ],
        correctAnswer: 'A',
        explanation: `Pembahasan leksikon: Kata "${pair.word}" bermakna ${pair.synonym}. ${pair.explanation} Opsi B justru merujuk pada lawan katanya (${pair.antonym}).`,
        difficulty: difficultyChoice,
        estimatedIqRange: difficultyChoice === '120+' ? '122-127' : '115-121',
        tags: ['sinonim', 'kosa-kata-baku', 'verbal-iq', 'kbbi-akademik']
      }
    } else {
      question = {
        id: `vb-${String(idCounter).padStart(3, '0')}`,
        subtestId: 'verbal',
        title: `Tes Lawan Kata #${idCounter}: Antonim Konseptual`,
        prompt: `Lawan kata (antonim) yang paling tepat secara semantik untuk istilah "${pair.word}" adalah:`,
        options: [
          { key: 'A', text: pair.antonym.toUpperCase() },
          { key: 'B', text: pair.synonym.toUpperCase() },
          { key: 'C', text: 'EQUIVOCAL DAN RAGU-RAGU' },
          { key: 'D', text: 'HOMOGEN DAN TUNGGAL' },
          { key: 'E', text: 'STATIS TANPA PERGERAKAN' }
        ],
        correctAnswer: 'A',
        explanation: `Pembahasan antonim: Lawan makna langsung dari "${pair.word}" adalah ${pair.antonym}. Sebaliknya, ${pair.synonym} merupakan padanan artinya.`,
        difficulty: difficultyChoice,
        estimatedIqRange: difficultyChoice === '120+' ? '122-127' : '115-121',
        tags: ['antonim', 'relasi-semantik', 'verbal-iq', 'istilah-formal']
      }
    }

    result.push(question)
    idCounter++
  }

  return result
}

