import Link from 'next/link'
import { Button } from "@/components/ui/button"
export default function Header() {
  return (
    <header className="w-full p-4
       bg-white/95 backdrop-blur-sm shadow-md"
    >
      < div className="w-full h-full flex items-center justify-between" >
        < Link href="/" className="font-bold text-orange-400 text-4xl" > car.</Link >
      </div >
    </header >
  )
}
