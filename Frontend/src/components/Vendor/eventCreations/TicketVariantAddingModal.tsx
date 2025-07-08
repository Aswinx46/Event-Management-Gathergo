"use client"
import { motion, AnimatePresence } from "framer-motion"
import type React from "react"

import { useState } from "react"
import { X, Plus, Trash2, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TicketType } from "@/types/EventType"



interface TicketVariantModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (tickets: TicketType[]) => void
    currentCreatedTickets?: TicketType[] | undefined
}

interface ValidationErrors {
    [key: string]: string
}

const initialTicket: TicketType = {
    ticketType: "",
    description: "",
    price: 0,
    maxCount: 1,
    buyedCount: 0,
    ticketLimitPerUser: 1
}

export default function TicketVariantModal({ isOpen, onClose, onSubmit, currentCreatedTickets }: TicketVariantModalProps) {
    const [tickets, setTickets] = useState<TicketType[]>(currentCreatedTickets || [initialTicket])
    const [errors, setErrors] = useState<ValidationErrors>({})

    const validateForm = (): boolean => {
        const newErrors: ValidationErrors = {}

        tickets.forEach((ticket, index) => {
            // Validate ticket type
            if (!ticket.ticketType.trim()) {
                newErrors[`tickets.${index}.ticketType`] = "Ticket type is required"
            } else if (ticket.ticketType.trim().length < 2) {
                newErrors[`tickets.${index}.ticketType`] = "Ticket type must be at least 2 characters"
            }

            // Validate description
            if (!ticket.description.trim()) {
                newErrors[`tickets.${index}.description`] = "Description is required"
            } else if (ticket.description.trim().length < 10) {
                newErrors[`tickets.${index}.description`] = "Description must be at least 10 characters"
            }

            // Validate price
            if (ticket.price < 0) {
                newErrors[`tickets.${index}.price`] = "Price must be positive"
            } else if (ticket.price === 0){
                  newErrors[`tickets.${index}.price`] = "Price cant be zero"
            }

                // Validate max count
                if (ticket.maxCount < 1) {
                    newErrors[`tickets.${index}.maxCount`] = "Max count must be at least 1"
                }

            // Validate purchased count
            if (ticket.ticketLimitPerUser < 0) {
                newErrors[`tickets.${index}.Ticket limit per user`] = "Ticket limit per user count cannot be negative"
            } else if (ticket.ticketLimitPerUser > ticket.maxCount) {
                newErrors[`tickets.${index}.Ticket limit per user`] = "Ticket limit per user count cannot exceed max count"
            }
        })

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(tickets)
            handleClose()
        }
    }

    const handleClose = () => {
        setTickets([initialTicket])
        setErrors({})
        onClose()
    }

    const updateTicket = (index: number, field: keyof TicketType, value: string | number) => {
        const updatedTickets = tickets.map((ticket, i) => {
            if (i === index) {
                return { ...ticket, [field]: value }
            }
            return ticket
        })
        setTickets(updatedTickets)

        // Clear error for this field when user starts typing
        const errorKey = `tickets.${index}.${field}`
        if (errors[errorKey]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[errorKey]
                return newErrors
            })
        }
    }

    const addTicket = () => {
        setTickets([...tickets, { ...initialTicket }])
    }

    const removeTicket = (index: number) => {
        if (tickets.length > 1) {
            const updatedTickets = tickets.filter((_, i) => i !== index)
            setTickets(updatedTickets)

            // Remove errors for the deleted ticket
            const newErrors = { ...errors }
            Object.keys(newErrors).forEach((key) => {
                if (key.startsWith(`tickets.${index}.`)) {
                    delete newErrors[key]
                }
                // Adjust error keys for tickets that moved up
                if (key.startsWith("tickets.") && Number.parseInt(key.split(".")[1]) > index) {
                    const parts = key.split(".")
                    const newIndex = Number.parseInt(parts[1]) - 1
                    const newKey = `tickets.${newIndex}.${parts[2]}`
                    newErrors[newKey] = newErrors[key]
                    delete newErrors[key]
                }
            })
            setErrors(newErrors)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Ticket className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-900">Create Ticket Variants</h2>
                                    <p className="text-sm text-gray-600">Add multiple ticket types for your event</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                            <form className="space-y-6">
                                <div className="space-y-6">
                                    {tickets.map((ticket, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-6 border border-gray-200 rounded-lg bg-gray-50/50 hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-medium text-gray-900">Ticket Variant {index + 1}</h3>
                                                {tickets.length > 1 && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => removeTicket(index)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor={`ticketType-${index}`}>Ticket Type *</Label>
                                                    <Input
                                                        id={`ticketType-${index}`}
                                                        value={ticket.ticketType}
                                                        onChange={(e) => updateTicket(index, "ticketType", e.target.value)}
                                                        placeholder="e.g., General Admission, VIP"
                                                        className={errors[`tickets.${index}.ticketType`] ? "border-red-500" : ""}
                                                    />
                                                    {errors[`tickets.${index}.ticketType`] && (
                                                        <div className="text-sm text-red-500">{errors[`tickets.${index}.ticketType`]}</div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`price-${index}`}>Price ($) *</Label>
                                                    <Input
                                                        id={`price-${index}`}
                                                        type="number"
                                                        step="0.01"
                                                        min="0"
                                                        value={ticket.price}
                                                        onChange={(e) => updateTicket(index, "price", Number.parseFloat(e.target.value) || 0)}
                                                        placeholder="0.00"
                                                        className={errors[`tickets.${index}.price`] ? "border-red-500" : ""}
                                                    />
                                                    {errors[`tickets.${index}.price`] && (
                                                        <div className="text-sm text-red-500">{errors[`tickets.${index}.price`]}</div>
                                                    )}
                                                </div>

                                                <div className="">
                                                    <Label htmlFor={`maxCount-${index}`}>Max Count *</Label>
                                                    <Input
                                                        id={`maxCount-${index}`}
                                                        type="number"
                                                        min="1"
                                                        value={ticket.maxCount}
                                                        onChange={(e) => updateTicket(index, "maxCount", Number.parseInt(e.target.value) || 1)}
                                                        placeholder="100"
                                                        className={errors[`tickets.${index}.maxCount`] ? "border-red-500" : ""}
                                                    />
                                                    {errors[`tickets.${index}.maxCount`] && (
                                                        <div className="text-sm text-red-500">{errors[`tickets.${index}.maxCount`]}</div>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor={`Ticket limit per user-${index}`}>Ticket limit per user</Label>
                                                    <Input
                                                        id={`Ticket limit per user-${index}`}
                                                        type="number"
                                                        min="0"
                                                        value={ticket.ticketLimitPerUser}
                                                        onChange={(e) =>
                                                            updateTicket(index, "ticketLimitPerUser", Number.parseInt(e.target.value) || 0)
                                                        }
                                                        placeholder="0"
                                                        className={errors[`tickets.${index}.Ticket limit per user`] ? "border-red-500" : ""}
                                                    />
                                                    {errors[`tickets.${index}.Ticket limit per user`] && (
                                                        <div className="text-sm text-red-500">{errors[`tickets.${index}.Ticket limit per user`]}</div>
                                                    )}
                                                </div>

                                                <div className="md:col-span-2 space-y-2">
                                                    <Label htmlFor={`description-${index}`}>Description *</Label>
                                                    <Textarea
                                                        id={`description-${index}`}
                                                        value={ticket.description}
                                                        onChange={(e) => updateTicket(index, "description", e.target.value)}
                                                        placeholder="Describe what's included with this ticket type..."
                                                        rows={3}
                                                        className={errors[`tickets.${index}.description`] ? "border-red-500" : ""}
                                                    />
                                                    {errors[`tickets.${index}.description`] && (
                                                        <div className="text-sm text-red-500">{errors[`tickets.${index}.description`]}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={addTicket}
                                            className="w-full border-dashed border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 text-gray-600 hover:text-blue-600 py-4 bg-transparent"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Add Another Ticket Variant
                                        </Button>
                                    </motion.div>
                                </div>

                                <div className="flex justify-end gap-3 pt-6 border-t">
                                    <Button type="button" variant="outline" onClick={handleClose} className="px-6 bg-transparent">
                                        Cancel
                                    </Button>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            type="button"
                                            onClick={handleSubmit}
                                            className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                                        >
                                            Create Ticket Variants
                                        </Button>
                                    </motion.div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
