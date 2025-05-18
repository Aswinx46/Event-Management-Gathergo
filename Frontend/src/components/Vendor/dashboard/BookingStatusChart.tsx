/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { BookingType } from "@/types/BookingType"

interface BookingStatusChartProps {
  bookings: BookingType[]
}

export function BookingStatusChart({ bookings }: BookingStatusChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Count bookings by status
    const statusCount: Record<string, number> = {}

    bookings.forEach((booking) => {
      if (statusCount[booking.status]) {
        statusCount[booking.status]++
      } else {
        statusCount[booking.status] = 1
      }
    })

    // Convert to array format for Recharts
    const data = Object.entries(statusCount).map(([status, count]) => ({
      name: status,
      value: count,
    }))

    setChartData(data)
  }, [bookings])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <motion.div className="h-[300px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            animationDuration={1000}
            animationBegin={200}
          >
            {chartData.map((_,index) => (
            
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [value, "Bookings"]}
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              border: "none",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
