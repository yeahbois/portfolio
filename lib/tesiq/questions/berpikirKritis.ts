import { Question } from '../types'

export const curatedBerpikirKritis: Question[] = [
  {
    id: 'bk-001',
    subtestId: 'berpikir-kritis',
    title: 'Identifikasi Asumsi Implisit: Produktivitas Remote Work',
    prompt: `Bacalah argumen berikut:
"Perusahaan teknologi yang menerapkan kebijakan kerja jarak jauh (remote work) penuh mencatatkan peningkatan output commit kode sebesar 25% dalam enam bulan terakhir. Oleh karena itu, dewan direksi menyimpulkan bahwa bekerja dari rumah secara universal membuat setiap insinyur perangkat lunak menjadi lebih produktif."

Manakah di antara pernyataan berikut yang merupakan ASUMSI TERSIRAT (implicit assumption) yang mendasari kesimpulan dewan direksi tersebut?`,
    options: [
      { key: 'A', text: 'Jumlah commit kode berkorelasi langsung dan valid sebagai cerminan kualitas serta produktivitas insinyur.' },
      { key: 'B', text: 'Semua insinyur memiliki koneksi internet berkecepatan tinggi di rumah masing-masing.' },
      { key: 'C', text: 'Bekerja di kantor konvensional selalu dipenuhi distraksi obrolan yang merugikan perusahaan.' },
      { key: 'D', text: 'Pengembang yang bekerja dari rumah tidak pernah mengambil cuti sakit.' },
      { key: 'E', text: 'Perusahaan kompetitor belum menerapkan kebijakan kerja jarak jauh.' }
    ],
    correctAnswer: 'A',
    explanation:
      'Asumsi implisit adalah premis yang tidak diucapkan tetapi mutlak dibutuhkan agar kesimpulan menjadi sah. Dewan direksi melompat dari premis "commit kode naik 25%" langsung ke kesimpulan "insinyur lebih produktif". Lompatan ini hanya sah jika diasumsikan bahwa jumlah commit kode mencerminkan produktivitas sejati (bukan sekadar commit kecil-kecil artifisial). Jika asumsi A runtuh, kesimpulan dewan direksi runtuh seketika.',
    difficulty: '111-115',
    estimatedIqRange: '112-117',
    tags: ['asumsi-implisit', 'evaluasi-argumen', 'metrik-produktivitas']
  },
  {
    id: 'bk-002',
    subtestId: 'berpikir-kritis',
    title: 'Memperlemah Argumen (Weaken the Argument): Korelasi vs Kausalitas',
    prompt: `Sebuah studi kesehatan menyimpulkan:
"Orang dewasa yang mengonsumsi kopi hitam minimal tiga cangkir setiap hari memiliki risiko serangan jantung 30% lebih rendah dibandingkan mereka yang tidak meminum kopi. Dengan demikian, zat kafein dalam kopi terbukti secara biologis melindungi pembuluh darah jantung dari penyumbatan plak."

Fakta manakah di bawah ini yang JIKA BENAR akan PALING MELEMAHKAN (weaken) kesimpulan kausal di atas?`,
    options: [
      { key: 'A', text: 'Harga kopi hitam berkualitas cenderung lebih mahal dibandingkan minuman teh herbal.' },
      { key: 'B', text: 'Kelompok peminum kopi hitam dalam studi tersebut didominasi oleh individu yang rutin berolahraga lari pagi dan memiliki pola makan rendah lemak jenuh (variabel pengganggu).' },
      { key: 'C', text: 'Sebagian responden mengaku meminum kopi dengan tambahan susu skim rendah kalori.' },
      { key: 'D', text: 'Kafein juga ditemukan pada daun teh hijau dan biji kakao.' },
      { key: 'E', text: 'Studi tersebut melibatkan sampel sebanyak 5.000 partisipan selama rentang waktu lima tahun.' }
    ],
    correctAnswer: 'B',
    explanation:
      'Argumen studi mengklaim kafein sebagai penyebab langsung (kausalitas) penurunan penyakit jantung. Opsi B menyajikan "variabel perancu / confounding variable" yang kuat: kelompok peminum kopi ternyata juga rajin olahraga dan makan sehat. Faktor gaya hidup sehat inilah yang kemungkinan besar menyebabkan kesehatan jantung mereka, bukan kafeinnya. Menemukan variabel pengganggu adalah cara paling efektif untuk melemahkan klaim kausalitas.',
    difficulty: '116-120',
    estimatedIqRange: '117-122',
    tags: ['memperlemah-argumen', 'variabel-pengganggu', 'kausalitas-korelasi']
  },
  {
    id: 'bk-003',
    subtestId: 'berpikir-kritis',
    title: 'Deteksi Cacat Logika (Logical Fallacy)',
    prompt: `Dalam debat implementasi sistem kecerdasan buatan, Pembicara X menyatakan:
"Jika kita mengizinkan asisten AI menulis satu baris kode saja dalam proyek ini, maka dalam beberapa bulan pengembang manusia akan berhenti berpikir. Akibatnya seluruh tim akan kehilangan keahlian pemrograman, dan pada akhirnya perusahaan kita akan runtuh total tanpa kendali."

Cacat logika (logical fallacy) apakah yang paling jelas dilakukan oleh Pembicara X?`,
    options: [
      { key: 'A', text: 'Ad Hominem (menyerang pribadi lawan bicara)' },
      { key: 'B', text: 'Slippery Slope (lereng licin tanpa bukti rantai kausal)' },
      { key: 'C', text: 'Circular Reasoning (penalaran melingkar)' },
      { key: 'D', text: 'Straw Man (membuat boneka jerami argumen palsu)' },
      { key: 'E', text: 'Appeal to Ignorance (argumen dari ketidaktahuan)' }
    ],
    correctAnswer: 'B',
    explanation:
      'Slippery Slope adalah kesesatan logika di mana seseorang menegaskan bahwa satu langkah awal kecil (mengizinkan AI menulis satu baris kode) pasti akan memicu rantai peristiwa dramatis tanpa bukti logis hingga berakhir pada malapetaka ekstrem (perusahaan runtuh total). Pembicara X tidak menyajikan bukti bahwa transisi tiap tahap niscaya terjadi.',
    difficulty: '111-115',
    estimatedIqRange: '110-115',
    tags: ['logical-fallacy', 'slippery-slope', 'debat-rasional']
  },
  {
    id: 'bk-004',
    subtestId: 'berpikir-kritis',
    title: 'Memperkuat Bukti (Strengthen the Argument)',
    prompt: `Hipotesis geologi menyatakan bahwa cekungan danau purba di wilayah lembah Z terbentuk akibat tumbukan meteorit 10.000 tahun yang lalu, bukan akibat aktivitas erosi sungai glasial.

Temuan bukti manakah di bawah ini yang PALING KUAT MEMPERKOKOH (strengthen) hipotesis tumbukan meteorit tersebut?`,
    options: [
      { key: 'A', text: 'Ditemukannya lapisan mineral "shocked quartz" dan konsentrasi logam Iridium murni dengan anomali tinggi di lapisan sedimen dasar cekungan.' },
      { key: 'B', text: 'Air di danau tersebut memiliki tingkat keasaman (pH) yang serupa dengan air sungai di sekitarnya.' },
      { key: 'C', text: 'Masyarakat lokal memiliki legenda turun-temurun tentang batu api yang jatuh dari langit.' },
      { key: 'D', text: 'Cekungan tersebut memiliki kedalaman rata-rata 45 meter dengan dasar berbatu.' },
      { key: 'E', text: 'Terdapat endapan kerikil halus di tepi timur danau yang sering dijumpai pada aliran air biasa.' }
    ],
    correctAnswer: 'A',
    explanation:
      'Mineral "shocked quartz" (kuarsa terkejut) dan lonjakan konsentrasi Iridium adalah tanda geologis khas ("fingerprint") yang hanya dapat terbentuk di bawah tekanan dan temperatur ekstrem akibat tumbukan kosmik (meteorik), dan mustahil dihasilkan oleh erosi glasial normal. Bukti A memberikan dukungan empiris langsung yang mengukuhkan hipotesis.',
    difficulty: '116-120',
    estimatedIqRange: '118-124',
    tags: ['memperkuat-argumen', 'bukti-empiris', 'metode-ilmiah']
  }
]

export function generateBerpikirKritisQuestions(count: number = 250): Question[] {
  const result: Question[] = [...curatedBerpikirKritis]
  const scenarios = [
    {
      topic: 'Investasi Teknologi Otomasi Industri',
      premise: 'Pabrik yang mengadopsi robotika pintar mencatat kenaikan profitabilitas 18% dalam dua tahun.',
      claim: 'Adopsi robotika pasti meningkatkan kesejahteraan pekerja pabrik.',
      assumption: 'Peningkatan laba perusahaan diterjemahkan menjadi kenaikan upah atau kesempatan kerja yang lebih baik bagi para buruh.',
      flaw: 'Menyamakan profitabilitas pemilik modal dengan kesejahteraan tenaga kerja tanpa bukti distribusi upah.'
    },
    {
      topic: 'Uji Klinis Terapi Bio-Farmasi Baru',
      premise: 'Pasien yang meminum ekstrak tanaman X melaporkan penurunan gejala flu dalam 5 hari.',
      claim: 'Ekstrak tanaman X adalah obat mujarab yang melumpuhkan virus flu secara instan.',
      assumption: 'Flu tidak akan sembuh dengan sendirinya dalam waktu 5 hari melalui sistem imun alami tubuh.',
      flaw: 'Post hoc ergo propter hoc (mengira bahwa kejadian yang terjadi setelah minum obat pasti disebabkan oleh obat tersebut).'
    },
    {
      topic: 'Kebijakan Pendidikan Kurikulum Digital',
      premise: 'Siswa di sekolah dengan fasilitas laptop 1:1 memperoleh skor tes matematika 12 poin lebih tinggi.',
      claim: 'Pemberian gawai digital merupakan kunci tunggal kesuksesan akademik siswa.',
      assumption: 'Faktor latar belakang sosio-ekonomi orang tua dan kualitas guru di sekolah tersebut tidak memengaruhi skor ujian.',
      flaw: 'Mengabaikan variabel pengganggu status sosio-ekonomi (sekolah berfasilitas laptop umumnya berada di kawasan elit).'
    }
  ]

  let idCounter = 5
  while (result.length < count) {
    const s = scenarios[idCounter % scenarios.length]
    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    const question: Question = {
      id: `bk-${String(idCounter).padStart(3, '0')}`,
      subtestId: 'berpikir-kritis',
      title: `Analisis Kritis Kasus #${idCounter}: ${s.topic}`,
      prompt: `Analisis Argumen #${idCounter}:
Dinyatakan bahwa: "${s.premise}"
Berdasarkan fakta itu, diklaim bahwa: "${s.claim}"

Manakah analisis kritis yang PALING AKURAT terhadap struktur penalaran di atas?`,
      options: [
        {
          key: 'A',
          text: `Argumen tersebut memiliki kelemahan mendasar karena ${s.flaw}.`
        },
        {
          key: 'B',
          text: 'Argumen di atas merupakan kebenaran mutlak yang tidak dapat dibantah secara ilmiah.'
        },
        {
          key: 'C',
          text: 'Argumen tersebut sah hanya jika dilakukan survei opini publik berskala nasional.'
        },
        {
          key: 'D',
          text: 'Premis yang disajikan otomatis salah karena berasal dari satu sumber pengamatan.'
        },
        {
          key: 'E',
          text: 'Kesimpulan tersebut pasti benar karena telah terbukti secara matematis tanpa asumsi.'
        }
      ],
      correctAnswer: 'A',
      explanation: `Evaluasi penalaran kritis:
Klaim tersebut melompati batasan data empirisnya. Opsi A secara tepat mengidentifikasi celah logikanya: ${s.flaw}. Peneliti kritis harus selalu memverifikasi apakah ada asumsi implisit (${s.assumption}) yang belum terbukti.`,
      difficulty: difficultyChoice,
      estimatedIqRange: difficultyChoice === '120+' ? '121-127' : '114-120',
      tags: ['berpikir-kritis', 'analisis-argumen', 'evaluasi-klaim', 'asumsi-kritis']
    }

    result.push(question)
    idCounter++
  }

  return result
}

