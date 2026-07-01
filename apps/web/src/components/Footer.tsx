import Image from 'next/image';
import Link from 'next/link';
export default function () {

  const socials = [
    {
      src: "/icons/facebook.svg",
      href: "https://facebook.com/"
    },
    {
      src: "/icons/x.svg",
      href: "https://x.com"
    },
    {
      src: "/icons/instagram.svg",
      href: "https://instagram.com/"
    }
  ];
  const quickLinks = [
    {
      title: "Company",
      items: [
        { title: "About Us", href: "/about" },
        { title: "Services", href: "/services" },
        { title: "Community", href: "/community" },
        { title: "Testimonial", href: "/testimonial" },
      ]
    },
    {
      title: "Support",
      items: [
        { title: "Help Center", href: "/help" },
        { title: "Tweet Us", href: "/tweet" },
        { title: "Webians", href: "/webians" },
        { title: "Feedback", href: "/feedback" },
      ]
    },
    {
      title: "Links",
      items: [
        { title: "Courses", href: "/courses" },
        { title: "Become", href: "/become" },
        { title: "Community", href: "/community" },
        { title: "Testimonial", href: "/testimonial" },
      ]
    },
  ];
  return (
    <footer className='bg-zinc-100 px-16 py-8 flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex-1 flex flex-col gap-4'>
          <div>
            <h1 className='text-[28px] font-medium'>car.</h1>
            <p className='text-zinc-600'>Your journey, our reposibility.</p>
          </div>
          <div className='flex gap-2'>
            {socials.map((social) => (
              <Link key={social.href} href={social.href}>
                <Image src={social.src} width={24} height={24} alt={social.href} />
              </Link>
            ))}
          </div>
        </div>
        <div className='flex-1 flex justify-center gap-8 items-center'>
          {quickLinks.map((link) => (
            <div key={link.title} className='flex flex-col gap-2 justify-center items-center'>
              <h1 className='text-[24px] font-medium'>{link.title}</h1>
              <div className='flex flex-col gap-1  items-center' >
                {link.items.map((item, index) => (
                  <Link key={index} href={item.href} className='text-zinc-600'>{item.title}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div >

      <div className='w-full border border-zinc-600'>
      </div>
      <div className=' flex justify-between'>
        <p className='flex-1'>© {new Date().getFullYear()} Car. All rights reserved.</p>
        <div className='flex-1 flex justify-center mr-8 gap-8 text-zinc-600 items-center'>
          <Link href='#'>Privacy Policy</Link>
          <Link href='#'>Terms of Use</Link>
          <Link href='#'>Legal</Link>
          <Link href='#'>Site Map</Link>
        </div>
      </div>
    </footer >
  )
}
