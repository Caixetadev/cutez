import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from '@/components/ui/card'
import { Copy } from '@/components/copy'
import { LinkOperations } from '@/components/link-operations'
import { Link } from '@prisma/client'

interface LinkItemProps {
  data: Link[]
}

export function LinkItem({ data }: LinkItemProps) {
  return (
    <div className='flex flex-col gap-4'>
      {data.map((item) => (
        <Card key={item.id} className='w-full'>
          <CardHeader className='flex flex-col justify-center'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <CardTitle>{item.domain}</CardTitle>
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
            <CardDescription>{item.url}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className='text-muted-foreground'>{item.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
