import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from 'lucide-react';
import { Car } from '@/types/car.type';
const CarCard = ({ car }: { car: Car }) => {
  return (
    <Link href={`/cars/${car.id}`} className="bg-white rounded-lg" >
      <div className="p-4 flex flex-col gap-2">
        <div className="relative h-48 w-full">
          <Image
            src={car.imageUrl}
            alt={car.title}
            fill
            className="object-cover rounded-lg"
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
  )
}
export default CarCard
