import { type ClassValue, clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFirstLetters = (name: string | undefined | null) => {
  if (!name) return 'NA'

  const [firstName, lastName] = name.split(' ', 2)

  return firstName.charAt(0) + lastName?.charAt(0)
}

export const onCopy = (text: string) => {
  navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_URL}/${text}`)
}
