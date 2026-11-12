import { Question } from '../types'

export const curatedBerpikirKritisFleksibel: Question[] = [
  {
    id: 'bkf-001',
    subtestId: 'berpikir-kritis-fleksibel',
    title: 'Resolusi Paradoks: Kecepatan Rilis vs Stabilitas Sistem',
    prompt: `Sebuah startup teknologi mengalami paradoks:
- Kebijakan A (Rilis Cepat) meningkatkan adopsi pengguna sebesar 40%, tetapi menyebabkan insiden sistem naik 35%.
- Kebijakan B (Uji Coba Ketat) menurunkan insiden sistem hingga 90%, tetapi adopsi pengguna mandek karena kompetitor lebih cepat merilis fitur baru.

Manajemen dituntut untuk mencapai target kuartal: "Meningkatkan adopsi pengguna tanpa meningkatkan total waktu henti (downtime) sistem."

Manakah di antara alternatif solusi berikut yang menunjukkan kelenturan berpikir kritis (cognitive flexibility) paling efektif untuk mengatasi dilema tersebut?`,
    options: [
      { key: 'A', text: 'Memilih Kebijakan B secara penuh dan mengabaikan persaingan kompetitor demi menjaga nama baik stabilitas.' },
      { key: 'B', text: 'Menerapkan arsitektur Feature Flags dan Canary Deployment: merilis cepat ke 5% pengguna terlebih dahulu, memantau telemetri otomatis, dan melakukan rollback instan jika terdeteksi anomali sebelum rilis penuh.' },
      { key: 'C', text: 'Menambah jam lembur tim pengembang sebanyak 50% agar pengujian ketat dapat selesai dalam waktu rilis cepat.' },
      { key: 'D', text: 'Mengganti seluruh arsitektur sistem menjadi monolitik agar pengujian menjadi jauh lebih sederhana.' },
      { key: 'E', text: 'Memilih Kebijakan A dan memberikan kompensasi diskon langganan kepada setiap pengguna yang terkena insiden sistem.' }
    ],
    correctAnswer: 'B',
    explanation:
      'Berpikir kritis fleksibel menolak dikotomi palsu (false dichotomy) "pilih rilis cepat ATAU stabil". Opsi B memadukan kedua kebutuhan melalui inovasi proses: Feature Flags dan Canary Deployment memungkinkan kecepatan iterasi tinggi (tujuan A) sembari mengisolasi risiko insiden hanya ke fraksi kecil pengguna dengan rollback otomatis (tujuan B). Opsi A dan E berserah pada salah satu kerugian, Opsi C memicu burnout tanpa jaminan kualitas, dan Opsi D adalah langkah mundur arsitektur.',
    difficulty: '116-120',
    estimatedIqRange: '118-124',
    tags: ['resolusi-dilema', 'perspektif-alternatif', 'lateral-thinking']
  },
  {
    id: 'bkf-002',
    subtestId: 'berpikir-kritis-fleksibel',
    title: 'Penalaran Kontrafaktual: Perubahan Aturan Tiba-Tiba',
    prompt: `Sebuah kompetisi robotika memiliki aturan penilaian awal:
"Poin utama dihitung dari kecepatan robot mencapai garis akhir (100 poin minus jumlah detik tempuh). Robot yang menabrak rintangan didiskualifikasi."

Namun di babak final, panitia mengumumkan aturan penyesuaian adaptif:
"Lintasan kini dipenuhi rintangan dinamis tak terduga. Robot tidak didiskualifikasi jika menabrak, melainkan mendapat penalti waktu 15 detik, tetapi setiap rintangan yang berhasil dipindahkan ke zona aman bernilai bonus 40 poin."

Robot A dirancang untuk kecepatan murni (kecepatan 5 m/s, tanpa lengan mekanik).
Robot B dirancang dengan kecepatan sedang (2.5 m/s, memiliki lengan mekanik modular yang dapat diaktifkan).

Bagaimanakah strategi paling adaptif bagi tim Robot B untuk memaksimalkan skor di babak final?`,
    options: [
      { key: 'A', text: 'Menonaktifkan lengan mekanik dan mencoba meniru kecepatan Robot A secara penuh.' },
      { key: 'B', text: 'Mengalihkan fokus ke manuver memindahkan rintangan sebanyak mungkin ke zona aman, karena nilai bonus (40 poin) jauh melampaui bobot penalti detik tempuh.' },
      { key: 'C', text: 'Menunggu Robot A menyelesaikan lintasan terlebih dahulu agar rintangan terdorong menepi.' },
      { key: 'D', text: 'Memprotes aturan panitia karena merugikan desain awal tim.' },
      { key: 'E', text: 'Berjalan sangat lambat agar tidak terkena penalti sama sekali meskipun mengabaikan pemindahan rintangan.' }
    ],
    correctAnswer: 'B',
    explanation:
      'Fleksibilitas berpikir mengharuskan re-kalkulasi payoff matrix begitu parameter aturan berubah. Pada aturan baru, 1 rintangan dipindahkan memberi nilai +40 poin (setara menghemat 40 detik waktu tempuh, atau kompensasi hampir 3 kali lipat penalti tabrakan). Robot B memiliki kapabilitas unik (lengan mekanik). Mengoptimalkan aset unik tersebut pada aturan baru menghasilkan skor kumulatif yang jauh lebih tinggi daripada memaksakan balapan kecepatan melawan Robot A yang memang dirancang lebih cepat. Opsi B adalah adaptasi strategis yang paling fleksibel dan rasional.',
    difficulty: '116-120',
    estimatedIqRange: '116-121',
    tags: ['adaptasi-aturan', 'payoff-matrix', 'penalaran-adaptif']
  },
  {
    id: 'bkf-003',
    subtestId: 'berpikir-kritis-fleksibel',
    title: 'Evaluasi Multiperspektif: Dilema Data Privacy vs Personalization',
    prompt: `Seorang analis produk dihadapkan pada dua argumen dari stakeholder yang bertolak belakang:
- Tim Pemasaran: "Pengguna menginginkan pengalaman belanja yang sangat personal. Kita harus mengumpulkan data browsing mendalam dan lokasi presisi setiap saat."
- Tim Kepatuhan Hukum: "Regulasi privasi data terbaru mewajibkan minimisasi data (data minimization) dan persetujuan eksplisit pengguna, pelanggaran berisiko denda besar."

Solusi yang mencerminkan pemikiran kritis fleksibel tingkat tinggi adalah:`,
    options: [
      { key: 'A', text: 'Mengabaikan tim kepatuhan karena potensi pendapatan dari personalisasi jauh lebih besar daripada denda regulasi.' },
      { key: 'B', text: 'Menghentikan seluruh fitur personalisasi produk agar terbebas dari risiko hukum 100%.' },
      { key: 'C', text: 'Menerapkan teknologi On-Device Federated Learning dan Zero-Knowledge Personalization: preferensi dipelajari langsung di ponsel pengguna tanpa mengirim data mentah atau lokasi ke server pusat.' },
      { key: 'D', text: 'Menyembunyikan klausul persetujuan pelacakan di dalam teks Syarat & Ketentuan yang sangat panjang agar pengguna tidak sadar.' },
      { key: 'E', text: 'Menyerahkan keputusan sepenuhnya kepada voting acak tim internal tanpa pertimbangan teknis.' }
    ],
    correctAnswer: 'C',
    explanation:
      'Pemikir fleksibel tidak membatasi diri pada opsi kompromi buruk (melanggar hukum vs membunuh produk). Opsi C menjembatani kedua kepentingan dengan pendekatan teknologi mutakhir: On-Device Learning menghasilkan personalisasi presisi tinggi (tujuan pemasaran) sekaligus mematuhi asas minimisasi data karena data mentah tidak pernah keluar dari perangkat pengguna (tujuan kepatuhan).',
    difficulty: '120+',
    estimatedIqRange: '121-127',
    tags: ['multiperspektif', 'sintesis-inovatif', 'etika-teknologi']
  }
]

export function generateBerpikirKritisFleksibelQuestions(count: number = 240): Question[] {
  const result: Question[] = [...curatedBerpikirKritisFleksibel]
  const themes = [
    {
      topic: 'Optimalisasi Infrastruktur Data Terdistribusi',
      dilemma: 'Kebutuhan konsistensi ketat (ACID) berhadapan dengan ketersediaan tinggi (High Availability) pada skala jutaan pengguna.',
      conventionalA: 'Memaksakan locking database terpusat yang menyebabkan bottleneck parah.',
      conventionalB: 'Mengabaikan konsistensi sehingga terjadi duplikasi saldo akun keuangan pengguna.',
      flexibleSolution: 'Menerapkan model Eventual Consistency dengan Conflict-Free Replicated Data Types (CRDTs) dan kompensasi transaksi otomatis pada operasi non-kritis.'
    },
    {
      topic: 'Manajemen Alokasi Sumber Daya Insinyur',
      dilemma: 'Deadline fitur baru dari dewan direksi bertabrakan dengan tumpukan technical debt yang mengancam kegagalan infrastruktur.',
      conventionalA: 'Hanya mengerjakan fitur baru dan membiarkan kode lama membusuk hingga crash total.',
      conventionalB: 'Menghentikan seluruh pengembangan fitur bisnis selama setahun demi penulisan ulang kode.',
      flexibleSolution: 'Menerapkan pola Strangler Fig: menyisipkan refaktor modular sebesar 20% kapasitas sprint secara bertahap bersamaan dengan pengiriman fitur baru.'
    },
    {
      topic: 'Strategi Respons Insiden Keamanan Zero-Day',
      dilemma: 'Celah keamanan kritis ditemukan pada pustaka open-source utama yang menopang API publik.',
      conventionalA: 'Mematikan seluruh server publik hingga vendor resmi merilis patch resmi dalam beberapa minggu.',
      conventionalB: 'Membiarkan sistem berjalan normal tanpa proteksi agar operasional bisnis tidak terganggu.',
      flexibleSolution: 'Menempatkan Web Application Firewall (WAF) dengan aturan virtual patching darurat di layer proxy terdepan sembari mengisolasi dependensi rentan.'
    }
  ]

  let idCounter = 4
  while (result.length < count) {
    const t = themes[idCounter % themes.length]
    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    const question: Question = {
      id: `bkf-${String(idCounter).padStart(3, '0')}`,
      subtestId: 'berpikir-kritis-fleksibel',
      title: `Kasus Fleksibilitas Penalaran #${idCounter}: ${t.topic}`,
      prompt: `Studi Kasus Adaptasi #${idCounter}:
Dalam konteks "${t.topic}", tim kepemimpinan menghadapi situasi kompleks:
"${t.dilemma}"

Jika pendekatan konvensional yang kaku menemui jalan buntu, langkah manakah di bawah ini yang paling merefleksikan fleksibilitas berpikir kritis dan pemecahan masalah adaptif?`,
      options: [
        { key: 'A', text: t.flexibleSolution },
        { key: 'B', text: t.conventionalA },
        { key: 'C', text: t.conventionalB },
        { key: 'D', text: 'Menunda seluruh keputusan hingga kuartal berikutnya dan berharap kondisi pasar membaik dengan sendirinya.' },
        { key: 'E', text: 'Mendelegasikan masalah ke pihak luar tanpa menetapkan kriteria evaluasi yang terukur.' }
      ],
      correctAnswer: 'A',
      explanation: `Analisis fleksibilitas kognitif:
Solusi yang adaptif (Opsi A) berhasil membongkar jalan buntu dengan mendefinisikan ulang batas masalah dan mencari jalur ketiga yang cerdas (${t.flexibleSolution}). Sebaliknya, opsi B dan C terjebak dalam bias ekstrem hitam-putih, sedangkan opsi D dan E adalah bentuk penghindaran masalah (avoidance).`,
      difficulty: difficultyChoice,
      estimatedIqRange: difficultyChoice === '120+' ? '121-128' : '114-120',
      tags: ['berpikir-fleksibel', 'problem-solving-adaptif', 'evaluasi-strategis']
    }

    result.push(question)
    idCounter++
  }

  return result
}

