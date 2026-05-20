import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function ShortenerRedirect({ params }: Props) {
  const { slug } = await params
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase
    .from('shortener')
    .select('long_url')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    redirect('/')
  }

  redirect(data.long_url)
}
