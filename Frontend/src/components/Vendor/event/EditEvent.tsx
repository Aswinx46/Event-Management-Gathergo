
import { motion } from "framer-motion";
import { useState } from "react";
import { EventEntity } from "../../../types/EventEntity";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EventEditProps {
    event: EventEntity;
    onSave: (event: EventEntity) => void;
    onCancel: React.Dispatch<React.SetStateAction<boolean>>
}

const formAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
};

const inputAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
};

export const EventEdit = ({ event, onSave, onCancel }: EventEditProps) => {
    const [formData, setFormData] = useState<EventEntity>(event);
    console.log(event)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (field: keyof EventEntity, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <motion.form
            initial="hidden"
            animate="visible"
            variants={formAnimation}
            className="space-y-6 p-6 bg-white rounded-lg shadow-xl max-w-2xl mx-auto"
            onSubmit={handleSubmit}
        >
            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full"
                />
            </motion.div>

            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="w-full min-h-[100px]"
                />
            </motion.div>

            <motion.div variants={inputAnimation} className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="longitude">Longitude</Label>
                    <Input
                        id="longitude"
                        type="number"
                        value={formData.location.longitude}
                        onChange={(e) => handleChange("location", { ...formData.location, longitude: parseFloat(e.target.value) })}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="latitude">Latitude</Label>
                    <Input
                        id="latitude"
                        type="number"
                        value={formData.location.latitude}
                        onChange={(e) => handleChange("location", { ...formData.location, latitude: parseFloat(e.target.value) })}
                    />
                </div>
            </motion.div>

            <motion.div variants={inputAnimation} className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="pricePerTicket">Price per Ticket</Label>
                    <Input
                        id="pricePerTicket"
                        type="number"
                        value={formData.pricePerTicket}
                        onChange={(e) => handleChange("pricePerTicket", parseFloat(e.target.value))}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="maxTicketsPerUser">Max Tickets per User</Label>
                    <Input
                        id="maxTicketsPerUser"
                        type="number"
                        value={formData.maxTicketsPerUser}
                        onChange={(e) => handleChange("maxTicketsPerUser", parseInt(e.target.value))}
                    />
                </div>
            </motion.div>

            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="totalTicket">Total Tickets</Label>
                <Input
                    id="totalTicket"
                    type="number"
                    value={formData.totalTicket}
                    onChange={(e) => handleChange("totalTicket", parseInt(e.target.value))}
                />
            </motion.div>

            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    value={formData.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                />
            </motion.div>

            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="venueName">Venue Name</Label>
                <Input
                    id="venueName"
                    value={formData.venueName || ""}
                    onChange={(e) => handleChange("venueName", e.target.value)}
                />
            </motion.div>

            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="music">Music</SelectItem>
                        <SelectItem value="sports">Sports</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                </Select>
            </motion.div>

            <motion.div variants={inputAnimation} className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: "upcoming" | "completed" | "cancelled") => handleChange("status", value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
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
                    className="hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white transition-colors"
                >
                    Save Changes
                </Button>
            </motion.div>
        </motion.form>
    );
};
