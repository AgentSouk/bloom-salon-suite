import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { AppointmentCard } from './AppointmentCard';

interface TeamMember {
  id: number;
  name: string;
  initial: string;
  color: string;
}

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  memberId: number;
  startSlot: number;
  duration: number;
  status: string;
  position?: number;
}

interface TeamMemberColumnProps {
  member: TeamMember;
  timeSlots: string[];
  appointments: Appointment[];
  getAppointmentColor: (status: string) => string;
  getAppointmentWidth: (memberId: number, startSlot: number) => string;
  getAppointmentLeft: (position: number, totalCount: number) => string;
  calculateAppointmentPositions: (memberId: number, startSlot: number) => number;
  showCurrentTimeLine: boolean;
  currentTimePosition: number;
}

const TimeSlot: React.FC<{
  memberId: number;
  slotIndex: number;
  timeSlot: number;
}> = ({ memberId, slotIndex, timeSlot }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `${memberId}-${slotIndex}`,
    data: {
      type: 'time-slot',
      memberId,
      timeSlot,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`h-[60px] border-b border-gray-100 transition-colors relative ${
        isOver ? 'bg-blue-100 border-blue-300' : 'hover:bg-gray-50'
      }`}
    >
      {/* Grid snapping indicators */}
      {isOver && (
        <div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-0.5">
          <div className="bg-blue-200 border border-blue-400 rounded opacity-50"></div>
          <div className="bg-blue-200 border border-blue-400 rounded opacity-50"></div>
          <div className="bg-blue-200 border border-blue-400 rounded opacity-50"></div>
          <div className="bg-blue-200 border border-blue-400 rounded opacity-50"></div>
        </div>
      )}
    </div>
  );
};

export const TeamMemberColumn: React.FC<TeamMemberColumnProps> = ({
  member,
  timeSlots,
  appointments,
  getAppointmentColor,
  getAppointmentWidth,
  getAppointmentLeft,
  calculateAppointmentPositions,
  showCurrentTimeLine,
  currentTimePosition,
}) => {
  return (
    <div className="flex-1 min-w-40 border-r bg-white">
      {/* Header */}
      <div className="h-16 border-b p-3 text-center cursor-pointer transition-colors hover:bg-gray-50">
        <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-sm font-medium mx-auto mb-1`}>
          {member.initial}
        </div>
        <div className="text-xs font-medium text-gray-900 truncate">{member.name}</div>
      </div>

      {/* Time slots container */}
      <div className="relative">
        {/* Time slots */}
        {timeSlots.map((_, slotIndex) => (
          <TimeSlot
            key={slotIndex}
            memberId={member.id}
            slotIndex={slotIndex}
            timeSlot={slotIndex / 4}
          />
        ))}

        {/* Current time line */}
        {showCurrentTimeLine && (
          <div 
            className="absolute left-0 right-0 h-0.5 bg-red-500 z-20 pointer-events-none"
            style={{
              top: `${currentTimePosition}px`,
            }}
          >
            <div className="absolute -left-1 -top-1 w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
        )}

        {/* Appointments */}
        {appointments.map((appointment) => {
          const totalAtSlot = calculateAppointmentPositions(member.id, appointment.startSlot);
          const width = getAppointmentWidth(member.id, appointment.startSlot);
          const left = getAppointmentLeft(appointment.position || 0, totalAtSlot);

          return (
            <div
              key={appointment.id}
              style={{
                top: `${appointment.startSlot * 60}px`,
                height: `${appointment.duration * 30}px`,
              }}
              className="absolute inset-x-1"
            >
              <AppointmentCard
                appointment={appointment}
                colorClass={getAppointmentColor(appointment.status)}
                width={width}
                left={left}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};