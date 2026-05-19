import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { isAuthenticated } from '@/utils/auth'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  if (id) {
    const { data, error } = await supabase.from('public_projects').select('*').eq('id', id).single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json(data)
  }

  const { data, error } = await supabase.from('public_projects').select('*').order('order_index', { ascending: true })
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createAdminClient()
  const body = await request.json()

  // Ensure images is an array to avoid malformed array literal error
  if (!body.images || (Array.isArray(body.images) && body.images.length === 0)) {
    body.images = []
  }

  const { data, error } = await supabase.from('public_projects').insert([body]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createAdminClient()
  const body = await request.json()
  const { id, ...updateData } = body

  // Ensure images is an array to avoid malformed array literal error
  if (!updateData.images || (Array.isArray(updateData.images) && updateData.images.length === 0)) {
    updateData.images = []
  }

  const { data, error } = await supabase.from('public_projects').update(updateData).eq('id', id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json(data)
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const supabase = createAdminClient()
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
  const { error } = await supabase.from('public_projects').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ success: true })
}
