'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { DialogHeader } from './ui/dialog'
import { LinkForm as LinkData } from '@/lib/validations/link'
import { LinkForm } from './link-form'
import { Dispatch, SetStateAction } from 'react'

interface ModalLinkProps {
  defaultValues?: LinkData
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function ModalLink(props: ModalLinkProps) {
  const { defaultValues, isOpen, setIsOpen } = props

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Create link</DialogTitle>
        </DialogHeader>
        <LinkForm defaultValues={defaultValues} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
