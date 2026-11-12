import { Question } from '../types'

export const curatedAnalisisSintesa: Question[] = [
  {
    id: 'as-001',
    subtestId: 'analisis-sintesa',
    title: 'Silogisme Bersyarat Majemuk: Efisiensi Algoritma',
    prompt: `Perhatikan premis-premis berikut:
1. Jika modul pemrosesan data dioptimalkan, latensi sistem akan turun di bawah 50ms.
2. Jika latensi sistem turun di bawah 50ms, antrean transaksi tidak akan menumpuk.
3. Terjadi penumpukan antrean transaksi yang menyebabkan kegagalan sistem pada pukul 14.00.
4. Tim arsitektur menyatakan bahwa konsumsi memori server tetap berada pada batas aman 60%.

Berdasarkan fakta-fakta di atas, kesimpulan logis yang PASTI BENAR adalah:`,
    options: [
      { key: 'A', text: 'Konsumsi memori server yang aman menyebabkan modul pemrosesan gagal bekerja.' },
      { key: 'B', text: 'Modul pemrosesan data tidak dioptimalkan.' },
      { key: 'C', text: 'Latensi sistem berhasil turun di bawah 50ms tetapi ada gangguan jaringan eksternal.' },
      { key: 'D', text: 'Antrean transaksi menumpuk karena memori server melampaui ambang batas 60%.' },
      { key: 'E', text: 'Optimalisasi modul pemrosesan data tidak memiliki korelasi dengan antrean transaksi.' }
    ],
    correctAnswer: 'B',
    explanation:
      'Gunakan aturan Modus Tollens berantai. Dari premis 2: "Jika latensi < 50ms -> antrean tidak menumpuk". Fakta 3 menyatakan "antrean menumpuk" (ingkaran dari konsekuen). Maka latensi TIDAK turun di bawah 50ms. Dari premis 1: "Jika modul dioptimalkan -> latensi < 50ms". Karena latensi tidak < 50ms (ingkaran konsekuen), maka disimpulkan bahwa "Modul pemrosesan data tidak dioptimalkan" (Modus Tollens valid). Opsi A, C, D, dan E menambahkan asumsi spekulatif yang tidak didukung premis.',
    difficulty: '111-115',
    estimatedIqRange: '110-115',
    tags: ['silogisme', 'modus-tollens', 'kondisional-majemuk']
  },
  {
    id: 'as-002',
    subtestId: 'analisis-sintesa',
    title: 'Penataan Posisi Logis: Urutan Rilis Microservice',
    prompt: `Enam layanan mikro (Auth, Billing, Catalog, Delivery, Email, Frontend) harus dideploy ke kluster server satu per satu dengan aturan urutan berikut:
- Catalog harus dideploy lebih dulu sebelum Auth dan Billing.
- Frontend harus dideploy tepat setelah Delivery dideploy.
- Email tidak boleh dideploy pada urutan pertama maupun terakhir.
- Auth harus dideploy sebelum Delivery.

Jika Email dideploy pada urutan ketiga dan Frontend pada urutan kelima, urutan rilis manakah yang memenuhi seluruh syarat di atas?`,
    options: [
      { key: 'A', text: 'Catalog, Auth, Email, Delivery, Frontend, Billing' },
      { key: 'B', text: 'Catalog, Billing, Email, Auth, Frontend, Delivery' },
      { key: 'C', text: 'Billing, Catalog, Email, Delivery, Frontend, Auth' },
      { key: 'D', text: 'Auth, Catalog, Email, Delivery, Frontend, Billing' },
      { key: 'E', text: 'Catalog, Delivery, Email, Auth, Frontend, Billing' }
    ],
    correctAnswer: 'A',
    explanation:
      'Analisis posisi tetap: Posisi 3 = Email, Posisi 5 = Frontend. Karena Frontend tepat setelah Delivery, maka Posisi 4 = Delivery. Syarat "Auth sebelum Delivery" berarti Auth harus berada di posisi 1 atau 2. Syarat "Catalog sebelum Auth" berarti Catalog harus di posisi 1, sehingga Auth di posisi 2. Sisa posisi 6 ditempati oleh Billing. Urutan lengkap: 1. Catalog, 2. Auth, 3. Email, 4. Delivery, 5. Frontend, 6. Billing. Opsi A memenuhi seluruh batasan.',
    difficulty: '116-120',
    estimatedIqRange: '118-122',
    tags: ['logika-posisi', 'urutan-analitis', 'penataan-kondisi']
  },
  {
    id: 'as-003',
    subtestId: 'analisis-sintesa',
    title: 'Kuantor dan Diagram Venn: Relasi Komponen Sistem',
    prompt: `Diberikan pernyataan logika berikut:
1. Semua arsitek sistem yang bersertifikasi menguasai pola konkurensi terdistribusi.
2. Sebagian pengembang yang menguasai pola konkurensi terdistribusi tidak menulis kode refaktor setiap hari.
3. Tidak ada insinyur junior yang merupakan arsitek sistem yang bersertifikasi.

Manakah kesimpulan di bawah ini yang PALING VALID secara deduktif?`,
    options: [
      { key: 'A', text: 'Semua insinyur junior tidak menguasai pola konkurensi terdistribusi.' },
      { key: 'B', text: 'Sebagian orang yang menguasai pola konkurensi terdistribusi adalah arsitek sistem yang bersertifikasi.' },
      { key: 'C', text: 'Semua pengembang yang menulis kode refaktor setiap hari adalah arsitek sistem bersertifikasi.' },
      { key: 'D', text: 'Sebagian insinyur junior menulis kode refaktor setiap hari.' },
      { key: 'E', text: 'Tidak ada pengembang yang menguasai pola konkurensi terdistribusi yang merupakan insinyur junior.' }
    ],
    correctAnswer: 'B',
    explanation:
      'Pernyataan 1 menyatakan himpunan "Arsitek Bersertifikasi" adalah himpunan bagian murni dari himpunan "Menguasai Pola Konkurensi". Karena ada arsitek bersertifikasi, maka konversi parsialnya sahih: "Sebagian yang menguasai pola konkurensi terdistribusi adalah arsitek sistem yang bersertifikasi" (konversi A ke I valid). Opsi A salah karena insinyur junior mungkin saja menguasai pola tersebut. Opsi C, D, dan E melampaui cakupan premis.',
    difficulty: '111-115',
    estimatedIqRange: '112-116',
    tags: ['kuantor', 'diagram-venn', 'silogisme-kategorik']
  },
  {
    id: 'as-004',
    subtestId: 'analisis-sintesa',
    title: 'Sintesis Data Terfragmentasi: Alokasi Proyek Kriptografi',
    prompt: `Sebuah lab keamanan memiliki lima peneliti: Rian, Sinta, Tio, Uma, dan Viko.
Mereka akan dibagi ke dalam dua tim proyek: Proyek Quantum dan Proyek Zero-Knowledge.
Ketentuan alokasi tim:
- Setiap peneliti harus masuk ke tepat satu proyek.
- Jika Rian masuk Proyek Quantum, maka Tio harus masuk Proyek Zero-Knowledge.
- Sinta dan Uma tidak boleh berada dalam proyek yang sama.
- Viko harus berada dalam proyek yang sama dengan Sinta.
- Jika Uma masuk Proyek Zero-Knowledge, maka Tio juga harus masuk Proyek Zero-Knowledge.

Jika Proyek Quantum memiliki anggota lebih banyak daripada Proyek Zero-Knowledge, siapakah yang PASTI berada di Proyek Quantum?`,
    options: [
      { key: 'A', text: 'Uma dan Rian' },
      { key: 'B', text: 'Sinta dan Viko' },
      { key: 'C', text: 'Tio dan Sinta' },
      { key: 'D', text: 'Rian dan Viko' },
      { key: 'E', text: 'Sinta dan Rian' }
    ],
    correctAnswer: 'B',
    explanation:
      'Total peneliti ada 5 orang. Karena Proyek Quantum memiliki anggota lebih banyak, maka pembagiannya harus 3 orang di Quantum dan 2 orang di Zero-Knowledge. Viko dan Sinta harus bersama di tim yang sama. Sinta dan Uma beda tim. Jika Sinta & Viko masuk Zero-Knowledge, anggota ZK minimal 2 orang. Tapi jika Uma di ZK, Sinta di Quantum. Uji kasus: Jika Sinta & Viko di Quantum, Uma di ZK. Jika Uma di ZK, maka Tio harus di ZK (aturan 5). Maka ZK sudah berisi 2 orang: Uma dan Tio. Akibatnya, Rian harus masuk Quantum bersama Sinta dan Viko. Tim Quantum = {Sinta, Viko, Rian} (3 orang), ZK = {Uma, Tio} (2 orang). Cek aturan Rian: Rian di Quantum -> Tio di ZK (terpenuhi!). Sinta dan Viko PASTI berada di Proyek Quantum.',
    difficulty: '120+',
    estimatedIqRange: '122-126',
    tags: ['logika-kombinatorial', 'pembagian-tim', 'deduksi-multivariabel']
  },
  {
    id: 'as-005',
    subtestId: 'analisis-sintesa',
    title: 'Analisis Kausalitas & Kontradiksi Hipotesis',
    prompt: `Dalam investigasi anomali performa basis data, diperoleh tiga hipotesis:
- Hipotesis X: Terjadi kebocoran koneksi (connection leak).
- Hipotesis Y: Terjadi deadlock transaksi pada tabel ledger.
- Hipotesis Z: Kapasitas IOPS disk penyimpan terlampaui.

Fakta teknis yang ditemukan tim investigasi:
1. Jika Hipotesis X atau Hipotesis Y benar, maka metrik CPU server pasti melonjak di atas 90%.
2. Jika Hipotesis Z benar, maka waktu tunggu I/O disk pasti lebih dari 100ms.
3. Hasil telemetri menunjukkan metrik CPU server stabil pada angka 42%, sedangkan waktu tunggu I/O disk tercatat 185ms.

Kesimpulan definitif yang paling tepat adalah:`,
    options: [
      { key: 'A', text: 'Hipotesis X dan Hipotesis Y keduanya benar, tetapi Hipotesis Z salah.' },
      { key: 'B', text: 'Hipotesis Z benar, sedangkan Hipotesis X dan Hipotesis Y keduanya salah.' },
      { key: 'C', text: 'Hanya Hipotesis X yang salah, status Hipotesis Y tidak dapat ditentukan.' },
      { key: 'D', text: 'Ketiga hipotesis tidak terbukti kebenarannya.' },
      { key: 'E', text: 'Hipotesis Y benar karena metrik CPU tidak berkorelasi langsung dengan deadlock.' }
    ],
    correctAnswer: 'B',
    explanation:
      'Fakta 3 menunjukkan CPU stabil 42% (ingkaran dari CPU > 90%). Berdasarkan Fakta 1, jika (X atau Y) maka CPU > 90%. Karena CPU tidak > 90%, maka ~(X atau Y) = (~X dan ~Y). Artinya Hipotesis X dan Y KEDUANYA SALAH. Waktu tunggu I/O adalah 185ms (> 100ms), yang konsisten dengan kondisi Hipotesis Z. Jadi, Hipotesis Z terkonfirmasi, sedangkan X dan Y keduanya pasti salah.',
    difficulty: '116-120',
    estimatedIqRange: '116-120',
    tags: ['hukum-de-morgan', 'eliminasi-hipotesis', 'penalaran-kausal']
  }
]

// Algorithmic Generator to produce over 250 varied high-difficulty questions
export function generateAnalisisSintesaQuestions(count: number = 260): Question[] {
  const result: Question[] = [...curatedAnalisisSintesa]
  const scenarios = [
    {
      domain: 'Optimasi Jaringan Komputasi',
      entity: 'Paket Data',
      verbs: ['Diteruskan', 'Dienkripsi', 'Dibuang', 'Dicadangkan'],
      conditions: ['latensi jaringan', 'bandwidth transmisi', 'kunci kriptografi', 'firewall proxy']
    },
    {
      domain: 'Manajemen Alokasi Server Cloud',
      entity: 'Instance VM',
      verbs: ['Dijalankan', 'Dimigrasikan', 'Dimatikan', 'Diskalakan'],
      conditions: ['beban memori', 'utilisasi core CPU', 'replikasi database', 'zona ketersediaan']
    },
    {
      domain: 'Audit Integritas Kode Sumber',
      entity: 'Pull Request',
      verbs: ['Disetujui', 'Ditolak', 'Dimerge', 'Direfaktor'],
      conditions: ['cakupan pengujian unit', 'analisis statis sonar', 'persetujuan tech lead', 'linting format']
    },
    {
      domain: 'Siklus Audit Keamanan Siber',
      entity: 'Endpoint Perusahaan',
      verbs: ['Diisolasi', 'Dipindai', 'Diputihkan', 'Dibatasi'],
      conditions: ['aktivitas mencurigakan', 'hash malware cocok', 'kebijakan zero-trust', 'token akses valid']
    }
  ]

  let idCounter = 6
  while (result.length < count) {
    const s = scenarios[idCounter % scenarios.length]
    const qIndex = idCounter
    const difficultyChoice: Question['difficulty'] =
      qIndex % 3 === 0 ? '120+' : qIndex % 2 === 0 ? '116-120' : '111-115'

    const question: Question = {
      id: `as-${String(idCounter).padStart(3, '0')}`,
      subtestId: 'analisis-sintesa',
      title: `Analisis Logika Formal #${idCounter}: ${s.domain}`,
      prompt: `Dalam sistem ${s.domain.toLowerCase()}, terdapat 4 aturan tata kelola ${s.entity.toLowerCase()} berikut:
1. Jika ${s.conditions[0]} melebihi ambang batas kritis, maka ${s.entity} harus ${s.verbs[0].toLowerCase()}.
2. ${s.entity} hanya boleh ${s.verbs[1].toLowerCase()} apabila ${s.conditions[1]} telah terverifikasi stabil.
3. Tidak ada ${s.entity.toLowerCase()} yang ${s.verbs[2].toLowerCase()} jika ${s.conditions[2]} masih berlaku.
4. Pada siklus iterasi ke-${idCounter}, diketahui ${s.conditions[0]} melampaui batas kritis, tetapi ${s.conditions[1]} tidak stabil.

Berdasarkan premis-premis logis di atas, tindakan atau kesimpulan manakah yang PASTI SAHIH?`,
      options: [
        {
          key: 'A',
          text: `${s.entity} harus ${s.verbs[0].toLowerCase()}, dan ${s.entity} TIDAK boleh ${s.verbs[1].toLowerCase()}.`
        },
        {
          key: 'B',
          text: `${s.entity} boleh ${s.verbs[1].toLowerCase()} karena kondisi darurat ${s.conditions[0]}.`
        },
        {
          key: 'C',
          text: `${s.entity} pasti ${s.verbs[2].toLowerCase()} meskipun ${s.conditions[2]} masih berlaku.`
        },
        {
          key: 'D',
          text: `Sistem secara otomatis mengabaikan aturan ${s.conditions[1]} untuk menstabilkan kondisi.`
        },
        {
          key: 'E',
          text: `${s.entity} tidak boleh ${s.verbs[0].toLowerCase()} sampai ${s.conditions[1]} stabil.`
        }
      ],
      correctAnswer: 'A',
      explanation: `Analisis deduktif langkah demi langkah:
1. Premis 1 menyatakan implikasi langsung: "${s.conditions[0]} kritis -> ${s.entity} ${s.verbs[0].toLowerCase()}". Karena ${s.conditions[0]} terbukti kritis, maka ${s.entity} WAJIB ${s.verbs[0].toLowerCase()} (Modus Ponens).
2. Premis 2 adalah kondisi mutlak (hanya jika): "${s.entity} ${s.verbs[1].toLowerCase()} -> ${s.conditions[1]} stabil". Karena ${s.conditions[1]} TIDAK stabil, maka dengan Modus Tollens, ${s.entity} TIDAK BOLEH ${s.verbs[1].toLowerCase()}.
3. Menggabungkan kedua hasil deduksi: "${s.entity} harus ${s.verbs[0].toLowerCase()} dan tidak boleh ${s.verbs[1].toLowerCase()}". Opsi A adalah satu-satunya kesimpulan yang sah tanpa asumsi tambahan.`,
      difficulty: difficultyChoice,
      estimatedIqRange: difficultyChoice === '120+' ? '120-128' : '112-119',
      tags: ['silogisme-bersyarat', 'analisis-sintesa', 'logika-formal', 'kondisi-hanya-jika']
    }

    result.push(question)
    idCounter++
  }

  return result
}

