import Link from 'next/link'

import { Logo } from '@/assets/icons/logo'
import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import { UserAccountNav } from './user-account-nav'

export async function Navbar() {
  const user = await getCurrentUser()

  return (
    <header className='container'>
      <div className='flex h-16 flex-wrap items-center justify-between py-4'>
        <Logo />
        {user ? (
          <UserAccountNav user={user} />
        ) : (
          <Button asChild variant='secondary'>
            <Link href='/login'>Login</Link>
          </Button>
        )}
      </div>
    </header>
  )
}
