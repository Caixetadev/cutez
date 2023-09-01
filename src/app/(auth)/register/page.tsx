import Link from 'next/link'

import type { Metadata } from 'next'

import { Logo } from '@/assets/icons/logo'

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
    <Card className='w-[90vw] max-w-[400px]'>
      <CardHeader className='flex flex-col justify-center space-y-2 text-center'>
        <Logo className='mx-auto' />
        <CardTitle>Welcome to Cutez</CardTitle>
        <CardDescription>Choose an option below to get started</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col space-y-4'>
        <UserAuthForm />
        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/login'
            className='hover:text-brand underline underline-offset-4'
          >
            Have an account? Login
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
