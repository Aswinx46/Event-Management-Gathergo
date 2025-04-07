import BookingListingTable from '@/components/other components/BookingListingTable'
import { useFetchBookingsInVendor } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

function ShowBookingsVendor() {
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const fetchBookings = useFetchBookingsInVendor(vendorId!)
    const bookings = fetchBookings.data?.bookings
    console.log(fetchBookings.data)
    return (
        <div>
            <BookingListingTable bookings={bookings} />
        </div>
    )
}

export default ShowBookingsVendor
