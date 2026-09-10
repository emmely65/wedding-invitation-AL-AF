import { useEffect, useMemo, useState, useRef } from 'react';

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
    <div className="rounded-2xl border border-maroon/20 bg-white/70 px-3 py-3 text-center shadow-card backdrop-blur sm:px-5">
      <div className="font-serifDisplay text-2xl font-bold tabular-nums text-maroon sm:text-3xl">
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-maroon/70">
        {label}
      </div>
    </div>
  );
}

export default function HeroSection({ data, opened }) {
  const videoRef = useRef(null);
  const [time, setTime] = useState(() => getCountdown(data.countdownTarget));
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setTime(getCountdown(data.countdownTarget)), 1000);
    return () => window.clearInterval(timer);
  }, [data.countdownTarget]);

  // Sinkronisasi pemutaran video hero agar diputar 1 kali lalu diam di frame terakhir
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.loop = false;

    if (!opened) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (_) {}
      setShowContent(false);
      return;
    }

    const handleEnded = () => {
      video.pause();
      setShowContent(true);
    };

    const handleTimeUpdate = () => {
      // Teks muncul di detik 7 s/d 8 video (sekitar 7.4s saat bingkai oval selesai terbentuk sempurna)
      if (video.currentTime >= 7.4) {
        setShowContent(true);
      }
    };

    // Fungsi pemutaran presisi dari awal (hanya 1 kali putar)
    const startPlaybackFromBeginning = () => {
      video.loop = false;
      try {
        video.currentTime = 0;
      } catch (_) {}

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.debug('Autoplay fallback:', err);
        });
      }
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('timeupdate', handleTimeUpdate);

    if (video.readyState >= 1) {
      startPlaybackFromBeginning();
    } else {
      video.addEventListener('loadedmetadata', startPlaybackFromBeginning, { once: true });
    }

    // Fallback timer jika browser throttle timeupdate (7.5 detik)
    const timer = setTimeout(() => setShowContent(true), 7500);

    return () => {
      clearTimeout(timer);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', startPlaybackFromBeginning);
    };
  }, [opened]);

  const calendarUrl = useMemo(() => {
    const event = data.events[0];
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: `The Wedding of ${data.coupleName}`,
      dates: `${event.calendar.start}/${event.calendar.end}`,
      details: event.calendar.details,
      location: event.calendar.location,
    });
    return `https://www.google.com/calendar/render?${params.toString()}`;
  }, [data]);

  return (
    <section id="home" className="relative w-full bg-softPink">
      {/* 1. HERO VIEWPORT - 1 Layar Penuh HP (100dvh) */}
      <div
        onClick={() => {
          if (!showContent) setShowContent(true);
        }}
        className="relative h-dvh min-h-[580px] w-full overflow-hidden flex flex-col justify-between"
      >
        {/* 3D Motion Video Background - Pas Layar Penuh (1x putar kemudian diam) */}
        <div className="absolute inset-0 z-0 bg-softPink overflow-hidden">
          <video
            ref={videoRef}
            key={data.heroVideoUrl}
            src={data.heroVideoUrl}
            className="h-full w-full object-cover object-center"
            muted
            playsInline
            preload="auto"
          />
        </div>

        {/* Content over background - sesuai contoh gambar */}
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 pb-16 sm:pb-20 text-center">
          {/* The Wedding Of */}
          <p
            className={`font-pinyon text-3xl sm:text-4xl italic text-stone-800 leading-tight transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-1' : 'opacity-0'
            }`}
          >
            The Wedding Of
          </p>

          {/* Bride Name (ALFIYA) */}
          <h2
            className={`mt-1.5 sm:mt-2 font-serifDisplay text-[42px] sm:text-5xl font-bold uppercase tracking-[0.1em] text-maroon leading-none drop-shadow-sm transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-2' : 'opacity-0'
            }`}
          >
            {data.brideShort}
          </h2>

          {/* Floral Ampersand Image */}
          <div
            className={`my-1 sm:my-1.5 transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-3' : 'opacity-0'
            }`}
          >
            <img
              src="/images/asset-general-motion-v1-2-min.png"
              alt="&"
              className="mx-auto h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
            />
          </div>

          {/* Groom Name (AFFANDI) */}
          <h2
            className={`font-serifDisplay text-[42px] sm:text-5xl font-bold uppercase tracking-[0.1em] text-maroon leading-none drop-shadow-sm transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-4' : 'opacity-0'
            }`}
          >
            {data.groomShort}
          </h2>

          {/* Date */}
          <p
            className={`mt-4 sm:mt-5 font-serifDisplay text-base sm:text-lg font-semibold tracking-[0.26em] text-stone-800 leading-none transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-5' : 'opacity-0'
            }`}
          >
            {data.coverDate}
          </p>

          {/* Capsule Scroll Down Indicator */}
          <div
            className={`mt-4 sm:mt-5 flex justify-center transition-all duration-700 ${
              showContent ? 'animate-zoomIn stagger-6' : 'opacity-0'
            }`}
          >
            <a
              href="#bismillah"
              className="scroll-indicator flex h-10 w-6 sm:h-11 sm:w-7 items-center justify-center rounded-full border-[1.8px] border-stone-700/80 text-stone-700 transition hover:border-maroon hover:text-maroon"
              aria-label="Scroll ke konten selanjutnya"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Countdown below hero */}
      <div className="relative z-10 bg-gradient-to-b from-softPink to-white px-5 pb-14 pt-10">
        <div className="mx-auto max-w-md">
          <div className="grid grid-cols-4 gap-2.5 sm:gap-4" aria-label="Countdown menuju acara">
            <CountdownCard value={time.days} label="Hari" />
            <CountdownCard value={time.hours} label="Jam" />
            <CountdownCard value={time.minutes} label="Menit" />
            <CountdownCard value={time.seconds} label="Detik" />
          </div>
          <div className="mt-8 text-center">
            <a
              href={calendarUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 3v2M19 3v2M3 7h18M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z" />
              </svg>
              Simpan Tanggal
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
