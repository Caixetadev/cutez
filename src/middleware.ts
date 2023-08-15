import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = await getToken({ req })
    const isAuth = !!token

    if (req.nextUrl.pathname.startsWith('/dashboard') && !isAuth) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (req.nextUrl.pathname.startsWith('/login') && isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    const pages = ['/login', '/dashboard', '/']

    if (
      !pages.includes(req.nextUrl.pathname) &&
      !req.nextUrl.pathname.startsWith('/api')
    ) {
      try {
        const response = await fetch(
          `${req.nextUrl.origin}/api/link/${req.nextUrl.pathname.replace(
            '/',
            ''
          )}`
        )
        const data = await response.json()

        if (!response.ok || data.status === 404 || !data?.url) {
          return NextResponse.redirect(req.nextUrl.origin)
        }

        return NextResponse.redirect(new URL(data.url))
      } catch (error) {
        return new NextResponse('Rate limit')
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/dashboard', '/login', '/:slug*'],
}
