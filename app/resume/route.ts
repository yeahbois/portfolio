import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  const texPath = path.join(process.cwd(), 'public', 'resume.tex')
  const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf')

  // If LaTeX is being used, we should ideally compile it.
  // Since pdflatex is not available in the environment, we serve the .tex file
  // or a pre-existing PDF.

  if (fs.existsSync(pdfPath)) {
    const fileBuffer = fs.readFileSync(pdfPath)
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
      },
    })
  }

  if (fs.existsSync(texPath)) {
    const fileBuffer = fs.readFileSync(texPath)
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/x-tex',
        'Content-Disposition': 'inline; filename="resume.tex"',
      },
    })
  }

  return new NextResponse('Resume not found', { status: 404 })
}

export async function POST(request: Request) {
  // Check for admin session here too for security
  const { content } = await request.json()
  const texPath = path.join(process.cwd(), 'public', 'resume.tex')
  fs.writeFileSync(texPath, content)
  return NextResponse.json({ success: true })
}
