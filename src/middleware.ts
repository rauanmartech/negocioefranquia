import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient as createSupabaseMiddlewareClient } from '@/utils/supabase/middleware'

export function middleware(request: NextRequest) {
  // Refresh Supabase session on every request (required by @supabase/ssr)
  const supabaseResponse = createSupabaseMiddlewareClient(request)

  // Check if we are trying to access the admin area
  if (request.nextUrl.pathname.startsWith('/nef-admin')) {
    const isAuth = request.cookies.has('nef_auth')

    // If not authenticated, redirect to login
    if (!isAuth) {
      const loginUrl = new URL('/nef-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return supabaseResponse
}

// Config to specify which paths this middleware runs on
export const config = {
  matcher: [
    '/nef-admin/:path*',
    /*
     * Match all request paths except static files and images,
     * so Supabase session is refreshed on every navigation.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

