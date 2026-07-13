
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, MapPinIcon, CalendarDaysIcon } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { UserIcon } from 'lucide-react'
import { addDays, format } from "date-fns";
import { useCars } from '@/hooks/useCar'

export default function Header() {

  const { user } = useAuth()
  const { pickupTime, dropoffTime, dateRange } = useCars()
  return (
    <header className="z-100 w-full px-8 py-4 bg-white flex flex-col gap-4 shadow-lg"
    >
      < div className="w-full h-full flex items-center justify-between" >
        < Link href="/" className="font-bold text-orange-400 text-4xl" > car.</Link >
        {user ?
          <div></div>
          :
          <Button variant="outline"> <Link href="/auth/login">Login</Link></Button>
        }
      </div >

      <div className='h-0.5 bg-zinc-100'></div>

      <div className='flex items-center gap-16'>
        <Button variant="outline" className="rounded-full">
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <div className='flex gap-8'>
          <div className='flex gap-4'>
            <MapPinIcon />
            <p>TP.Ho Chi Minh</p>
          </div>
          <div className='flex gap-4'>
            <CalendarDaysIcon />
            <p className="text-left">{pickupTime} {dateRange?.from ? format(dateRange.from, "PPP") : "Select date"} - {dropoffTime} {dateRange?.to ? format(dateRange.to, "PPP") : "Select date"}</p>
          </div>
        </div>

      </div>
    </header >
  )
}
