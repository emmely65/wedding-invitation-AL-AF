import Reveal from './Reveal.jsx';

function parseEventDate(dayDateStr, dayStr) {
  const parts = (dayDateStr || '').trim().split(' ');
  const dayNum = parts[0] || '19';
  const monthYear = parts.slice(1).join(' ').toUpperCase() || 'OKTOBER 2026';
  const dayName = dayStr || 'Senin';
  return { dayName, dayNum, monthYear };
}

function EventCard({ event }) {
  const { dayName, dayNum, monthYear } = parseEventDate(event.dayDate, event.day);
  const displayTitle = (event.title || '')
    .replace(/ Pernikahan$/i, '')
    .toUpperCase();

  return (
    <Reveal className="w-full mb-8 sm:mb-10 last:mb-0">
      <div
        style={{
          backgroundImage: "url('/images/bg-event-general-motion-v2.jpg')",
          backgroundSize: '100% 100%',
        }}
        className="relative w-full max-w-[340px] sm:max-w-[370px] rounded-[28px] sm:rounded-[32px] shadow-[0_14px_45px_rgba(0,0,0,0.35)] overflow-hidden text-center flex flex-col items-center pt-12 sm:pt-14 pb-12 sm:pb-14 px-5 sm:px-7 mx-auto border border-white/20"
      >
        {/* 1. Header Acara */}
        <div className="w-full flex flex-col items-center">
          <h3 className="font-serifDisplay font-bold text-[22px] sm:text-[25px] tracking-[0.2em] text-[#241F1C] uppercase leading-tight">
            {displayTitle}
          </h3>
          <div className="my-2 w-3/4 max-w-[180px] h-[1px] bg-[#8C7A75]/50 mx-auto" />
        </div>

        {/* 2. Hari, Tanggal, Jam (Padat & Jelas) */}
        <div className="w-full flex flex-col items-center my-1.5">
          <p className="font-greatVibes text-[38px] sm:text-[44px] text-[#241F1C] leading-none select-none font-normal">
            {dayName}
          </p>
          <p className="font-serifDisplay font-bold text-[56px] sm:text-[64px] text-[#5C0F1A] leading-[0.88] my-0.5 tracking-tight">
            {dayNum}
          </p>
          <p className="font-serifDisplay font-bold text-[15px] sm:text-[17px] tracking-[0.2em] text-[#241F1C] uppercase leading-none mt-1">
            {monthYear}
          </p>

          <div className="inline-flex items-center justify-center gap-1.5 mt-2.5 text-[#241F1C]">
            <svg
              className="h-4 w-4 text-[#5C0F1A] shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-serifDisplay text-[14px] sm:text-[16px] font-bold tracking-wide leading-none">
              {event.time}
            </span>
          </div>
        </div>

        {/* 3. Lokasi & Google Maps (Padat & Jelas) */}
        <div className="w-full flex flex-col items-center mt-3">
          <p className="font-serifDisplay text-[17px] sm:text-[19px] font-bold text-[#241F1C] leading-none">
            Lokasi Acara
          </p>
          <p className="font-serifDisplay text-[15px] sm:text-[17px] font-semibold text-[#3D342F] mt-1.5 leading-snug">
            {event.place}
          </p>
          <p className="font-sansBody text-[13px] sm:text-[14px] text-[#5A4F49] mt-1 leading-snug max-w-[270px] mx-auto">
            {event.address}
          </p>

          <div className="mt-3.5 sm:mt-4">
            <a
              href={event.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#5C0F1A] px-5 py-2 text-[13px] sm:text-[14px] font-bold text-white shadow-sm transition duration-200 hover:scale-105 active:scale-95 hover:bg-[#6e1320]"
            >
              <svg
                className="h-3.5 w-3.5 text-white fill-current shrink-0"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
              <span className="font-serifDisplay font-bold tracking-wide leading-none">
                Google Maps
              </span>
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function EventDetails({ events = [] }) {
  return (
    <section
      id="events"
      style={{ backgroundColor: 'rgba(92, 15, 26, 0.9)' }}
      className="relative z-10 w-full px-4 sm:px-6 py-12 sm:py-16 flex flex-col items-center overflow-hidden border-b border-white/15"
    >
      <div className="w-full max-w-md flex flex-col items-center">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
