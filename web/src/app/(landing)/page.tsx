'use client'
import Footer from "@/components/modules/landing/Footer";
import Form from "next/form"
import Header from "@/components/modules/landing/Header";
import Image from "next/image";
import { MapPinIcon, ChevronDownIcon, CalendarDaysIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee";
import Link from "next/link";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import DatePicker from "@/components/modules/landing/DatePicker";
import { useCars } from "@/hooks/useCar";
export default function Home() {

  const brandIcons = [
    { src: "/icons/astonmartin.svg", href: "https://www.astonmartin.com" },
    { src: "/icons/bentley.svg", href: "https://www.bentleymotors.com" },
    { src: "/icons/bmw.svg", href: "https://www.bmw.com" },
    { src: "/icons/bugatti.svg", href: "https://www.bugatti.com" },
    { src: "/icons/ferrari.svg", href: "https://www.ferrari.com" },
    { src: "/icons/ford.svg", href: "https://www.ford.com" },
    { src: "/icons/honda.svg", href: "https://www.honda.com" },
    { src: "/icons/hyundai.svg", href: "https://www.hyundai.com" },
    { src: "/icons/koenigsegg.svg", href: "https://www.koenigsegg.com" },
    { src: "/icons/lamborghini.svg", href: "https://www.lamborghini.com" },
    { src: "/icons/mclaren.svg", href: "https://www.mclaren.com" },
    { src: "/icons/porsche.svg", href: "https://www.porsche.com" },
    { src: "/icons/rollsroyce.svg", href: "https://www.rolls-roycemotorcars.com" },
    { src: "/icons/tesla.svg", href: "https://www.tesla.com" },
    { src: "/icons/toyota.svg", href: "https://www.toyota.com" },
    { src: "/icons/volkswagen.svg", href: "https://www.vw.com" },
  ];

  const benefits = [
    {
      title: "Browse Cars",
      desc: "Select from our premium collections"
    },
    {
      title: "Choose Ride",
      desc: "Pick the perfect car",
    },
    { title: "Set Your Date", desc: "Pick duration and location" },
    { title: "Add Preferences", desc: "Include extras like a driver" }, { title: "Confirm Booking", desc: "Secure your ride" }, { title: "Pick Up & Drive", desc: "Collect your car and enjoy the road ahead" },
  ]
  const faq = [
    {
      question: "What documents do I need to rent a car?",
      answer: "You need a valid driver's license (held for at least 1-2 years), a valid passport or national ID, and a credit card in the driver's name for payment and security deposit. If your license is not in English, you may also need an International Driving Permit (IDP)."
    },
    {
      question: "What is the minimum age to rent a car?",
      answer: "The minimum age is typically 21 years old. Drivers under 25 may be subject to a young driver surcharge. Some premium vehicles may require drivers to be at least 25 years old."
    },
    {
      question: "What insurance is included?",
      answer: "Basic insurance includes Collision Damage Waiver (CDW) covering damage to the rental car, Theft Protection (TP), and Third-Party Liability. You can purchase additional coverage to reduce the excess amount."
    },
    {
      question: "What is the security deposit?",
      answer: "The security deposit is a hold placed on your credit card to cover potential damages, fines, or additional charges. The amount varies by vehicle type and is released after the car is returned in good condition."
    },
    {
      question: "Can I cancel my booking?",
      answer: "Yes, cancellations are free if made at least 48 hours before pickup. Cancellations made within 24-48 hours may incur a 50% charge, and within 24 hours are non-refundable."
    }
  ];

  return (
    <>
      <Header />
      <main>
        {/* hero */}
        <section className="relative w-full h-full py-16">
          <Image
            src="/hero.jpg"
            alt="Hero image"
            fill
            className="object-cover object-right"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative w-full h-full px-8 pt-16 flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center gap-4 text-center max-w-lg">
              <h1 className="text-white text-3xl font-bold text-center">Your journey, our reponsibility</h1>
              <p className="text-white">Get your car fast, whenever and wherever you need.</p>
            </div>

            {/* Search */}

            <Form
              id="searchCarsForm"
              action="/cars"
              className="flex flex-col gap-4 bg-white mt-8 p-4 rounded-lg w-full max-w-100 md:max-w-lg"
            >
              <div className="flex items-center gap-4 border-2 border-zinc-300 rounded-lg p-4">
                <MapPinIcon />
                <div className="w-full flex flex-col">
                  <label
                    htmlFor="pickup-location"
                    className="text-[0.875rem] text-zinc-500"
                  >Pickup Location</label>
                  <p>TP.Ho Chi Minh</p>
                </div>
              </div>
              <DatePicker />
              <Button
                type="submit"
                className="bg-blue-400 hover:bg-blue-500 active:bg-blue-600"
              >Search Cars</Button>
            </Form>

          </div>
        </section >

        {/* branch logo */}
        < section >

          <div className="relative w-full h-[20vh] flex items-center">
            <Marquee >
              {brandIcons.map((icon) => (
                <Link key={icon.href} href={icon.href} className="mx-4">
                  <Image
                    src={icon.src}
                    alt={icon.href}
                    width={48}
                    height={48}
                    className="text-muted-foreground"
                  />
                </Link>
              )
              )}
            </Marquee>
          </div>
        </section >

        <section className="px-8 flex flex-col gap-4">
          <h1>Drive Car Live Freedom</h1>
          <p>Experience premium car rentals creafted for comfort, performance, and style.
            <span className="text-zinc-500">
              Whether it's a quick business trip or a long weekend getaway our fleet is designed to elevate your journey
            </span>
          </p>
        </section>

        <section className="px-8 flex flex-col gap-8 pt-8">
          <div className="flex flex-col gap-4">
            <h1>Simple. Fast. Hassle-free</h1>
            <p>Experience a smooth rental process designed to get you on the road in minutes. From selecting your dream car to confirming your booking</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="w-fit h-full bg-zinc-100 rounded-lg p-2">
                <h2>{benefit.title}</h2>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* faq */}
        <section className="px-8 flex flex-col gap-8 pt-8">
          <div className="flex flex-col gap-4">
            <h1>Simple. Fast. Hassle-free</h1>
            <p>Experience a smooth rental process designed to get you on the road in minutes. From selecting your dream car to confirming your booking</p>
          </div>
          <div className="w-full flex flex-col gap-4">
            {faq.map((faq, index) => (
              <Collapsible key={index} className="bg-zinc-100 rounded-lg p-4 gap-4" defaultOpen={true}>

                <CollapsibleTrigger render={
                  <Button variant='ghost' className="w-full touch-manipulation" size="xs" >
                    {faq.question} <ChevronDownIcon className="ml-auto group-data-panel-open/button:rotate-180 " />
                  </Button>
                }>
                </CollapsibleTrigger>

                <CollapsibleContent className="text-zinc-600 m-2">
                  {faq.answer}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </section>
      </main >
      <Footer />
    </>
  );
}
