import React, { useMemo, useState } from 'react';
import { weddingData } from './data/weddingData.js';
import OpeningCover from './components/OpeningCover.jsx';
import HeroSection from './components/HeroSection.jsx';
import BismillahSection from './components/BismillahSection.jsx';
import CoupleProfile from './components/CoupleProfile.jsx';
import EventDetails from './components/EventDetails.jsx';
import AdabWalimah from './components/AdabWalimah.jsx';
import DoaPengantin from './components/DoaPengantin.jsx';
import RSVPForm from './components/RSVPForm.jsx';
import ClosingSection from './components/ClosingSection.jsx';
import MusicControl from './components/MusicControl.jsx';
import BottomNavigation from './components/BottomNavigation.jsx';

function getGuestName() {
  const params = new URLSearchParams(window.location.search);
  const value = params.get('to') || params.get('tamu') || params.get('nama');
  return value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [coverDismissed, setCoverDismissed] = useState(false);
  const [startKey, setStartKey] = useState(0);
  const guestName = useMemo(() => getGuestName(), []);

  function openInvitation() {
    setOpened(true);
    setIsOpening(true);
    setStartKey((v) => v + 1);

    // Remove scroll lock
    document.documentElement.classList.remove('cover-locked');
    document.body.classList.remove('cover-locked');

    // Ensure container starts cleanly at top
    const container = document.getElementById('main-scroll-container');
    if (container) container.scrollTop = 0;

    // After smooth leaf parting finishes (500ms), unmount cover
    window.setTimeout(() => {
      setCoverDismissed(true);
    }, 520);
  }

  // Lock scroll when cover is shown
  React.useEffect(() => {
    if (!opened) {
      document.documentElement.classList.add('cover-locked');
      document.body.classList.add('cover-locked');
    }
  }, [opened]);

  return (
    <div className="flex min-h-screen w-full bg-softPink font-sansBody text-ink antialiased overflow-hidden">
      
      {/* LEFT COLUMN - DESKTOP ONLY */}
      <div className="hidden lg:flex lg:w-[65%] h-full relative items-center justify-center border-r-8 border-maroon/10 shadow-2xl">
         <img src={weddingData.photos.cover} className="absolute inset-0 w-full h-full object-cover opacity-90" alt="Background" />
         <div className="absolute inset-0 bg-gradient-to-b from-maroon/10 to-transparent"></div>
         <div className="relative z-10 text-center animate-fadeInDown drop-shadow-lg">
            <p className="mb-2 font-pinyon text-4xl text-maroon italic leading-tight">{weddingData.coverTitle}</p>
            <h1 className="font-pinyon text-7xl font-normal text-maroon my-1 leading-none">{weddingData.brideShort}</h1>
            <img
              src="/images/asset-general-motion-v1-2-min.png"
              alt="&"
              className="mx-auto my-1 h-20 w-auto object-contain drop-shadow-md"
            />
            <h1 className="font-pinyon text-7xl font-normal text-maroon my-1 leading-none">{weddingData.groomShort}</h1>
         </div>
      </div>

      {/* RIGHT COLUMN - MAIN CONTAINER */}
      <div className={`w-full lg:w-[35%] h-full relative bg-white shadow-2xl overflow-x-hidden scroll-smooth ${opened ? 'overflow-y-auto' : 'overflow-hidden'}`} id="main-scroll-container">
        
        {!coverDismissed && (
          <OpeningCover
            data={weddingData}
            guestName={guestName}
            onOpen={openInvitation}
            isOpening={isOpening}
          />
        )}

        <main
          className={`${
            opened
              ? 'opacity-100'
              : 'pointer-events-none h-dvh overflow-hidden opacity-0'
          } transition-opacity duration-700`}
        >
          {/* 1. Hero with video */}
          <HeroSection data={weddingData} opened={opened} />

          {/* 2. Bismillah / Opening Islamic */}
          <BismillahSection data={weddingData} />

          {/* 3. Couple Profiles */}
          <CoupleProfile data={weddingData} />

          {/* 4. Event Details (Akad, Resepsi, Ngunduh Mantu) */}
          <EventDetails
            events={weddingData.events}
            bouquetSrc={weddingData.photos.bouquet}
          />

          {/* 8. Adab Walimah */}
          <AdabWalimah data={weddingData} />

          {/* 9. Doa Untuk Pengantin */}
          <DoaPengantin doa={weddingData.doa} />

          {/* 11. RSVP & Wishes (includes Guestbook) */}
          <RSVPForm guestName={guestName} />

          {/* 13. Closing */}
          <ClosingSection data={weddingData} />
        </main>

        {/* Footer */}
        {opened && (
          <footer className="bg-ink px-5 py-8 pb-24 text-center text-xs text-ivory/70 sm:pb-8">
            <p>Made with ❤️ for {weddingData.coupleName}</p>
            <a
              href="#home"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-gold/30 px-4 py-2 text-ivory/80 transition hover:bg-gold/10"
            >
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 15l7-7 7 7" />
              </svg>
              Kembali ke atas
            </a>
          </footer>
        )}

        {/* Music Control */}
        <MusicControl
          src={weddingData.musicUrl}
          opened={opened}
          startKey={startKey}
        />

        {/* Bottom Navigation (mobile) */}
        <BottomNavigation opened={opened} />
      </div>
    </div>
  );
}
