import Header from "@/components/modules/cars/Header";
import { MapPinIcon } from "lucide-react";
import { CarStatus, FuelType, Transmission } from "@/types/enum";
import Link from "next/link";
import Image from "next/image";

export default function Cars() {
  const cars = [
    {
      title: "Toyota Raize 2023",
      imageUrl: "/cars/toyota-raize-2023.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 5,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 1",
      dailyPrice: 779,
      brand: "Toyota",
      model: "Raize",
      year: 2023,
      status: CarStatus.AVAILABLE,
      description: "Xe SUV đô thị nhỏ gọn, tiết kiệm nhiên liệu, phù hợp cho gia đình.",
      ownerId: "clm123456789", // Thay bằng userId thực tế
    },
    {
      title: "Geely Coolray Flagship 2025",
      imageUrl: "/cars/geely-coolray-flagship-2025.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 5,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 2",
      dailyPrice: 899,
      brand: "Geely",
      model: "Coolray Flagship",
      year: 2025,
      status: CarStatus.AVAILABLE,
      description: "Xe SUV hiện đại với nhiều tính năng thông minh, thiết kế thể thao.",
      ownerId: "clm123456789",
    },
    {
      title: "Hyundai Stargazer 2024",
      imageUrl: "/cars/hyundai-stargazer-2024.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 7,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 3",
      dailyPrice: 849,
      brand: "Hyundai",
      model: "Stargazer",
      year: 2024,
      status: CarStatus.AVAILABLE,
      description: "MPV 7 chỗ sang trọng, thoải mái cho gia đình và du lịch.",
      ownerId: "clm123456789",
    },
    {
      title: "Kia Carens 2023",
      imageUrl: "/cars/kia-carens-2023.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 7,
      fuelType: FuelType.DIESEL,
      pickupLocation: "Quận 4",
      dailyPrice: 829,
      brand: "Kia",
      model: "Carens",
      year: 2023,
      status: CarStatus.AVAILABLE,
      description: "MPV 7 chỗ mạnh mẽ, động cơ diesel tiết kiệm nhiên liệu.",
      ownerId: "clm123456789",
    },
    {
      title: "Kia Seltos Luxury 2021",
      imageUrl: "/cars/kia-seltos-luxury-2021.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 5,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 5",
      dailyPrice: 749,
      brand: "Kia",
      model: "Seltos Luxury",
      year: 2021,
      status: CarStatus.AVAILABLE,
      description: "SUV sang trọng, nhiều tiện nghi, phù hợp cho gia đình và công việc.",
      ownerId: "clm123456789",
    },
    {
      title: "MG5 Standard 2023",
      imageUrl: "/cars/mg5-standard-2023.jpg",
      transmission: Transmission.MANUAL,
      seatCount: 5,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 6",
      dailyPrice: 659,
      brand: "MG",
      model: "5 Standard",
      year: 2023,
      status: CarStatus.AVAILABLE,
      description: "Sedan thể thao, giá rẻ, tiết kiệm nhiên liệu cho các chuyến đi hàng ngày.",
      ownerId: "clm123456789",
    },
    {
      title: "Mitsubishi Outlander 2019",
      imageUrl: "/cars/mitsubishi-outlander-2019.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 7,
      fuelType: FuelType.DIESEL,
      pickupLocation: "Quận 7",
      dailyPrice: 799,
      brand: "Mitsubishi",
      model: "Outlander",
      year: 2019,
      status: CarStatus.AVAILABLE,
      description: "SUV 7 chỗ mạnh mẽ, động cơ diesel, phù hợp cho các chuyến đi xa.",
      ownerId: "clm123456789",
    },
    {
      title: "Toyota Veloz Cross 2022",
      imageUrl: "/cars/toyota-veloz-cross-2022.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 7,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 8",
      dailyPrice: 869,
      brand: "Toyota",
      model: "Veloz Cross",
      year: 2022,
      status: CarStatus.AVAILABLE,
      description: "MPV 7 chỗ hiện đại, thiết kế thể thao, nhiều tiện nghi cao cấp.",
      ownerId: "clm123456789",
    },
    {
      title: "Toyota Vios 2023",
      imageUrl: "/cars/toyota-vios-2023.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 5,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 9",
      dailyPrice: 699,
      brand: "Toyota",
      model: "Vios",
      year: 2023,
      status: CarStatus.AVAILABLE,
      description: "Sedan hạng B phổ biến, tiết kiệm nhiên liệu, phù hợp cho di chuyển trong phố.",
      ownerId: "clm123456789",
    },
    {
      title: "Toyota Vios 2025",
      imageUrl: "/cars/toyota-vios-2025.jpg",
      transmission: Transmission.AUTOMATIC,
      seatCount: 5,
      fuelType: FuelType.GASOLINE,
      pickupLocation: "Quận 10",
      dailyPrice: 729,
      brand: "Toyota",
      model: "Vios",
      year: 2025,
      status: CarStatus.AVAILABLE,
      description: "Sedan hạng B thế hệ mới, thiết kế hiện đại, nhiều công nghệ tiên tiến.",
      ownerId: "clm123456789",
    },
  ]
  return (
    <>
      <Header />
      <main>
        <div className="bg-zinc-100 grid p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.map((car, index) => (
            <Link key={index} href="/id" className="w-full block bg-white rounded-lg max-w-lg">
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
