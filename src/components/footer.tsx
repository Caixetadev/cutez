import Link from 'next/link'

export function Footer() {
  return (
    <footer className='container flex h-5 items-center justify-center '>
      <p className='p-5 text-sm'>
        Crafted by{' '}
        <Link href='' className='font-medium underline underline-offset-4'>
          caixeta
        </Link>
        . The source code is on{' '}
        <Link
          href='https://github.com/caixetadev'
          target='_blank'
          className='font-medium underline underline-offset-4'
        >
          Github
        </Link>
        .
      </p>
    </footer>
  )
}
