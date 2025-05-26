import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  if (
    (pathname.startsWith('/mode') || pathname.startsWith('/profile') || pathname.startsWith('/quiz')
    || pathname.startsWith('/ranking') || pathname === '/') && !token
  ) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/signIn'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/mode/:path*', '/profile/:path*', '/quiz/:path*', '/ranking/:path*', '/']
}
