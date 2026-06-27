import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if we are trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/nef-admin')) {
    const isAuth = request.cookies.has('nef_auth')

    // If not authenticated, redirect to login
    if (!isAuth) {
      const loginUrl = new URL('/nef-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

// Config to specify which paths this middleware runs on
export const config = {
  matcher: '/nef-admin/:path*',
}
