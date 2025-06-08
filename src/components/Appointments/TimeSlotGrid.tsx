import React from 'react';

interface TimeSlotGridProps {
  timeSlots: string[];
}

export const TimeSlotGrid: React.FC<TimeSlotGridProps> = ({ timeSlots }) => {
  return (
    <div className="w-20 border-r flex-shrink-0 bg-white">
      <div className="h-16 border-b"></div>
      {timeSlots.map((time, index) => (
        <div key={index} className="h-[60px] border-b px-2 py-1 text-xs text-gray-500 flex items-start">
          {time}
        </div>
      ))}
    </div>
  );
};