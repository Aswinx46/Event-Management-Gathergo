import React from 'react'
import BookingListingTable from '../../other components/BookingListingTable'
import { useFetchBookingsInClient } from '@/hooks/ClientCustomHooks'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface Service {
  serviceTitle: string;
  serviceDescription: string;
  serviceDuration: string;
  servicePrice: number;
}

interface Vendor {
  _id: string;
  name: string;
  email: string;
  phone: number;
  profileImage: string;
}

interface Client {
  _id: string;
  name: string;
  email: string;
  phone: number;
  profileImage: string;
}

export interface Booking {
  _id: string;
  date: string;
  email: string;
  phone: number;
  paymentStatus: string;
  status: string;
  service: Service;
  vendor: Vendor;
  client: Client
  vendorApproval: string
  rejectionReason?: string
}

function BookingListing() {
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const fetchBookings = useFetchBookingsInClient(clientId!)
  const originalBookings = fetchBookings?.data?.bookings
  const bookings: Booking[] = originalBookings?.reverse()
  console.log(fetchBookings.data)
  return (
    <div>
      <BookingListingTable bookings={bookings} />
    </div>
  )
}

export default BookingListing
