import Link from 'next/link'

import { Logo } from '@/assets/icons/logo'
import { Button } from '@/components/ui/button'

export function Navbar() {
  return (
    <div className='container'>
      <div className='flex items-center justify-between py-6'>
        <Logo />
        <Button asChild variant='secondary'>
          <Link href='/login'>Login</Link>
        </Button>
      </div>
    </div>
  )
}
