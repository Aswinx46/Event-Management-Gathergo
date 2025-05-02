

import RecentEvents from './RecentEvents'
import { useFindAdminDashboardDetails } from '@/hooks/AdminCustomHooks'
import { StatsOverview } from './topCard/StatsOverview'
import RecentBookings from './RecentBookings'

import { toast } from 'react-toastify'

function AdminDashboard() {
    const adminId = localStorage.getItem('adminId')
    console.log(adminId)
    const { data, error, isFetched } = useFindAdminDashboardDetails(adminId!)
    const bookings = data?.bookings
    const events = data?.events
    const totalClients = data?.totalClients
    const totalVendors = data?.totalVendors
    const totalRevenue = data?.totalRevenue
    const totalBookings = data?.totalBookings
    toast.error(error?.message)
    return (
        <div className=''>
            {isFetched && <StatsOverview bookings={totalBookings} clients={totalClients} revenue={totalRevenue} vendors={totalVendors} />}            {/* {events && <EventChart events={events} />} */}
            {bookings && <RecentBookings bookings={bookings} />}
            {events && <RecentEvents events={events} />}

        </div>
    )
}

export default AdminDashboard
