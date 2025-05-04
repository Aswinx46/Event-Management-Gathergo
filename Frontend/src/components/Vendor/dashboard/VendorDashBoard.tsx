"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, DollarSign, TicketCheck, CalendarDays, ChevronDown } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { BookingType } from "@/types/BookingType"
import { EventEntity as EventType } from "@/types/EventEntity"
import { MetricCard } from "./MetricCard"
import { RevenueChart } from "./RevenueChart"
import { BookingStatusChart } from "./BookingStatusChart"
import { TicketSalesChart } from "./TicketSalesChart"
import { EventCategoryChart } from "./EventCategoryChart"
import { RecentBookings } from "./RecentBookings"
import { UpcomingEvents } from "./UpcomingEvents"

// Mock data for demonstration
const mockEvents: EventType[] = [
  {
    _id: "1",
    title: "Summer Music Festival",
    description: "A 3-day music festival featuring top artists",
    location: {
      type: "Point",
      coordinates: [40.7128, -74.006],
    },
    startTime: new Date("2023-07-15T18:00:00"),
    endTime: new Date("2023-07-17T23:00:00"),
    posterImage: ["/placeholder.svg?height=400&width=600"],
    pricePerTicket: 150,
    maxTicketsPerUser: 4,
    totalTicket: 5000,
    date: [new Date("2023-07-15"), new Date("2023-07-16"), new Date("2023-07-17")],
    createdAt: new Date("2023-05-01"),
    ticketPurchased: 4200,
    address: "Central Park, New York",
    venueName: "Central Park",
    category: "Music",
    hostedBy: "NYC Events",
    status: "completed",
  },
  {
    _id: "2",
    title: "Tech Conference 2023",
    description: "Annual tech conference with workshops and keynotes",
    location: {
      type: "Point",
      coordinates: [37.7749, -122.4194],
    },
    startTime: new Date("2023-09-10T09:00:00"),
    endTime: new Date("2023-09-12T17:00:00"),
    posterImage: ["/placeholder.svg?height=400&width=600"],
    pricePerTicket: 299,
    maxTicketsPerUser: 2,
    totalTicket: 2000,
    date: [new Date("2023-09-10"), new Date("2023-09-11"), new Date("2023-09-12")],
    createdAt: new Date("2023-06-15"),
    ticketPurchased: 1850,
    address: "Moscone Center, San Francisco",
    venueName: "Moscone Center",
    category: "Technology",
    hostedBy: "TechEvents Inc",
    status: "upcoming",
  },
  {
    _id: "3",
    title: "Food & Wine Festival",
    description: "Taste the best food and wine from local restaurants",
    location: {
      type: "Point",
      coordinates: [34.0522, -118.2437],
    },
    startTime: new Date("2023-08-05T12:00:00"),
    endTime: new Date("2023-08-06T20:00:00"),
    posterImage: ["/placeholder.svg?height=400&width=600"],
    pricePerTicket: 85,
    maxTicketsPerUser: 6,
    totalTicket: 3000,
    date: [new Date("2023-08-05"), new Date("2023-08-06")],
    createdAt: new Date("2023-05-20"),
    ticketPurchased: 2700,
    address: "Grand Park, Los Angeles",
    venueName: "Grand Park",
    category: "Food",
    hostedBy: "LA Culinary Events",
    status: "completed",
  },
  {
    _id: "4",
    title: "Business Leadership Summit",
    description: "Connect with industry leaders and learn new strategies",
    location: {
      type: "Point",
      coordinates: [41.8781, -87.6298],
    },
    startTime: new Date("2023-10-20T08:00:00"),
    endTime: new Date("2023-10-21T17:00:00"),
    posterImage: ["/placeholder.svg?height=400&width=600"],
    pricePerTicket: 350,
    maxTicketsPerUser: 1,
    totalTicket: 1000,
    date: [new Date("2023-10-20"), new Date("2023-10-21")],
    createdAt: new Date("2023-07-10"),
    ticketPurchased: 750,
    address: "Chicago Convention Center",
    venueName: "Chicago Convention Center",
    category: "Business",
    hostedBy: "Business Leaders Network",
    status: "upcoming",
  },
  {
    _id: "5",
    title: "Art Exhibition Opening",
    description: "Opening night for contemporary art exhibition",
    location: {
      type: "Point",
      coordinates: [25.7617, -80.1918],
    },
    startTime: new Date("2023-08-25T19:00:00"),
    endTime: new Date("2023-08-25T22:00:00"),
    posterImage: ["/placeholder.svg?height=400&width=600"],
    pricePerTicket: 45,
    maxTicketsPerUser: 4,
    totalTicket: 500,
    date: [new Date("2023-08-25")],
    createdAt: new Date("2023-07-01"),
    ticketPurchased: 450,
    address: "Miami Art Museum",
    venueName: "Miami Art Museum",
    category: "Art",
    hostedBy: "Miami Arts Council",
    status: "completed",
  },
]

const mockBookings: BookingType[] = [
  {
    _id: "1",
    serviceId: "1",
    clientId: "client1",
    vendorId: "vendor1",
    date: [new Date("2023-07-15")],
    email: "john@example.com",
    phone: 1234567890,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Completed",
    createdAt: new Date("2023-06-20"),
    isComplete: true,
  },
  {
    _id: "2",
    serviceId: "2",
    clientId: "client2",
    vendorId: "vendor1",
    date: [new Date("2023-09-10")],
    email: "sarah@example.com",
    phone: 2345678901,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Pending",
    createdAt: new Date("2023-08-15"),
    isComplete: false,
  },
  {
    _id: "3",
    serviceId: "3",
    clientId: "client3",
    vendorId: "vendor1",
    date: [new Date("2023-08-05")],
    email: "mike@example.com",
    phone: 3456789012,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Completed",
    createdAt: new Date("2023-07-10"),
    isComplete: true,
  },
  {
    _id: "4",
    serviceId: "4",
    clientId: "client4",
    vendorId: "vendor1",
    date: [new Date("2023-10-20")],
    email: "lisa@example.com",
    phone: 4567890123,
    vendorApproval: "Pending",
    paymentStatus: "Pending",
    status: "Pending",
    createdAt: new Date("2023-09-05"),
    isComplete: false,
  },
  {
    _id: "5",
    serviceId: "5",
    clientId: "client5",
    vendorId: "vendor1",
    date: [new Date("2023-08-25")],
    email: "david@example.com",
    phone: 5678901234,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Completed",
    createdAt: new Date("2023-08-01"),
    isComplete: true,
  },
  {
    _id: "6",
    serviceId: "1",
    clientId: "client6",
    vendorId: "vendor1",
    date: [new Date("2023-07-16")],
    email: "emma@example.com",
    phone: 6789012345,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Completed",
    createdAt: new Date("2023-06-25"),
    isComplete: true,
  },
  {
    _id: "7",
    serviceId: "2",
    clientId: "client7",
    vendorId: "vendor1",
    date: [new Date("2023-09-11")],
    email: "james@example.com",
    phone: 7890123456,
    vendorApproval: "Rejected",
    paymentStatus: "Refunded",
    rejectionReason: "Double booking",
    status: "Rejected",
    createdAt: new Date("2023-08-20"),
    isComplete: false,
  },
  {
    _id: "8",
    serviceId: "3",
    clientId: "client8",
    vendorId: "vendor1",
    date: [new Date("2023-08-06")],
    email: "olivia@example.com",
    phone: 8901234567,
    vendorApproval: "Approved",
    paymentStatus: "Successfull",
    status: "Completed",
    createdAt: new Date("2023-07-15"),
    isComplete: true,
  },
]

export default function VendorDashboard() {
  const [timeRange, setTimeRange] = useState("all")

  // Calculate metrics
  const totalBookings = mockBookings.length
  const totalRevenue = mockEvents.reduce((sum, event) => sum + event.pricePerTicket * event.ticketPurchased, 0)
  const totalTicketsSold = mockEvents.reduce((sum, event) => sum + event.ticketPurchased, 0)
  const totalEventsHosted = mockEvents.length

  // Calculate completion rate
  const completedBookings = mockBookings.filter((booking) => booking.status === "Completed").length
  const completionRate = Math.round((completedBookings / totalBookings) * 100)

  // Calculate average ticket price
  const avgTicketPrice = totalRevenue / totalTicketsSold

  // Calculate most popular category
  const categoryCount = mockEvents.reduce(
    (acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const mostPopularCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0]

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
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
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

        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          description={`$${avgTicketPrice.toFixed(2)} avg. ticket price`}
          icon={<DollarSign className="h-5 w-5 text-green-600" />}
          trend={+12}
          variants={item}
        />

        <MetricCard
          title="Tickets Sold"
          value={totalTicketsSold.toLocaleString()}
          description={`Across ${totalEventsHosted} events`}
          icon={<TicketCheck className="h-5 w-5 text-blue-600" />}
          trend={+5}
          variants={item}
        />

        <MetricCard
          title="Events Hosted"
          value={totalEventsHosted}
          description={`Most popular: ${mostPopularCategory}`}
          icon={<CalendarDays className="h-5 w-5 text-orange-600" />}
          trend={+2}
          variants={item}
        />
      </motion.div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <motion.div variants={item} className="flex justify-between items-center">
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
        </motion.div>

        <TabsContent value="overview" className="space-y-6">
          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={container}>
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Over Time</CardTitle>
                  <CardDescription>Monthly revenue from all events</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart events={mockEvents} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Status</CardTitle>
                  <CardDescription>Distribution of booking statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <BookingStatusChart bookings={mockBookings} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Sales by Event</CardTitle>
                  <CardDescription>Top 5 events by ticket sales</CardDescription>
                </CardHeader>
                <CardContent>
                  <TicketSalesChart events={mockEvents} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Events by Category</CardTitle>
                  <CardDescription>Distribution of event categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <EventCategoryChart events={mockEvents} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-6" variants={container}>
            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest booking activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentBookings bookings={mockBookings} events={mockEvents} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Events scheduled in the near future</CardDescription>
                </CardHeader>
                <CardContent>
                  <UpcomingEvents events={mockEvents} />
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
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
