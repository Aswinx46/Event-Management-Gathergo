/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import type { EventEntity as EventType } from "@/types/EventEntity"

interface TicketSalesChartProps {
  events: EventType[]
}

export function TicketSalesChart({ events }: TicketSalesChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Get top 5 events by ticket sales
    const sortedEvents = [...events].sort((a, b) => b.ticketPurchased - a.ticketPurchased).slice(0, 5)

    // Format data for chart
    const data = sortedEvents.map((event) => ({
      name: event.title.length > 20 ? event.title.substring(0, 20) + "..." : event.title,
      sales: event.ticketPurchased,
      total: event.totalTicket,
    }))

    setChartData(data)
  }, [events])

  return (
    <motion.div className="h-[300px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 30 }} barSize={20}>
          <XAxis
            dataKey="name"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              value.toLocaleString(),
              name === "sales" ? "Tickets Sold" : "Total Tickets",
            ]}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "none",
            }}
          />
          <Bar dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
