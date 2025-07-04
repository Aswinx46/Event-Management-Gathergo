import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock, Plus, X } from "lucide-react";
import { EventType } from "@/types/EventType";
import { toast } from "react-toastify";

interface ScheduleFormProps {
  dates: Date[];
  setDates: (dates: Date[]) => void;
  startTime: string;
  setStartTime: (time: string) => void;
  endTime: string;
  setEndTime: (time: string) => void;
  values: EventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  const [showAddCalendar, setShowAddCalendar] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>(undefined);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleAddDate = () => {
    setShowAddCalendar(true);
    setTempDate(undefined);
  };

  const isValidTime = (startTime: string, endTime: string) => {
    const [startHour, startMin] = startTime.split(":").map(Number);
    const [endHour, endMin] = endTime.split(":").map(Number);

    const today = new Date();

    const startDate = new Date(today);
    startDate.setHours(startHour, startMin, 0, 0);

    const endDate = new Date(today);
    endDate.setHours(endHour, endMin, 0, 0);

    return endDate > startDate;
  };


  const handleAddNewDate = () => {
    // if (tempDate) {
    //   setDates([...dates, tempDate]);
    //   setFieldValue("date", [...dates, tempDate]);
    //   setShowAddCalendar(false);
    //   setTempDate(undefined);
    // }
    if (tempDate) {
      const isAfterAllDates = dates.every(
        (existingDate) => tempDate > existingDate
      );

      if (!isAfterAllDates) {
        toast.error("New date must be after all existing dates.");
        return;
      }


      const newDates = [...dates, tempDate];
      setDates(newDates);
      setFieldValue("date", newDates);
      setShowAddCalendar(false);
      setTempDate(undefined);
    }
  };

  const handleRemoveDate = (index: number) => {
    const newDates = [...dates];
    newDates.splice(index, 1);
    setDates(newDates);
    setFieldValue("date", newDates); // sync with formik
  };

  const handleDateChange = (newDate: Date, index: number) => {
    const newDates = [...dates];
    newDates[index] = newDate;
    setDates(newDates);
    setFieldValue("date", newDates); // sync with formik
  };

  const calendarStyles = {
    day_selected: "bg-purple-600 text-white hover:bg-purple-700 font-bold rounded-full",
    day_today: "bg-purple-100 text-purple-900 font-semibold rounded-full",
    day: "h-9 w-9 p-0 font-normal hover:bg-purple-100 rounded-full focus:bg-purple-100",
    day_disabled: "text-gray-400 bg-gray-50 hover:bg-gray-50 cursor-not-allowed opacity-50",
    head_cell: "text-purple-900 font-semibold",
    caption: "flex justify-center pt-1 relative items-center text-purple-900 font-semibold",
    nav_button_previous: "absolute left-1 top-1 bg-transparent p-0 opacity-50 hover:opacity-100",
    nav_button_next: "absolute right-1 top-1 bg-transparent p-0 opacity-50 hover:opacity-100",
    table: "w-full border-collapse",
    head_row: "flex",
    cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-purple-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
    nav: "space-x-1 flex items-center",
    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    row: "flex w-full mt-2"
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
                    disabled={(date) => {
                      const currentDate = new Date(date);
                      currentDate.setHours(0, 0, 0, 0);
                      return currentDate < today;
                    }}
                    className="p-3 pointer-events-auto rounded-md border"
                    classNames={calendarStyles}
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

        <Popover open={showAddCalendar} onOpenChange={setShowAddCalendar}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddDate}
              className="mt-2"
            >
              <Plus size={16} className="mr-1" /> Add More Dates
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 z-50 bg-white" align="start">
            <div className="p-3">
              <Calendar
                mode="single"
                selected={tempDate}
                onSelect={setTempDate}
                initialFocus
                disabled={(date) => {
                  const currentDate = new Date(date);
                  currentDate.setHours(0, 0, 0, 0);
                  return currentDate < today;
                }}
                className="rounded-md border"
                classNames={calendarStyles}
              />
              <div className="flex justify-end mt-3 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddCalendar(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={handleAddNewDate}
                  disabled={!tempDate}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Add Date
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
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
              onChange={(e) => {
                if (isValidTime(startTime, endTime)) {
                  alert("End time must be after start time");
                  return;
                }
                setStartTime(e.target.value)
              }}
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
              onChange={(e) => {
                if (isValidTime(startTime, endTime)) {
                  alert("End time must be after start time");
                  return;
                }
                setStartTime(e.target.value)
              }}
              className="w-full"
            />
          </div>
        </motion.div>
      </div>

      {/* <motion.div variants={itemVariants} className="mb-6">
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
      </motion.div> */}
    </motion.div>
  );
};

export default React.memo(ScheduleForm);
