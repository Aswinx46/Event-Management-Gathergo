import  { useState } from 'react'
import BookingListingTable from '../../other components/BookingListingTable'
import { useFetchBookingsInClient } from '@/hooks/ClientCustomHooks'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import Pagination from '@/components/other components/Pagination'
import { Booking } from '@/types/BookingDetailsModalTypes'




function BookingListing() {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const fetchBookings = useFetchBookingsInClient(clientId!, currentPage)
  const originalBookings = fetchBookings?.data?.Bookings
  const bookings: Booking[] = originalBookings
  console.log(bookings)
  const total=fetchBookings?.data?.totalPages
  
  return (
    <div>
      <BookingListingTable bookings={bookings} />
      <Pagination current={currentPage} setPage={setCurrentPage} total={total}/>
    </div>
  )
}

export default BookingListing
