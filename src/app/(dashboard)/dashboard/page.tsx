import { getCurrentUser } from '@/lib/session'

import { Link } from 'lucide-react'

import { LinkItem } from '@/components/link-item'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { ButtonModal } from './components/button-modal'
import { RefreshOnFocus } from '@/components/refresh-on-focus'

export default async function Dashboard() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const links = await db.link.findMany({
    where: {
      creatorId: user.id,
    },
    orderBy: {
      clicks: 'desc',
    },
  })

  return (
    <div className='mb-16 flex flex-col gap-8'>
      <div className='mt-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold md:text-4xl'>Dashboard</h1>
        <ButtonModal />
      </div>

      {links.length ? (
        <LinkItem data={links} />
      ) : (
        <div className='flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50'>
          <div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-muted'>
              <Link className='h-10 w-10' />
            </div>
            <h2 className='mt-6 text-xl font-semibold'>No posts created</h2>
            <p className='mb-8 mt-2 text-center text-sm font-normal leading-6 text-muted-foreground'>
              You don&apos;t have any links yet. Start creating content.
            </p>
            <ButtonModal variant='outline' />
          </div>
        </div>
      )}

      <RefreshOnFocus />
    </div>
  )
}
