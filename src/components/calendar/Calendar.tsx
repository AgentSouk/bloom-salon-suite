
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AppointmentDetailSheet } from "./AppointmentDetailSheet";
import { CalendarHeader } from "./components/CalendarHeader";
import { CalendarGrid } from "./components/CalendarGrid";
import { teamMembers, timeSlots, sampleAppointments } from "./data/calendarData";
import { getAppointmentColor, getTimeFromPosition } from "./utils/calendarUtils";

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
    const slotHeight = 60;
    const selectedTime = getTimeFromPosition(clickY, slotHeight);
    
    console.log(`Clicked on member ${memberId} at time ${selectedTime}`);
    
    setNewAppointmentData({ memberId, time: selectedTime });
    setSelectedAppointment(null);
    setIsSheetOpen(true);
  };

  const getTeamMemberForAppointment = (memberId) => {
    return teamMembers.find(member => member.id === memberId);
  };

  return (
    <div className="p-6 h-screen overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendar</h1>
        <p className="text-gray-600">Manage your salon appointments and schedule.</p>
      </div>

      <Card className="h-[calc(100vh-200px)]">
        <CardHeader className="pb-4">
          <CalendarHeader 
            currentDate={currentDate}
            onNavigateDate={navigateDate}
          />
        </CardHeader>
        <CardContent className="p-0 overflow-auto">
          <CalendarGrid
            teamMembers={teamMembers}
            timeSlots={timeSlots}
            appointments={sampleAppointments}
            selectedTeamMember={selectedTeamMember}
            onTeamMemberClick={handleTeamMemberClick}
            onTimeSlotClick={handleTimeSlotClick}
            onAppointmentClick={handleAppointmentClick}
            getAppointmentColor={getAppointmentColor}
          />
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
