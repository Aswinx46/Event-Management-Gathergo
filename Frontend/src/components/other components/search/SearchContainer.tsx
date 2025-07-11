
import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Search, X } from "lucide-react"

import { motion, AnimatePresence } from "framer-motion"
import { useDebounce } from "@/hooks/useDebounce"
import { CloudinaryPreset } from "@/utils/cloudinaryPresetFile"

interface SearchResult {
    _id: string
    title: string
    image: string
    category?: string
}

interface SearchModalProps {
    text: string
    setText: React.Dispatch<React.SetStateAction<string>>
    onSubmit: (query: string) => Promise<SearchResult[] | []>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen?: boolean
    handleOnClick: (id: string, title: string) => void
}

export default function SearchModal({ text, setText, onSubmit, setIsOpen, isOpen = true, handleOnClick }: SearchModalProps) {
    const [results, setResults] = useState<SearchResult[]>([])
    const [isSearching, setIsSearching] = useState(false)
    const [noResults, setNoResults] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const debouncedText = useDebounce(text, 1000)
    // Focus input when modal opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isOpen])

    const handleSearch = useCallback(async (query: string) => {
        if (!query.trim()) return

        setIsSearching(true)
        setNoResults(false)

        try {
            const searchResults = await onSubmit(query)
            setResults(searchResults)
            setNoResults(searchResults.length === 0)
        } catch (error) {
            console.error("Search error:", error)
            setResults([])
            setNoResults(true)
        } finally {
            setIsSearching(false)
        }
    }, [onSubmit])




    useEffect(() => {
        if (debouncedText.trim()) {
            const fetchData = async () => {
                // Directly call handleSearch here to avoid triggering infinite loop
                await handleSearch(debouncedText)
            }
            fetchData()
        }
    }, [debouncedText]) // Add handleSearch to the dependency array

    // Handle key press events
    // const handleKeyDown = (e: React.KeyboardEvent) => {
    //     if (e.key === "Enter") {
    //         handleSearch()
    //     } else if (e.key === "Escape") {
    //         setIsOpen(false)
    //     }
    // }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="fixed inset-0 bg-black/90"
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    <motion.div
                        className="relative z-10 w-full max-w-4xl px-4 sm:px-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.4, type: "spring", damping: 25 }}
                    >
                        <div className="flex flex-col items-center">
                            <motion.h1
                                className="mb-8 text-4xl font-bold text-white sm:text-5xl"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                Search...
                            </motion.h1>

                            <motion.div
                                className="relative mb-4 w-full"
                                initial={{ y: -10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    // onKeyDown={handleKeyDown}
                                    className="w-full border-b-2 border-gray-600 bg-transparent py-3 pr-12 text-lg text-white outline-none focus:border-white"
                                    placeholder="Search..."
                                />
                                <button
                                    onClick={() => handleSearch(debouncedText)}
                                    className="absolute right-0 top-2 rounded-md bg-white p-2 text-black transition-transform hover:scale-105"
                                >
                                    <Search className="h-5 w-5" />
                                </button>
                            </motion.div>

                            <motion.p
                                className="mb-8 text-sm text-gray-400"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Type above and press Enter or click the Search button to begin.
                            </motion.p>

                            <AnimatePresence>
                                {isSearching && (
                                    <motion.div
                                        className="mb-8 text-white"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        <div className="flex items-center space-x-2">
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            <span>Searching...</span>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {noResults && !isSearching && (
                                    <motion.div
                                        className="mb-8 text-white"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        No results found for "{text}"
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <AnimatePresence>
                                {results.length > 0 && (
                                    <motion.div
                                        className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {results?.map((result, index) => (
                                            <motion.div
                                                key={result._id}
                                                className="group cursor-pointer"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: index * 0.05,
                                                    type: "spring",
                                                    damping: 25,
                                                }}
                                                whileHover={{ y: -5 }}
                                                onClick={() => handleOnClick(result._id, result.title)}
                                            >
                                                <div className="relative mb-2 aspect-video overflow-hidden rounded-md">
                                                    <img
                                                        src={ CloudinaryPreset +result.image || "/placeholder.svg"}
                                                        alt={result.title}

                                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                                    />
                                                </div>
                                                <h3 className="text-center text-sm font-medium text-white">{result.title}</h3>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <motion.button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-0 text-white transition-transform hover:scale-110"
                            aria-label="Close search"
                            whileHover={{ rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="h-6 w-6" />
                        </motion.button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
