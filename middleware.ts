import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If there's no session and the user is trying to access the dashboard
  if (!session && req.nextUrl.pathname.startsWith('/admin/dashboard')) {
    const redirectUrl = new URL('/admin/login', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // If there's a session and the user is trying to access login
  if (session && req.nextUrl.pathname.startsWith('/admin/login')) {
    const redirectUrl = new URL('/admin/dashboard', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/admin/login', '/admin/dashboard'],
} 