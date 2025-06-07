
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Users, DollarSign, Calendar, Star } from "lucide-react";

interface TeamMemberPerformance {
  id: string;
  name: string;
  initial: string;
  sales: number;
  salesChange: number;
  occupancy: number;
  occupancyChange: number;
  returningClients: number;
  returningClientsChange: number;
  rating: number;
  totalBookings: number;
  completedBookings: number;
  totalClients: number;
  workingHours: number;
  scheduledHours: number;
  bookedHours: number;
}

const teamPerformanceData: TeamMemberPerformance[] = [
  {
    id: "1",
    name: "Areej",
    initial: "A",
    sales: 34364.5,
    salesChange: -7.8,
    occupancy: 36.0,
    occupancyChange: -6.9,
    returningClients: 62.4,
    returningClientsChange: 5.3,
    rating: 0,
    totalBookings: 47,
    completedBookings: 44,
    totalClients: 38,
    workingHours: 4008.5,
    scheduledHours: 180,
    bookedHours: 144.3
  },
  {
    id: "2",
    name: "Samir",
    initial: "S",
    sales: 127000,
    salesChange: 8.9,
    occupancy: 54.0,
    occupancyChange: 6.4,
    returningClients: 53.5,
    returningClientsChange: -6.9,
    rating: 0,
    totalBookings: 67,
    completedBookings: 62,
    totalClients: 45,
    workingHours: 1980,
    scheduledHours: 160,
    bookedHours: 86.4
  },
  {
    id: "3",
    name: "Mohamed",
    initial: "M",
    sales: 275000,
    salesChange: 5.3,
    occupancy: 43.6,
    occupancyChange: 1.1,
    returningClients: 44.4,
    returningClientsChange: -6.4,
    rating: 0,
    totalBookings: 89,
    completedBookings: 85,
    totalClients: 58,
    workingHours: 1200.5,
    scheduledHours: 200,
    bookedHours: 87.2
  },
  {
    id: "4",
    name: "Mido",
    initial: "M",
    sales: 365000,
    salesChange: 16.8,
    occupancy: 44.6,
    occupancyChange: 1.0,
    returningClients: 62.5,
    returningClientsChange: -9.1,
    rating: 0,
    totalBookings: 112,
    completedBookings: 108,
    totalClients: 72,
    workingHours: 1020.5,
    scheduledHours: 220,
    bookedHours: 98.1
  },
  {
    id: "5",
    name: "Rawan",
    initial: "R",
    sales: 247900,
    salesChange: 27.0,
    occupancy: 20.0,
    occupancyChange: 4.4,
    returningClients: 44.9,
    returningClientsChange: -8.3,
    rating: 0,
    totalBookings: 78,
    completedBookings: 74,
    totalClients: 51,
    workingHours: 1500.5,
    scheduledHours: 190,
    bookedHours: 38.0
  }
];

const bottomPerformers: TeamMemberPerformance[] = [
  {
    id: "6",
    name: "Gentle reception",
    initial: "G",
    sales: 45000,
    salesChange: -6.6,
    occupancy: 0,
    occupancyChange: 0,
    returningClients: 0,
    returningClientsChange: 0,
    rating: 0,
    totalBookings: 12,
    completedBookings: 10,
    totalClients: 8,
    workingHours: 240,
    scheduledHours: 40,
    bookedHours: 0
  },
  {
    id: "7",
    name: "Toffee Sangram",
    initial: "T",
    sales: 270000,
    salesChange: -7.7,
    occupancy: 0,
    occupancyChange: 0,
    returningClients: 0,
    returningClientsChange: 0,
    rating: 0,
    totalBookings: 8,
    completedBookings: 6,
    totalClients: 5,
    workingHours: 160,
    scheduledHours: 30,
    bookedHours: 0
  },
  {
    id: "8",
    name: "Maasam branch",
    initial: "M",
    sales: 860000,
    salesChange: 135.8,
    occupancy: 5.3,
    occupancyChange: 6.2,
    returningClients: 0,
    returningClientsChange: 0,
    rating: 0,
    totalBookings: 25,
    completedBookings: 22,
    totalClients: 18,
    workingHours: 320,
    scheduledHours: 60,
    bookedHours: 3.2
  },
  {
    id: "9",
    name: "Jenny",
    initial: "J",
    sales: 78442.5,
    salesChange: -34.4,
    occupancy: 24.8,
    occupancyChange: -2.8,
    returningClients: 61.5,
    returningClientsChange: 6.8,
    rating: 0,
    totalBookings: 18,
    completedBookings: 15,
    totalClients: 12,
    workingHours: 280,
    scheduledHours: 50,
    bookedHours: 12.4
  },
  {
    id: "10",
    name: "Ragine",
    initial: "R",
    sales: 520000,
    salesChange: 18.8,
    occupancy: 25.7,
    occupancyChange: 3.3,
    returningClients: 66.6,
    returningClientsChange: 5.1,
    rating: 0,
    totalBookings: 35,
    completedBookings: 32,
    totalClients: 28,
    workingHours: 420,
    scheduledHours: 80,
    bookedHours: 20.6
  }
];

const formatCurrency = (amount: number) => {
  return `AED ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const formatPercentage = (value: number) => {
  return `${value.toFixed(1)}%`;
};

const getChangeColor = (change: number) => {
  if (change > 0) return "text-green-600";
  if (change < 0) return "text-red-600";
  return "text-gray-600";
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <TrendingUp className="w-3 h-3" />;
  if (change < 0) return <TrendingDown className="w-3 h-3" />;
  return null;
};

export const TeamPerformance = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Performance</h1>
        <p className="text-gray-600">Comprehensive team member analytics and performance metrics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Working Hours</CardTitle>
            <Calendar className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,908.50h</div>
            <p className="text-xs text-blue-600 mt-1">+1.8% vs same period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled Hours</CardTitle>
            <Calendar className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,800.80h</div>
            <p className="text-xs text-purple-600 mt-1">+4.9% vs same period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booked Hours</CardTitle>
            <Calendar className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,200.95h</div>
            <p className="text-xs text-green-600 mt-1">+8% vs same period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-amber-600 mt-1">+0.2 vs same period</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Team Members */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Team Members</CardTitle>
          <Button variant="outline" size="sm">View Report</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>% Returning Clients</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamPerformanceData.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {member.initial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{formatCurrency(member.sales)}</span>
                      <div className={`flex items-center space-x-1 text-xs ${getChangeColor(member.salesChange)}`}>
                        {getChangeIcon(member.salesChange)}
                        <span>{formatPercentage(Math.abs(member.salesChange))}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{formatPercentage(member.occupancy)}</span>
                      <div className={`flex items-center space-x-1 text-xs ${getChangeColor(member.occupancyChange)}`}>
                        {getChangeIcon(member.occupancyChange)}
                        <span>{formatPercentage(Math.abs(member.occupancyChange))}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{formatPercentage(member.returningClients)}</span>
                      <div className={`flex items-center space-x-1 text-xs ${getChangeColor(member.returningClientsChange)}`}>
                        {getChangeIcon(member.returningClientsChange)}
                        <span>{formatPercentage(Math.abs(member.returningClientsChange))}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>{member.rating}</span>
                      <span className="text-xs text-gray-500">({member.totalBookings})</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bottom Team Members */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Bottom Team Members</CardTitle>
          <Button variant="outline" size="sm">View Report</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Team Member</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>% Returning Clients</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bottomPerformers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-gray-100 text-gray-700">
                        {member.initial}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{formatCurrency(member.sales)}</span>
                      <div className={`flex items-center space-x-1 text-xs ${getChangeColor(member.salesChange)}`}>
                        {getChangeIcon(member.salesChange)}
                        <span>{formatPercentage(Math.abs(member.salesChange))}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{formatPercentage(member.occupancy)}</span>
                      <div className={`flex items-center space-x-1 text-xs ${getChangeColor(member.occupancyChange)}`}>
                        {getChangeIcon(member.occupancyChange)}
                        <span>{formatPercentage(Math.abs(member.occupancyChange))}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{formatPercentage(member.returningClients)}</span>
                      <div className={`flex items-center space-x-1 text-xs ${getChangeColor(member.returningClientsChange)}`}>
                        {getChangeIcon(member.returningClientsChange)}
                        <span>{formatPercentage(Math.abs(member.returningClientsChange))}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span>{member.rating}</span>
                      <span className="text-xs text-gray-500">({member.totalBookings})</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
