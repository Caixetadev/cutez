'use client'

import { CopyIcon } from 'lucide-react'

import { useToast } from '@/components/ui/use-toast'

export function Copy({ text }: { text: string }) {
  const { toast } = useToast()

  const onCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/${text}`)

    toast({
      description: 'Link copied with success',
    })
  }

  return (
    <>
      <button className='rounded-full bg-gray-100 p-1.5 transition-all duration-75 hover:scale-105 active:scale-95'>
        <span className='sr-only'>Copy</span>

        <CopyIcon
          onClick={onCopy}
          className='h-[14px] w-[14px] text-muted-foreground transition-all'
        />
      </button>
    </>
  )
}
