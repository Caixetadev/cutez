import { link } from '@/lib/http/link'
import { user } from '@/lib/http/user'

export const dynamic = 'force-dynamic'

export async function Metrics() {
  const [links, clicks, avgClicks, users] = await Promise.all([
    link.total(),
    link.clicks(),
    link.avgClicks(),
    user.total(),
  ])

  return (
    <section className='container py-8 sm:py-24'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-7xl text-center'>
          <h2 className='py-2 text-center text-4xl font-bold tracking-tight text-gray-900'>
            Active Metrics
          </h2>
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
                <span>{avgClicks._avg.clicks?.toFixed(2) || 0}</span>
              </dd>
            </div>
            <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
              <dt className='text-base leading-7 text-muted-foreground'>
                Links Shortened
              </dt>
              <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                <span>{links || 0}</span>
              </dd>
            </div>
            <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
              <dt className='text-base leading-7 text-muted-foreground'>
                Users
              </dt>
              <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                <span>{users || 0}</span>
              </dd>
            </div>
            <div className='mx-auto flex max-w-xs flex-col gap-y-4'>
              <dt className='text-base leading-7 text-muted-foreground'>
                Clicks
              </dt>
              <dd className='order-first text-5xl font-semibold tracking-tight text-gray-900'>
                <span>{clicks._sum.clicks || 0}</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
