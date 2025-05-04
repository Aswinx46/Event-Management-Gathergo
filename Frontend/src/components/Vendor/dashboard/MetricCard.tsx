/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import CountUp from "./CountUp"

interface MetricCardProps {
  title: string
  value: number | string
  description: string
  icon: React.ReactNode
  trend?: number
  variants?: any
}

export function MetricCard({ title, value, description, icon, trend, variants }: MetricCardProps) {
  return (
    <motion.div variants={variants} whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="rounded-full bg-primary/10 p-2">{icon}</div>

            {trend !== undefined && (
              <div
                className={cn("flex items-center text-xs font-medium", trend > 0 ? "text-green-600" : "text-red-600")}
              >
                {trend > 0 ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                {Math.abs(trend)}%
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            <div className="mt-1 text-2xl font-bold">
              {typeof value === "number" ? <CountUp value={value} /> : value}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
