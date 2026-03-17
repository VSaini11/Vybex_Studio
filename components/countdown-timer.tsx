'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return timeLeft;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const addZero = (num: number) => num < 10 ? `0${num}` : num;

  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-md px-2 py-1 min-w-[3rem]">
        <span className="text-lg font-bold text-white font-mono leading-none">{addZero(timeLeft.days)}</span>
        <span className="text-[9px] text-gray-400 uppercase font-medium">Days</span>
      </div>
      <span className="text-white/30 font-bold mb-3">:</span>
      <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-md px-2 py-1 min-w-[3rem]">
        <span className="text-lg font-bold text-white font-mono leading-none">{addZero(timeLeft.hours)}</span>
        <span className="text-[9px] text-gray-400 uppercase font-medium">Hrs</span>
      </div>
      <span className="text-white/30 font-bold mb-3">:</span>
      <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-md px-2 py-1 min-w-[3rem]">
        <span className="text-lg font-bold text-white font-mono leading-none">{addZero(timeLeft.minutes)}</span>
        <span className="text-[9px] text-gray-400 uppercase font-medium">Min</span>
      </div>
      <span className="text-white/30 font-bold mb-3">:</span>
      <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-md px-2 py-1 min-w-[3rem]">
        <span className="text-lg font-bold text-white font-mono leading-none">{addZero(timeLeft.seconds)}</span>
        <span className="text-[9px] text-blue-400 uppercase font-medium">Sec</span>
      </div>
    </div>
  );
}
