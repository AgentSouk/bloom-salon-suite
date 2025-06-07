import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, ChevronLeft, ChevronRight, Calendar, Clock, User, DollarSign, Phone, Mail, MapPin, Edit, Trash2, MoreHorizontal, RefreshCw, FileText, MessageSquare, Send, Printer, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface TeamMember {
  id: string;
  name: string;
  initial: string;
  color: string;
}

interface Booking {
  id: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'voided';
  services: Service[];
  client: Client | null;
  totalAmount: number;
  paymentMethod?: string;
  paymentDate?: string;
  voidReason?: string;
  createdAt: string;
}

interface Appointment {
  id: string;
  bookingId: string;
  clientName: string;
  service: string;
  time: string;
  memberId: number;
  startSlot: number;
  duration: number;
  status: 'upcoming' | 'started' | 'completed' | 'voided';
  color?: string;
  booking?: Booking;
}

const teamMembers: TeamMember[] = [
  { id: "1", name: "Maasam branch", initial: "M", color: "bg-blue-100 text-blue-700" },
  { id: "2", name: "Jenny", initial: "J", color: "bg-purple-100 text-purple-700" },
  { id: "3", name: "Emy", initial: "E", color: "bg-green-100 text-green-700" },
  { id: "4", name: "Nadeen", initial: "N", color: "bg-pink-100 text-pink-700" },
  { id: "5", name: "Raghe", initial: "R", color: "bg-orange-100 text-orange-700" },
  { id: "6", name: "Rawan", initial: "R", color: "bg-teal-100 text-teal-700" },
  { id: "7", name: "Jannat", initial: "J", color: "bg-indigo-100 text-indigo-700" },
  { id: "8", name: "Areej", initial: "A", color: "bg-red-100 text-red-700" },
  { id: "9", name: "Samar", initial: "S", color: "bg-yellow-100 text-yellow-700" },
];

const services: Service[] = [
  { id: "1", name: "Women's Haircut", duration: "45 min", price: "65" },
  { id: "2", name: "Hair Color (Full)", duration: "120 min", price: "120" },
  { id: "3", name: "Men's Haircut", duration: "30 min", price: "45" },
  { id: "4", name: "Beard Trim", duration: "20 min", price: "25" },
  { id: "5", name: "Classic Manicure", duration: "45 min", price: "35" },
  { id: "6", name: "Gel Manicure", duration: "60 min", price: "50" },
  { id: "7", name: "Pedicure", duration: "60 min", price: "45" }
];

const clients: Client[] = [
  { id: "1", name: "Sarah Johnson", phone: "+971 50 123 4567", email: "sarah@email.com", address: "Dubai Marina" },
  { id: "2", name: "Emma Davis", phone: "+971 55 987 6543", email: "emma@email.com", address: "JBR" },
  { id: "3", name: "Michael Brown", phone: "+971 52 456 7890", email: "michael@email.com", address: "Downtown Dubai" }
];

const timeSlots = Array.from({ length: 59 }, (_, i) => {
  const hour = Math.floor(i / 4) + 9;
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

const getAppointmentColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-yellow-200 text-yellow-800 border-yellow-300";
    case "started": 
      return "bg-green-200 text-green-800 border-green-300";
    case "completed":
      return "bg-gray-100 text-gray-600 border-gray-300";
    case "voided":
      return "bg-red-100 text-red-600 border-red-300";
    default:
      return "bg-gray-200 text-gray-600 border-gray-300";
  }
};

const calculateEndTime = (startTime: string, duration: number): string => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const totalMinutes = startHour * 60 + startMinute + duration;
  const endHour = Math.floor(totalMinutes / 60) % 24;
  const endMinute = totalMinutes % 60;
  return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
};

const calculateStartSlot = (time: string): number => {
  const [hour, minute] = time.split(":").map(Number);
  const minutesFrom9AM = (hour - 9) * 60 + minute;
  return minutesFrom9AM / 15;
};

export const Appointments = () => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState("Thu 5 Jun");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draggedAppointment, setDraggedAppointment] = useState<Appointment | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [isVoidDialogOpen, setIsVoidDialogOpen] = useState(false);
  const [voidReason, setVoidReason] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
    const dragged = appointments.find(apt => apt.id === event.active.id);
    setDraggedAppointment(dragged || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    setDraggedAppointment(null);

    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = appointments.findIndex(apt => apt.id === active.id);
      const newIndex = appointments.findIndex(apt => apt.id === over.id);

      setAppointments(items => {
        const newItems = arrayMove(items, oldIndex, newIndex);
        return newItems;
      });
    }
  };

  const createAppointment = () => {
    if (!selectedServices.length || !selectedClient || !selectedMember || !selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Create booking
    const bookingId = `BK${Date.now()}`;
    const totalAmount = selectedServices.reduce((sum, service) => sum + parseInt(service.price), 0);
    
    const newBooking: Booking = {
      id: bookingId,
      status: 'pending',
      services: selectedServices,
      client: selectedClient,
      totalAmount,
      createdAt: new Date().toISOString()
    };

    const newAppointment: Appointment = {
      id: `APT${Date.now()}`,
      bookingId,
      clientName: selectedClient.name,
      service: selectedServices.map(s => s.name).join(", "),
      time: `${selectedTime} - ${calculateEndTime(selectedTime, parseInt(duration))}`,
      memberId: parseInt(selectedMember),
      startSlot: calculateStartSlot(selectedTime),
      duration: Math.ceil(parseInt(duration) / 15),
      status: "upcoming",
      booking: newBooking
    };

    setBookings(prev => [...prev, newBooking]);
    setAppointments(prev => [...prev, newAppointment]);

    // Reset form
    setSelectedServices([]);
    setSelectedClient(null);
    setSelectedMember("");
    setSelectedDate("");
    setSelectedTime("");
    setDuration("");
    setNotes("");
    setIsModalOpen(false);

    toast({
      title: "Appointment Created",
      description: `Booking ID: ${bookingId} - Appointment scheduled for ${selectedClient.name}`,
    });
  };

  const markAsCompleted = (appointmentId: string) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'completed' }
        : apt
    ));

    // Update booking status
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment?.bookingId) {
      setBookings(prev => prev.map(booking => 
        booking.id === appointment.bookingId
          ? { 
              ...booking, 
              status: 'completed',
              paymentMethod: 'Card',
              paymentDate: new Date().toISOString()
            }
          : booking
      ));
    }

    toast({
      title: "Payment Processed",
      description: "Appointment marked as completed",
    });
  };

  const voidAppointment = (appointmentId: string) => {
    if (!voidReason.trim()) {
      toast({
        title: "Void Reason Required",
        description: "Please provide a reason for voiding this appointment",
        variant: "destructive"
      });
      return;
    }

    setAppointments(prev => prev.map(apt => 
      apt.id === appointmentId 
        ? { ...apt, status: 'voided' }
        : apt
    ));

    // Update booking status
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (appointment?.bookingId) {
      setBookings(prev => prev.map(booking => 
        booking.id === appointment.bookingId
          ? { 
              ...booking, 
              status: 'voided',
              voidReason
            }
          : booking
      ));
    }

    setIsVoidDialogOpen(false);
    setVoidReason("");
    setSelectedAppointment(null);

    toast({
      title: "Appointment Voided",
      description: "The appointment has been voided successfully",
    });
  };

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Upcoming</Badge>;
      case "started":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-green-100 text-green-800">✓ Completed</Badge>;
      case "voided":
        return <Badge variant="outline" className="bg-red-100 text-red-800">Voided</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="p-6 h-screen overflow-hidden">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointments</h1>
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
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="font-medium text-lg">{currentDate}</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Scheduled team
              </Button>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Appointment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Appointment</DialogTitle>
                  </DialogHeader>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Client Information */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Client Name</Label>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Enter client name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />

                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />

                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        type="email"
                        id="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <Label htmlFor="address">Address</Label>
                      <Input
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />

                      <Button variant="outline" size="sm">
                        Add New Client
                      </Button>
                    </div>

                    {/* Appointment Details */}
                    <div className="space-y-2">
                      <Label>Services</Label>
                      <Select onValueChange={(value) => {
                        const service = services.find(s => s.id === value);
                        if (service) {
                          setSelectedServices(prev => [...prev, service]);
                        }
                      }}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedServices.length > 0 && (
                        <div className="mt-2">
                          <Label>Selected Services</Label>
                          <div className="flex flex-wrap gap-2">
                            {selectedServices.map((service) => (
                              <Badge key={service.id} variant="secondary">
                                {service.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <Label htmlFor="member">Team Member</Label>
                      <Select onValueChange={setSelectedMember}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a team member" />
                        </SelectTrigger>
                        <SelectContent>
                          {teamMembers.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Label htmlFor="date">Date</Label>
                      <Input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />

                      <Label htmlFor="time">Time</Label>
                      <Input
                        type="time"
                        id="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                      />

                      <Label htmlFor="duration">Duration (minutes)</Label>
                      <Input
                        type="number"
                        id="duration"
                        placeholder="Enter duration in minutes"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />

                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Enter any additional notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />

                      <Button onClick={createAppointment}>Create Appointment</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 overflow-auto">
          <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="flex" ref={calendarRef}>
              {/* Time column */}
              <div className="w-20 border-r flex-shrink-0">
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
                  <SortableContext items={appointments.map(apt => apt.id)} strategy={verticalListSortingStrategy}>
                    {teamMembers.map((member) => (
                      <div key={member.id} className="flex-1 min-w-40 border-r">
                        {/* Header */}
                        <div className="h-16 border-b p-3 text-center">
                          <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center text-sm font-medium mx-auto mb-1`}>
                            {member.initial}
                          </div>
                          <div className="text-xs font-medium text-gray-900 truncate">{member.name}</div>
                        </div>

                        {/* Time slots */}
                        <div className="relative">
                          {timeSlots.map((_, slotIndex) => (
                            <div key={slotIndex} className="h-[60px] border-b border-gray-100"></div>
                          ))}

                          {/* Appointments */}
                          {appointments
                            .filter(apt => apt.memberId === parseInt(member.id))
                            .map((appointment) => (
                              <SortableAppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onClick={() => handleAppointmentClick(appointment)}
                              />
                            ))}
                        </div>
                      </div>
                    ))}
                  </SortableContext>
                </div>
              </div>
            </div>

            <DragOverlay>
              {draggedAppointment ? (
                <div className={`${getAppointmentColor(draggedAppointment.status)} text-xs p-2 rounded border shadow-sm cursor-grab opacity-90 w-36`}>
                  <div className="font-medium text-xs leading-tight">{draggedAppointment.time}</div>
                  <div className="text-xs leading-tight">{draggedAppointment.clientName}</div>
                  <div className="text-xs leading-tight opacity-75">{draggedAppointment.service}</div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </CardContent>
      </Card>

      {/* Appointment Details Dialog */}
      {selectedAppointment && (
        <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>Sale</DialogTitle>
                <div className="flex items-center space-x-2">
                  {getStatusBadge(selectedAppointment.status)}
                  <Button variant="outline" size="sm">Rebook</Button>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {currentDate} • Lushways Salon - Barsha
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Client Info */}
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-medium">
                    {selectedAppointment.clientName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium">{selectedAppointment.clientName}</div>
                  <div className="text-sm text-gray-600">
                    {selectedAppointment.booking?.client?.phone}
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tax Invoice #{selectedAppointment.bookingId}</span>
                </div>
                
                <div className="space-y-2">
                  {selectedAppointment.booking?.services.map((service, index) => (
                    <div key={index} className="flex justify-between">
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.duration}</div>
                      </div>
                      <div className="text-right">
                        <div>AED {service.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>AED {selectedAppointment.booking?.totalAmount?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT 5%</span>
                    <span>AED {((selectedAppointment.booking?.totalAmount || 0) * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>AED {((selectedAppointment.booking?.totalAmount || 0) * 1.05).toFixed(2)}</span>
                  </div>
                </div>

                {selectedAppointment.status === 'completed' && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between">
                      <span>Paid with {selectedAppointment.booking?.paymentMethod}</span>
                      <span className="font-medium">AED {((selectedAppointment.booking?.totalAmount || 0) * 1.05).toFixed(2)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedAppointment.booking?.paymentDate && 
                        new Date(selectedAppointment.booking.paymentDate).toLocaleDateString()} at 4:22pm
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h4 className="font-medium">Quick actions</h4>
                <div className="space-y-2">
                  {selectedAppointment.status === 'completed' && (
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refund sale
                    </Button>
                  )}
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit sale details
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add a note
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Printer className="w-4 h-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2 pt-4">
                {selectedAppointment.status !== 'completed' && selectedAppointment.status !== 'voided' && (
                  <Button 
                    onClick={() => markAsCompleted(selectedAppointment.id)}
                    className="flex-1"
                  >
                    Mark as Completed
                  </Button>
                )}
                
                {selectedAppointment.status !== 'voided' && (
                  <AlertDialog open={isVoidDialogOpen} onOpenChange={setIsVoidDialogOpen}>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="flex-1">
                        Void sale
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Void sale?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action is permanent and cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      
                      <div className="py-4 px-4 bg-yellow-50 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <div className="w-5 h-5 rounded-full bg-yellow-500 flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs">!</span>
                          </div>
                          <div>
                            <div className="font-medium text-sm">Following payments will be deleted</div>
                            <div className="text-sm text-gray-600">
                              AED {((selectedAppointment.booking?.totalAmount || 0) * 1.05).toFixed(2)} paid by {selectedAppointment.booking?.paymentMethod || 'Card'} on {currentDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="void-reason">Reason for voiding (optional)</Label>
                        <Textarea
                          id="void-reason"
                          placeholder="Enter reason for voiding this sale..."
                          value={voidReason}
                          onChange={(e) => setVoidReason(e.target.value)}
                        />
                      </div>

                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => voidAppointment(selectedAppointment.id)}
                          className="bg-red-600 hover:bg-red-700"
                        >
                          Void
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
                
                <Button variant="outline" className="flex-1">
                  View sale
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const SortableAppointmentCard = ({ appointment, onClick }: { appointment: Appointment; onClick: () => void }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: appointment.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        top: `${appointment.startSlot * 60}px`,
        height: `${appointment.duration * 30}px`,
      }}
      className={`absolute left-1 right-1 ${getAppointmentColor(appointment.status)} text-xs p-2 rounded border shadow-sm cursor-pointer hover:opacity-90 transition-opacity z-10 overflow-hidden`}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {appointment.status !== "voided" && (
        <>
          <div className="font-medium text-xs leading-tight break-words">{appointment.time}</div>
          <div className="text-xs leading-tight break-words overflow-hidden">{appointment.clientName}</div>
          <div className="text-xs leading-tight break-words overflow-hidden opacity-75">{appointment.service}</div>
        </>
      )}
      {appointment.status === "voided" && (
        <div className="text-xs leading-tight break-words overflow-hidden">Voided</div>
      )}
    </div>
  );
};

export default Appointments;
