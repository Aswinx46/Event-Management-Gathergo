import React from 'react'
import BookingListingTable from '../../other components/BookingListingTable'
import { useFetchBookingsInClient } from '@/hooks/ClientCustomHooks'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

function BookingListing() {
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const fetchBookings = useFetchBookingsInClient(clientId!)
  const bookings = fetchBookings?.data?.bookings
  console.log(fetchBookings.data)
  return (
    <div>
      <BookingListingTable bookings={bookings} />
    </div>
  )
}

export default BookingListing
