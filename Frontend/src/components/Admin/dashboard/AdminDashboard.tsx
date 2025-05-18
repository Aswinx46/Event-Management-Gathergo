

import RecentEvents from './RecentEvents'
import { useFindAdminDashboardDetails } from '@/hooks/AdminCustomHooks'
import { StatsOverview } from './topCard/StatsOverview'
import RecentBookings from './RecentBookings'

import { toast } from 'react-toastify'
import { EventStatusPie } from './EventStatusGraph'
import { EventStatsBarChart } from './EventBarChart'


function AdminDashboard() {
    const adminId = localStorage.getItem('adminId')
    const { data, error, isFetched } = useFindAdminDashboardDetails(adminId!)
    const bookings = data?.bookings
    const events = data?.events
    const totalClients = data?.totalClients
    const totalVendors = data?.totalVendors
    const totalRevenue = data?.totalRevenue
    const totalBookings = data?.totalBookings
    const eventStatusCount = data?.eventDetailsForGraph?.statusCount
    const activeEvents = data?.eventDetailsForGraph?.activeEvents
    const inactiveEvents = data?.eventDetailsForGraph?.inactiveEvents
    // const totalEvents = data?.eventDetailsForGraph?.totalEvents
    const totalTicketsSold = data?.eventDetailsForGraph?.totalTicketsSold
    toast.error(error?.message)

    return (
        <div className=''>
            {isFetched && <StatsOverview bookings={totalBookings} clients={totalClients} revenue={totalRevenue} vendors={totalVendors} />}
            {/* {events && <EventChart events={events} />} */}
            <div className='flex'>
                {activeEvents && totalTicketsSold && < EventStatsBarChart activeEvents={activeEvents} inactiveEvents={inactiveEvents} totalTicketsSold={totalTicketsSold} />}
                {eventStatusCount && <EventStatusPie statusCount={eventStatusCount} />}

            </div>
            {events && <RecentEvents events={events} />}
            {bookings && <RecentBookings bookings={bookings} />}

        </div>
    )
}

export default AdminDashboard
