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
import { Metrics } from '@/components/metrics'

import { getCurrentUser } from '@/lib/session'

export default async function RootPage() {
  const user = await getCurrentUser()
  return (
    <>
      <Navbar />
      <section className='container flex min-h-screen flex-col items-center justify-center gap-24 py-24'>
        <div className='flex flex-col items-center gap-4'>
          <Badge
            variant='secondary'
            className='flex items-center justify-center'
          >
            <Link
              href='https://github.com/Caixetadev/cutez'
              target='_blank'
              rel='noopener noreferrer'
            >
              Find the project on Github
            </Link>
            <ChevronRight className='h-4 w-4' />
          </Badge>
          <h1 className='text-balance text-center text-5xl font-bold text-gray-900'>
            Create Links Simply, All in One Place
          </h1>
          <p className='text-balance max-w-[42rem] text-center text-xl text-muted-foreground'>
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
                href='https://github.com/Caixetadev/cutez'
                target='_blank'
                rel='noopener noreferrer'
              >
                Github
              </Link>
            </Button>
          </div>
        </div>
        <div className='relative flex w-full max-w-full justify-center'>
          <Image priority width={1000} height={600} src='/mockup.jpg' alt='' />
        </div>
      </section>

      <Metrics />

      <section className='container py-24'>
        <div className='flex flex-col items-center gap-4 py-16'>
          <Badge variant='secondary'>Features</Badge>
          <h2 className='text-balance py-2 text-center text-4xl font-bold tracking-tight text-gray-900'>
            Powerful Features for Streamlined Link Management
          </h2>
          <p className='text-balance mb-6 max-w-[800px] text-center text-xl text-muted-foreground'>
            This app presents a variety of features tailored to simplify and
            enhance your link management experience. From customizable short
            URLs to detailed analytics and link history.
          </p>
          <Image src={'/mockup2.png'} width={1100} height={800} alt='' />
          <div className='mx-auto grid w-full max-w-5xl grid-cols-1 place-items-center gap-8 sm:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded bg-primary'>
                <LinkIcon className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Easily create links</h3>
              <p className='text-muted-foreground'>
                easily create short links and share QR code to anyone
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded bg-primary'>
                <Paintbrush2 className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Dashboard</h3>
              <p className='text-muted-foreground'>
                The essential information you need, presented simply and
                clearly.
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded bg-primary'>
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
