import { Question } from '../types'

export const curatedAbstraksi: Question[] = [
  {
    id: 'abs-001',
    subtestId: 'abstraksi',
    title: 'Matriks Progresif 3x3: Operasi XOR Garis Geometris',
    prompt: `Perhatikan matriks 3x3 berikut. Pada setiap baris, terdapat aturan transformasi visual yang konsisten:
- Baris 1: Kotak kiri memiliki garis vertikal tengah. Kotak tengah memiliki garis horizontal tengah. Kotak kanan memiliki bentuk tanda silang (+).
- Baris 2: Kotak kiri memiliki garis diagonal kiri ke kanan (\\). Kotak tengah memiliki garis diagonal kanan ke kiri (/). Kotak kanan memiliki bentuk tanda silang miring (X).
- Baris 3: Kotak kiri memiliki bentuk tanda silang (+) dan sebuah lingkaran luar. Kotak tengah memiliki tanda silang miring (X) dan sebuah lingkaran luar.

Berdasarkan aturan operasi visual baris 1 dan baris 2 (penggabungan garis atau Boolean OR/XOR), bentuk apakah yang seharusnya berada di kotak tanda tanya (?) pada baris 3?`,
    stimulus: {
      type: 'svg-matrix',
      data: {
        pattern: 'xor-lines',
        gridSize: 3,
        description: 'Matriks penggabungan bentuk geometris dan garis simetri'
      }
    },
    options: [
      { key: 'A', text: 'Bintang bersudut 8 (*), tanpa lingkaran luar' },
      { key: 'B', text: 'Bintang bersudut 8 (*) yang dikelilingi oleh sebuah lingkaran luar' },
      { key: 'C', text: 'Tanda silang (+) saja tanpa lingkaran luar' },
      { key: 'D', text: 'Lingkaran luar kosong tanpa garis di dalamnya' },
      { key: 'E', text: 'Tanda silang miring (X) saja dengan lingkaran ganda' }
    ],
    correctAnswer: 'B',
    explanation:
      'Analisis aturan baris matriks Raven:\n1. Baris 1: Garis vertikal (|) digabungkan dengan garis horizontal (-) menghasilkan tanda silang (+).\n2. Baris 2: Garis diagonal (\\) digabungkan dengan (/) menghasilkan silang miring (X).\n3. Baris 3: Kotak kiri (+) digabung dengan kotak tengah (X) menghasilkan bintang 8 arah (*). Lingkaran luar yang ada pada kedua kotak tetap dipertahankan sebagai bingkai pembungkus.\nMaka kotak tanda tanya (?) harus memuat: Bintang bersudut 8 (*) di dalam lingkaran luar (Opsi B).',
    difficulty: '111-115',
    estimatedIqRange: '112-118',
    tags: ['matriks-raven', 'operasi-xor-visual', 'penalaran-spasial']
  },
  {
    id: 'abs-002',
    subtestId: 'abstraksi',
    title: 'Rotasi Spasial 3D: Lipatan Jaring-Jaring Kubus',
    prompt: `Sebuah jaring-jaring kubus memiliki 6 sisi dengan simbol berbeda:
- Sisi Atas: Lingkaran Hitam (●)
- Sisi Tengah: Tanda Panah Ke Atas (↑)
- Sisi Bawah: Tanda Bintang (★)
- Sisi Kiri: Garis Kotak Persegi (□)
- Sisi Kanan: Tanda Segitiga (▲)
- Sisi Ujung Paling Bawah: Tanda Silang (✕)

Jika jaring-jaring tersebut dilipat menjadi sebuah kubus padat 3 dimensi, pasangan simbol manakah yang PASTI BERSEBERANGAN (saling berhadapan dan tidak akan pernah bersentuhan di satu rusuk)?`,
    stimulus: {
      type: 'svg-shape',
      data: {
        pattern: 'cube-net',
        faces: ['●', '↑', '★', '□', '▲', '✕']
      }
    },
    options: [
      { key: 'A', text: 'Sisi Lingkaran Hitam (●) berhadapan dengan Tanda Bintang (★)' },
      { key: 'B', text: 'Sisi Persegi (□) berhadapan dengan Tanda Segitiga (▲)' },
      { key: 'C', text: 'Sisi Panah Ke Atas (↑) berhadapan dengan Tanda Segitiga (▲)' },
      { key: 'D', text: 'Sisi Bintang (★) berhadapan dengan Tanda Silang (✕)' },
      { key: 'E', text: 'Sisi Lingkaran Hitam (●) berhadapan dengan Persegi (□)' }
    ],
    correctAnswer: 'B',
    explanation:
      'Hukum jaring-jaring kubus dasar: Dalam bentangan salib kubus standar, sisi sayap kiri dan sayap kanan (yang menempel pada sisi kolom utama yang sama) ketika dilipat akan berdiri tegak berhadapan secara paralel. Sisi Kiri (□) dan Sisi Kanan (▲) adalah sayap lateral yang saling berseberangan. Sedangkan pada kolom vertikal, sisi yang berhadapan berjarak selang satu kotak: Sisi Atas (●) berhadapan dengan Sisi Bawah (★), dan Sisi Tengah (↑) berhadapan dengan Sisi Ujung (✕). Opsi B adalah pasangan berhadapan yang valid.',
    difficulty: '116-120',
    estimatedIqRange: '117-123',
    tags: ['jaring-kubus', 'rotasi-3d', 'spasial-mental']
  },
  {
    id: 'abs-003',
    subtestId: 'abstraksi',
    title: 'Transformasi Matriks Pola Progresif Rotasi Jam 45°',
    prompt: `Perhatikan deret gambar pola geometris berikut:
- Gambar 1: Sebuah segitiga menunjuk ke arah Jam 12 dengan titik hitam di sudut puncaknya.
- Gambar 2: Segitiga berputar searah jarum jam sebesar 45° (menunjuk Jam 1.30), dan titik hitam berpindah ke sudut kanan bawah.
- Gambar 3: Segitiga berputar searah jarum jam sebesar 90° (menunjuk Jam 4.30), dan titik hitam berpindah ke sudut kiri bawah.
- Gambar 4: Segitiga berputar searah jarum jam sebesar 135° (menunjuk Jam 9.00), dan titik hitam kembali ke sudut puncak.

Berdasarkan ritme rotasi segitiga (+45°, +90°, +135°, +180°) dan siklus titik hitam, kemanakah segitiga menunjuk dan di mana posisi titik hitam pada Gambar 5?`,
    options: [
      { key: 'A', text: 'Menunjuk ke arah Jam 3.00, dengan titik hitam di sudut kanan bawah' },
      { key: 'B', text: 'Menunjuk ke arah Jam 12.00, dengan titik hitam di sudut puncak' },
      { key: 'C', text: 'Menunjuk ke arah Jam 6.00, dengan titik hitam di sudut kiri bawah' },
      { key: 'D', text: 'Menunjuk ke arah Jam 9.00, dengan titik hitam di sudut puncak' },
      { key: 'E', text: 'Menunjuk ke arah Jam 1.30, dengan titik hitam di sudut kanan bawah' }
    ],
    correctAnswer: 'A',
    explanation:
      'Analisis dua variabel terpisah:\n1. Variabel Rotasi Segitiga: Sudut rotasi bertambah secara aritmatika (+45° -> +90° -> +135° -> +180°). Dari Gambar 4 (Jam 9.00 atau 270°), penambahan 180° menghasilkan 270° + 180° = 450° = 90° (arah Jam 3.00).\n2. Variabel Titik Hitam: Titik hitam berpindah sudut searah jarum jam secara periodik (Puncak -> Sudut Kanan -> Sudut Kiri -> Puncak -> Sudut Kanan).\nKombinasi Gambar 5: Segitiga menunjuk Jam 3.00, titik hitam di sudut kanan bawah (Opsi A).',
    difficulty: '116-120',
    estimatedIqRange: '119-125',
    tags: ['rotasi-sudut', 'matriks-progresif', 'abstraksi-visual']
  }
]

export function generateAbstraksiQuestions(count: number = 250): Question[] {
  const result: Question[] = [...curatedAbstraksi]

  const shapes = ['Lingkaran', 'Persegi', 'Segitiga', 'Belah Ketupat', 'Segienam']
  const fillTypes = ['Polos Putih', 'Arsir Diagonal', 'Hitam Pekat', 'Titik-Titik Polka']
  const rotations = ['45° searah jam', '90° searah jam', '180° simetri cermin', '90° berlawanan arah jam']

  let idCounter = 4
  while (result.length < count) {
    const s1 = shapes[idCounter % shapes.length]
    const s2 = shapes[(idCounter + 2) % shapes.length]
    const fill = fillTypes[idCounter % fillTypes.length]
    const rot = rotations[idCounter % rotations.length]
    const difficultyChoice: Question['difficulty'] =
      idCounter % 3 === 0 ? '120+' : idCounter % 2 === 0 ? '116-120' : '111-115'

    const question: Question = {
      id: `abs-${String(idCounter).padStart(3, '0')}`,
      subtestId: 'abstraksi',
      title: `Penalaran Abstraksi Spasial #${idCounter}: Transformasi ${s1}`,
      prompt: `Dalam matriks penalaran abstrak Raven #${idCounter}:
Setiap baris mengalami transformasi bentuk ganda:
1. Bentuk luar "${s1}" mengalami rotasi ${rot} secara bertahap pada setiap kolom.
2. Elemen dalam "${s2}" bertransisi pola arsiran: [Polos Putih] -> [Arsir Diagonal] -> [${fill}].
3. Jumlah titik orbit di sekeliling bentuk bertambah: 1 titik -> 2 titik -> 3 titik.

Jika kotak terakhir pada baris ketiga harus melengkapi pola tersebut secara konsisten, karakteristik visual manakah yang HARUS dimiliki oleh bentuk pengganti tanda tanya (?)?`,
      stimulus: {
        type: 'svg-matrix',
        data: {
          shapeOuter: s1,
          shapeInner: s2,
          rotation: rot,
          fillPattern: fill,
          dotCount: 3
        }
      },
      options: [
        {
          key: 'A',
          text: `Bentuk luar ${s1} terotasi ${rot}, bentuk dalam ${s2} dengan pola ${fill}, dan dikelilingi tepat 3 titik orbit.`
        },
        {
          key: 'B',
          text: `Bentuk luar ${s2} terotasi berlawanan arah, bentuk dalam polos, dan tanpa titik orbit.`
        },
        {
          key: 'C',
          text: `Bentuk luar ${s1} statis tanpa rotasi dengan 4 titik orbit.`
        },
        {
          key: 'D',
          text: `Hanya memuat bentuk dalam ${s2} tanpa bingkai luar.`
        },
        {
          key: 'E',
          text: `Bentuk luar ${s1} dengan arsiran terbalik dan 1 titik orbit.`
        }
      ],
      correctAnswer: 'A',
      explanation: `Deduksi matriks abstrak:
Aturan matriks konsisten di semua kolom:
- Bentuk luar ${s1} harus menuntaskan rotasi ${rot}.
- Elemen dalam ${s2} harus berada pada tahap arsiran ketiga yaitu [${fill}].
- Jumlah titik orbit harus berjumlah tepat 3 titik (deret aritmatika 1, 2, 3).
Opsi A adalah konfigurasi yang tepat dan memenuhi semua hukum transformasi geometris.`,
      difficulty: difficultyChoice,
      estimatedIqRange: difficultyChoice === '120+' ? '121-127' : '113-119',
      tags: ['matriks-progresif', 'rotasi-geometris', 'abstraksi-visual', 'cfit-standard']
    }

    result.push(question)
    idCounter++
  }

  return result
}

