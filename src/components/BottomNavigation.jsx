import { useEffect, useState, useCallback, useRef } from 'react';

const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-4 0v-6a1 1 0 011-1h2a1 1 0 011 1v6"
      />
    ),
  },
  {
    id: 'quote',
    label: 'Quote',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    ),
  },
  {
    id: 'couple',
    label: 'Mempelai',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    ),
  },
  {
    id: 'save-date',
    label: 'Tanggal',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    ),
  },
  {
    id: 'events',
    label: 'Acara',
    icon: (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ),
  },
  {
    id: 'rsvp',
    label: 'RSVP',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    ),
  },
];

export default function BottomNavigation({ opened }) {
  const [activeTab, setActiveTab] = useState('home');
  const isManualScrollRef = useRef(false);
  const scrollTimerRef = useRef(null);

  // Pure viewport-visibility detection: selects the section with the largest visible area on screen
  const updateActiveSection = useCallback(() => {
    if (isManualScrollRef.current) return;

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
    let bestId = NAV_ITEMS[0].id;
    let maxVisibleHeight = -1;

    for (const item of NAV_ITEMS) {
      const el = document.getElementById(item.id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      // Calculate how many vertical pixels of this section are currently visible in the screen viewport
      const visibleTop = Math.max(0, rect.top);
      const visibleBottom = Math.min(viewportHeight, rect.bottom);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      if (visibleHeight > maxVisibleHeight) {
        maxVisibleHeight = visibleHeight;
        bestId = item.id;
      }
    }

    if (bestId && maxVisibleHeight > 0) {
      setActiveTab(bestId);
    }
  }, []);

  useEffect(() => {
    if (!opened) return;
    const container = document.getElementById('main-scroll-container');

    // Initial check on mount
    updateActiveSection();

    // Universal listeners covering window, document, and container
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection, { passive: true });
    document.addEventListener('scroll', updateActiveSection, { passive: true });
    if (container) {
      container.addEventListener('scroll', updateActiveSection, { passive: true });
    }

    return () => {
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
      document.removeEventListener('scroll', updateActiveSection);
      if (container) {
        container.removeEventListener('scroll', updateActiveSection);
      }
    };
  }, [opened, updateActiveSection]);

  if (!opened) return null;

  const scrollTo = (e, id) => {
    e.preventDefault();
    setActiveTab(id);

    // Lock active tab during smooth scroll transition to prevent intermediate flickering
    isManualScrollRef.current = true;
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
      updateActiveSection();
    }, 800);

    const container = document.getElementById('main-scroll-container');

    // 1. Home: scroll to absolute top on all contexts
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
      document.body.scrollTo({ top: 0, behavior: 'smooth' });
      if (container) {
        container.scrollTo({ top: 0, behavior: 'smooth' });
      }
      const homeEl = document.getElementById('home');
      if (homeEl) {
        homeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    // 2. Other sections: calculate container offset and scroll smoothly
    const target = document.getElementById(id);
    if (!target) return;

    if (container && container.scrollHeight > container.clientHeight) {
      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const targetScrollTop = targetRect.top - containerRect.top + container.scrollTop;
      container.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
    }

    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom,0.75rem))] left-1/2 -translate-x-1/2 lg:left-[82.5%] z-40 w-[94%] max-w-[420px] pointer-events-auto transition-all duration-300"
      aria-label="Navigasi Menu Utama"
    >
      <div className="flex items-center justify-between gap-1 w-full rounded-full bg-white/92 px-1.5 py-1.5 shadow-[0_10px_32px_rgba(0,0,0,0.18),0_2px_8px_rgba(201,161,90,0.18)] backdrop-blur-xl border border-[#C9A15A]/40">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollTo(e, item.id)}
              className={`flex-1 min-w-0 flex flex-col items-center justify-center rounded-full py-1.5 px-1 transition-all duration-200 active:scale-95 select-none ${
                isActive
                  ? 'bg-[#5C0F1A] text-white shadow-md font-semibold scale-[1.02]'
                  : 'text-[#5C0F1A]/70 hover:text-[#5C0F1A] hover:bg-[#5C0F1A]/5'
              }`}
              title={item.label}
            >
              <svg
                className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth={isActive ? '2.2' : '1.8'}
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
              <span className="text-[9px] sm:text-[10px] leading-tight tracking-tight mt-0.5 truncate max-w-full font-sansBody">
                {item.label}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
