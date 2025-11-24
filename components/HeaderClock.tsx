import React, { useState, useEffect } from 'react';

const HeaderClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
    
    return `${year}.${month}.${day} (${weekDay})`;
  };

  const formatTime = (date: Date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-end justify-center mr-4">
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        {formatDate(time)}
      </div>
      <div className="text-lg font-bold text-slate-800 dark:text-white leading-none tracking-wider">
        {formatTime(time)}
      </div>
    </div>
  );
};

export default HeaderClock;
