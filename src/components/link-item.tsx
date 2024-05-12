'use client'

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
import { BarChart, Eye, EyeOff } from 'lucide-react'
import { ModalQRCode } from './modal-qrcode'

import QRCode from 'react-qr-code'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface LinkItemProps {
  data: LinkData[]
}

export function LinkItem({ data }: LinkItemProps) {
  const [showLinks, setShowLinks] = useState<{ [key: string]: boolean }>({})

  const toggleLinkVisibility = (domain: string) => {
    setShowLinks((prev) => ({
      ...prev,
      [domain]: !prev[domain],
    }))
    localStorage.setItem(domain, JSON.stringify(!showLinks[domain]))
  }

  const retrieveLinkVisibilityState = (domain: string) => {
    const storedLinks = localStorage.getItem(domain)
    if (storedLinks) {
      return JSON.parse(storedLinks)
    }

    return false
  }

  return (
    <div className='flex flex-col gap-4'>
      {data.map((item) => (
        <Card key={item.id} className='w-full'>
          <CardHeader className='flex flex-col justify-center'>
            <div className='flex flex-wrap items-center justify-between'>
              <div className='flex flex-wrap items-center space-x-1 sm:space-x-2'>
                <CardTitle>
                  <a
                    href={`/${item.domain}`}
                    className='text-lg sm:text-[26px]'
                    target='_blank'
                  >
                    {item.domain}
                  </a>
                </CardTitle>

                <Copy text={item.domain} />
                <div
                  onClick={() => toggleLinkVisibility(item.domain)}
                  className='rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 active:scale-95'
                >
                  {retrieveLinkVisibilityState(item.domain) ? (
                    <EyeOff className='h-[16px] w-[16px] text-muted-foreground transition-all' />
                  ) : (
                    <Eye className='h-[16px] w-[16px] text-muted-foreground transition-all' />
                  )}
                </div>

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
                  <span className='ml-1 hidden sm:block'>
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
            <CardDescription
              className={cn('max-w-lg truncate', {
                'blur-sm': retrieveLinkVisibilityState(item.domain),
              })}
            >
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
