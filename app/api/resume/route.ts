import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { isAuthenticated } from '@/utils/auth'

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.from('settings').select('value').eq('key', 'resume_latex').single()

  if (error) {
    const defaultLatex = `\\documentclass[9pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=0.4in]{geometry}
\\usepackage{hyperref}
\\usepackage{xcolor}
\\usepackage{enumitem}
\\usepackage{titlesec}

\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    filecolor=magenta,
    urlcolor=blue,
    pdftitle={Marcello Lienarta - Resume},
}

\\pagestyle{empty}
\\setlist[itemize]{noitemsep, topsep=0pt, leftmargin=1.2em, partopsep=0pt, parsep=0pt}
\\titlespacing*{\\section}{0pt}{5pt}{3pt}

\\begin{document}

\\begin{center}
    {\\huge \\textbf{Marcello Lienarta}} \\\\
    \\vspace{1pt}
    {Multipurpose developer with +- 5 years of experience with web dev, ai, automation etc.} \\\\
    \\vspace{2pt}
    \\small \\href{mailto:marcellolienarta663@gmail.com}{marcellolienarta663@gmail.com} $|$ \\href{https://linkedin.com/in/marcellolienarta}{linkedin.com/in/marcellolienarta} $|$ \\href{https://celloportfolio.vercel.app}{celloportfolio.vercel.app} $|$ Jakarta, Indonesia
\\end{center}

\\section*{Experience}
\\hrule
\\vspace{2pt}
% Data will be injected or edited here
\\end{document}`
    return NextResponse.json({ content: defaultLatex })
  }

  return NextResponse.json({ content: data.value })
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { content, pdfBase64, compile } = await request.json()
  const supabase = createAdminClient()

  // 1. Save LaTeX to Database
  const { error: dbError } = await supabase.from('settings').upsert({ key: 'resume_latex', value: content })
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 400 })

  // 2. If compile is requested, run server-side LaTeX compilation
  if (compile) {
    try {
      const formData = new FormData()
      formData.append('filename[]', 'document.tex')
      formData.append('filecontents[]', content)
      formData.append('engine', 'pdflatex')
      formData.append('return', 'pdf')

      const compileRes = await fetch('https://texlive.net/cgi-bin/latexcgi', {
        method: 'POST',
        body: formData
      })

      if (!compileRes.ok) {
        const errorText = await compileRes.text()
        return NextResponse.json({ error: 'LaTeX compilation service error', log: errorText }, { status: 500 })
      }

      const contentType = compileRes.headers.get('content-type') || ''
      if (!contentType.includes('application/pdf')) {
        const errorLog = await compileRes.text()
        return NextResponse.json({ error: 'LaTeX Compilation Failed', log: errorLog }, { status: 422 })
      }

      const arrayBuffer = await compileRes.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const { error: uploadError } = await supabase.storage
        .from('resume')
        .upload('resume.pdf', buffer, {
          contentType: 'application/pdf',
          upsert: true
        })

      if (uploadError) {
        return NextResponse.json({ error: 'Storage upload failed: ' + uploadError.message }, { status: 500 })
      }
    } catch (err: any) {
      return NextResponse.json({ error: 'LaTeX compilation execution error: ' + err.message }, { status: 500 })
    }
  } else if (pdfBase64) {
    // 3. Fallback: If PDF data is provided via base64, upload to Supabase Storage directly
    try {
      const buffer = Buffer.from(pdfBase64.split(',')[1], 'base64')
      const { error: uploadError } = await supabase.storage
        .from('resume')
        .upload('resume.pdf', buffer, {
          contentType: 'application/pdf',
          upsert: true
        })

      if (uploadError) {
        return NextResponse.json({ error: 'Storage upload failed: ' + uploadError.message }, { status: 500 })
      }
    } catch (err: any) {
      return NextResponse.json({ error: 'PDF processing error: ' + err.message }, { status: 500 })
    }
  }

  return NextResponse.json({ success: true })
}

