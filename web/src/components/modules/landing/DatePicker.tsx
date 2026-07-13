"use client"

import { useState } from "react";
import { differenceInDays, differenceInCalendarDays } from "date-fns";
import { XIcon, ChevronDownIcon, ChevronUpIcon, CalendarDaysIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { FieldGroup } from "@/components/ui/field";
import { Field } from "@base-ui/react";
import { before } from "node:test";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCars } from "@/hooks/useCar";

export default function DatePicker() {

  const VALID_HOURS = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
    "19:00", "19:30", "20:00", "20:30", "21:00", "21:30",
    "22:00"
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { dateRange, setDateRange, pickupTime, setPickupTime, dropoffTime, setDropoffTime, daysCount } = useCars()

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger render={
        <Button variant="outline" className="flex items-center gap-4 border-2 border-zinc-300 rounded-lg p-4! h-full justify-start">
          <CalendarDaysIcon className="min-w-[24px] min-h-[24px] flex-shrink-0" />
          <div className="flex flex-col">
            <p
              className="text-[0.875rem] text-zinc-500 text-left"
            >Rent Time</p>
            <p className="text-left">{pickupTime} {dateRange?.from ? format(dateRange.from, "PPP") : "Select date"} - {dropoffTime} {dateRange?.to ? format(dateRange.to, "PPP") : "Select date"}</p>
          </div>
        </Button>
      } />
      < DialogContent className="max-w-2xl! w-fit overflow-y-auto max-h-[90vh] p-0" showCloseButton={false} >
        <DialogHeader className="flex flex-row p-4 w-full justify-between sticky top-0 left-0 border-b-1 border-zinc-300 bg-white z-200" >
          <DialogTitle className="text-xl font-medium">Select Rent Time</DialogTitle>
          <Button variant="outline" className="rounded-full"><XIcon /></Button>
        </DialogHeader>
        <div className="flex flex-col gap-4 px-4 pb-100">
          <Calendar
            required
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            disabled={{ before: new Date(new Date().setDate(new Date().getDate() + 1)) }}
            className="border rounded-lg border-zinc-300"
          />
          <div className="w-full flex justify-between gap-8">
            <div className="flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button variant="outline" className="max-h-fit! h-full p-2 flex flex-col w-full justify-start">
                      <p className="text-left w-full text-sm text-zinc-500">Pickup Time</p>
                      <div className="flex justify-between w-full font-medium">
                        <p>{pickupTime}</p>
                        <ChevronDownIcon />
                      </div>
                    </Button>
                  }
                />
                <DropdownMenuContent side="bottom" className="max-h-40">
                  <DropdownMenuRadioGroup onValueChange={(value) => setPickupTime(value)}>
                    {VALID_HOURS.map((time) => (
                      <DropdownMenuRadioItem key={time} value={time}>{time}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={

                    <Button variant="outline" className="max-h-fit! h-full p-2 flex flex-col w-full justify-start">
                      <p className="text-left w-full text-sm text-zinc-500">Pickup Time</p>
                      <div className="flex justify-between w-full font-medium">
                        <p>{dropoffTime}</p>
                        <ChevronDownIcon />
                      </div>
                    </Button>

                  }
                />
                <DropdownMenuContent side="bottom" className="max-h-40">
                  <DropdownMenuRadioGroup onValueChange={(value) => setDropoffTime((value))}>
                    {VALID_HOURS.map((time) => (
                      <DropdownMenuRadioItem key={time} value={time}>{time}</DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <DialogFooter className="sticky bottom-0 left-0 w-full flex justify-between! bg-white border-t-1 border-zinc-300 p-4 items-center">
          <div className="flex flex-col">
            <p className="font-medium">
              {pickupTime} {dateRange?.from ? format(dateRange.from, "EEEE, dd/MM") : ""} - {dropoffTime} {dateRange?.to ? format(dateRange.to, "EEEE, dd/MM") : ""}
            </p>
            <p className="text-[0.75rem]">Rental period: <span className="text-green-500 font-medium">{daysCount} days</span></p>
          </div>
          <Button type="submit" form="searchCarsForm" className="bg-blue-400 hover:bg-blue-400 active:bg-blue-500 font-medium p-6">Search</Button>
        </DialogFooter>
      </DialogContent >
    </Dialog >
  )
}
