"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckIcon, CreditCardIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Header from "@/components/modules/auth/Header"
import { useOrder } from "@/hooks/useOrder"
import { useCars } from "@/hooks/useCar"
import { setUser } from "@/store/slices/authSlice"
import { useAuth } from "@/hooks/useAuth"
import { OrderStatus } from "@/types/enum"
import { format } from "date-fns"

export default function PaymentPage() {
  const [stage, setStage] = useState(1)
  const { error, setError, order, createOrder } = useOrder()
  const { car, daysCount, pickupTime, dateRange, dropoffTime } = useCars()
  const { user } = useAuth()
  let totalAmount = 0
  if (!car) {
    setError("Car Not Found")
  }
  else {
    totalAmount = car?.dailyPrice * daysCount || 0
  }

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setStage(2)
    const form = e.target
    const formData = new FormData(form)
    const data = {
      cardNumber: formData.get('cardNumber'),
      nameOnCard: formData.get('nameOnCard'),
      expiryDate: formData.get('expiryDate'),
      cvv: formData.get('cvv')
    }

    let [hours, minutes] = pickupTime.split(':').map(Number);
    const pickupDateTime = new Date(dateRange.from || new Date());
    pickupDateTime.setHours(hours, minutes, 0, 0)


    let [hour, minute] = dropoffTime.split(':').map(Number);
    const dropoffDateTime = new Date(dateRange.to || new Date());
    dropoffDateTime.setHours(hour, minute, 0, 0)
    if (!user || !car) {
      return null
    }
    try {

      const response = await createOrder({ userId: user.id, carId: car.id, pickupTime: pickupDateTime, dropoffTime: dropoffDateTime, totalAmount: totalAmount, status: OrderStatus.PENDING, dailyPrice: car.dailyPrice })

      setStage(3)
    } catch (err) {
      // Hiển thị lỗi cho user
      setStage(2); // Quay lại stage 2 nếu có lỗi
    }


  }
  return (
    <>
      <Header />
      <main className="flex  justify-center min-h-screen pt-20 bg-zinc-100">
        <div className="space-y-8 max-w-xl w-full">
          <div className="flex items-center max-w-xl w-full justify-center">
            <div className="flex flex-col justify-center items-center" >
              <div className="bg-black text-white rounded-full w-12 h-12 flex items-center justify-center font-medium">
                {stage > 1 ? <CheckIcon /> : <p>1</p>}
              </div>
              <p className="text-center">Payment</p>
            </div>
            <div className={cn(`mb-5 flex-1 h-0.5 bg-zinc-300 ${stage > 1 ? "bg-black" : ""}`)} ></div>

            <div className="flex flex-col justify-center items-center" >
              <div className={cn(`rounded-full w-12 h-12 flex items-center justify-center font-medium border-zinc-300 border ${stage >= 2 ? "bg-black text-white border-none" : ""}`)} >
                {stage > 2 ? <CheckIcon /> : <p>2</p>}
              </div>
              <p>Process</p>
            </div>
            <div className={cn(`mb-5 flex-1 h-0.5 bg-zinc-300 ${stage > 2 ? "bg-black" : ""}`)} ></div>

            <div className="flex flex-col justify-center items-center" >
              <div className={cn(`rounded-full w-12 h-12 flex items-center justify-center font-medium border-zinc-300 border ${stage >= 3 ? "bg-black text-white border-none" : ""}`)} >
                <p>3</p>
              </div>
              <p className="text-center">Done</p>
            </div>
          </div>
          {!error ?
            <div>
              {stage === 1 ?
                (<form className="bg-white rounded-lg p-4 space-y-4"
                  onSubmit={handleSubmit}>
                  <h1 className="text-lg font-medium">Select Payment Method</h1>

                  <div className=" bg-zinc-100 rounded-lg  p-4 px-4 space-y-4">
                    <div className=" rounded-lg flex gap-4 items-center">
                      <input type="radio" />
                      <CreditCardIcon />
                      <div className="">
                        <div className="flex justify-between">
                          <p className="font-medium text-lg">Credit/Debit Card</p>
                          <div>
                            {/* <p>logo</p> */}
                          </div>
                        </div>
                        <p className="text-zinc-500">Pay securely using Stripe</p>
                      </div>
                    </div>
                    <div className="h-px bg-zinc-300"></div>
                    <div className="flex flex-col gap-2">
                      <label>Card Number</label>
                      <input
                        name="cardNumber"
                        placeholder="1234 1234 1234 1234"
                        className="bg-white rounded-lg p-2 px-4 border-zinc-300 border"
                        inputMode="numeric"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 ">
                      <div className="md:col-span-2 flex flex-col gap-2">
                        <label>Name on card</label>
                        <input
                          placeholder="Card name"
                          name="cardName"
                          className="bg-white rounded-lg p-2 px-4 border-zinc-300 border"
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>Expire date</label>
                        <input
                          placeholder="MM/YY"
                          name="expireDate"
                          className="bg-white rounded-lg p-2 px-4 border-zinc-300 border"
                          maxLength={5}
                          required
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label>CVV</label>
                        <input
                          placeholder="CVV"
                          type="password"
                          name="cvv"
                          className="bg-white rounded-lg p-2 px-4 border-zinc-300 border"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700" type="submit">Pay</Button>
                </form>)
                : stage === 2 ?

                  <div className="flex flex-col gap-8 items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p>Please wait...</p>
                  </div>
                  :
                  <div className="bg-white rounded-lg flex flex-col justify-center items-center p-8 gap-4">
                    <CheckIcon width={80} height={80} />
                    <p className="text-xl font-semibold">Order placed successfully</p>
                    <p className="text-zinc-500">Your order {order?.id} has been confirmed</p>
                    <p>Please come to <span className="font-medium">{car?.pickupLocation}</span> at <span className="font-medium">{pickupTime} {dateRange?.from ? format(dateRange.from, "EEEE, dd/MM") : ""}</span> to get your car.</p>

                    <Button variant="outline" className="p-4"><Link href="/">Back to home</Link></Button>

                  </div>

              } {car ?
                <div className="bg-white rounded-lg p-4 mt-4 mb-16 space-y-4">
                  <p className="font-medium">Order Detail</p>
                  <div className="bg-zinc-300 w-full h-px"></div>

                  <div className="flex justify-between">
                    <p className="text-sm">Daily Price:</p>
                    <p className="">{car.dailyPrice.toLocaleString("vi-VN")}/day</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="">Total</p>
                    <p className="text-base ">{car.dailyPrice.toLocaleString("vi-VN")} x {daysCount} days</p>
                  </div>
                  <div className="h-px bg-zinc-300"></div>
                  <div className="flex justify-between">

                    <p className="font-semibold">Total Amount</p>
                    <p className="text-base font-semibold">{totalAmount?.toLocaleString("vi-VN")}</p>
                  </div>

                </div> :
                <div>
                </div>}
            </div>

            :
            <div>
            </div>
          }
        </div>
      </main >
    </>
  )
}
