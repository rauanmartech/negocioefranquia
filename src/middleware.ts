import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Refresh Supabase session on every request (required by @supabase/ssr)
  const { supabase, supabaseResponse } = createClient(request)

  // IMPORTANT: Do not add logic between createClient and supabase.auth.getUser()
  // A simple mistake could cause random session expiry for users.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect the /nef-admin routes
  if (request.nextUrl.pathname.startsWith('/nef-admin')) {
    if (!user) {
      const loginUrl = new URL('/nef-login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Redirect logged-in users away from the login page
  if (request.nextUrl.pathname.startsWith('/nef-login') && user) {
    const adminUrl = new URL('/nef-admin', request.url)
    return NextResponse.redirect(adminUrl)
  }

  return supabaseResponse
}

// Config to specify which paths this middleware runs on
export const config = {
  matcher: [
    '/nef-admin/:path*',
    '/nef-login',
    /*
     * Match all request paths except static files and images,
     * so Supabase session is refreshed on every navigation.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
