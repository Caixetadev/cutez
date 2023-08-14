import { getToken } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequest, ev: NextFetchEvent) {
    const token = await getToken({ req })
    const isAuth = !!token
    const isAuthPage = req.nextUrl.pathname.startsWith('/login')
    // req.nextUrl.pathname.startsWith('/register')
    const slug = req.nextUrl.pathname.split('/')

    if (slug[1] === 'go') {
      try {
        const response = await fetch(
          `${req.nextUrl.origin}/api/link/${slug[slug.length - 1]}`
        )
        const data = await response.json()

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        if (data.status === 404) {
          return NextResponse.redirect(req.nextUrl.origin)
        }

        if (data?.url) {
          return NextResponse.redirect(new URL(data?.url))
        }
      } catch (error: any) {
        return new Response(error.message, { status: 429 })
      }
    }

    if (isAuthPage) {
      if (isAuth) {
        return NextResponse.redirect(new URL('/dashboard', req.url))
      }

      return null
    }

    if (!isAuth) {
      return NextResponse.redirect(new URL(`/login`, req.url))
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
  matcher: ['/dashboard/:path*', '/login', '/go/:slug*'],
}
