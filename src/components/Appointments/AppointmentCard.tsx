import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  status: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  colorClass: string;
  width: string;
  left?: string;
  isDragging?: boolean;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  colorClass,
  width,
  left = "0%",
  isDragging = false
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging: isCurrentlyDragging,
  } = useDraggable({
    id: appointment.id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    width,
    left,
    opacity: isCurrentlyDragging ? 0.5 : 1,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  if (appointment.status === "completed") {
    return (
      <div
        className={`absolute ${colorClass} text-xs p-2 rounded border shadow-sm z-10 overflow-hidden`}
        style={{ width, left }}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`absolute ${colorClass} text-xs p-2 rounded border shadow-sm cursor-grab hover:opacity-90 transition-opacity z-10 overflow-hidden select-none`}
    >
      <div className="font-medium text-xs leading-tight break-words">{appointment.time}</div>
      <div className="text-xs leading-tight break-words overflow-hidden">{appointment.clientName}</div>
      <div className="text-xs leading-tight break-words overflow-hidden opacity-75">{appointment.service}</div>
    </div>
  );
};