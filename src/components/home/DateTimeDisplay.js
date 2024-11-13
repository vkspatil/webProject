import React, { useEffect, useState } from "react";
import { CalendarIcon, ClockIcon } from "@heroicons/react/24/outline";

const DateTimeDisplay = ({ isMobile }) => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col space-y-2" : "space-x-4"
      } items-center text-[#563621]`}
    >
      <div className="flex items-center space-x-2">
        <CalendarIcon className="w-5 h-5" />
        <span className="font-medium">{dateTime.toLocaleDateString()}</span>
      </div>
      <div className="flex items-center space-x-2">
        <ClockIcon className="w-5 h-5" />
        <span className="font-medium">{dateTime.toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default DateTimeDisplay;
