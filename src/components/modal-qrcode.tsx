'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { QrCode } from 'lucide-react'
import { DialogHeader } from './ui/dialog'

import { Button } from './ui/button'

export function ModalQRCode({ children }) {
  const onImageCownload = () => {
    const svg = document.getElementById('QRCode')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'QRCode'
      downloadLink.href = `${pngFile}`
      downloadLink.click()
    }
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`
  }
  return (
    <Dialog>
      <DialogTrigger>
        <span className='flex items-center rounded-full bg-gray-100 p-1.5 text-sm text-muted-foreground transition-all duration-75 hover:scale-105 active:scale-95'>
          <QrCode className='h-4 w-4 text-muted-foreground transition-all' />
        </span>
      </DialogTrigger>
      <DialogContent className='flex flex-col items-center justify-center sm:max-w-[400px]'>
        <DialogHeader>
          <DialogTitle>Download QR Code</DialogTitle>
        </DialogHeader>

        <div className='p-8'>
          <div className='rounded-md border border-input p-4'>{children}</div>
        </div>

        <DialogFooter>
          <Button size='sm' onClick={onImageCownload}>
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
