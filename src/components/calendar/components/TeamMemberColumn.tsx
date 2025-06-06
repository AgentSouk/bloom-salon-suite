
import { getCurrentTimePosition } from "../utils/calendarUtils";

interface TeamMember {
  id: number;
  name: string;
  initial: string;
  color: string;
}

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  memberId: number;
  startSlot: number;
  duration: number;
  status: string;
}

interface TeamMemberColumnProps {
  member: TeamMember;
  timeSlots: string[];
  appointments: Appointment[];
  selectedTeamMember: number | null;
  onTeamMemberClick: (memberId: number) => void;
  onTimeSlotClick: (memberId: number, event: React.MouseEvent<HTMLDivElement>) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  getAppointmentColor: (status: string) => string;
}

export const TeamMemberColumn = ({
  member,
  timeSlots,
  appointments,
  selectedTeamMember,
  onTeamMemberClick,
  onTimeSlotClick,
  onAppointmentClick,
  getAppointmentColor
}: TeamMemberColumnProps) => {
  const currentTimePosition = getCurrentTimePosition();
  const showCurrentTimeLine = currentTimePosition >= 0 && currentTimePosition <= (timeSlots.length * 60);

  return (
    <div className="flex-1 min-w-40 border-r">
      {/* Header */}
      <div 
        className={`h-16 border-b p-3 text-center cursor-pointer transition-colors hover:bg-gray-50 ${
          selectedTeamMember === member.id ? 'bg-blue-50 border-blue-200' : ''
        }`}
        onClick={() => onTeamMemberClick(member.id)}
      >
        <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-sm font-medium mx-auto mb-1`}>
          {member.initial}
        </div>
        <div className="text-xs font-medium text-gray-900 truncate">{member.name}</div>
      </div>

      {/* Time slots */}
      <div 
        className="relative cursor-pointer"
        onClick={(e) => onTimeSlotClick(member.id, e)}
      >
        {timeSlots.map((_, slotIndex) => (
          <div key={slotIndex} className="h-[60px] border-b border-gray-100 hover:bg-gray-50 transition-colors"></div>
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
        {appointments
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
                onAppointmentClick(appointment);
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
  );
};
