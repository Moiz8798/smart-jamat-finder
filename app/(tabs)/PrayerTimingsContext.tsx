import React, { createContext, useContext, useState } from 'react';

type TimingsType = {
  Fajr: string;
  Zuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Jummah: string; // ✅ Jummah Added
};

const defaultTimings: TimingsType = {
  Fajr: '05:30 AM',
  Zuhr: '01:15 PM',
  Asr: '04:45 PM',
  Maghrib: '06:30 PM',
  Isha: '08:00 PM',
  Jummah: '01:45 PM', // ✅ Default Jummah Time
};

const PrayerTimingsContext = createContext<any>(null);

export const PrayerTimingsProvider = ({ children }: any) => {
  const [timings, setTimings] = useState<TimingsType>(defaultTimings);

  return (
    <PrayerTimingsContext.Provider value={{ timings, setTimings }}>
      {children}
    </PrayerTimingsContext.Provider>
  );
};

export const usePrayerTimings = () => useContext(PrayerTimingsContext);
