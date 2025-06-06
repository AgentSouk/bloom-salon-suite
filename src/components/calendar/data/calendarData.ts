
export const teamMembers = [
  { id: 1, name: "Maasam branch", initial: "M", color: "bg-blue-100 text-blue-700" },
  { id: 2, name: "Jenny", initial: "J", color: "bg-purple-100 text-purple-700" },
  { id: 3, name: "Emy", initial: "E", color: "bg-green-100 text-green-700" },
  { id: 4, name: "Nadeen", initial: "N", color: "bg-pink-100 text-pink-700" },
  { id: 5, name: "Raghe", initial: "R", color: "bg-orange-100 text-orange-700" },
  { id: 6, name: "Rawan", initial: "R", color: "bg-teal-100 text-teal-700" },
  { id: 7, name: "Jannat", initial: "J", color: "bg-indigo-100 text-indigo-700" },
  { id: 8, name: "Areej", initial: "A", color: "bg-red-100 text-red-700" },
  { id: 9, name: "Samar", initial: "S", color: "bg-yellow-100 text-yellow-700" },
];

export const timeSlots = Array.from({ length: 60 }, (_, i) => {
  const hour = Math.floor(i / 4) + 8;
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

export const sampleAppointments = [
  {
    id: 1,
    clientName: "Sarah Johnson",
    service: "Gel Manicure",
    time: "10:15 - 11:15",
    memberId: 4,
    startSlot: 9,
    duration: 2,
    status: "upcoming"
  },
  {
    id: 2,
    clientName: "Emma Davis",
    service: "Classic Pedicure",
    time: "10:15 - 11:15",
    memberId: 5,
    startSlot: 9,
    duration: 2,
    status: "upcoming"
  },
  {
    id: 3,
    clientName: "Michael Brown",
    service: "Haircut & Beard Trim",
    time: "11:30 - 12:10",
    memberId: 1,
    startSlot: 14,
    duration: 1.3,
    status: "started"
  },
  {
    id: 4,
    clientName: "Lisa Chen",
    service: "Classic Manicure",
    time: "11:30 - 12:30",
    memberId: 4,
    startSlot: 14,
    duration: 2,
    status: "started"
  },
  {
    id: 5,
    clientName: "Amanda White",
    service: "Classic Pedicure",
    time: "11:30 - 12:30",
    memberId: 5,
    startSlot: 14,
    duration: 2,
    status: "started"
  },
  {
    id: 6,
    clientName: "James Wilson",
    service: "Haircut & Beard Zero",
    time: "10:25 - 11:25",
    memberId: 8,
    startSlot: 9.7,
    duration: 2,
    status: "started"
  },
  {
    id: 7,
    clientName: "Sophia Martinez",
    service: "Haircut & Blowdry",
    time: "11:00 - 12:00",
    memberId: 8,
    startSlot: 12,
    duration: 2,
    status: "started"
  },
  {
    id: 8,
    clientName: "Oliver Kim",
    service: "Children's Haircut",
    time: "11:20 - 12:20",
    memberId: 9,
    startSlot: 13.3,
    duration: 2,
    status: "completed"
  }
];
