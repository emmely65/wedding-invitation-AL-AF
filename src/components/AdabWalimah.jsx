import Reveal from './Reveal.jsx';

const ADAB_ITEMS = [
  {
    number: '1',
    title: 'Menutup Aurat & Sopan',
    desc: 'Mengenakan busana yang rapi, sopan, dan menutup aurat sesuai syariat.',
  },
  {
    number: '2',
    title: 'Mendoakan Kebaikan Mempelai',
    desc: 'Mendoakan keberkahan bagi kedua mempelai dalam ikatan pernikahan.',
  },
  {
    number: '3',
    title: 'Menjaga Waktu Sholat',
    desc: 'Memperhatikan dan mendahulukan pelaksanaan sholat fardhu tepat waktu.',
  },
  {
    number: '4',
    title: 'Adab Makan & Minum',
    desc: 'Makan dan minum secara tertib sambil duduk dan menggunakan tangan kanan.',
  },
  {
    number: '5',
    title: 'Menjaga Kesopanan & Ketertiban',
    desc: 'Menjaga kesantunan, pergaulan yang baik, serta ketertiban bersama.',
  },
];

export default function AdabWalimah({ data }) {
  const introMessage =
    data?.adabWalimah?.message ||
    'Tanpa mengurangi rasa hormat, dimohon kepada para tamu undangan untuk memperhatikan adab walimah berikut:';

  return (
    <section
      id="adab"
      style={{ backgroundColor: 'rgba(92, 15, 26, 0.9)' }}
      className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center overflow-hidden border-b border-white/15"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        <Reveal>
          {/* Box Merah Maron Menyala, Tengah Putih Cream Transparan Tanpa Blur */}
          <div
            style={{ backgroundColor: 'rgba(255, 248, 243, 0.85)' }}
            className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-[24px] sm:rounded-[28px] border-2 sm:border-[2.5px] border-[#8B0014] shadow-[0_0_24px_rgba(163,14,34,0.4),0_12px_35px_rgba(0,0,0,0.35)] px-5 py-6 sm:px-6 sm:py-7 text-center mx-auto transition duration-300"
          >
            {/* Judul Cursive Adab Walimah */}
            <h3 className="font-greatVibes text-[34px] sm:text-[40px] text-[#241C1A] leading-tight select-none font-normal">
              Adab Walimah
            </h3>

            {/* Deskripsi Pembuka */}
            <p className="mt-1.5 text-xs sm:text-[13px] font-serifDisplay text-[#4A3D38] leading-relaxed max-w-[290px] mx-auto">
              {introMessage}
            </p>

            {/* Garis Pemisah Halus */}
            <div className="my-3 w-4/5 max-w-[180px] h-[1px] bg-[#8C7A75]/35 mx-auto" />

            {/* Poin-poin Adab Walimah */}
            <div className="w-full space-y-2.5 sm:space-y-3 text-left mt-3">
              {ADAB_ITEMS.map((item) => (
                <div key={item.number} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5C0F1A] text-white text-[10px] font-bold font-serifDisplay shadow-sm mt-0.5">
                    {item.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-serifDisplay font-bold text-xs sm:text-[13px] text-[#2A1E1B] leading-snug">
                      {item.title}
                    </p>
                    <p className="font-sansBody text-[11px] sm:text-xs text-[#554641] leading-snug mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Kalimat Penutup Santun */}
            <div className="mt-4 pt-3 border-t border-[#8C7A75]/30 text-center w-full">
              <p className="font-serifDisplay italic text-xs text-[#5C0F1A] font-semibold leading-normal">
                "Jazaakumullah Khairan Katsiran atas doa restu dan kerjasamanya"
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
