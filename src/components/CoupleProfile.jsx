import { useEffect, useRef, useState } from 'react';

// Komponen Pembungkus Animasi Muncul Teks Per-Blok Saat Masuk Viewport
function AnimatedBlock({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export default function CoupleProfile({ data }) {
  const bride = data?.couple?.bride || {};
  const groom = data?.couple?.groom || {};

  return (
    <section
      id="couple"
      className="relative z-10 w-full py-16 sm:py-24 px-4 flex flex-col items-center justify-center"
    >
      {/* ─── KARTU PANEL KAPSUL / ARCH ELEGAN (Polos, Transparan ~60%, Bawah Terpotong Tepat 3 - 3.5 cm) ─── */}
      <div
        className="relative w-full max-w-[365px] sm:max-w-[415px] rounded-[175px] sm:rounded-[200px] bg-[#F8F2EC]/60 backdrop-blur-md border-[2px] sm:border-[2.5px] border-[#5C0F1A] pt-[118px] sm:pt-[134px] pb-[114px] sm:pb-[133px] px-5 sm:px-8 shadow-[0_14px_50px_rgba(0,0,0,0.28),0_2px_10px_rgba(92,15,26,0.14)] z-10 overflow-hidden text-center flex flex-col items-center"
      >
        {/* ─── KONTEN: HEADER + PROFIL WANITA + PEMBATAS & + PROFIL PRIA ─── */}
        <div className="w-full flex flex-col items-center">
          {/* 1. HEADER: KEDUA MEMPELAI & SALAM PEMBUKA (Font Sesuai Gambar & Padat) */}
          <AnimatedBlock className="relative z-10 w-full" delay={100}>
            {/* Judul Cursive Kaligrafi Sesuai Gambar */}
            <h2 className="font-aston text-[28px] sm:text-[32px] text-[#262626] font-normal leading-[1.3] select-none tracking-normal">
              Kedua Mempelai
            </h2>

            {/* Salam Pembuka - Lebih Besar Sedikit tapi Tetap Padat */}
            <p className="mt-2.5 sm:mt-3 font-serifDisplay text-[14.5px] sm:text-[15.5px] font-semibold text-[#1F1A1C] tracking-wide">
              Assalamu'alaikum Warahmatullahi Wabarakatuh
            </p>

            {/* Muqaddimah / Doa Pengiring - Lebih Besar Sedikit tapi Tetap Padat */}
            <p className="mt-2 sm:mt-2.5 font-serifDisplay text-[13.5px] sm:text-[14.5px] text-[#3D2E32] leading-snug sm:leading-relaxed max-w-[290px] sm:max-w-[325px] mx-auto">
              Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga
              ridho-Mu tercurah mengiringi pernikahan kami.
            </p>
          </AnimatedBlock>

          {/* 2. PROFIL MEMPELAI WANITA (Dibuat Lebih Ke Atas: Berjarak 1 - 1.5 cm / 38-57px dari teks di atasnya) */}
          <AnimatedBlock className="relative z-10 w-full mt-[38px] sm:mt-[57px]" delay={150}>
            {/* Nama Panggilan Cursive Tulisan Tangan */}
            <h3 className="font-pinyon text-6xl sm:text-7xl text-[#5C0F1A] font-normal leading-none select-none">
              {bride.name || 'Alfiya'}
            </h3>

            {/* Nama Lengkap Tegas Elegan - Full Hitam */}
            <h4 className="mt-3 sm:mt-3.5 font-serifDisplay text-[20px] sm:text-[22px] font-bold text-black tracking-wide">
              {bride.fullName || 'Alfiya Nurul Hidayah'}
            </h4>

            {/* Keterangan Putri Pertama, Nama Orang Tua & Alamat - Full Hitam */}
            <div className="mt-2.5 sm:mt-3 font-serifDisplay text-[13.5px] sm:text-[14.5px] text-black leading-relaxed">
              <p className="font-medium text-black">Putri Pertama dari</p>
              <p className="font-semibold text-black mt-1">Bapak A. Nurul Huda dan Ibu Kuswati</p>
              <p className="text-[12px] sm:text-[13px] text-black/85 mt-1 max-w-[275px] sm:max-w-[305px] mx-auto leading-snug">
                Dk. Beketuk RT.13 RW.04 ds. Wedoro kec. Sugihwaras kab. Bojonegoro
              </p>
            </div>
          </AnimatedBlock>

          {/* 3. PEMBATAS ORNAMEN BUNGA & (Lebih Besar Seukuran Alfiya & Terkunci Tepat 1.5 - 2 cm / 57-76px Langsung di Bawah Profil Wanita) */}
          <AnimatedBlock className="relative z-10 w-full flex items-center justify-center mt-[57px] sm:mt-[76px]" delay={100}>
            <img
              src="/images/asset-general-motion-v1-2-min.png"
              alt="&"
              className="h-16 sm:h-20 w-auto object-contain drop-shadow-sm select-none"
            />
          </AnimatedBlock>

          {/* 4. PROFIL MEMPELAI PRIA (Dinaikkan & Terkunci Tepat 1.5 - 2 cm / 57-76px Langsung di Bawah Gambar &) */}
          <AnimatedBlock className="relative z-10 w-full mt-[57px] sm:mt-[76px]" delay={150}>
            {/* Nama Panggilan Cursive Tulisan Tangan */}
            <h3 className="font-pinyon text-6xl sm:text-7xl text-[#5C0F1A] font-normal leading-none select-none">
              {groom.name || 'Affandi'}
            </h3>

            {/* Nama Lengkap Tegas Elegan - Full Hitam */}
            <h4 className="mt-3 sm:mt-3.5 font-serifDisplay text-[20px] sm:text-[22px] font-bold text-black tracking-wide">
              {groom.fullName || 'Achmad Shodiqun Affandi'}
            </h4>

            {/* Keterangan Putra Keempat, Nama Orang Tua & Alamat - Full Hitam */}
            <div className="mt-2.5 sm:mt-3 font-serifDisplay text-[13.5px] sm:text-[14.5px] text-black leading-relaxed">
              <p className="font-medium text-black">Putra Keempat dari</p>
              <p className="font-semibold text-black mt-1">Bapak Ahmad Dalil dan Ibu Samisih</p>
              <p className="text-[12px] sm:text-[13px] text-black/85 mt-1 max-w-[275px] sm:max-w-[305px] mx-auto leading-snug">
                Dk. Kalitengah RT.02 RW.01 ds. Babad kec. Kedungadem kab. Bojonegoro
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </div>
    </section>
  );
}
