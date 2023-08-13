import Link from 'next/link'

import { Logo } from '@/assets/icons/logo'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <header className='container'>
      <div className='flex h-16 flex-wrap items-center justify-between py-4'>
        <Logo />
        <Button asChild variant='secondary'>
          <Link href='/login'>Login</Link>
        </Button>
      </div>
    </header>
  )
}
