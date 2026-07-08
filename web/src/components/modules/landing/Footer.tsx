import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  const socialLinks = [
    {
      title: "Instagram",
      logo: "/icons/instagram.svg",
      href: "/"
    },
    {
      title: "Facebook",
      logo: "/icons/facebook.svg",
      href: "/"
    },
  ]
  return (
    <footer className="bg-zinc-100 w-full h-full flex flex-col p-8 gap-4 mt-16">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-orange-400 text-2xl font-bold">car.</h1>
          <p>Get your car fast, whenever and wherever you need</p>
        </div>
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href} >
              <Image
                alt={link.title} src={link.logo}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-black h-0.5"></div>
      <div className="flex flex-col gap-4 md:flex-row-reverse md:justify-between">
        <div className="flex flex-col md:flex-row md:gap-8">
          <Link href="/">Privacy policy</Link>
          <Link href="/">Terms of services</Link>
        </div>
        <p>Copyright (c) 2026 car.. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
