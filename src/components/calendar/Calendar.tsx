import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { AppointmentDetailSheet } from "./AppointmentDetailSheet";

const teamMembers = [
  { id: 1, name: "Barsha Branch", initial: "B", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Jharna", initial: "J", color: "bg-purple-100 text-purple-700" },
  { id: 3, name: "Angelica", initial: "A", color: "bg-green-100 text-green-700" },
  { id: 4, name: "Rodana", initial: "R", color: "bg-pink-100 text-pink-700" },
  { id: 5, name: "Patricia", initial: "P", color: "bg-orange-100 text-orange-700" },
  { id: 6, name: "Nancy", initial: "N", color: "bg-teal-100 text-teal-700" },
  { id: 7, name: "Fadia", initial: "F", color: "bg-indigo-100 text-indigo-700" },
];

const timeSlots = [
  "4:00 pm", "4:30 pm", "5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", 
  "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm", "9:00 pm", "9:30 pm", "10:00 pm"
];

const sampleAppointments = [
  {
    id: 1,
    clientName: "Catherine",
    service: "Gel Manicure",
    time: "4:30 - 5:55",
    memberId: 1,
    startSlot: 1,
    duration: 3,
    color: "bg-gray-400"
  },
  {
    id: 2,
    clientName: "Khaloud",
    service: "Hair Mask",
    time: "4:30 - 5:30",
    memberId: 4,
    startSlot: 1,
    duration: 2,
    color: "bg-gray-600"
  },
  {
    id: 3,
    clientName: "Catherine",
    service: "Acrylic Repair",
    time: "5:55 - 6:55",
    memberId: 1,
    startSlot: 4,
    duration: 2,
    color: "bg-gray-400"
  },
  {
    id: 4,
    clientName: "Catherine",
    service: "Acrylic Repair",
    time: "5:55 - 6:55",
    memberId: 2,
    startSlot: 4,
    duration: 2,
    color: "bg-gray-400"
  },
  {
    id: 5,
    clientName: "Urrea",
    service: "Polish Change, Classic",
    time: "7:00 - 8:00",
    memberId: 1,
    startSlot: 6,
    duration: 2,
    color: "bg-gray-600"
  },
  {
    id: 6,
    clientName: "Ghazal",
    service: "Classic Pedicure",
    time: "6:50 - 7:50",
    memberId: 4,
    startSlot: 5,
    duration: 2,
    color: "bg-gray-600"
  },
  {
    id: 7,
    clientName: "Ghazal",
    service: "French tip",
    time: "8:00 - 9:00",
    memberId: 4,
    startSlot: 8,
    duration: 2,
    color: "bg-gray-600"
  },
  {
    id: 8,
    clientName: "Kyla",
    service: "Classic Manicure",
    time: "9:00 - 10:00",
    memberId: 1,
    startSlot: 10,
    duration: 2,
    color: "bg-blue-400"
  },
  {
    id: 9,
    clientName: "Kyla",
    service: "Classic Pedicure",
    time: "9:00 - 10:00",
    memberId: 4,
    startSlot: 10,
    duration: 2,
    color: "bg-blue-400"
  }
];

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState("Mon 2 Jun");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigateDate = (direction: 'prev' | 'next') => {
    // In a real app, this would update the actual date
    console.log(`Navigate ${direction}`);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
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
                <div key={index} className="h-12 border-b px-2 py-1 text-xs text-gray-500">
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
                    <div className="h-16 border-b p-3 text-center">
                      <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-sm font-medium mx-auto mb-1`}>
                        {member.initial}
                      </div>
                      <div className="text-xs font-medium text-gray-900">{member.name}</div>
                    </div>

                    {/* Time slots */}
                    <div className="relative">
                      {timeSlots.map((_, slotIndex) => (
                        <div key={slotIndex} className="h-12 border-b border-gray-100"></div>
                      ))}

                      {/* Appointments */}
                      {sampleAppointments
                        .filter(apt => apt.memberId === member.id)
                        .map((appointment) => (
                          <div
                            key={appointment.id}
                            className={`absolute left-1 right-1 ${appointment.color} text-white text-xs p-1 rounded shadow-sm cursor-pointer hover:opacity-90 transition-opacity`}
                            style={{
                              top: `${appointment.startSlot * 48}px`,
                              height: `${appointment.duration * 24}px`,
                            }}
                            onClick={() => handleAppointmentClick(appointment)}
                          >
                            <div className="font-medium truncate">{appointment.time} {appointment.clientName}</div>
                            <div className="truncate opacity-90">{appointment.service}</div>
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
        onClose={() => setIsSheetOpen(false)}
        teamMember={selectedAppointment ? getTeamMemberForAppointment(selectedAppointment.memberId) : undefined}
      />
    </div>
  );
};
