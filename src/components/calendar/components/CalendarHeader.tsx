
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

interface CalendarHeaderProps {
  currentDate: string;
  onNavigateDate: (direction: 'prev' | 'next') => void;
}

export const CalendarHeader = ({ currentDate, onNavigateDate }: CalendarHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm">
          Today
        </Button>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateDate('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="font-medium text-lg">{currentDate}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigateDate('next')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          Scheduled team
        </Button>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
};
