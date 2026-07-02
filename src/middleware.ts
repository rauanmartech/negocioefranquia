import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, supabaseResponse } = createClient(request)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  // Se houver erro de validação do JWT (ex: expirado ou malformado), prossegue silenciosamente
  if (error) {
    // Apenas limpa a sessão para não causar loop
  }

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
  ],
}
