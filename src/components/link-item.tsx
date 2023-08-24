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
import { BarChart } from 'lucide-react'
import { ModalQRCode } from './modal-qrcode'

import QRCode from 'react-qr-code'

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
              <div className='flex items-center space-x-1 sm:space-x-2'>
                <CardTitle>
                  <a href={`/${item.domain}`} target='_blank'>
                    {item.domain}
                  </a>
                </CardTitle>

                <Copy text={item.domain} />

                <ModalQRCode>
                  <QRCode
                    id='QRCode'
                    className='h-32 w-32'
                    value={`${process.env.NEXT_PUBLIC_URL}/${item.domain}`}
                  />
                </ModalQRCode>

                <button className='flex items-center rounded-full bg-gray-100 p-1.5 text-sm text-muted-foreground transition-all duration-75 hover:scale-105 active:scale-95'>
                  <BarChart className='mr-1 h-[14px] w-[14px] text-muted-foreground transition-all' />
                  {item.clicks}
                  <span className='ml-1'>
                    {item.clicks > 1 ? 'clicks' : 'click'}
                  </span>
                </button>
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
