import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const adminSession = request.cookies.get('admin_session')
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard')
  const isLoginPage = request.nextUrl.pathname === '/dashboard/login'

  if (isDashboardPage && !isLoginPage) {
    if (!adminSession || adminSession.value !== 'true') {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
