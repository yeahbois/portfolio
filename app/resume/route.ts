import { NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

export async function GET() {
  const pdfPath = path.join(process.cwd(), 'public', 'resume.pdf')

  if (fs.existsSync(pdfPath)) {
    const fileBuffer = fs.readFileSync(pdfPath)
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="resume.pdf"',
        'Cache-Control': 'no-store, max-age=0',
      },
    })
  }

  return new NextResponse('Resume PDF not found. Please deploy it from the dashboard.', { status: 404 })
}
