'use client'

import { useState } from 'react'

import { signIn } from 'next-auth/react'
import { Loader2, Twitter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { GithubLogo } from '@/assets/icons/github-logo'
import { GoogleLogo } from '@/assets/icons/google-logo'

export function UserAuthForm() {
  const [isGitHubLoading, setIsGitHubLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)
  const [isTwitterLoading, setIsTwitterLoading] = useState<boolean>(false)

  return (
    <div className='grid gap-6'>
      <form>
        <div className='grid grid-cols-3 gap-1'>
          <Button
            variant='outline'
            onClick={() => {
              setIsGitHubLoading(true)
              signIn('github')
            }}
            disabled={isGitHubLoading || isGoogleLoading || isTwitterLoading}
          >
            {isGitHubLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <GithubLogo />
            )}
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setIsGoogleLoading(true)
              signIn('google')
            }}
            disabled={isGitHubLoading || isGoogleLoading || isTwitterLoading}
          >
            {isGoogleLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <GoogleLogo />
            )}
          </Button>
          <Button
            variant='outline'
            onClick={() => {
              setIsTwitterLoading(true)
              signIn('twitter')
            }}
            disabled={isGitHubLoading || isGoogleLoading || isTwitterLoading}
          >
            {isTwitterLoading ? (
              <Loader2 className='h-4 w-4 animate-spin' />
            ) : (
              <Twitter className='h-4 w-4' />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
