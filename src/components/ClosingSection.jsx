import Reveal from './Reveal.jsx';

export default function ClosingSection({ data }) {
  const brideShort = data?.brideShort || 'Alfiya';
  const groomShort = data?.groomShort || 'Affandi';
  const coupleText = `${brideShort} & ${groomShort}`;

  // WhatsApp & Instagram contacts
  const rawWa = data?.contact?.whatsapp || data?.gift?.whatsappNumber || '082332779432';
  const cleanWa = String(rawWa).replace(/\D/g, '').replace(/^0/, '62');
  const waUrl = `https://wa.me/${cleanWa}`;
  const igUrl = data?.contact?.instagram || 'https://www.instagram.com/goes_mus_1991?stkn=OHE0N2JxcTgwdXg3';

  const scrollToTop = (e) => {
    e.preventDefault();
    const container = document.getElementById('main-scroll-container');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="closing" className="relative z-10 w-full overflow-hidden flex flex-col items-center">
      {/* ─── 1. FULL PANEL CREAM TRANSPARAN 75% ─── */}
      <div
        style={{ backgroundColor: 'rgba(253, 246, 238, 0.75)' }}
        className="relative w-full pt-14 sm:pt-16 pb-0 text-center flex flex-col items-center justify-start overflow-hidden"
      >
        <div className="relative z-20 w-full max-w-md px-5 sm:px-6 flex flex-col items-center mx-auto">
          {/* Judul: Terima Kasih */}
          <Reveal>
            <h2 className="font-greatVibes text-[44px] sm:text-[54px] text-[#241C1A] leading-tight select-none font-normal">
              Terima Kasih
            </h2>
          </Reveal>

          {/* Pesan Penutup */}
          <Reveal delay={150}>
            <p className="font-serifDisplay text-[15px] sm:text-[17px] text-[#4A3D38] leading-relaxed max-w-[320px] sm:max-w-[360px] mx-auto mt-3.5 sm:mt-4">
              {data?.closing?.text ||
                'Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.'}
            </p>
          </Reveal>

          {/* Salam Penutup */}
          <Reveal delay={250}>
            <p className="font-serifDisplay text-[15px] sm:text-[17px] text-[#4A3D38] font-medium leading-relaxed max-w-[320px] sm:max-w-[360px] mx-auto mt-3 sm:mt-3.5">
              {data?.closing?.salam || "Wassalamu'alaikum warahmatullahi wabarakatuh"}
            </p>
          </Reveal>

          {/* Kami Yang Berbahagia */}
          <Reveal delay={350}>
            <p className="font-serifDisplay text-[13px] sm:text-[14px] font-semibold text-[#4A3D38] tracking-wide mt-6 sm:mt-7">
              Kami Yang Berbahagia
            </p>
            <h3 className="font-greatVibes text-[38px] sm:text-[46px] text-[#5C0F1A] leading-tight select-none font-normal mt-1.5 sm:mt-2">
              {coupleText}
            </h3>
          </Reveal>
        </div>

        {/* ─── ORNAMEN asset-general-motion-v1-min (Menutupi bawah teks) ─── */}
        <div className="relative w-full mt-4 sm:mt-6 pointer-events-none select-none z-10">
          <img
            src="/images/asset-general-motion-v1-min.png"
            alt="Rangkaian Bunga Penutup"
            className="w-full h-auto min-h-[120px] max-h-[200px] object-cover object-top drop-shadow-md"
          />
        </div>
      </div>

      {/* ─── 2. FOOTER BAR WARNA MERAH MAROON GELAP SESUAI GAMBAR ─── */}
      <footer className="w-full bg-[#38040A] text-white pt-6 pb-20 sm:pb-12 px-5 text-center flex flex-col items-center">
        {/* Social Media Icons (Instagram, WhatsApp) */}
        <div className="flex items-center justify-center gap-5 mt-4">
          {/* Instagram */}
          <a
            href={igUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white/90 hover:text-white transition duration-200 hover:scale-110 active:scale-95"
            aria-label="Instagram"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noreferrer"
            className="text-white/90 hover:text-white transition duration-200 hover:scale-110 active:scale-95"
            aria-label="WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        </div>

        {/* Text HUBUNGI KAMI */}
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 text-[10px] sm:text-[11px] font-serifDisplay font-bold tracking-[0.25em] text-white/90 hover:text-white transition duration-200 uppercase"
        >
          HUBUNGI KAMI
        </a>

        {/* Tombol Kembali ke Atas */}
        <button
          type="button"
          onClick={scrollToTop}
          className="mt-4 inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-serifDisplay text-white/60 hover:text-white transition duration-200"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 15l7-7 7 7" />
          </svg>
          <span>Kembali ke atas</span>
        </button>
      </footer>
    </section>
  );
}
