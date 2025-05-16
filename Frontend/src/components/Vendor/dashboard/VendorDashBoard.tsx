/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, DollarSign, TicketCheck, CalendarDays } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BookingType } from "@/types/BookingType"
import { MetricCard } from "./MetricCard"
import { RevenueChart } from "./RevenueChart"
import { BookingStatusChart } from "./BookingStatusChart"
import { TicketSalesChart } from "./TicketSalesChart"
import { EventCategoryChart } from "./EventCategoryChart"
import { UpcomingEvents } from "./UpcomingEvents"
import { useVendorDashboardDetails } from "@/hooks/VendorCustomHooks"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { Period } from "@/types/DatePeriodType"


export default function VendorDashboard() {
  const [timeRange, setTimeRange] = useState<Period>('allTime')
  const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)

  const fetchVendorDashboard = useVendorDashboardDetails(vendorId!, timeRange)
  console.log(fetchVendorDashboard.data)
  // Calculate metrics
  const totalBookings = fetchVendorDashboard.data?.totalBookings
  const totalRevenue = fetchVendorDashboard.data?.revenueChart?.reduce((acc:number, cur:any) => acc += cur.revenue,0)
  const totalTicketsSold = fetchVendorDashboard.data?.totalTickets
  const totalEventsHosted = fetchVendorDashboard.data?.totalEvents
  const revenueDetails = fetchVendorDashboard.data?.revenueChart
  const recentEvents = fetchVendorDashboard.data?.recentEvents

  const recentBookings = fetchVendorDashboard.data?.recentBookings

  // Calculate completion rate
  const completedBookings = recentBookings.filter((booking:BookingType) => booking.status === "Completed").length
  const completionRate = Math.round((completedBookings / totalBookings) * 100)

  // Calculate average ticket price
  const avgTicketPrice = totalRevenue / totalTicketsSold



  // // Calculate most popular category
  // const categoryCount = recentBookings.reduce(
  //   (acc, event) => {
  //     acc[event.category] = (acc[event.category] || 0) + 1
  //     return acc
  //   },
  //   {} as Record<string, number>,
  // )

  // const mostPopularCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  }

  return (
    <motion.div className="container mx-auto p-6 space-y-8" variants={container} initial="hidden" animate="show">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your business performance.</p>
        </motion.div>

        <motion.div variants={item} className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value as Period)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      {/* Key Metrics */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" variants={container}>
        <MetricCard
          title="Total Bookings"
          value={totalBookings}
          description={`${completionRate}% completion rate`}
          icon={<Calendar className="h-5 w-5 text-purple-600" />}
          trend={+8}
          variants={item}
        />

        {totalRevenue>=0 && <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          description={`$${avgTicketPrice.toFixed(2)} avg. ticket price`}
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
          trend={+12}
          variants={item}
        />}

        {totalTicketsSold >= 0 && <MetricCard
          title="Tickets Sold"
          value={totalTicketsSold.toLocaleString()}
          description={`Across ${totalEventsHosted} events`}
          icon={<TicketCheck className="h-5 w-5 text-blue-600" />}
          trend={+5}
          variants={item}
        />}

        <MetricCard
          title="Events Hosted"
          value={totalEventsHosted}
          // description={`Most popular: ${mostPopularCategory}`}
          icon={<CalendarDays className="h-5 w-5 text-orange-600" />}
          trend={+2}
          variants={item}
        />
      </motion.div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        {/* <motion.div variants={item} className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
            <span>View Reports</span>
            <ChevronDown className="ml-1 h-4 w-4" />
          </button>
        </motion.div> */}

        <TabsContent value="overview" className="space-y-6">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={container}>
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Monthly revenue from all events</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart events={revenueDetails} />
                </CardContent>
              </Card>
            </motion.div>

            {recentBookings && <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Status</CardTitle>
                  <CardDescription>Distribution of booking statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingStatusChart bookings={recentBookings} />
                </CardContent>
              </Card>
            </motion.div>}

            {recentEvents && <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Sales by Event</CardTitle>
                  <CardDescription>Top 5 events by ticket sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <TicketSalesChart events={recentEvents} />
                </CardContent>
              </Card>
            </motion.div>}

            {recentEvents && <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Events by Category</CardTitle>
                  <CardDescription>Distribution of event categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventCategoryChart events={recentEvents} />
                </CardContent>
              </Card>
            </motion.div>
            }
          </motion.div>

          {recentBookings && recentEvents && <motion.div variants={item}>
            <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={container}>

              {/* <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentBookings bookings={recentBookings} events={recentEvents} />
                </CardContent>
              </Card> */}
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events scheduled in the near future</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingEvents events={recentEvents} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          }
        </TabsContent>

        <TabsContent value="bookings">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Booking Analytics</CardTitle>
                <CardDescription>Detailed booking statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed booking analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="events">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Event Analytics</CardTitle>
                <CardDescription>Detailed event statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed event analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="revenue">
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center">
                  <p className="text-muted-foreground">Detailed revenue analytics would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
