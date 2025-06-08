import React, { useState, useRef, useCallback } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { AppointmentsHeader } from './AppointmentsHeader';
import { AppointmentCard } from './AppointmentCard';
import { TimeSlotGrid } from './TimeSlotGrid';
import { TeamMemberColumn } from './TeamMemberColumn';

const teamMembers = [
  { id: 1, name: "Maasam branch", initial: "M", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Jenny", initial: "J", color: "bg-purple-100 text-purple-700" },
  { id: 3, name: "Emy", initial: "E", color: "bg-green-100 text-green-700" },
  { id: 4, name: "Nadeen", initial: "N", color: "bg-pink-100 text-pink-700" },
  { id: 5, name: "Raghe", initial: "R", color: "bg-orange-100 text-orange-700" },
  { id: 6, name: "Rawan", initial: "R", color: "bg-teal-100 text-teal-700" },
  { id: 7, name: "Jannat", initial: "J", color: "bg-indigo-100 text-indigo-700" },
  { id: 8, name: "Areej", initial: "A", color: "bg-red-100 text-red-700" },
  { id: 9, name: "Samar", initial: "S", color: "bg-yellow-100 text-yellow-700" },
];

const timeSlots = Array.from({ length: 59 }, (_, i) => {
  const hour = Math.floor(i / 4) + 9;
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const SLOT_HEIGHT = 60;

interface Appointment {
  id: string;
  clientName: string;
  service: string;
  time: string;
  memberId: number;
  startSlot: number;
  duration: number;
  status: string;
  position?: number; // 0-3 for horizontal position within team member column
}

const sampleAppointments: Appointment[] = [
  {
    id: "1",
    clientName: "Sarah Johnson",
    service: "Gel Manicure",
    time: "10:15 - 11:15",
    memberId: 4,
    startSlot: 2.25,
    duration: 2,
    status: "upcoming",
    position: 0
  },
  {
    id: "2",
    clientName: "Emma Davis",
    service: "Classic Pedicure",
    time: "10:15 - 11:15",
    memberId: 4,
    startSlot: 2.25,
    duration: 2,
    status: "upcoming",
    position: 1
  },
  {
    id: "3",
    clientName: "Michael Brown",
    service: "Haircut & Beard Trim",
    time: "11:30 - 12:10",
    memberId: 1,
    startSlot: 3.5,
    duration: 1.3,
    status: "started",
    position: 0
  },
  {
    id: "4",
    clientName: "Lisa Chen",
    service: "Classic Manicure",
    time: "11:30 - 12:30",
    memberId: 5,
    startSlot: 3.5,
    duration: 2,
    status: "started",
    position: 0
  },
  {
    id: "5",
    clientName: "Amanda White",
    service: "Classic Pedicure",
    time: "11:30 - 12:30",
    memberId: 5,
    startSlot: 3.5,
    duration: 2,
    status: "started",
    position: 1
  },
];

const AppointmentsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOverlay, setDragOverlay] = useState<Appointment | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const getAppointmentColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-yellow-200 text-yellow-800 border-yellow-300";
      case "started": 
        return "bg-green-200 text-green-800 border-green-300";
      case "completed":
        return "bg-gray-200 text-gray-600 border-gray-300";
      default:
        return "bg-gray-200 text-gray-600 border-gray-300";
    }
  };

  const calculateAppointmentPositions = (memberId: number, startSlot: number) => {
    const conflictingAppointments = appointments.filter(
      apt => apt.memberId === memberId && 
      Math.abs(apt.startSlot - startSlot) < 0.5 // Same time slot (within 30 minutes)
    );
    
    return conflictingAppointments.length;
  };

  const getAppointmentWidth = (memberId: number, startSlot: number) => {
    const conflictCount = calculateAppointmentPositions(memberId, startSlot);
    if (conflictCount <= 1) return "100%";
    if (conflictCount === 2) return "50%";
    if (conflictCount === 3) return "33.333%";
    return "25%";
  };

  const getAppointmentLeft = (position: number, totalCount: number) => {
    if (totalCount <= 1) return "0%";
    if (totalCount === 2) return position === 0 ? "0%" : "50%";
    if (totalCount === 3) return `${position * 33.333}%`;
    return `${position * 25}%`;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
    
    const appointment = appointments.find(apt => apt.id === active.id);
    if (appointment) {
      setDragOverlay(appointment);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setDragOverlay(null);
      return;
    }

    const appointmentId = active.id as string;
    const dropData = over.data.current;

    if (dropData && dropData.type === 'time-slot') {
      const { memberId, timeSlot } = dropData;
      
      setAppointments(prev => prev.map(apt => {
        if (apt.id === appointmentId) {
          // Calculate new position based on existing appointments
          const existingAtSlot = prev.filter(
            a => a.memberId === memberId && 
            Math.abs(a.startSlot - timeSlot) < 0.5 &&
            a.id !== appointmentId
          );
          
          return {
            ...apt,
            memberId,
            startSlot: timeSlot,
            position: existingAtSlot.length
          };
        }
        return apt;
      }));
    }

    setActiveId(null);
    setDragOverlay(null);
  };

  const getCurrentTimePosition = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    const startHour = 9;
    const hoursSinceStart = currentHour - startHour;
    const minutesFraction = currentMinute / 60;
    const totalHours = hoursSinceStart + minutesFraction;
    
    return totalHours * 60;
  };

  const currentTimePosition = getCurrentTimePosition();
  const showCurrentTimeLine = currentTimePosition >= 0 && currentTimePosition <= (timeSlots.length * 60);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <AppointmentsHeader 
        currentDate={currentDate} 
        onDateChange={setCurrentDate} 
      />
      
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex-1 overflow-auto">
          <div className="flex min-h-full">
            {/* Time column */}
            <div className="w-20 border-r flex-shrink-0 bg-white">
              <div className="h-16 border-b"></div>
              {timeSlots.map((time, index) => (
                <div key={index} className="h-[60px] border-b px-2 py-1 text-xs text-gray-500 flex items-start">
                  {time}
                </div>
              ))}
            </div>

            {/* Team members columns */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex min-w-full">
                {teamMembers.map((member) => (
                  <TeamMemberColumn
                    key={member.id}
                    member={member}
                    timeSlots={timeSlots}
                    appointments={appointments.filter(apt => apt.memberId === member.id)}
                    getAppointmentColor={getAppointmentColor}
                    getAppointmentWidth={getAppointmentWidth}
                    getAppointmentLeft={getAppointmentLeft}
                    calculateAppointmentPositions={calculateAppointmentPositions}
                    showCurrentTimeLine={showCurrentTimeLine}
                    currentTimePosition={currentTimePosition}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <DragOverlay>
          {dragOverlay ? (
            <AppointmentCard
              appointment={dragOverlay}
              colorClass={getAppointmentColor(dragOverlay.status)}
              width="200px"
              isDragging={true}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default AppointmentsCalendar;