import BookingListingTable from '@/components/other components/BookingListingTable'
import Pagination from '@/components/other components/Pagination'
import { useFetchBookingsInVendor } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function ShowBookingsVendor() {
    const [currentPage, setCurrentPage] = useState<number>(1)

    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const fetchBookings = useFetchBookingsInVendor(vendorId!,currentPage)
    const total = fetchBookings.data?.totalPages
    const bookings = fetchBookings.data?.Bookings
    return (
        <div>
            <BookingListingTable bookings={bookings} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={total} />
        </div>
    )
}

export default ShowBookingsVendor
