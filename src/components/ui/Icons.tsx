import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function icon(paths: React.ReactNode, { size = 24, ...props }: IconProps = {}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {paths}
    </svg>
  );
}

// ── Navbar icons ──────────────────────────────────────────────────────────────

export function IconHome(p: IconProps) {
  return icon(
    <>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </>,
    p
  );
}

export function IconReview(p: IconProps) {
  return icon(
    <>
      <path d="M1 4v6h6" />
      <path d="M23 20v-6h-6" />
      <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4-4.64 4.36A9 9 0 0 1 3.51 15" />
    </>,
    p
  );
}

export function IconTopics(p: IconProps) {
  return icon(
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>,
    p
  );
}

export function IconPracticals(p: IconProps) {
  return icon(
    <>
      <path d="M9 3h6v8l3 9H6L9 11V3z" />
      <path d="M6 3h12" />
      <path d="M6 16h12" />
    </>,
    p
  );
}

export function IconEquations(p: IconProps) {
  return icon(
    <>
      <path d="M4 7h16" />
      <path d="M4 12h10" />
      <path d="M4 17h7" />
      <path d="M15 14l4 4" />
      <path d="M19 14l-4 4" />
    </>,
    p
  );
}

export function IconPapers(p: IconProps) {
  return icon(
    <>
      <rect x="4" y="2" width="13" height="18" rx="2" />
      <path d="M20 8v14a2 2 0 0 1-2 2H8" />
      <path d="M8 7h6" />
      <path d="M8 11h6" />
      <path d="M8 15h4" />
    </>,
    p
  );
}

export function IconSettings(p: IconProps) {
  return icon(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>,
    p
  );
}

// ── Topic icons ───────────────────────────────────────────────────────────────

export function IconForces(p: IconProps) {
  return icon(
    <>
      <line x1="5" y1="19" x2="19" y2="5" />
      <polyline points="8 5 19 5 19 16" />
      <line x1="5" y1="12" x2="12" y2="12" />
      <polyline points="8 9 5 12 8 15" />
    </>,
    p
  );
}

export function IconElectricity(p: IconProps) {
  return icon(
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    p
  );
}

export function IconWaves(p: IconProps) {
  return icon(
    <path d="M2 12 Q5 6 8 12 Q11 18 14 12 Q17 6 20 12 Q21.5 15 22 12" />,
    p
  );
}

export function IconEnergy(p: IconProps) {
  return icon(
    <>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.26C17.81 13.47 19 11.38 19 9c0-3.87-3.13-7-7-7z" />
      <path d="M9 21h6" />
      <path d="M10 17v4" />
      <path d="M14 17v4" />
    </>,
    p
  );
}

export function IconMagnetism(p: IconProps) {
  return icon(
    <>
      <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3" />
      <line x1="4" y1="3" x2="8" y2="3" />
      <line x1="16" y1="3" x2="20" y2="3" />
    </>,
    p
  );
}

export function IconParticles(p: IconProps) {
  return icon(
    <>
      <circle cx="12" cy="8" r="2.5" />
      <circle cx="7" cy="16" r="2.5" />
      <circle cx="17" cy="16" r="2.5" />
      <line x1="12" y1="10.5" x2="8.5" y2="13.5" strokeDasharray="2 2" />
      <line x1="12" y1="10.5" x2="15.5" y2="13.5" strokeDasharray="2 2" />
      <line x1="9.5" y1="16" x2="14.5" y2="16" strokeDasharray="2 2" />
    </>,
    p
  );
}

export function IconAtomic(p: IconProps) {
  return icon(
    <>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="10" ry="4" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
    </>,
    p
  );
}

export function IconSpace(p: IconProps) {
  return icon(
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="M2 12c2-4 4-6 10-6s8 2 10 6" />
      <path d="M2 12c2 4 4 6 10 6s8-2 10-6" />
      <circle cx="4" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="20" cy="4" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="18" cy="19" r="1" fill="currentColor" stroke="none" />
    </>,
    p
  );
}

export function IconSearch(p: IconProps) {
  return icon(
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>,
    p
  );
}

export function IconAchievements(p: IconProps) {
  return icon(
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </>,
    p
  );
}
