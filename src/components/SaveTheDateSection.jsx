import { useEffect, useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';

function getCountdown(target) {
  const distance = new Date(target).getTime() - Date.now();
  const safe = Math.max(distance, 0);
  return {
    days: Math.floor(safe / 86400000),
    hours: Math.floor((safe / 3600000) % 24),
    minutes: Math.floor((safe / 60000) % 60),
    seconds: Math.floor((safe / 1000) % 60),
  };
}

function CountdownCard({ value, label }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl sm:rounded-2xl border border-white/75 bg-black/10 backdrop-blur-[2px] py-3.5 sm:py-4 px-3 transition duration-200 hover:border-white hover:bg-black/20">
      <div className="font-serifDisplay text-2xl sm:text-3xl font-bold tabular-nums text-white leading-none">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1.5 font-serifDisplay text-xs sm:text-sm font-normal text-white/95 leading-none">
        {label}
      </div>
    </div>
  );
}

export default function SaveTheDateSection({ data }) {
  const [time, setTime] = useState(() => getCountdown(data.countdownTarget));

  useEffect(() => {
    const timer = window.setInterval(
      () => setTime(getCountdown(data.countdownTarget)),
      1000
    );
    return () => window.clearInterval(timer);
  }, [data.countdownTarget]);

  const calendarUrl = useMemo(() => {
    const event = data.events?.[0];
    if (!event?.calendar) return '#';
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `The Wedding of ${data.coupleName}`,
      dates: `${event.calendar.start}/${event.calendar.end}`,
      details: event.calendar.details || '',
      location: event.calendar.location || '',
    });
    return `https://www.google.com/calendar/render?${params.toString()}`;
  }, [data]);

  return (
    <section
      id="save-date"
      style={{ backgroundColor: 'rgba(92, 15, 26, 0.9)' }}
      className="relative z-10 w-full px-4 sm:px-6 pt-10 pb-12 sm:pt-14 sm:pb-16 text-center overflow-hidden border-b border-white/15"
    >
      {/* Ornamen Kanan Atas (Tangkai di kanan) */}
      <img
        src="/images/asset-general-motion-v1-3-min.png"
        alt=""
        aria-hidden="true"
        style={{ transform: 'scaleX(-1)' }}
        className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-32 sm:w-40 md:w-44 -scale-x-100 pointer-events-none select-none z-0 object-contain drop-shadow-md"
      />

      {/* Ornamen Kiri Bawah */}
      <img
        src="/images/asset-general-motion-v1-3-min.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[40%] sm:top-[42%] -left-5 sm:-left-7 -translate-y-1/4 w-28 sm:w-36 pointer-events-none select-none z-0 object-contain drop-shadow-md"
      />

      <div className="relative z-10 mx-auto max-w-md flex flex-col items-center">
        {/* Judul: Save The Date */}
        <Reveal>
          <h2 className="font-greatVibes text-[38px] sm:text-[46px] text-white font-normal leading-tight select-none drop-shadow-md tracking-wide">
            Save The Date
          </h2>
        </Reveal>

        {/* Countdown 2x2 Grid */}
        <Reveal delay={150} className="w-full mt-6 sm:mt-7">
          <div
            className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-[290px] sm:max-w-[330px] mx-auto"
            aria-label="Countdown menuju hari bahagia"
          >
            <CountdownCard value={time.days} label="Hari" />
            <CountdownCard value={time.hours} label="Jam" />
            <CountdownCard value={time.minutes} label="Menit" />
            <CountdownCard value={time.seconds} label="Detik" />
          </div>
        </Reveal>

        {/* Tombol Simpan Tanggal */}
        <Reveal delay={300} className="mt-6 sm:mt-7">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-semibold text-[#5C0F1A] shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition duration-200 hover:scale-105 active:scale-95 hover:bg-white/95"
          >
            <svg
              className="h-4 w-4 text-[#5C0F1A] fill-current shrink-0"
              viewBox="0 0 24 24"
            >
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM10.5 16.5l-2.5-2.5 1.4-1.4 1.1 1.1 3.6-3.6 1.4 1.4-5 5z" />
            </svg>
            <span className="font-serifDisplay text-sm sm:text-base font-semibold tracking-wide leading-none">
              Simpan Tanggal
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
