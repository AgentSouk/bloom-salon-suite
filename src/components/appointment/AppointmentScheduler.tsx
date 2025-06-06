
import React, { useState, useMemo } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

// Sample events data
const sampleEvents = [
  {
    id: 1,
    title: "Sarah Johnson - Gel Manicure",
    start: new Date(new Date().setHours(10, 15, 0, 0)),
    end: new Date(new Date().setHours(11, 15, 0, 0)),
    resource: "nadeen"
  },
  {
    id: 2,
    title: "Emma Davis - Classic Pedicure", 
    start: new Date(new Date().setHours(10, 15, 0, 0)),
    end: new Date(new Date().setHours(11, 15, 0, 0)),
    resource: "raghe"
  },
  {
    id: 3,
    title: "Michael Brown - Haircut & Beard Trim",
    start: new Date(new Date().setHours(11, 30, 0, 0)),
    end: new Date(new Date().setHours(12, 30, 0, 0)),
    resource: "maasam"
  }
];

// Team members configuration
const teamMembers = [
  { 
    id: "maasam",
    title: "Maasam branch",
    color: "#3174ad"
  },
  {
    id: "jenny", 
    title: "Jenny",
    color: "#9c27b0"
  },
  {
    id: "emy",
    title: "Emy", 
    color: "#4caf50"
  },
  {
    id: "nadeen",
    title: "Nadeen",
    color: "#e91e63"
  },
  {
    id: "raghe",
    title: "Raghe",
    color: "#ff9800"
  },
  {
    id: "rawan",
    title: "Rawan",
    color: "#009688"
  },
  {
    id: "jannat",
    title: "Jannat",
    color: "#3f51b5"
  },
  {
    id: "areej",
    title: "Areej",
    color: "#f44336"
  },
  {
    id: "samar",
    title: "Samar",
    color: "#ffeb3b"
  }
];

// Custom Day Column Wrapper component
const CustomDayColumnWrapper = ({ children, value }: any) => {
  const isToday = moment(value).isSame(moment(), 'day');
  const isWeekend = moment(value).day() === 0 || moment(value).day() === 6;
  
  return (
    <div 
      className={`
        h-full relative
        ${isToday ? 'bg-blue-50 border-l-4 border-blue-400' : ''}
        ${isWeekend ? 'bg-gray-50' : 'bg-white'}
      `}
    >
      {children}
    </div>
  );
};

export const AppointmentScheduler = () => {
  const [currentView, setCurrentView] = useState<string>(Views.WEEK);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleEventClick = (event: any) => {
    console.log("Event clicked:", event);
  };

  const handleSlotClick = (slotInfo: any) => {
    console.log("Slot clicked:", slotInfo);
  };

  const handleNavigate = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const handleViewChange = (view: any) => {
    setCurrentView(view);
  };

  const eventStyleGetter = (event: any) => {
    const teamMember = teamMembers.find(member => member.id === event.resource);
    const backgroundColor = teamMember?.color || '#3174ad';
    
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const CustomToolbar = ({ label, onNavigate, onView }: any) => (
    <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('PREV')}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <span className="font-semibold text-lg min-w-[200px] text-center">{label}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('NEXT')}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex space-x-2">
        <Button
          variant={currentView === Views.WEEK ? "default" : "outline"}
          size="sm"
          onClick={() => onView(Views.WEEK)}
        >
          Week
        </Button>
        <Button
          variant={currentView === Views.DAY ? "default" : "outline"}
          size="sm"
          onClick={() => onView(Views.DAY)}
        >
          Day
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('TODAY')}
        >
          Today
        </Button>
      </div>
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Appointment Scheduler</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: "600px" }}>
          <Calendar
            localizer={localizer}
            events={sampleEvents}
            startAccessor="start"
            endAccessor="end"
            view={currentView as any}
            onView={handleViewChange}
            date={currentDate}
            onNavigate={handleNavigate}
            onSelectEvent={handleEventClick}
            onSelectSlot={handleSlotClick}
            selectable
            eventPropGetter={eventStyleGetter}
            components={{
              toolbar: CustomToolbar,
              dayColumnWrapper: CustomDayColumnWrapper,
            }}
            views={[Views.WEEK, Views.DAY]}
            defaultView={Views.WEEK}
            min={new Date(0, 0, 0, 8, 0, 0)}
            max={new Date(0, 0, 0, 23, 0, 0)}
            step={60}
            timeslots={1}
            formats={{
              timeGutterFormat: 'HH:mm',
              eventTimeRangeFormat: ({ start, end }: any) => 
                `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
            }}
            className="rounded-lg"
          />
        </div>
        
        {/* Team Members Legend */}
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold mb-3 text-sm text-gray-700">Team Members</h4>
          <div className="flex flex-wrap gap-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: member.color }}
                />
                <span className="text-sm text-gray-600">{member.title}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
