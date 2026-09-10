import { useState, useEffect } from 'react';

export default function OpeningCover({ data, guestName, onOpen, isOpening }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Delay kemunculan awal 1 detik, lalu muncul berurutan (staggered cascade)
    const t1 = setTimeout(() => setStep(1), 1000); // 1. "The Wedding of"
    const t2 = setTimeout(() => setStep(2), 1800); // 2. "Alfiya & Affandi"
    const t3 = setTimeout(() => setStep(3), 2600); // 3. Info Tamu Undangan
    const t4 = setTimeout(() => setStep(4), 3400); // 4. Tombol "Buka Undangan"

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <section
      onClick={() => {
        if (!isOpening && step < 4) setStep(4);
      }}
      className="absolute inset-0 z-[90] flex items-center justify-center overflow-hidden bg-softPink"
    >
      {/* 1. Background Video saat cover masih aktif */}
      {!isOpening && (
        <video
          src="/general-maroon.mp4"
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}

      {/* 2. Daun Parting Transition (0.5 detik singkap ke kiri & kanan selaras dengan video) */}
      {isOpening && (
        <>
          {/* Left Leaf Door */}
          <div className="absolute inset-y-0 left-0 w-1/2 overflow-hidden z-20 pointer-events-none animate-leafPartLeft">
            <div
              className="absolute inset-y-0 left-0 w-[200%] h-full bg-cover bg-left"
              style={{ backgroundImage: `url(${data.photos.cover})` }}
            />
            {/* Soft botanical shadow on parting edge */}
            <div className="absolute right-0 inset-y-0 w-8 bg-gradient-to-r from-transparent to-maroon/25" />
          </div>

          {/* Right Leaf Door */}
          <div className="absolute inset-y-0 right-0 w-1/2 overflow-hidden z-20 pointer-events-none animate-leafPartRight">
            <div
              className="absolute inset-y-0 right-0 w-[200%] h-full bg-cover bg-right"
              style={{ backgroundImage: `url(${data.photos.cover})` }}
            />
            {/* Soft botanical shadow on parting edge */}
            <div className="absolute left-0 inset-y-0 w-8 bg-gradient-to-l from-transparent to-maroon/25" />
          </div>
        </>
      )}

      {/* Content - tampil berurutan tanpa layout jump */}
      <div
        className={`relative z-30 w-full max-w-[420px] px-6 py-6 sm:py-8 text-center transition-all duration-200 ease-out ${
          isOpening ? 'opacity-0 scale-90 pointer-events-none' : (step >= 1 ? 'opacity-100' : 'opacity-0 pointer-events-none')
        }`}
      >
        {/* 1. The Wedding Of */}
        <p
          className={`mb-2 font-pinyon text-4xl sm:text-5xl text-black italic leading-tight transition-all duration-700 ease-out ${
            step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          {data.coverTitle}
        </p>

        {/* 2. Names & Ampersand */}
        <div
          className={`my-3 flex flex-col items-center justify-center transition-all duration-700 ease-out ${
            step >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <h1 className="font-serifDisplay text-5xl sm:text-6xl font-semibold uppercase tracking-wider text-maroon leading-none">
            {data.brideShort}
          </h1>
          <img
            src="/images/asset-general-motion-v1-2-min.png"
            alt="&"
            className="my-1.5 h-16 sm:h-20 w-auto object-contain drop-shadow-sm"
          />
          <h1 className="font-serifDisplay text-5xl sm:text-6xl font-semibold uppercase tracking-wider text-maroon leading-none">
            {data.groomShort}
          </h1>
        </div>

        {/* 3. Guest info */}
        <div
          className={`mx-auto my-3.5 py-1 transition-all duration-700 ease-out ${
            step >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <p className="font-serifDisplay text-sm sm:text-base text-black leading-tight">
            Kepada Yth.
          </p>
          <p className="font-serifDisplay text-sm sm:text-base text-black leading-tight mb-1.5">
            Bapak/Ibu/Saudara/i
          </p>
          <p className="font-serifDisplay text-2xl sm:text-3xl font-bold text-black leading-snug">
            {guestName || 'Tamu Undangan'}
          </p>
          <p className="mt-2 font-serifDisplay text-xs sm:text-sm leading-tight italic text-black/85">
            *Mohon maaf jika ada kesalahan dalam penulisan nama / gelar.
          </p>
        </div>

        {/* 4. Open button */}
        <div
          className={`transition-all duration-700 ease-out ${
            step >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <button
            type="button"
            onClick={onOpen}
            className="group mx-auto mt-2.5 inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-maroon px-9 py-3 text-white shadow-xl transition-all duration-300 hover:scale-95 active:scale-90 hover:bg-maroon/90 focus:outline-none focus:ring-4 focus:ring-maroon/30"
            aria-label="Buka undangan pernikahan"
          >
            {/* Mail icon */}
            <svg className="h-5 w-5 transition group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-serifDisplay tracking-widest text-sm sm:text-base font-semibold uppercase">Buka Undangan</span>
          </button>
        </div>
      </div>
    </section>
  );
}
