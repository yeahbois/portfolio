import { Question } from '../types'

export const curatedKreatifitas: Question[] = [
  {
    id: 'kr-001',
    subtestId: 'kreatifitas',
    title: 'Remote Associates Test (RAT): Kata Pengikat Asosiatif',
    prompt: `Temukan SATU kata pengikat yang dapat digabungkan dengan ketiga kata berikut untuk membentuk kata majemuk atau frasa baku yang bermakna dalam Bahasa Indonesia:

[MATA]  -  [KAKI]  -  [RUMPUT]`,
    options: [
      { key: 'A', text: 'KUCING' },
      { key: 'B', text: 'JALAN' },
      { key: 'C', text: 'HIJAU' },
      { key: 'D', text: 'KACA' },
      { key: 'E', text: 'LIAR' }
    ],
    correctAnswer: 'A',
    explanation:
      'Kata "KUCING" dapat berasosiasi secara sah dengan ketiga kata pembentuk frasa:\n1. Mata Kucing (batu permata chrysoberyl / mata reflektor jalan)\n2. Kaki Kucing (istilah tanaman herbal obat / jejak)\n3. Rumput Kucing (catnip / rumput hiasan).\nUji asosiasi ini mengukur kelincahan pencarian memori semantik divergen tingkat tinggi.',
    difficulty: '116-120',
    estimatedIqRange: '118-124',
    tags: ['remote-associates', 'asosiasi-divergen', 'kreatifitas-linguistik']
  },
  {
    id: 'kr-002',
    subtestId: 'kreatifitas',
    title: 'Teka-Teki Logika Lateral (Lateral Thinking Riddle)',
    prompt: `Seorang pria sedang berada di dalam ruangan berbentuk kubus tertutup tanpa jendela dan hanya memiliki satu pintu keluar yang terbuat dari baja padat.
Pintu tersebut terkunci dari luar dengan kode sandi yang tidak ia ketahui. Di dalam ruangan hanya terdapat: satu meja kayu bundar, satu lilin menyala, sebuah kotak korek api, dan sebuah cermin besar di dinding.
Bagaimanakah ia bisa keluar dari ruangan tersebut menggunakan penalaran lateral kreatif?`,
    options: [
      { key: 'A', text: 'Ia melihat ke cermin untuk melihat "apa yang ia lihat" (what he saw), menggunakan "gergaji" (saw) untuk membelah meja menjadi dua bagian, menggabungkan dua bagian (two halves) menjadi sebuah lubang utuh (a whole), lalu meloloskan diri melalui lubang itu.' },
      { key: 'B', text: 'Membakar meja kayu dengan korek api hingga pintu baja meleleh karena panas.' },
      { key: 'C', text: 'Memecahkan cermin dan menggunakan pecahannya untuk menggali lantai beton.' },
      { key: 'D', text: 'Menunggu lilin habis agar sensor pintu mendeteksi ketiadaan cahaya lalu terbuka otomatis.' },
      { key: 'E', text: 'Meniup lilin dan berteriak meminta tolong melalui ventilasi udara.' }
    ],
    correctAnswer: 'A',
    explanation:
      'Ini adalah teka-teki logika lateral klasik dunia yang mengandalkan homofon dan dekonstruksi konseptual bahasa ("saw" = melihat / gergaji; "two halves" = dua belahan / "a whole" = sebuah lubang utuh). Opsi B, C, D, dan E melanggar hukum fisika atau mengasumsikan elemen yang tidak ada di premis.',
    difficulty: '120+',
    estimatedIqRange: '122-128',
    tags: ['lateral-thinking', 'dekonstruksi-konseptual', 'riddle-kreatif']
  },
  {
    id: 'kr-003',
    subtestId: 'kreatifitas',
    title: 'Sintesis Pola Non-Linear: Kombinatorik Simbolik',
    prompt: `Perhatikan transformasi konseptual berikut:
- SURAT + WAKTU = SEJARAH
- LOGIKA + RASA = INTUISI
- RUANG + BENDA = DENSITAS

Dengan pola abstraksi hubungan konseptual yang sama, apakah hasil dari:
IMAGINASI + STRUKTUR = ...?`,
    options: [
      { key: 'A', text: 'ARSITEKTUR' },
      { key: 'B', text: 'MIMPI' },
      { key: 'C', text: 'KEKACAUAN' },
      { key: 'D', text: 'KOSONG' },
      { key: 'E', text: 'HALUSINASI' }
    ],
    correctAnswer: 'A',
    explanation:
      'Pola ini menggabungkan entitas abstrak cair (Imaginasi) dengan batasan matematis/teknis teratur (Struktur). Ketika imajinasi bebas diberi wujud struktur nyata yang kokoh dan estetis, lahirlah "ARSITEKTUR". Opsi B dan E tidak memiliki unsur struktur, sedangkan C dan D adalah ketiadaan.',
    difficulty: '116-120',
    estimatedIqRange: '119-125',
    tags: ['sintesis-pola', 'abstraksi-konsep', 'kreatifitas-kognitif']
  }
]

export function generateKreatifitasQuestions(count: number = 235): Question[] {
  const result: Question[] = [...curatedKreatifitas]

  const ratItems = [
    {
      triad: ['KERETA', 'PUTIH', 'UDARA'],
      connector: 'GANTUNG',
      phrases: ['Kereta Gantung', 'Gantung Putih (istilah)', 'Gantung di Udara / Gantungan'],
      domain: 'Asosiasi Leksikal Fisik'
    },
    {
      triad: ['AIR', 'HITAM', 'GULING'],
      connector: 'OMBAK',
      phrases: ['Ombak Air', 'Ombak Hitam (badai)', 'Berguling dalam Ombak'],
      domain: 'Metafora Alam'
    },
    {
      triad: ['KAMPUS', 'KUNING', 'TERBANG'],
      connector: 'JAKET',
      phrases: ['Jaket Kampus', 'Jaket Kuning', 'Jaket Terbang (flight jacket)'],
      domain: 'Objek Keseharian'
    },
    {
      triad: ['BINTANG', 'MERAH', 'PANGGUNG'],
      connector: 'KARPET',
      phrases: ['Bintang di Karpet', 'Karpet Merah', 'Karpet Panggung'],
      domain: 'Representasi Visual'
    },
    {
      triad: ['KERTAS', 'JALAN', 'PIKIRAN'],
      connector: 'PETA',
      phrases: ['Kertas Peta', 'Peta Jalan (Roadmap)', 'Peta Pikiran (Mind Map)'],
      domain: 'Sistem Informasi'
    }
  ]

  let idCounter = 4
  while (result.length < count) {
    const item = ratItems[idCounter % ratItems.length]
    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    const question: Question = {
      id: `kr-${String(idCounter).padStart(3, '0')}`,
      subtestId: 'kreatifitas',
      title: `Uji Asosiasi Divergen (RAT) #${idCounter}: ${item.domain}`,
      prompt: `Temukan SATU kata pengikat yang secara kreatif dan gramatikal dapat berasosiasi atau membentuk makna bersama dengan ketiga kata berikut:\n\n[ ${item.triad[0]} ]  -  [ ${item.triad[1]} ]  -  [ ${item.triad[2]} ]`,
      options: [
        { key: 'A', text: item.connector },
        { key: 'B', text: 'GARIS' },
        { key: 'C', text: 'TITIK' },
        { key: 'D', text: 'LINGKARAN' },
        { key: 'E', text: 'RUANG' }
      ],
      correctAnswer: 'A',
      explanation: `Analisis asosiasi divergen:
Kata pengikat yang tepat adalah "${item.connector}".
Hubungan asosiasi yang terbentuk:
1. ${item.triad[0]} + ${item.connector}
2. ${item.triad[1]} + ${item.connector}
3. ${item.triad[2]} + ${item.connector}
Kemampuan ini mengukur fleksibilitas jalur asosiasi semantik dalam memori jangka panjang.`,
      difficulty: difficultyChoice,
      estimatedIqRange: difficultyChoice === '120+' ? '122-128' : '116-122',
      tags: ['remote-associates', 'kreatifitas-divergen', 'tes-kognitif-kreatif']
    }

    result.push(question)
    idCounter++
  }

  return result
}

