import Link from 'next/link'

import { ReactNode } from 'react'

import { ChevronLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className='container flex h-[calc(100vh_-_40px)] flex-col items-center justify-center'>
      <Button asChild variant='ghost'>
        <Link href='/' className='absolute left-4 top-4 md:left-8 md:top-8'>
          <ChevronLeft className='mr-2 h-4 w-4' />
          Back
        </Link>
      </Button>

      {children}
    </main>
  )
}
