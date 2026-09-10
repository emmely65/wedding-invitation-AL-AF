import React from 'react';

function SingleButterfly({ className = '', style = {}, scale = 1, speed = '0.32s' }) {
  return (
    <div
      className={`absolute pointer-events-none butterfly-perspective ${className}`}
      style={{
        ...style,
        transform: `${style.transform || ''} scale(${scale})`,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 60 45"
        className="h-10 w-12 drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="butterflyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F6ECEE" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#E8D2A6" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#C5A059" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4A0E17" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="wingVeins" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FAF6F0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#9E7B3B" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Antennae */}
        <path
          d="M29,14 C28,9 25,4 21,2 M31,14 C32,9 35,4 39,2"
          stroke="#30070D"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Wings */}
        <g
          className="butterfly-wing-left"
          style={{
            transformOrigin: '30px 22px',
            animation: `flutterLeft ${speed} ease-in-out infinite alternate`,
          }}
        >
          {/* Upper Left Wing */}
          <path
            d="M29,16 C22,6 7,7 5,17 C3,26 15,29 29,24 Z"
            fill="url(#butterflyGrad)"
            stroke="#C5A059"
            strokeWidth="0.6"
          />
          <path
            d="M27,18 C20,12 12,14 10,19"
            stroke="url(#wingVeins)"
            strokeWidth="0.6"
            fill="none"
          />
          {/* Lower Left Wing */}
          <path
            d="M29,23 C20,25 11,32 14,39 C17,44 26,38 29,28 Z"
            fill="url(#butterflyGrad)"
            stroke="#C5A059"
            strokeWidth="0.5"
            opacity="0.9"
          />
        </g>

        {/* Right Wings */}
        <g
          className="butterfly-wing-right"
          style={{
            transformOrigin: '30px 22px',
            animation: `flutterRight ${speed} ease-in-out infinite alternate`,
          }}
        >
          {/* Upper Right Wing */}
          <path
            d="M31,16 C38,6 53,7 55,17 C57,26 45,29 31,24 Z"
            fill="url(#butterflyGrad)"
            stroke="#C5A059"
            strokeWidth="0.6"
          />
          <path
            d="M33,18 C40,12 48,14 50,19"
            stroke="url(#wingVeins)"
            strokeWidth="0.6"
            fill="none"
          />
          {/* Lower Right Wing */}
          <path
            d="M31,23 C40,25 49,32 46,39 C43,44 34,38 31,28 Z"
            fill="url(#butterflyGrad)"
            stroke="#C5A059"
            strokeWidth="0.5"
            opacity="0.9"
          />
        </g>

        {/* Slender Body */}
        <ellipse cx="30" cy="22" rx="1.6" ry="9" fill="#30070D" />
        <ellipse cx="30" cy="14" rx="1.3" ry="1.8" fill="#4A0E17" />
      </svg>
    </div>
  );
}

export default function Butterflies({ count = 3, className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden z-20 ${className}`}>
      {/* Butterfly 1: Top Left hovering */}
      <SingleButterfly
        scale={0.9}
        speed="0.30s"
        className="top-12 left-6 sm:left-16 animate-floatButterfly"
        style={{ animationDelay: '0s', animationDuration: '6.5s' }}
      />

      {/* Butterfly 2: Mid-right fluttering towards center */}
      <SingleButterfly
        scale={1.1}
        speed="0.34s"
        className="top-1/3 right-6 sm:right-20 animate-floatButterfly"
        style={{ animationDelay: '1.8s', animationDuration: '7.5s' }}
      />

      {/* Butterfly 3: Lower left, gentle floating */}
      {count >= 3 && (
        <SingleButterfly
          scale={0.78}
          speed="0.28s"
          className="bottom-28 left-8 sm:left-24 animate-floatButterfly"
          style={{ animationDelay: '3.2s', animationDuration: '8s' }}
        />
      )}

      {/* Butterfly 4: Top right, subtle accent */}
      {count >= 4 && (
        <SingleButterfly
          scale={0.85}
          speed="0.32s"
          className="top-20 right-12 sm:right-32 animate-floatButterfly"
          style={{ animationDelay: '4.5s', animationDuration: '7s' }}
        />
      )}
    </div>
  );
}
