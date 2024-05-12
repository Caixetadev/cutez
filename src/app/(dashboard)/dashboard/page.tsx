import { redirect } from 'next/navigation'

import { Link } from 'lucide-react'

import { authOptions } from '@/lib/auth'
import { getCurrentUser } from '@/lib/session'
import { db } from '@/lib/db'

import { LinkItem } from '@/components/link-item'
import { ButtonModal } from './components/button-modal'
import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import { getPageNumbers } from '@/utils/pagination'

export type PageProps = {
  params: { [key: string]: string | string[] | undefined }
  searchParams?: { [key: string]: string | string[] | undefined }
}

const PAGE_SIZE = 10

type FechLinksProps = {
  take: number
  skip: number
  userID: string
}

async function fetchLink({
  take = PAGE_SIZE,
  skip = 0,
  userID,
}: FechLinksProps) {
  const links = await db.link.findMany({
    take,
    skip,
    where: {
      creatorId: userID,
    },
    orderBy: {
      clicks: 'desc',
    },
  })

  const total = await db.link.count({ where: { creatorId: userID } })

  return {
    data: links,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  }
}

export default async function Dashboard(props: PageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  const page = props?.searchParams?.page || 1

  const pageNumber = Number(page)

  const take = PAGE_SIZE
  const skip = (pageNumber - 1) * take

  const { data, metadata } = await fetchLink({ take, skip, userID: user.id })

  const totalPages = metadata.totalPages

  const currentPage = Math.min(Math.max(Number(page), 1), totalPages)

  const { pages, showRightEllipsis, showLeftEllipsis } = getPageNumbers({
    totalPages,
    currentPage,
  })

  const notExistsLinks = !data.length

  if (notExistsLinks) {
    return (
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
    )
  }

  const renderPaginationItems = () => {
    return pages.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          href={`?page=${pageNumber}`}
          isActive={pageNumber === currentPage}
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ))
  }

  return (
    <div className='mb-16 flex flex-col gap-8'>
      <div className='mt-8 flex flex-wrap items-center justify-between'>
        <h1 className='text-3xl font-bold md:text-4xl'>Dashboard</h1>
        <ButtonModal />
      </div>

      <LinkItem data={data} />

      <PaginationContent className='self-center'>
        <PaginationItem>
          <PaginationPrevious
            href='#'
            aria-disabled={currentPage === 1}
            className={cn({
              'pointer-events-none': currentPage === 1,
              'opacity-50': currentPage === 1,
            })}
          />
        </PaginationItem>
        {showLeftEllipsis && (
          <>
            <PaginationItem>
              <PaginationLink
                href={`?page=1`}
                isActive={pageNumber === currentPage}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}
        {renderPaginationItems()}
        {showRightEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                href={`?page=${totalPages}`}
                isActive={pageNumber === currentPage}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}
        <PaginationItem>
          <PaginationNext
            href={`?page=${currentPage + 1}`}
            aria-disabled={currentPage === totalPages}
            className={cn({
              'pointer-events-none': currentPage === totalPages,
              'opacity-50': currentPage === totalPages,
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </div>
  )
}
