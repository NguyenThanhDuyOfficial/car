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
import { MapPin, CalendarDays } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Marquee } from "@/components/ui/marquee";

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

  return (
    <div className="w-full flex flex-col gap-8">
      <section className="relative w-full h-[80vh] before:absolute before:inset-0 before:bg-black/40 before:z-10">
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

      </section>

      <section className="relative w-full">
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
      </section>
    </div>
  );
}
