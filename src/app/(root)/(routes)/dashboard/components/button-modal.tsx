'use client'

import { ModalLink } from '@/components/modal-link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { useState } from 'react'

export function ButtonModal() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <ModalLink isOpen={isOpen} setIsOpen={setIsOpen} />
      <Button onClick={() => setIsOpen(true)}>
        <Plus className='mr-2 h-4 w-4' />
        Create Link
      </Button>
    </>
  )
}
