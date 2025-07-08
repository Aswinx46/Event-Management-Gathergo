
import React, { useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, Plus, X } from "lucide-react";
import { toast } from "react-toastify";
import { EventType } from "@/types/EventType";
import { ScheduleItem } from "@/types/ScheduleItemType";



interface ScheduleFormProps {
  schedule: ScheduleItem[];
  setSchedule: React.Dispatch<React.SetStateAction<ScheduleItem[]>>;
  values: EventType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any) => void;
}

const ScheduleForm: React.FC<ScheduleFormProps> = ({
  schedule,
  setSchedule,
  setFieldValue
}) => {
  const [showAddCalendar, setShowAddCalendar] = useState(false);
  const [tempDate, setTempDate] = useState<Date | undefined>();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const calendarStyles = { /* custom classNames here */ };

  const isValidTime = (start: string, end: string) => {
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const s = new Date(); s.setHours(sh, sm);
    const e = new Date(); e.setHours(eh, em);
    return e > s;
  };

  const handleAddNewSchedule = () => {
    if (!tempDate) return;

    const duplicate = schedule.some(s => s.date.toDateString() === tempDate.toDateString());
    if (duplicate) {
      toast.error("Date already added.");
      return;
    }

    const newSchedule = [...schedule, { date: tempDate, startTime: "", endTime: "" }];
    setSchedule(newSchedule);
    setFieldValue("schedule", newSchedule);
    setShowAddCalendar(false);
    setTempDate(undefined);
  };

  const handleDateChange = (date: Date, index: number) => {
    const updated = [...schedule];
    updated[index].date = date;
    setSchedule(updated);
    setFieldValue("schedule", updated);
  };

  const handleTimeChange = (index: number, field: "startTime" | "endTime", value: string) => {
    const updated = [...schedule];
    updated[index][field] = value;

    if (updated[index].startTime && updated[index].endTime && !isValidTime(updated[index].startTime, updated[index].endTime)) {
      toast.error("End time must be after start time");
      return;
    }

    setSchedule(updated);
    setFieldValue("schedule", updated);
  };

  const handleRemove = (index: number) => {
    const updated = [...schedule];
    updated.splice(index, 1);
    setSchedule(updated);
    setFieldValue("schedule", updated);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <h3 className="text-xl font-semibold mb-6 text-purple-800">Event Schedule</h3>

      {schedule.map((item, index) => (
        <div key={index} className="mb-6 border rounded-lg p-4">
          <div className="flex items-center gap-4 mb-3">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" type="button" className="w-full justify-start">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {item.date ? format(item.date, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={item.date}
                  onSelect={(date) => date && handleDateChange(date, index)}
                  disabled={(d) => d < today}
                  className="rounded-md border"
                  classNames={calendarStyles}
                />
              </PopoverContent>
            </Popover>

            {schedule.length > 1 && (
              <Button type="button" variant="ghost" size="icon" onClick={() => handleRemove(index)} className="text-red-500">
                <X size={16} />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Start Time</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={item.startTime}
                  onChange={(e) => handleTimeChange(index, "startTime", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>End Time</Label>
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="time"
                  value={item.endTime}
                  onChange={(e) => handleTimeChange(index, "endTime", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Popover open={showAddCalendar} onOpenChange={setShowAddCalendar}>
        <PopoverTrigger asChild>
          <Button variant="outline" type="button" onClick={() => setShowAddCalendar(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add More Dates
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 z-50" align="start">
          <div className="p-3">
            <Calendar
              mode="single"
              selected={tempDate}
              onSelect={setTempDate}
              disabled={(d) => d < today}
              className="rounded-md border"
              classNames={calendarStyles}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowAddCalendar(false)}>Cancel</Button>
              <Button onClick={handleAddNewSchedule} className="bg-purple-600 hover:bg-purple-700 text-white">
                Add Date
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </motion.div>
  );
};

export default React.memo(ScheduleForm);
