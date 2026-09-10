import React from 'react';

const DRIFTING_ELEMENTS = [
  { id: 1, type: 'petal', left: '8%', delay: '0s', duration: '9s', size: 16, rotate: '20deg', opacity: 0.85, color: '#7E1C2B' },
  { id: 2, type: 'leaf', left: '22%', delay: '2.5s', duration: '11s', size: 18, rotate: '-35deg', opacity: 0.75, color: '#5B684E' },
  { id: 3, type: 'petal', left: '38%', delay: '1s', duration: '8.5s', size: 14, rotate: '45deg', opacity: 0.8, color: '#9B2335' },
  { id: 4, type: 'leaf', left: '50%', delay: '4s', duration: '12s', size: 15, rotate: '15deg', opacity: 0.7, color: '#8A7A4D' },
  { id: 5, type: 'petal', left: '65%', delay: '3s', duration: '10s', size: 18, rotate: '-20deg', opacity: 0.85, color: '#6A1523' },
  { id: 6, type: 'petal', left: '80%', delay: '0.8s', duration: '9.5s', size: 13, rotate: '30deg', opacity: 0.75, color: '#D8A4A9' },
  { id: 7, type: 'leaf', left: '92%', delay: '5s', duration: '11.5s', size: 16, rotate: '-40deg', opacity: 0.8, color: '#4E5A44' },
  { id: 8, type: 'petal', left: '15%', delay: '6s', duration: '9s', size: 15, rotate: '10deg', opacity: 0.8, color: '#8B1E2E' },
  { id: 9, type: 'petal', left: '72%', delay: '7s', duration: '10.5s', size: 17, rotate: '-15deg', opacity: 0.85, color: '#B54255' },
];

export default function FallingPetals() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-25" aria-hidden="true">
      {DRIFTING_ELEMENTS.map((el) => (
        <div
          key={el.id}
          className="absolute top-0 will-change-transform drop-shadow"
          style={{
            left: el.left,
            animation: `petalDrift ${el.duration} linear infinite`,
            animationDelay: el.delay,
            opacity: el.opacity,
          }}
        >
          {el.type === 'petal' ? (
            <svg
              width={el.size}
              height={el.size * 1.3}
              viewBox="0 0 30 40"
              style={{ transform: `rotate(${el.rotate})` }}
            >
              <defs>
                <linearGradient id={`petalGrad-${el.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0.4" />
                  <stop offset="30%" stopColor={el.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#30070D" stopOpacity="0.95" />
                </linearGradient>
              </defs>
              <path
                d="M15,2 C24,10 29,23 20,34 C11,41 2,33 5,20 C7,11 12,4 15,2 Z"
                fill={`url(#petalGrad-${el.id})`}
              />
            </svg>
          ) : (
            <svg
              width={el.size * 1.2}
              height={el.size * 1.5}
              viewBox="0 0 30 40"
              style={{ transform: `rotate(${el.rotate})` }}
            >
              {/* Eucalyptus Leaf */}
              <path
                d="M15,2 C25,12 28,26 15,38 C2,26 5,12 15,2 Z"
                fill={el.color}
                opacity="0.9"
              />
              {/* Central vein */}
              <path
                d="M15,4 L15,36"
                stroke="#C5A059"
                strokeWidth="0.8"
                strokeOpacity="0.5"
                fill="none"
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
