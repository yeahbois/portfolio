import { cookies } from 'next/headers'

export async function isAuthenticated() {
  const cookieStore = await cookies()
  const adminSession = cookieStore.get('admin_session')
  return adminSession?.value === 'true'
}
