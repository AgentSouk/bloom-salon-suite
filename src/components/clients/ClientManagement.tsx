
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Phone, Mail, Calendar } from "lucide-react";

export const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const clients = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "(555) 123-4567",
      lastVisit: "2024-05-28",
      totalSpent: "$2,450",
      visits: 12,
      preferredServices: ["Hair Cut", "Color"],
      notes: "Prefers natural colors, allergic to sulfates"
    },
    {
      id: 2,
      name: "Mike Davis",
      email: "mike.davis@email.com",
      phone: "(555) 987-6543",
      lastVisit: "2024-05-25",
      totalSpent: "$890",
      visits: 8,
      preferredServices: ["Beard Trim", "Hair Cut"],
      notes: "Regular customer, comes every 3 weeks"
    },
    {
      id: 3,
      name: "Lisa Chen",
      email: "lisa.chen@email.com",
      phone: "(555) 456-7890",
      lastVisit: "2024-05-30",
      totalSpent: "$1,230",
      visits: 15,
      preferredServices: ["Manicure", "Pedicure"],
      notes: "Loves gel polish, books monthly"
    }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Management</h1>
          <p className="text-gray-600">Manage your client database and track their preferences</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search clients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <p className="text-sm text-gray-600">{client.visits} visits • {client.totalSpent}</p>
                </div>
                <div className="text-xs text-gray-500">
                  ID: {client.id.toString().padStart(4, '0')}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last visit: {client.lastVisit}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">Preferred Services</p>
                <div className="flex flex-wrap gap-1">
                  {client.preferredServices.map((service, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {client.notes && (
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">Notes</p>
                  <p className="text-sm text-gray-600">{client.notes}</p>
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Book Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
