import Image from "next/image"
import Header from "./Header"
import { Button } from "@/components/ui/button"
export default async function CarDetailPage() {
  const car = {
    title: "Toyota Vios 2025",
    imageUrl: "/cars/toyota-vios-2025.jpg",
    transmission: "AUTOMATIC",
    seatCount: 5,
    fuelType: "GASOLINE",
    pickupLocation: "Quận 10",
    dailyPrice: 729,
    brand: "Toyota",
    model: "Vios",
    year: 2025,
    status: "AVAILABLE",
    description: "Sedan hạng B thế hệ mới, thiết kế hiện đại, nhiều công nghệ tiên tiến.",
    ownerId: "clm123456789",
  }
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col py-8">
          <div className="relative w-full h-150">
            <Image
              src={car.imageUrl}
              alt={car.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-8 flex flex-col gap-8">
            <p className="text-3xl font-bold">{car.title}</p>
            <div className="bg-zinc-100 rounded-lg p-4 w-full flex flex-col gap-4">
              <p className="text-zinc-500"><span className="text-black text-2xl font-medium">{car.dailyPrice}k</span>/day</p>
              <div className="flex rounded-lg bg-white  border-zinc-500 p-2 justify-between">
                <div className="flex-1">
                  <p>Pick-up Date</p>
                  <p>21:00 Monday, 08/07/2026</p>
                </div>
                <div className="flex-1 border-l-2 pl-4 border-zinc-900">
                  <p>Drop-off Date</p>
                  <p>21:00 Tuesday, 09/07/2026</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-500">Daily Price:</p>
                <p>899.000/day</p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-500">Total Price:</p>
                <p>899.000/day</p>
              </div>
              <div className="flex justify-between">
                <p className="text-zinc-500 font-medium">Total Amount</p>
                <p className="text-lg font-bold">899.000đ</p>
              </div>
              <Button className="bg-blue-500 text-white" >Rent</Button>
            </div>
            <div>
              <h1>Features</h1>
              <div>
                <p>{car.transmission}</p>
                <p>{car.seatCount}</p>
                <p>{car.fuelType}</p>
              </div>
            </div>
            <div>
              <h1>description</h1>
              <p>this is a description</p>
            </div>
            <div>
              <h1>Car rental documents
              </h1>
              <p>
                Choose one of two options:
                Driver's License (verification) and Passport (retained)
                Driver's License (verification) & Citizen Identification Card (VNeID verification)
              </p>
            </div>
            <div>
              <p>Collateral</p>
              <p>No cash or motorbike collateral is required from tenants.</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
