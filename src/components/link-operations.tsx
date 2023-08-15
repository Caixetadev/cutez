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
      router.refresh()
    } catch (error) {
      toast({
        description: 'An error occurred while deleting the link.',
        variant: 'destructive',
      })
    } finally {
      setIsDeleteLoading(false)
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
