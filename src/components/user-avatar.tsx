import { User } from 'next-auth'

import { AvatarProps } from '@radix-ui/react-avatar'

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

import { getFirstLetters } from '@/lib/utils'

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'image' | 'name'>
}

export function UserAvatar(props: UserAvatarProps) {
  const { user } = props

  return (
    <Avatar {...props}>
      <AvatarImage src={user.image as string} />
      <AvatarFallback>{getFirstLetters(user.name)}</AvatarFallback>
    </Avatar>
  )
}
