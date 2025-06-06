
export const getAppointmentColor = (status: string) => {
  switch (status) {
    case "upcoming":
      return "bg-yellow-200 text-yellow-800 border-yellow-300";
    case "started": 
      return "bg-green-200 text-green-800 border-green-300";
    case "completed":
      return "bg-gray-200 text-gray-600 border-gray-300";
    default:
      return "bg-gray-200 text-gray-600 border-gray-300";
  }
};

export const getCurrentTimePosition = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const startHour = 8;
  const hoursSinceStart = currentHour - startHour;
  const minutesFraction = currentMinute / 60;
  const totalHours = hoursSinceStart + minutesFraction;
  
  return totalHours * 60;
};

export const getTimeFromPosition = (position: number, slotHeight: number) => {
  const hourIndex = Math.floor(position / slotHeight);
  const startHour = 8;
  const selectedHour = startHour + hourIndex;
  
  if (selectedHour <= 23) {
    return `${selectedHour.toString().padStart(2, '0')}:00`;
  }
  return "23:30";
};
