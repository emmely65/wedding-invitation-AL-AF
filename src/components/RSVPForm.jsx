import { useState, useEffect } from 'react';
import Reveal from './Reveal.jsx';

const GOOGLE_SHEETS_API_URL =
  import.meta.env.VITE_RSVP_API_URL ||
  'https://script.google.com/macros/s/AKfycbxhqvpUEwbjioP-vaoRLtI3dSHO6suUfdAOG8x8ChgrtcFgShsJDZh2s5ZmnLXX1stDlA/exec';

const DEFAULT_WISHES = [
  {
    id: 'sample-1',
    name: 'Asri',
    message: 'Selamat ya kak',
    attendance: 'present',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'sample-2',
    name: 'Fazaaa',
    message: 'Bagusss banget undangannya, murah lagii❤️🥰🥰',
    attendance: 'present',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'sample-3',
    name: 'Firman',
    message: 'Masyaallahhhh cantiknyaaa😍',
    attendance: 'present',
    created_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: 'sample-4',
    name: 'Nindy',
    message: 'Bantu milihin temen, kok jadi kepengen nyusul buat😍. Tahun depan yaa bersama calon yang masih jadi rahasia Allah',
    attendance: 'present',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
];

export default function RSVPForm({ guestName }) {
  const [name, setName] = useState(guestName || '');
  const [attendance, setAttendance] = useState('present');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [wishes, setWishes] = useState([]);

  useEffect(() => {
    fetchWishes();
  }, []);

  async function fetchWishes() {
    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL);
      const result = await response.json();
      if (result && result.status === 'success' && Array.isArray(result.data) && result.data.length > 0) {
        setWishes(result.data);
      }
    } catch (err) {
      console.error('Google Sheets fetch exception:', err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      alert('Harap lengkapi nama dan ucapan Anda.');
      return;
    }

    setLoading(true);

    const newWish = {
      name: name.trim(),
      attendance: attendance || 'present',
      message: message.trim(),
    };

    try {
      const response = await fetch(GOOGLE_SHEETS_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(newWish),
      });

      const result = await response.json();

      if (result && result.status === 'success' && result.data) {
        setWishes((prev) => [result.data, ...prev]);
      } else {
        // Optimistic UI fallback
        setWishes((prev) => [
          {
            id: `local-${Date.now()}`,
            ...newWish,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }

      setSubmitted(true);
      setMessage('');
      setTimeout(() => setSubmitted(false), 3500);
    } catch (err) {
      console.error('Submit error:', err);
      // Optimistic UI fallback jika jaringan lambat
      setWishes((prev) => [
        {
          id: `local-${Date.now()}`,
          ...newWish,
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setSubmitted(true);
      setMessage('');
      setTimeout(() => setSubmitted(false), 3500);
    } finally {
      setLoading(false);
    }
  }

  const displayedWishes = wishes.length > 0 ? wishes : DEFAULT_WISHES;

  return (
    <section
      id="rsvp"
      style={{ backgroundColor: 'rgba(253, 246, 238, 0.75)' }}
      className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center overflow-hidden border-b border-black/10"
    >
      {/* Ornamen Kanan Atas (Tangkai di kanan) */}
      <img
        src="/images/asset-general-motion-v1-3-min.png"
        alt=""
        aria-hidden="true"
        style={{ transform: 'scaleX(-1)' }}
        className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-32 sm:w-40 md:w-44 pointer-events-none select-none z-0 object-contain drop-shadow-md"
      />

      {/* Ornamen Kiri (Tangkai di kiri) */}
      <img
        src="/images/asset-general-motion-v1-3-min.png"
        alt=""
        aria-hidden="true"
        className="absolute top-[24%] sm:top-[26%] -left-5 sm:-left-7 w-28 sm:w-36 pointer-events-none select-none z-0 object-contain drop-shadow-md"
      />

      <div className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] flex flex-col items-center mx-auto">
        {/* Judul: Wishes */}
        <Reveal>
          <div className="text-center">
            <h2 className="font-greatVibes text-[44px] sm:text-[52px] text-[#241C1A] leading-tight select-none font-normal">
              Wishes
            </h2>
            <p className="font-serifDisplay text-xs sm:text-[13px] text-[#554641] tracking-wide mt-1">
              Berikan doa dan ucapan terbaik untuk kami.
            </p>
          </div>
        </Reveal>

        {/* Form RSVP */}
        <Reveal delay={150} className="w-full mt-6 sm:mt-7">
          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            {/* Input Nama */}
            <input
              id="rsvp-name"
              type="text"
              className="w-full rounded-lg sm:rounded-xl border border-[#8C7A75]/35 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-serifDisplay text-[#241C1A] placeholder:text-[#A89A94] shadow-sm focus:border-[#5C0F1A] focus:outline-none focus:ring-1 focus:ring-[#5C0F1A]/20 transition"
              placeholder="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            {/* Textarea Ucapan */}
            <textarea
              id="rsvp-message"
              className="w-full mt-2.5 sm:mt-3 rounded-lg sm:rounded-xl border border-[#8C7A75]/35 bg-white px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-serifDisplay text-[#241C1A] placeholder:text-[#A89A94] shadow-sm min-h-[85px] sm:min-h-[95px] resize-none focus:border-[#5C0F1A] focus:outline-none focus:ring-1 focus:ring-[#5C0F1A]/20 transition"
              placeholder="Ucapan"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />

            {/* Divider Konfirmasi Kehadiran */}
            <div className="relative my-3.5 sm:my-4 flex items-center justify-center w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#8C7A75]/35" />
              </div>
              <span
                className="relative px-3 text-xs sm:text-[13px] font-serifDisplay font-semibold text-[#443834] tracking-wide"
                style={{ backgroundColor: 'rgba(253, 246, 238, 0.85)' }}
              >
                Konfirmasi Kehadiran
              </span>
            </div>

            {/* Tombol Opsi Hadir / Ragu / Tidak Hadir */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 w-full">
              {/* Hadir */}
              <button
                type="button"
                onClick={() => setAttendance('present')}
                className={`flex items-center justify-center gap-1 rounded-full py-2 sm:py-2.5 px-1.5 sm:px-2.5 border transition duration-200 shadow-sm ${
                  attendance === 'present'
                    ? 'border-[#5C0F1A] bg-[#5C0F1A] text-white font-semibold'
                    : 'border-[#5C0F1A]/70 bg-[#F8EFEA]/80 text-[#241C1A] hover:bg-[#F8EFEA]'
                }`}
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-serifDisplay text-[10.5px] sm:text-xs whitespace-nowrap">
                  Hadir
                </span>
              </button>

              {/* Ragu */}
              <button
                type="button"
                onClick={() => setAttendance('notsure')}
                className={`flex items-center justify-center gap-1 rounded-full py-2 sm:py-2.5 px-1.5 sm:px-2.5 border transition duration-200 shadow-sm ${
                  attendance === 'notsure'
                    ? 'border-[#5C0F1A] bg-[#5C0F1A] text-white font-semibold'
                    : 'border-[#5C0F1A]/70 bg-[#F8EFEA]/80 text-[#241C1A] hover:bg-[#F8EFEA]'
                }`}
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-serifDisplay text-[10.5px] sm:text-xs whitespace-nowrap">
                  Ragu
                </span>
              </button>

              {/* Tidak Hadir */}
              <button
                type="button"
                onClick={() => setAttendance('notpresent')}
                className={`flex items-center justify-center gap-1 rounded-full py-2 sm:py-2.5 px-1.5 sm:px-2.5 border transition duration-200 shadow-sm ${
                  attendance === 'notpresent'
                    ? 'border-[#5C0F1A] bg-[#5C0F1A] text-white font-semibold'
                    : 'border-[#5C0F1A]/70 bg-[#F8EFEA]/80 text-[#241C1A] hover:bg-[#F8EFEA]'
                }`}
              >
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-serifDisplay text-[10.5px] sm:text-xs whitespace-nowrap">
                  Tidak Hadir
                </span>
              </button>
            </div>

            {/* Tombol Kirim */}
            <button
              type="submit"
              disabled={loading}
              className="mt-3.5 w-full rounded-full bg-[#540912] hover:bg-[#680C17] active:scale-[0.98] py-2.5 sm:py-3 text-center text-xs sm:text-sm font-bold font-serifDisplay text-white tracking-wider shadow-md transition duration-200 disabled:opacity-60"
            >
              {loading
                ? 'Mengirim...'
                : submitted
                ? 'Ucapan Terkirim! Terima kasih ❤️'
                : 'Kirim'}
            </button>
          </form>
        </Reveal>

        {/* Daftar Ucapan (Wishes Cards) */}
        <Reveal delay={250} className="w-full mt-6">
          <div
            className="w-full space-y-2.5 sm:space-y-3 max-h-[380px] overflow-y-auto pr-1"
            style={{ scrollbarWidth: 'thin' }}
          >
            {displayedWishes.map((wish) => (
              <div
                key={wish.id}
                className="w-full rounded-xl sm:rounded-2xl bg-white/95 border border-[#8C7A75]/15 p-3.5 sm:p-4 text-left shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serifDisplay font-bold text-xs sm:text-sm text-[#5C0F1A] leading-none">
                    {wish.name}
                  </h4>
                  {wish.attendance === 'present' && (
                    <span className="text-[10px] font-serifDisplay font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      Hadir
                    </span>
                  )}
                  {wish.attendance === 'notsure' && (
                    <span className="text-[10px] font-serifDisplay font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                      Ragu
                    </span>
                  )}
                  {wish.attendance === 'notpresent' && (
                    <span className="text-[10px] font-serifDisplay font-semibold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full border border-stone-200">
                      Tidak Hadir
                    </span>
                  )}
                </div>
                <p className="mt-1.5 font-serifDisplay text-xs sm:text-[13px] text-[#2F2623] leading-relaxed whitespace-pre-wrap">
                  {wish.message}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
