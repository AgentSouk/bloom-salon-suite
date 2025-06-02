
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  CreditCard,
  MoreVertical,
  UserPlus,
  Calendar as CalendarIcon
} from "lucide-react";

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  memberId: number;
  startSlot: number;
  duration: number;
  color: string;
}

interface AppointmentDetailSheetProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  teamMember?: {
    id: number;
    name: string;
    initial: string;
    color: string;
  };
}

export const AppointmentDetailSheet = ({ 
  appointment, 
  isOpen, 
  onClose,
  teamMember 
}: AppointmentDetailSheetProps) => {
  if (!appointment) return null;

  const clientPhone = "+971 50 494 5952"; // Mock data
  const createdDate = "19 Jul 2024";
  const servicePrice = appointment.service.includes("Classic Manicure") ? "AED 75" : 
                     appointment.service.includes("Classic Pedicure") ? "AED 90" : "AED 85";

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 p-0">
        {/* Header */}
        <div className="bg-green-500 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Mon 2 Jun</span>
            <Badge variant="secondary" className="bg-white/20 text-white">
              Started
            </Badge>
          </div>
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-white text-green-500 font-bold">
                K
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{appointment.clientName}</h2>
              <p className="text-green-100 text-sm">{clientPhone}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MoreVertical className="w-4 h-4 mr-2" />
              Actions
            </Button>
            <Button variant="outline" size="sm">
              View profile
            </Button>
          </div>

          {/* Client Actions */}
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <UserPlus className="w-4 h-4 mr-2" />
              Add pronouns
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Add date of birth
            </Button>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-gray-500" />
                <span className="text-sm">Created {createdDate}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3">Services</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{appointment.service}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>1h • {teamMember?.name}</span>
                    {!teamMember && (
                      <Badge variant="outline" className="ml-2 text-orange-600 border-orange-200">
                        Team member is not available
                      </Badge>
                    )}
                  </div>
                </div>
                <span className="font-semibold">{servicePrice}</span>
              </div>
              
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="text-blue-600">+ Add service</span>
              </Button>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total (incl. tax)</span>
              <span className="font-bold text-lg">AED 165</span>
            </div>
            
            <div className="flex space-x-2">
              <Button className="flex-1 bg-green-500 hover:bg-green-600">
                Pay now
              </Button>
              <Button variant="outline" className="flex-1">
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
