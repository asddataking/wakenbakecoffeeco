/**
 * Grey American flag stretched across the full tan subscription panel.
 */
export function GreyFlagOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
      aria-hidden
    >
      <svg
        viewBox="0 0 1235 650"
        className="block h-full min-h-full w-full min-w-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="greyFlagStars" width="70" height="58" patternUnits="userSpaceOnUse">
            <path
              d="M35 10l3.2 9.8H49l-8.4 6.1 3.2 9.9L35 29.7l-8.8 6.1 3.2-9.9L21 19.8h10.8L35 10z"
              fill="#E8E4DC"
              opacity="0.9"
            />
          </pattern>
        </defs>
        {/* Alternating grey stripes — fill entire panel */}
        <rect width="1235" height="50" y="0" fill="#8B8790" />
        <rect width="1235" height="50" y="50" fill="#B0ABA3" />
        <rect width="1235" height="50" y="100" fill="#8B8790" />
        <rect width="1235" height="50" y="150" fill="#B0ABA3" />
        <rect width="1235" height="50" y="200" fill="#8B8790" />
        <rect width="1235" height="50" y="250" fill="#B0ABA3" />
        <rect width="1235" height="50" y="300" fill="#8B8790" />
        <rect width="1235" height="50" y="350" fill="#B0ABA3" />
        <rect width="1235" height="50" y="400" fill="#8B8790" />
        <rect width="1235" height="50" y="450" fill="#B0ABA3" />
        <rect width="1235" height="50" y="500" fill="#8B8790" />
        <rect width="1235" height="50" y="550" fill="#B0ABA3" />
        <rect width="1235" height="50" y="600" fill="#8B8790" />
        <rect width="494" height="350" fill="#6F6B74" />
        <rect width="494" height="350" fill="url(#greyFlagStars)" />
      </svg>
      {/* Keep the panel reading as tan, with the flag as a soft wash on top */}
      <div className="absolute inset-0 bg-foam/55" />
    </div>
  );
}
