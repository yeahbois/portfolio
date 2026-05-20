import { NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/server'
import { isAuthenticated } from '@/utils/auth'

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, slug, long_url } = await request.json()

    if (!id || !slug || !long_url) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Validate and clean slug
    const cleanSlug = slug
      .replace(/\s+/g, '-')
      .replace(/[^a-zA-Z0-9\-_\.]/g, '')

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('shortener')
      .update({ slug: cleanSlug, long_url })
      .eq('id', id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data[0])
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
