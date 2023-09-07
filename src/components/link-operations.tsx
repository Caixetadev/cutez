'use client'

import { useRouter } from 'next/navigation'

import { MouseEvent, useState } from 'react'

import { Loader2, MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import { ModalLink } from '@/components/modal-link'
import { toast } from '@/components/ui/use-toast'
import { onCopy } from '@/lib/utils'

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
    try {
      event.preventDefault()

      setIsDeleteLoading(true)

      await fetch(`/api/link/${id}`, {
        method: 'DELETE',
      })

      toast({
        description: 'Link deleted successfully.',
      })
    } catch (error) {
      toast({
        description: 'An error occurred while deleting the link.',
        variant: 'destructive',
      })
    } finally {
      router.refresh()
      setShowDeleteAlert(false)
      setIsDeleteLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted'>
          <MoreVertical className='h-4 w-4' />
          <span className='sr-only'>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              onCopy(domain)

              toast({
                description: 'Link copied with success',
              })
            }}
          >
            Copy
          </DropdownMenuItem>
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
            <AlertDialogTitle>
              Are you sure you want to delete this link?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will permanently remove the selected link. Are you
              sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isDeleteLoading}
              variant='destructive'
              onClick={deleteLink}
            >
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
