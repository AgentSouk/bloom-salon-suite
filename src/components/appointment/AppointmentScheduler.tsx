import React from 'react';
import { Scheduler } from '@aldabil/react-scheduler';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Sample events data with timezone consideration
const sampleEvents = [
  {
    event_id: 1,
    title: "Sarah Johnson - Gel Manicure",
    start: new Date(new Date().setHours(10, 15, 0, 0)),
    end: new Date(new Date().setHours(11, 15, 0, 0)),
    admin_id: "nadeen",
    color: "#3174ad"
  },
  {
    event_id: 2,
    title: "Emma Davis - Classic Pedicure", 
    start: new Date(new Date().setHours(10, 15, 0, 0)),
    end: new Date(new Date().setHours(11, 15, 0, 0)),
    admin_id: "raghe",
    color: "#e91e63"
  },
  {
    event_id: 3,
    title: "Michael Brown - Haircut & Beard Trim",
    start: new Date(new Date().setHours(11, 30, 0, 0)),
    end: new Date(new Date().setHours(12, 30, 0, 0)),
    admin_id: "maasam",
    color: "#f57c00"
  }
];

// Team members configuration
const teamMembers = [
  { 
    admin_id: "maasam",
    title: "Maasam branch",
    mobile: "123-456-7890",
    avatar: "M",
    color: "#3174ad"
  },
  {
    admin_id: "jenny", 
    title: "Jenny",
    mobile: "123-456-7891",
    avatar: "J",
    color: "#9c27b0"
  },
  {
    admin_id: "emy",
    title: "Emy", 
    mobile: "123-456-7892",
    avatar: "E",
    color: "#4caf50"
  },
  {
    admin_id: "nadeen",
    title: "Nadeen",
    mobile: "123-456-7893", 
    avatar: "N",
    color: "#e91e63"
  },
  {
    admin_id: "raghe",
    title: "Raghe",
    mobile: "123-456-7894",
    avatar: "R", 
    color: "#ff9800"
  },
  {
    admin_id: "rawan",
    title: "Rawan",
    mobile: "123-456-7895",
    avatar: "R",
    color: "#009688"
  },
  {
    admin_id: "jannat",
    title: "Jannat",
    mobile: "123-456-7896", 
    avatar: "J",
    color: "#3f51b5"
  },
  {
    admin_id: "areej",
    title: "Areej",
    mobile: "123-456-7897",
    avatar: "A",
    color: "#f44336"
  },
  {
    admin_id: "samar",
    title: "Samar",
    mobile: "123-456-7898",
    avatar: "S",
    color: "#ffeb3b"
  }
];

export const AppointmentScheduler = () => {
  const handleEventClick = (event: any) => {
    console.log("Event clicked:", event);
  };

  const handleSlotClick = (start: Date, end: Date, resourceKey?: string, resourceVal?: string | number) => {
    console.log("Slot clicked:", { start, end, resourceKey, resourceVal });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Appointment Scheduler</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: "600px" }}>
          <Scheduler
            view="week"
            events={sampleEvents}
            resources={teamMembers}
            resourceFields={{
              idField: "admin_id",
              textField: "title",
              subTextField: "mobile",
              avatarField: "avatar",
              colorField: "color"
            }}
            fields={[
              {
                name: "admin_id",
                type: "select",
                options: teamMembers.map(member => ({
                  id: member.admin_id,
                  text: member.title,
                  value: member.admin_id
                })),
                config: { label: "Team Member", required: true }
              }
            ]}
            onEventClick={handleEventClick}
            onCellClick={handleSlotClick}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 6,
              startHour: 8,
              endHour: 23,
              step: 60,
              navigation: true,
              disableGoToDay: false
            }}
            month={{
              weekDays: [0, 1, 2, 3, 4, 5, 6],
              weekStartOn: 6,
              startHour: 8,
              endHour: 23,
              step: 60,
              navigation: true
            }}
            day={{
              startHour: 8,
              endHour: 23,
              step: 60,
              navigation: true
            }}
            hourFormat="24"
            timeZone="UTC"
            translations={{
              navigation: {
                month: "Month",
                week: "Week", 
                day: "Day",
                today: "Today",
                agenda: "Agenda"
              },
              form: {
                addTitle: "Add Event",
                editTitle: "Edit Event",
                confirm: "Confirm",
                delete: "Delete",
                cancel: "Cancel"
              },
              event: {
                title: "Title",
                subtitle: "Subtitle",
                start: "Start",
                end: "End",
                allDay: "All Day"
              },
              moreEvents: "More...",
              noDataToDisplay: "No data to display",
              loading: "Loading..."
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
