import { SubtestMeta, ExternalPsychometricResource } from './types'

export const SUBTESTS_DATA: Record<string, SubtestMeta> = {
  'analisis-sintesa': {
    id: 'analisis-sintesa',
    slug: 'analisis-sintesa',
    name: 'Kemampuan Analisis - Sintesa',
    shortName: 'Analisis & Sintesa',
    currentScore: 89,
    currentStatus: 'Kurang',
    targetScore: 115,
    targetStatus: 'Baik (115 - 120+)',
    format: 'text',
    formatLabel: 'Berbasis Teks (Logika Analitis & Deduktif)',
    priority: 'Tinggi (Fokus Utama)',
    description:
      'Kemampuan membedah informasi kompleks dan membingungkan menjadi komponen-komponen dasar (analisis), serta menyusun dan mengintegrasikan premis-premis terpisah menjadi kesimpulan baru yang sahih dan logis (sintesa).',
    psychometricRole:
      'Dalam tes IQ (seperti IST Subtest GE/AN atau TIKI), subtes ini memprediksi kapabilitas pemecahan masalah multidimensi, deteksi relasi sebab-akibat tersembunyi, dan penalaran silogistik ketat tanpa terdistraksi opini bias.',
    testStructure:
      'Berupa silogisme majemuk, pemetaan kondisi bersyarat (kondisi batas jika-maka, tautologi), logika penataan posisi/jadwal multi-variabel, dan penarikan intisari deduktif dari data terfragmentasi.',
    tacticalTips: [
      'Gunakan metode eliminasi opsi bertahap: singkirkan opsi yang melanggar hukum logika atau menggeneralisasi premis secara berlebihan.',
      'Waspadai kesesatan logika klasik seperti Affirming the Consequent (Menegaskan Konsekuen) dan Denying the Antecedent (Menyangkal Anteseden).',
      'Buat sketsa matriks relasi sederhana atau diagram garis untuk soal urutan posisi, waktu, atau syarat berantai.',
      'Jangan gunakan asumsi atau pengetahuan umum dunia nyata jika premis soal menetapkan aturan khusus tersendiri.'
    ],
    totalQuestionsAvailable: 260
  },
  'berpikir-kritis-fleksibel': {
    id: 'berpikir-kritis-fleksibel',
    slug: 'berpikir-kritis-fleksibel',
    name: 'Kemampuan Berpikir Kritis Fleksibel',
    shortName: 'Kritis Fleksibel',
    currentScore: 106,
    currentStatus: 'Baik',
    targetScore: 120,
    targetStatus: 'Baik Sekali (120+)',
    format: 'text',
    formatLabel: 'Berbasis Teks (Penalaran Adaptif & Multiperspektif)',
    priority: 'Sedang (Peningkatan)',
    description:
      'Kelenturan kognitif (cognitive flexibility) dalam mengubah sudut pandang ketika fakta atau aturan baru muncul, mengevaluasi argumen kontradiktif, dan mencari jalan keluar alternatif ketika jalur konvensional buntu.',
    psychometricRole:
      'Mengukur kemampuan beradaptasi di lingkungan ambigu, merumuskan hipotesis kedua (Plan B) secara cepat, dan tidak terjebak dalam cognitive fixation atau tunnel vision.',
    testStructure:
      'Berupa studi kasus logika kondisional yang berubah secara dinamis, resolusi paradoks, penyesuaian aturan parsial, dan evaluasi argumen tandingan (counter-arguments).',
    tacticalTips: [
      'Latih penalaran "bagaimana jika": ketika premis awal dibalik atau dibatalkan, langsung evaluasi implikasi barunya.',
      'Kenali pola bias konfirmasi: jangan langsung memilih opsi yang paling nyaman, uji apakah ada opsi alternatif yang lebih kokoh.',
      'Cari sintesis dari dua pandangan yang sekilas bertentangan.'
    ],
    totalQuestionsAvailable: 240
  },
  'verbal': {
    id: 'verbal',
    slug: 'verbal',
    name: 'Kemampuan Verbal',
    shortName: 'Verbal Kognitif',
    currentScore: 116,
    currentStatus: 'Baik',
    targetScore: 125,
    targetStatus: 'Sangat Superior (125+)',
    format: 'text',
    formatLabel: 'Berbasis Teks (Leksikon KBBI & Analogi Kompleks)',
    priority: 'Pertahankan',
    description:
      'Penguasaan kosa kata tingkat tinggi (leksikon akademik/formal), pemahaman hubungan asosiatif dan hierarkis antar kata, analogi ganda, serta penalaran semantik kontekstual.',
    psychometricRole:
      'Cerminan kecerdasan kristalisasi (Crystallized Intelligence - Gc), kapasitas komunikasi presisi, artikulasi pemikiran konseptual, dan kedalaman literasi kognitif.',
    testStructure:
      'Analogi ganda bertingkat (A : B = C : D), padanan sinonim/antonim tingkat tinggi (kata serapan dan istilah formal KBBI), distingsi nuansa makna, dan penalaran semantik.',
    tacticalTips: [
      'Rumuskan kalimat hubungan yang presisi sebelum melihat pilihan jawaban (contoh: "A adalah wadah untuk menyimpan B", bukan sekadar "A berkaitan dengan B").',
      'Perhatikan kelas kata (kata benda : kata kerja tidak sepadan dengan kata sifat : kata benda).',
      'Kuasai kosa kata formal baku (seperti: ambivalen, esoterik, peyoratif, efemeral, anakronistis, heuristik, tautologi).'
    ],
    totalQuestionsAvailable: 275
  },
  'berpikir-kritis': {
    id: 'berpikir-kritis',
    slug: 'berpikir-kritis',
    name: 'Kemampuan Berpikir Kritis',
    shortName: 'Berpikir Kritis',
    currentScore: 99,
    currentStatus: 'Cukup',
    targetScore: 118,
    targetStatus: 'Baik (115 - 120+)',
    format: 'text',
    formatLabel: 'Berbasis Teks (Evaluasi Argumen & Validitas)',
    priority: 'Sedang (Peningkatan)',
    description:
      'Ketajaman menguji validitas premis, mendeteksi cacat logika (logical fallacies), mengungkap asumsi terselubung (implicit assumptions), serta mengevaluasi kekuatan bukti pendukung atau pelemah argumen.',
    psychometricRole:
      'Fondasi pengambilan keputusan rasional, memisahkan fakta obyektif dari klaim emosional, dan mengevaluasi rantai kausalitas secara ketat.',
    testStructure:
      'Paragraf penalaran kritis diikuti pertanyaan penentuan asumsi tersirat, bukti yang paling memperlemah/memperkuat klaim, dan deteksi logical fallacy (ad hominem, post hoc, strawman, false dilemma).',
    tacticalTips: [
      'Untuk soal "Asumsi Implisit": cari jembatan logis yang tidak tertulis yang menghubungkan premis dengan kesimpulan.',
      'Untuk soal "Memperlemah Argumen": cari opsi yang memotong hubungan kausal atau menyajikan variabel pengganggu alternatif.',
      'Bedakan korelasi dari kausalitas murni.'
    ],
    totalQuestionsAvailable: 250
  },
  'numerikal': {
    id: 'numerikal',
    slug: 'numerikal',
    name: 'Kemampuan Numerikal',
    shortName: 'Penalaran Numerikal',
    currentScore: 96,
    currentStatus: 'Cukup',
    targetScore: 118,
    targetStatus: 'Baik (115 - 120+)',
    format: 'numerical',
    formatLabel: 'Berbasis Angka & Teks (Deret Kompleks & Aritmatika)',
    priority: 'Tinggi (Fokus Utama)',
    description:
      'Kecepatan dan ketepatan menganalisis pola bilangan bertingkat, relasi matematis abstrak, aljabar proporsional, serta deduksi logika kuantitatif dalam soal pemecahan masalah.',
    psychometricRole:
      'Komponen penting dalam tes bakat kuantitatif (seperti IST Subtest ZR/RA). Menunjukkan kapasitas kalkulasi mental terstruktur, deteksi pola sekuensial, dan efisiensi algoritma berpikir.',
    testStructure:
      'Deret angka bertingkat 2-3 lapis (beda dari beda), deret berselingan ganda/tiga, deret Fibonacci dan kombinasi faktorial, aritmatika logika cepat, dan soal cerita proporsi kuantitatif.',
    tacticalTips: [
      'Uji selisih pertama, kedua, dan rasio perkalian/pembagian secara sistematis.',
      'Jika pola tampak acak, periksa kemungkinan deret melompat (selang 1 atau 2 angka).',
      'Hafalkan nilai kuadrat (1-25) dan kubik (1-12) untuk mendeteksi pola pangkat secara instan.',
      'Gunakan penyederhanaan aljabar sebelum menghitung angka besar.'
    ],
    totalQuestionsAvailable: 310
  },
  'kreatifitas': {
    id: 'kreatifitas',
    slug: 'kreatifitas',
    name: 'Daya Kreatifitas',
    shortName: 'Kreatifitas & Divergen',
    currentScore: 122,
    currentStatus: 'Baik Sekali',
    targetScore: 128,
    targetStatus: 'Sangat Unggul (128+)',
    format: 'hybrid',
    formatLabel: 'Hibrida Teks & Pola (Berpikir Divergen & Lateral)',
    priority: 'Pertahankan',
    description:
      'Kemampuan menghasilkan koneksi asosiatif tak terduga (Remote Associates), pemikiran divergen non-linear, teka-teki logika lateral, serta sintesis solusi di luar kerangka konvensional.',
    psychometricRole:
      'Tolak ukur inovasi kognitif, kelincahan konseptual, dan kemampuan menghubungkan domain yang berbeda untuk memecahkan teka-teki tak terstruktur.',
    testStructure:
      'Pola asosiasi kata terpencil (RAT), teka-teki logika lateral, kombinatorik kreatif, dan deduksi visual-linguistik.',
    tacticalTips: [
      'Pertahankan intuisi asosiatif yang tajam sembari memvalidasi kesahihannya dengan uji logika terbalik.',
      'Eksplorasi arti ganda, konotasi, atau metafora dari elemen yang disajikan.',
      'Cari titik temu ketiga yang mengikat dua konsep yang tampak bertolak belakang.'
    ],
    totalQuestionsAvailable: 235
  },
  'abstraksi': {
    id: 'abstraksi',
    slug: 'abstraksi',
    name: 'Kemampuan Abstraksi',
    shortName: 'Abstraksi Spasial & Matriks',
    currentScore: 103,
    currentStatus: 'Cukup',
    targetScore: 118,
    targetStatus: 'Baik (115 - 120+)',
    format: 'image',
    formatLabel: 'Berbasis Gambar & Diagram (Matriks Raven & Rotasi 3D)',
    priority: 'Sedang (Peningkatan)',
    description:
      'Kemampuan menalar pola murni tanpa kata atau angka: matriks progresif (Raven Matrices style), rotasi bentuk geometris 2D/3D, lipatan jaring-jaring kubus, serta operasi transformasi bentuk simetri/XOR.',
    psychometricRole:
      'Indikator inti kecerdasan cair (Fluid Intelligence - Gf), bebas dari pengaruh bahasa atau latar belakang pendidikan (Culture-Fair Intelligence Test - CFIT).',
    testStructure:
      'Matriks 3x3 progresif SVG, aturan pergeseran elemen (rotasi jam/lawan jam), penambahan/pengurangan garis (operasi Boolean visual), lipatan pola kubus, dan analogi figur visual.',
    tacticalTips: [
      'Analisis baris demi baris, kemudian konfirmasi dengan kolom demi kolom (aturan matriks biasanya konsisten di kedua arah).',
      'Periksa satu atribut dalam satu waktu: jumlah elemen, orientasi arah, warna/arsir, dan posisi relatif.',
      'Untuk jaring-jaring kubus: tandai sisi-sisi yang berseberangan karena sisi yang berseberangan tidak akan pernah bersentuhan di kubus padat.',
      'Perhatikan operasi XOR visual: elemen yang sama saling meniadakan, elemen yang berbeda digabungkan.'
    ],
    totalQuestionsAvailable: 250
  },
  'memori': {
    id: 'memori',
    slug: 'memori',
    name: 'Kemampuan Memori',
    shortName: 'Memori Kerja & Retensi',
    currentScore: 114,
    currentStatus: 'Baik',
    targetScore: 122,
    targetStatus: 'Baik Sekali (120+)',
    format: 'memory',
    formatLabel: 'Latihan Memori Kerja (Working Memory & Asosiasi)',
    priority: 'Pertahankan',
    description:
      'Kapasitas memori kerja (working memory span) dan retensi jangka pendek, kemampuan menyimpan kumpulan informasi asosiatif (kata-kategori atau digit) lalu merecallnya secara akurat di bawah tekanan waktu.',
    psychometricRole:
      'Diterapkan dalam subtes memori IST (Merkaufgaben) atau tes memori asosiasi Pauli/Kraepelin. Menguji kapasitas buffer mental untuk menampung data aktif saat melakukan komputasi mental.',
    testStructure:
      'Fase Menghafal (tampilan 20 kata dalam 5 kategori atau urutan digit) disusul fase distraksi dan kuis recall terarah dengan variasi huruf awal atau asosiasi fungsional.',
    tacticalTips: [
      'Gunakan teknik chunking (mengelompokkan informasi ke dalam unit-unit bermakna).',
      'Metode Loci (Istana Memori): letakkan kata-kata yang dihafalkan pada sudut-sudut ruangan imajiner Anda.',
      'Gunakan pengelompokan huruf vokal/konsonan atau buat narasi cerita mini yang menghubungkan kata-kata tersebut.'
    ],
    totalQuestionsAvailable: 230
  }
}

export const EXTERNAL_PSYCHOMETRIC_RESOURCES: ExternalPsychometricResource[] = [
  {
    id: 'openpsychometrics-cfit',
    title: 'OpenPsychometrics Culture Fair Intelligence Test',
    provider: 'OpenPsychometrics Project',
    type: 'web-practice',
    url: 'https://openpsychometrics.org/tests/FSIQ/',
    description:
      'Uji coba instrumen psikometri baku berbasis visual spasial dan penalaran abstrak tanpa bias budaya (Fluid Intelligence benchmark).',
    freeAccess: true
  },
  {
    id: 'mensa-workout',
    title: 'Mensa International IQ Workout',
    provider: 'Mensa International',
    type: 'web-practice',
    url: 'https://www.mensa.org/workout',
    description:
      'Latihan 30 pertanyaan logika, verbal, numerik, dan spasial tingkat tinggi kurasi resmi Mensa untuk menguji kesiapan tes masuk.',
    freeAccess: true
  },
  {
    id: 'wiki-psychometrics-matrices',
    title: 'Wikimedia Commons Progressive Matrices Dataset',
    provider: 'Wikimedia Educational Archives',
    type: 'dataset',
    url: 'https://commons.wikimedia.org/wiki/Category:Raven%27s_Progressive_Matrices',
    description:
      'Repositori diagram matriks progresif domain publik dan materi studi pola transformasi geometris abstrak standar psikometri.',
    freeAccess: true
  },
  {
    id: 'spatial-reasoning-bank',
    title: 'AssessmentDay Spatial & Diagrammatic Test Bank',
    provider: 'AssessmentDay UK',
    type: 'web-practice',
    url: 'https://www.assessmentday.co.uk/diagrammatic-reasoning-free-practice-test.html',
    description:
      'Kumpulan soal diagramatik, flowcharts logic, dan operator shapes transformation untuk mengasah kemampuan abstraksi gambar.',
    freeAccess: true
  },
  {
    id: 'human-benchmark-memory',
    title: 'Human Benchmark Working Memory & Chimp Test',
    provider: 'HumanBenchmark',
    type: 'web-practice',
    url: 'https://humanbenchmark.com/tests/sequence',
    description:
      'Latihan working memory digit span dan visual spatial recall terstandarisasi dengan perbandingan persentil global.',
    freeAccess: true
  }
]

