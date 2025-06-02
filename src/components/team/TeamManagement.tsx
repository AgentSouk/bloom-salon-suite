
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, Star } from "lucide-react";

export const TeamManagement = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Emma Rodriguez",
      role: "Senior Stylist",
      email: "emma@salon.com",
      phone: "(555) 111-2222",
      specialties: ["Hair Cutting", "Coloring", "Styling"],
      rating: 4.9,
      permissions: ["POS", "Client Management", "Booking"],
      status: "Active",
      hireDate: "2022-03-15"
    },
    {
      id: 2,
      name: "Alex Thompson",
      role: "Barber",
      email: "alex@salon.com",
      phone: "(555) 333-4444",
      specialties: ["Men's Cuts", "Beard Styling", "Straight Razor"],
      rating: 4.8,
      permissions: ["POS", "Booking"],
      status: "Active",
      hireDate: "2023-01-20"
    },
    {
      id: 3,
      name: "Sofia Martinez",
      role: "Nail Technician",
      email: "sofia@salon.com",
      phone: "(555) 555-6666",
      specialties: ["Manicures", "Pedicures", "Nail Art"],
      rating: 4.7,
      permissions: ["POS", "Booking"],
      status: "Active",
      hireDate: "2022-11-08"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Manager",
      email: "david@salon.com",
      phone: "(555) 777-8888",
      specialties: ["Management", "Training", "Operations"],
      rating: 5.0,
      permissions: ["Admin", "POS", "Client Management", "Booking", "Reports"],
      status: "Active",
      hireDate: "2021-06-10"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Manager": return "bg-purple-100 text-purple-800";
      case "Senior Stylist": return "bg-blue-100 text-blue-800";
      case "Barber": return "bg-green-100 text-green-800";
      case "Nail Technician": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h1>
          <p className="text-gray-600">Manage your team members and their permissions</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <Badge className={getRoleColor(member.role)}>{member.role}</Badge>
                </div>
                <div className="flex items-center text-amber-500">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  <span className="text-sm font-medium">{member.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {member.phone}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Specialties</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-2">Permissions</p>
                <div className="flex flex-wrap gap-1">
                  {member.permissions.map((permission, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600">
                <span>Hire Date: {member.hireDate}</span>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  {member.status}
                </Badge>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  View Schedule
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
