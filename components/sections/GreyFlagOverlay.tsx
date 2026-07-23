/**
 * Subtle grey American flag watermark for the subscription panel.
 */
export function GreyFlagOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg
        viewBox="0 0 1235 650"
        className="absolute inset-0 h-full w-full opacity-[0.14]"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="greyFlagStars" width="55" height="46" patternUnits="userSpaceOnUse">
            <path
              d="M27.5 8l2.6 8h8.4l-6.8 5 2.6 8-6.8-5-6.8 5 2.6-8-6.8-5h8.4z"
              fill="#F3EFE6"
              opacity="0.85"
            />
          </pattern>
        </defs>
        <rect width="1235" height="50" y="0" fill="#6B7280" />
        <rect width="1235" height="50" y="50" fill="#9CA3AF" />
        <rect width="1235" height="50" y="100" fill="#6B7280" />
        <rect width="1235" height="50" y="150" fill="#9CA3AF" />
        <rect width="1235" height="50" y="200" fill="#6B7280" />
        <rect width="1235" height="50" y="250" fill="#9CA3AF" />
        <rect width="1235" height="50" y="300" fill="#6B7280" />
        <rect width="1235" height="50" y="350" fill="#9CA3AF" />
        <rect width="1235" height="50" y="400" fill="#6B7280" />
        <rect width="1235" height="50" y="450" fill="#9CA3AF" />
        <rect width="1235" height="50" y="500" fill="#6B7280" />
        <rect width="1235" height="50" y="550" fill="#9CA3AF" />
        <rect width="1235" height="50" y="600" fill="#6B7280" />
        <rect width="494" height="350" fill="#4B5563" />
        <rect width="494" height="350" fill="url(#greyFlagStars)" />
      </svg>
    </div>
  );
}
