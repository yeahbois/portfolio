import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  try {
    const { slug, long_url, passcode } = await request.json()

    if (passcode !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid passcode' }, { status: 401 })
    }

    if (!long_url) {
      return NextResponse.json({ error: 'Missing URL' }, { status: 400 })
    }

    // Generate random slug if not provided
    const finalSlug = slug || Math.random().toString(36).substring(2, 8)

    // Validate and clean slug
    const cleanSlug = finalSlug
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-_\.]/g, '')

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('shortener')
      .insert([{ slug: cleanSlug, long_url }])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
