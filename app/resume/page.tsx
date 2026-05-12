import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function ResumePage() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data } = await supabase
    .storage
    .from('resume')
    .getPublicUrl('resume.pdf')

  if (data?.publicUrl) {
    redirect(data.publicUrl)
  }

  return (
    <div className="min-h-screen flex items-center justify-center font-mono uppercase text-sm">
      Resume_Not_Found
    </div>
  )
}
