
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { AppointmentDetailSheet } from "./AppointmentDetailSheet";

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

// Updated time slots from 8am to 11:30pm
const timeSlots = [
  "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", 
  "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "23:30"
];

const sampleAppointments = [
  {
    id: 1,
    clientName: "Gel Manicure",
    service: "Gel Manicure",
    time: "10:15 - 11:15",
    memberId: 4,
    startSlot: 2.25,
    duration: 2,
    status: "upcoming"
  },
  {
    id: 2,
    clientName: "Classic Pedicure", 
    service: "Classic Pedicure",
    time: "10:15 - 11:15",
    memberId: 5,
    startSlot: 2.25,
    duration: 2,
    status: "upcoming"
  },
  {
    id: 3,
    clientName: "Walk-In Gents - manicure and pedicure",
    service: "Combo OFFER",
    time: "11:30 - 12:10",
    memberId: 1,
    startSlot: 3.5,
    duration: 1.3,
    status: "started"
  },
  {
    id: 4,
    clientName: "Mana Classic Manicure",
    service: "Classic Manicure", 
    time: "11:30 - 12:30",
    memberId: 4,
    startSlot: 3.5,
    duration: 2,
    status: "started"
  },
  {
    id: 5,
    clientName: "Mana Classic Pedicure",
    service: "Classic Pedicure",
    time: "11:30 - 12:30", 
    memberId: 5,
    startSlot: 3.5,
    duration: 2,
    status: "started"
  },
  {
    id: 6,
    clientName: "Walk-In Haircut & Beard Zero",
    service: "Haircut & Beard Zero",
    time: "10:25 - 11:25",
    memberId: 8,
    startSlot: 2.4,
    duration: 2,
    status: "started"
  },
  {
    id: 7,
    clientName: "Muna Haircut+ blowdry",
    service: "Haircut+ blowdry", 
    time: "11:00 - 12:00",
    memberId: 8,
    startSlot: 3,
    duration: 2,
    status: "started"
  },
  {
    id: 8,
    clientName: "Walk-In Haircut - Children",
    service: "Haircut - Children",
    time: "11:20 - 12:20",
    memberId: 9,
    startSlot: 3.33,
    duration: 2,
    status: "completed"
  }
];

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

const getCurrentTimePosition = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  // Calculate position from 8:00 AM start
  const startHour = 8;
  const hoursSinceStart = currentHour - startHour;
  const minutesFraction = currentMinute / 60;
  const totalHours = hoursSinceStart + minutesFraction;
  
  // Each hour slot is 60px
  return totalHours * 60;
};

const getTimeFromPosition = (position: number, slotHeight: number) => {
  const hourIndex = Math.floor(position / slotHeight);
  const startHour = 8;
  const selectedHour = startHour + hourIndex;
  
  // Format the time
  if (selectedHour <= 23) {
    return `${selectedHour.toString().padStart(2, '0')}:00`;
  } else if (selectedHour === 24) {
    return "00:00";
  }
  return `${(selectedHour - 24).toString().padStart(2, '0')}:00`;
};

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState("Thu 5 Jun");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);
  const [newAppointmentData, setNewAppointmentData] = useState<{memberId: number, time: string} | null>(null);

  const navigateDate = (direction: 'prev' | 'next') => {
    console.log(`Navigate ${direction}`);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setNewAppointmentData(null);
    setIsSheetOpen(true);
  };

  const handleTeamMemberClick = (memberId: number) => {
    setSelectedTeamMember(selectedTeamMember === memberId ? null : memberId);
    console.log(`Navigate to team member ${memberId} profile`);
  };

  const handleTimeSlotClick = (memberId: number, event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const clickY = event.clientY - rect.top;
    const slotHeight = 60; // Height of each time slot
    const selectedTime = getTimeFromPosition(clickY, slotHeight);
    
    console.log(`Clicked on member ${memberId} at time ${selectedTime}`);
    
    setNewAppointmentData({ memberId, time: selectedTime });
    setSelectedAppointment(null);
    setIsSheetOpen(true);
  };

  const getTeamMemberForAppointment = (memberId) => {
    return teamMembers.find(member => member.id === memberId);
  };

  const currentTimePosition = getCurrentTimePosition();
  const showCurrentTimeLine = currentTimePosition >= 0 && currentTimePosition <= (timeSlots.length * 60);

  return (
    <div className="p-6 h-screen overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">Manage your salon appointments and schedule.</p>
      </div>

      <Card className="h-[calc(100vh-200px)]">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                Today
              </Button>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateDate('prev')}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-medium text-lg">{currentDate}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigateDate('next')}
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
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex h-full">
            {/* Time column */}
            <div className="w-20 border-r">
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
                  <div key={member.id} className="flex-1 min-w-40 border-r">
                    {/* Header */}
                    <div 
                      className={`h-16 border-b p-3 text-center cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedTeamMember === member.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => handleTeamMemberClick(member.id)}
                    >
                      <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-sm font-medium mx-auto mb-1`}>
                        {member.initial}
                      </div>
                      <div className="text-xs font-medium text-gray-900 truncate">{member.name}</div>
                    </div>

                    {/* Time slots */}
                    <div 
                      className="relative cursor-pointer"
                      onClick={(e) => handleTimeSlotClick(member.id, e)}
                    >
                      {timeSlots.map((_, slotIndex) => (
                        <div key={slotIndex} className="h-[60px] border-b border-gray-100 hover:bg-gray-50 transition-colors"></div>
                      ))}

                      {/* Current time line - straight red line */}
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
                      {sampleAppointments
                        .filter(apt => apt.memberId === member.id)
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className={`absolute left-1 right-1 ${getAppointmentColor(appointment.status)} text-xs p-2 rounded border shadow-sm cursor-pointer hover:opacity-90 transition-opacity z-10 overflow-hidden`}
                            style={{
                              top: `${appointment.startSlot * 60}px`,
                              height: `${appointment.duration * 30}px`,
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppointmentClick(appointment);
                            }}
                          >
                            {appointment.status !== "completed" && (
                              <>
                                <div className="font-medium text-xs leading-tight break-words">{appointment.time}</div>
                                <div className="text-xs leading-tight break-words overflow-hidden">{appointment.clientName}</div>
                                <div className="text-xs leading-tight break-words overflow-hidden opacity-75">{appointment.service}</div>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <AppointmentDetailSheet
        appointment={selectedAppointment}
        isOpen={isSheetOpen}
        onClose={() => {
          setIsSheetOpen(false);
          setNewAppointmentData(null);
        }}
        teamMember={selectedAppointment ? getTeamMemberForAppointment(selectedAppointment.memberId) : 
                   newAppointmentData ? getTeamMemberForAppointment(newAppointmentData.memberId) : undefined}
        newAppointmentData={newAppointmentData}
      />
    </div>
  );
};
