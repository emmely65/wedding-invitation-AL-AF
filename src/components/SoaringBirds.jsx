import React from 'react';

export default function SoaringBirds({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute overflow-hidden ${className}`} aria-hidden="true">
      {/* Bird 1 */}
      <div
        className="absolute top-1 right-6 animate-soarBird"
        style={{ animationDuration: '8.5s', animationDelay: '0.5s' }}
      >
        <svg viewBox="0 0 40 24" className="w-5 h-3.5 fill-[#5c1620] drop-shadow-sm opacity-70">
          <path d="M20,12 C14,7 5,0 0,2 C7,7 14,13 18,15 L14,22 L20,17 L26,22 L22,15 C26,13 33,7 40,2 C35,0 26,7 20,12 Z" />
        </svg>
      </div>

      {/* Bird 2: slightly smaller, trailing */}
      <div
        className="absolute top-4 right-14 animate-soarBird"
        style={{ animationDuration: '9.2s', animationDelay: '2.8s' }}
      >
        <svg viewBox="0 0 40 24" className="w-3.5 h-2.5 fill-[#78242f] drop-shadow-sm opacity-60">
          <path d="M20,12 C14,7 5,0 0,2 C7,7 14,13 18,15 L14,22 L20,17 L26,22 L22,15 C26,13 33,7 40,2 C35,0 26,7 20,12 Z" />
        </svg>
      </div>
    </div>
  );
}
