import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { isBefore, startOfDay } from "date-fns";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { EventEntity } from "@/types/EventEntity";


interface EventEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventEntity | null;
  onSave: (event: EventEntity) => void;
}

export const EventEdit: React.FC<EventEditModalProps> = ({
  isOpen,
  onClose,
  event,
  onSave,
}) => {
  const [formData, setFormData] = useState<EventEntity | null>(event);

  // If no event is provided, close the modal
  if (!event) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: value } : null
    );
  };

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) =>
      prev ? { ...prev, [name]: parseFloat(value) } : null
    );
  };

  const handleDateSelect = (date: Date | Date[] | undefined) => {
    if (!date) return;
    if (Array.isArray(date)) {
      setFormData((prev) =>
        prev ? { ...prev, date } : null
      );
    } else {
      setFormData((prev) =>
        prev ? { ...prev, date: [date] } : null
      );
    }
  };

  const selectedDates = formData?.schedule.map((item) => item.date)

  // const handleRemoveDate = (dateToRemove: Date) => {
  //   if (!formData) return;
  //   console.log(typeof dateToRemove)
  //   const updatedDates = formData.date.filter(date => {
  //     return date !== dateToRemove
  //   }
  //   );

  //   setFormData({
  //     ...formData,
  //     date: updatedDates
  //   });
  // };

  // const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
  //   if (!formData) return;

  //   const [hour, minute] = value.split(":").map(Number);
  //   const newDate = new Date(formData[field]);
  //   newDate.setHours(hour);
  //   newDate.setMinutes(minute);

  //   setFormData({ ...formData, [field]: newDate });
  // };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) =>
      prev ? { ...prev, category: value } : null
    );
  };

  const handleStatusChange = (value: string) => {
    setFormData((prev) =>
      prev ? { ...prev, status: value as "upcoming" | "completed" | "cancelled" } : null
    );
  };

  const handleSubmit = () => {
    // if (formData) {
    //   onSave(formData);
    //   onClose();
    // }
    if (!formData) return;

    // const errors: string[] = [];

    // if (!formData.date || formData.date.length === 0) {
    //   errors.push("Please select at least one event date.");
    // }

    // if (formData.pricePerTicket <= 0) {
    //   errors.push("Price per ticket must be greater than 0.");
    // }

    // if (formData.totalTicket <= 0) {
    //   errors.push("Total tickets must be greater than 0.");
    // }

    // if (errors.length > 0) {
    //   toast.error(errors.join("\n"));
    //   return;
    // }

    onSave(formData);
    onClose();
  };

  // const formatTime = (date: Date) => {
  //   const hours = date.getHours().toString().padStart(2, '0');
  //   const minutes = date.getMinutes().toString().padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // };

  return (
    <AnimatePresence>
      {isOpen && formData && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white rounded-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <DialogHeader className="px-6 py-4 border-b">
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-xl font-semibold">Edit Event</DialogTitle>
                  <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="p-6 overflow-y-auto max-h-[70vh] space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium">Basic Information</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Title</label>
                    <Input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Event Title"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Event Description"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Venue Name</label>
                      <Input
                        name="venueName"
                        value={formData.venueName || ""}
                        onChange={handleInputChange}
                        placeholder="Venue Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Address</label>
                      <Input
                        name="address"
                        value={formData.address || ""}
                        onChange={handleInputChange}
                        placeholder="Address"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        value={formData.category}
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="music">Music</SelectItem>
                          <SelectItem value="art">Art</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="conference">Conference</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={formData.status}
                        onValueChange={handleStatusChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium">Date & Time</h3>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Event Date(s)</label>
                    <div className="flex flex-col space-y-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.schedule && formData.schedule.length > 0
                              ? formData.schedule.length > 1
                                ? `${formData.schedule.length} dates selected`
                                : format(formData.schedule[0].date, "PPP")
                              : "Pick dates"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="multiple"
                            selected={selectedDates}
                            onSelect={handleDateSelect}
                            disabled={(date) => isBefore(startOfDay(date), startOfDay(new Date()))}
                            showOutsideDays={false}
                            className={cn("p-3 pointer-events-auto")}
                            classNames={{
                              day_selected:
                                "bg-purple-600 text-white hover:bg-purple-700 rounded-full",
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Selected dates display with delete option */}
                  {/* {formData.date.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="text-sm font-medium">Selected Dates</label>
                      <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-slate-50">
                        {formData.date.map((date) => (
                          <motion.div
                            key={new Date(date).getTime()}
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Badge
                              className="pl-3 pr-2 py-1.5 bg-primary text-primary-foreground flex items-center gap-1 group hover:bg-primary/90"
                            >
                              <span>{format(date, "MMM d, yyyy")}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveDate(date)}
                                className="ml-1 rounded-full hover:bg-primary-foreground/20 p-0.5"
                                aria-label="Remove date"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )} */}

                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Start Time</label>
                      <Input
                        type="time"
                        value={formatTime(new Date(formData.startTime))}
                        onChange={(e) => handleTimeChange("startTime", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">End Time</label>
                      <Input
                        type="time"
                        value={formatTime(new Date(formData.endTime))}
                        onChange={(e) => handleTimeChange("endTime", e.target.value)}
                      />
                    </div>
                  </div> */}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-4"
                >
                  <h3 className="font-medium">Ticket Information</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Price per Ticket</label>
                      <Input
                        type="number"
                        name="pricePerTicket"
                        value={formData.pricePerTicket}
                        onChange={handleNumberChange}
                        disabled={true}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Max Tickets per User</label>
                      <Input
                        type="number"
                        name="maxTicketsPerUser"
                        value={formData.maxTicketsPerUser}
                        disabled={true}
                        onChange={handleNumberChange}
                        min="1"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Total Tickets</label>
                      <Input
                        type="number"
                        name="totalTicket"
                        value={formData.totalTicket}
                        disabled={true}
                        onChange={handleNumberChange}
                        min="1"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tickets Purchased</label>
                    <Input
                      type="number"
                      name="ticketPurchased"
                      value={formData.ticketPurchased}
                      onChange={handleNumberChange}
                      min="0"
                      disabled
                    />
                    <p className="text-xs text-gray-500">This field is read-only and shows the current number of purchased tickets.</p>
                  </div>
                </motion.div>
              </div>

              <DialogFooter className="px-6 py-4 border-t bg-gray-50">
                <motion.div
                  className="flex gap-2 w-full justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                  {event && event.status === 'upcoming' && < Button onClick={handleSubmit}>Save Changes</Button>}
                </motion.div>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog >
      )}
    </AnimatePresence >
  );
};

