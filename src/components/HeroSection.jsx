import { useEffect, useState, useRef } from 'react';

export default function HeroSection({ data, opened }) {
  const videoRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

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

    const startPlaybackFromBeginning = () => {
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
              href="#quote"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="scroll-indicator flex h-10 w-6 sm:h-11 sm:w-7 items-center justify-center rounded-full border-[1.8px] border-stone-700/80 text-stone-700 transition hover:border-maroon hover:text-maroon"
              aria-label="Scroll ke seksi Quote"
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
    </section>
  );
}
