/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { EventEntity as EventType } from "@/types/EventEntity"

interface RevenueChartProps {
  events: EventType[]
}

export function RevenueChart({ events }: RevenueChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Process events to get monthly revenue data
    // const monthlyRevenue: Record<string, number> = {}

    // events.forEach((event) => {
    //   const month = new Date(event.startTime).toLocaleString("default", { month: "short" })
    //   const revenue = event.pricePerTicket * event.ticketPurchased

    //   if (monthlyRevenue[month]) {
    //     monthlyRevenue[month] += revenue
    //   } else {
    //     monthlyRevenue[month] = revenue
    //   }
    // })

    // // Convert to array format for Recharts
    // const data = Object.entries(monthlyRevenue).map(([month, revenue]) => ({
    //   month,
    //   revenue,
    // }))

    // // Sort by month
    // const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // data.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month))

    setChartData(events)
  }, [events])

  return (
    <motion.div className="h-[300px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "none",
            }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorRevenue)"
            strokeWidth={2}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
