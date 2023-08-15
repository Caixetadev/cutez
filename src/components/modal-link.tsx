'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { DialogHeader } from './ui/dialog'
import { LinkForm as LinkData } from '@/lib/validations/link'
import { LinkForm } from './link-form'
import { Dispatch, SetStateAction } from 'react'

interface ModalLinkProps {
  id?: string
  defaultValues?: LinkData
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ModalLink(props: ModalLinkProps) {
  const { defaultValues, isOpen, setIsOpen, id } = props

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? 'Edit link' : 'Create link'}
          </DialogTitle>
        </DialogHeader>
        <LinkForm id={id} defaultValues={defaultValues} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
