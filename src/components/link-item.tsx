import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { Copy } from '@/components/copy'
import { LinkOperations } from '@/components/link-operations'
import { Link as LinkData } from '@prisma/client'
import Link from 'next/link'

interface LinkItemProps {
  data: LinkData[]
}

export function LinkItem({ data }: LinkItemProps) {
  return (
    <div className='flex flex-col gap-4'>
      {data.map((item) => (
        <Card key={item.id} className='w-full'>
          <CardHeader className='flex flex-col justify-center'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <CardTitle>
                  <a href={`/${item.domain}`} target='_blank'>
                    {item.domain}
                  </a>
                </CardTitle>

                <Copy text={item.domain} />
              </div>
              <div>
                <LinkOperations
                  id={item.id}
                  description={item.description as string}
                  domain={item.domain}
                  url={item.url}
                />
              </div>
            </div>
            <CardDescription className='max-w-lg truncate'>
              {item.url}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className='break-all text-sm text-muted-foreground'>
              {item.description && item.description}
              {!item.description && 'No description.'}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
