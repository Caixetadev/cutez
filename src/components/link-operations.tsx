'use client'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { Loader2, MoreVertical } from 'lucide-react'

import { Button } from './ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { AlertDialogHeader, AlertDialogFooter } from './ui/alert-dialog'
import { MouseEvent, useState } from 'react'

import { ModalLink } from './modal-link'
import { useRouter } from 'next/navigation'

interface LinkOperationsProps {
  domain: string
  url: string
  description?: string
  id: string
}

export function LinkOperations(props: LinkOperationsProps) {
  const { domain, url, description, id } = props

  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false)
  const [showEdit, setShowEdit] = useState<boolean>(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState<boolean>(false)

  const router = useRouter()

  async function deleteLink(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setIsDeleteLoading(true)

    const deleted = await fetch(`/api/link/${id}`, {
      method: 'DELETE',
    })

    if (deleted) {
      setIsDeleteLoading(false)
      router.refresh()
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='icon'>
            <MoreVertical className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Copy</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowEdit(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowDeleteAlert(true)}
            className='text-destructive focus:text-destructive'
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction variant='destructive' onClick={deleteLink}>
              {isDeleteLoading && (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ModalLink
        id={id}
        isOpen={showEdit}
        setIsOpen={setShowEdit}
        defaultValues={{ domain, url, description }}
      />
    </>
  )
}
