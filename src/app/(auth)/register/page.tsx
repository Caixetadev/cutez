import Link from 'next/link'

import type { Metadata } from 'next'

import { ChevronLeft } from 'lucide-react'

import { Logo } from '@/assets/icons/logo'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { UserAuthForm } from '@/components/user-auth-form'

export const metadata: Metadata = {
  title: 'Register',
}

export default function SignupPage() {
  return (
    <div className='container flex h-[calc(100vh_-_40px)] flex-col items-center justify-center'>
      <Button asChild variant='ghost'>
        <Link href='/' className='absolute left-4 top-4 md:left-8 md:top-8'>
          <>
            <ChevronLeft className='w-4 h-4 mr-2' />
            Back
          </>
        </Link>
      </Button>

      <Card className='w-[90vw] max-w-[400px]'>
        <CardHeader className='flex flex-col justify-center space-y-2 text-center'>
          <Logo className='mx-auto' />
          <CardTitle>Welcome to Cutez</CardTitle>
          <CardDescription>
            Choose an option below to get started
          </CardDescription>
        </CardHeader>

        <CardContent className='flex flex-col space-y-4'>
          <UserAuthForm />
          <p className='px-8 text-sm text-center text-muted-foreground'>
            <Link
              href='/login'
              className='underline hover:text-brand underline-offset-4'
            >
              Have an account? Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
