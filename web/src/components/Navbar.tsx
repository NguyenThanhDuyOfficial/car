'use client'

import Link from "next/link"
import { Button } from "./ui/button"
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const navigations = [
    {
      title: "About Us",
      href: "/about"
    },
    {
      title: "Become A Host",
      href: "/host"
    },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const threshold = window.innerHeight * 0.1;
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full flex px-8 py-4 items-center text-white",
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-gray-100/50 text-black"
          : "bg-transparent"
      )}
    >
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-orange-400">Car.</h1>
      </div>
      <div className="flex-1 flex gap-8 justify-center">
        {navigations.map((nav) => (
          <Link key={nav.href} href={nav.href}
            className="font-medium text-lg hover:underline"
          >
            {nav.title}
          </Link>
        ))}
      </div>
      <div className="flex-1 flex justify-end">
        <Button asChild className="text-lg p-4"><Link href='/sign-in'>Sign In</Link></Button>
      </div>
    </nav >
  )
}
