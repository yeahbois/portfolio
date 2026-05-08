import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { isAuthenticated } from '@/utils/auth'

export async function GET() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data, error } = await supabase.from('settings').select('value').eq('key', 'resume_latex').single()

  if (error) {
    // Fallback to default if not in DB
    const defaultLatex = `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[margin=1in]{geometry}
\\usepackage{hyperref}
\\title{Resume}
\\begin{document}
\\maketitle
\\end{document}`
    return NextResponse.json({ content: defaultLatex })
  }

  return NextResponse.json({ content: data.value })
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { content } = await request.json()
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { error } = await supabase.from('settings').upsert({ key: 'resume_latex', value: content })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  return NextResponse.json({ success: true })
}
