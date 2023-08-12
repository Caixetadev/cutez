import Link from 'next/link'

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

export default function LoginPage() {
  return (
    <div className='container flex h-[calc(100vh_-_40px)] flex-col items-center justify-center'>
      <Button asChild variant='ghost'>
        <Link href='/' className='absolute left-4 top-4 md:left-8 md:top-8'>
          <>
            <ChevronLeft className='mr-2 h-4 w-4' />
            Back
          </>
        </Link>
      </Button>

      <Card className='w-[90vw] max-w-[400px]'>
        <CardHeader className='flex flex-col justify-center space-y-2 text-center'>
          <Logo className='mx-auto' />
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>
            Enter your email to sign in to your account
          </CardDescription>
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
    </div>
  )
}
