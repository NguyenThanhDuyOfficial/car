"use client"
import Header from "@/components/modules/cars/Header";
import { MapPinIcon } from "lucide-react";
import { CarStatus, FuelType, Transmission } from "@/types/enum";
import Link from "next/link";
import Image from "next/image";
import { CarQueryParams } from "@/types/car.type";
import { CarService } from "@/services/api/car.service";
import { useCars } from "@/hooks/useCar";
import { useCallback, useEffect, useState } from "react"
import CarCard from "@/components/modules/cars/CarCard";

export default function CarsPage() {
  const { isLoading, cars, getCars, error, meta } = useCars()

  const fetchCars = useCallback(() => {
    getCars({ page: meta.page || 1, limit: meta.limit || 10 });
  }, [meta.page, meta.limit]);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  return (
    <>
      <Header />
      <main>
        <div className="bg-zinc-100 grid p-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {cars.map((car, index) => (
            <CarCard key={car.id} car={car}></CarCard>
          ))}
        </div >
      </main >
    </>
  )
}
