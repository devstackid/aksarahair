import { Link } from '@inertiajs/react'
import React from 'react'
import { BiCalendarEvent } from 'react-icons/bi'

const BookButton = () => {
  return (
    <Link
                    href={route("reservation")}
                    className="text-sm font-[Montreal-Bold] tracking-wide text-black flex md:hidden items-center gap-2 bg-white px-10 text-nowrap py-2.5 rounded-3xl shadow-xl fixed bottom-10 left-1/2 -translate-x-1/2 z-50 hover:bg-white transition"
                >
                    <BiCalendarEvent /> Booking Disini
                </Link>
  )
}

export default BookButton