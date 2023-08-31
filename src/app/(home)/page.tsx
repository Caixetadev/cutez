import Link from 'next/link'
import Image from 'next/image'

import {
  BarChart3,
  ChevronRight,
  Link as LinkIcon,
  Paintbrush2,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getCurrentUser } from '@/lib/session'
import { Metrics } from '@/components/metrics'

export const dynamic = 'force-dynamic'

export default async function RootPage() {
  const user = await getCurrentUser()
  return (
    <>
      <Navbar />
      <section className='container flex flex-col items-center justify-center min-h-screen gap-24 py-24'>
        <div className='flex flex-col items-center gap-4'>
          <Badge
            variant='secondary'
            className='flex items-center justify-center '
          >
            <Link
              href='http://github.com/caixetadev'
              target='_blank'
              rel='noopener noreferrer'
            >
              Find the project on Github
            </Link>
            <ChevronRight className='w-4 h-4' />
          </Badge>
          <h1 className='text-5xl font-bold text-center text-gray-900 text-balance'>
            Create Links Simply, All in One Place
          </h1>
          <p className='max-w-[42rem] text-balance text-center text-xl text-muted-foreground'>
            Effortlessly generate shortened links and efficiently manage them
            all in one centralized dashboard.
          </p>
          <div className='flex gap-4'>
            {user ? (
              <Button asChild>
                <Link href='/dashboard'>Dashboard</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href='/login'>Get Started</Link>
              </Button>
            )}

            <Button variant='outline'>
              <Link
                href='https://github.com/caixetadev'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </Link>
            </Button>
          </div>
        </div>
        <div className='relative flex justify-center w-full max-w-full'>
          <Image priority width={1000} height={600} src='/mockup.jpg' alt='' />
        </div>
      </section>

      <Metrics />

      <section className='container py-24'>
        <div className='flex flex-col items-center gap-4 py-16'>
          <Badge variant='secondary'>Features</Badge>
          <h2 className='py-2 text-4xl font-bold tracking-tight text-center text-gray-900 text-balance'>
            Powerful Features for Streamlined Link Management
          </h2>
          <p className='mb-6 max-w-[800px] text-balance text-center text-xl text-muted-foreground'>
            This app presents a variety of features tailored to simplify and
            enhance your link management experience. From customizable short
            URLs to detailed analytics and link history.
          </p>
          <Image src={'/mockup2.png'} width={1100} height={800} alt='' />
          <div className='grid w-full max-w-5xl grid-cols-1 gap-8 mx-auto place-items-center sm:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <div className='flex items-center justify-center w-8 h-8 mb-4 rounded bg-primary'>
                <LinkIcon className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Easily create links</h3>
              <p className='text-muted-foreground'>
                easily create short links and share QR code to anyone
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='flex items-center justify-center w-8 h-8 mb-4 rounded bg-primary'>
                <Paintbrush2 className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Dashboard</h3>
              <p className='text-muted-foreground'>
                The essential information you need, presented simply and
                clearly.
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='flex items-center justify-center w-8 h-8 mb-4 rounded bg-primary'>
                <BarChart3 className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Statistics</h3>
              <p className='max-w-xs text-muted-foreground'>
                Intuitively visualize how many people clicked on your link
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
