import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req })
    const isAuth = !!token

    if (req.nextUrl.pathname.startsWith('/dashboard') && !isAuth) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (req.nextUrl.pathname.startsWith('/login') && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    if (req.nextUrl.pathname.startsWith('/register') && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    const pages = [
      '/login',
      '/register',
      '/dashboard',
      '/',
      '/mockup.jpg',
      '/mockup2.png',
      '/og.png',
      '/favicon-16x16.png',
      '/favicon.ico',
      '/apple-touch-icon.png',
    ]

    if (
      !pages.includes(req.nextUrl.pathname) &&
      !req.nextUrl.pathname.startsWith('/api') &&
      !req.nextUrl.pathname.startsWith('/_next') &&
      !req.nextUrl.pathname.startsWith('/public')
    ) {
      try {
        const response = await fetch(
          `${req.nextUrl.origin}/api/link/${req.nextUrl.pathname.replace(
            '/',
            ''
          )}`
        )

        if (response.status === 404) {
          return NextResponse.redirect(req.nextUrl.origin)
        }

        const data = await response.json()

        return NextResponse.redirect(new URL(data.url))
      } catch (error) {
        return new NextResponse('Rate limit')
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard', '/login', '/register' ,'/:slug*'],
}
