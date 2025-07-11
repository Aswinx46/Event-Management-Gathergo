
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile"

interface CarouselItem {
  _id: string
  title: string
  image: string
}

interface ImageCarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
}

export default function ImageCarousel({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate visible indices based on current index
  const getVisibleIndices = () => {
    const indices = []
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + items.length) % items.length
      indices.push(index)
    }
    return indices
  }

  const visibleIndices = getVisibleIndices()

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoPlay) {
      interval = setInterval(() => {
        handleNext()
      }, autoPlayInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, currentIndex])

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  const getCardPosition = (index: number) => {
    const relativeIndex = visibleIndices.indexOf(index)
    if (relativeIndex === -1) return { x: 0, scale: 0, opacity: 0, zIndex: -1 }

    const offset = relativeIndex - 2
    const xPosition = offset * 220

    const scale = 1 - Math.abs(offset) * 0.1
    const opacity = 1 - Math.abs(offset) * 0.2

    return {
      x: xPosition,
      scale,
      opacity,
      zIndex: 5 - Math.abs(offset),
    }
  }
  const navigate = useNavigate()
  const handleSelectedCategory = (index: number, item: CarouselItem) => {
    setCurrentIndex(index)
    navigate(`/services/${item._id}/${item.title}`)
  }

  return (
    <div className="relative w-full bg-black py-12" ref={carouselRef}>
      <h1 className="text-3xl text-white text-center pb-6 font-medium">CATEGORIES</h1>

      <div className="relative h-[400px] w-full">
        <AnimatePresence>
          {items.map((item, index) => {
            const position = getCardPosition(index)
            return (
              <motion.div
                key={index}
                className="absolute left-1/2 top-0 h-[320px] w-[240px] cursor-pointer rounded-lg overflow-hidden"
                initial={{ x: position.x, scale: position.scale, opacity: position.opacity }}
                animate={{ x: position.x, scale: position.scale, opacity: position.opacity }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.5,
                }}
                onClick={() => handleSelectedCategory(index, item)}

                style={{
                  transformOrigin: "center center",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
                  marginLeft: "-120px",
                  zIndex: position.zIndex,
                }}
              >
                <div className="relative h-full w-full">
                  <img
                    src={CloudinaryPreset+item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="object-cover h-full w-full"
                  />
                </div>
                <motion.div
                  className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-white text-lg font-medium">{item.title}</h3>
                </motion.div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
      <div className="flex justify-center items-center gap-3">

        <h1 className="text-white relative font-medium text-xl text-center">FIND ALL CATEGORIES</h1>
        <Button onClick={()=>navigate('/categories')} className="h-9 bg-blue-700">SHOW</Button>
      </div>
      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-white w-4" : "bg-white/50"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

