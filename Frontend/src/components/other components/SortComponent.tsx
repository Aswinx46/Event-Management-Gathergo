"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronsUpDown, Check, X } from "lucide-react"

interface SortOption {
  key: string
  label: string
}

interface SortComponentProps {
  options: SortOption[]
  onSortSelect: (key: string) => void
  title?: string
}

export default function SortComponent({
  options,
  onSortSelect,
  title = "Sort By"
}: SortComponentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  const toggleSort = () => setIsOpen(!isOpen)

  const handleSelect = (option: SortOption) => {
    setSelectedKey(option.key)
    onSortSelect(option.key)
    setIsOpen(false)
  }

  const handleClear = () => {
    setSelectedKey(null)
    onSortSelect("") // clear sort
  }

  return (
    <div className="relative font-sans z-50">
      <button
        onClick={toggleSort}
        className="flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-white shadow-lg transition-all hover:bg-gray-800"
      >
        <ChevronsUpDown size={18} />
        <span>{selectedKey ? options.find(opt => opt.key === selectedKey)?.label : "Sort"}</span>
      </button>

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
                onClick={toggleSort}
                className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              {options.map((option) => (
                <motion.div key={option.key} whileHover={{ x: 5 }} className="group">
                  <button
                    onClick={() => handleSelect(option)}
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-gray-800 ${
                      selectedKey === option.key ? "text-purple-400 font-medium" : "text-gray-300"
                    }`}
                  >
                    <span>{option.label}</span>
                    {selectedKey === option.key && <Check size={16} />}
                  </button>
                </motion.div>
              ))}
            </div>

            {selectedKey && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex justify-between">
                <span className="text-xs text-gray-400">Selected: {options.find(opt => opt.key === selectedKey)?.label}</span>
                <button onClick={handleClear} className="text-xs text-purple-400 hover:text-purple-300">
                  Clear
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
