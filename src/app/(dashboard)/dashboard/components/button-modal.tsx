'use client'

import { useState } from 'react'

import { Plus } from 'lucide-react'
import { VariantProps } from 'class-variance-authority'

import { ModalLink } from '@/components/modal-link'
import { Button, buttonVariants } from '@/components/ui/button'
interface ButtonModalProps {
  variant?: VariantProps<typeof buttonVariants>['variant']
}

export function ButtonModal({ variant }: ButtonModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ModalLink isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button variant={variant} onClick={() => setIsOpen(true)}>
        <Plus className='mr-2 h-4 w-4' />
        Create Link
      </Button>
    </>
  )
}
