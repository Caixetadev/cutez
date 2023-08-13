'use client'

import { CopyIcon } from 'lucide-react'

import { useToast } from '@/components/ui/use-toast'

export function Copy({ text }: { text: string }) {
  const { toast } = useToast()

  const onCopy = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/go/${text}`)

    toast({
      description: 'Link copied with success',
    })
  }

  return (
    <CopyIcon
      onClick={onCopy}
      className='ml-2 h-4 w-4 cursor-pointer text-muted-foreground'
    />
  )
}
