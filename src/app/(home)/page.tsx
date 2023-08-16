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

export default function RootPage() {
  return (
    <>
      <Navbar />
      <section className='container flex min-h-screen flex-col items-center justify-center gap-24 py-24'>
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
            <ChevronRight className='h-4 w-4' />
          </Badge>
          <h1 className='text-balance text-center text-5xl font-bold text-gray-900'>
            Create Links Simply, All in One Place
          </h1>
          <p className='max-w-[42rem] text-balance text-center text-xl text-muted-foreground'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui eum
            minus ea recusandae nihil sequi, quae magnam aut possimus repellat.
          </p>
          <div className='flex gap-4'>
            <Button>Get Started</Button>
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
        <div className='relative h-[616px] w-[1000px]'>
          <Image priority sizes='100vw' src={'/mockup.jpg'} fill alt='' />
        </div>
      </section>

      <section className='container py-8 sm:py-24'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-7xl text-center'>
            <h2 className='py-2 text-center text-4xl font-bold tracking-tight text-gray-900'>
              Active Metrics
            </h2>
            <p className='mt- leading-8 text-zinc-500'></p>
          </div>
        </div>
        <div className='relative overflow-hidden pt-16'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center sm:grid-cols-2 md:grid-cols-4'>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <dt className='text-base leading-7 text-muted-foreground'>
                  Avg. Clicks per Link
                </dt>
                <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                  <span>247</span>
                </dd>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <dt className='text-base leading-7 text-muted-foreground'>
                  Links Shortened
                </dt>
                <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                  <span>206</span>
                </dd>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <dt className='text-base leading-7 text-muted-foreground'>
                  Users
                </dt>
                <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                  <span>47</span>
                </dd>
              </div>
              <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
                <dt className='text-base leading-7 text-muted-foreground'>
                  Clicks Today
                </dt>
                <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                  <span>874K</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className='container py-24'>
        <div className='flex flex-col items-center gap-4 py-16'>
          <Badge variant='secondary'>Features</Badge>
          <h2 className='text-balance py-2 text-center text-4xl font-bold tracking-tight text-gray-900'>
            Powerful Features for Streamlined Link Management
          </h2>
          <p className='max-w-[800px] text-balance text-center text-xl text-muted-foreground'>
            This app presents a variety of features tailored to simplify and
            enhance your link management experience. From customizable short
            URLs to detailed analytics and link history.
          </p>
          <Image src={'/mockup2.png'} width={1200} height={800} alt='' />
          <div className='mx-auto grid w-full max-w-5xl grid-cols-1 place-items-center gap-8 sm:grid-cols-3'>
            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded bg-primary'>
                <LinkIcon className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Partcipent Invites</h3>
              <p className='text-muted-foreground'>
                Invite participants to your meeting via an invite link or an
                invite email.
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded bg-primary'>
                <Paintbrush2 className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Partcipent Invites</h3>
              <p className='text-muted-foreground'>
                Invite participants to your meeting via an invite link or an
                invite email.
              </p>
            </div>

            <div className='flex flex-col items-center text-center'>
              <div className='mb-4 flex h-8 w-8 items-center justify-center rounded bg-primary'>
                <BarChart3 className='text-white' />
              </div>
              <h3 className='mb-2 text-xl font-medium'>Partcipent Invites</h3>
              <p className='max-w-xs text-muted-foreground'>
                Invite participants to your meeting via an invite link or an
                invite email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
