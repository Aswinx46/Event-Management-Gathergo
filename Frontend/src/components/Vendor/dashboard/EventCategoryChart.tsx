/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import type { EventEntity as EventType } from "@/types/EventEntity"

interface EventCategoryChartProps {
  events: EventType[]
}

export function EventCategoryChart({ events }: EventCategoryChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Count events by category
    const categoryCount: Record<string, number> = {}

    events.forEach((event) => {
      if (categoryCount[event.category]) {
        categoryCount[event.category]++
      } else {
        categoryCount[event.category] = 1
      }
    })

    // Convert to array format for Recharts
    const data = Object.entries(categoryCount).map(([category, count]) => ({
      name: category,
      value: count,
    }))

    setChartData(data)
  }, [events])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  return (
    <motion.div className="h-[300px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
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
            formatter={(value: number) => [value, "Events"]}
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
