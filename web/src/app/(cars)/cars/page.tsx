"use client"
import Header from "@/components/modules/cars/Header";
import { MapPinIcon } from "lucide-react";
import { CarStatus, FuelType, Transmission } from "@/types/enum";
import Link from "next/link";
import Image from "next/image";
import { CarQueryParams } from "@/types/car.type";
import { CarService } from "@/services/api/car.service";
import { useCars } from "@/hooks/useCar";
import { useEffect, useState } from "react"

export default function CarsPage() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const { isLoading, cars, getCars, error, meta } = useCars()

  useEffect(() => {
    getCars({ page, limit })

  }, [getCars, page, limit])
  useEffect(() => {
  }, [cars])

  return (
    <>
      <Header />
      <main>
        <div className="bg-zinc-100 grid p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.map((car, index) => (
            <Link key={index} href={`cars/${car.id}`} className="w-full block bg-white rounded-lg max-w-lg" >
              <div className="p-4 flex flex-col gap-2">
                <div className="relative h-48 w-full">
                  <Image
                    src={car.imageUrl}
                    alt={car.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="font-extrabold">{car.title}</p>
                <div className="flex justify-between text-zinc-500 text-sm">
                  <p>{car.transmission}</p>
                  <p>Seat: {car.seatCount}</p>
                  <p>{car.fuelType}</p>
                </div>
                <div className="flex items-center gap-4">
                  <MapPinIcon size={20} />
                  <p className=" text-zinc-500"> {car.pickupLocation}</p>
                </div>
                <div className="h-px bg-zinc-300"></div>
                <p className=" text-right"><span className="text-green-500 text-1xl font-bold">{car.dailyPrice}k</span>/day</p>
              </div>
            </Link>
          ))}
        </div >
      </main >
    </>
  )
}
