import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
export default function Header() {
  const [isScrolled, setIsScolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300)
        setIsScolled(true)
      else
        setIsScolled(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  return (
    <header className={`fixed top-0 left-0 z-100 w-full p-4 ${isScrolled
      ? "bg-white/95 backdrop-blur-sm shadow-md"
      : 'bg-transparent'
      }`}
    >
      {/* container */}
      < div className="w-full h-full flex items-center justify-between" >
        {/* logo */}
        < Link href="/" className="font-bold text-orange-400 text-4xl" > car.</Link >
        {/* icons */}
        {/* login */}
        <Button variant="default">Sign In</Button>
      </div >
    </header >
  )
}
