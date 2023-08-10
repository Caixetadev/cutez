import { ComponentProps } from 'react'

type LogoProps = ComponentProps<'svg'>

export const Logo = (props: LogoProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={35}
    height={35}
    fill='none'
    {...props}
  >
    <rect width={35} height={35} fill='#262424' rx={4} />
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M16 18a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'
    />
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M20 16a4.999 4.999 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'
    />
  </svg>
)
