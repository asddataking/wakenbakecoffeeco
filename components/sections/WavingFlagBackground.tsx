/**
 * Full-bleed soft American flag with a gentle fabric wave.
 * Decorative only — sits behind subscription copy.
 */
export function WavingFlagBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="flag-wave absolute inset-[-4%] h-[108%] w-[108%]">
        <svg
          viewBox="0 0 1235 650"
          className="h-full w-full"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="flagFabric" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012 0.04"
                numOctaves="2"
                seed="3"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="8s"
                  values="0.012 0.04;0.018 0.055;0.012 0.04"
                  repeatCount="indefinite"
                />
              </feTurbulence>
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <pattern id="flagStars" width="55" height="46" patternUnits="userSpaceOnUse">
              <path
                d="M27.5 8l2.6 8h8.4l-6.8 5 2.6 8-6.8-5-6.8 5 2.6-8-6.8-5h8.4z"
                fill="#F8F6F1"
                opacity="0.92"
              />
            </pattern>
            <linearGradient id="flagLight" x1="0" y1="0" x2="1" y2="0.3">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.22" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.05" />
              <stop offset="70%" stopColor="#0b1f33" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.16" />
            </linearGradient>
          </defs>

          <g filter="url(#flagFabric)">
            {/* Softened classic flag colors so the white copy panel stays readable */}
            <rect width="1235" height="50" y="0" fill="#C45C4A" />
            <rect width="1235" height="50" y="50" fill="#F7F2E8" />
            <rect width="1235" height="50" y="100" fill="#C45C4A" />
            <rect width="1235" height="50" y="150" fill="#F7F2E8" />
            <rect width="1235" height="50" y="200" fill="#C45C4A" />
            <rect width="1235" height="50" y="250" fill="#F7F2E8" />
            <rect width="1235" height="50" y="300" fill="#C45C4A" />
            <rect width="1235" height="50" y="350" fill="#F7F2E8" />
            <rect width="1235" height="50" y="400" fill="#C45C4A" />
            <rect width="1235" height="50" y="450" fill="#F7F2E8" />
            <rect width="1235" height="50" y="500" fill="#C45C4A" />
            <rect width="1235" height="50" y="550" fill="#F7F2E8" />
            <rect width="1235" height="50" y="600" fill="#C45C4A" />

            <rect width="494" height="350" fill="#2F4F78" />
            <rect width="494" height="350" fill="url(#flagStars)" />
          </g>

          {/* Soft daylight sweep across the fabric */}
          <rect width="1235" height="650" fill="url(#flagLight)" />
        </svg>
      </div>
    </div>
  );
}
