import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { UserIcon } from 'lucide-react'
export default function Header() {
  const [isScrolled, setIsScolled] = useState(false)
  const { user, logout } = useAuth()

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
    <header className={`fixed top-0 left-0 z-10 w-full p-4 px-8 ${isScrolled
      ? "bg-white/95 backdrop-blur-sm shadow-md"
      : 'bg-transparent'
      }`}
    >
      < div className="w-full h-full flex items-center justify-between" >
        < Link href="/" className="font-bold text-orange-400 text-4xl" > car.</Link >
        {user ?
          <Button variant={isScrolled ? "default" : "outline"} onClick={logout}>Logout</Button>
          :
          <Button variant="outline"> <Link href="/auth/login">Login</Link></Button>
        }
      </div >
    </header >
  )
}
