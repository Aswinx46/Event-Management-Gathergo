"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, X } from "lucide-react"

// Define the types for our props
interface FilterItem {
  _id: string
  title: string
  profileImage: string
}

interface FilterComponentProps {
  items: FilterItem[]
  onSelect: (item: FilterItem) => void
  title?: string
}

export default function FilterComponent({
  items = dummyFilterItems, // Default to dummy data
  onSelect,
  title = "Filter Options",
}: FilterComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const toggleFilter = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (item: FilterItem) => {
    setSelectedItems((prev) => {
      if (prev.includes(item._id)) {
        return prev.filter((id) => id !== item._id)
      } else {
        return [...prev, item._id]
      }
    })
    onSelect(item)
  }

  return (
    <div className="relative font-sans">
      {/* Filter Button */}
      <button
        onClick={toggleFilter}
        className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white shadow-lg transition-all hover:bg-gray-800"
      >
        <Filter size={18} />
        <span>Filter</span>
      </button>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 w-64 rounded-lg bg-gray-900 p-4 shadow-xl"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{title}</h3>
              <button
                onClick={toggleFilter}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <motion.div key={item._id} whileHover={{ x: 5 }} className="group">
                  <label className="flex cursor-pointer items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-gray-800">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item._id)}
                      onChange={() => handleSelect(item)}
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-purple-500 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0"
                    />
                    <span
                      className={`text-sm ${
                        selectedItems.includes(item._id) ? "font-medium text-purple-400" : "text-gray-300"
                      }`}
                    >
                      {item.title}
                    </span>
                  </label>
                </motion.div>
              ))}
            </div>

            {selectedItems.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex justify-between">
                <span className="text-xs text-gray-400">{selectedItems.length} selected</span>
                <button onClick={() => setSelectedItems([])} className="text-xs text-purple-400 hover:text-purple-300">
                  Clear all
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Dummy data for demonstration
const dummyFilterItems: FilterItem[] = [
  { _id: "1", title: "Price: Low to High", profileImage: "price_asc" },
  { _id: "2", title: "Price: High to Low", profileImage: "price_desc" },
  { _id: "3", title: "Newest First", profileImage: "newest" },
  { _id: "4", title: "Popularity", profileImage: "popularity" },
  { _id: "5", title: "Best Rated", profileImage: "rating" },
]
