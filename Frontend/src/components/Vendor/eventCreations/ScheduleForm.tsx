
import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import {  ErrorMessage } from "formik";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, Plus, X } from "lucide-react";

interface ScheduleFormProps {
  dates: Date[];
  setDates: (dates: Date[]) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  values: any;
  setFieldValue: (field: string, value: any) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  dates,
  setDates,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  values,
  setFieldValue
}) => {
  const handleAddDate = () => {
    setDates([...dates, new Date()]);
  };

  const handleRemoveDate = (index: number) => {
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
  };

  const handleDateChange = (newDate: Date, index: number) => {
    const newDates = [...dates];
    newDates[index] = newDate;
    setDates(newDates);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <motion.h3 
        variants={itemVariants} 
        className="text-xl font-semibold mb-6 text-purple-800"
      >
        Event Schedule
      </motion.h3>
      
      <motion.div variants={itemVariants} className="mb-6">
        <Label className="block text-sm font-medium mb-2">
          Event Dates <span className="text-red-500">*</span>
        </Label>
        <div className="space-y-4">
          {dates.map((date, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-2"
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                    type="button"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && handleDateChange(newDate, index)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {dates.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDate(index)}
                  className="text-red-500"
                >
                  <X size={16} />
                </Button>
              )}
            </motion.div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleAddDate}
          className="mt-2"
        >
          <Plus size={16} className="mr-1" /> Add More Dates
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="mb-6">
          <Label htmlFor="startTime" className="block text-sm font-medium mb-1">
            Start Time <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="startTime"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full"
            />
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mb-6">
          <Label htmlFor="endTime" className="block text-sm font-medium mb-1">
            End Time <span className="text-red-500">*</span>
          </Label>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <Input
              id="endTime"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mb-6">
        <Label htmlFor="status" className="block text-sm font-medium mb-1">
          Event Status <span className="text-red-500">*</span>
        </Label>
        <Select
          defaultValue={values.status}
          onValueChange={(value) => {
            setFieldValue("status", value);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <ErrorMessage name="status" component="p" className="text-red-500 text-sm mt-1" />
      </motion.div>
    </motion.div>
  );
};

export default ScheduleForm;
