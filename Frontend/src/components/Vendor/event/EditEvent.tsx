import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { EventEntity } from "@/types/EventEntity";
import { X } from "lucide-react";

interface EventEditProps {
    event: EventEntity;
    onSave: (event: EventEntity) => void;
    onCancel: (value: boolean) => void;
    isOpen: boolean;
}

const formAnimation = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.2,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.2
        }
    }
};

const inputAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export const EventEdit = ({ event, onSave, onCancel, isOpen }: EventEditProps) => {
    const [formData, setFormData] = useState<EventEntity>(event);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof EventEntity, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => onCancel(false)}
                className="absolute inset-0"
            />

            <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formAnimation}
                className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
                <motion.form
                    className="space-y-6 p-6 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl"
                    onSubmit={handleSubmit}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-white">Edit Event</h2>
                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => onCancel(false)}
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="title" className="text-zinc-300">Title</Label>
                        <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => handleChange("title", e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </motion.div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="description" className="text-zinc-300">Description</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white min-h-[100px]"
                        />
                    </motion.div>

                    <motion.div variants={inputAnimation} className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="longitude" className="text-zinc-300">Longitude</Label>
                            <Input
                                id="longitude"
                                type="number"
                                value={formData.location.longitude}
                                onChange={(e) => handleChange("location", { ...formData.location, longitude: parseFloat(e.target.value) })}
                                className="bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="latitude" className="text-zinc-300">Latitude</Label>
                            <Input
                                id="latitude"
                                type="number"
                                value={formData.location.latitude}
                                onChange={(e) => handleChange("location", { ...formData.location, latitude: parseFloat(e.target.value) })}
                                className="bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={inputAnimation} className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="pricePerTicket" className="text-zinc-300">Price per Ticket</Label>
                            <Input
                                id="pricePerTicket"
                                type="number"
                                value={formData.pricePerTicket}
                                onChange={(e) => handleChange("pricePerTicket", parseFloat(e.target.value))}
                                className="bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="maxTicketsPerUser" className="text-zinc-300">Max Tickets per User</Label>
                            <Input
                                id="maxTicketsPerUser"
                                type="number"
                                value={formData.maxTicketsPerUser}
                                onChange={(e) => handleChange("maxTicketsPerUser", parseInt(e.target.value))}
                                className="bg-zinc-800 border-zinc-700 text-white"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="totalTicket" className="text-zinc-300">Total Tickets</Label>
                        <Input
                            id="totalTicket"
                            type="number"
                            value={formData.totalTicket}
                            onChange={(e) => handleChange("totalTicket", parseInt(e.target.value))}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </motion.div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="address" className="text-zinc-300">Address</Label>
                        <Input
                            id="address"
                            value={formData.address || ""}
                            onChange={(e) => handleChange("address", e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </motion.div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="venueName" className="text-zinc-300">Venue Name</Label>
                        <Input
                            id="venueName"
                            value={formData.venueName || ""}
                            onChange={(e) => handleChange("venueName", e.target.value)}
                            className="bg-zinc-800 border-zinc-700 text-white"
                        />
                    </motion.div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="category" className="text-zinc-300">Category</Label>
                        <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="conference">Conference</SelectItem>
                                <SelectItem value="workshop">Workshop</SelectItem>
                                <SelectItem value="concert">Concert</SelectItem>
                                <SelectItem value="festival">Festival</SelectItem>
                                <SelectItem value="networking">Networking</SelectItem>
                                <SelectItem value="exhibition">Exhibition</SelectItem>
                                <SelectItem value="sports">Sports</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    <motion.div variants={inputAnimation} className="space-y-2">
                        <Label htmlFor="status" className="text-zinc-300">Status</Label>
                        <Select value={formData.status} onValueChange={(value: "upcoming" | "completed" | "cancelled") => handleChange("status", value)}>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700">
                                <SelectItem value="upcoming">Upcoming</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                        </Select>
                    </motion.div>

                    <motion.div
                        variants={inputAnimation}
                        className="flex justify-end space-x-4 pt-6"
                    >
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onCancel(false)}
                            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            Save Changes
                        </Button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </div>
    );
};
