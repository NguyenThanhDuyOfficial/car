'use client'
import { formatPrice } from "@/lib/utils"
import Image from "next/image"
import { CarFront, Armchair, Fuel, ShieldCheckIcon, ShieldAlertIcon, MapPinIcon } from 'lucide-react';
import Header from "./Header"
import { Button } from "@/components/ui/button"
import { useCars } from "@/hooks/useCar"
import React, { useEffect } from 'react'
import { useParams } from "next/navigation"
import Footer from "@/components/modules/landing/Footer";
interface CarPageProps {
  params: { id: string }
}
export default function CarDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { getCarById, car, error, owner } = useCars()

  useEffect(() => {
    if (id) {
      getCarById(id)
    }
  }, [getCarById, id])

  if (!car) { return <><Header /> <main><p>Car not found</p></main></> }

  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col py-4 w-full h-full items-center">
          <div className="relative w-full aspect-[16/10] max-w-2xl ">
            <Image
              src={car.imageUrl}
              alt={car.title}
              fill
              className=" object-cover md:rounded-lg"
            />
          </div>
          <div className="p-4 flex flex-col gap-8">
            <p className="text-3xl font-bold">{car.title}</p>
            <div className="bg-blue-50 rounded-lg p-2 py-4 w-full flex flex-col gap-4">
              <p className="text-zinc-500"><span className="text-black text-4xl font-medium">{formatPrice(car.dailyPrice)}</span>/day</p>
              <div className="flex rounded-lg bg-white  border-zinc-300 p-2 justify-between border">
                <div className="flex-1">
                  <p className="text-sm">Pick-up Date</p>
                  <p className="text-sm font-medium">21:00 Monday, 08/07/2026</p>
                </div>
                <div className="flex-1 ">
                  <p className="text-sm">Drop-off Date</p>
                  <p className="text-sm font-medium">21:00 Tuesday, 09/07/2026</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Pickup Location</p>
                <div className="bg-white border-zinc-300 text-sm border p-2 rounded-lg space-y-2">
                  <p className="text-zinc-400">I'll go pick up the car myself.</p>
                  <p className="font-medium">{car.pickupLocation}</p>
                </div>
              </div>
              <div className="h-px bg-zinc-300"></div>
              <div className="flex justify-between">
                <p className="text-sm">Daily Price:</p>
                <p className="text-sm font-bold">{car.dailyPrice.toLocaleString("vi-VN")}/day</p>
              </div>
              <div className="h-px bg-zinc-300"></div>
              <div className="flex justify-between">
                <p className="font-semibold">Total Amount</p>
                <p className="text-base font-semibold">{car.dailyPrice.toLocaleString("vi-VN")}</p>
              </div>
              <Button size="lg" className="h-16 font-semibold text-lg bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white" >Choose to Rent</Button>
            </div>

            <div className="h-px bg-zinc-300"></div>
            <div className="space-y-4">
              <p className="font-medium text-lg">Characteristics</p>
              <div className="flex justify-between gap-4">
                <div className="space-y-1">
                  <CarFront className="text-blue-500" />
                  <p className="text-zinc-400">Transmission</p>
                  <p className="font-medium">{car.transmission === "AUTOMATIC" ? "Automatic" : "Manual"}</p>
                </div>
                <div className="space-y-1">
                  < Armchair className="text-blue-500" />
                  <p className="text-zinc-400">Number of seat</p>
                  <p className="font-medium">{car.seatCount} seats</p>
                </div>
                <div className="space-y-1">
                  <Fuel className="text-blue-500" />
                  <p className="text-zinc-400">Fuel Type</p>
                  <p className="font-medium">{car.fuelType === "GASOLINE" ? "Gasoline" : "Electric"}</p>
                </div>
              </div>
            </div>
            <div className="h-px bg-zinc-300"></div>
            <div className="space-y-4">
              <p className="font-medium text-lg">Description</p>
              <div>
                <h3 className="font-medium mb-2">Car offers the following benefits to our valued customers renting a car:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Refund for excess fuel</li>
                  <li>Free overtime if less than 1 hour</li>
                  <li>Free excess mileage if less than 10km</li>
                  <li>Free parking for motorbikes in the lot</li>
                  <li>Complimentary Micar Kit package included with car rental (including tissues, snacks &amp; bottled water)</li>
                </ul>
                <p>{car.description}</p>
              </div>
            </div>
            <div className="h-px bg-zinc-300"></div>
            <div className="space-y-4">
              <p className="font-medium text-lg">Car Rental Documents</p>
              <div className="space-y-1 bg-red-50 rounded-lg p-4 border-l-8 border-red-500">
                <p className="text-zinc-500">Choose one of two options: </p>
                <p className="text-lg font-medium">Driver's License (verification) and Passport (retained) </p>
                <p className="text-lg font-medium">Driver's License (verification) & Citizen Identification Card (VNeID verification) </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-lg">Collateral</p>
              <div className="space-y-1 bg-red-50 rounded-lg p-4 border-l-8 border-red-500">
                <p>No cash or motorbike collateral is required from tenants.</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-lg">Terms</p>
              <ul className="list-disc pl-5 space-y-2 text-sm text-zinc-500">
                <li>Use the vehicle for its intended purpose.</li>
                <li>Do not use the rental vehicle for illegal or unlawful purposes.</li>
                <li>Do not use the rental vehicle as collateral or security.</li>
                <li>Do not smoke, chew gum, or litter in the vehicle.</li>
                <li>Do not transport prohibited or flammable goods.</li>
                <li>Do not transport fruits or strong-smelling food in the vehicle.</li>
                <li>Do not drive the vehicle to border areas or checkpoints.</li>
                <li> When returning the vehicle, if it is dirty or has an odor, please clean the vehicle yourself or pay a cleaning fee.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="font-medium text-lg">Cancellation Policy</p>
              <div className="rounded-lg border border-zinc-300 overflow-hidden">
                <div className="grid grid-cols-2 bg-gray-50 border-b border-zinc-300">
                  <div className="p-3 font-semibold text-sm">Cancellation Time</div>
                  <div className="p-3 font-semibold text-sm border-l border-zinc-300">Policy</div>
                </div>

                <div className="grid grid-cols-2 border-b border-zinc-300">
                  <div className="p-3 text-sm">Within 1 hour of making a reservation</div>
                  <div className="p-3 text-sm border-l border-zinc-300">
                    <div className="flex items-center gap-2 text-green-700">
                      <ShieldCheckIcon className="size-4" />
                      Free
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b border-zinc-300">
                  <div className="p-3 text-sm">
                    More than 7 days before the trip (after 1 hour of reservation)
                  </div>
                  <div className="p-3 text-sm border-l border-zinc-300">
                    <div className="flex items-center gap-2 text-green-700">
                      <ShieldCheckIcon className="size-4" />
                      10% of the trip value
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="p-3 text-sm">
                    Within 7 days before the trip (after 1 hour of reservation)
                  </div>
                  <div className="p-3 text-sm border-l border-zinc-300">
                    <div className="flex items-center gap-2 text-red-700">
                      <ShieldAlertIcon className="size-4" />
                      40% of the trip value
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">
                  <li>
                    The cancellation policy applies to both renters and vehicle owners (in addition, depending on the time of cancellation, vehicle owners may receive a 2-3 star rating on the system).
                  </li>
                  <li>
                    Renters who do not pick up the vehicle will incur a cancellation fee (40% of the trip value).
                  </li>
                  <li>
                    Vehicle owners who do not deliver the vehicle will refund the reservation deposit and compensate the renter for the cancellation fee (40% of the trip value).
                  </li>
                  <li>
                    The reservation deposit and compensation due to vehicle owner cancellation (if any) will be refunded to the renter by Mioto via bank transfer within 1-3 business days.
                  </li>
                </ul>
              </div>
            </div>


            <div className="h-px bg-zinc-300"></div>


            <div className="space-y-4">
              <p className="font-medium text-lg">Car Location</p>
              <p><MapPinIcon className="inline" /> {car.pickupLocation}</p>
            </div>

            <div className="h-px bg-zinc-300"></div>

            <div className="space-y-4">
              <p className="font-medium text-lg">Car Owner</p>
              <p>{car.owner.firstName} {car.owner.lastName}</p>
            </div>
          </div>
        </div>
      </main >
      <Footer />
    </>
  )
}
