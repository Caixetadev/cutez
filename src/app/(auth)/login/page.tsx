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
  title: 'Login',
}

export default function LoginPage() {
  return (
    <Card className='w-[90vw] max-w-[400px]'>
      <CardHeader className='flex flex-col justify-center space-y-2 text-center'>
        <Logo className='mx-auto' />
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Choose an option below to Login</CardDescription>
      </CardHeader>

      <CardContent className='flex flex-col space-y-4'>
        <UserAuthForm />

        <p className='px-8 text-center text-sm text-muted-foreground'>
          <Link
            href='/register'
            className='hover:text-brand underline underline-offset-4'
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
