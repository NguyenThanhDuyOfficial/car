import Image from "next/image";
import Link from "next/link";
import Form from 'next/form'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import { MapPin, CalendarDays, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

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
    [
      {
        title: "Browse Cars",
        desc: "Select from our premium collections"
      },
      {
        title: "Choose Ride",
        desc: "Pick the perfect car",
      },
      { title: "Set Your Date", desc: "Pick duration and location" },
    ],
    [{ title: "Add Preferences", desc: "Include extras like a driver" }, { title: "Confirm Booking", desc: "Secure your ride" }, { title: "Pick Up & Drive", desc: "Collect your car and enjoy the road ahead" }],
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
    <div className="w-full flex flex-col mb-32 gap-32">
      <section>
        <div className="relative w-full h-[80vh] before:absolute before:inset-0 before:bg-black/40 before:z-10">
          <Image
            src='/hero.jpg'
            alt='hero-background'
            fill
            className="object-cover"
            priority
          />
          <div className="relative z-20 w-full h-full flex flex-col justify-center items-start pl-8 gap-8">
            <div className="text-white">
              <h1 className="text-4xl font-bold">Your journey, our reposibility.</h1>
              <p>Get your car fast, whenever and wherever you need.</p>
            </div>
            <Form action="/search" className="bg-white rounded-[16px] p-4">
              <FieldGroup className="w-xl gap-4">
                <Field className="w-full flex flex-row  px-4 py-2 justify-center items-center border-2 border-zinc-300 rounded-lg">
                  <div className="flex items-center gap-4">
                    <MapPin />
                    <div className="flex flex-col">
                      <FieldLabel htmlFor="pickup">Pick up location</FieldLabel>
                      <input
                        id='pickup'
                        name='pickup'
                        placeholder="Search destinations"
                      />
                    </div>
                  </div>
                  <Button className="text-xs shrink px-4" variant="outline">+ Drop off at different location</Button>
                </Field>
                <Field className="w-full flex flex-row ">
                  <div className="flex-1 flex justify-between items-center gap-8 px-4 py-2 border-2 border-zinc-300 rounded-lg">
                    <div className="flex-2 flex gap-4 items-center">
                      <CalendarDays className="shrink-0" />
                      <div className="flex-col">
                        <FieldLabel htmlFor="pickup-date">Pick-up Date</FieldLabel>
                        <input
                          id='pickup-date'
                          name='pickup-date'
                          placeholder="Jun 20, 2026"
                          type="text"
                          className="w-full min-w-0"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <FieldLabel>Time</FieldLabel>
                      <input
                        id="time"
                        name='time'
                        type='text'
                        placeholder="10:00"
                        className="w-full min-w-0"
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex justify-between items-center gap-8 px-4 py-2 border-2 border-zinc-300 rounded-lg">
                    <div className="flex-2 flex gap-4 items-center">
                      <CalendarDays className="shrink-0" />
                      <div className="flex-col">
                        <FieldLabel htmlFor="pickup-date">Pick-up Date</FieldLabel>
                        <input
                          id='pickup-date'
                          name='pickup-date'
                          placeholder="Jun 20, 2026"
                          type="text"
                          className="w-full min-w-0"
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <FieldLabel>Time</FieldLabel>
                      <input
                        id="time"
                        name='time'
                        type='text'
                        placeholder="10:00"
                        className="w-full min-w-0"
                      />
                    </div>
                  </div>
                </Field>
                <Button className=" px-12 py-6 self-end text-white bg-blue-500 text-base">Search</Button>
              </FieldGroup>
            </Form>
          </div>

        </div>

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
      </section>


      <section className="flex mx-16">
        <h1 className="flex-1 text-[36px] font-medium">Drive Car Live Freedom</h1>
        <p className="flex-1 text-[28px] ">Experience premium car rentals creafted for comfort, performance, and style. <span className="text-zinc-500">
          Whether it's a quick business trip or a long weekend getaway our fleet is designed to elevate your journey
        </span>
        </p>
      </section>

      <section className="flex flex-col mx-16 gap-8">
        <div className="flex items-center">
          <div className="flex-1">
            <h1 className="text-[36px] font-medium ">Simple. Fast. Hassle-free</h1>
            <p>Experience a smooth rental process designed to get you on the road in minutes. From selecting your dream car to confirming your booking</p>
          </div>
          <div className="flex-1 flex justify-center">
            <Button className="text-[20px] px-8 py-6 mr-32">Booking</Button>
          </div>
        </div>

        <div className="flex ">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              {benefits[0].map((benefit, index) => (
                <div key={index} className="bg-zinc-100 rounded-lg p-4 py-2">
                  <h1 className="text-[24px]">{benefit.title}</h1>
                  <p className="text-[14px] text-zinc-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              {benefits[1].map((benefit, index) => (
                <div key={index} className="bg-zinc-100 rounded-lg p-4 py-2">
                  <h1 className="text-[24px]">{benefit.title}</h1>
                  <p className="text-[14px] text-zinc-600">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1  flex justify-center">
            <div className="relative w-80 h-40">
              <Image
                src='/benefit-img.png'
                alt="benefit-img"
                fill
                className="object-cover  rounded-lg"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="flex mx-16 gap-8">
        <div>
          <h1 className="text-[36px] font-medium">
            Got questions? We've got answers!
          </h1>
          <p className="text-zinc-500">
            Here are some of the most common questions about us car rental service.
          </p>
        </div>
        <div className="flex-1 w-full flex flex-col gap-4">
          {faq.map((faq, index) => (
            <Collapsible key={index} className="bg-zinc-100 rounded-lg p-4 gap-4">
              <CollapsibleTrigger asChild className="flex justify-between">
                <Button variant='ghost' className="text-[24px] w-full">{faq.question} <ChevronDown className="ml-auto" /></Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="text-zinc-600 m-2">
                {faq.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </section>

    </div>
  );
}
