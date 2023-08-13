'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { LinkSchema, LinkForm } from '@/lib/validations/link'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { toast } from './ui/use-toast'
import { Dispatch, SetStateAction } from 'react'

interface LinkFormProps {
  defaultValues?: LinkForm
  id?: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function LinkForm(props: LinkFormProps) {
  const { defaultValues, setIsOpen, id } = props

  const form = useForm<LinkForm>({
    resolver: zodResolver(LinkSchema),
    defaultValues: defaultValues ?? { description: '', domain: '', url: '' },
  })

  const router = useRouter()

  async function onSubmit(data: LinkForm) {
    if (defaultValues) {
      const response = await fetch(`/api/link/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
        }),
      })

      if (response.ok) {
        router.refresh()
        toast({
          description: 'Link create with success',
        })
        setIsOpen(false)
        return
      }

      form.setError('domain', {
        message: 'Existe um domain com esse nome ja',
      })

      return
    }

    const response = await fetch('/api/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data,
      }),
    })

    if (response.ok) {
      router.refresh()
      toast({
        description: 'Link create with success',
      })
      setIsOpen(false)
      return
    }

    form.setError('domain', {
      message: 'Existe um domain com esse nome ja',
    })
  }

  return (
    <Form {...form}>
      <form
        className='flex flex-col gap-4 py-4'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='url' className='text-right'>
                URL
              </FormLabel>
              <FormControl>
                <Input id='url' placeholder='https://' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {!defaultValues && (
          <FormField
            control={form.control}
            name='domain'
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor='domain' className='text-right'>
                  Domain
                </FormLabel>
                <FormControl>
                  <Input id='domain' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='description' className='text-right'>
                Description
              </FormLabel>
              <FormControl>
                <Textarea id='description' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit'>{defaultValues ? 'Save' : 'Create'}</Button>
      </form>
    </Form>
  )
}
