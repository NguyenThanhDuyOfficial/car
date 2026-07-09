

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

    </header >
  )
}
