import Reveal from './Reveal.jsx';

export default function DoaPengantin({ doa }) {
  return (
    <section
      id="doa"
      style={{ backgroundColor: 'rgba(92, 15, 26, 0.9)' }}
      className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center overflow-hidden border-b border-white/15"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <Reveal>
          {/* Box Merah Maron Menyala, Tengah Putih Cream Transparan Tanpa Blur */}
          <div
            style={{ backgroundColor: 'rgba(255, 248, 243, 0.85)' }}
            className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-[24px] sm:rounded-[28px] border-2 sm:border-[2.5px] border-[#8B0014] shadow-[0_0_24px_rgba(163,14,34,0.4),0_12px_35px_rgba(0,0,0,0.35)] px-5 py-6 sm:px-6 sm:py-7 text-center mx-auto transition duration-300 flex flex-col items-center"
          >
            {/* Judul Cursive Doa Untuk Pengantin */}
            <h3 className="font-greatVibes text-[34px] sm:text-[40px] text-[#241C1A] leading-tight select-none font-normal">
              Doa Untuk Pengantin
            </h3>

            {/* Garis Pemisah Halus */}
            <div className="my-2.5 sm:my-3 w-4/5 max-w-[180px] h-[1px] bg-[#8C7A75]/35 mx-auto" />

            {/* Teks Doa Arab */}
            <p
              dir="rtl"
              className="arabic-text font-serif text-xl sm:text-2xl text-[#241C1A] leading-[2] sm:leading-[2.2] my-2 font-normal"
            >
              {doa.arabic}
            </p>

            {/* Transliterasi Latin */}
            <p className="font-serifDisplay italic text-xs sm:text-[13.5px] text-[#5C0F1A] font-semibold leading-relaxed mt-1">
              {doa.transliteration}
            </p>

            {/* Garis Pembatas Singkat */}
            <div className="my-2.5 w-1/3 max-w-[80px] h-[1px] bg-[#8C7A75]/30 mx-auto" />

            {/* Arti / Terjemahan Doa */}
            <p className="font-sansBody text-[11px] sm:text-xs text-[#554641] leading-relaxed max-w-[300px] mx-auto">
              {doa.translation}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
