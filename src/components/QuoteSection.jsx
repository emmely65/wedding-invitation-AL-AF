import { useEffect, useRef, useState } from 'react';

export default function QuoteSection({ data }) {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const groomInitial =
    data?.loveQuote?.initials?.left ||
    (data?.groomShort ? data.groomShort.charAt(0).toUpperCase() : 'A');
  const brideInitial =
    data?.loveQuote?.initials?.right ||
    (data?.brideShort ? data.brideShort.charAt(0).toUpperCase() : 'A');

  const quoteText =
    data?.loveQuote?.caption ||
    'Menurut kita cinta hanya sebuah kebohongan bagi mereka yang tidak bisa membuktikan dihubungan yang serius dan Tidak ada yang lebih indah dari 2 raga yang saling menjaga, tidak bertemu, namun saling menunggu tidak berpapasan, namun saling memantaskan';

  return (
    <section
      id="quote"
      ref={sectionRef}
      className="relative z-10 overflow-hidden w-full pt-[57px] pb-0 flex flex-col items-center justify-start bg-gradient-to-b from-[#5C0F1A] via-[#7A1B26] to-[#4A0B13]"
    >
      {/* ─── 1. Full-bleed background maroon gelap dengan tekstur floral samar/damask pattern di pojok atas ─── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#5C0F1A]/85 via-[#7A1B26]/80 to-[#4A0B13]/90 pointer-events-none z-0" />

      {/* Tekstur Floral / Damask Pattern Samar di Pojok Kiri Atas */}
      <div
        className={`absolute top-0 left-0 w-36 h-36 sm:w-44 sm:h-44 pointer-events-none z-0 transition-opacity duration-1000 ease-out ${
          inView ? 'opacity-25' : 'opacity-0'
        }`}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#C9A15A]">
          <path d="M0 0 C 35 5, 55 25, 55 55 C 55 85, 75 95, 100 100" stroke="currentColor" strokeWidth="0.8" />
          <path d="M0 25 C 30 25, 50 45, 60 75" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <path d="M25 5 Q 40 25 25 45 Q 10 25 25 5" stroke="currentColor" strokeWidth="0.6" fill="currentColor" fillOpacity="0.08" />
          <circle cx="25" cy="25" r="4" fill="currentColor" opacity="0.4" />
          <path d="M5 25 Q 25 40 45 25 Q 25 10 5 25" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="55" cy="55" r="3" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* ─── 2. Dekorasi salju / bunga putih kecil di pojok kanan atas sebagai aksen ringan ─── */}
      <div
        className={`absolute top-3 right-3 sm:top-5 sm:right-5 z-20 pointer-events-none flex items-center justify-center transition-all duration-1000 ease-out delay-200 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        <svg
          className="w-24 h-24 sm:w-28 sm:h-28 text-white drop-shadow-sm animate-softPulse"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Ranting halus aksen emas */}
          <path d="M92 8 Q 65 28 46 64" stroke="#C9A15A" strokeWidth="1" strokeLinecap="round" opacity="0.65" />
          <path d="M78 20 Q 56 34 60 48" stroke="#C9A15A" strokeWidth="0.8" strokeLinecap="round" opacity="0.55" />
          <path d="M56 42 Q 40 48 34 58" stroke="#C9A15A" strokeWidth="0.7" strokeLinecap="round" opacity="0.5" />

          {/* Bunga-bunga putih kecil (Baby's breath / Snow blossoms) */}
          <circle cx="88" cy="12" r="3.2" fill="white" opacity="0.95" />
          <circle cx="72" cy="22" r="3.5" fill="white" opacity="0.9" />
          <circle cx="75" cy="17" r="2.2" fill="#F5EDE4" opacity="0.85" />
          <circle cx="62" cy="34" r="3" fill="white" opacity="0.9" />
          <circle cx="50" cy="50" r="3.2" fill="white" opacity="0.95" />
          <circle cx="38" cy="60" r="2.4" fill="#F5EDE4" opacity="0.85" />
          <circle cx="58" cy="48" r="2.2" fill="white" opacity="0.8" />
          
          {/* Aksentuasi butiran salju halus */}
          <circle cx="80" cy="36" r="1.5" fill="white" opacity="0.75" />
          <circle cx="44" cy="40" r="1.2" fill="white" opacity="0.7" />
          <circle cx="66" cy="10" r="1.5" fill="#C9A15A" opacity="0.7" />
          <circle cx="90" cy="26" r="1.2" fill="white" opacity="0.85" />
        </svg>
      </div>

      {/* Frame Container - Jarak puncak kubah ke batas atas menu tepat ~1,5cm (57px) */}
      <div className="relative w-full px-[18px] sm:px-6 flex items-center justify-center z-10 pt-0 pb-0">
        
        {/* ─── DUA POHON: asset-general-motion-v1-4-min (Muncul Bersamaan di Kiri & Kanan Secara Mulus) ─── */}
        {/* Pohon Kiri (Mirrored - Bebas Konflik Transform) */}
        <img
          src="/images/asset-general-motion-v1-4-min.png"
          alt="Dekorasi pohon kiri"
          style={{
            transform: inView ? 'scaleX(-1) translateY(0)' : 'scaleX(-1) translateY(24px)',
          }}
          className={`absolute -left-3 sm:-left-6 top-0 sm:-top-2 w-44 sm:w-52 pointer-events-none object-contain z-0 drop-shadow-md transition-all duration-1000 ease-out delay-100 ${
            inView ? 'opacity-85' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Pohon Kanan */}
        <img
          src="/images/asset-general-motion-v1-4-min.png"
          alt="Dekorasi pohon kanan"
          style={{
            transform: inView ? 'translateY(0)' : 'translateY(24px)',
          }}
          className={`absolute -right-3 sm:-right-6 top-0 sm:-top-2 w-44 sm:w-52 pointer-events-none object-contain z-0 drop-shadow-md transition-all duration-1000 ease-out delay-100 ${
            inView ? 'opacity-85' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* ─── PANEL / KARTU KUBAH ARCH (Transisi Mulus & Elegan) ─── */}
        <div
          className={`relative w-full max-w-[390px] sm:max-w-[420px] rounded-t-[185px] sm:rounded-t-[210px] rounded-b-none bg-[#F5EDE4] border-t-[1.5px] border-x-[1.5px] border-b-0 border-[#C9A15A]/70 pt-6 sm:pt-7 pb-[171px] sm:pb-[187px] px-5 sm:px-8 shadow-[0_6px_24px_rgba(0,0,0,0.22),0_1px_6px_rgba(0,0,0,0.12),0_0_15px_rgba(201,161,90,0.1)] z-10 overflow-hidden text-center transition-all duration-1000 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Inner watermark halus */}
          <div className="absolute inset-0 opacity-[0.035] bg-[radial-gradient(#5C0F1A_1.5px,transparent_1.5px)] [background-size:18px_18px] pointer-events-none" />

          {/* ─── KONTEN DI DALAM PANEL CREAM (Muncul Halus Bertingkat) ─── */}
          <div className="relative z-20 w-full">
            {/* 1. Monogram inisial dua huruf besar bergaya serif elegan: A & A */}
            <div
              className={`relative mx-auto flex items-center justify-center h-28 sm:h-32 w-56 sm:w-64 mt-6 sm:mt-7 mb-[56px] sm:mb-[48px] transition-all duration-1000 ease-out delay-300 ${
                inView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
              }`}
            >
              <span className="font-serifDisplay text-7xl sm:text-8xl font-normal text-[#5C0F1A] absolute left-3 sm:left-4 top-1 leading-none drop-shadow-sm select-none">
                {groomInitial}
              </span>
              <img
                src="/images/asset-general-motion-v1-2-min.png"
                alt="&"
                className="h-16 sm:h-20 w-auto object-contain z-10 drop-shadow-sm select-none"
              />
              <span className="font-serifDisplay text-7xl sm:text-8xl font-normal text-[#5C0F1A] absolute right-3 sm:right-4 bottom-1 leading-none drop-shadow-sm select-none">
                {brideInitial}
              </span>
            </div>

            {/* 2. Kutipan / quote warna HITAM murni */}
            <blockquote
              className={`font-serifDisplay italic font-medium text-black text-[18px] sm:text-[20px] leading-[1.85] sm:leading-[1.9] tracking-[0.01em] px-1 sm:px-2 max-w-[350px] sm:max-w-[380px] mx-auto transition-all duration-1000 ease-out delay-500 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              “{quoteText}”
            </blockquote>
          </div>
        </div>
      </div>

      {/* ─── 3. ILUSTRASI BUNGA BAWAH: Menutupi Bagian Bawah Panel Kubah (Transisi Mengalir Halus) ─── */}
      <div
        className={`absolute bottom-0 left-0 right-0 w-full pointer-events-none z-30 transition-all duration-1000 ease-out delay-300 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <img
          src="/images/asset-general-motion-v1-min.png"
          alt="Rangkaian bunga mawar merah marun, daun eucalyptus, dan bunga putih kecil"
          className="w-full h-auto min-h-[140px] max-h-[220px] object-cover object-top drop-shadow-2xl"
          loading="lazy"
        />
      </div>
    </section>
  );
}
