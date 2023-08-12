import Link from 'next/link'

import { ReactNode } from 'react'
import { notFound } from 'next/navigation'

import { Logo } from '@/assets/icons/logo'
import { Input } from '@/components/ui/input'
import { UserAccountNav } from '@/components/user-account-nav'
import { getCurrentUser } from '@/lib/session'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <>
      <header className='border-b'>
        <nav className='container flex h-16 items-center justify-between py-4'>
          <Link href='/'>
            <Logo />
          </Link>
          <div className='flex'>
            <Input
              className='mr-2 w-80'
              placeholder='Search links'
              type='email'
            />
            <UserAccountNav user={user} />
          </div>
        </nav>
      </header>
      <main className='container'>{children}</main>
    </>
  )
}
