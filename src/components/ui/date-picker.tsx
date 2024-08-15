import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface DatePickerProps {
  value?: string | Date;
  onSelect?: (date: Date) => void;
}

export function DatePicker({ value, onSelect }: DatePickerProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  if (typeof value === "string") {
    value = value ? new Date(value) : undefined;
  }
  return (
    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
      <PopoverTrigger asChild>
        <Button variant={"outline"} className={cn("w-[193px] justify-between text-left font-normal", !value && "text-muted-foreground")}>
          {value ? format(value, "dd/MM/yyyy") : <span>Pick a date</span>}
          <CalendarIcon className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single" 
          selected={value}
          onSelect={(date) => {
            if (onSelect) {
              onSelect(date as Date);
              // close popover
              setCalendarOpen(false);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
