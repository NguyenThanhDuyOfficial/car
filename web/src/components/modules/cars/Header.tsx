
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, MapPinIcon, CalendarDaysIcon } from 'lucide-react'

export default function Header() {
  return (
    <header className="z-100 w-full px-8 py-4 bg-white flex flex-col gap-4 shadow-lg"
    >
      < div className="w-full h-full flex items-center justify-between" >
        < Link href="/" className="font-bold text-orange-400 text-4xl" > car.</Link >
        <Button variant="default">Sign In</Button>
      </div >

      <div className='h-0.5 bg-zinc-100'></div>

      <div className='flex items-center gap-16'>
        <Button variant="outline" className="rounded-full">
          <ChevronLeftIcon />
        </Button>
        <div className='flex gap-8'>
          <div className='flex gap-4'>
            <MapPinIcon />
            <p>Singapore</p>
          </div>
          <div className='flex gap-4'>
            <CalendarDaysIcon />
            <p>20:00 Monday, 08/07 - 21:00 Tuesday, 09/07</p>
          </div>
        </div>

      </div>
    </header >
  )
}
