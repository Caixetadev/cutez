'use client'

import { CopyIcon } from 'lucide-react'

import { onCopy } from '@/lib/utils'
import { toast } from '@/components/ui/use-toast'

export function Copy({ text }: { text: string }) {
  return (
    <>
      <button className='rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 active:scale-95'>
        <span className='sr-only'>Copy</span>
        <CopyIcon
          onClick={() => {
            onCopy(text)

            toast({
              description: 'Link copied with success',
            })
          }}
          className='h-[14px] w-[14px] text-muted-foreground transition-all'
        />
      </button>
    </>
  )
}
