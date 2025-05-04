"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface CountUpProps {
  value: number
  duration?: number
}

export default function CountUp({ value, duration = 2 }: CountUpProps) {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    setIsInView(true)
  }, [])

  const spring = useSpring(0, {
    stiffness: 80,
    damping: 20,
    duration,
  })

  const display = useTransform(spring, (current) => Math.floor(current).toLocaleString())

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, value, isInView])

  return <motion.span>{display}</motion.span>
}
