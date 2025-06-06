
import { TimeColumn } from "./TimeColumn";
import { TeamMemberColumn } from "./TeamMemberColumn";

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

interface CalendarGridProps {
  teamMembers: TeamMember[];
  timeSlots: string[];
  appointments: Appointment[];
  selectedTeamMember: number | null;
  onTeamMemberClick: (memberId: number) => void;
  onTimeSlotClick: (memberId: number, event: React.MouseEvent<HTMLDivElement>) => void;
  onAppointmentClick: (appointment: Appointment) => void;
  getAppointmentColor: (status: string) => string;
}

export const CalendarGrid = ({
  teamMembers,
  timeSlots,
  appointments,
  selectedTeamMember,
  onTeamMemberClick,
  onTimeSlotClick,
  onAppointmentClick,
  getAppointmentColor
}: CalendarGridProps) => {
  return (
    <div className="flex">
      <TimeColumn timeSlots={timeSlots} />
      
      <div className="flex-1 overflow-x-auto">
        <div className="flex min-w-full">
          {teamMembers.map((member) => (
            <TeamMemberColumn
              key={member.id}
              member={member}
              timeSlots={timeSlots}
              appointments={appointments}
              selectedTeamMember={selectedTeamMember}
              onTeamMemberClick={onTeamMemberClick}
              onTimeSlotClick={onTimeSlotClick}
              onAppointmentClick={onAppointmentClick}
              getAppointmentColor={getAppointmentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
